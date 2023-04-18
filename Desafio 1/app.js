class ProductManager {

	products = [];
	#id = 0;

	constructor(title, description, price, thumbnail, code, stock) {
		this.title = title,
			this.description = description,
			this.price = price,
			this.thumbnail = thumbnail,
			this.code = code,
			this.stock = stock
	}

	addProduct(title, desc, price, thumb, code, stock) {
		console.log("\nAgregando un nuevo producto:");

		let found=false;

		if(typeof title === 'undefined' || typeof desc === 'undefined' || typeof price === 'undefined' || typeof thumb === 'undefined' || typeof code === 'undefined' || typeof stock === 'undefined'){
			console.warn("Todos los parametros son obligatorios!!");
		}else{
			this.products.forEach((prod) => {
				if (code === prod.prod.code) {
					found=true;
				}
			});
			
			if(!found){
				const product = new ProductManager(title, desc, price, thumb, code, stock);
				this.#id++;
				this.products.push({id:this.#id,prod:product});
				console.log("nuevo producto creado");
			}
			else{
				console.warn("El codigo de producto ya existe, no se puede agregar el nuevo producto");
			}
		}
	}

	getProducts(){
		console.log("\nMostrando productos de la lista:")
		if(this.products.length){
			this.products.forEach((prod)=>{
				console.log(prod.prod);
			});
		}else{
			console.warn("No hay productos en esta lista");
		}
	}

	getProductById(id){
		console.log("\nBuscando producto:")
		let found=false;
		this.products.map((prod)=>{
			if(prod.id === id){
				found=true;
				console.log("el producto que buscas es:");
				console.log(prod);
			}
		});
		
		if(!found){console.error("Not Found")};
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