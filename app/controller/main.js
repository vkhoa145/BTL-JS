



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

    displayFilter(filterManager.products);
    const acs = removingDuplicate(filterManager.products)
    // console.log(acs)




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

const cartitemManager = new cartItemManager();






// click event on card in order to listening the event on card button 
document.getElementById('main-card').addEventListener('click', (event) => {
  const targetEl = event.target;
  const id = targetEl.getAttribute("data-id")

  console.log(id)

  cartitemManager.getIdToCart(id).then(() => {
    console.log(cartitemManager.cartitem.item.name);
    renderCart(cartitemManager.cartitem.item);

  })
})

function renderCart (carts) {
  const html = carts.reduce((result,cart) => {
    return (
      result + 
      `
        <tbody>
          <tr>
           <td>${cart.quanity}</td>
          </tr>
        </tbody>
      `
    )
  },"");
  document.getElementById("cart").innerHTML = html;
}

// Tạo hàm pop up modal
document.getElementById('shoppingCart').addEventListener('click', () => {
  const sideNav = document.getElementById("sideNav");

  sideNav.style.right = "0";
  const cover = document.getElementById('cover');
  cover.style.display = 'block';
});

// Tạo hàm tắt modal

function closeModal() {
  const sideNav = document.getElementById("sideNav");
  sideNav.style.right = "-100%";
  const cover = document.getElementById('cover');
  cover.style.display = 'none';
};