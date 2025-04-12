const mongoose = require('mongoose')



const connectDB = async ()=> {

    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to MongoDB Database`)
    } catch (error) {
        console.log(`Mongodb Database Eroor ${error}`)
        
    }

}

module.exports = connectDB