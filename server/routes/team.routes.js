import { Router } from "express";
import authCtrl from "./../controllers/authController";
import { getUserById } from "../controllers/userController";
import { getTaskById } from "../controllers/tasksController";
import { getTeamById } from "./../controllers/teamController";
import * as taskCtrl from "./../controllers/tasksController";
import * as teamCtrl from "./../controllers/teamController";
const router = Router();
router.param("userId", getUserById);
router.param("taskId", getTaskById);
router.param("teamId", getTeamById);

router
  .route("/api/v1/team/:userId")
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, teamCtrl.listTeams)
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, teamCtrl.createTeam);
//---------------------------------------------------------------------
router
  .route("/api/v1/team/:userId/:teamId")
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    teamCtrl.updateTeamById
  )
  .delete(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    teamCtrl.deleteTeamById
  );
//------------------------------------------------------------------------------
router
  .route("/api/v1/team/tasks/:userId/:teamId")
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, taskCtrl.createTask)
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, taskCtrl.listTasks);
//-----------------------------------------------------------------------------------
router
  .route("/api/v1/team/tasks/:userId/:teamId/:tasksId")
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    taskCtrl.updateTaskById
  )
  .delete(
    authCtrl.requireSignin,
    authCtrl.hasAuthorization,
    taskCtrl.deleteTaskFromTeam
  );

export default router;
