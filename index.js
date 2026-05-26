const express = require("express");
const methodOverride = require('method-override')
const app = express();
const path = require("path");

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));

const notices = require("./data/data.json");

app.get("/notices",(req,res)=>{
    res.render("index",{notices});
});

app.get("/notices/new",(req,res)=>{
    res.render("new");
});

app.post("/notices",(req,res)=>{
    let {title,description,author,important}= req.body;
    let id;

    if(notices.length === 0){
        id = 1;
    }else{
        id = notices[notices.length - 1].id + 1;
    }
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
    if(!data) return res.status(404).send("Notice not found");
    res.render("show",{data});
});

app.get("/notices/:id/edit",(req,res)=>{
    let {id}= req.params;
    let data = notices.find((e)=>e.id==id);
    if(!data) return res.status(404).send("Notice not found");
    res.render("edit",{data});
});

app.put("/notices/:id",(req,res)=>{
    let {title,author,description}=req.body;
    let notice = notices.find((e)=>e.id==req.params.id);
    if(!notice) return res.status(404).send("Notice not found");
    notice.title= title;
    notice.description=description;
    notice.author=author;
    res.redirect(`/notices/${notice.id}`);
});

app.patch("/notices/:id/important",(req,res)=>{
    let notice = notices.find((e)=>e.id==req.params.id);
    if(!notice) return res.status(404).send("Notice not found");
    notice.important =! notice.important;
    res.redirect(`/notices/${req.params.id}`);
})

app.delete("/notices/:id",(req,res)=>{
    let notice = notices.find((e)=>e.id==req.params.id);
    if(!notice) return res.status(404).send("Notice not found");
    let idx= notices.indexOf(notice);
    notices.splice(idx,1);
    res.redirect("/notices");
})

let Port = process.env.PORT || 8000;

app.listen(Port,()=>{
    console.log(`Listing at Port ${Port}...`);
    console.log(`http://localhost:${Port}/notices`)
});