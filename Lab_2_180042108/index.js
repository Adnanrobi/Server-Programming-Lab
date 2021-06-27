const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useCreateIndex : true,
    useUnifiedTopology : true
}).then(() => {
    console.log('Database Connection established');
}).catch(err => {
    if (err) {
        console.log('Database connection failed');
    }
})

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));