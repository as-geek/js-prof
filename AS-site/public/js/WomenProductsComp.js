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
                    if (el.category === "Women" && el.fetured === 0) {
                        this.products.push(el);
                    }
                }
            });
    },
    template: ` <div class="single__may-like-flex">
                    <product
                    v-for="el of products.slice(0, 4)"
                    :key="el.id_product"
                    :product="el"
                    :img="imgCatalog"
                    ></product>
                </div>`
});

Vue.component('product', {
    props: ['product', 'img'],
    template: ` <div class="single__may-like-block">
                    <a :href="product.product_link">
                        <img class="single__may-like-img" :src="product.product_img || img" :alt="product.product_name">
                        <div class="single__may-like-text">
                            <p class="single__may-like-name">{{ product.product_name }}</p>
                            <p class="single__may-like-price">$ {{ product.product_price }}.00</p>
                            <p class="single__may-like-rating"><i class="fas fa-star"></i><i class="fas fa-star"></i>
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </p>
                        </div>
                    </a>
                    <button class="product__add" @click="$root.$refs.cart.addProduct(product)">Add to Cart</button>
                </div>`
});