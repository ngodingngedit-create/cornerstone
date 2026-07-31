<template>
  <div class="bottom-bar">
    <div class="bottom-bar-container">
      <div class="bottom-bar-text">
        {{ text }}
      </div>
      <button class="bottom-bar-button" @click="handleSubmit">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: 'to the next step'
  },
  buttonText: {
    type: String,
    default: 'Submit'
  }
})

const emit = defineEmits(['submit'])

const handleSubmit = () => {
  emit('submit')
}
</script>

<style scoped>
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #000000;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  z-index: 999;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.2);
}

.bottom-bar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.1rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
}

.bottom-bar-text {
  color: #ffffff;
  font-family: var(--font-sans, 'Manrope', system-ui, sans-serif);
  font-weight: 800;
  font-size: 1.05rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.bottom-bar-button {
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.8rem;
  font-family: var(--font-sans, 'Manrope', system-ui, sans-serif);
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
}

.bottom-bar-button:hover {
  background-color: #e2e8f0;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.25);
}

.bottom-bar-button:active {
  transform: scale(0.98);
}

@media (max-width: 640px) {
  .bottom-bar-container {
    padding: 0.8rem 1.25rem;
  }
  
  .bottom-bar-text {
    font-size: 0.9rem;
  }
  
  .bottom-bar-button {
    padding: 0.55rem 1.35rem;
    font-size: 0.85rem;
  }
}
</style>
