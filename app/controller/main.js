
// Initial function of Product 
const productManager = new ProductManager();
init();

// Default function when executing progame 
function init() {
  productManager.getProducts().then(() => {
    // Rendering product 
    // console.log(productManager.products);

    display(productManager.products);

  });
};

// Function: Displayed Product on screen
function display(products) {
  const html = products.reduce((result, product) => {
    return (
      result +
      `
       <div class ="card">
          <div class ="card-top">
            <i class ="fab fa-apple"></i>
            <span>In Stock</span>
          </div>
          <img class ="card-img" src ="${product.img}" >
          <div class ="card-body">
            <h4 class="card-title">${product.name}</h4>
            <div class ="card-price">
              <div class ="price">${product.price}</div>
            </div>
            <h4 class="card-backCamera">${product.backCamera}</h4>
            <h4 class="card-frontCamera">${product.frontCamera}</h4>
            <button class ="btn btn-danger" data-id ="${product.id}" data-type="addtocart">Add</button>
          </div>
       </div>
       `
    );
  }, "");

  document.getElementById("main-card").innerHTML = html;
}
// Filter Bar
// Displayed Filter Bar
const filterManager = new ProductManager();
initFilter();
function initFilter() {
  filterManager.getProducts().then(() => {
    // Rendering product 
    console.log(filterManager.products)
    displayFilter(filterManager.products);
  });
};

// Function: render filter bar
function displayFilter(filters) {
  const duplicate = removingDuplicate(filters)
  const html = duplicate.reduce((result, filter) => {
    return (
      result +
      `
       <div>
          <ul class ="filter-product" id="filter-bar">
            <li>
              <a href ="#">
                <span id="${filter.type}">${filter.type}</span>
              </a>
            </li>
          </ul>
       </div>
       `
    );
  }, "");

  document.getElementById("filter-bar").innerHTML = html;
};
//Function: Removing duplicated item in Filter Bar
function removingDuplicate(filter) {
  filter = filter.filter((value, index, self) =>
    index === self.findIndex((positionArr) => (
      positionArr.type === value.type
    ))
  );

  return filter;
};
// Event: click on filter bar in order to filtering product
let filterbar = [];
document.getElementById("filter-bar").addEventListener("click", (event) => {
  const targetEl = event.target

  const type = targetEl.getAttribute("id")
  
  
  const data = productManager.products
  const filterarray = [];
  for (i =0;i<data.length;i++) {
    if (type === data[i].type) {
      
      
      filterarray.push(data[i])
      
    };
    
  };
  console.log(filterarray);
  display(filterarray)
  
  
})




// Shopping Cart
const cartitemManager = new cartItemManager();
let cartlist = [];
// Event: click on "add" button
document.getElementById('main-card').addEventListener('click', (event) => {
  const targetEl = event.target;
  const id = targetEl.getAttribute("data-id")
  const type = targetEl.getAttribute("data-type")

  if (type === "addtocart") {
    cartitemManager.getIdToCart(id).then(() => {
      transferDataIntoCartItem(cartitemManager.cartitem)
      renderCart(cartlist);
    }).then((result) => {
      renderPurchase(result)
    })
  }


})
// Function: uppdating quanity of items
function transferDataIntoCartItem(cartitem) {
  for (let i = 0; i < cartlist.length; i++) {
    if (cartlist[i].item.id === cartitem.item.id) {
      cartlist[i].quanity = Number(cartlist[i].quanity) + 1
      cartlist[i].total = Number(cartlist[i].item.price) * Number(cartlist[i].quanity)
      return;
    }
  }
  cartlist.push(cartitem);
};
// Function: rendering cart 
function renderCart(carts) {
  const html = carts.reduce((result, cart) => {
    return (
      result +
      `
        <table class ="table table-dark" id="cartdata">
          <tbody>
            <tr>
              <td>${cart.item.name}</td>
              <td>${cart.item.price}</td>
              <td>
                <div class="change-quanity">
                  <button class="increase-quanity" data-id="${cart.item.id}" data-type="increase" >-</button>
                  <span id="change-quanity">${cart.quanity}</span>
                  <button class="decrease-quanity" data-id="${cart.item.id}" data-type="decrease">+</button>
                </div>
              </td>
              <td>${cart.total}</td>
            </tr>
          </tbody>
        </table>
      `
    )
  }, "");
  document.getElementById("cart").innerHTML = html;
}

// Function: render total purchase in cart 
function renderPurchase() {
  let purchase = 0;
  for (i = 0; i < cartlist.length; i++) {
    purchase += Number(cartlist[i].total)
  }
  document.getElementById("totalPurchase").innerHTML = purchase
}
// Event: click on increase and decrease button
document.getElementById('cartdata').addEventListener('click', (event) => {
  const targetEl = event.target;
  const id = targetEl.getAttribute("data-id")
  const type = targetEl.getAttribute("data-type")

  if (type === "increase") {
    cartitemManager.getIdToCart(id).then(() => {
      increase(cartitemManager.cartitem)
    })
  };
  if (type === "decrease") {
    cartitemManager.getIdToCart(id).then((result) => {
      decrease(cartitemManager.cartitem)
    })
  };




})

// function: Increase quanity of item
function increase(cart) {
  for (i = 0; i < cartlist.length; i++) {
    if (cartlist[i].item.id === cart.item.id) {
      cartlist[i].quanity = Number(cartlist[i].quanity) + 1;
      cartlist[i].total = Number(cartlist[i].item.price) * Number(cartlist[i].quanity);


    }
  }
};


// function: Decrease quanity of item
function decrease(cart) {
  for (i = 0; i < cartlist.length; i++) {
    if (cartlist[i].item.id === cart.item.id) {
      cartlist[i].quanity = Number(cartlist[i].quanity) - 1
    }
  }
};

