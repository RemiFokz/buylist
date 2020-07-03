<template>
  <div>
    <p>name <input type="text" v-model="name" /></p>
    <p>price<input type="number" v-model="price" /></p>

    <button
      :disabled="!name.length || !price"
      @click="
        () => {
          addToList({ name, price }), clear();
        }
      "
    >
      add
    </button>
    <button @click="clear()">clear</button>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  data: () => ({
    name: '',
    price: ''
  }),
  methods: {
    ...mapActions({
      addToList: 'ADD_TO_LIST'
    }),
    clear() {
      (this.name = ''), (this.price = '');
    }
  }
};
</script>