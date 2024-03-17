const express = require("express");
const cors = require("cors"); // Import the cors module
const http = require("http");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow access from any origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow specific HTTP methods
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow specific HTTP headers
  next();
});

const port = 3001;

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/sensor-data") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); // convert Buffer to string
    });
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        // Here, you can handle the received sensor data, e.g., store it in a database
        console.log("Received sensor data:", data);
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Data received successfully");
      } catch (error) {
        console.error("Error parsing JSON:", error);
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Invalid JSON data");
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
