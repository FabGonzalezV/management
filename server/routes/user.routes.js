import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from './../controllers/userController';  

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post('/v1/register', createUser);

// Ruta para obtener todos los usuarios
router.get('/v1/users', getAllUsers);

// Ruta para obtener un usuario por su ID
router.get('/v1/users/:userId', getUserById);

// Ruta para actualizar un usuario por su ID
router.put('/v1/users/:userId', updateUserById);

// Ruta para eliminar un usuario por su ID
router.delete('/v1/users/:userId', deleteUserById);

export default router;
