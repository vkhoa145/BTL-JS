
function ProductManager() {
    this.products = [];
};
// Creating Get Product from Axios and apply to product manager
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
                        item.backCamera,
                        item.frontCamera,
                        item.img,
                        item.description,
                        item.type

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

// Getting data from axios and apply to Filter bar
function FilterBar() {
    this.filters = []
};

FilterBar.prototype.getFilterData = function () {
    // Call API lấy danh sách sản phẩm
    return new Promise((resolve, reject) => {
        axios
            .get("https://6242f170b6734894c158f4a9.mockapi.io/Products")
            .then((filter) => {
                this.filters = filter.data.map((item) => {
                    const filter = new Product(
                        item.name,
                        item.price,
                        item.backCamera,
                        item.frontCamera,
                        item.img,
                        item.description,
                        item.type

                    );
                    // Gán id cho object product
                    filter.id = item.id;

                    return filter;
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

// Nên tạo hàm lấy data từ axios chung giữa filter và card
