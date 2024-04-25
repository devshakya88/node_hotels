const express = require('express');
const router = express.Router();
const menuItem = require('./../models/MenuItem');



router.post("/", async (req, res) => {
    try {
      const menu = req.body;
      const menus = new menuItem(menu);
      const response = await menus.save();
      console.log("Data Saved");
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  router.get("/", async (req, res) => {
    try {
      const menu = await menuItem.find();
      console.log("Data Fetched Successfully");
      res.status(200).json(menu);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  


  router.get('/:taste', async(req, res)=>{
    try{
      const taste = req.params.taste;
      if (taste == "sour" || taste == "sweet" || taste == "spicy") {
        const response = await menuItem.find({ taste: taste });
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: "Invalid taste Type" });
      }
    }
    catch(error){
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })

  module.exports = router;