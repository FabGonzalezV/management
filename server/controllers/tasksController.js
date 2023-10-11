// Importa el modelo de tarea
import Task from "./../models/tasks.model";

import Team from "./../models/team.model";

export const getTaskById = async (req, res, next, id) => {
  try {
    const taskId = req.params.taskId;
    let task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        error: "task not found",
      });
    }
    req.task = task;
    next();
  } catch (error) {
    res.status(400).json({
      error: "Could not retrieve task",
    });
  }
};

// Controlador para crear una nueva tarea
 

export const createTask = async (req, res) => {
  try {
    if (req.params.teamId) {
      // Si la ruta contiene un teamId, entonces estás creando una tarea para un equipo.
      const teamId = req.params.teamId;
      const createdBy = req.profile._id;
      const { title, description, priority } = req.body;
      const task = new Task({ title, description, priority, createdBy });
      await task.save();
      const response = await addToTeam(task._id, teamId);
      if (response.error) {
        return res.status(404).json(response);
      }
      res.status(201).json(response);
    } else {
      // Si no hay teamId en la ruta, estás creando una tarea independiente.
      const { title, description, priority } = req.body;
      const createdBy = req.profile._id;
      const task = new Task({ title, description, priority, createdBy });
      await task.save();
      res.status(201).json(task);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
};

const addToTeam = async (taskIdToAdd, teamId) => {
  let taskAdded = null;
  try {
    taskAdded = await Team.findByIdAndUpdate(
      teamId,
      { $push: { tasks: taskIdToAdd } },
      { new: true }
    );

    if (!taskAdded) {
      return { error: "Equipo no encontrado" };
    }
    return taskAdded;
  } catch (error) {
    return { error: "Error al añadir la tarea al equipo" };
  }
};


export const listByUser = async (req, res) => {
  try {
    let tasks = await Task.find({ createdBy: req.profile._id })
      .sort("-created")
      .exec();
    res.json(tasks);
  } catch (error) {
    return res.status(404).json({ error: "tasks not found" });
  }
};

// Controlador para obtener todas las tareas
export const listTasks = async (req, res) => {
  try {
    if (req.params.teamId) {
      // Si la ruta contiene un teamId, estás listando las tareas de un equipo específico.
      const teamId = req.params.teamId;
      const team = await Team.findById(teamId);

      if (!team) {
        return res.status(404).json({ error: 'Equipo no encontrado' });
      }

      const tasks = await Task.find({ _id: { $in: team.tasks } });
      res.status(200).json(tasks);
    } else {
      // Si no hay teamId en la ruta, estás listando todas las tareas independientes.
      const tasks = await Task.find();
      res.status(200).json(tasks);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
};



// Controlador para actualizar una tarea por su ID
export const updateTaskById = async (req, res) => {
  try {


    
    //revizar crup tareas para equipo e individual
    const { taskId } = req.params;
    const { title, description, priority } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, priority, updated: new Date() },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Tarea no encontrada", id: taskId });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
};

// Controlador para eliminar una tarea por su ID
export const deleteTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.status(200).json({ message: "Tarea eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
};

 
export const deleteTaskFromTeam = async (req, res) => {
  try {
    const { userId, teamId, taskId } = req.params;

    // Paso 1: Buscar el equipo por el ID del usuario y el ID del equipo.
    const team = await Team.findOne({ createdBy: userId, _id: teamId });

    if (!team) {
      return res.status(404).json({ error: 'Equipo no encontrado.' });
    }
    console.info(team.tasks);
    // Paso 2: Eliminar la referencia de la tarea del equipo.
    const taskIndex = team.tasks.filter((task)=> !(task===taskId))
    
    if (!taskIndex ) {
      return res.status(404).json({ error: 'Tarea no encontrada en el equipo.' });
    }
    
    team.tasks.splice(taskIndex, 1);

    // Paso 3: Guardar el equipo actualizado.
    const updatedTeam = await team.save();

    return res.status(200).json({ message: 'Tarea eliminada del equipo con éxito', updatedTeam });
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar la tarea del equipo', details: error.message });
  }
};

