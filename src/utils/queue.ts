export class Queue<T> {
  constructor(private readonly q: Array<T> = []) {}

  push(value: T) {
    this.q.push(value);
  }

  pop() {
    this.q.shift();
  }

  size() {
    return this.q.length;
  }
}
