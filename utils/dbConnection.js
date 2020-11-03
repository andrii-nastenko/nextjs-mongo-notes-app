import mongoose from 'mongoose'

export const dbConnection = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(db => console.log(db.connections[0].isConnected))
    .catch(error => console.log(error))

console.log(dbConnection)