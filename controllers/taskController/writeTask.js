const Manager = require("../../models/manager");
const Worker = require("../../models/worker");
const Task = require("../../models/task");
const mongoose = require("mongoose");

exports.PostTask = (req, res, next) =>{
    try{
        const {MID, heading, description, time, points} = req.body;
        if (!MID || !heading || !description || !time || !points) {
            throw new ErrorHandler(400, 'Fields Cannot be empty');
          }
        const task = new Task({
            MId: MID,
            Heading: heading.toLowerCase(),
            Description: description.toLowerCase(),
            Time: {
                Days: time.days,
                Hrs: time.hrs,
                Mins: time.mins
            },
            TotalPoints: points
        });
        task.save();
        res.status(200).json({message: 'Task Created'});
    } catch(err) {
        next(err);
    }
};	

exports.EditTask = async (req, res, next) =>{
    try{
        const editedTask = req.body;
        const {TID} = req.params;
        console.log(TID);
        console.log(editedTask);
        await Task.updateOne({_id:TID}, {$set: editedTask});
        res.json({
            message: "record updated"
        })
    } catch(err){
        next(err);
    }
    
};

exports.AssignTask = async (req, res) => {
    try{
        const {TID, MID, WID} = req.body;
        await Task.updateOne({_id: TID, MId:MID}, {
            WId: WID,
            Status: 'Assigned'
        })
        res.json({
            message: "record updated"
        })
    } catch (err){
        next(err);
    }
}