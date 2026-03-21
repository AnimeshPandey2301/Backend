const http = require("http");
const fs = require("fs");

const PORT = 3000;
const DATA_FILE = "./students.json";

function getStudents() {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
}

function saveStudents(students) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(students, null, 2));
}

const server = http.createServer((req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method === "GET" && req.url === "/api/students") {
        const students = getStudents();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(students));
    }

    else if (req.method === "POST" && req.url === "/api/students") {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            const newStudent = JSON.parse(body);
            const students = getStudents();

            students.push(newStudent);
            saveStudents(students);

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(newStudent));
        });
    }

    else if (req.method === "PUT" && req.url.startsWith("/api/students/")) {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            const id = parseInt(req.url.split("/")[3]);
            const updatedData = JSON.parse(body);

            let students = getStudents();
            students = students.map(student =>
                student.id === id ? { ...student, ...updatedData } : student
            );

            saveStudents(students);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Student updated" }));
        });
    }

    else if (req.method === "DELETE" && req.url.startsWith("/api/students/")) {
        const id = parseInt(req.url.split("/")[3]);

        let students = getStudents();
        students = students.filter(student => student.id !== id);

        saveStudents(students);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Student deleted" }));
    }

    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});