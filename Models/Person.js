// import { uniqueId } from 'lodash';
// import type from 'nodash/lib/type';

const mongoose = require('mongoose');

// Defining Person Schema
const personSchema = mongoose.Schema({
   name : {
        type : String ,
        required : true
   },
   age : {
        type : Number ,
   },
   work : {
        type : String ,
        enum : ['chef','manager','waiter'],
        required : true
   },
   mobile : {
        type : Number ,
        required : true
   },
   email : {
        type : String ,
        unique : true,
        required : true
   },
   address : {
        type : String ,
        required : true
   },
   salary : {
        type : Number ,
        required : true
   }
})

// building model on designed schema

const Person = mongoose.model("Person",personSchema);

// Exporting created module
module.exports = Person ;