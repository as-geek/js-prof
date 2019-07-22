const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://placehold.it/150x150',
        cartUrl: '/getBasket.json',
        cart: [],
        imgCart: 'https://placehold.it/50x50',
        isVisibleCart: false,
        searchLine: '',
        filtered: [],
        isInvisible: '',
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error));
        },
        addProduct(product){
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result){
                        let find = this.cart.find(el => el.id_product === product.id_product);
                        if(find) {
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cart.push(prod);
                        }
                    } else {
                        console.log('error');
                    }
                })
        },
        removeProduct(product){
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result){
                        if(product.quantity > 1) {
                            product.quantity--;
                        } else {
                            this.cart.splice(this.cart.indexOf(product), 1);
                        }
                    } else {
                        console.log('error');
                    }
                })
        },
        calcSum(){
            let result = 0;
            for (let el of this.cart){
                result += el.price*el.quantity;
            }
            return result
        },
        filter(){
            const regexp = new RegExp(this.searchLine, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
            this.products.forEach(el => {
                if (!this.filtered.includes(el)) {
                    isInvisible()
                }
            });

        },
        // isInvisible(){
        //     return 'invisible'
        // }
    },
    mounted(){
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cart.push(el);
                }
            });
    }
});






