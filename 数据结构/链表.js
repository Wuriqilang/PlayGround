function Node(element) {
    this.element = element; //当前节点中存储的内容
    this.next = null; //下一个节点链接
}

function LinkedList() {
    this.head = new Node('head');  //头节点
    this.find = find;                           //查找节点
    this.insert = insert;                      //插入节点
    //this.remove = remove;               // 删除节点
    //this.findPrev = findPrev;             // 查找前一个节点
    this.display = display;                // 显示链表
    //查找
    function find(item) {
        var currNode = this.head;
        while (currNode.element != item) {
            currNode = currNode.next;
        }
        return currNode;
    }
    //插入
    function insert(newElement, item) {
        var newNode = new Node(newElement);
        var currNode = this.find(item);
        newNode.next = currNode.next;
        currNode.next = newNode;
    }
    //显示
    function display() {
        var currNode = this.head;
        while (!(currNode.next == null)) {
            console.log(currNode.next.element);
            currNode = currNode.next;
        }
    }
}

var demo = new LinkedList();