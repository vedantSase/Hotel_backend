const express = require('express');
const router = express.Router();
const showMenus = require('../Models/Menus');

// posting menuItems into database
router.post('/getorder',async (req,res)=>{
  try {
    const data = req.body ;
    const order = new showMenus(data);
    const givenOrder = await order.save();
    console.log("Order Saved",givenOrder);
    res.status(200).json(givenOrder);
  } catch (error) {
    console.log("Error while saving order !!!\n",error);
    res.status(500).json(error,'\nInternal server error');
  }
})

// getting menuItems from database on UI
router.get('/showMenu', async (req,res) => {
  try {
      const data = await showMenus.find();
      console.log("Menu Fetched - ",data);
      res.status(200).json(data);
  } catch (error) {
      console.log("Error while fetching data !!!\n",error);
      res.status(500).json(error,"\nInternal server error.");
    }
})

// getting menuItems from database on taste choices
router.get('/:taste', async (req , res) => {
    try {
        const whichtaste = req.params.taste ;  //extract on basis of worktype form URL
        const data = await showMenus.find({taste : whichtaste});
        console.log("Taste items fetched. - ",data);
        res.status(200).json(data);
    } catch (error) {
        console.log("Error while fetching data !!!\n",error);
        res.status(404).json(error,"\nInternal server error.");
    }
})

// exporting modules
module.exports = router ;