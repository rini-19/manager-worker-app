const express = require('express');
const router = express.Router();

const Login = require("../controllers/userController/login");
const Register = require("../controllers/userController/register");
const WriteTask = require("../controllers/taskController/writeTask");
const ReadTask = require("../controllers/taskController/readTask");
const ReviewTask = require("../controllers/taskController/reviewTask");
const Profile = require("../controllers/userController/profile");
const Workers = require("../controllers/userController/getWorkers");

router.post("/loginManager", (req, res, next) => {
    Login.LoginManager(req, res, next);
});
router.post("/loginWorker", (req, res, next) => {
    Login.LoginWorker(req, res, next);
});
router.post("/registerManager", (req, res, next) => {
    Register.RegisterManager(req, res, next);
});
router.post("/registerWorker", (req, res, next) => {
    Register.RegisterWorker(req, res, next);
});
router.get("/getWorkers", (req, res, next) =>{
    Workers.GetWorkers(req, res, next);
})

router.post("/postTask", (req, res, next) => {
    WriteTask.PostTask(req, res, next);
});
router.post("/editTask", (req, res, next) => {
    WriteTask.EditTask(req, res, next);
});
router.post("/assignTask", (req, res, next) => {
    WriteTask.AssignTask(req, res, next);
});
router.get("/viewTaskManager", (req, res, next) => {
    ReadTask.ViewTaskManager(req, res, next);
});
router.get("/viewTaskWorker", (req, res, next) => {
    ReadTask.ViewTaskWorker(req, res, next);
});
router.get("/displayTask", (req, res, next) => {
    ReadTask.DisplayTask(req, res, next);
});
router.post("/submitTask", (req, res, next) => {
    ReviewTask.SubmitTask(req, res, next);
});
router.get("/reviewTaskList", (req, res, next) => {
    ReviewTask.ReviewTaskList(req, res, next);
});
router.post("/updateReview", (req, res, next) => {
    ReviewTask.UpdateReview(req, res, next);
});
router.post("/editProfile", (req, res, next) =>{
    Profile.EditProfile(req, res, next);
});
router.post("/taskHistory", (req, res, next) =>{
    Profile.TaskHistory(req, res, next);
});
router.get("/filterByDate", (req, res, next) =>{
    ReadTask.FilterByDate(req, res, next);
});

module.exports = router;