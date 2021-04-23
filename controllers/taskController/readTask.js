const Task = require("../../models/task");
const { ErrorHandler } = require('../../services/errorHandler');

exports.ViewTaskManager = async (req, res, next) => {
    try {
        const {MID} = req.query;
        console.log(MID);
        console.log(typeof MID);
        const tasks = await Task.find({MId: MID});
        if(tasks.length===0) throw new ErrorHandler(404, 'No results found');
        res.json(tasks);
    } catch (err) {
        next(err);
    }
  };

exports.ViewTaskWorker = async (req, res, next) =>{
    try {
        const {WID} = req.query;
        const tasks = await Task.find({WId: WID});
        if(tasks.length===0) throw new ErrorHandler(404, 'No results found');
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

exports.DisplayTask = async (req, res, next) =>{
    try {
        const {TID} = req.query;
        const tasks = await Task.find({TId: TID});
        if(tasks.length===0) throw new ErrorHandler(404, 'No results found');
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

exports.FilterByDate = async (req, res, next) =>{
    try{
        const {date} = req.query;
        const tasks = await Task.find({CreatedAt: date});
        if(tasks.length===0) throw new ErrorHandler(404, 'No results found');
        res.json(tasks);
    } catch(err) {
        next(err);
    }
}