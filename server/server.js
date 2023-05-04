import express, { Router } from 'express'
import cors from 'cors';
import mongoose from 'mongoose'
import morgan from 'morgan';
import router from './routes/index.js' ;


//connection mongoDB localhost
const CONNECTION_URL = "mongodb://localhost:27017"

mongoose.set('strictQuery',false)
mongoose.connect(CONNECTION_URL,{
    useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>console.log(`SUCCESS`))

    .catch((error)=>console.log('probleme de connexion '+error.message));



//server express URL: http://localhost:5000/api
const app = express() 
const PORT = process.env.PORT || 5000 ;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api',router)
app.get('/', (req, res) => res.send('Hello World!'));


//use cors
app.use(cors());
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))