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

const products = [
	{
		"id": 1,
		"name": "Excalibur",
		"price": "10 peças de ouro",
		"orderId": 1
	},
	{
		"id": 2,
		"name": "Espada Justiceira",
		"price": "20 peças de ouro",
		"orderId": 1
	},
	{
		"id": 3,
		"name": "Lira de Orfeu",
		"price": "1 peça de ouro",
		"orderId": 2
	},
	{
		"id": 4,
		"name": "Armadura de Aquiles",
		"price": "1 peça de ouro",
		"orderId": 2
	},
	{
		"id": 5,
		"name": "Harpa de Dagda",
		"price": "15 peças de ouro",
		"orderId": 3
	},
	{
		"id": 6,
		"name": "Arco Escudo Invejável",
		"price": "3 Gemas da Noite",
		"orderId": 4
	}
]

export default {
  validBody,
  invalidBody,
  products
}