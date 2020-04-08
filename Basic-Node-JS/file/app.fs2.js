const fs = require('fs');
const fileName = 'data.txt';

//Sync
const data = fs.readFileSync(fileName);
console.log("Sync ---> readFileSync");
console.log(data.toString());

//Async
console.log("Async ---> readFile");
fs.readFile(fileName, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data.toString());
    }
});

console.log("Node is async programming...")