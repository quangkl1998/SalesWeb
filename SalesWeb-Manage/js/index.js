let productList = [];

const fetchData = async () => {
    try {
        const res = await axios({
            url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
            method: "GET",
        });
        console.log(res.data);
        productList = mapProduct(res.data);
        renderProducts(productList);
    } catch (err) {
        console.log(err);
    }
};

const mapProduct = (data) => {
    const results = data.map((item, i) => {
        return new Product(
            item.id,
            item.name,
            item.price,
            item.img,
            item.quantity,
            item.screen,
            item.type,
            item.frontCamera,
            item.backCamera,
            item.desc,
        );
    });
    return results;
};

const createProduct = async () => {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let img = document.getElementById("image").value;
    let quantity = document.getElementById("quantity").value;
    let screen = document.getElementById("screen").value;
    let type = document.getElementById("type").value;
    let frontCamera = document.getElementById("frontCamera").value;
    let backCamera = document.getElementById("backCamera").value;
    let desc = document.getElementById("desc").value;

    const newProduct = new Product(0, name, price, img, quantity, screen, type, frontCamera, backCamera, desc);

    try {
        const res = await axios({
            url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
            method: "POST",
            data: newProduct,
        });
        fetchData();
    } catch (err) {
        console.log(err);
    }
};

const deleteProduct = (id) => {
    axios({
        url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/" + id,
        method: "DELETE",
    })
        .then(function (res) {
            fetchData();
        })
        .catch(function (err) {
            console.log(err);
        });
};

const getProduct = (id) => {
    axios({
        url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/" + id,
        method: "GET",
    })
        .then(function (res) {
            let foundProduct = res.data;

            console.log(foundProduct);
            document.getElementById("id").value = foundProduct.id;
            document.getElementById("name").value = foundProduct.name;
            document.getElementById("price").value = foundProduct.price;
            document.getElementById("image").value = foundProduct.img;
            document.getElementById("quantity").value = foundProduct.quantity;
            document.getElementById("screen").value = foundProduct.screen;
            document.getElementById("type").value = foundProduct.type;
            document.getElementById("frontCamera").value = foundProduct.frontCamera;
            document.getElementById("backCamera").value = foundProduct.backCamera;
            document.getElementById("desc").value = foundProduct.desc;

            document.getElementById("btncreateProduct").style.display = "none";
            document.getElementById("btnCapNhat").style.display = "inline-block";
        })
        .catch(function (err) {
            console.log(err);
        });
};

var updateProduct = function () {
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let img = document.getElementById("image").value;
    let quantity = document.getElementById("quantity").value;
    let screen = document.getElementById("screen").value;
    let type = document.getElementById("type").value;
    let frontCamera = document.getElementById("frontCamera").value;
    let backCamera = document.getElementById("backCamera").value;
    let desc = document.getElementById("desc").value;

    const updatedProduct = new Product(id, name, price, img, quantity, screen, type, frontCamera, backCamera, desc);
    axios({
        url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/" + id,
        method: "PUT",
        data: updatedProduct,
    })
        .then(function (res) {
            fetchData();
            document.getElementById("btnDong").click();
        })
        .catch(function (err) {
            console.log(err);
        });
};

const renderProducts = (data) => {
    let productListHTML = "";

    data.forEach((item, index) => {
        productListHTML += item.render(index + 1);
    });
    document.getElementById("tableDanhSach").innerHTML = productListHTML;
};
fetchData();

document.getElementById("btncreateProduct").addEventListener("click", createProduct);

const resetModal = () => {
    document.getElementById("btnReset").click();
    document.getElementById("btncreateProduct").style.display = "block";
    document.getElementById("btnCapNhat").style.display = "none";
};

var findProduct = function () {
    var keyword = document.getElementById("searchName").value.toLowerCase().trim();
    var results = [];
    for (var i = 0; i < productList.length; i++) {
        var productName = productList[i].name.toLowerCase();
        if (productName.includes(keyword)) {
            results.push(productList[i]);
        }
    }
    renderProducts(results);
};
