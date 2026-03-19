const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {

    const method = req.method;

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const id = parsedUrl.query.id;

    // GET students
    if (method === "GET" && pathname === "/students") {

        fs.readFile("students.json", "utf8", (err, data) => {

            let students = JSON.parse(data || "[]");

            if (id) {
                const student = students.find(s => s.id == id);
                res.end(JSON.stringify(student));
            } else {
                res.end(JSON.stringify(students));
            }

        });
    }

    // POST student
    else if (method === "POST" && pathname === "/students") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {

            const newStudent = JSON.parse(body);

            fs.readFile("students.json", "utf8", (err, data) => {

                let students = JSON.parse(data || "[]");

                const student = {
                    id: students.length + 1,
                    name: newStudent.name,
                    age: newStudent.age,
                    course: newStudent.course
                };

                students.push(student);

                fs.writeFile("students.json", JSON.stringify(students), () => {
                    res.end("Student added");
                });

            });

        });

    }

    // DELETE student
    else if (method === "DELETE" && pathname === "/students") {

        fs.readFile("students.json", "utf8", (err, data) => {

            let students = JSON.parse(data || "[]");

            students = students.filter(s => s.id != id);

            fs.writeFile("students.json", JSON.stringify(students), () => {
                res.end("Student deleted");
            });

        });

    }

    else {
        res.end("Route not found");
    }

});

server.listen(3000);