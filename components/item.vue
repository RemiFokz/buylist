<template>
  <div class="item">
    <nuxt-link :to="`/item/${item.id}`">
      <h2>{{ item.name }}</h2>
    </nuxt-link>
    {{ item.id }}
    <h3>{{ item.price }}</h3>
    <p>{{ new Date(item.date).toLocaleString('ru') }}</p>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>
<style scoped>
.item {
  padding: 1rem;
  border: 1px solid black;
}
</style>