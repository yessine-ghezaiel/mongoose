const express = require('express');
const router = express.Router();
const Person = require('../models/personSchema')

//// Create and Save a Record of a Model
router.post('/newPerson', (req, res) => {
  const newPerson = req.body;
  const new_Person = new Person(newPerson);
  new_Person
    .save()
    .then(() => res.send('new person added'))
    .catch((err) => res.status(400).json(err.message));
});

// Create Many people with Model.create()

var createManyPeople = function(arrayOfPeople, done) {
  Person.create( arrayOfPeople, (err, data) => err ? console.log(err) : done(null, data));
}; 

router.post('/ManyPerson',(req,res)=> {
createManyPeople (req.body,(err,data)=> { 
  err ?  res.status(400).json(err.message) : res.send('ManyPerson was added')
  })  
})


//Use model.find() to Search in my Database we will use the name in the path and search for the person that have the same name using
// Person.find 
router.get('/:name',(req,res)=> {
  Person.find({name:req.params.name},(err,data)=> { 
      err ?  console.log(err) : res.json(data)
  })
})


// Use model.findOne() to Return a Single Matching Document from Your Database
router.get('/fav/:favoriteFoods',(req,res)=> {
  Person.findOne({favoriteFoods:{$elemMatch:{$eq:req.params.favoriteFoods}}},(err,data)=> { 
      err ?  console.log(err) : res.json(data)
  })
})

//Use model.findById() to Search Your Database By _id
router.get('/id/:id',(req,res)=> {
  Person.findById({_id:req.params.id},(err,data)=> { 
      err ?  console.log(err) : res.json(data)
  })
})


//Perform Classic Updates by Running Find, Edit, then Save 

router.put('/id/:id',async (req,res)=>{  
  try{
    var foodToAdd = 'hamburger';
    const data= await Person.findById(req.params.id)
    data.favoriteFoods=[...data.favoriteFoods,foodToAdd]
    const newdata= await  data.save()
    res.status(200).json(newdata)
  }
  catch(err){
    res.status(400).json(err.message)
  }
})

//Find a person by Name and set the person's age to 20 Using model.findOneAndUpdate()
router.put('/updateAge/:name',(req,res)=> {
  const newAge = 20;
  Person.findOneAndUpdate({name:req.params.name},{$set: {"age":newAge}},{returnNewDocument : true}, function(err, doc){
  if(err){return console.log(err);}
  res.json(doc);                  
  })     
})  

//Delete One Document Using model.findByIdAndRemove
router.delete('/:id',(req,res)=> {
  Person.findByIdAndRemove({_id:req.params.id},(err,data)=> { 
      err ?  console.log(err) : res.json(data)
  }) 
}) 


// Delete Many Documents with model.remove
router.delete('/deletMany/:name',(req,res)=> {
  Person.remove({ name:req.params.name},(err,data)=> { 
    err ?  console.log(err) : res.send('we deleted all the persons named mary')
  })   
})

//Chain Search Query Helpers to Narrow Search Results
router.get('/searchingfood',(req,res)=> {
var foodToSearch = "burritos";
Person.find({favoriteFoods:{$elemMatch:{$eq:foodToSearch }}})
.sort({name : "asc"})
.limit(2)
.select("-age")
.exec((err, data) => {
  (err) ? console.log(err) : res.json(data)
  })
})


module.exports = router;
