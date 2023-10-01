import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "user is required",
  },

  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
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
  .set((password) => {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.enctyptPassword(password);
  })
  .get(() => {
    return this._password;
  });

UserSchema.path("hashed_password").validate((v) => {
  if (this._password && this._password.lenght < 8) {
    this.invalidate("password", "password most be at least 8 characters");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "password is required");
  }
});

UserSchema.methods = {
  authenticate: (plainText) => {
    return this.enctyptPassword(plainText) === this.hashed_password;
  },
  enctyptPassword: (password) => {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return console.error(`error encrypt password`);
    }
  },
  makeSalt:()=>{
    return Math.round((new Date().valueOf()*Math.random()))+''
  }
};

export default mongoose.model('User', UserSchema);