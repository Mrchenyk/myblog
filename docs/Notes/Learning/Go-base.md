# Go语言基础

## 函数

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/38ad44472912488195a0a847e3485719~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oiR5pyJ5LiO5LiO55eH:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDQ2NjYyOTgzNzA3MTc4NyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1736659367&x-orig-sign=qBwppRQDcn6J5ZUuaIfnfBOmiPY%3D)

包中大写开头的函数名、变量对外部可以调用。

函数传入的参数值和返回值都可以有多个，多个返回值用括号括起来

### 函数赋值给变量

```go
package main

import (
	"fmt"
	"math/rand"
)

type kelvin float64

func fakeSensor() kelvin {
	return kelvin(rand.Intn(151)+150)
}

func realSensor()kelvin{
	return 0;
}

func main(){
	sensor:=fakeSensor;     //把函数赋值给sensor
	fmt.Println(sensor())   //函数使用()调用

	sensor=realSensor;
	fmt.Println(sensor())
}
```

### 函数作为参数传递

```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

type kelvin float64

func fakeSensor() kelvin {
	return kelvin(rand.Intn(151)+150)
}

func measureTemperature(samples int,sensor func() kelvin){
	for i:=0;i<samples;i++{
		k:=sensor()
		fmt.Printf("%vK\n",k)

		time.Sleep(time.Second)
	}
}

func main(){
	measureTemperature(3,fakeSensor)
}
```

### 声明函数类型

有助于精简和明确调用者的代码

`type sensor func() kelvin
`
那么上面的measureTemperature声明可变为

`func measureTemperature(samples int,s sensor)
`

### 匿名(anonymous)函数

```go
package main

import "fmt"

func main() {
	f := func(message string) {
		fmt.Println("hello "+message)
	}

	f("Artist")
}
```

### 函数作为返回值类型

```go
package main

import (
	"fmt"
	
)

type kelvin float64

type sensor func() kelvin

func calibrate(s sensor,offset kelvin)sensor{
	return func() kelvin {
		return s()+offset
	}
}

func realSensor()kelvin{
	return 0;
}

func main(){
	sensor:=calibrate(realSensor,10)
	fmt.Println(sensor())
}
```

## 方法

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/42e1e8df17de46aa8e82d55b36f26cc8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oiR5pyJ5LiO5LiO55eH:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDQ2NjYyOTgzNzA3MTc4NyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1736659367&x-orig-sign=OiD%2FMq9juOvzi30%2Ba5MwQ9gSW1Q%3D)
方法和函数区别：方法其实也是函数，不过方法属于某一个type，通过方法定义type的行为：

## 数组与切片

数组声明 `[size]type`

切片声明`[]type`

使用`range`关键字来遍历数组

```go
package main

import "fmt"

func main() {
	dwarfs := [5]string{"Ceres", "Pluto", "Haumea", "Makemake", "Eris"}
	for i, dwarf := range dwarfs {
		fmt.Println(i, dwarf)
	}
}
```

把数组赋值给另一个数组的时候，是整个数组都复制一份过去，不是传递引用，数组的长度也是数组的一部分

假设planets是一个数组，则planets\[0:4]是一个切片，

切片作为参数传递时是引用传递，切片像是其他语言的动态数组，可以通过`append`函数添加元素。

当切片容量不够append时，go会新建数组把原数组复制一遍，这样可能会导致效率低下，所以就引出了make，我们可以人为指定切片容量，避免扩容操作，`make([]type,capacity)`

## struct

struct看起来就像是java的类,字段名小写不能被外部看到

```go
package main

import "fmt"

func main() {
	lats := []float64{-4.5895, -14.5684, -1.9462}
	longs := []float64{137.4417, 175.472636, 354.4734}

	type location struct {
		name string `json:"describe"`  //通过`json:"describe"`可以给json字段改名
		lat  float64
		long float64
	}

	locations := []location{
		{name: "Bradbury Landing", lat: -4.5895, long: 137.4417},
		{name: "Columbia Memorial Station", lat: -14.5684, long: 175.472636},
		{name: "Challenger Memorial Station", lat: -1.9462, long: 354.4734},
	}

	fmt.Println(lats,longs,locations)
}

```

## 接口

接口定义行为

```go
package main

import (
	"fmt"
	"strings"
)

type martian struct{}

func (m martian) talk() string {
	return "nack nack"
}

type laser int

func (l laser) talk() string {
	return strings.Repeat("pew ", int(l))
}

type talker interface {
	talk() string
}

func shout(t talker) {
	louder := strings.ToUpper(t.talk())
	fmt.Println(louder)
}

func main() {
	shout(martian{})
	shout(laser(2))

	type crater struct{}
	// crater does not implement talker (missing talk method)
	// shout(crater{})
}
```

## 指针

指针这块和c++语言差不多，`&`取地址，`*`解引用

## goroutine

在调用前加`go`关键字，就能在main函数里面开一条分支运行程序,十分方便高效

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	for i := 0; i < 5; i++ {
		go sleepyGopher(i)
	}
	time.Sleep(4 * time.Second)
}

func sleepyGopher(id int) {
	time.Sleep(3 * time.Second)
	fmt.Println("... ", id, " snore ...")
}
```

## channel

可以在多个goroutine之间安全传值，创建通道用`make`函数，同时指定通道类型`c:=make(chan int)`

向通道发送值`c<-99`，从通道接受值`r:=<-99`

通道满了就会等待消费，通道空了就会等待生产

```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	c := make(chan int)
	for i := 0; i < 5; i++ {
		go sleepyGopher(i, c)
	}
	timeout := time.After(2 * time.Second)
	for i := 0; i < 5; i++ {
		select {
		case gopherID := <-c:
			fmt.Println("gopher ", gopherID, " has finished sleeping")
		case <-timeout:
			fmt.Println("my patience ran out")
			return
		}
	}
}
func sleepyGopher(id int, c chan int) {
	time.Sleep(time.Duration(rand.Intn(4000)) * time.Millisecond)
	c <- id
}
```

`timeout` 是一个 2 秒的超时通道，`time.After` 会在 2 秒后向 `timeout` 通道发送一个信号，用于在等待 `gopher` 的同时进行超时检查。

for循环通过 `select` 语句等待来自 `c` 的 `gopherID` 或超时信号：

*   `case gopherID := <-c`: 如果某个 `gopher` 完成了“睡觉”，并通过通道 `c` 发送了它的 ID，`select` 将打印“gopher x has finished sleeping”。
*   `case <-timeout`: 如果 2 秒超时到了，`select` 将执行这一分支，打印“my patience ran out”并结束 `main` 函数，不再等待其他的 `gopher`。
