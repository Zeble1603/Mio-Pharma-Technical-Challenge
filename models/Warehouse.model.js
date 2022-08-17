const { Schema, model } = require("mongoose");

const warehouseSchema = new Schema(
    {
        code:{type:String,unique:true},
        name:String,
        address:String,
        province:String,
        city:String,
        district:String,
        note:String,
        create_date:{type:Date,default: Date.now()},
        modify_date:{type:Date,default: Date.now()},
        contact_name:String,
        contact_phone:String,
        contact_mobile:String,
        type_name:String,
        area_name:String,
        is_del:{type: Boolean,default:false},
        is_warehouse_stock:Boolean,
        deliveries: [ { type: Schema.Types.ObjectId, ref: 'Delivery' } ]
    },
    {timestamps:true}
)

const Warehouse = model("Warehouse", warehouseSchema);
module.exports = Warehouse;
