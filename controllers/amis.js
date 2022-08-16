/*
    CE DOSSIER CONTIENT LE CORPS DES ROUTES POUR LES AMIS.
*/ 
const Ami=require('../models/Amis');

exports.createAmi=(req,res,next)=>{
   const role=new Ami({
    ...req.body //copier le corps de la requete dans amis
   });
   role.save().then(
    ()=>{
       res.status(201).json({message:'Ami enregistrée!'})
    }
   ).catch(error=>res.status(400).json({error}));
};
exports.getAllAmis= (req, res, next) => {
    Ami.find({userDemandeur:req.params.id})
    .then(amis=>res.status(200).json(amis))
    .catch(error=>res.status(400).json({error}));
  };
exports.getOneAmi=(req,res,next)=>{
    Ami.findOne({userDemandeur: req.params.id})
    .then(amis=>res.status(200).json(amis))
    .catch(error=>res.status(400).json({error}));
};
exports.modifyAmi=(req,res,next)=>{
    Ami.updateOne({_id:req.params.id}, {...req.body, _id:req.params.id})
    .then(()=> res.status(200).json({message:'Ami Modifié'}))
    .catch(error=>res.status(400).json({error}));
};
exports.deleteAmi=(req,res,next)=>{
    Ami.deleteOne({user:req.params.id})
    .then(()=>res.status(200).json({message:'Ami supprimé'}))
    .catch(error=>res.status(400).json({error}));
};