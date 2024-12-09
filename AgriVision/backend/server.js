import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan'
import connectDB from './config/db.js';
import colors from 'colors'

import { notFound, errorHandler } from './middleware/errorMiddlware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import supplierRoutes from './routes/supplierRoutes.js'

dotenv.config('./../.env');

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
    console.log("h1 here ...");
}

app.use(express.json())

app.use('/api', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/supplier', supplierRoutes);


//MK
// server.js or productRoutes.js
app.get('/api/seeds/:id', (req, res) => {
    const seed = getSeedById(req.params.id); // Or fetch from DB
    if (!seed) {
        return res.status(404).json({ message: 'Seed not found' });
    }
    res.json(seed);
});

app.get('/api/lendMachines/:id', (req, res) => {
    const machine = getMachineById(req.params.id); // fetch machine data
    if (!machine) {
        res.status(404).json({ message: 'Machine not found' });
    } else {
        res.json(machine);
    }
});

app.get('/api/consumer/:id', (req, res) => {
    const consumerProduct = getConsumerProductById(req.params.id); // fetch consumer product
    if (!consumerProduct) {
        res.status(404).json({ message: 'Product not found' });
    } else {
        res.json(consumerProduct);
    }
});







// PAYPAL 
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => {
        res.send("API is running here..");
    })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(`Server running ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold)
);