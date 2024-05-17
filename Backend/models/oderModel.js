import mongoose from "mongoose"

const oderSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    status:{type:String,default:"Food Processing"},
    address: { type: Object,required:true},
    date: { type: Date, default: Date.now() },
    payment:{type:Boolean,default:false}
})

const oderModel = mongoose.models.order || mongoose.model("order", oderSchema)
export default oderModel