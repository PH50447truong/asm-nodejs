import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        }
    },
    {
        timestamps: true,
    } 
)

const userModel = mongoose.model('User',userSchema);
export default userModel;