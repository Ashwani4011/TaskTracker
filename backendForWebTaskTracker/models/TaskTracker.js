const mongoose=require("mongoose");

const TaskSchema=new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: String,
    dueDate: {
        type: String,
        required:true
    },
    priority: String,
    status: String,
    },
    { timestamps: true });

module.exports=mongoose.model("TaskTracker",TaskSchema);