Vue.component('products', {
    data() {
        return {
            products: [],
            imgCatalog: 'https://placehold.it/150x150',
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let el of data) {
                    if (el.fetured) {
                        this.products.push(el);
                    }
                }
            });
    },
    template: ` <div class="products__box">
                    <product
                    v-for="el of products"
                    :key="el.id_product"
                    :product="el"
                    :img="imgCatalog"
                    ></product>
                </div>`
});

Vue.component('product', {
    props: ['product', 'img'],
    template: ` <div class="product">
                    <a :href="product.product_link">
                        <img class="product__img" :src="product.product_img || img" :alt="product.product_name">
                        <div class="product__text">
                            <p class="product__name">{{ product.product_name }}</p>
                            <p class="product__price">$ {{ product.product_price }}.00</p>
                        </div>
                    </a>
                    <button class="product__add" @click="$root.$refs.cart.addProduct(product)">Add to Cart</button>
                </div>`
});