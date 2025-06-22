//Original Code using Callbacks:this code reads from 'input.txt' and writes to 'output.txt' using Node.js callbacks.


const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    fs.writeFile('output.txt', data, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('File written successfully!');
    });
});


// Refactored Code using Promises and async/await: This code achieves the same functionality using Promises for better readability and error handling.

const fs = require('fs/promises'); // Use the promise-based fs module

async function copyFileContent() {
    try {
        // Read the content of input.txt
        const data = await fs.readFile('input.txt', 'utf8');

        // Write the content into output.txt
        await fs.writeFile('output.txt', " ✅File created by Node.js\n");

        console.log('✅ File copied successfully!');
    } catch (error) {
        console.error('❌ Something went wrong:', error.message);
    }
}

copyFileContent();

/* 
🧠 Notes || What i learned from this —>

1. CALLBACK:
   - A function you pass as an argument to another function.
   - It gets "called back" after some work is done.
   - Example:
     fs.readFile('file.txt', (err, data) => { ... }); 
     // This is a callback style.

   🔁 Problem: If you nest too many callbacks, it becomes hard to read — called "callback hell".

2. PROMISE:
   - An object that represents the result of an asynchronous operation (e.g., reading a file).
   - It can be in 3 states:
     ➤ Pending: Still waiting
     ➤ Fulfilled: Successfully completed
     ➤ Rejected: Something went wrong

   - You can use `.then()` and `.catch()` to handle results and errors.
     Example: 
     fs.readFile('file.txt').then(data => {...}).catch(err => {...});

3. ASYNC / AWAIT:
   - Modern way to work with Promises.
   - Makes your async code look like regular, synchronous code.
   - `async` marks a function that uses `await` inside.
   - `await` tells JS: "Pause here until the Promise resolves or fails".

   ✅ Cleaner, easier to read, and helps avoid callback hell.

💡 In short: 
   Callbacks → Promises → Async/Await (most modern & clean)
   */
