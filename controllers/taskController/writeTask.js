const Manager = require("../../models/manager");
const Worker = require("../../models/worker");
const Task = require("../../models/task");
const mongoose = require("mongoose");

exports.PostTask = (req, res) =>{
    const {MID, heading, description, time, points} = req.body;
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
    task.save((err, result) => {
        if (err) {
          console.log(err);
          res.json({
            message: "Sorry! Cannot insert record.",
          });
        } else {
          res.json({
            message: "record added.",
          });
        }
      });
};

exports.EditTask = async (req, res) =>{
    const {TID, heading, description, time, points} = req.body;
    console.log(typeof tid);
    if(heading){
        await Task.updateOne({_id: TID}, {
            // $set:{
                Heading: heading
            
        }).then(async (err, task) =>{
            if(err){
                res.status(500).send({ message: err });
            } else {
                res.json({
                    message: "record updated"
                })
            }
        });
    }
    if(description){
        await Task.updateOne({_id: TID}, {
            // $set: {
                Description: description
            
        }).then(async (err, task) =>{
            if(err){
                res.status(500).send({ message: err });
            } else {
                res.json({
                    message: "record updated"
                })
            }
        });
    }
    if(time){
        await Task.updateOne({_id: TID}, {
                Time:{
                    Days: time.days,
                    Hrs: time.hrs,
                    Mins: time.mins 
                 }
        }).then(async (err, task) =>{
            if(err){
                res.status(500).send({ message: err });
            } else {
                res.json({
                    message: "record updated"
                })
            }
        });
    }
    if(points){
        await Task.updateOne({_id: TID}, {
            // $set:{
                TotalPoints: points
        }).then(async (err, task) =>{
            if(err){
                res.status(500).send({ message: err });
            } else {
                res.json({
                    message: "record updated"
                })
            }
        });
    }
};

exports.AssignTask = async (req, res) => {
    try{
        const {TID, MID, WID} = req.body;
        await Task.updateOne({_id: TID, MId:MID}, {
            WId: WID
        })
        res.json({
            message: "record updated"
        })
    } catch (err){
        next(err);
    }
}