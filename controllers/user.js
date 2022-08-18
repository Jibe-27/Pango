/*
    CE DOSSIER CONTIENT LE CORPS DES ROUTES POUR LES USERS.
*/ 
const User=require('../models/User');

const bcrypt=require('bcrypt');// crypter les mots de passe
const jwt=require('jsonwebtoken');

exports.signup=(req,res,next)=>{
    bcrypt.hash(req.body.password,10)
    .then(hash=>{
        delete req.body.password;
        const user=new User({
            ...req.body,
            password:hash});

        user.save()
        .then(()=>res.status(201).json({message:'Utilisateur créé!'}))
        .catch(error=>res.status(400).json({error}));
    })
    .catch(error=>res.status(500).json({error}));
};
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(
      (user) => {
        if (!user) {
          return res.status(401).json({
            error: new Error('User not found!')
          });
        }
        bcrypt.compare(req.body.password, user.password).then(
          (valid) => {
            if (!valid) {
              return res.status(401).json({
                error: new Error('Incorrect password!')
              });
            }
            res.status(200).json({
              userId: user._id
            });
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }
    ).catch(
      (error) => {
        res.status(500).json({
          error: error
        });
      }
    );
  }

exports.getAllUsers= (req, res, next) => {
    User.find({},{"password":0,"email":0})
    .then(users=>res.status(200).json(users))
    .catch(error=>res.status(400).json({error}));
  };
exports.getOneUser=(req,res,next)=>{
    User.findOne({_id: req.params.id})
    .then(users=>res.status(200).json(users))
    .catch(error=>res.status(400).json({error}));
};
exports.getNewOneUser=(req,res,next)=>{
  User.findOne({email: req.params.email})
  .then(users=>res.status(200).json(users))
  .catch(error=>res.status(400).json({error}));
};
exports.modifyUser=(req,res,next)=>{
    User.updateOne({_id:req.params.id}, {...req.body, _id:req.params.id})
    .then(()=> res.status(200).json({message:'Objet Modifié'}))
    .catch(error=>res.status(400).json({error}));
};

exports.deleteUsers=(req,res,next)=>{
    User.deleteOne({_id:req.params.id})
    .then(()=>res.status(200).json({message:'Objet supprimé'}))
    .catch(error=>res.status(400).json({error}));
};