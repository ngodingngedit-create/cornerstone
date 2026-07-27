<template>
  <section id="hero" class="hero-section">
    <div class="hero-image-wrapper">
      <img src="/hero.png" alt="R2C27 Hero Banner - Next Is Now" class="hero-full-img" />
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  padding-top: 72px; /* Offset for fixed navbar header */
  background-color: #000000;
  overflow: hidden;
}

.hero-image-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000000;
}

.hero-full-img {
  width: 100%;
  max-width: 1920px;
  height: auto;
  display: block;
  object-fit: contain;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.9);
}

@media (max-width: 768px) {
  .hero-section {
    padding-top: 64px;
  }
}
</style>
