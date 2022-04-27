



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

// Displayed Product on screen
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
          <img> class ="card-img" src =${product.img} >
          <div class ="card-body">
            <h4 class="card-title">${product.name}</h4>
            <div class ="card-price">
              <div class ="price">${product.price}</div>
            </div>
            <h4 class="card-backCamera">${product.backCamera}</h4>
            <h4 class="card-frontCamera">${product.frontCamera}</h4>
            <button class ="btn btn-danger" data-id ="${product.id}">Add</button>
          </div>
       </div>
       `
    );
  }, "");

  document.getElementById("main-card").innerHTML = html;
}

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


function displayFilter(filters) {
  const duplicate = removingDuplicate(filters)
  const html = duplicate.reduce((result, filter) => {
    return (
      result +
      `
       <div>
          <ul class ="filter-product">
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
// Removing duplicated item in Filter Bar
function removingDuplicate(filter) {
  filter = filter.filter((value, index, self) =>
    index === self.findIndex((positionArr) => (
      positionArr.type === value.type
    ))
  );
  return filter;
};

// Click event to filtering the product which had the same type with filter bar





const cartitemManager = new cartItemManager();





// Transfer data o cart item 
let cartlist = [];
document.getElementById('main-card').addEventListener('click', (event) => {
  const targetEl = event.target;
  const id = targetEl.getAttribute("data-id")



  cartitemManager.getIdToCart(id).then(() => {



    transferDataIntoCartItem(cartitemManager.cartitem)
    renderCart(cartlist);
    
    

  })
})
function transferDataIntoCartItem(cartitem) {
  
  for (let i = 0; i < cartlist.length; i++) {
    let totalPurchase = 0;
    if (cartlist[i].item.id === cartitem.item.id) {
      cartlist[i].quanity = Number(cartlist[i].quanity) + 1
      cartlist[i].total = Number(cartlist[i].item.price) * Number(cartlist[i].quanity)
      
      return;
    }
    
  }
  


  cartlist.push(cartitem);
  
};




function renderCart(carts) {
  const html = carts.reduce((result, cart) => {
    return (
      result +
      `
        <table class ="table table-dark">
          <tbody>
            <tr>
              <td>${cart.item.name}</td>
              <td>${cart.item.price}</td>
              <td>${cart.quanity}</td>
              <td>${cart.total}</td>

              
              

            </tr>
          </tbody>
        </table>
      `
    )
  }, "");
  document.getElementById("cart").innerHTML = html;
}

// function renderPurchase (purchase) {
//   const html = 
//   `
//   <strong>
//     Total: $
//     <span class="total" id="totalPurchase">${purchase}</span>
//   </strong>
  
//   `

//   document.getElementById("totalPurchase").innerHTML = html;
// }