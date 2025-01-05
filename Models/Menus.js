// const boolean = require("nodash/lib/boolean");
// const type = require("nodash/lib/type");

const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true ,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    taste : {
        type : String,
        enum : ['sweet','spicy','sour'],
        required : true
    },
    isDrink : {
        type : Boolean,
        default : false  
    },
    ingredients : {
        type : [String],
        default : []
    },
    noOfSales : {
        type : Number,
        default : 0
    }
})

const showMenus = mongoose.model("MenuItems",menuSchema);

module.exports = showMenus ;