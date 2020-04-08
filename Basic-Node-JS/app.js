//Don't use var, It's recommended use let and const

//console.log("PROCESS", process);
//const helpers = require('./helpers');

const { sum, minus } = require('./helpers');

const totalSum = sum(10, 50);
const totalMinus = minus(60, 20);

console.log("Total Sum: ", totalSum);
console.log("Total Minus: ", totalMinus);