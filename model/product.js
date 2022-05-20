export class Product {
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

    total() {
        return this.price;
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
                        <button class="btn btn-success" onclick="addCart(${this.id})">Thêm vào giỏ hàng</button>
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
