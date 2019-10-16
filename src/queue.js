const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize || 30;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.heap.heapSize < this.maxSize) {
			this.heap.push(data, priority);
		} else {
			throw Error('Overflow. Max size has been reached.');
		}
	}

	shift() {
		if (this.isEmpty()) {
			throw Error('The queue is empty!');
		}

		let removedNodeValue = this.heap.pop();
		return removedNodeValue;
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
