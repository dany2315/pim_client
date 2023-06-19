import express from "express";
import 'dotenv/config'
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import router from "./routes/index.js";
import User from "./models/modelUser.js";
import bodyParser from 'body-parser'

//connection mongoDB localhost
const ENV = process.env.ENV
const DATABASE_NAME = process.env.DATABASE_NAME;
const URL_DATABASE = process.env.URL_DATABASE
const PORT = process.env.PORT 
console.log(ENV);


const CONNECTION_URL = `${URL_DATABASE}${DATABASE_NAME}`;

mongoose.set("strictQuery", false);
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`connect to mongoDB: ${ENV}`))

  .catch((error) =>
    console.log("probleme de connexion a mongoDB " + error.message)
  );

//server express URL: http://localhost:5000/api
const app = express();

//use body parser pour pouvoir augmenter la limite de transfere
app.use(bodyParser.json({ limit: '10mb' }));
//use cors
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});
app.use("/api", router);


//http://localhost:5000/auth  autentification
app.post("/auth", async (req, res) => {
  try {
    const { identifiant, password } = req.body;
    const exist = await User.findOne({ identifiant: identifiant });
    if (exist) {
      return console.log("utilisateur existant"),res.status(407).send("utilisateur existant");
    }else{
      const newUser = new User({
        identifiant: identifiant,
        password: password,
      })
        .save()
        .then(() => res.status(200).send("user ajouter"))
        .catch((error)=>res.status(401).send(error));

    
      
    }
  } catch (error) {}
});



app.listen(PORT, () => console.log(`Le serveur de ${ENV} tourne dans le port ${PORT}!`));
