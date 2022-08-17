const { Schema, model } = require("mongoose");

const deliverySchema = new Schema(
    {
    delivery:{type: Boolean,default:false},
    code:String,
    printExpress:{type: Boolean,default:false},
    printDeliveryList:{type: Boolean,default:false},
    scan:{type: Boolean,default:false},
    weight:{type: Boolean,default:false},
    warehouse_name:String,
    warehouse_code:String,
    express_name:String,
    express_code:String,
    mail_no:String,
    warehouse:{type: Schema.Types.ObjectId, ref: 'Warehouse'},
    }

)

const Delivery = model("Delivery", deliverySchema);
module.exports = Delivery;
    