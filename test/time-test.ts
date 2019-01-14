import {formatTimeLeft} from "../src/utils/time";
import {WEEK} from "@beenotung/tslib/time";

console.log(formatTimeLeft(Date.now() + WEEK * Math.PI, true));
console.log(formatTimeLeft(Date.now() + WEEK * Math.PI, false));
