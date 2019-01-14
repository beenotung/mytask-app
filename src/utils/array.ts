export function find<A, B>(xs: A[], f: (a: A) => boolean, m: (a: A) => B, g: () => B): B {
  let idx = xs.findIndex(f);
  if (idx === -1) {
    return g()
  } else {
    return m(xs[idx])
  }
}

export function upsert<A>(xs: A[], f: (a: A) => boolean, x: A): A[] {
  let i = xs.findIndex(f);
  if (i === -1) {
    xs.push(x)
  } else {
    xs[i] = x;
  }
  return xs;
}
