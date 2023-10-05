// Importa el modelo de tarea
import Task from './../models/tasks.model';

// Controlador para crear una nueva tarea
export const createTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const task = new Task({ title, description, priority });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
};

// Controlador para obtener todas las tareas
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
};

// Controlador para actualizar una tarea por su ID
export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, priority } = req.body;
    
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, priority, updated: new Date() },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
};

// Controlador para eliminar una tarea por su ID
export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.status(200).json({ message: 'Tarea eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
};
