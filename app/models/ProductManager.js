
function ProductManager() {
    this.products = [];
};

function cartItemManager() {
    this.cartitem = []
    
};

function FilterBar() {
    this.filters = []
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
                        item.type,
                        item.id

                    );



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


// Getting data from axios and apply to Filter bar
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
                        item.type,
                        item.id

                    );


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
ProductManager.prototype.getProductById = function (productId) {
    return axios.get (
        `https://6242f170b6734894c158f4a9.mockapi.io/Products/${productId}`
    );
};



cartItemManager.prototype.getIdToCart = function (productId) {
    // Call API lấy danh sách sản phẩm
    return new Promise((resolve, reject) => {
        axios
            .get(`https://6242f170b6734894c158f4a9.mockapi.io/Products/${productId}`)
            .then((cart) => {
               const item = cart.data;
               this.cartitem = new CartItem(1,item.name,item.price,item.id);
               
            
                
                
                resolve(this.cartitem);
            })
            .catch((error) => {
                console.log(error.response.data);
                reject(error);
               
            });
    });
};




