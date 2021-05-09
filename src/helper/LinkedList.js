class LinkedList {
  constructor(circular) {
    this.head = null; // one head
    this.tail = null;
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
        length: this.length,
      };
    } else {
      this.length++;
      let now = this.head;
      let newNode = {
        nodeContent: nodeContent,
        prev: null,
        next: null,
        length: this.length,
      };

      while (now.next != null) now = now.next;

      now.next = newNode;
      newNode.prev = now;
      // newNode.next = this.head; //yeni
    }
  }
  
  getLast() {
    let newNode = this.head;
    while (newNode.next != null) newNode = newNode.next;
    return newNode;
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
