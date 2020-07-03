import { items } from "@/mocks/mocks.js";
const req = p =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(p);
    }, 2000);
  });

export const state = () => ({
  items: []
});
export const mutations = {
  ADD_NEW_ITEM(state, item) {
    state.items.push(item);
  },
  FIND_ITEM_AND_REPLACE(state, item) {
    const ind = state.items.findIndex(el => el.id === item.id);
    console.log(state.items[ind], ind, item);
    state.items[ind] = item;
    console.log(state.items[ind]);
  },
  SET_ITEMS_TO_STORE(state, items) {
    state.items = items;
  },
  DELETE_ITEM_FROM_STORE(state, id) {
    state.items = state.items.filter(el => el.id !== id);
  }
};

export const actions = {
  async GET_ITEMS({ commit }) {
    try {
      const response = await req(items);
      commit("SET_ITEMS_TO_STORE", response);
    } catch (error) {
      throw error;
    }
  },
  async ADD_TO_LIST({ commit }, item) {
    try {
      const response = await req({
        ...item,
        date: new Date().getTime(),
        id: Math.floor(Math.random() * 10000)
      });

      commit("ADD_NEW_ITEM", response);
    } catch (error) {
      throw error;
    }
  },
  async EDIT_ITEM({ commit }, item) {
    try {
      const response = await req({
        ...item,
        date: new Date().getTime()
      });
      commit("FIND_ITEM_AND_REPLACE", response);
    } catch (error) {
      throw error;
    }
  },
  async DELETE_ITEM({ commit }, id) {
    try {
      const response = await req();
      commit("DELETE_ITEM_FROM_STORE", id);
    } catch (error) {}
  }
};
