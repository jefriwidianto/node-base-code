const mongoose = require("mongoose");

module.exports.connectMongo = () => {
    return new Promise((resolve) => {
        try {
            global.$mongo = mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DATABASE_NAME}.eibasr8.mongodb.net/?retryWrites=true&w=majority`,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
            resolve(`[ASYNC-START.OK]: Successfully connected to DB / ${new Date()}`);
        } catch (error) {
            console.log(error.message)
            resolve(`[ERR]: Error while attempt to connect database / ${new Date()}`);
        }
    })
}