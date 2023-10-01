const config = {
  env: process.env.NODE_ENV || "development",
  port: import.meta.env.PORT,
  jwtSecret: import.meta.env.JWT_SECRET || "YOUR_secret_key",
  adminPass: "oSDWOicZ2IRFvFqz",
  mongoUriAtlas:
    "mongodb+srv://codefabs:codefabs@cluster0.b3nbn0w.mongodb.net/?retryWrites=true&w=majority",
  mongoUri:
    import.meta.env.MONGODB_URI ||
    import.meta.env.MONGO_HOST ||
    "mongodb://" +
      (import.meta.env.IP || "localhost") +
      ":" +
      (import.meta.env.MONGO_PORT || "27017") +
      `/${import.meta.DB}`,
};

export default config;
