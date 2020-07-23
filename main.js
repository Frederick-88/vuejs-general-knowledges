Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: `
    <div class="product">
    <div class="product-image">
      <!-- bind is a dynamic attribute to connect with the js. So when it change it would change here also -->
      <!-- In other words, if you want this attribute name to work dynamically according to value in the main.js, use bind. -->
      <img v-bind:src="image" alt="..." />

      <!---- a modern way to do v-bind ---->
      <!-- <img :src="image" alt="..." /> -->
    </div>
    <div class="product-info">
      <h1>{{title}}</h1>
      <!-- if else in Vue -->
      <p v-if="inStock">In Stock</p>
      <!-- with ":class", it means you're going to use the class in left side if in the right side is "true". -->
      <!-- in class naming, you must not name it like "linethrough-txt". It won't work. -->
      <p v-else="inStock" :class="{ linethroughTxt: !inStock }">
        Out of Stock
      </p>
      <p> Shipping: {{shipping}}</p>
      <ul>
        <!-- v-for = "map" in Javascript. Built to handle array data. -->
        <li v-for="detail in details">{{detail}}</li>
      </ul>
      <!-- style & binded style is different. -->
      <div
        v-for="(variant,index) in variants"
        :key="variant.variantId"
        class="color-box"
        style="cursor: pointer;"
        :style="{backgroundColor: variant.variantColor}"
        @mouseover="updateProduct(index)"
      ></div>
      <!-- v-on:click = "onClick" in Javascript -->
      <div>
        <button
          v-on:click="addToCart"
          :disabled="!inStock"
          :class="{disabledButton:!inStock}"
        >
          Add to Cart
        </button>

        <button
        v-on:click="decreaseCart"
        :disabled="!inStock"
        :class="{disabledButton:!inStock}"
      >
        Decrease the Cart
      </button>
       
      </div>
    </div>
  </div>
    `,
  // there are instances based on where you put functions, expressions, etc.
  // for example, object and expressions would be put in "data" instance. While functions would be put in "methods" instance
  data() {
    return {
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
    };
  },
  // "Methods" instance contains functions.
  methods: {
    addToCart() {
      this.$emit("add-to-cart");
    },
    decreaseCart() {
      this.$emit("decrease-the-cart");
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
    shipping() {
      if (this.premium) {
        return "Free";
      } else {
        return 2.99;
      }
    },
  },
});

// for global scope
var app = new Vue({
  // select the id that could use this app
  el: "#app",
  data: {
    premium: false,
    cart: 0,
  },
  methods: {
    updateCart() {
      this.cart += 1;
    },
    decreaseCart() {
      if (this.cart != 0) {
        this.cart -= 1;
      } else {
        return false;
      }
    },
  },
});
