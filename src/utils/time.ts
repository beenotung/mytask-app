import {DAY, HOUR, MINUTE, SECOND, WEEK} from "@beenotung/tslib/time";
import {last} from "@beenotung/tslib/array";

let units: Array<[number, string]> = [
  [SECOND, 'sec'],
  [MINUTE, 'min'],
  [HOUR, 'hr'],
  [DAY, 'd'],
  [WEEK, 'w']
];
units = units.reverse();

function div(a: number, b: number) {
  return Math.floor(a / b)
}

let sig = 2;

function round(x: number) {
  let p = Math.pow(10, sig);
  return Math.round(x * p) / p;
}

function getUnit(d: number): [number, string] {
  let last = units[0];
  for (let [size, name] of units) {
    if (div(d, size) === 0) {
      return last;
    }
    last = [size, name];
  }
  return last;
}


export function formatTimeLeft(deadline: number, full = false) {
  let now = Date.now();
  let diff = deadline - now;
  if (diff <= 0) {
    return 'due';
  }
  let msg = '';
  // let [size, name] = getUnit(diff);
  // msg += round(diff / size) + ' ' + name;
  let minUnit = last(units)[0];
  for (; diff >= minUnit;) {
    for (let unit of units) {
      let [size, name] = unit;
      if (diff >= size) {
        if (!full) {
          return round(diff / size) + ' ' + name;
        }
        let d = div(diff, size);
        msg += ' ' + d + ' ' + name;
        diff -= d * size;
      }
    }
  }
  return msg.trim() || 'now'
}

