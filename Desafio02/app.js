const fs = require('fs');
const format = 'utf-8';

class ProductManager {

	constructor(path) {
		this.path = path;
		fs.promises.writeFile(this.path,'');
	}

	addProduct = async (title, description, price, thumbnail, code, stock) => {

		console.log('\nAgregando un nuevo producto:');

		const product = {
			id: 0,
			title: title,
			description: description,
			price: price,
			thumbnail: thumbnail,
			code: code,
			stock: stock
		};

		try {
			console.log('leyendo archivo');
		
			let products = await fs.promises.readFile(this.path, format);
			JSON.parse(products);

			// product.id = products.length + 1;

			await fs.promises.appendFile(this.path,JSON.stringify(product) + ',');
		}

		catch {
			console.warn('no se pudo encontrar el archivo');
			console.log('creando archivo');
			try {
				this.products.push(product);
				await fs.promises.writeFile(this.path, JSON.stringify(this.products));
			}

			catch {
				console.error('Algo Malio Sal');
			}
		}
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

			let products = await fs.promises.readFile(this.path, format)

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
