import { Router } from "express";

import {
  listTasks,
  createTask,
  updateTaskById,
  deleteTaskById,
  getTaskById,
} from "./../controllers/tasksController";
import { getUserById } from "./../controllers/userController";
import authCtrl from "./../controllers/authController";

const router = Router();
router.param("userId", getUserById);
router.param("taskId", getTaskById);


router
  .route("/api/v1/tasks/:userId")
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, createTask)
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, listTasks);

router
  .route("/api/v1/tasks/:userId/:taskId")

  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, updateTaskById)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, deleteTaskById);


export default router;
