
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
        console.log(res.data);
        productList = mapProduct(res.data);
        renderProduct(productList);
        getData();
        renderCart(cartList);
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
    let productHTML = " ";
    data.forEach((item, index) =>{
        productHTML += item.renderItemCart();
        console.log(item);
    });
    document.getElementById("product-cart").innerHTML = productHTML;
    document.getElementById("products-total").innerHTML = totalCartList();
}

const addCart = (id) =>{
    let isFind = cartList.find((item, index) =>{
        return item.id === id;
    });
    if(!isFind){
        let index = productList.findIndex((item, index) =>{
            return item.id === id;
        });
        cartList.push({...productList[index], quantity: 1});
        cartList = mapData(cartList);
        renderCart(cartList);
    }
    else{
        isFind.quantity++;
        renderCart(cartList);
    }
    saveData();
}

const mapData = function (dataFromLocal) {
    let data = [];
    for (let i = 0; i < dataFromLocal.length; i++) {
        let currentProduct = dataFromLocal[i];
        let mappedProduct = new Product(
            currentProduct.name,
            currentProduct.price,
            currentProduct.screen,
            currentProduct.backCamera,
            currentProduct.frontCamera,
            currentProduct.img,
            currentProduct.desc,
            currentProduct.type,
            currentProduct.id,
            currentProduct.quantity,
        );

        data.push(mappedProduct);
    }

    return data;
};

var findProduct = function () {
    // chuyển về chữ thường, bỏ khoảng trắng 2 đầu
    var keyword = document.getElementById('txtSearch').value.toLowerCase().trim();
    // var results = [];
    // for (var i = 0; i < productList.length; i++) {
    //     var productName = productList[i].name.toLowerCase();
    //     if (productName.includes(keyword)) {
    //         results.push(productList[i]);
    //     }
    // }
    var results = productList.filter((item) => item.name.toLowerCase().includes(keyword));
    renderProduct(results);
}

const changeType = () =>{
    let type = document.getElementById("choiceType").value;
    const typeList = productList.filter((item) => item.type === type);
    if(typeList.length !== 0){
        renderProduct(typeList);
    }else{
        renderProduct(productList);
    }
}

const changeQuantity = (id, value) =>{
    id = id.toString();
    for(let i = 0; i< cartList.length; i++){
        if(cartList[i].id === id){
            let mappedProduct = cartList[i];
            mappedProduct.quantity = mappedProduct.quantity + value;
        }
    }
    renderCart(cartList);
    saveData();
}

const totalCartList = () =>{
    return cartList.reduce((total, item) => {
        return total + item.quantity * item.price;
    },0);
}

const deleteCart = (id) =>{
    id = id.toString();
    cartList = cartList.filter((item, index) => item.id !== id);
    renderCart(cartList);
    saveData();
}

const payment = () =>{
    alert(`Bạn đã thanh toán tổng tiền: ${totalCartList()}`);
    cartList = [];
    renderCart(cartList);
    saveData();
}


const saveData = () =>{
    let cartListJSON = JSON.stringify(cartList);
    localStorage.setItem('listCart', cartListJSON);
}

const getData = () =>{
    var cartListJSON = localStorage.getItem("listCart");
    if(cartListJSON){
        cartList = mapData(JSON.parse(cartListJSON));
    }
}








