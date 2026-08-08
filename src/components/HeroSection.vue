<template>
  <section id="hero" class="hero-section">
    <div class="hero-media-container">
      <!-- Video playing behind -->
      <video
        ref="videoRef"
        src="/poster-video.mp4"
        class="hero-video"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
      ></video>

      <!-- Poster overlay on top -->
      <img
        src="/hero.avif"
        alt="R2C27 Hero Banner"
        class="hero-poster"
        :style="{ opacity: posterOpacity }"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const videoRef = ref(null)
const posterOpacity = ref(1)

const handleScroll = () => {
  const scrollTop = window.scrollY
  // Fade out the poster as user scrolls down (fully transparent by 350px)
  const fadeRange = 350
  posterOpacity.value = Math.max(0, 1 - (scrollTop / fadeRange))
}

let observer = null

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Autoplay/resume when hero section is in view
        videoRef.value?.play().catch(err => {
          console.log("Autoplay blocked or failed:", err)
        })
      } else {
        // Pause video when scrolled past to next sections
        videoRef.value?.pause()
      }
    })
  }, {
    threshold: 0.05 // Trigger when at least 5% of the section is visible
  })

  if (videoRef.value) {
    observer.observe(document.getElementById('hero'))
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  padding-top: 72px; /* Offset for fixed navbar header */
  background-color: #000000;
  overflow: hidden;
}

.hero-media-container {
  position: relative;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  background: #000000;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.9);
}

.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.hero-poster {
  position: relative;
  width: 100%;
  height: auto;
  display: block;
  z-index: 2;
  pointer-events: none;
  transition: opacity 0.15s ease-out;
}

@media (max-width: 768px) {
  .hero-section {
    padding-top: 64px;
  }
}
</style>
