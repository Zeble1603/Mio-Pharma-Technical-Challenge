const router = require("express").Router();
const Warehouse = require('../models/Warehouse.model')
const Delivery = require('../models/Delivery.model')
const mongoose = require('mongoose');

//POST ROUTES

//CREATE a new delivery
router.post('/deliveries',(req,res,next)=>{
    const {code,warehouseId,express_name,
        express_code,mail_no} = req.body
    //If the warehouseId is wrong not valid or doesn't exist, throw error
    if (!mongoose.Types.ObjectId.isValid(warehouseId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    //We look for the warehouse in order to get the name and the code
    Warehouse.findById(warehouseId)
    .then((warehouse)=>{
        //we create the delivery object
        Delivery.create({
            code,
            express_name,
            express_code,
            mail_no,
            warehouse_name:warehouse.name,
            warehouse_code:warehouse.code,
            warehouse:warehouseId
        })
        .then((delivery)=>{
            return Warehouse.findByIdAndUpdate(warehouseId,{$push: { deliveries: delivery._id }})
        })
        .then(response => res.json(response))
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
})

module.exports = router;
