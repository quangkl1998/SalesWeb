class Product {
    constructor(id, name, price, img, quantity, screen, type, frontCamera, backCamera, desc) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.img = img;
        this.quantity = quantity;
        this.screen = screen;
        this.type = type;
        this.frontCamera = frontCamera;
        this.backCamera = backCamera;
        this.desc = desc;
    }
    render() {
        return `<tr>
            <td>
                <img src=${this.img} alt=${this.img} width="50px">
            </td>
            <td>${this.name}</td>
            <td>${this.price}</td>
            <td>${this.quantity}</td>
            <td>${this.type}</td>
            <td>
                <button class="btn btn-sm" onclick="getProduct(${this.id})" data-toggle="modal" data-target="#myModal">
                    <i class="fa fa-pen"></i>
                </button>
                <button class="btn btn-sm" onclick="deleteProduct(${this.id})">
                    <i class="fa fa-trash"></i>
                </button>
            </td>
        </tr>`;
    }
}

{
    /* <a onclick="getStaff('${this.userName}')" class="btn" data-toggle="modal" data-target="#myModal">
    <i class="fa fa-pen"></i>
</a>; */
}
