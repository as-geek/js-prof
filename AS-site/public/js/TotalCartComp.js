Vue.component('total-cart', {

    template: `
<div class="shopping-cart-bottom__total">
    <div class="shopping-cart-bottom__text">
        <div class="shopping-cart-bottom__sub">
            <p class="shopping-cart-bottom__p">Sub total</p>
            <p class="shopping-cart-bottom__p">{{ $root.$refs.cart.data.return(total) }}</p>
        </div>
        <div class="shopping-cart-bottom__grand">
            <h3 class="shopping-cart-bottom__h3">GRAND TOTAL</h3>
            <h3 class="shopping-cart-bottom__h3 shopping-cart-bottom__h3_pink">$900</h3>
        </div>
        <a href="#" class="shopping-cart-bottom__button-total">proceed to checkout</a>
    </div>
</div>
`
});