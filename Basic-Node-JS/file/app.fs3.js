const fs = require('fs');
const fileName = 'data.txt';

const errHandler = err => console.log(err);
const dataHandler = data => console.log(data.toString());

//Async
console.log("Async ---> readFile");
fs.readFile(fileName, (err, data) => {
    if (err)
        errHandler(err);
    else
        dataHandler(data);
});

console.log("Node is async programming...")