<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  favorites: {
    type: Array,
    required: true,
    default: () => [],
  },
})
</script>

<template>
  <div class="fav-modal">
    <h2>Your Favorite Quotes:</h2>
    <ul v-if="props.favorites.length">
      <li v-for="fav in props.favorites" :key="fav.quote">
        <p>"{{ fav.quote.en.citation }}"</p>
        <p>- {{ fav.quote.en.auteur }}</p>
        <p>
          <i>{{ fav.quote.en.ouvrage }}</i>
        </p>
        <hr />
      </li>
    </ul>
    <p v-else>No favorites yet. Add some quotes!</p>
  </div>
</template>
<style scoped>
h2 {
  font-family: 'Great Vibes', cursive;
  font-size: 20px;
  margin-bottom: 20px;
}
p {
  font-family: 'Great Vibes', cursive;
  font-size: 15px;
  margin-bottom: 10px;
}

.fav-modal {
  height: 100%;
}

ul {
  height: 90%;
  overflow-y: scroll;
}
</style>
