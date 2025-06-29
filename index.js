const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const FILES_DIR = path.join(__dirname, 'files');

if (!fs.existsSync(FILES_DIR)) {
    fs.mkdirSync(FILES_DIR);
}

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);
    const getFilePath = (fileName) => path.join(FILES_DIR, fileName);

    switch (pathname) {
        case '/create': {
            const fileName = query.name || 'abhishek.txt';
            const content = query.content || 'Empty content';
            const filePath = getFilePath(fileName);

            fs.writeFile(filePath, content, (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    return res.end('Error: Could not create file.');
                }
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`File '${fileName}' created successfully.`);
            });
            break;
        }

        case '/read': {
            const fileName = query.name;
            if (!fileName) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                return res.end('Error: Please specify the file name to read.');
            }
            const filePath = getFilePath(fileName);

            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    return res.end(`Error: File '${fileName}' not found.`);
                }
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`Content of '${fileName}':\n\n${data}`);
            });
            break;
        }

        case '/delete': {
            const fileName = query.name;
            if (!fileName) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                return res.end('Error: Please specify the file name to delete.');
            }
            const filePath = getFilePath(fileName);

            fs.unlink(filePath, (err) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    return res.end(`Error: File '${fileName}' not found or already deleted.`);
                }
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`File '${fileName}' deleted successfully.`);
            });
            break;
        }

        default: {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(
                `Invalid route. Available endpoints:\n\n` +
                `Create: /create?name=filename.txt&content=yourText\n` +
                `Read:   /read?name=filename.txt\n` +
                `Delete: /delete?name=filename.txt`
            );
        }
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

/**
 *  What i learned by this assignment:
 * ----------------------
 * 1. All routes use consistent 'Content-Type: text/plain' headers.
 * 2. Output messages are emoji-tagged for clarity.
 * 3. Directory 'files' auto-created at server startup.
 * 4. Only Node.js core modules used (http, fs, path, url).
 * 5. This script must be run using Node.js (not in a browser).
 */
