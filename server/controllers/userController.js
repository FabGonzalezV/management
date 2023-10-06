import User from "./../models/user.model";
import extend from 'lodash/extend'
// Controlador para crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Controlador para obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("name email updatedd created");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener un usuario por su ID
export const getUserById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.profile = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};
// Controlador para actualizar un usuario por su ID
export const updateUserById = async (req, res) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Controlador para eliminar un usuario por su ID
export const deleteUserById = async (req, res) => {
  try {
    let user  = req.profile;
    let deleteUser = await user.remove();
    deleteUser.hashed_password = undefined;
    deleteUser.salt = undefined;
    res.json(deleteUser);
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
