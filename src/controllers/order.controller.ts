import { Request, Response } from 'express';
import orderService from '../services/order.service';

async function listOrders(req: Request, res: Response) {
  const serviceResponse = await orderService.listOrders();
  return res.status(200).json(serviceResponse.data);
}

export default {
  listOrders,
};