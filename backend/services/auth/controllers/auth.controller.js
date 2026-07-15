import {getAuth} from "firebase-admin/auth"
import app from "../config/firebase.js"

export const login = async (req , res)=>{
    try {
        const {token} = req.body;
        const decoded = getAuth(app).verifyIdToken(token);
    } catch (error) {
        
    }
}