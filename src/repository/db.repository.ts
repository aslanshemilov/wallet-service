require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

module.exports = {
  //url: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
  url: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority&appName=Cluster0`,
};
