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
    const response = await axios.post('http://localhost:1337/api/auth/local', {
      identifier: email.value,
      password: password.value,
    })
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
      'http://localhost:1337/api/auth/local/register',
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

<style scoped></style>
