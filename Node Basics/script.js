
const math = require("./math");

const args = process.argv;
for (let i = 2; i < args.length; i++) {
    console.log(`${args[i]} - ${i}`);
}

console.log(math.pi);
console.log(math.gra);
console.log(math.sum(2,3));
console.log(math.mul(10,10));

