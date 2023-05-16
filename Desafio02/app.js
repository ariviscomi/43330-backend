const fs = require('fs');

class ProductManager {
	constructor(filePath) {
		this.filePath = filePath;
		this.products = [];
	}

	loadProducts() {
		return fs.promises.readFile(this.filePath, 'utf-8')
			.then(data => {
				this.products = data.split('\n');
				return this.products;
			})
	}

	saveProducts() {
		const data = this.products.join('\n');
		return fs.promises.writeFile(this.filePath, data);
	}

	addProduct(product) {
		this.products.push(product);
		return this.saveProducts();
	}

	updateProduct(index, product) {
		this.products[index] = product;
		return this.saveProducts();
	}

	removeProduct(index) {
		this.products.splice(index, 1);
		return this.saveProducts();
	}

	listProducts() {
		return this.loadProducts()
			.then(products => {
				console.log(products);
				return products;
			})
	}
}
