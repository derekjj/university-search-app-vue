<template>
  <div class="search-page">
    <h1 class="my-4">University Search</h1>
    <div class="row mb-3">
      <div class="col-md-4">
        <select
          class="form-select"
          v-model="country"
          @change="fetchUniversities"
        >
          <option value="">All</option>
          <template v-for="country in uniqueCountries" :key="country.name">
            <option :value="country.name">{{ country.name }}</option>
          </template>
        </select>
      </div>
      <div class="col-md-4">
        <input
          class="form-control"
          v-model="searchTerm"
          type="text"
          placeholder="Search by name"
        />
      </div>
      <div class="col-md-4">
        <button class="btn btn-primary" @click="clearFilters">
          Clear All Filters
        </button>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-6">
        <p>Response Code: {{ performance.responseCode }}</p>
      </div>
      <div class="col-md-6">
        <p>Response Time: {{ performance.responseTime }}ms</p>
      </div>
    </div>
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
          <tr v-for="uni in filteredUniversities" :key="uni.name">
            <td>{{ uni.name }}</td>
            <td>{{ uni["state-province"] || "N/A" }}</td>
            <td>
              <a :href="uni.web_pages[0]" target="_blank">{{
                uni.web_pages[0]
              }}</a>
            </td>
            <td>
              <button
                v-if="isFavorite(uni)"
                @click="removeFromFavorites(uni)"
                class="btn btn-danger btn-sm"
              >
                Remove from Favorites
              </button>
              <button
                v-else
                @click="addToFavorites(uni)"
                class="btn btn-success btn-sm"
              >
                Add to Favorites
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import axios from "axios";
import { useStore } from "vuex";

interface University {
  name: string;
  "state-province": string;
  web_pages: string[];
}
interface Country {
  name: string;
}

interface Performance {
  responseCode: number | null;
  responseTime: number | null;
}

export default defineComponent({
  name: "SearchPage",
  setup() {
    const store = useStore();
    const country = ref("Canada");
    const searchTerm = ref("");
    const universities = ref<University[]>([]);
    const performance = ref<Performance>({
      responseCode: null,
      responseTime: null,
    });
    const uniqueCountries = ref<Country[]>([]);

    const fetchUniversities = async () => {
      const startTime = Date.now();
      try {
        const response = await axios.get(
          `http://universities.hipolabs.com/search?country=${country.value}`
        );
        universities.value = response.data;
        performance.value = {
          responseCode: response.status,
          responseTime: Date.now() - startTime,
        };
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };

    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `http://universities.hipolabs.com/search`
        );

        // Create a set of unique country names
        const uniqueCountryNames = new Set<string>(
          response.data.map((item: any) => item.country)
        );

        // Map the unique country names to the Country interface
        uniqueCountries.value = Array.from(uniqueCountryNames)
          .map((name: string) => ({
            name,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    const filteredUniversities = computed(() =>
      universities.value.filter((uni) =>
        uni.name.toLowerCase().includes(searchTerm.value.toLowerCase())
      )
    );

    const clearFilters = () => {
      country.value = "Canada";
      searchTerm.value = "";
      fetchUniversities();
    };

    const isFavorite = (uni: University) =>
      store.state.favorites.some((fav: University) => fav.name === uni.name);

    const addToFavorites = (uni: University) => {
      store.commit("addFavorite", uni);
    };

    const removeFromFavorites = (uni: University) => {
      store.commit("removeFavorite", uni);
    };

    onMounted(() => {
      fetchUniversities();
      fetchCountries();
    });

    return {
      country,
      searchTerm,
      performance,
      filteredUniversities,
      clearFilters,
      isFavorite,
      addToFavorites,
      removeFromFavorites,
      fetchUniversities,
      uniqueCountries, // Ensure this is returned
    };
  },
});
</script>
