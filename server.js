const mongoose = require('mongoose');
const express = require('express');
const userRoute = require('./routes/users');
const imageRoute = require('./routes/images')
// const cors = require('cors');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Image_gallery', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
app.use('/uploads', express.static('uploads'));
app.use(userRoute, imageRoute)

// const corsOptions = {
//     origin: 'http://localhost:3001',
//   };
  
//   app.use(cors(corsOptions));

//Starting the server
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost/${port}`)
})