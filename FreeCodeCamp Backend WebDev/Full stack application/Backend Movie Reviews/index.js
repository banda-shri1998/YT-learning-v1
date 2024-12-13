import app from "./server.js";
import mongodb from "mongodb";
import * as dotenv from "dotenv";
import ReviewDAO from "./dao/reviewsDAO.js";
dotenv.config();
const mongoClient = mongodb.MongoClient;
const mongoUser = process.env["mongoUser"];
const mongoPassword = process.env["mongoPassword"];
console.log(mongoUser + mongoPassword);

const uri = `mongodb+srv://${mongoUser}:${mongoPassword}@freecodecamp-learning.tkgss.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://admin:admin@freecodecamp-learning.tkgss.mongodb.net/?retryWrites=true&w=majority`;

const port = 8000;

mongoClient
  .connect(uri, { maxPoolSize: 50, wtimeoutMS: 2500 })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await ReviewDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });