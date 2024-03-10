export class Queue<T> {
  constructor(private readonly q: T[] = []) {}

  push(value: T): void {
    this.q.push(value);
  }

  pop(): T {
    return this.q.shift() as T;
  }

  size(): number {
    return this.q.length;
  }

  isEmpty(): boolean {
    return this.q.length <= 0;
  }
}
