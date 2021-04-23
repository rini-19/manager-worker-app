const Task = require("../../models/task");
const Worker = require("../../models/worker");

const bcrypt = require('bcryptjs');

exports.EditProfile = async (req, res, next) =>{
    try{
        const {WID, email, password, name} = req.body;
        await Worker.updateOne({_id:WID}, {
            Email: email.toLowerCase(),
            Password: bcrypt.hashSync(password, 8),
            Name: name.toLowerCase()
        })
        res.json({message: 'profile updated'});
    } catch (err){
        next(err);
    }
};

exports.TaskHistory = async (req, res, next) => {
    try{
        const {WID} = req.body;
        const tasks = await Task.find({WId: WID, Status: 'Done'});
        if(tasks.length === 0) throw new ErrorHandler(404, 'Tasks Not Found');
        res.json(tasks);
    } catch (err){
        next(err);
    }
}