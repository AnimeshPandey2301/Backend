const express = require('express');
const app = express();

app.get("/add",(req,res)=>{
    const a=parseInt(req.query.a);
    const b=parseInt(req.query.b);
    res.send((a+b).toString());
});
app.get("/sub",(req,res)=>{
    const a=parseInt(req.query.a);
    const b=parseInt(req.query.b);
    res.send((a-b).toString());
});
app.get("/mul",(req,res)=>{
    const a=parseInt(req.query.a);
    const b=parseInt(req.query.b);
    res.send((a*b).toString());
});

app.get("/",(req,res)=>{
    res.send("Welcome to Calculator API");
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});