<template>
  <div v-if="loading">loading ...</div>
  <div v-else>
    <div v-if="!edit" class="noedit">
      <h2>{{ item.name }}</h2>
      <h3>{{ item.price }}</h3>
    </div>

    <div v-else class="edit">
      <p>name<input type="text" v-model="newName" /></p>
      <p>price<input type="number" v-model="newPrice" /></p>
    </div>
    <p>{{ new Date(item.date).toLocaleString('ru') }}</p>
    <button @click="del(item.id)">Delete</button>
    <button v-if="!edit" @click="edit = true">Edit</button>
    <div v-else>
      <button @click="save()">
        Save
      </button>
      <button
        @click="
          () => {
            (edit = false), setDefault();
          }
        "
      >
        Cancel
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    edit: false,
    newName: null,
    newPrice: null,
    loading: false
  }),
  mounted() {
    this.setDefault();
  },
  methods: {
    ...mapActions({
      editItem: 'EDIT_ITEM',
      deleteItem: 'DELETE_ITEM'
    }),
    setDefault() {
      this.newName = this.item.name;
      this.newPrice = this.item.price;
    },
    del(id) {
      this.loading = true;
      this.deleteItem(id).then(
        () => (this.$router.push('/'), (this.loading = false))
      );
    },
    save() {
      this.loading = true;
      const newObj = {
        ...this.item,
        ...{
          name: this.newName !== this.item.name ? this.newName : this.item.name,
          price:
            this.newPrice !== this.item.price ? this.newPrice : this.item.price
        }
      };

      this.editItem(newObj).finally(() => {
        this.edit = false;
        this.loading = false;
        this.$emit('upd');
      });
    }
  }
};
</script>