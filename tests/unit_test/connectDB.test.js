import connectDB from "./../../server/models/connectDB";  
import mongoose from "mongoose";


// Mock para evitar que las conexiones reales se establezcan durante las pruebas
jest.mock("mongoose");

describe("testing function connectDB", () => {
  it("should connect the database successfully", async () => {
    // Simulamos que la conexión es exitosa
    mongoose.connect.mockResolvedValueOnce();

    const logSpy = jest.spyOn(console, "log");

    await connectDB();

    // Verificamos que la función console.log haya sido llamada con el mensaje de éxito
    expect(logSpy).toHaveBeenCalledWith("Successfully connected to the database");
  });

  it("Debería manejar un error de conexión", async () => {
    // Simulamos que la conexión falla
    const errorMessage = "Connection error message";
    mongoose.connect.mockRejectedValueOnce(new Error(errorMessage));

    const errorSpy = jest.spyOn(console, "error");

    await connectDB();

    // Verificamos que la función console.error haya sido llamada con el mensaje de error
    expect(errorSpy).toHaveBeenCalledWith(
      "Error occurred while attempting to connect to the database:"
    );
    expect(errorSpy).toHaveBeenCalledWith(new Error(errorMessage));
  });
});
