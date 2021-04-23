const Worker = require("../../models/worker");

exports.GetWorkers = async (req, res, next) => {
    try{
        const workers = await Worker.find();
        if(workers.length === 0) throw new ErrorHandler(404, 'Tasks Not Found');
        res.json(workers);
    } catch (err){
        next(err);
    }
}