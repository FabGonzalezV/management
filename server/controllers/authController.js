import User from "./../models/user.model";
import jwt from "jsonwebtoken";
import { expressjwt, ExpressJwtRequest } from "express-jwt";

const signIn = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
      
    });
     
    if (!user) {
      return response.status(401).json({
        error: "user not found",
      });
    }
    if (!user.authenticate(req.body.password)) {
      return res.status(401).send({ error: "Email and password don't  match" });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      import.meta.env.JWT_SECRET
    );
    res.cookie("t", token, {
      expire: new Date() + 9999,
    });
    return res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    return res.status(401).json({
      error: "Could not sign in",
    });
  }
};

const signOut = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({
    message: "Sign out successfully",
  });
};

const requireSignin = expressjwt({
  secret: import.meta.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  }
  next();
};

export default {
  signIn,
  signOut,
  requireSignin,
  hasAuthorization,
};
