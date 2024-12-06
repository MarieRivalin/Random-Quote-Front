<script setup>
import { defineProps, ref, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({
  favorites: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const localFavorites = ref([])
</script>

<template>
  <div>
    <h2>Your Favorite Quotes</h2>
    <ul v-if="localFavorites.length">
      <li v-for="fav in localFavorites" :key="fav.quote">
        <p>"{{ fav.quote }}"</p>
        <p>- {{ fav.author }}</p>
        <p>
          <i>{{ fav.book }}</i>
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
