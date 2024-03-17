const express = require("express");
const cors = require("cors"); // Import the cors module
const http = require("http");

const app = express();

app.use(
  cors({
    origin: "http://192.168.137.97", // Replace with the IP address of your ESP32
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

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
