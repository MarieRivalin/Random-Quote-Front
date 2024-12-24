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
    await axios.post(
      'https://site--random-quote-back--q48zs5sj4mxl.code.run/api/auth/local/register',
      {
        username: username.value,
        email: email.value,
        password: password.value,
      },
    )
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
