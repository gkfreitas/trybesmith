import ProductModel, {
  ProductInputtableTypes,
  ProductSequelizeModel,
} from '../database/models/product.model';
import validateProducts from '../middlewares/validate';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

const createProduct = async (body: ProductInputtableTypes): 
Promise<ServiceResponse<Product>> => {
  let serviceResponse: ServiceResponse<Product>;

  const error = validateProducts.products(body);
  const message = 'Corpo da requisição inválido';
  if (error) {
    serviceResponse = { status: 'INVALID_DATA', data: { message } };
    return serviceResponse;
  }

  const newProduct = await ProductModel.create(body);
  serviceResponse = { status: 'SUCCESSFUL', data: newProduct.dataValues };

  return serviceResponse;
};

const listProducts = async ():Promise<ServiceResponse<ProductSequelizeModel[]>> => {
  const products = await ProductModel.findAll();
  return { status: 'SUCCESSFUL', data: products };
};

export default {
  createProduct,
  listProducts,
};