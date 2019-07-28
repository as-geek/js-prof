Vue.component('search', {
    data(){
        return {
            searchLine: '',
        }
    },
    template: `<form action="#" method="post" class="search-form" @submit.prevent="$root.$refs.products.filter(searchLine)">
                   <input type="text" class="search-field" v-model="searchLine">
                   <button class="btn-search" type="submit">
                        <i class="fas fa-search"></i>
                   </button>
               </form>`
});