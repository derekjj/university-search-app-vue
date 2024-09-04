import { createStore } from "vuex";

interface University {
  name: string;
  "state-province": string;
  web_pages: string[];
}

interface State {
  favorites: University[];
}

export default createStore({
  state: {
    favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  } as State,
  mutations: {
    addFavorite(state, university: University) {
      if (!state.favorites.some((fav) => fav.name === university.name)) {
        state.favorites.push(university);
      }
    },
    removeFavorite(state, university: University) {
      state.favorites = state.favorites.filter(
        (fav) => fav.name !== university.name
      );
    },
  },
  actions: {},
  modules: {},
  plugins: [
    (store) => {
      store.subscribe((mutation, state) => {
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      });
    },
  ],
});
