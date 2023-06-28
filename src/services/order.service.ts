import OrderModel, { OrderSequelizeModel } from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';

const listOrders = async ():Promise<ServiceResponse<OrderSequelizeModel[]>> => {
  const orders = await OrderModel.findAll();
  const products = await ProductModel.findAll();
  const data = orders.map((e) => {
    const productFilter = products.filter((product) => 
      e.dataValues.id === product.dataValues.orderId);
    const productIds = productFilter.map((el) => el.dataValues.id);
    e.dataValues = {
      ...e.dataValues,
      productIds,
    };
    return e;
  });
  return { status: 'SUCCESSFUL', data };
};

export default {
  listOrders,
};