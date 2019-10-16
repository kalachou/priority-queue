const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	push(data, priority) {
		let newNode = new Node(data, priority);
		this.insertNode(newNode);
		this.shiftNodeUp(newNode);
	}

	pop() {
		if (this.isEmpty()) {
			//do nothing
		} else {
			let detachedRoot = this.detachRoot();
			this.heapSize -= 1;

			this.restoreRootFromLastInsertedNode(detachedRoot);
			this.shiftNodeDown(this.root);
			return detachedRoot.data;
		}
	}

	detachRoot() {
		let detachedRoot = this.root;
		this.root = null;
		let rootIndex = this.parentNodes.indexOf(detachedRoot);
		if (rootIndex !== -1) {
			this.parentNodes.splice(rootIndex, 1);//or this.parentNodes.shift();
		}
		return detachedRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		let rootLeft = detached.left;
		let rootRight = detached.right;
		this.root = this.parentNodes.pop();
		let previousRootParent;
		if (this.root) {
			if (this.root.parent) {
				previousRootParent = this.root.parent;
				this.root.parent = null;
				if (previousRootParent.left === this.root) {
					previousRootParent.left = null;
				} else if (previousRootParent.right === this.root) {
					previousRootParent.right = null;
				}
			}
			if ((rootLeft !== this.root) 
				&& (rootRight !== this.root)) {
				this.root.left = rootLeft;
				if (rootLeft) {
					rootLeft.parent = this.root;
				}
				this.root.right = rootRight;
				if (rootLeft) {
					rootRight.parent = this.root;
				}
				if (previousRootParent 
					&& (previousRootParent.right === null)) {
					this.parentNodes.unshift(previousRootParent);
				}
			} else if ((rootLeft !== this.root) 
						&& (rootRight === this.root)) {
				this.root.left = rootLeft;
				rootLeft.parent = this.root;
				this.root.right = null;
				this.parentNodes.unshift(this.root);
			} else if ((rootLeft === this.root) 
						&& (rootRight !== this.root)) {
				this.parentNodes.push(this.root);
			}
		}
	}

	size() {
		return this.heapSize;
	}

	isEmpty() {
		let state = false;
		if (this.heapSize === 0) {
			state = true;
		}
		return state;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	insertNode(node) {
		if (this.isEmpty()) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			if (this.parentNodes[0].right === node) {
				this.parentNodes.shift();
			}
		}
		this.heapSize += 1;
	}

	shiftNodeUp(node) {
		if (node.parent) {
			if (node.priority > node.parent.priority) {
				let nodeIndex = this.parentNodes.indexOf(node);
				if (nodeIndex !== -1) {
					let nodeParentIndex = this.parentNodes.indexOf(node.parent);
					if (nodeParentIndex !== -1) {
						this.parentNodes[nodeParentIndex] = node;
					}
					this.parentNodes[nodeIndex] = node.parent;
				}
				node.swapWithParent();
				this.shiftNodeUp(node);
			}
		} else {
			this.root = node;
			this.root.parent = null;
		}
	}

	shiftNodeDown(node) {
		let newChild = node;
		let newParentCandidate;
		if (newChild && newChild.left) {
			if (newChild.right) {
				if (newChild.left.priority > newChild.right.priority) {
					newParentCandidate = newChild.left;
				} else {
					newParentCandidate = newChild.right;
				}
			} else {
				newParentCandidate = newChild.left;
			}

		}
		if (newParentCandidate && (newParentCandidate.priority > newChild.priority)) {
			if (!newChild.parent) {
				this.root = newParentCandidate;
			}
			newParentCandidate.swapWithParent();
			let indexNewParentCandidate = this.parentNodes.indexOf(newParentCandidate);
			let indexNewChild = this.parentNodes.indexOf(newChild);
			if (indexNewChild !== -1) {
				this.parentNodes[indexNewChild] = newParentCandidate;
			}
			if (indexNewParentCandidate !== -1) {
				this.parentNodes[indexNewParentCandidate] = newChild;
			}
			this.shiftNodeDown(newChild);
		}

	}
}

module.exports = MaxHeap;
