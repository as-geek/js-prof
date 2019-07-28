Vue.component('error', {
    data(){
        return {
            errorText: '',
        }
    },
    methods: {
        setError(text) {
            this.errorText = text;
        }
    },
    template:  `<div class="error-block" v-if="errorText">
                    <p class="error-msg">
                        {{errorText}}
                        <button class="close-btn" @click="setError('')">&times;</button>
                    </p>
                </div>`
});