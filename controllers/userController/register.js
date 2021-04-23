var Manager = require("../../models/manager");
var Worker = require("../../models/worker");

const bcrypt = require('bcryptjs');

exports.RegisterManager = (req, res) =>{																				//check for duplicate email
	const {name, email, password} = req.body;
	var manager = new Manager({
		Name: name.toLowerCase(),
		Email: email.toLowerCase(),
		Password: bcrypt.hashSync(password, 8),
	});
	manager.save((err, result) => {
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

exports.RegisterWorker = (req, res) =>{																				//check for duplicate email
	const {name, email, password} = req.body;
	var worker = new Worker({
		Name: name.toLowerCase(),
		Email: email.toLowerCase(),
		Password: bcrypt.hashSync(password, 8),
	});
	worker.save((err, result) => {
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