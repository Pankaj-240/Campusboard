const express = require("express");
const app = express();

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.json());

let notices = [
    {
    id: 1,
    author: "Pankaj",
    title: "Exam schedule changed",
    description: "End sem exams start from July 10",
    important: false
    },
    {
    id: 2,
    author: "Lolan",
    title: "Exam schedule form",
    description: "End sem exams should be filled by may 20",
    important: false
    }
]

app.get("/notices",(req,res)=>{
    res.render("index",{notices});
})

app.get("/notices/new",(req,res)=>{
    res.render("new");
})

app.post("/notices",(req,res)=>{
    let {title,description,author,important}= req.body;
    let id = notices[notices.length-1].id +1;
    let imp = important ? true : false;
    let data={
        id: id,
        author: author,
        title: title,
        description: description,
        important: imp   
    }
    notices.push(data)
    res.redirect("/notices");
})

let Port = process.env.PORT || 8000;

app.listen(8000,()=>{
    console.log("Listing at Port 8000...");
});