<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import RegisterView from './components/RegisterView.vue'
import LoginView from './components/LoginView.vue'
import ModalView from './components/ModalView.vue'
import FavoritesView from './components/FavoritesView.vue'

const quote = ref('')
const author = ref('')
const book = ref('')
const showAuthor = ref(false)
const showBook = ref(false)
const photo = ref('')

const showLoginModal = ref(false)
const showRegisterModal = ref(false)
const showFavoritesModal = ref(false)

const token = localStorage.getItem('token')
const isLoggedIn = ref(!!token)
const userName = ref('')

const favorites = ref([])

onMounted(async () => {
  if (isLoggedIn.value) {
    try {
      const response = await axios.get('http://localhost:1337/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      userName.value = response.data.username
      await loadFavorites()
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }
})

const handleClick = async () => {
  try {
    const response = await axios.get(
      'http://localhost:1337/api/quotes/random-english',
    )
    quote.value = response.data.citation
    author.value = response.data.auteur
    book.value = response.data.ouvrage
    photo.value = response.data.photo
    //console.log('response.Data >>>>>', response.data)

    showAuthor.value = false
    showBook.value = false
  } catch (error) {
    console.error('Error retrieving quote', error)
  }
}
const toggleAuthor = () => {
  showAuthor.value = !showAuthor.value
}

const toggleBook = () => {
  showBook.value = !showBook.value
}

const quoteId = ref('')
const isFavorite = () => favorites.value.some(fav => fav.id === quoteId.value)

const toggleFavorite = async () => {
  if (!isLoggedIn.value) {
    showLoginModal.value = true
    return
  }

  try {
    if (isFavorite()) {
      const response = await axios.delete(
        `http://localhost:1337/api/quotes/remove-favorite`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { quoteId: quoteId.value },
        },
      )

      favorites.value = response.data.favorites
      alert('Quote removed from favorites!')
    } else {
      const response = await axios.post(
        `http://localhost:1337/api/quotes/add-favorites`,
        { quoteId: quoteId.value },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      favorites.value = response.data.favorites
      alert('Quote added to favorites!')
    }
  } catch (error) {
    console.error('Error managing favorite:', error)
  }
}

const loadFavorites = async () => {
  try {
    const response = await axios.get('http://localhost:1337/api/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    console.log('Response data:', response.data)

    favorites.value = Array.isArray(response.data.favorites)
      ? response.data.favorites.map(fav => ({
          id: fav.id,
          quote: fav.quote.fr.citation,
          author: fav.quote.fr.auteur,
          book: fav.quote.fr.ouvrage,
          photo: fav.photo?.url
            ? `http://localhost:1337${fav.photo.url}`
            : null,
        }))
      : []
  } catch (error) {
    console.error('Error loading favorites:', error)
  }
}
console.log('Favorites:', favorites.value)

const openFavorites = async () => {
  await loadFavorites()
  showFavoritesModal.value = true
}
</script>

<template>
  <div class="body">
    <div class="banner"></div>

    <div class="top">
      <div v-if="isLoggedIn" class="nameUser">
        Welcome, {{ userName }}!
        <button @click="openFavorites">View Favorites</button>
      </div>
    </div>
    <div>
      <div class="quote">
        <h1>Get inspired or test your knowledge of philosophy!</h1>

        <button @click="handleClick">Get a Random Philosophical Quote</button>
        <p v-if="quote" class="quote">{{ quote }}</p>

        <div class="author">
          <button v-if="quote" @click="toggleAuthor">
            {{ showAuthor ? 'Hide the Author' : 'Who said that?' }}
          </button>

          <p v-if="showAuthor">- {{ author }}</p>
          <div v-if="showAuthor">
            <img
              v-if="photo"
              :src="photo"
              alt="Philosopher's photo"
              style="max-width: 200px"
            />
          </div>
        </div>

        <div>
          <button v-if="quote" @click="toggleBook">
            {{
              showBook ? 'Hide the book' : 'Where does this quote come from?'
            }}
          </button>
          <p v-if="showBook">- {{ book }}</p>
        </div>

        <button @click="toggleFavorite" class="heart-btn">
          <font-awesome-icon
            :icon="isFavorite() ? ['fas', 'heart'] : ['far', 'heart']"
          />
        </button>
      </div>
    </div>
  </div>
  <!-- Modals -->
  <ModalView v-if="showFavoritesModal" @close="showFavoritesModal = false">
    <FavoritesView :favorites="favorites" />
  </ModalView>

  <ModalView v-if="showLoginModal" @close="showLoginModal = false">
    <LoginView />
  </ModalView>

  <ModalView v-if="showRegisterModal" @close="showRegisterModal = false">
    <RegisterView />
  </ModalView>
</template>

<style scoped>
.photo-philo {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  object-position: 50% 10%;
}

.heart-btn svg:hover {
  transform: scale(1.1);
  transition: transform 0.2s;
}

body {
  background-image: url('./assets/img/premium_photo-1672944876342-4090.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  margin: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.banner {
  width: 100%;
  height: 30vw;
  background-image: url('./assets/img/banner_quotes.png');
  padding: 50px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
}

.nameUser {
  font-family: 'Great Vibes', cursive;
  padding: 4px;
}

h1 {
  font-family: 'Great Vibes', cursive;
  font-size: xx-large;
  margin-bottom: 40px;
}

.quote {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 20px 0;
}

.author {
}

/* Responsive */
@media (max-width: 768px) {
  .banner {
    height: 150px;
  }
}
@media (max-width: 480px) {
  .banner {
    height: 120px;
    background-size: contain;
  }
}
</style>
