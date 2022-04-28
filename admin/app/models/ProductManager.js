function ProductManager() {
  this.products = [];
}

ProductManager.prototype.getProducts = function () {
  // Call API lấy danh sách sản phẩm
  return new Promise((resolve, reject) => {
    axios
      .get("https://6242f170b6734894c158f4a9.mockapi.io/Products")
      .then((result) => {
        this.products = result.data.map((item) => {
          const product = new Product(
            item.name,
            item.price,
            item.description,
            item.image
          );
          // Gán id cho object product
          product.id = item.id;

          return product;
        });

        resolve();
      })
      .catch((error) => {
        console.log(error.response.data);
        reject(error);
        alert("Cannot get product list");
      });
  });
};

ProductManager.prototype.getProductById = function (productID) {
  return axios.get(
    `https://6242f170b6734894c158f4a9.mockapi.io/Products/${productID}`
  );
};

ProductManager.prototype.createProduct = function (product) {
  // Gọi API thêm sản phẩm
  return axios
    .post("https://6242f170b6734894c158f4a9.mockapi.io/Products", product)
    .then(() => {
      // Thêm thành công => gọi API lấy danh sách sản phẩm
      return this.getProducts();
    });
};

ProductManager.prototype.updateProduct = function (productID, product) {
  return axios
    .put(
      `https://6242f170b6734894c158f4a9.mockapi.io/Products/${productID}`,
      product
    )
    .then(() => {
      // Cập nhật thành công => gọi API lấy danh sách sản phẩm
      return this.getProducts();
    });
};

ProductManager.prototype.deleteProduct = function (productID) {
  return axios
    .delete(
      `https://6242f170b6734894c158f4a9.mockapi.io/Products/${productID}`
    )
    .then(() => {
      return this.getProducts();
    });
};

