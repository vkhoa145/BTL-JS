// Create Products object 
function Product(name, price, backCamera, frontCamera, img, description, type) {
    this.name = name;
    this.price = price;
    this.backCamera = backCamera;
    this.frontCamera = frontCamera;
    this.img = img;
    this.description = description;
    this.type = type;
  }
// Create Cart Item object 
function CartItem (quanity) {
  this.prodcut = [];
  this.quanity = quanity;
}
