const express=require("express");
const TaskTracker=require("../models/TaskTracker");
const router=express.Router();

router.post("/", async (req,res)=>{
    try{
        const {title, description, dueDate, priority, status}=req.body;
        if(!title || !dueDate ){
            res.status(400).json({message:"invalid task input"});
        }

        const task=await TaskTracker.create({
            title, description, dueDate, priority, status,
        });

        res.status(201).json(task);

    }catch(err){
        res.status(500).json({message:"task not found or not reached"});
    }
})
.get("/",async (req,res)=>{
    try{
        const tasks = await TaskTracker.find().sort({createdAt: -1});
        !tasks ? res.status(404).json({message:"tasks not available"}):
        res.status(200).json(tasks);
    }catch(err){
        res.status(500).json({message:"task not found or not reached"});
    }
})
.put("/:id",async(req,res)=>{
    console.log("UPDATE HIT:", req.params.id, req.body);
    try{
        const task=await TaskTracker.findByIdAndUpdate(req.params.id,
            req.body,
            {new:true}
        );
        if(!task) return res.status(404).json({message:"no id found"});
         res.status(200).json(task);
    }catch(err){
        res.status(500).json({message:"task not found or not reached"});
    }
})
.delete("/:id",async (req,res)=>{
    try{
        const task= await TaskTracker.findByIdAndDelete(req.params.id);
        if (!task) {
        return res.status(404).json({ message: "no id found" });
        }
        res.status(204).json();
    }catch(err){
        res.status(500).json({message:"task not found or not reached"});
    }
});

module.exports=router;