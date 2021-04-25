const Manager = require("../../models/manager");
const Worker = require("../../models/worker");
const { ErrorHandler } = require('../../services/errorHandler');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.Login = async function(req, res, next){

	try{
		const {email, password, role} = req.body;
		if (!email || !password || !role) {
			throw new ErrorHandler(400, 'Fields Cannot be empty');
		  }
		console.log(email);
		var user=null;
		if(role==='manager'){
			user = await Manager.findOne({Email: email });
		} else if(role==='worker'){
			user = await Worker.findOne({Email: email });
		}
		if (!user) throw new ErrorHandler(401, "User doesn't exists");
		const PasswordMatch = await bcrypt.compare(password, user.Password);
    	if (!PasswordMatch) throw new ErrorHandler(401, 'Incorrect Password');
		// const payload = {id: user._id};
		// const token = jwt.sign(payload, "constants.jwtString", {
		// 		expiresIn: 5,
		// });
		user_data = {
			Name: user.Name,
			Email: user.Email
		}
		res.status(200).send({
			message: "Login Authenticated", 
			// token: token, 
			id: user._id, 
			user: user_data
		});
	} catch(err){
		next(err);
	}	
};

// exports.LoginWorker = async function(req, res){
// 	const {email, password} = req.body;
// 	await Worker.findOne({
// 		Email: email
// 	}).then(async (err, worker) =>{
// 			if(err){
// 				res.status(500).send({ message: err });
//         return;
// 			}
// 			if (!worker) {
//         return res.status(404).send({ message: "Worker Not found." });
//       }

//       var passwordIsValid = bcrypt.compareSync(
//         password,
//         Worker.Password
//       );

//       if (!passwordIsValid) {
//         return res.status(401).send({
//           accessToken: null,
//           message: "Invalid Password!"
//         });
//       }

// 			const payload = {id: worker._id};
// 			const token = jwt.sign(payload, "constants.jwtString", {
// 					expiresIn: 5,
// 			});
// 			res.status(200).send({
// 				message: "Login Authenticated", 
// 				token: token, 
// 				id: manager._id, 
// 				worker: worker
// 			});
// 	})	
// };