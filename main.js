var eventBus = new Vue();

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
    
    <div class="product-info mt-5">
      <h1 class="font-weight-bold mb-0">{{title}}</h1>
      <!-- if else in Vue -->
      <p v-if="inStock">In Stock</p>
      <!-- with ":class", it means you're going to use the class in left side if in the right side is "true". -->
      <!-- in class naming, you must not name it like "linethrough-txt". It won't work. -->
      <p v-else="inStock" :class="{ linethroughTxt: !inStock }">
        Out of Stock
      </p>
      <p class="my-0"> Shipping : {{shipping}}</p>
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
      <div class="mt-5">
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
        "Gendera Neutral (Both Men & Women)",
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

Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  template: `
  <div class="mb-4 text-center">
  <h3 class="font-weight-bold text-center mb-3">
- - - Product Review Place  - - -
</h3>
  <span class="tabs"
  :class = "{activeTab: selectedTab === tab}"
        v-for="tab in tabs"
        @click="selectedTab=tab">{{tab}}</span>
                <div class="border-top mt-1"></div>

        <div class="row d-flex justify-content-center mb-5">
          <div class="col-5">
            <product-review
              v-show="selectedTab === 'Make a Review'"
              class="mt-4"
            ></product-review>
          </div>
          <div v-show="selectedTab === 'Reviews'" class="col-8 mt-3">
            <h4>Reviews :</h4>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Reviewer's Name</th>
                  <th scope="col">Reviewer's Review</th>
                  <th scope="col">Reviewer's Rating</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="review in reviews">
                  <td>{{review.reviewerName}}</td>
                  <td>{{review.reviewerReview}}</td>
                  <td>{{review.reviewerRating}}</td>
                </tr>
              </tbody>
            </table>
            <p v-if="reviews.length === 0" class="text-center">
              There are no reviews yet.
            </p>
          </div>
        </div>
  </div>
  `,
  data() {
    return {
      tabs: ["Reviews", "Make a Review"],
      selectedTab: "Reviews",
    };
  },
});

Vue.component("product-review", {
  // submit.prevent = prevent.default() in "ReactJS"
  template: `
  <form @submit.prevent="OnSubmit">
  <label>Name : </label>
  <input class="py-3 px-2" v-model="reviewerName" required>
  <label>Review : </label>
  <textarea v-model="reviewerReview" required> </textarea>
  
  <div class="form-group">
  <label>Rating : </label>
  <select v-model.number="reviewerRating" class="form-control" id="exampleFormControlSelect1" required>
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
  </select>
  </div>

  <button type="submit" class="btn btn-primary w-100">Submit</button>
  </form>
  `,
  data() {
    return {
      reviewerName: "",
      reviewerReview: "",
      reviewerRating: null,
    };
  },
  methods: {
    OnSubmit() {
      let productReview = {
        reviewerName: this.reviewerName,
        reviewerReview: this.reviewerReview,
        reviewerRating: this.reviewerRating,
      };
      eventBus.$emit("review-submitted", productReview);
      (this.reviewerName = ""),
        (this.reviewerReview = ""),
        (this.reviewerRating = null);
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
    reviews: [],
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
  mounted() {
    eventBus.$on("review-submitted", (dataReview) => {
      this.reviews.push(dataReview);
    });
  },
});
