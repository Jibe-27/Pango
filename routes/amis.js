const express =require('express');
const amiCtrl=require('../controllers/amis');
const router =express.Router();

router.post('/addAmi',amiCtrl.createAmi);
router.get('/:id',amiCtrl.getAllAmis);
router.get('/one/:id',amiCtrl.getOneAmi);

router.put('/:id',amiCtrl.modifyAmi);
router.delete('/:id',amiCtrl.deleteAmi);

module.exports=router;