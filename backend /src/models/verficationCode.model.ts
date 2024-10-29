import VerificationCodeType from "../constants/verificationCodeTypes"
import mongooose from 'mongoose'


export interface VerificationCodeDocument extends mongoose.Document{
    userId : mongoose.Types.ObjectId;
    type : VerificationCodeType;
    expiresAt : Date ;
    createdAt :Date ;
}

const verificationCodeSchema = new mongoose.Schema<VerificationCodeDocument>{
    userId : {}
}