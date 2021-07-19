<template>
  <div class="page-checkout">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Checkout</h1>
      </div>
      <div class="column is-12 box">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.items" :key="item.key">
              <td>{{ item.product.name }}</td>
              <td>{{ item.product.price }}€</td>
              <td>{{ item.quantity }}</td>
              <td>{{ getItemTotal(item).toFixed(2) }}€</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2">Total</td>
              <td>{{ cartTotalLength }}</td>
              <td>{{ cartTotalPrice.toFixed(2) }}€</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="column is-12">
        <h2 class="subtitle">Shipping details</h2>
        <p class="has-text-grey mb-4">* All fields are required</p>
        <div class="columns is-multiline">
          <div class="column is-6">
            <div class="field">
              <label for="first_name">First name *</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="first_name"
                  v-model="first_name"
                />
              </div>
            </div>
            <div class="field">
              <label for="last_name">Last name *</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="last_name"
                  v-model="last_name"
                />
              </div>
            </div>
            <div class="field">
              <label for="email">E-mail *</label>
              <div class="control">
                <input
                  type="email"
                  class="input"
                  name="email"
                  v-model="email"
                />
              </div>
            </div>
            <div class="field">
              <label for="phone">Phone *</label>
              <div class="control">
                <input type="tel" class="input" name="phone" v-model="phone" />
              </div>
            </div>
          </div>
          <div class="column is-6">
            <div class="field">
              <label for="address">Address *</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="address"
                  v-model="address"
                />
              </div>
            </div>
            <div class="field">
              <label for="Zip code">Zip code *</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="Zip code"
                  v-model="zipcode"
                />
              </div>
            </div>
            <div class="field">
              <label for="place">Place *</label>
              <div class="control">
                <input type="text" class="input" name="place" v-model="place" />
              </div>
            </div>
          </div>
        </div>
        <div class="notification is-danger mt-4" v-if="errors.length">
          <p v-for="error in errors" :key="error.key">{{ error }}</p>
        </div>
        <hr />
        <div class="card-element mb-5"></div>
        <template>
          <hr />
          <button class="button is-dark" @click="submitForm">
            Pay with Stripe
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Checkout",
  data() {
    return {
      cart: {
        items: [],
      },
      stripe: {},
      card: {},
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      zipcode: "",
      place: "",
      errors: [],
    };
  },
  mounted() {
    document.title = "Checkout | Djackets";
    this.cart = this.$store.state.cart;
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    submitForm() {
      this.errors = [];
      if (this.first_name === "") {
        this.errors.push("The first name field is missing!");
      }
      if (this.last_name === "") {
        this.errors.push("The last name field is missing!");
      }
      if (this.email === "") {
        this.errors.push("The email field is missing!");
      }
      if (this.phone === "") {
        this.errors.push("The phone field is missing!");
      }
      if (this.address === "") {
        this.errors.push("The address field is missing!");
      }
      if (this.zipcode === "") {
        this.errors.push("The zip code field is missing!");
      }
      if (this.place === "") {
        this.errors.push("The place field is missing!");
      }
      if (!this.errors.length) {
        this.$store.commit("setIsLoading", true);
        this.stripe.createToken(this.card).then((result) => {
          if (result.error) {
            this.$store.commit("setIsLoading", false);
            this.errors.push(
              "Something went wrong with Stripe. Please try again"
            );
            console.log(result.error.message);
          } else {
            this.stripeTokenHandler(result.token);
          }
        });
      }
    },
  },
  computed: {
    cartTotalLength() {
      return this.cart.items.reduce((total, item) => {
        return (total = total + item.quantity);
      }, 0);
    },
    cartTotalPrice() {
      return this.cart.items.reduce((total, item) => {
        return (total = total + item.product.price * item.quantity);
      }, 0);
    },
  },
};
</script>

<style></style>
