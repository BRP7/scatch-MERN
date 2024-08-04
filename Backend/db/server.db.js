// import mongoose from "mongoose";


// const connectDB = async () => {
//     try {
//        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/scatch`);
//        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
//     } catch (error) {
//       console.log("MONGODB connect error ",error);
//       process.exit(1);  
//     }
// }

// export default connectDB 


// const express = require('express');
// const bodyParser = require('body-parser');
// const corsMiddleware = require('./middlewares/corsMiddleware.js');
// const authRoutes = require('./routes/auth.routes.js');
// const userRoutes = require('./routes/user.routes.js');
// const productRoutes = require('./routes/product.routes.js');

// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(corsMiddleware);

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const userRoutes = require('./routes/userRoutes');
// // const productRoutes = require('./routes/productRoutes'); 
// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const mongoose = require('mongoose');
// // const corsMiddleware = require('./middlewares/corsMiddleware');
// // const userRoutes = require('./routes/userRoutes');
// // const authRoutes = require('./routes/authRoutes');
// // const productRoutes = require('./routes/productRoutes');
// // const app = express();

// // // Middleware
// // app.use(bodyParser.json());
// // app.use(corsMiddleware);

// // // Routes
// // app.use('/api/users', userRoutes);
// // app.use('/api/auth', authRoutes);
// // app.use('/api/products', productRoutes);

// // const PORT = process.env.PORT || 5000;
// // mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
// //     .then(() => {
// //         app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// //     })
// //     .catch(err => console.log(err));




// // // // Middleware
// // // app.use(bodyParser.json());

// // // // Routes
// // // app.use('/api/users', userRoutes); 
// // // app.use('/api/products', productRoutes); 
// // // app.use('/api/login', productRoutes); 

// // module.exports = app;
