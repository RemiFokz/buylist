<template>
  <div>
    <ItemPage @upd="upd()" v-if="item" :item="item" />
    <h1 v-else>no this item bro</h1>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import ItemPage from '@/components/item-page';
export default {
  data: () => ({
    loading: true,
    item: null
  }),
  components: {
    ItemPage
  },
  computed: {
    ...mapState({
      items: state => state.items
    })
  },
  mounted() {
    this.item = this.myitem();
  },
  methods: {
    upd() {
      this.item = this.myitem();
    },
    myitem() {
      const ind = this.items.findIndex(
        el => el.id === parseInt(this.$route.params.id)
      );
      this.loading = false;
      if (ind === -1) {
        return null;
      } else {
        return this.items[ind];
      }
    }
  }
};
</script>