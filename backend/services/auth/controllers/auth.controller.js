import {getAuth} from "firebase-admin/auth"
import app from "../config/firebase.js"
import User from "../models/user.model.js";

export const login = async (req , res)=>{
    try {
        const {token} = req.body;
        const decoded = await getAuth(app).verifyIdToken(token);
        const user = await User.findOne({
            firebaseUID:decoded.uid
        });
        if (!user){
            user = await User.create({
                firebaseUID:decoded.uid,
                name:decoded.name,
                email:decoded.email,
                avatar:decoded.picture
            })
        }
    } catch (error) {
        
    }
}