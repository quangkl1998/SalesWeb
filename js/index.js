import { Product } from "../model/product.js";

// danh sách sản phẩm
let productList = [];

// danh sách giỏ hàng
let cartList = [];


const fetchProduct = async () => {
    try {
        const res = await axios({
            url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
            method: "GET",
        });
        console.log(res);
        productList = mapProduct(res.data);
        renderProduct(productList);
    } catch (error) {
        console.log(error);
    }
}

fetchProduct();
const mapProduct = (data) => {
    const result = data.map( (item, index) => {
        return new Product(item.name, item.price, item.screen, item.backCamera, item.frontCamera, item.img, item.desc, item.type, item.id, item.quantity);
    });
    return result;
}
const renderProduct = (data) => {
    let productHTML = "";
    data.forEach((item, index) =>{
        productHTML += item.render();
    });
    document.getElementById("product-item").innerHTML = productHTML;
}

const renderCart = (data) => {
    let productHTML = "";
    data.forEach((item, index) =>{
        productHTML += item.render();
    });
    document.getElementById("product-cart").innerHTML = productHTML;
}

const addCart = (id) =>{
    let phone = productList.map((item, index) =>{
        return item.id === id;
    });
    cartList.push(phone);
    renderCart(cartList);
}










