let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const CONNECTION = 'mongodb://localhost:27017/test';

let Dog = mongoose.model('Dog',{
    name: {type: String, required: true},
    color: String,
    age: Number
});
let Owner = mongoose.model('Owner',{
    name:{
        type: String,
        require: true
    },
    dogs: [Dog.schema]
})
mongoose
    .connect(CONNECTION)
    .then(() => { 

        let sirma = new Dog({ 
            age: 3
        })
        Owner.findByIdAndUpdate({_id: '583499ef68d1bb213e7795d0'},
        {$push:{'dogs': sirma}},
        {safe:true,upsert:true})
        .catch((err)=> {
            throw(err)
        })
        .then(console.log) 
    })
