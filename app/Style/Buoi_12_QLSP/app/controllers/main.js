const productManager = new ProductManager();
init();

// Function mặc định chạy đầu tiên khi ứng dụng được khởi chạy
function init() {
  // Lấy danh sách sản phẩm để hiện thị ra table
  productManager.getProducts().then(() => {
    // Hiển thị products ra table
    console.log(productManager.products);
    display(productManager.products);
  });
}

function display(products) {
  const html = products.reduce((result, product, index) => {
    return (
      result +
      `
      <tr>
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>
          <img src="${product.image}" width="50" height="50" />
        </td>
        <td>${product.description}</td>
        <td>
          <button
            class="btn btn-primary"
            data-id="${product.id}"
            data-type="update"
            data-toggle="modal"
            data-target="#myModal"
          >
            Update
          </button>

          <button
            class="btn btn-danger"
            data-id="${product.id}"
            data-type="delete"
          >
            Delete
          </button>
        </td>
      </tr>
    `
    );
  }, "");

  document.getElementById("tblDanhSachSP").innerHTML = html;
}

// Xử lý nút Thêm SP để cập nhật giao diện cho modal
document.getElementById("btnThemSP").addEventListener("click", () => {
  // Xử lý thay đổi heading và thêm button
  document.querySelector(".modal-title").innerHTML = "Thêm Sản Phẩm";
  document.querySelector(".modal-footer").innerHTML = `
    <button class="btn btn-danger" data-dismiss="modal">Đóng</button>
    <button id="btnCreate" class="btn btn-success">Thêm</button>
  `;
});

// Xử lý DOM tới modal-footer để lắng nghe button Thêm/Cập Nhật
document.querySelector(".modal-footer").addEventListener("click", (event) => {
  // DOM tới input để lấy value
  const name = document.getElementById("TenSP").value;
  const price = +document.getElementById("GiaSP").value;
  const image = document.getElementById("HinhSP").value;
  const description = document.getElementById("MotaSP").value;

  const product = new Product(name, price, description, image);

  const targetEl = event.target;
  if (targetEl.id === "btnCreate") {
    productManager.createProduct(product).then(() => {
      // Lấy danh sách sản phẩm thành công => hiển thị ra giao diện
      display(productManager.products);
      // Đóng modal
      $('#myModal').modal('hide')
    });
  }

  if (targetEl.id === "btnUpdate") {
    const productID = document.getElementById("MaSP").value;
    productManager.updateProduct(productID, product).then(() => {
      display(productManager.products);
      // Đóng modal
      $('#myModal').modal('hide')
    });
  }
});

// Xử lý DOM tới tbody để lắng nghe button Update/Delete
document.getElementById("tblDanhSachSP").addEventListener("click", (event) => {
  const targetEl = event.target;

  const id = targetEl.getAttribute("data-id");
  const type = targetEl.getAttribute("data-type");

  if (type === "delete") {
    productManager.deleteProduct(id).then(() => {
      // Sau khi gọi API xoá thành công và gọi lại api lấy danh sách sản phẩm thành công
      display(productManager.products);
    });
  }

  if (type === "update") {
    // Cập nhật giao diện cho Modal
    document.querySelector(".modal-title").innerHTML = "Cập nhật Sản Phẩm";
    document.querySelector(".modal-footer").innerHTML = `
      <button class="btn btn-danger" data-dismiss="modal">Đóng</button>
      <button id="btnUpdate" class="btn btn-success">Cập Nhật</button>
    `;

    // Gọi API lấy chi tiết sản phẩm bằng id
    productManager.getProductById(id).then((result) => {
      // Đổ data của sản phẩm cần cập nhật lên form
      document.getElementById("MaSP").value = id;
      document.getElementById("TenSP").value = result.data.name;
      document.getElementById("GiaSP").value = result.data.price;
      document.getElementById("HinhSP").value = result.data.image;
      document.getElementById("MotaSP").value = result.data.description;
    });
  }
});
