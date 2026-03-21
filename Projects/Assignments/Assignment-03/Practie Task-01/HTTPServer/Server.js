const http = require('http');   

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`); 
    const pathname = url.pathname;
    console.log("Path:", pathname); 

    if (req.method==="GET" && pathname==="/") {
        res.writeHead(200,{"content-type":"text/plain"});
        res.end("Welcome to Node API");
    }


    const fs =require("fs");
    if (req.method==="GET" && pathname==="/notes"){
        fs.readFile("notes.json","utf-8",(err,data)=>{if(err){
            res.writeHead(500);
            res.end("Error reading notes"); 
            return;

        }
        res.writeHead(200,{"content-type":"application/json"});
        res.end(data);
    });
    }

   else if (req.method==="POST" && pathname==="/notes"){

        let body = "";
        req.on("data",(chunk)=>{
            body+=chunk;
        });     
        req.on("end",()=>{
            const newNote = JSON.parse(body);
            fs.readFile("notes.json","utf-8",(err,data)=>{
                const notes = JSON.parse(data);
                notes.push(newNote);
                fs.writeFile("notes.json",JSON.stringify(notes),()=>{
                    res.writeHead(201,{"content-type":"application/json"});
                    res.end(JSON.stringify({message:"Notes added successfully"}));
                });
            });
        }); 
    }

    else if(req.method==="GET" && pathname==="/notes"){
        const id = url.searchParams.get("id");
        fs.readFile("notes.json","utf-8",(err,data)=>{
            const notes = JSON.parse(data);
            if(id){
                const note = notes.find(n=>n.id===id);  
                res.end(JSON.stringify(note || {}));
            }else{
                res.end(JSON.stringify(notes));
            }
        });
    }

});    
server.listen(3000,()=>{
    console.log("Server is running");
})