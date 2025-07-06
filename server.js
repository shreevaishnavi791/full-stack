const http = require("http");
const fs = require("fs");
const path = require("path");

const hostname = "localhost";
const port = 3000;

http
  .createServer((req, res) => {
    console.log(`Request for ${req.url} received.`);

    let filePath = "." + req.url;
    if (filePath === "./") {
      filePath = "./index.html";
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
      ".html": "text/html",
      ".css": "text/css",
    };

    const contentType = mimeTypes[extname] || "application/octet-stream";

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code == "ENOENT") {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end("<h1>404 Not Found</h1>", "utf-8");
        } else {
          res.writeHead(500);
          res.end(`Server Error: ${error.code}`);
        }
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content, "utf-8");
      }
    });
  })
  .listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
