<template>
  <div class="container">
    <div class="page">
      <Addtolist />
      <Filters @change="setFilter" />
      <div class="items">
        <Item :item="item" v-for="item in ItemsPerPage" :key="item.id" />
      </div>
      <button :disabled="page < 1" @click="page--">
        <=
      </button>
      {{ page + 1 }}
      <button
        :disabled="items.length - perPage <= perPage * page"
        @click="page++"
      >
        =>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data: () => ({
    perPage: 2,
    page: 0,
    filter: ''
  }),
  computed: {
    ...mapState({
      items: state => state.items
    }),
    ItemsPerPage() {
      const filtering = (items, filter) => {
        const sortItems = [...items];
        switch (filter) {
          case 'price':
            return sortItems.sort(
              (a, b) => parseFloat(a.price) - parseFloat(b.price)
            );
          case 'date':
            return sortItems.sort(
              (a, b) => new Date(a.date) - new Date(b.date)
            );

          default:
            return sortItems;
        }
      };
      return filtering(this.items, this.filter).slice(
        this.page * this.perPage,
        this.perPage * (this.page + 1)
      );
    }
  },
  methods: {
    setFilter(v) {
      this.filter = v;
    }
  }
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 1024px;
}
.items {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr;
}
</style>
