import ProductModel, {
  ProductInputtableTypes,
  ProductSequelizeModel,
} from '../database/models/product.model';
import validateProducts from '../middlewares/validateProducts';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

let serviceResponse: ServiceResponse<Product>;
const createProduct = async (body: ProductInputtableTypes): 
Promise<ServiceResponse<Product>> => {
  const errorNull = validateProducts.nullBody(body);
  if (errorNull) {
    serviceResponse = { status: 'INVALID_DATA', data: { message: errorNull } };
    return serviceResponse;
  }
  const errorType = validateProducts.type(body);
  if (errorType) serviceResponse = { status: 'INVALID_INPUT', data: { message: errorType } };
  const errorLength = validateProducts.inputLength(body);
  if (errorLength) serviceResponse = { status: 'INVALID_INPUT', data: { message: errorLength } };
  const errors = [errorNull, errorType, errorLength].every((e) => e === undefined);
  if (errors) {
    const newProduct = await ProductModel.create(body);
    serviceResponse = { status: 'SUCCESSFUL', data: newProduct.dataValues };
  }
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