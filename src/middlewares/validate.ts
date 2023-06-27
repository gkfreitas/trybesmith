import { ProductInputtableTypes } from '../database/models/product.model';

const products = (body: ProductInputtableTypes): boolean => {
  const { name, price, orderId } = body;
  return !name || !price || !orderId;
};

export default {
  products,
};
