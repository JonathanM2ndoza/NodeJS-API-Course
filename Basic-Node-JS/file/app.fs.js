const fs = require('fs');
const fsPromises = fs.promises;
const fileName = 'data.txt';

fs.watch(fileName, (eventType, filename) => {
    if (eventType === 'change') {
        console.log(filename, 'changed.');
        readFile(fileName).then(x => console.log(x));
    }
});

async function readFile(fileName) {
    try {
        return fsPromises.readFile(fileName, 'utf8');
    } catch (err) {
        console.error('Error occured while reading file!', err);
    }
}