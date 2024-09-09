const mongoose = require('mongoose')



exports.connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://User:kPyFinuo5g2uoy12@experimentalcluster.gj356.mongodb.net/ecommerce')
        console.log('base conectada')
    } catch (error) {
        console.log(error)
    }   
} 


// User - kPyFinuo5g2uoy12
