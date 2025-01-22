# Raft

## 基本概念

### 名词解释

- Leader：领导者，由群众投票得出

- Candidate：候选者，当没有Leader时，一些群众成为候选者

- Follower：群众，跟随Leader的节点

  ```go
  //角色定义
  type Role string
  const(
  	Follower Role = "Follower"
  	Candidate Role = "Candidate"
  	Leader Role="Leader"
  )
  ```

  

- Election：领导选举，当领导任期结束或者领导宕机时执行

- Term：任期，一个连续递增的数字

- Election Timeout：选举超时时间，当群众超时未收到领导的心跳时，会进行选举

  ```go
  //设置超时时间
  const(
  	electionTimeoutMin time.Duration=250*time.Millisecond
  	electionTimeoutMax time.Duration=400*time.Millisecond
  )
  
  func (rf *Raft)resetElectionTImeout(){
  	rf.electionStart=time.Now()
  	randRange:=int64(electionTimeoutMax-electionTimeoutMin)
  	rf.electionTimeout=electionTimeoutMin+time.Duration(rand.Int63()%randRange)
  }
  
  func (rf *Raft)isElectionTimeout()bool{
  	return time.Since(rf.electionStart) >rf.electionTimeout
  }
  ```

  

### 基本原理

所有 Raft Server 初始状态为空，然后回按照按相同的顺序执行相同的客户端请求，进而保证状态机是一致的。如果某个 Raft Server 宕机重启后，进度落下了，Raft 算法会负责将其日志进行追平。只要有**超过半数**的 Peer 存活并且可以互相通信，Raft 就可以继续正常运行。如果当前没有多数派存活，则 Raft 将会陷入停滞，不能继续接受客户端来的请求。不过，一旦多数 Peer 重新可以互通，Raft 就又可以继续工作。

Raft节点定义：

```go
type Raft struct {
	mu        sync.Mutex          // Lock to protect shared access to this peer's state
	peers     []*labrpc.ClientEnd // RPC end points of all peers
	persister *Persister          // Object to hold this peer's persisted state
	me        int                 // this peer's index into peers[]
	dead      int32               // set by Kill()

	role Role
	currentTerm int 
	votedFor int
	electionStart time.Time
	electionTimeout time.Duration

}
```



## 领导选举

一个任期内只会有一个Leader，若同一时刻存在多个Leader，那么他们一定属于不同的任期。

Leader在当选后，首先要昭告天下，向其他Peer发出心跳，Peer收到心跳后，一段时间内不会发起选举（重置选举时钟）。

Leader周期性发送政令，直到收到来自高任期的消息，便从领导变为群众。

## 日志同步

Leader在收到客户端的请求后，会将请求转为日志，然后向其他节点发送带日志的心跳。生成日志之后，Leader把日志放到AppendEntries RPC中，并行发送给Follower，当超过半数Follower成功响应了，Leader本地执行该指令，并把结果发回给客户端。

采用一种“乐观+回撤”的方式进行同步：

1. **乐观**：一开始心跳不附带任何日志，只带一些“暗号”过去。假如 Follower 的通过“暗号”发现自己日志跟 Leader 完全一致，就直接回：一致，之后的心跳不需附加任何日志。
2. **回撤**：如果 Follower 通过“暗号”发现自己和 Leader 日志并不一致，也会告诉 Leader——下次得附带日志。则 Leader 就附加一些末尾的日志，如果发现还是不一致，就要继续回撤，多向前附加一些日志，同时更新“暗号”，直到收到 Follower 肯定回复，则继续恢复不附加任何日志的心跳。

这个“暗号”，就是 Leader 所附带日志的的前一条日志信息的二元组：`<下标，任期>`。如果心跳没有附加任何日志，则暗号就是 Leader 最后一条日志的相关信息。为了保证 Leader 附带日志总有前一条日志，我们在对日志进行初始化的时候，会在开头放一条“空日志”，从而避免一些边界判断（这个做法类似带头结点的链表）。

## 安全性问题

1. Leader宕机处理：选举限制

   如果一个Follower落后了Leader若干条日志，但没有漏一整个任期，那么下次选举中，按照领导者选举里的规则，它依旧有可能当选Leader。它在当选新Leader后就永远无法补上之前缺失的那部分日志，从而造成状态机之间的不一致。

   所以需要对领导者选举增加一个限制，保证被选出来的leader一段包含了之前各任期的所有**被提交**的日志条目。

   RequestVote RPC执行了这样的限制：RPC中包含了candidate的日志信息，如果投票者自己的日志比candidate的还新，它会拒绝掉该投票请求。（先比较任期号，再比较日志号）

   ```go
   type RequestVote struct{
       term int//自己当前任期号
       candidateId int//自己的ID
       lastLogIndex int//自己最后一个日志号
       lastLogTerm int//自己最后一个日志的任期
   }
   ```

2. Leader宕机处理：新Leader是否提交之前任期内的日志条目

   一旦当前任期内的某个日志条目已经存储到过半的服务器节点上，Leader就知道该日志条目可以被提交了。Leader向Follower发送的心跳中，有一个参数leaderCommit，Follower就可以知道当前Leader提交了哪一个日志，从而自己也把日志提交。

   如果某个Leader在提交某个日志条目之前崩溃了，以后的Leader会试图完成该日志条目**复制**。

   **只有Leader当前任期内的日志条目才通过计算副本数目的方式来提交**

   一旦当前任期的某个日志条目以这种方式被提交，那么由于日志匹配特性，之前的所有日志条目也都会被间接地提交

   问题：Leader提交和Follower提交之间一定间隔一段时间，如果Leader提交后返回Client成功，之后就宕机，没有向Follower发送心跳，事务提交状态没有在集群中保留下来怎么办？

   回答：要避免这个问题，应用会设置一个集群提交的概念，只有集群中超过半数节点提交，应用才会认为集群提交完成。raft的Leader可以通过AppendEntries RPC返回的success与否，判定这个Follower是否完成提交。所以说Leader可以很容易判断一个日志是否符合集群提交的条件，这个过程有点类似于分布式事务两阶段提交的过程。

3. Follower和Candidate宕机处理

   raft通过无限的重试来处理这种失败。

