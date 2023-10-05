import mongoose, { connect } from "mongoose";
import User from "./../../server/models/user.model"; // Asegúrate de que la ruta sea correcta
import connectDB from "./../../server/models/connectDB";

describe("User Schema Tests", () => {
  // Conecta a una base de datos de prueba antes de ejecutar las pruebas
  beforeAll(async () => {
    await connectDB();
  });

  // Limpia la colección de usuarios antes de cada prueba
  beforeEach(async () => {
    await User.deleteMany({});
  });

  // Cierra la conexión a la base de datos después de todas las pruebas
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("debería crear un nuevo usuario", async () => {
    const userData = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "hashedPassword",
    };

    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
  });

  it("debería requerir el nombre, correo electrónico y contraseña", async () => {
    const user = new User();

    try {
      await user.save();
    } catch (error) {
      expect(error.errors.name).toBeDefined();
      expect(error.errors.email).toBeDefined();
      expect(error.errors.hashed_password).toBeDefined();
    }
  });

  it("debería validar la longitud de la contraseña", async () => {
    const userData = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "short", // Contraseña demasiado corta
    };

    const user = new User(userData);

    try {
      await user.save();
    } catch (error) {
      
      expect(error.errors.hashed_password).toBeDefined();
      expect(error.errors.hashed_password.message).toBe(
        "Password must be at least 8 characters"
      );
    }
  });
});
