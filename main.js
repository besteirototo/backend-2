const fs = require("fs");

class ProductManager {
  constructor() {
    this.path = "./products.json";
    try {
      this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    } catch (err) {
      this.products = [];
    }
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    try {
      const product = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      };

      this.products.length === 0
        ? (product.id = 1)
        : (product.id = this.products[this.products.length - 1].id + 1);
      this.products.push(product);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
    } catch (err) {
      throw new Error(err);
    }
  };

  getProducts = async () => JSON.parse(await fs.promises.readFile(this.path));

  getProductById = async (id) =>
    await this.products.find((product) => product.id === id);

  deleteProduct = async (id) => {
    try {
      const product = this.products.findIndex((product) => product.id === id);
      if (product !== -1) {
        this.products.splice(product, 1);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.products, null, "\t")
        );
      } else {
        console.log("Producto no encontrado");
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  updateProduct = async (id, product) => {
    try {
      const oldProduct = this.products.find((product) => product.id === id);
      const index = this.products.findIndex((product) => product.id === id);
      if (index !== -1) {
        const newProduct = { ...oldProduct, ...product };
        this.products[index] = newProduct;
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.products, null, "\t")
        );
      }
    } catch (err) {
      throw new Error(err);
    }
  };
}
