"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = generate;
const MAX_LEN = 5;
function generate() {
    const subset = "123456789qwertyuiopasdfghjklzxcvbnm";
    const length = 5;
    let ans = "";
    for (let i = 0; i < length; i++) {
        ans += subset[Math.floor(Math.random() * subset.length)];
    }
    return ans;
}
