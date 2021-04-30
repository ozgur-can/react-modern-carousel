class LinkedList {
  constructor(circular) {
    this.head = null; // one head
    this.tail = null;
    this.length = 0;
    this.circular = circular;
  }

  addtoLast(imgSrc) {
    if (!this.head) {
      ++this.length;
      this.head = {
        imgSrc: imgSrc,
        prev: null,
        next: null,
        length: this.length,
      };
    } else {
      this.length++;
      let now = this.head;
      let newNode = {
        imgSrc: imgSrc,
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

  setItems(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.addtoLast(arr[i].props.src);

      if (this.circular && i == arr.length - 1) {
        this.head.prev = this.getLast();
        this.getLast().next = this.head;
      }
    }
  }
}

export { LinkedList };
