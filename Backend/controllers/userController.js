import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


const loginUser = async (req, res) => {
    const { email, password } = req.body; 
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({success:false,message:"User Don't Exist"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" })
        }
        const token = createTokens(user._id);
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


const createTokens = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}


const registerUser = async (req, res) => {
    const { name, password, email , address,age,gender } = req.body;
    try {
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message:"Please enter a valid email"});
        }

        if (password.length < 9) {
            return res.json({ success: false, message:"Please enter a valid password"});
        }


        const salt = await bcrypt.genSalt(9)
        const hashespassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name: name,
            email: email,
            address: address,
            age: age,
            gender:gender,
            password: hashespassword
        })

        const user = await newUser.save();
        const token = createTokens(user._id)
        res.json({ success: true, token });


    } catch (err) {
        console.log(err);
        res.json({success: false, message:"Error"})
    }
}

export {loginUser, registerUser}