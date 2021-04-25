const Task = require("../../models/task");
const Worker = require("../../models/worker");
const { ErrorHandler } = require('../../services/errorHandler');

const bcrypt = require('bcryptjs');
const worker = require("../../models/worker");

exports.EditProfile = async (req, res, next) =>{
    try{
        const editedProfile = req.body;
        const {WID} = req.params;
        worker = await Worker.findOne({_id: WID});
        console.log(worker);
        // await Worker.updateOne({_id:WID}, {
        //     editedProfile
        // })
        for (let key in req.body) {
            if (worker[key] && worker[key] !== req.body[key])
                worker.$set[key] = req.body[key];
        }
        worker.save();
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

