<template>
  <div class="favorites-page">
    <h1>Favorites</h1>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>State/Province</th>
            <th>Website</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="uni in favorites" :key="uni.name">
            <td>{{ uni.name }}</td>
            <td>{{ uni["state-province"] || "N/A" }}</td>
            <td>
              <a :href="uni.web_pages[0]" target="_blank">{{
                uni.web_pages[0]
              }}</a>
            </td>
            <td>
              <button @click="removeFromFavorites(uni)">
                Remove from Favorites
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

interface University {
  name: string;
  state_province: string;
  web_pages: string[];
}

export default defineComponent({
  name: "FavoritesPage",
  setup() {
    const store = useStore();

    const favorites = computed(() => store.state.favorites);

    const removeFromFavorites = (uni: University) => {
      store.commit("removeFavorite", uni);
    };

    return {
      favorites,
      removeFromFavorites,
    };
  },
});
</script>
