import express from 'express';
import {
  createUser,
  listUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  readUser
} from './../controllers/userController';  
import authCtrl  from './../controllers/authController'
const router = express.Router();
router.param('userId',  getUserById);

// Ruta para crear un nuevo usuario
router.post('/api/v1/register', createUser);

// Ruta para obtener todos los usuarios
router.get('/api/v1/users', listUsers);

// Ruta para obtener un usuario por su ID
router.get('/api/v1/users/:userId', authCtrl.requireSignin, readUser);

// Ruta para actualizar un usuario por su ID
router.put('/api/v1/users/:userId',authCtrl.requireSignin, authCtrl.hasAuthorization, updateUserById);

// Ruta para eliminar un usuario por su ID
router.delete('/api/v1/users/:userId',authCtrl.requireSignin, authCtrl.hasAuthorization, deleteUserById);

export default router;
