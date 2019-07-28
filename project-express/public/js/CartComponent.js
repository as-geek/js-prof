Vue.component('cart', {
    data(){
        return {
            cart: [],
            imgCart: 'https://placehold.it/50x50',
            isVisibleCart: false,
        }
    },
    methods: {
        addProduct(product){
            let find = this.cart.find(el => el.id_product === product.id_product);
            if(find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result) {
                            find.quantity++;
                        }
                    })
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result) {
                            this.cart.push(prod);
                        }
                    })
            }
        },
        removeProduct(product){
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
        },
        calcSum(){
            let result = 0;
            for (let el of this.cart){
                result += el.price*el.quantity;
            }
            return result
        },
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.cart.push(el);
                }
            });
    },
    template: `<div>
                    <button class="btn-cart" type="button" @click="isVisibleCart = !isVisibleCart">Корзина</button>
                    <div class="cart-block" v-show="isVisibleCart">
                        <cart-item
                        v-for="item of cart"
                        :key="item.id_product"
                        :cart-item="item"
                        :img="imgCart"
                        @removeProduct="removeProduct"></cart-item>    
                        <h3 class="total" v-if="cart.length">Сумма: {{ calcSum() }}</h3>
                        <h3 v-if="!cart.length">Корзина пуста</h3>
                    </div>
                </div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `<div class="cart-item">
                   <img :src="img" :alt="cartItem.product_name">
                       <div class="cart-text">
                           <h3>{{ cartItem.product_name }}</h3>
                           <p>{{ cartItem.price*cartItem.quantity }} руб.</p>
                           <p>Количество {{ cartItem.quantity }}</p>
                       </div>
                   <button class="del-btn" @click="$emit('removeProduct', cartItem)">&times;</button>
               </div>`
});