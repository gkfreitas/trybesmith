import { ProductInputtableTypes } from '../database/models/product.model';

const nullBody = (body: ProductInputtableTypes): string | undefined => {
  const { name, price } = body;
  if (!name) return '"name" is required';
  if (!price) return '"price" is required';
};

const type = (body: ProductInputtableTypes): string | undefined => {
  const { name, price } = body;
  if (typeof name !== 'string') return '"name" must be a string';
  if (typeof price !== 'string') return '"price" must be a string';
};
const inputLength = (body: ProductInputtableTypes): string | undefined => {
  const { name, price } = body;
  if (name.length <= 2) return '"name" length must be at least 3 characters long';
  if (price.length <= 2) return '"price" length must be at least 3 characters long';
};

export default {
  nullBody,
  type,
  inputLength,
};
