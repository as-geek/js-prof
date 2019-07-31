Vue.component('cart', {
    data() {
        return {
            cart: [],
            imgCart: 'https://placehold.it/50x50',
            total: 0
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cart.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if (data.result) {
                            find.quantity++;
                            this.total += find.product_price;
                        }
                    })
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        this.cart.push(prod);
                        this.total += prod.product_price;
                    })
            }
        },
        removeProduct(product) {
            this.total -= product.product_price;
            if(product.quantity > 1){
                this.$parent.putJson(`/api/cart/${product.id_product}`, {quantity: -1})
                    .then(data => {
                        if(data.result) {
                            product.quantity--;
                        }
                    })
            } else {
                this.$parent.deleteJson(`/api/cart/${product.id_product}`)
                    .then(data => {
                        if (data.result) {
                            this.cart.splice(this.cart.indexOf(product), 1)
                        }
                    })
            }
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.cart.push(el);
                    this.total += el.product_price*el.quantity;
                }
            });
    },
    template: ` <div>
                    <div class="cart__number">{{ cart.length }}</div>
                    <div class="cart-drop">
                        <cart-item
                        v-for="el of cart"
                        :key="el.id_product"
                        :cart-item="el"
                        :img="imgCart"
                        @removeProduct="removeProduct"></cart-item>
                        <div class="total">
                            <p class="total__p">TOTAL</p>
                            <p class="total__p">$ {{ total }}</p>
                        </div>
                        <a href="checkout.html" class="cart-drop__checkout">Checkout</a>
                        <a href="shopping-cart.html" class="cart-drop__go">Go to cart</a>
                    </div>
                </div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: ` <div class="cart-drop__product">
                    <a :href="cartItem.product_link">
                        <img :src="cartItem.product_img || img" :alt="cartItem.product_name" class="cart-drop__img">
                    </a>
                    <div class="cart-drop__text">
                        <a :href="cartItem.product_link">
                            <div class="cart-drop__name">{{ cartItem.product_name }}</div>
                        </a>
                        <div class="cart-drop__rating"><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
                        </div>
                        <div class="cart-drop__sum">{{ cartItem.quantity }} <span class="cart-drop__sum-x">&nbsp;x&nbsp;</span>
                        $ {{ cartItem.product_price }}.00</div>
                    </div>
                    <button class="cart-drop__delete" @click="$emit('removeProduct', cartItem)"><i class="fas fa-times-circle"></i></button>
                </div>`
});