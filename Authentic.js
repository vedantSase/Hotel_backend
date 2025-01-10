// Authentication
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Person = require('./Models/Person');

passport.use(new LocalStrategy(async (USERNAME, passWord, done)=>{
    // authentication logic
    try {
      console.log('Received credentials : ',USERNAME,passWord) ;
      const user = await Person.findOne({username : USERNAME}) ;
      if(!user) 
        return done(null, false , {message : 'Incorrect Username'}) ;
      
      const isPasswordMatch = user.comparePassword(passWord); 
      // const isPasswordMatch = user.password === passWord ? true : false ;
      if(isPasswordMatch)
        return done(null , user) ;
      else
        return done(null , false , {message : 'Incorrect Password'});
    } catch (error) {
        return done(error);
    }
}))




module.exports = passport ;