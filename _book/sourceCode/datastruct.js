/*
* created by wuyadream on 2018/08/03
*/

/* 1、hashtable */
class HashTable {
	constructor() {
		this.hashTable = new Object();
		this.size = 0;
	}

	_hasKey(key) {
		// 私有方法，获取哈希表是否含有key
		return key in this.hashTable;
	}

	add(key, value) {
		// 增加项
		if (!this._hasKey(key)) {
			this.hashTable[key] = value;
			this.size++;
		}
	}

	remove(key) {
		// 移除项
		if (this._hasKey) {
			delete this.hashTable[key];
			this.size--;
		}
	}

	getValue(key) {
		if (this._hasKey(key)) {
			return this.hashTable[key];
		}
		return null;
	}

	getSize() {
		return this.size;
	}

	clear() {
		// 清空hashtable
		this.hashTable = new Object();
		this.size = 0;
	}
}

/* let hash1 = new HashTable();
    
        hash1.add('name', 'bob');
        console.log(hash1.getValue('name'));
        console.log(hash1.getSize());
    
        hash1.add('age', '11');
        console.log(hash1.getValue('age'));
        console.log(hash1.getSize());
    
        hash1.remove('name');
        console.log(hash1.getValue('name'));
        console.log(hash1.getValue('age'));
        console.log(hash1.getSize());
    
        hash1.clear();
        console.log(hash1.getValue('name'));
        console.log(hash1.getValue('age'));
        console.log(hash1.getSize()); */

/*2、queue*/

class Queue {
	constructor() {
		this.queue = [];
	}

	enqueue(item) {
		// 添加元素
		if (typeof item != 'undefined') {
			this.queue.push(item);
		}
	}

	dequeue() {
		// 移除队顶元素
		if (this.queue.length > 0) {
			return this.queue.shift();
		}
		return undefined;
	}

	front() {
		// 获取队顶元素，不移除
		if (this.queue.size > 0) {
			return this.queue[0];
		}
		return undefined;
	}

	isEmpty() {
		// 判断队列是否为空
		if (this.queue.size > 0) {
			return false;
		}
		return true;
	}

	getLength() {
		// 获取队列长度
		let length = this.queue.length;
		return length;
	}

	clear() {
		// 清空队列
		this.queue = [];
	}

	print() {
		// 用于打印观察队列的情况
		this.queue.forEach((item, index) => {
			console.log(`${index} = ${item}`);
		});
	}
}

/* let queue1 = new Queue();
        queue1.enqueue(1);
        queue1.print();

        queue1.enqueue(3);
        queue1.enqueue(5);
        queue1.print();

        queue1.dequeue();
        queue1.print();

        queue1.clear();
        queue1.print(); */

/* 3、栈*/
class Stack {
	constructor() {
		this.stack = [];
	}

	push(item) {
		// 入栈
		this.stack.push(item);
	}

	pop() {
		// 出栈
		return this.stack.pop();
	}

	peak() {
		// 返回栈顶元素
		if (this.stack.length > 0) {
			return this.stack[this.stack.length - 1];
		}
		return undefined;
	}

	clear() {
		// 清空栈内所有元素
		this.stack = [];
	}

	isEmpty() {
		// 判断是否为空
		return !(this.stack.length > 0);
	}

	print() {
		// 用于打印观察栈的情况
		this.stack.forEach((item, index) => {
			console.log(`${index} = ${item}`);
		});
	}
}

/* let stack1 = new Stack();
        stack1.push(1);
        stack1.print();

        console.log('------');
        stack1.push(2);
        stack1.push(3);
        stack1.print();

        console.log('------');
        stack1.pop();
        stack1.print();
        console.log(stack1.peak());

        console.log('------');
        stack1.clear();
        stack1.print(); */

/* 4、单向链表 */
class Node {
	constructor(element) {
		this.element = element; // 当前节点的元素
		this.next = null; // 指向下一个节点
	}
}

class LList {
	constructor(element) {
		let node = new Node(element);
		this.headNode = node; // 头结点
	}

	insert(newElement, element) {
		// 插入节点
		let preNode = this.find(element);
		if (preNode) {
			let node = new Node(newElement);
			node.next = preNode.next;
			preNode.next = node;
		}
	}

	remove(element) {
		// 删除节点，注意headNode的指向
		if (this.headNode.element == element) {
			this.headNode = this.headNode.next;
			return true;
		}
		let preNode = this.findPrev(element);
		if (preNode) {
			preNode.next = preNode.next.next;
		}
	}

	find(element) {
		// 查找节点
		let currentNode = this.headNode;
		while (currentNode != null && currentNode.element != element) {
			currentNode = currentNode.next;
		}
		return currentNode;
	}

	findPrev(element) {
		// 查找前一个节点
		let preNode = null,
			currentNode = this.headNode;
		while (currentNode != null && currentNode.element != element) {
			preNode = currentNode;
			currentNode = currentNode.next;
		}
		if (currentNode == null) {
			return null;
		}
		return preNode;
	}

	print() {
		// 打印链表
		let currentNode = this.headNode;
		while (currentNode) {
			console.log(currentNode.element);
			currentNode = currentNode.next;
		}
	}
}

/* let lList1 = new LList(1);
        lList1.insert(2, 1);
        lList1.insert(3, 2);
        lList1.insert(4, 3);
        
        console.log('---------');
        lList1.print();
        console.log(lList1.find(1));
        console.log(lList1.find(2));
        console.log(lList1.find(5));

        console.log('---------');
        console.log(lList1.findPrev(2));
        console.log(lList1.findPrev(1));
        console.log(lList1.findPrev(5));

        console.log('---------');
        lList1.remove(4);
        lList1.remove(1);
        lList1.print();
        console.log(lList1.find(4)); */

/*5、双向链表*/
class Dnode {
	constructor(element) {
		this.element = element;
		this.next = null;
		this.previous = null;
	}
}

class DlList {
	constructor(element) {
		let headNode = new Dnode(element);
		this.headNode = headNode;
	}

	insert(newElement, element) {
		// 插入节点
		let preNode = this.find(element);
		if (preNode) {
			let node = new Dnode(newElement);
			node.previous = preNode;
			node.next = preNode.next;
			preNode.next = node;
			node.next && (node.next.previous = node);
		}
	}

	remove(element) {
		// 删除节点,注意headNode的指向
		let currentNode = this.find(element);
		if (this.headNode.element == element) {
			this.headNode = this.headNode.next;
		}
		currentNode.previous && (currentNode.previous.next = currentNode.next);
		currentNode.next && (currentNode.next.previous = currentNode.previous);
	}

	find(element) {
		// 查找节点
		let currentNode = this.headNode;
		while (currentNode != null && currentNode.element != element) {
			currentNode = currentNode.next;
		}
		return currentNode;
	}

	print() {
		// 打印链表
		console.log('-------正向链表--------');
		let currentNode = this.headNode;
		let preNode = null;
		while (currentNode) {
			console.log(currentNode.element);
			preNode = currentNode;
			currentNode = currentNode.next;
		}
		console.log('------- 反向链表-------');
		while (preNode) {
			console.log(preNode.element);
			preNode = preNode.previous;
		}
	}
}
/* let dlList1 = new DlList(1);
        dlList1.insert(2,1);
        dlList1.insert(3,2);
        dlList1.insert(4,3);

        dlList1.print();
        console.log('--------------');

        dlList1.remove(4);
        dlList1.print();
        console.log('--------------');

        dlList1.remove(1);
        dlList1.print();
        console.log('--------------'); */

/*6、二叉树*/
class TNode {
	constructor(element, leftChild, rightChild) {
		this.element = element;
		this.leftChild = leftChild || null;
		this.rightChild = rightChild || null;
	}
}

class BinaryTree {
	constructor(element) {
		this.rootNode = new TNode(element);
	}

	add(element, parent, type) {
		// 添加结点
		let node = new TNode(element);
		let parentNode = this.find(parent, this.rootNode);
		if (parentNode) {
			parentNode[type] = node;
		}
	}

	find(element, rootNode) {
		// 查找结点
		if (!rootNode) {
			return null;
		}
		if (rootNode.element === element) {
			return rootNode;
		} else {
			return this.find(element, rootNode.leftChild) || this.find(element, rootNode.rightChild);
		}
	}

	visit(node) {
		// 遍历
		console.log(node.element);
	}

	preOrderTraverse(rootNode) {
		// 先序遍历
		rootNode = rootNode || this.rootNode;
		this.visit(rootNode);
		rootNode.leftChild && this.preOrderTraverse(rootNode.leftChild);
		rootNode.rightChild && this.preOrderTraverse(rootNode.rightChild);
	}

	inOrderTraverse(rootNode) {
		// 中序遍历
		rootNode = rootNode || this.rootNode;
		rootNode.leftChild && this.inOrderTraverse(rootNode.leftChild);
		this.visit(rootNode);
		rootNode.rightChild && this.inOrderTraverse(rootNode.rightChild);
	}

	postOrderTraverse(rootNode) {
		// 后序遍历
		rootNode = rootNode || this.rootNode;
		rootNode.leftChild && this.postOrderTraverse(rootNode.leftChild);
		rootNode.rightChild && this.postOrderTraverse(rootNode.rightChild);
		this.visit(rootNode);
	}
}

/* let tree1 = new BinaryTree(1);
tree1.add(2, 1, 'leftChild');
tree1.add(3, 1, 'rightChild');
tree1.add(4, 2, 'leftChild');
tree1.add(5, 2, 'rightChild');
tree1.add(6, 3, 'leftChild');
tree1.add(7, 3, 'rightChild');

console.log('先序遍历');
tree1.preOrderTraverse();

console.log('中序遍历');
tree1.inOrderTraverse();

console.log('后序遍历');
tree1.postOrderTraverse(); */
