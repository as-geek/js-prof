const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

class Products {
    constructor(container=`.products`){
        this.container = container;
        this.data = [];
        this.allProduct = [];
        this._getProducts()
            .then(() => this._render());
    }
    sum(){
        let sum = 0;
        for (let el of this.allProduct) {
            sum += el.price;
        }
        return sum;
    }
    _getProducts(){
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.data = [...data];
            })
            .catch(error => console.log(error));
    }
    _render(){
        const block = document.querySelector(this.container);
        for (let el of this.data) {
            const product = new ProductItem(el);
            this.allProduct.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }
}

class ProductItem{
    constructor(el, img='https://placehold.it/150x150') {
        this.product_name = el.product_name;
        this.id_product = el.id_product;
        this.price = el.price;
        this.img = img;
    }
    render(){
        return `<div class="product-item">
                    <img src="${this.img}" alt="${this.product_name}">
                    <h3>${this.product_name}</h3>
                    <p>${this.price}</p>
                    <button class="buy-btn">Купить</button>
                </div>`
    }
}


class CartItem {
    constructor(){
        // this.title       //Название товара
        // this.id          //id товара
        // this.price       //Цена товара
        // this.img         //Картинка товара
    }
    quantity(){}           //Подсчёт количества товара. Думаю, что это метод, а не свойство.
                            //Т.к. количество меняется по нажатию кнопки
    subTotal(){}           //Подсчёт суммарной стоимости одного вида товара
    render(){}             //Рендер товара
}

class Cart {
    constructor(){
        // this.container   //Те же свойства, что и в Products
        // this.data
        // this.allProduct
    }

    fetchProduct(){

    }              //Получение товаров, отправленных в корзину
    total(){}              //Подсчёт общей стоимости товаров
    clearCart(){}          //Очистка корзины
    buyCart(){}            //Оформить покупку
    render(){}             //Рендер корзины
}

const products = new Products();
console.log(products.sum());

let buyBtn = document.querySelector(`buy-btn`);
console.log(buyBtn);

/*
let getRequest = url => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4) {
                if(xhr.status !== 200) {
                    resolve(console.log('error'));
                } else {
                    reject(xhr.responseText);
                }
            }
        };
        xhr.send();
    })
};

getRequest()
    .then(error => console.log(error))
    .catch(data => console.log(data));
*/

/*Второе задание
Я думаю, что в Products надо данные товара записать в кнопку,
а потом в Cart вызвать метод, собирающий данные с кнопки.
Но разобраться с этим наверно только в выходные получится*/