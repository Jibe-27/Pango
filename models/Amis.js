const mongoose=require('mongoose');
// Schenma qui permettre d'avoir les mêmes champs partout
const amisSchema=mongoose.Schema(
    {
        userDemandeur:{type:String,required:true},   
        user: { type: String, required: true },
    }
);
module.exports=mongoose.model('Amis',amisSchema);