require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

module.exports = {
  url: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
  //url: "mongodb+srv://fincra:fincra@cluster0.l2cm4pb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
};
