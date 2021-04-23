const Manager = require("../../models/manager");
const Worker = require("../../models/worker");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const manager = require("../../models/manager");

exports.LoginManager = async function(req, res){
	const {email, password} = req.body;
	await Manager.findOne({
		Email: email
	}).then(async (err, manager) =>{
			if(err){
				res.status(500).send({ message: err });
        return;
			}
			if (!manager) {
        return res.status(404).send({ message: "Manager Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        password,
        manager.Password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

			const payload = {id: manager._id};
			const token = jwt.sign(payload, "constants.jwtString", {
					expiresIn: 5,
			});
			res.status(200).send({
				message: "Login Authenticated", 
				token: token, 
				id: manager._id, 
				manager: manager
			});
	})	
};

exports.LoginWorker = async function(req, res){
	const {email, password} = req.body;
	await Worker.findOne({
		Email: email
	}).then(async (err, worker) =>{
			if(err){
				res.status(500).send({ message: err });
        return;
			}
			if (!worker) {
        return res.status(404).send({ message: "Worker Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        password,
        Worker.Password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

			const payload = {id: worker._id};
			const token = jwt.sign(payload, "constants.jwtString", {
					expiresIn: 5,
			});
			res.status(200).send({
				message: "Login Authenticated", 
				token: token, 
				id: manager._id, 
				worker: worker
			});
	})	
};