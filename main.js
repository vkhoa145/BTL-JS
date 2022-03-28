

// Tạo hàm pop up modal
document.getElementById('shoppingCart').addEventListener('click', () => {
    const sideNav = document.getElementById("sideNav")
    
    sideNav.style.right = "0";
});

// Tạo hàm tắt modal

window.addEventListener('click', () =>{
    if (Event.target === sideNav) {
        sideNav.style.right = "-100%";
    };
});