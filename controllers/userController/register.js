var Manager = require("../../models/manager");
var Worker = require("../../models/worker");

const bcrypt = require('bcryptjs');

exports.Register = async (req, res, next) =>{			
  try{
    const {name, email, password, role} = req.body;
    if (!name || !email || !password) {
      throw new ErrorHandler(400, 'Fields Cannot be empty');
    }
    const hashPsswd = await bcrypt.hashSync(password, 8);
    if(role==='manager'){
      const exists = await Manager.findOne({ email });
      if (exists) throw new ErrorHandler(409, 'Email already Exists');
      var manager = new Manager({
        Name: name.toLowerCase(),
        Email: email.toLowerCase(),
        Password: hashPsswd,
      });
      manager.save();
    } else if(role==='worker'){
      const exists = await Worker.findOne({ email });
      if (exists) throw new ErrorHandler(409, 'Email already Exists');
      var worker = new Worker({
        Name: name.toLowerCase(),
        Email: email.toLowerCase(),
        Password: hashPsswd,
      });
      worker.save();
      res.status(200).json({message: 'User Created'});
    }
  }	catch(err){
    next(err);
  }															
};