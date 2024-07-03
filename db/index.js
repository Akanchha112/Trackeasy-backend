const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://sakanchha111:RHCk0rt5sBKHID7H@cluster3.pasbi7b.mongodb.net/TrackEasy');

const UserSchema=new mongoose.Schema({
    username:{type:String},
    password:{type:String}
    
})
const todoSchema=new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const User=mongoose.model('User',UserSchema);
const Todo=mongoose.model('Todo',todoSchema);

module.exports={
    User,
    Todo
}