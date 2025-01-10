// import { uniqueId } from 'lodash';
// import type from 'nodash/lib/type';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isMatch } = require('lodash');
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
   },
   username : {
     type : String ,
     required : true
   },
   password : {
     type : String ,
     required : true
   }
})

personSchema.pre('save',async function(next){
     const person = this ;

     //hash the password only if the user is new
     if(!person.isModified('password')) 
          return next() ;
     try {
          // hash salt generation 
          const salt = await bcrypt.genSalt(10);
          // generate hash password
          const hashedPassword = await bcrypt.hash(person.password, salt) ;
          // override the plain password with hashed password
          person.password = hashedPassword ; 
     } catch (error) {
          return next(error) ;
     }
})

personSchema.methods.comparePassword = async function(clientPassword){
     try {
        const isMatched = await bcrypt.compare(clientPassword, this.password);
        return isMatched ;   
     } catch (error) {
          throw error ;
     }
}

// building model on designed schema

const Person = mongoose.model("Person",personSchema);

// Exporting created module
module.exports = Person ;