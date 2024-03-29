import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
    {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String },
      address: [{ detail: { type: String }, for: { type: String } }],
      phoneNumber: [{ type: Number }],
    },
    {
      timestamps: true,
    }
  );
  

  // attachments : capable of access data directly
    UserSchema.methods.generateJwtToken = function(){
      return jwt.sign({ user : this._id.toString() }, "Shyamsundar");
    };

    // helper functions : not able to access data directly 
    UserSchema.statics.findByEmailAndPhone = async ({ email, phoneNumber}) => {
      const checkUserByEmail = await UserModel.findOne({ email });
      const checkUserByPhone = await UserModel.findOne({ phoneNumber });

      if(checkUserByEmail || checkUserByPhone){
        throw new Error("User Already Exist.....!! Please try to login.") 
      }
      
      return false;
    }

    UserSchema.statics.findByEmailAndPassword = async ({email, password}) =>{
      const user = await UserModel.findOne({ email });

      if(!user) throw new Error ("User does not exist !!! Please try signUp");


      // compare passwords 
      const doesPasswordMatch = await bcrypt.compare(password, user.password);

      if(!doesPasswordMatch) throw new Error ("Invalid Password");

      return user;
    };


    UserSchema.pre("save", function (next){
      const user = this;

      // password if modified/encrypted
      if(!user.isModified("password")) return next();

      // generate bcrypt salt
      bcrypt.genSalt(8, (error, salt) =>{
        if (error) return next(error);

        // hash the password  
        bcrypt.hash(user.password, salt, (error, hash) =>{
          if (error)  return next(error);

          // assigning hashed password
          user.password = hash;
          return next();
        });
      });
    });




  export const UserModel = mongoose.model("users", UserSchema);

