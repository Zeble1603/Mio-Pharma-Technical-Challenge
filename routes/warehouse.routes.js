const router = require("express").Router();
const Warehouse = require('../models/Warehouse.model')

//POST ROUTES

//CREATE a new Warehouse
router.post('/warehouses',(req,res,next)=>{
    const {
        warehouse_code,
        warehouse_name,
        type_code,
        contact_name,
        contact_phone,
        contact_mobile,
        province,
        city,
        district,
        address,
        note
    } = req.body
    console.log(req.body)
    Warehouse.create({
        code : warehouse_code,
        name : warehouse_name,
        address,
        note,
        contact_name,
        contact_phone,
        contact_mobile,
        province,
        city,
        district,
        deliveries:[],
    })
    .then(response => res.json(response))
    .catch(err => res.json(err))
})

//GET ROUTES

//GET all Warehouses with pagination parameters
router.get("/warehouses", (req, res, next) => {
    //Request parameters
    //Pagination
    const page_no= parseInt(req.query.page_no, 10) || 0
    const page_size= parseInt(req.query.page_size, 10)
    //Date
    const start_date = new Date ('1970-01-01')
    if(req.query.start_date){
        start_date = new Date(req.query.start_date)
    }
    const end_date = Date.now()
    if(req.query.end_date){
        end_date = new Date(req.query.end_date)
    }
    const date_type = parseInt(req.query.date_type, 10) || 1
    //Is delete data included?
    const has_del_data = req.query.has_del_data || false        

    if (has_del_data){
        //If has_del_data is true, it returns all the objects
        //We now need to look at the date_type
        if(date_type === 1){
            //If the date_type is 1, we will filter the warehouses from their modify_date
            Warehouse.find(
                //Now we use the two values from the params we isolated previously to filter our objects
                {modify_date: {$gte: start_date, $lte: end_date}},null,
                //Pagination options
                {skip: page_no*page_size, 
                limit: page_size })
                .populate('deliveries')
            .then((filteredWarehouses)=>{
                res.json(filteredWarehouses)
            })
            .catch(err => res.json(err))
        }else if(date_type === 0){
            //If the date_type is 0, we will filter the warehouses from their create_date
            Warehouse.find(
                //Now we use the two values from the params we isolated previously to filter our objects
                {create_date: {$gte: start_date, $lte: end_date}},null,
                //Pagination options
                {skip: page_no*page_size, 
                limit: page_size })
                .populate('deliveries')
            .then((filteredWarehouses)=>{
                res.json(filteredWarehouses)
            })
            .catch(err => res.json(err))
        }else{
            //error message if the date_type is not 1 nor 0
            return res.json(400,{
                error: 1,
                msg: "The date_type parameter MUST be a value of 1 or 0. 0:creation time, 1:Change the time"
            })
        }
    }else{
        //If has_del_data is false, it returns only the objects with is_del:false
        if(date_type === 1){
            //If the date_type is 1, we will filter the warehouses from their modify_date
            Warehouse.find(
                //Now we use the two values from the params we isolated previously to filter our objects
                {is_del:false,
                modify_date: {$gte: start_date, $lte: end_date}},null,
                //Pagination options
                {skip: page_no*page_size, 
                limit: page_size })
                .populate('deliveries')
            .then((filteredWarehouses)=>{
                res.json(filteredWarehouses)
            })
            .catch(err => res.json(err))
        }else if(date_type === 0){
            //If the date_type is 0, we will filter the warehouses from their create_date
            Warehouse.find(
                //Now we use the two values from the params we isolated previously to filter our objects
                {is_del:false,
                create_date: {$gte: start_date, $lte: end_date}},null,
                //Pagination options
                {skip: page_no*page_size, 
                limit: page_size })
                .populate('deliveries')
            .then((filteredWarehouses)=>{
                res.json(filteredWarehouses)
            })
            .catch(err => res.json(err))
        }else{
            //error message if the date_type is not 1 nor 0
            return res.json(400,{
                error: 1,
                msg: "The date_type parameter MUST be a value of 1 or 0. 0:creation time, 1:Change the time"
            })
        }
    }
});

//GET Warehouse by its code
router.get("/warehouses/:code", (req, res, next) => {
    const {code} = req.params
    Warehouse.find(
        //we search for the warehouse by its code
        {code:code},
    )
    .then(foundWarehouse =>res.json(foundWarehouse))
    .catch(err => res.json(err))
});

//UPDATE Warehouse using its ID (Not Code)
router.put('/warehouses/:warehousesId', (req,res,next) =>{
    const {warehousesId} = req.params
    if (!mongoose.Types.ObjectId.isValid(warehousesId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Warehouse.findByIdAndUpdate(warehousesId,req.body,{new:true})
    .then((updtatedWarehouse)=>{
        updtatedWarehouse.modify_date = Date.now()
        updtatedWarehouse.save()
        res.json(updtatedWarehouse)
    })
    .catch((err)=>{
        next(err)
    })
})

module.exports = router;

