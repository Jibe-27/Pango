const mongoose=require('mongoose');
// Schenma qui permettre d'avoir les mêmes champs partout
const userSchema=mongoose.Schema(
    {
        user: { type: String, required: true },
        role: { type: String, required: true },
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true }
    }
);
module.exports=mongoose.model('User',userSchema);