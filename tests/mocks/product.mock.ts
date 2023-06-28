import { ProductInputtableTypes } from "../../src/database/models/product.model"

const validBody: ProductInputtableTypes = {
  name: 'Escudo do capitão america',
  price: '50 kwanzas',
  orderId: 6
}

const invalidBody = {
  price: '50 kwanzas',
  orderId: 6
}

const invalidBodyType = {
	name: 'Escudo do capitão america',
  price: 100,
  orderId: 6
}

const invalidBodyLength = {
	name: 'es',
  price: '50 kwanzas',
  orderId: 6
}

export default {
  validBody,
  invalidBody,
	invalidBodyType,
	invalidBodyLength
}