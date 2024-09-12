const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/users');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res)=>{
    res.render("index");
})

app.get('/read', async (req,res)=>{
    let users = await userModel.find();
    res.render("read",{users});
})

app.get('/edit/:contact_id', async (req,res)=>{
    let user = await userModel.findOne({contact_id: req.params.contact_id});
    res.render("edit", {user});
})

app.post('/update/:contact_id', async (req,res)=>{
    let {contact_id, first_name,last_name,email,mobile_number,data_store} = req.body;
    let user = await userModel.findOneAndUpdate({contact_id: req.params.contact_id},{contact_id, first_name,last_name,email,mobile_number,data_store} , {new: true});
    res.redirect("/read");
})


app.get('/delete/:contact_id', async (req,res)=>{
    let users = await userModel.findOneAndDelete({contact_id: req.params.contact_id});
    res.redirect("/read");
})

app.post('/create', async (req,res)=>{
    
    let {contact_id, first_name,last_name,email,mobile_number,data_store} = req.body;
    
    let createdUser = await userModel.create({
        contact_id,
        first_name,
        last_name,
        email,
        mobile_number,
        data_store
    });
    res.redirect("/read");
})

app.listen(3000);