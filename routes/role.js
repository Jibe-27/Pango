const express =require('express');
const roleCtrl=require('../controllers/role');
const router =express.Router();

router.post('/',roleCtrl.createRole);
router.get('/',roleCtrl.getAllRoles);
router.get('/:id',roleCtrl.getOneRole);
router.put('/:id',roleCtrl.modifyRole);

module.exports=router;