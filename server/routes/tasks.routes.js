import { Router } from "express";
const router = Router();

router
  .route("/api/v1/tasks")
  .get(tasksController.getAllTasks)
  .post(tasksController.createTask);
router
  .route("/api/v1/tasks/:taskId")
  .put(tasksController.updateTask)
  .delete(tasksController.deleteTask);
 
  export default router;
