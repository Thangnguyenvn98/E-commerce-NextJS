import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
    {
        products: Object,
        name: String,
        address: String,
        province: String,
        phone: Number,
        country: String,
        paid: {type: Number, defaultValue: 0},
    },
    {timestamps:true}
)

const Order = models?.Order || model('Order', OrderSchema)

export default Order