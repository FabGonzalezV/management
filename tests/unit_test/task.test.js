 
import mongoose from 'mongoose';
import Task from './../../server/models/tasks.model'; // Asegúrate de que la ruta sea correcta
import connectDB from './../../server/models/connectDB'
// Configura una conexión a la base de datos de prueba
beforeAll(async () => {
    await connectDB();
  });

// Define las pruebas
describe('Task Model', () => {
  // Antes de cada prueba, elimina todos los documentos en la colección de tareas
  beforeEach(async () => {
    await Task.deleteMany({});
  });

  // Después de todas las pruebas, cierra la conexión a la base de datos de prueba
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('debería crear una nueva tarea', async () => {
    const taskData = {
      title: 'Tarea de prueba',
      description: 'Esta es una tarea de prueba',
    };

    const task = new Task(taskData);
    const savedTask = await task.save();

    // Verifica que se haya guardado correctamente
    expect(savedTask.title).toBe(taskData.title);
    expect(savedTask.description).toBe(taskData.description);
  });

  it('debería requerir el título y la descripción', async () => {
    const task = new Task();

    // Intenta guardar la tarea sin título y descripción
    try {
      await task.save();
    } catch (error) {
      expect(error.errors.title).toBeDefined();
      expect(error.errors.description).toBeDefined();
    }
  });
});
 
 
 