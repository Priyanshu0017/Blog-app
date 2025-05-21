const {  mongoose } = require("mongoose")
const colors = require('colors')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database connection success : ${conn.connection.name}`.bgGreen.white)
    } catch (error) {
        console.log(`Database connection failed : ${error.message}`.bgRed.white)
    }
}

module.exports = connectDB