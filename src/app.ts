import express from 'express';
import orderRouter from './routers/order.router';
import productRouter from './routers/product.router';

const app = express();

app.use(express.json());

app.use('/products', productRouter);
app.use('/orders', orderRouter);

export default app;
