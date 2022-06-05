class Product {
    constructor(
        name,
        price,
        screen,
        backCamera,
        frontCamera,
        img,
        desc,
        type,
        id,
        quantity
    ) {
        this.name = name;
        this.price = price;
        this.screen = screen;
        this.backCamera = backCamera;
        this.frontCamera = frontCamera;
        this.img = img;
        this.desc = desc;
        this.type = type;
        this.id = id;
        this.quantity = quantity;
    };

    totalPrice(){
        return this.quantity * this.price;
    }

    renderItemCart(){
        return `
            <tr>
                <td>
                    <img src="${this.img}" alt="${this.image}" width="100px" height="60px">
                </td>
                <td>
                    <p>${this.name}</p>
                </td>
                <td>
                    <p>${this.price}</p>
                </td>
                <td>
                    <button ${this.quantity === 1 ? 'disabled' : ''} class="btn btn-success btn-sm" onclick="changeQuantity('${this.id}', -1)">-</button>
                    <span> ${this.quantity} </span>
                    <button class="btn btn-success btn-sm" onclick="changeQuantity(${this.id}, 1)">+</button>
                </td>
                <td>
                    <p>${this.totalPrice()}</p>
                </td>
                <td>
                    <button onclick="deleteCart('${this.id}')" class="btn btn-light"><i class="fa fa-trash"></i></button>
                </td>
            </tr>
        `;
    };

    render() {
        return `
            <div class="col-3 mb-3">
                <div class="item">
                    <div data-toggle="modal" data-target="#product-${this.id}">
                        <div class="image">
                            <img class="mt-3" src="${this.img}" alt="">
                        </div>
                        <h3 class="item-title">${this.name}</h3>
                        <p class="item-price">Price: ${this.price}</p>
                    </div>
                    <div class="cart">
                        <button class="btn btn-success" onclick="addCart('${this.id}')">Thêm vào giỏ hàng</button>
                    </div>
                    <!-- Modal -->
                    <div class="modal fade" id="product-${this.id}" tabindex="-1" aria-labelledby="#product-${this.id}-Label" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="product-${this.id}-Label">${this.name}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body d-flex">
                                    <div class="col-6">
                                        <img src="${this.img}" alt="" data-toggle="modal" data-target="#product-${this.id}">
                                    </div>
                                    <div class="col-6">
                                        <p>Camera trước: ${this.frontCamera}</p>
                                        <p>Camera sau: ${this.backCamera}</p>
                                        <p>Price: ${this.price} VNĐ</p>
                                        <p class="desc">Thông tin chi tiết: ${this.desc}</p>
                                        
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
