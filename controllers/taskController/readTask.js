const Task = require("../../models/task");
const { ErrorHandler } = require('../../services/errorHandler');

exports.ViewTaskManager = async (req, res, next) => {
    try {
        const {MID} = req.body;
        const tasks = await Task.find({MId: MID});
        if(tasks.length===0) throw new ErrorHandler(404, 'No results found');
        res.json(tasks);
    } catch (err) {
        next(err);
    }
  };

exports.ViewTaskWorker = async (req, res, next) =>{
    try {
        const {WID} = req.body;
        const tasks = await Task.find({WId: WID});
        if(tasks.length===0) throw new ErrorHandler(404, 'No results found');
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

exports.DisplayTask = async (req, res, next) =>{
    try {
        const {TID} = req.body;
        const tasks = await Task.find({TId: TID});
        if(tasks.length===0) throw new ErrorHandler(404, 'No results found');
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

exports.FilterByDate = async (req, res, next) =>{
    try{
        const {date} = req.body;
        const tasks = await Task.find({CreatedAt: date});
        if(tasks.length===0) throw new ErrorHandler(404, 'No results found');
        res.json(tasks);
    } catch(err) {
        next(err);
    }
}