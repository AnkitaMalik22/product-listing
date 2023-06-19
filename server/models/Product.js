const mongoose =  require('mongoose');

const productSchema = new mongoose.Schema({
name : {
    type : String,
    required :true
},
category : {
    type : String,
    required :true
},
logoUrl : {
    type : String,
    required :true
},
link : {
    type : String,
    required :true
},
description : {
    type : String,
    required :true
},
comments :[{
    user: {
        type: String,
        required: true
      },
      comment: {
        type: String,
        required: true
      }
}]

})

const Product = mongoose.model('Product' , productSchema);

module.exports = Product ;