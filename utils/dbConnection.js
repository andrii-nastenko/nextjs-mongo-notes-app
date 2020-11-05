import mongoose from 'mongoose';

export const dbConnect = () => mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(db => console.log(`db connection status: ${db.connections[0].readyState}`))
    .catch(error => console.log(error))