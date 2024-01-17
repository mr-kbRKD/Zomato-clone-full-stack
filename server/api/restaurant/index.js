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
        // will get data using query, like : http://localhost:4000/restaurant/?city=AmbalaCantt  
        const { city } = req.query;
        const restaurants = await RestaurantModel.find({city});

        if(restaurants.length === 0) return res.json({error : "No restaurant found for mentioned city!! Try another one"})

        return res.json({restaurants});
    }catch (error){
        return res.status(500).json({error : error.message});
    }
});


/**
 * Route :  /:_id
 * Des  :   Get individual restaurants details based on the _id
 * Params : _id
 * Access : Public
 * Method : GET
 * 
 */


Router.get("/:_id", async (req,res)=>{
    try{
        const {_id} = req.params;
        const restaurant = await RestaurantModel.findById(_id);
        if(!restaurant){
            return res.json({error : "Restaurant not found !!!"})
        }
        return res.json({restaurant});
    }catch (error){
        return res.status(500).json({error : error.message});
    }
});

/**
 * Route :  /search/searchString
 * Des  :   Get restaurants based on the searchString
 * Params : searchString
 * Access : Public
 * Method : GET
 * 
 */


Router.get("/search/:searchString", async (req,res)=>{

/**
 * searchString = Raj
 * results = {
 *  RajHotel
 * RowRaj
 * RajJiHotel etc. (basically all restaurants which included the Raj(searchString)) 
 * }
 */


    try{
        const { searchString } = req.params;
        const restaurants = await RestaurantModel.find({
        name : {$regex : searchString, $options : "i"},
    });

        if(!restaurants){
            return res.status(404).json({error : `No restaurants matched with ${searchString}`})
        }
        return res.json({restaurants});
    }catch (error){
        return res.status(500).json({error : error.message});
    }
});


export default Router;