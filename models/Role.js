const mongoose=require('mongoose');
// Schenma qui permettre d'avoir les mêmes champs partout
const roleSchema=mongoose.Schema(
    {
        nom:{type:String,required:true},   
        imageUrl: { type: String, required: true },
        description: { type: String, required: true }
    }
);
module.exports=mongoose.model('Role',roleSchema);