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
    quoteId.value = response.data.id
    console.log('response.Data >>>>>', response.data)

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
  console.log('ID.value>>>>', quoteId.value)
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
    const response = await axios.get(
      'http://localhost:1337/api/users/me?populate=*',
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    console.log('Response data:', response.data)

    favorites.value = response.data.favorites
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
    <div class="banner">
      <div v-if="isLoggedIn" class="nameUser">
        <span>Welcome, {{ userName }}!</span>
        <button @click="openFavorites">View Favorites</button>
      </div>
      <div id="main-content">
        <h1>Echoes of Wisdom</h1>
        <h2 class="philosophy-quote">
          Get inspired or test your knowledge of philosophy!
        </h2>

        <div class="quote-actions">
          <button @click="handleClick">Get a Random Philosophical Quote</button>
          <button @click="toggleFavorite" class="heart-btn">
            <font-awesome-icon
              :icon="isFavorite() ? ['fas', 'heart'] : ['far', 'heart']"
            />
          </button>
        </div>

        <p v-if="quote" class="quote">{{ quote }}</p>

        <div class="quote-details">
          <div class="author">
            <button v-if="quote" @click="toggleAuthor">
              {{ showAuthor ? 'Hide the Author' : 'Who said that?' }}
            </button>

            <div v-if="showAuthor" class="author-info">
              <p>- {{ author }}</p>
              <img
                class="photo-philo"
                v-if="photo"
                :src="photo"
                alt="Philosopher's photo"
              />
            </div>
          </div>

          <div class="book-info">
            <button v-if="quote" @click="toggleBook">
              {{
                showBook ? 'Hide the book' : 'Where does this quote come from?'
              }}
            </button>
            <p v-if="showBook">- {{ book }}</p>
          </div>
        </div>
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
/* main content */

/* .quote {
  font-family: 'Georgia', serif;
  font-style: italic;
  font-size: 1.5rem;
  padding: 20px;
  background: #fff;
  border: 2px solid #d1a873;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
} */

.heart-btn svg:hover {
  transform: scale(1.1);
  transition: transform 0.2s;
}

.heart-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  padding: 5px;
  border: none;
  background: transparent;
  cursor: pointer;
}

.body {
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/img/banner-collage.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: 0;
}

.banner {
  width: 100%;
  height: 120%;
  background-image: url('@/assets/img/new-banner.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 170px;
}

#main-content {
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 20px;
  text-align: center;
  margin: 0 auto;
}
.nameUser {
  font-family: 'Great Vibes', cursive;
  font-size: 1.2rem;
  position: absolute;
  left: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nameUser button {
  margin-top: 10px;
}

h1 {
  font-family: 'Great Vibes', cursive;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 2px 2px 5px #9e9e9e;
}
h2 {
  font-family: 'Great Vibes', cursive;
}

.philosophy-quote {
  font-size: 1.5rem;
  text-align: center;
  margin-top: 20px;
}

.quote-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.quote-action > button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.quote-details {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  padding-right: 20px;
  position: absolute;
}

.author-info {
  display: flex;
  align-items: center;
  justify-content: center;
}
.book-info {
  text-align: right;
  margin-top: 20px;
  width: 250px;
}

.photo-philo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  object-position: 50% 10%;
  margin-left: 20px;
}

.book-info {
  text-align: right;
  margin-top: 10px;
}

.heart-btn {
  margin-top: 20px;
}

/* Responsive */
@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
  .philosophy-quote {
    font-size: 1.3rem;
  }
  .banner {
    height: 160%;
  }
  #main-content {
    grid-template-rows: auto auto auto auto;
    width: 70%;
  }
  .quote-actions {
    margin: 3px 0;
  }

  .quote-details {
    margin-top: 20px;
  }
  .banner {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
}
@media (max-width: 480px) {
  .banner {
    height: 200%;
    background-size: contain;
    background-position: center;
  }
  #main-content {
    grid-template-rows: auto auto auto auto;
    width: 70%;
  }
  .nameUser {
    font-family: 'Great Vibes', cursive;
    font-size: 1.2rem;
    position: inherit;
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-family: 'Great Vibes', cursive;
    font-size: 1.1rem;
    text-align: center;
    margin-bottom: 0px;
    text-shadow: 2px 2px 5px #9e9e9e;
  }

  .philosophy-quote {
    font-size: 1rem;
    text-align: center;
    margin-top: 1px;
  }
}
</style>
