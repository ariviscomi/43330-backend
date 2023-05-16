const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = [];
  }

  loadProducts() {
	return fs.promises.readFile(this.filePath, 'utf-8')
	.then(data => {
	  this.products = JSON.parse(data);
	  return this.products;
	});
  }

  saveProducts() {
    const data = JSON.stringify(this.products);
    return fs.promises.writeFile(this.filePath, data);
  }

  addProduct(product) {
    product.id = this.products.length + 1;
    this.products.push(product);
    return this.saveProducts();
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...updatedProduct, id };
      return this.saveProducts();
    } else {
      return Promise.reject(new Error('Product not found'));
    }
  }

  getAllProducts() {
    return this.loadProducts();
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (product) {
      return Promise.resolve(product);
    } else {
      return Promise.reject(new Error('Product not found'));
    }
  }
}

const productManager = new ProductManager('files/products.txt');

productManager.addProduct({
  title: 'Producto 1',
  description: 'Descripción del producto 1',
  price: 9.99,
  thumbnail: 'ruta/imagen1.jpg'
})

productManager.addProduct({
  title: 'Producto 2',
  description: 'Descripción del producto 2',
  price: 9.99,
  thumbnail: 'ruta/imagen2.jpg'
})

  .then(() => {return productManager.getAllProducts();})
  .then(products => {console.log(products);})
  .catch(error => {console.error(error);});