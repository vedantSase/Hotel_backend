const express = require('express');
const router = express.Router();
const Person = require('../Models/Person');
const {jwtAuthMiddleware, generateToken,} = require('../jwtAuth');

// posting Person Data into database
router.post('/signup', async (req, res) => {
    try {
      const data = req.body ; //Assuming  the request body contains the person data
  
      // creating a new person document using the mongoose model
      const newPerson = new Person(data);
  
      // saving new person to database
      const savedPerson = await newPerson.save();
      console.log("Data Saved", savedPerson);
      const payLoad = {
        id: savedPerson.id,
        username : savedPerson.username
      }
      const token = generateToken(payLoad);
      console.log("Token Saved : ", token);
      res.status(200).json({savedPerson : savedPerson, token : token});
    } catch (error) {
      console.log("Error while Saving Data !!!\n", error);
      res.status(500).json(error, '\nInternal server error');
    }
  })
  
// profile rount
rputer


// login user 
router.post('/login', async (req, res) => {
  try {
    const {username, password} = req.body ;

    // check if user exists or not in database
    const isuser = await Person.findOne({username: username});

    // if user is not in database or password is not right
    if(!isuser || !(await isuser.comparePassword(password))){
      return res.status(401).json({message: 'Wrong credentials'});
    }

    // if all okay then generate token
    const payload = {
      id : isuser.id ,
      username : isuser.username
    }
    const userinfo = {
      username : isuser.username ,
      mobile : isuser.mobile,
      password : isuser.password
    }
    const token = generateToken(payload);
    // return the token as response
    res.status(200).json({message : userinfo ,token: token});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal server error'});
  }
})

//getting Person data from database
router.get('/', jwtAuthMiddleware, async (req, res)=> {
    try {
      const data = await Person.find();
      console.log("Data Fetched - ",data);
      res.status(200).json(data);
    } catch (error) {
      console.log("Error while fetching Data !!!", error);
      res.status(500).json(error,'Internal server error');
    }
  })


// get person data on basis of work profession
router.get('/:workType',async (req , res) => {
    try {
      const position = req.params.workType ;  //extract on basis of worktype form URL
      if(position == 'chef'||position == 'manager'||position == 'waiter'){
        const respose = await Person.find({work : position});
        console.log("Response Person Data Fetched");
        res.status(200).json(respose);
      }else {
        res.status(404).json({error:'Invalid work type'});
      }   
    } catch (error) {
      
    }
  })

// updating records into databases
router.put('/:id',async (req , res) => {
    try {
        const personId = req.params.id ;    // extract id form URL
        const updatedPerson = req.body ;    // updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPerson, {
            new : true ,
            runValidators : true
        }) 
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('Data to Update : \n',updatedPerson,'\nUpdated Data : \n',response);
        res.status(200).json(response);
    } catch (error) {
        console.log("Error while updating Data !!!\n", error);
        res.status(500).json(error,'\nInternal server error');
    }
})

// deleting records by person id
router.delete('/:id', async(req , res) => {
    try {
        const personId = req.params.id ;
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error : 'Record not found'});
        }
        console.log("Record Deleted.\n",response);
        res.status(200).json(response);
    } catch (error) {
        console.log("Error while Deleting Data !!!\n", error);
        res.status(500).json(error,'\nInternal server error');
        
    }
})
module.exports = router ;