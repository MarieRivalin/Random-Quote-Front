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
  <div>
    <h2>Your Favorite Quotes:</h2>
    <ul v-if="props.favorites.length">
      <li v-for="fav in props.favorites" :key="fav.quote">
        <p>"{{ fav.quote.en.citation }}"</p>
        <p>- {{ fav.quote.en.auteur }}</p>
        <p>
          <i>{{ fav.quote.en.ouvrage }}</i>
        </p>
        <img
          v-if="fav.photo"
          :src="fav.photo"
          alt="Philosopher's photo"
          style="max-width: 100px"
        />
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
</style>
