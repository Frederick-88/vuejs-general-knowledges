var app = new Vue({
  // select the id that could use this app
  el: "#app",
  // there are instances based on where you put functions, expressions, etc.
  // for example, object and expressions would be put in "data" instance. While functions would be put in "methods" instance
  data: {
    brand: "FD",
    product: "Socks",
    selectedVariant: 0,
    details: [
      "80% Cotton",
      "20% Polyster",
      "Gender Neutral (Both Men & Women)",
    ],
    variants: [
      {
        variantId: 2234,
        variantColor: "Green",
        variantImage:
          "https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg",
        variantQuantity: 20,
      },
      {
        variantId: 2235,
        variantColor: "Blue",
        variantImage:
          "https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg",
        variantQuantity: 0,
      },
    ],
    cart: 0,
  },
  // "Methods" instance contains functions.
  methods: {
    addToCart() {
      this.cart += 1;
    },
    updateProduct(index) {
      this.selectedVariant = index;
    },
  },
  // "Computed" is meant so that your objects are not always true and false, you can filter, return, etc here.
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    // 0 = false. So if the quantity of variant = 0, it automatically filters it.
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
  },
});
