import JwtPassport from "passport-jwt"

import { UserModel } from "../database/allModels"

const JWTStrategy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

/**
 * 
Head : {
    Authorization : Bearer rukjdfbrihukjgrjsbfidkjn 
}
*/

const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : "Shyamsundar",
};

export default (passport)=>{
    passport.use(
        new JWTStrategy(options, async(jwt_payload, done)=>{
            try{
                const doesUserExist = await UserModel.findById(jwt_payload.user);
                if(!doesUserExist) return done(null, false);
                return done(null, doesUserExist); 
            } catch(error){
                throw new Error (error);
            }
        })
    )
}