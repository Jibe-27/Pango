//Importations des fichiers pour la connexion ainsi que les routes
const express=require('express');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');

const roleRoutes=require('./routes/role');
const userRoutes=require('./routes/user');
const amisRoutes=require('./routes/amis');

const app=express();
//connection a mongoDB
mongoose.connect('mongodb+srv://jibe-27:1234@cluster0.zln8i39.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true } )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
app.use(express.json());

//empêcher les erreurs CORS (permettre au front et back d'intéragir entre eux.)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
  app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/user',userRoutes);
app.use('/api/roles',roleRoutes);
app.use('/api/amis',amisRoutes);
module.exports=app;