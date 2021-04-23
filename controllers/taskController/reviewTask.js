const Task = require("../../models/task");
const Worker = require("../../models/worker");
const mongoose = require('mongoose');
const { ErrorHandler } = require('../../services/errorHandler');

exports.SubmitTask = async (req, res, next) =>{
    try{
        const {TID, TaskContent} = req.body;
        const task = await Task.updateOne({_id: TID}, {
                ContentTxt: TaskContent,
                ReviewUpdate: 'AskReview'
        })
        res.json({message: 'task submitted'});
    } catch (err){
        next(err);
    }
};

exports.ReviewTaskList = async (req, res) =>{
    try{
        const {MID} = req.body;
        const tasks = await Task.find({MId: MID, ReviewUpdate: 'AskReview'});
        if(tasks.length === 0) throw new ErrorHandler(404, 'Task Not Found');
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

exports.UpdateReview = async (req, res, next) =>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const {TID, Review} = req.body;
        var points = 0, WID='';
        if(Review === 'Accept'){
            await Task.updateOne({_id: TID}, {ReviewUpdate: 'Accepted', Status: 'Done'}).session(session);
            const task = await Task.findOne({_id: TID});
            console.log(task);
            if (!task) throw new ErrorHandler(404, 'Task Not Found');
            points = task.TotalPoints;
            WID = task.WId;
            console.log(WID);
            const worker = await Worker.findOne({_id: WID});
            if (!worker) throw new ErrorHandler(404, 'Worker Not Found');
            worker.Reward = worker.Reward + points;
            worker.save();
            await session.commitTransaction();
            res.json({message: 'task accepted', worker});
        } else if(Review === 'Reject'){
            await Task.findOneAndUpdate({TId: TID}, {ReviewUpdate: 'Rejected', Status: 'Assigned'}).session(session);
            await session.commitTransaction();
            res.json({message: 'task rejected'});
        }
    } catch(err){
        await session.abortTransaction();
        next(err);
    } finally {
        session.endSession();
    }
        
};
