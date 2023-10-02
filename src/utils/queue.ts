export class Queue<T> {
  constructor(private readonly q: Array<T> = []) {}

  push(value: T) {
    this.q.push(value);
  }

  pop() {
    return this.q.shift();
  }

  size() {
    return this.q.length;
  }

  isEmpty() {
    return this.q.length <= 0;
  }
}
