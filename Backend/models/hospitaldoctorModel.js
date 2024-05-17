import mongoose from "mongoose";

const HospitalDoctorSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    description:{type:String,require:true},
    specialization:{type:String,require:true},
    degree: { type: String, require: true },
    datesavailable: { type: String, require: true },
    charges:{type:Number,require:true},
    image: { type: String, require: true },
    date: { type: Date, default: Date.now() },
    
})

const HospitalDoctorModle=mongoose.models.HospitalDoctor || mongoose.model("HospitalDoctor",HospitalDoctorSchema);
export default HospitalDoctorModle;