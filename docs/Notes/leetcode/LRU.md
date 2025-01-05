# LRU 缓存
## 题目链接
https://leetcode.cn/problems/lru-cache/description/

## 思路

LRU的整个过程就像是把读的书从一堆书中抽出来，放到顶部

首先定义节点，每个点的值包括 key，value ，next ， prev
```java
class Node{
    Node prev,next;
    int val,key;
    Node(int k,int v){
        val=v;
        key=k;
    }
}
```
初始化
```java
    private final int capacity;
    private final Node dummy=new Node(0,0);
    private final Map<Integer,Node>keyToMap=new HashMap<>();

    public LRUCache(int capacity) {
        this.capacity=capacity;
        dummy.prev=dummy;
        dummy.next=dummy;
    }
```
插入
```java
    public void put(int key, int value) {
        if(keyToMap.containsKey(key)){
            //有书，更新值
            Node node=getNode(key);
            node.val=value;
            return;
        }
        Node node=new Node(key,value);
        keyToMap.put(key,node);
        pushFront(node);
        
        //书太多了
        if(keyToMap.size()>capacity){
            Node backNode=dummy.prev;
            keyToMap.remove(backNode.key);
            remove(backNode);
        }

    }
```
获取
```java
    public int get(int key) {
        Node node = getNode(key);
        return node != null ? node.val : -1;
    }

    public Node getNode(int key) {
        if (!keyToMap.containsKey(key)) {
            return null;
        } // 判断是否存在
        Node node = keyToMap.get(key);
        // 抽出书
        remove(node);
        // 放在第一位
        pushFront(node);
        return node;

    }
```
移除
```java
    public void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
```
放到书堆的顶部

```java
public void pushFront(Node node) {
        node.next = dummy.next;
        node.prev = dummy;
        node.next.prev = node;
        node.prev.next = node;
}
```

## C++完整代码
```cpp
class Node{
    public:
    int key,val;
    Node *pre,*next;
    Node(int k,int v){
        key=k,val=v;
    }
};

class LRUCache {
public:
    map<int,Node*>mp;
    
    Node* dummy;
    int capacity;
    LRUCache(int capacity) {
        this->capacity=capacity;
        dummy=new Node(0,0);
        dummy->pre=dummy;
        dummy->next=dummy;
    }
    
    int get(int key) {
        if(mp.contains(key)){
            remove(mp[key]);
            push_head(mp[key]);
            return mp[key]->val;
        }
        return -1;
    }
    
    void put(int key, int value) {
        
        if(mp.contains(key)){
            Node *node=mp[key];
            node->val=value;
            remove(node);
            push_head(node);
            
        }else{
            Node *node=new Node(key,value);
            push_head(node);
            mp[key]=node;
        }

        if(mp.size()>capacity){
            
            Node* tem=dummy->pre;
            cout<<tem->key<<endl;
            remove(tem);
            mp.erase(tem->key);
        }
    }

    void push_head(Node *node){
        node->pre=dummy;
        node->next=dummy->next;
        node->pre->next=node;
        node->next->pre=node;

    }

    void remove(Node *node){
        node->pre->next=node->next;
        node->next->pre=node->pre;
    }
};
```