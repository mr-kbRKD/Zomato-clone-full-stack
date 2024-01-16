import express from "express"

import { FoodModel } from "../../database/food"

const Router = express.router();

/**
 * Route : /:_id
 * Des : Get food based on id
 * Params : _id
 * Access : Public
 * Method : GET
 * 
 */

Router.get("/:_id", async (req, res)=>{
    try{
        const {_id} = req.params;
        const food = FoodModel.findById(_id);
        return res.json({food});
    }catch (error)  {
        return res.status(500).json({error : error.message})
    }
});
/**
 * Route : /r/:_id      (r --> restaurant) fetching restaurant id and all foods related to it
 * Des : Get food based on id
 * Params : _id
 * Access : Public
 * Method : GET
 * 
 */

Router.get("/r/:_id", async (req, res)=>{
    try{
        const {_id} = req.params;
        const foods = await FoodModel.find({
            restaurant : _id,
        });
        return res.json({foods});
    }catch (error)  {
        return res.status(500).json({error : error.message})
        
    }
});

/** 
* Route : /c/category      (r --> restaurant) fetching restaurant id and all foods related to it
* Des : Get food based on particular category
* Params : _id
* Access : Public
* Method : GET
* 
*/

Router.get("/c/:category", async (req, res)=>{
    try{
        const { category } = req.params;
        const foods = await FoodModel.find({
            category : { $regex : category, $options : "i"},
        }) ;

        if(!foods) return res.status(404).json({error : `No food matched with ${category}`}); 
        return res.json({foods});
    }catch (error)  {
        return res.status(500).json({error : error.message});
    }
});



export default Router;