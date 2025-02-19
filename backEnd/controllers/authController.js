import userModel from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

async function register(req, res){
    try {
        const {email, password} = req.body;
        if (!email || !password){
            return res.status(400).json({message: "email and password is required"});
        }
        if (password.length<6){
            return res.status(400).json({message: "password must be at least 6 characters long"});
        }

        // check email
        const user = await userModel.findOne({email})
        if(user){
            return res.status(400).json({message: "email already exists"});
        }

        // ma hoa password
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)

        // them user
    const newUser = {
        email,
        password: hashedPassword,
      };
      const userCreated = await userModel.create(newUser);
  
      // remove password response
      res.json({ ...userCreated.toObject(), password: undefined });

    } catch (error){
        res.status(500).json({message: error.message});
    }
}
async function login(req, res) {
    try {
      const { email, password } = req.body;
      //Kiem tra du lieu hop le
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and Password is Required" });
      }
      if (password.length < 6) {
        return res.status(400).json({ message: "Password min 6 character" });
      }
      // Tìm user theo email
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      // Kiểm tra mật khẩu
      const isMatch = await bcrypt.compare(password, user.password);
      console.log({ isMatch });
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      // Tạo token JWT
      const token = jwt.sign({ id: user._id }, "hoadv21", {
        expiresIn: "1w",
      });
      console.log(token);
  
      // remove password response
      res.json({ ...user.toObject(), password: undefined, token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

export {register, login}