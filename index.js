const express=require('express');
const {Userzod, createtodozod, updatetodo} =require('./types');
const {User,Todo}= require('./db');
const jwt=require('jsonwebtoken');
const app=express();
const cors=require( 'cors' );
const usermiddleware=require ('./middleware/user');
app.use(express.json());
app.use(cors());

app.post('/signup',(req, res)=>{
    const username = req.headers.username;
    const password = req.headers.password;
    console.log(`Signup request received with username=${username} and password=${password}`);
    
    //add user to database
    User.create({
        username,
        password
    })
    .then(() => {
        console.log('Signup successful');
        res.json({msg: 'User created Successfully'});
      })
      .catch((err) => {
        console.log(`Signup failed: ${err.message}`);
        res.status(500).send('Internal Server Error');
      });
})


app.post('/signin',async (req, res)=>{
    const username=req.headers.username;
    const password= req.headers.password;
    const userjwt={username:req.headers.username};
    const response= await User.find({
        username:username,
        password:password
    });
    console.log(response._id);
    if(response){
        const token=jwt.sign(userjwt,'secretkey');
        res.header('authorizaton',token).json({
            token:token
        })
    }else{
        res.json({
            message:'invalid credentials'
        })
    }
})


app.post('/todo', usermiddleware, async (req, res) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const user= await User.findOne({username:req.username}); 
        // Add todo to database
        // console.log("Inside todo ",req.username,user)
        await Todo.create({
            title,
            description,
            user: user._id
        });

        res.status(200).json({ msg: 'Todo created Successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});


app.get('/todos',usermiddleware,async (req, res)=>{
    console.log(req);
    const username=req.username;
    const user=await User.findOne({username:username});
    console.log("Inside todos=> ",user);

    const todos=await Todo.find({ user: user._id});
    res.status(200).json({
        todos:todos
        // response:response._id
    })
})


app.delete('/delete',usermiddleware,async (req, res)=>{
    const id = req.body.id;
    try {
        const result = await Todo.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.status(404).send('To-do item not found');
        }
        res.send('To-do item deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})


app.listen(3001,()=>{console.log("Server is running")});