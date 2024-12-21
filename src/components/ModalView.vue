<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <slot />
      <button class="modal-button" @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 1rem;
  width: 90%;
  max-width: 500px;
  height: 60vh;
  position: relative;
}

.modal-button {
  position: absolute;
  top: -20px;
  right: 30px;
}
</style>
