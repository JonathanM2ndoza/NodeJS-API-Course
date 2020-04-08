//Don't use var, It's recommended use let and const

//console.log("PROCESS", process);

const helpers = require('./helpers');

const total = helpers.sum(10, 50);
console.log("Total: ", total);