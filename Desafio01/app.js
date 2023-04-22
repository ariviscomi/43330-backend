class ProductManager {

	constructor() {
		this.products = [];
	}

	addProduct(title, description, price, thumbnail, code, stock) {
		console.log("\nAgregando un nuevo producto:");

		const product = {
			id : this.products.length + 1,
			title : title,
			description : description,
			price : price,
			thumbnail : thumbnail,
			code : code,
			stock : stock
		};

		if (typeof title === undefined || typeof description === undefined || typeof price === undefined || typeof thumbnail === undefined || typeof code === undefined || typeof stock === undefined) {
			console.warn("Todos los parametros son obligatorios!!");
		} else {
			const prodFound = this.products.some((_item) => _item.code == code);
			if (prodFound) {
				console.log('Ya existe un producto con ese Codigo');
			} else {
				this.products.push(product);
				console.log('Nuevo producto agregado!');
			}
		}
	}

	getProducts() {
		console.log("\nMostrando productos de la lista:")
		if (this.products.length) {
			console.log(this.products);
			return this.products;
		} else {
			console.warn("No hay productos en esta lista");
		}
	}

	getProductById(id) {
		console.log("\nBuscando producto:")
		const product = this.products.find(prod => prod.id === id);
		if (product == undefined) {
			console.error("Not Found");
		} else {
			console.log('El producto que busca es este: ',product);
			return product;
		}
	}
}

const mateManager = new ProductManager;

mateManager.getProducts();

mateManager.getProductById(5);

mateManager.addProduct("mate montaña","Mate con dibujo de montañas",1200,"imagen","aa022",10);
mateManager.addProduct("mate termico","Mate de acero termico",2000,"imagen","aa022",30);

mateManager.getProducts();

mateManager.getProductById(1);

mateManager.addProduct("mate montaña",1200,"imagen","aa022",10);