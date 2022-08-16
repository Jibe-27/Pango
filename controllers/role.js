/*
    CE DOSSIER CONTIENT LE CORPS DES ROUTES POUR LES ROLES.
*/ 
const Role=require('../models/Role');
exports.createRole=(req,res,next)=>{
   const role=new Role({
    ...req.body //copier le corps de la requete dans role
   });
   role.save().then(
    ()=>{
       res.status(201).json({message:'Objet enregistrée!'})
    }
   ).catch(error=>res.status(400).json({error}));
};
exports.getAllRoles= (req, res, next) => {
    Role.find()
    .then(roles=>res.status(200).json(roles))
    .catch(error=>res.status(400).json({error}));
  };
exports.getOneRole=(req,res,next)=>{
    Role.findOne({_id: req.params.id})
    .then(roles=>res.status(200).json(roles))
    .catch(error=>res.status(400).json({error}));
};
exports.modifyRole=(req,res,next)=>{
    Role.updateOne({_id:req.params.id}, {...req.body, _id:req.params.id})
    .then(()=> res.status(200).json({message:'Objet Modifié'}))
    .catch(error=>res.status(400).json({error}));
};
exports.deleteRoles=(req,res,next)=>{
    Role.deleteOne({_id:req.params.id})
    .then(()=>res.status(200).json({message:'Objet supprimé'}))
    .catch(error=>res.status(400).json({error}));
};