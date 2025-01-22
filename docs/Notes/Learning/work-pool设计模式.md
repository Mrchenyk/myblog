# 工作池模式 （golang并发编程） 



## 概念

在Go语言中，工作池模式是一种常见的并发编程模式，用于管理和控制并发任务的执行。工作池模式通过一组固定数量的工作线程（在Go中是goroutines）来执行任务队列中的任务。这种模式有助于控制并发任务的数量，避免资源竞争，从而提高系统的性能和稳定性。

## 工作池的组成

1. **Task Channel**：通常使用channel实现，用于存储待执行的任务。
2. **Worker**：从任务队列中获取任务并执行。
3. **Result Channel**：用于收集任务执行的结果。

每个Worker都是一个协程，Worker从taskCh中获取任务执行，把结果放进resultCh。 

## 工作池模式的一个简单示例

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	var wg sync.WaitGroup
	//任务通道
	taskCh := make(chan int)

	//结果通道
	resultCh:=make(chan int)

	//放入任务，开启协程
	go func(){
		for i:=range 1000{
			taskCh<-i
		}

		close(taskCh)
	}()

	//开启100个worker
	for range 100{
		wg.Add(1)
		go Worker(taskCh,resultCh,&wg)
	}

	//确保结果收集完毕(为什么使用结构体？因为不占内存)
	done:=make(chan struct{})

	//收集结果
	go func(){
		//直到通道关闭且读完结束,循环结束
		for num:=range resultCh{
			fmt.Println(num)
		}
		close(done)
	}()

	wg.Wait()
	
	//Worker结束后关闭结果通道
	close(resultCh)

	<-done
}

func Worker(taskCh <-chan int, resultCh chan<- int, waitGroup *sync.WaitGroup) {
	defer waitGroup.Done()
	
	//直到任务通道关闭,实现工作者对channel的订阅
	for num:=range taskCh{
		//处理任务
		result:=precess(num)
		resultCh<-result
	}
}

func precess(num int) int {
	time.Sleep(time.Second)
	return num*num
}
```

## 工作池模式的一个应用

### 需求

data.csv 中有一列发布链接，**你需要检查该链接是否正常（可以访问），把异常的链接所在的行去除**。最终形成两个文件： 正常的文件`good.csv`, 异常的文件`bad.csv`。时间越短越好

运用工作池，减少等待网络响应的时间



```go
package main

import (
	"encoding/csv"
	"fmt"
	"net/http"
	"os"
	"sync"
	"time"
)

func main() {
	// 打印程序耗时
	now := time.Now()
	defer func() {
		fmt.Printf("程序耗时： %v\n", time.Since(now))
	}()
	// 打开CSV文件
	file, err := os.Open("data.csv")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	

	// os.Create 默认会覆盖原文件；如果不存在就会新建
	goodFile := mustFile(os.Create("good.csv"))
	defer goodFile.Close()

	badFile := mustFile(os.Create("bad.csv"))
	defer badFile.Close()

	badCsv := csv.NewWriter(badFile)
	defer badCsv.Flush() // 从缓存中刷新到badFile。

	goodCsv := csv.NewWriter(goodFile)
	defer goodCsv.Flush()

	// 写入表头
	// 创建CSV读取器
	reader := csv.NewReader(file)
	record, err := reader.Read()
	if(err!=nil){
		fmt.Println("Error reading CSV:", err)
		return
	}
	badCsv.Write(record)
	goodCsv.Write(record)


	taskCh:= make(chan []string)
	goodCh:= make(chan []string)
	badCh:= make(chan []string)
	var wg sync.WaitGroup

	go func(){
		
		// 逐行读取CSV文件
		for {
			record, err := reader.Read()
			
			if(err!=nil){
				fmt.Println("Error reading CSV:", err)
				break
			}
			taskCh<-record
		}
		close(taskCh)
	}()
	

	//开启100个worker
	for range 100{
		wg.Add(1)
		go Worker(taskCh,goodCh,badCh,&wg)
	}

	goodDone:=make(chan struct{})
	badDone:=make(chan struct{})

	go func(){
		for task:=range goodCh{

			goodCsv.Write(task)
			fmt.Println("good:",task)
			
		}
		close(goodDone)
	}()

	go func(){
		for task:=range badCh{
			badCsv.Write(task)
			fmt.Println("bad:",task)
		}
		close(badDone)

	}()

	wg.Wait()

	close(goodCh)
	close(badCh)

	<-goodDone
	<-badDone
}

func Worker(taskCh chan []string, goodCh chan []string, badCh chan []string, waitGroup *sync.WaitGroup) {
	defer waitGroup.Done()
	for task := range taskCh {
		if check(task[4]){
			goodCh<-task
		}else{
			badCh<-task
		}
	}
}

// 工具函数，简便写法。must设计模式。
func mustFile(f *os.File, err error) *os.File {
	if err != nil {
		panic(err)
	}
	return f
}

func check(url string) bool {
	// 创建一个 HTTP 客户端并设置超时时间为 3 秒
	client := &http.Client{Timeout: 5 * time.Second}

	// 发送 HTTP GET 请求
	resp, err := client.Get(url)
	if err != nil {
		return false
	}
	defer resp.Body.Close()

	// 检查 HTTP 响应状态码
	if resp.StatusCode == http.StatusOK {
		return true
	} else {
		return false
	}
}
```

