import express  from "express";

import {RestaurantModel} from "../../database/allModels"

const Router = express.Router();


/**
 * Route :  /
 * Des  :   Get all the restaurants details based on the city
 * Params : none
 * Access : Public
 * Method : GET
 * 
 */


Router.get("/", async (req,res)=>{
    try{
        // will get data using query
        const { city } = req.query;
        const restaurants = await RestaurantModel.find({city});
        return res.json({restaurants});
    }catch (error){
        return res.status(500).json({error : error.message});
    }
});


export default Router;