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
function CartItem (quanity,name, price,id,total) {
  this.item = {id,name,price};
  this.quanity = quanity;
  this.total = total;
}

