const { Console } = require('console');
const fs = require('fs');
const format = 'utf-8';

/* const writeProduct = async () => {

	try {

	}

	catch (error) {

	}
}

const readProduct = async () => {

	try {

	}

	catch (error) {

	}
}

const findProduct = async () => {

	try {
	}

	catch (error) {
	}
} */
class ProductManager {

	constructor(path) {
		this.path = path;
		this.products=[];

		fs.promises.writeFile(this.path,JSON.stringify(this.products));
		console.log('Nuevo archivo creado');
	}

	addProduct = async (title, description, price, thumbnail, code, stock) => {

		try {

			this.products = JSON.parse(await fs.promises.readFile(this.path,format));
			
			console.log('\nAgregando un nuevo producto:');

			const product = {
				id: this.products.length + 1,
				title: title,
				description: description,
				price: price,
				thumbnail: thumbnail,
				code: code,
				stock: stock
			};

			if (typeof title === undefined || typeof description === undefined || typeof price === undefined || typeof thumbnail === undefined || typeof code === undefined || typeof stock === undefined) {
				console.warn('Todos los parametros son obligatorios!!');
			} else {
				const prodFound = this.products.some((_item) => _item.code == code);
				if (prodFound) {
					console.warn('Ya existe un producto con ese Codigo');
				} else {
					await fs.promises.appendFile(this.path, JSON.stringify(product));
					console.log('Nuevo producto agregado!');
				}
			}
		}

		catch (err) { console.error('Algo Malio Sal :s') }
	}

	unlinkFile = async () => {
		try {
			await fs.promises.unlink(this.path);
			console.log('Se desvinculo el archivo');
		}

		catch (err) { console.warn('No se pudo desvincular el archivo') }
	}

	getProducts = async () => {
		console.log('\nMostrando productos de la lista:');

		try {

			let products = await fs.promises.readFile(this.path,format)

			console.log(products);
			return products;
		}

		catch (err) { console.warn('No se pudo traer el listado') }
	}

	getProductById(id) {
		console.log('\nBuscando producto:')
		const product = this.products.find(prod => prod.id === id);
		if (product == undefined) {
			console.error('Not Found');
		} else {
			console.log('El producto que busca es este: ', product);
			return product;
		}
	}
}

//TODO: ↓↓ Prueba de codigo ↓↓

const prodManager = new ProductManager('./files/products.txt');

prodManager.addProduct("mate montaña", "Mate con dibujo de montañas", 1200, "imagen", "aa022", 10);
prodManager.addProduct("mate termico", "Mate de acero termico", 2000, "imagen", "aa022", 30);

// prodManager.getProducts();
// prodManager.unlinkFile();
