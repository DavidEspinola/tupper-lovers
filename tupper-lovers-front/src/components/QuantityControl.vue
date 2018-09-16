<template>
  <div class="quantity-control">
    <a href="" @click.prevent="decrement()">-</a>
    <input type="number" v-model="value" @input="$emit('input', $event.target.value)">
    <a href="" @click.prevent="increment()">+</a>
  </div>
</template>

<script>

export default {
  props: {
    value: Number
  },
  methods: {
    increment() {
      let value = parseInt(this.value);
      if(isNaN(value)) {
        value = 0;
      } else {
        value ++;
      }
      this.$emit('input', value);
    },
    decrement() {
      let value = parseInt(this.value);
      if(isNaN(value) || value === 0) {
        value = 0;
      } else {
        value --;
      }
      this.$emit('input', value);
    }

  }
};
</script>

<style lang="scss" scoped>
@import 'src/styles/common';

.quantity-control {
  text-align: center;
  input {
    @extend %input-base;
    width: 100px;
    font-size: 16px;
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
  }
  a {
    padding: 5px;
    background-color: $mainColor;
    border-radius: 50%;
    color: white;
    text-decoration: none;
    width: 30px;
    height: 30px;
    display: inline-block;
    text-align: center;
    font-size: 30px;
    vertical-align: middle;
  }
}
</style>
