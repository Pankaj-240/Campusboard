const express = require("express");
const methodOverride = require('method-override')
const app = express();

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));

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
});

app.get("/notices/new",(req,res)=>{
    res.render("new");
});

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
});

app.get("/notices/:id",(req,res)=>{
    let {id} = req.params;
    let data = notices.find((e)=>e.id==id);
    res.render("show",{data});
});

app.get("/notices/:id/edit",(req,res)=>{
    let {id}= req.params;
    let data = notices.find((e)=>e.id==id);
    res.render("edit",{data});
});

app.put("/notices/:id",(req,res)=>{
    let {title,author,description}=req.body;
    let notice = notices.find((e)=>e.id==req.params.id);
    notice.title= title;
    notice.description=description;
    notice.author=author;
    res.redirect(`/notices/${notice.id}`);
});

app.delete("/notices/:id",(req,res)=>{
    let notice = notices.find((e)=>e.id==req.params.id);
    let idx= notices.indexOf(notice);
    notices.splice(idx,1);
    res.redirect("/notices");
})

let Port = process.env.PORT || 8000;

app.listen(8000,()=>{
    console.log("Listing at Port 8000...");
});