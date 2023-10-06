import { Router } from "express";
import { expressjwt } from "express-jwt";
import  {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
} from "./../controllers/tasksController";
import authCtrl from  './../controllers/authController';
const router = Router();

router.route("/api/v1/tasks" )
.get( authCtrl.requireSignin, authCtrl.hasAuthorization,getAllTasks)
.post(authCtrl.requireSignin, authCtrl.hasAuthorization,createTask);
router.route("/api/v1/tasks/:taskId")
.put(authCtrl.requireSignin, authCtrl.hasAuthorization,updateTask)
.delete(authCtrl.requireSignin, authCtrl.hasAuthorization,deleteTask);

export default router;
