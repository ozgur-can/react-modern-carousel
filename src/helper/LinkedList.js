class LinkedList {
  constructor(circular) {
    this.head = null; // one head
    this.length = 0;
    this.circular = circular;
  }

  addtoLast(nodeContent) {
    if (!this.head) {
      ++this.length;
      this.head = {
        nodeContent: nodeContent,
        prev: null,
        next: null,
        index: this.length,
      };
    } else {
      this.length++;
      let now = this.head;
      let node = {
        nodeContent: nodeContent,
        prev: null,
        next: null,
        index: this.length,
      };

      while (now.next != null) now = now.next;

      now.next = node;
      node.prev = now;
    }
  }
  
  getLast() {
    let node = this.head;
    while (node.next != null) node = node.next;
    return node;
  }

  getItemAt(i) {
    let node = this.head;
    for (let j = 0; j < i; j++) node = node.next;
    return node;
  }

  setItems(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.addtoLast(arr[i]);

      if (this.circular && i == arr.length - 1) {
        this.head.prev = this.getLast();
        this.getLast().next = this.head;
      }
    }
  }
}

export { LinkedList };
