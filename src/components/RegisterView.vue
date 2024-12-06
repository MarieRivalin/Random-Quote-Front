<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const register = async () => {
  try {
    await axios.post('http://localhost:1337/api/auth/local/register', {
      username: username.value,
      email: email.value,
      password: password.value,
    })
    alert('Successful registration! 🎉')
    router.push('/')
  } catch (error) {
    console.error('Registration error :', error)
    alert('Registration failed')
  }
}
</script>

<template>
  <div>
    <h2>Create an account</h2>
    <form @submit.prevent="register">
      <input type="text" v-model="username" placeholder="Name" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button type="submit">Sign up</button>
    </form>
  </div>
</template>

<style scoped></style>
