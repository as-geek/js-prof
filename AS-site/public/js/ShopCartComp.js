Vue.component('shop-cart', {
    data() {
        return {
            cart: [],
            imgCart: 'https://placehold.it/50x50'
        }
    },
    methods: {
        clearCart() {
            this.$parent.deleteJson(`/api/cart`)
                .then(data => {
                    if (data.result) {
                        this.cart = null;
                    }
                })
        },
        removeProduct(product) {
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
                }
            });
    },
    template: ` <div>
                    <div class="product-details">
                        <div class="container product-details-flex">
                            <div class="product-details__head">
                                <div class="product-details__head__left">
                                    <h3 class="product-details__head__h3">Product Details</h3>
                                </div>
                                <div class="product-details__head__right">
                                    <h3 class="product-details__head__h3">unite Price</h3>
                                    <h3 class="product-details__head__h3">Quantity</h3>
                                    <h3 class="product-details__head__h3">shipping</h3>
                                    <h3 class="product-details__head__h3">Subtotal</h3>
                                    <h3 class="product-details__head__h3">ACTION</h3>
                                </div>
                            </div>
                        <shop-cart-item
                        v-for="el of cart"
                        :key="el.id_product"
                        :shop-cart-item="el"
                        :img="imgCart"
                        @removeProduct="removeProduct"></shop-cart-item>
                        </div>
                    </div>
                    <div class="shopping-cart-button">
                        <div class="container shopping-cart-button-flex">
                            <button class="shopping-cart-button__block" @click="clearCart">cLEAR SHOPPING CART</button>
                            <a href="product.html" class="shopping-cart-button__block">cONTINUE sHOPPING</a>
                        </div>
                    </div>
                </div>`
});

Vue.component('shop-cart-item', {
    props: ['shopCartItem', 'img'],
    template: ` <div class="product-details__block">
                    <div class="product-details__block__left">
                        <a :href="shopCartItem.product_link">
                            <img :src="shopCartItem.product_img || img" :alt="shopCartItem.product_name" class="product-details__img">
                        </a>
                        <div class="product-details__text">
                            <a :href="shopCartItem.product_link">
                                <h3 class="product-details__text__h3">{{ shopCartItem.product_name }}</h3>
                            </a>
                            <p class="product-details__text__p"><span class="product-details__text-bold">Color:</span> Red</p>
                            <p class="product-details__text__p"><span class="product-details__text-bold">Size:</span> Xll</p>
                        </div>
                    </div>
                    <div class="product-details__block__right">
                        <p class="product-details__unite__p">$ {{ shopCartItem.product_price }}.00</p>
                        <input type="number" class="product-details__quantity__p" min="1" v-model="shopCartItem.quantity">
                        <p class="product-details__shipping__p">FREE</p>
                        <p class="product-details__subtotal__p">$ {{ shopCartItem.quantity*shopCartItem.product_price }}.00</p>
                        <button class="product-details__action__p" @click="$emit('removeProduct', shopCartItem)"><i class="fas fa-times-circle"></i></button>
                    </div>
                </div>`
});

