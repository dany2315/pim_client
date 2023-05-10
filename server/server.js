import express, { Router } from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import router from "./routes/index.js";
import User from "./models/modelUser.js";

//connection mongoDB localhost
const CONNECTION_URL = "mongodb://localhost:27017/admin";

mongoose.set("strictQuery", false);
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`connect to mongoDB`))

  .catch((error) =>
    console.log("probleme de connexion a mongoDB " + error.message)
  );

//server express URL: http://localhost:5000/api
const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

app.get("/", (req, res) => res.send("Hello World!"));

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

//use cors
app.use(cors());
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
