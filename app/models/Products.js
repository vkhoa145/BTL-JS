// Create Products object 
function Product(name, price, backCamera, frontCamera, img, description, type, id) {
    this.name = name;
    this.price = price;
    this.backCamera = backCamera;
    this.frontCamera = frontCamera;
    this.img = img;
    this.description = description;
    this.type = type;
    this.id = id
  }
// Create Cart Item object 
function CartItem (quanity,name, price,id) {
  this.prodcut = [this.prodcut.name = name, this.prodcut.price = price, this.prodcut.id = id];
  this.quanity = quanity;
}
