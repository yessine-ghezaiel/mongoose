const mongoose = require('mongoose');
//Create a person with a prototype
const personSchema = new mongoose.Schema({
  first_name: String,
  name: {
    required: [true, 'Enter your last name please.'],
    type: String,
  },
  age: {
    type: Number,
    required: [true, 'Add your age please.'],
  },
  favoriteFoods:{
    type: [String], 
    default: []
  },
  email: {
    type: String,
    required: [true, 'write your email please.'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'add a password please.'],
  }
});

const Person = mongoose.model('person', personSchema);
module.exports = Person;
