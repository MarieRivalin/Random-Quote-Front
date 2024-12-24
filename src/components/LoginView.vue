<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const name = ref('')
const router = useRouter()

const isLoginMode = ref(true)

const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value
}

const login = async () => {
  try {
    const response = await axios.post(
      'https://site--random-quote-back--q48zs5sj4mxl.code.run/api/auth/local',
      {
        identifier: email.value,
        password: password.value,
      },
    )
    alert('Successful login! 🎉')
    localStorage.setItem('token', response.data.jwt) / router.push('/')
  } catch (error) {
    console.error('Login error:', error)
    alert('Login failed')
  }
}

const register = async () => {
  try {
    const response = await axios.post(
      'https://site--random-quote-back--q48zs5sj4mxl.code.run/api/auth/local/register',
      {
        username: name.value,
        email: email.value,
        password: password.value,
      },
    )
    alert('Account created successfully! 🎉')
    localStorage.setItem('token', response.data.jwt)
    router.push('/')
  } catch (error) {
    console.error('Registration error:', error)
    alert('Registration failed. Please check your details.')
  }
}
</script>

<template>
  <div>
    <h2>{{ isLoginMode ? 'Login' : 'Register' }}</h2>

    <form v-if="isLoginMode" @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>

    <form v-else @submit.prevent="register">
      <input type="text" v-model="name" placeholder="Name" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </form>

    <p>
      {{ isLoginMode ? "Don't have an account?" : 'Already have an account?' }}
      <a href="#" @click.prevent="toggleMode">
        {{ isLoginMode ? 'Register here!' : 'Login here!' }}
      </a>
    </p>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 1rem;
  padding: 20px;
  width: 90%;
  max-width: 400px;
  height: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin: auto;
}

h2 {
  font-family: 'Georgia', serif;
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

input {
  font-family: 'Arial', sans-serif;
  font-size: 1rem;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  width: 100%;
}

p {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: #555;
}

a {
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
}

a:hover {
  text-decoration: underline;
}

button {
  align-self: center;
  width: fit-content;
  padding: 0.5rem 1.5rem;
}
</style>
