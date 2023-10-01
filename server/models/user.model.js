import mongoose from "mongoose";
import crypto from "crypto"; // Asegúrate de importar el módulo crypto

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "User name is required", // Corrección en el mensaje
  },
  email: {
    type: String,
    trim: true,
    unique: true, // Corrección en la unicidad
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  hashed_password: {
    type: String,
    required: "Password is required",
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
});

UserSchema.virtual("password")
  .set(function (password) { // Cambio a función normal para acceder a 'this'
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password); // Cambio de 'enctyptPassword' a 'encryptPassword'
  })
  .get(function () { // Cambio a función normal para acceder a 'this'
    return this._password;
  });

UserSchema.path("hashed_password").validate(function (v) { // Cambio a función normal para acceder a 'this'
  if (this._password && this._password.length < 8) { // Corrección en 'length'
    this.invalidate("hashed_password", "Password must be at least 8 characters");
  }
  if (this.isNew && !this._password) {
    this.invalidate("hashed_password", "Password is required");
  }
});

UserSchema.methods = {
  authenticate: function (plainText) { // Cambio a función normal para acceder a 'this'
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) { // Cambio de 'enctyptPassword' a 'encryptPassword'
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      console.error("Error encrypting password:", err.message);
      return "";
    }
  },
  makeSalt: function () { // Cambio de 'makeSalt' a función normal
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

export default mongoose.model("User", UserSchema);
