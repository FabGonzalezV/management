import { Router } from "express";
import  {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
} from "./../controllers/tasksController";

const router = Router();

router.route("/api/v1/tasks")
.get(getAllTasks)
.post(createTask);
router.route("/api/v1/tasks/:taskId")
.put(updateTask)
.delete(deleteTask);

export default router;
