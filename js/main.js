document.addEventListener('DOMContentLoaded', function () {
    var app = new Vue({
        el: "main",
        data: {
            products: [
                { id: 1, title: "Яблуко Голден", short_text: "Солодке та хрустке", image: "apple1.jpg", desc: "Сорт Голден відрізняється яскраво-жовтим кольором, солодкою і соковитою м'якоттю. Ідеально підходить для десертів та свіжого споживання." },
                { id: 2, title: "Яблуко Гренні Сміт", short_text: "Зелене та кислувате", image: "apple2.jpg", desc: "Популярний сорт з насиченим зеленим кольором і приємною кислинкою. Чудово зберігає форму при випіканні." },
                { id: 3, title: "Яблуко Фуджі", short_text: "Дуже солодке", image: "apple3.jpg", desc: "Яблука Фуджі мають медовий смак та щільну текстуру. Вони довго зберігаються і чудово втамовують спрагу." },
                { id: 4, title: "Яблуко Гала", short_text: "Ароматне з рум'янцем", image: "apple4.jpg", desc: "Сорт Гала має тонкий карамельний аромат, хрустку м'якоть та красивий червоно-жовтий колір." },
                { id: 5, title: "Яблуко Чемпіон", short_text: "Велике та соковите", image: "apple5.jpg", desc: "Великі яблука з ніжним кисло-солодким смаком. М'якоть кремова і дуже соковита." }
            ],
            product: {},
            btnVisible: 0,
            cart: [],
            contactFields: {},
            orderSubmitted: false
        },
        mounted: function() {
            this.getProduct();
            this.checkInCart();
            this.getCart();
        },
        methods: {
            getProduct: function() {
                if(window.location.hash) {
                    var id = window.location.hash.replace('#', '');
                    if(this.products && this.products.length > 0) {
                        for(var i in this.products) {
                            if(this.products[i] && this.products[i].id && id == this.products[i].id) {
                                this.product = this.products[i];
                            }
                        }
                    }
                }
            },
            addToCart: function(id) {
                var cartStorage = [];
                if(window.localStorage.getItem('cart')) {
                    cartStorage = window.localStorage.getItem('cart').split(',');
                }
                if(cartStorage.indexOf(String(id)) == -1) {
                    cartStorage.push(id);
                    window.localStorage.setItem('cart', cartStorage.join(','));
                    this.btnVisible = 1;
                }
            },
            checkInCart: function() {
                if(this.product && this.product.id && window.localStorage.getItem('cart')) {
                    if(window.localStorage.getItem('cart').split(',').indexOf(String(this.product.id)) != -1) {
                        this.btnVisible = 1;
                    }
                }
            },
            getCart: function() {
                this.cart = [];
                if(window.localStorage.getItem('cart')) {
                    var cartStorage = window.localStorage.getItem('cart').split(',');
                    for(var i in this.products) {
                        if(cartStorage.indexOf(String(this.products[i].id)) !== -1) {
                            this.cart.push(this.products[i]);
                        }
                    }
                }
            },
            removeFromCart: function(id) {
                this.cart = this.cart.filter(function(item) {
                    return item.id !== id;
                });
                
                var cartStorage = [];
                if(window.localStorage.getItem('cart')) {
                    cartStorage = window.localStorage.getItem('cart').split(',');
                }
                var index = cartStorage.indexOf(String(id));
                if (index !== -1) {
                    cartStorage.splice(index, 1);
                }
                
                if (cartStorage.length > 0) {
                    window.localStorage.setItem('cart', cartStorage.join(','));
                } else {
                    window.localStorage.removeItem('cart');
                }
            },
            makeOrder: function() {
                this.orderSubmitted = true;
                this.cart = [];
                window.localStorage.removeItem('cart');
            }
        }
    });
});
