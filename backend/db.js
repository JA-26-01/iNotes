const mongoose= require('mongoose');
const mongoURI="mongodb://localhost:27017/iNotebook?tls=false&directConnection=true"

const connectmongo = async () =>
{
await mongoose.connect(mongoURI)
console.log("Connection established successfully")
}

module.exports = connectmongo