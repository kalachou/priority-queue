class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.right && this.left) {
			return;
		} else if (this.left) {
			this.right = node;
			this.right.parent = this;
		} else {
			this.left = node;
			this.left.parent = this;
		}
	}

	removeChild(node) {
		if (node === this.left) {
			this.left = null;
			node.parent = null;
			return;
		}

		if (node === this.right) {
			this.right = null;
			node.parent = null;
			return;
		}

		if ((node !== this.left) && (node !== this.right)) {
			throw Error('This is not a child');
		}
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent) {
			let nextChild = this.parent;
			let nextChildLeft;
			let nextChildRight;
			let nextParent = this;
			let nextParentLeft;
			let nextParentRight;
			let nextGrandparent;

			if (this.parent.parent) {
				nextGrandparent = this.parent.parent;
			}

			if (this.parent.left && (this.parent.left !== this)) {
				nextChildLeft = this.parent.left;
				this.parent.left = null;
			}

			if (this.parent.right && (this.parent.right !== this)) {
				nextChildRight = this.parent.right;
				this.parent.right = null;
			}

			if (this.left) {
				nextParentLeft = this.left;
				this.left = null;
			}

			if (this.right) {
				nextParentRight = this.right;
				this.right = null;
			}

			nextParent.remove();
			if (nextChildLeft) {
				nextChildLeft.parent = nextParent;
				nextParent.left = nextChildLeft;
			}

			if (nextChildRight) {
				nextChildRight.parent = nextParent;
				nextParent.right = nextChildRight;
			}

			if (nextParentLeft) {
				nextParentLeft.parent = nextChild;
				nextChild.left = nextParentLeft;
			}

			if (nextParentRight) {
				nextParentRight.parent = nextChild;
				nextChild.right = nextParentRight;
			}

			if (nextGrandparent) {
				nextChild.remove();
				nextGrandparent.appendChild(nextParent);
			}

			nextParent.appendChild(nextChild);

		}

	}
}

module.exports = Node;
