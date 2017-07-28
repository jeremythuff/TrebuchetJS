
export function pull<T>(arr: T[], el: T): void {
  for (let i = 0; i < arr.length; ++i) {
    if (arr[i] === el) {
      arr.splice(i, 1);
      return;
    }
  }
}

