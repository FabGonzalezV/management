import Task from "./../../server/models/tasks.model";
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "./../../server/controllers/tasksController";

// // Mock para el objeto de respuesta de Express
// const mockResponse = () => {
//   const res = {};
//   res.status = jest.fn().mockReturnValue(res);
//   res.json = jest.fn().mockReturnValue(res);
//   return res;
// };

// Mock para el objeto de respuesta de Express
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockImplementation((code) => {
    res.statusCode = code;
    return res;
  });
  res.json = jest.fn().mockReturnValue(res);
  return res;
};


// Mock para el objeto de solicitud de Express con datos simulados
const mockRequest = (body = {}, params = {}) => ({
  body,
  params,
});

// Pruebas unitarias para createTask
describe("createTask", () => {
  it("debería crear una tarea correctamente", async () => {
    const req = mockRequest({
      title: "Tarea de prueba",
      description: "Descripción de la tarea de prueba",
      priority: "Alta",
    });
    const res = mockResponse();
    jest.spyOn(Task.prototype, "save").mockResolvedValueOnce();
    await createTask(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Tarea de prueba" })
    );
  }, 10070);

  it("debería manejar errores al crear una tarea", async () => {
    const req = mockRequest();
    const res = mockResponse();

    jest.spyOn(Task.prototype, "save").mockImplementationOnce(() => {
      throw new Error("Error al guardar la tarea");
    });

    await createTask(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Error al crear la tarea" });
  });
});

// Pruebas unitarias para getAllTasks
describe("getAllTasks", () => {
  it("debería obtener todas las tareas correctamente", async () => {
    const req = mockRequest();
    const res = mockResponse();

    jest
      .spyOn(Task, "find")
      .mockResolvedValueOnce([{ title: "Tarea 1" }, { title: "Tarea 2" }]);

    await getAllTasks(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { title: "Tarea 1" },
      { title: "Tarea 2" },
    ]);
  });

  it("debería manejar errores al obtener todas las tareas", async () => {
    const req = mockRequest();
    const res = mockResponse();

    jest
      .spyOn(Task, "find")
      .mockRejectedValueOnce(new Error("Error al obtener las tareas"));

    await getAllTasks(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error al obtener las tareas",
    });
  });
});

// Pruebas unitarias para updateTask
describe("updateTask", () => {
  it("debería actualizar una tarea correctamente", async () => {
    const req = mockRequest(
      {
        title: "Tarea actualizada",
        description: "Descripción actualizada",
        priority: "Baja",
      },
      { taskId: "taskId" }
    );
    const res = mockResponse();

    jest.spyOn(Task, "findByIdAndUpdate").mockResolvedValueOnce({
      _id: "taskId",
      title: "Tarea actualizada",
      description: "Descripción actualizada",
      priority: "Baja",
    });

    await updateTask(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Tarea actualizada" })
    );
  });

  it("debería manejar errores al actualizar una tarea", async () => {
    const req = mockRequest({}, { taskId: "taskId" });
    const res = mockResponse();

    jest
      .spyOn(Task, "findByIdAndUpdate")
      .mockRejectedValueOnce(new Error("Error al actualizar la tarea"));

    await updateTask(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error al actualizar la tarea",
    });
  });

  it("debería manejar una tarea no encontrada", async () => {
    const req = mockRequest({}, { taskId: "taskId" });
    const res = mockResponse();

    jest.spyOn(Task, "findByIdAndUpdate").mockResolvedValueOnce(null);

    await updateTask(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Tarea no encontrada" });
  });
});

// Pruebas unitarias para deleteTask
describe("deleteTask", () => {
  it("debería eliminar una tarea correctamente", async () => {
    const req = mockRequest({}, { taskId: "taskId" });
    const res = mockResponse();

    jest.spyOn(Task, "findByIdAndDelete").mockResolvedValueOnce({
      _id: "taskId",
      title: "Tarea eliminada",
      description: "Descripción eliminada",
      priority: "Baja",
    });

    await deleteTask(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Tarea eliminada con éxito",
    });
  });

  it("debería manejar errores al eliminar una tarea", async () => {
    const req = mockRequest({}, { taskId: "taskId" });
    const res = mockResponse();

    jest
      .spyOn(Task, "findByIdAndDelete")
      .mockRejectedValueOnce(new Error("Error al eliminar la tarea"));

    await deleteTask(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error al eliminar la tarea",
    });
  });

  it("debería manejar una tarea no encontrada al eliminar", async () => {
    const req = mockRequest({}, { taskId: "taskId" });
    const res = mockResponse();

    jest.spyOn(Task, "findByIdAndDelete").mockResolvedValueOnce(null);

    await deleteTask(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Tarea no encontrada" });
  });
});
