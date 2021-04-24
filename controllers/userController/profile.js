const Task = require("../../models/task");
const Worker = require("../../models/worker");
const { ErrorHandler } = require('../../services/errorHandler');

const bcrypt = require('bcryptjs');

exports.EditProfile = async (req, res, next) =>{
    try{
        const editedProfile = req.body;
        const {WID} = req.params;
        await Worker.updateOne({_id:WID}, {
            $set: editedProfile
        })
        res.json({message: 'profile updated'});
    } catch (err){
        next(err);
    }
};

exports.TaskHistory = async (req, res, next) => {
    try{
        const {WID} = req.query;
        const tasks = await Task.find({WId: WID, Status: 'Done'});
        if(tasks.length === 0) throw new ErrorHandler(404, 'Tasks Not Found');
        res.json(tasks);
    } catch (err){
        next(err);
    }
}