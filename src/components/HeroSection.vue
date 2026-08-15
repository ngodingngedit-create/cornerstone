<template>
  <section ref="heroSectionRef" id="hero" class="hero-section">
    <!-- Pinned/sticky container for scroll animation on desktop, inline banner on mobile -->
    <div class="hero-sticky-container">
      <!-- Background Video Layer -->
      <div class="video-container">
        <video 
          ref="videoRef"
          class="hero-video"
          autoplay
          muted
          loop
          playsinline
          preload="auto"
        >
          <!-- <source src="/videos/hero.webm" type="video/webm" /> -->
          <source src="/videos/home.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <!-- Poster Overlay Layer -->
      <div ref="posterOverlayRef" class="poster-overlay">
        <img :src="heroImg" alt="R2C27 Hero Banner - Next Is Now" class="poster-full-img" />
      </div>

      <!-- Volume control button -->
      <button 
        ref="volumeBtnRef"
        @click="toggleMute" 
        class="volume-toggle-btn"
        :aria-label="isMuted ? 'Unmute video' : 'Mute video'"
      >
        <!-- Icon: volume-x (muted) or volume-2 (unmuted) -->
        <svg v-if="isMuted" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="volume-icon">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="22" y1="9" x2="16" y2="15"></line>
          <line x1="16" y1="9" x2="22" y2="15"></line>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="volume-icon">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroImg from '../assets/hero.avif'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const heroSectionRef = ref(null)
const videoRef = ref(null)
const posterOverlayRef = ref(null)
const volumeBtnRef = ref(null)

const isMuted = ref(true)

const toggleMute = () => {
  if (videoRef.value) {
    videoRef.value.muted = !videoRef.value.muted
    isMuted.value = videoRef.value.muted
  }
}

let scrollTimeline = null
let mobileAutoplayTimeout = null

onMounted(() => {
  const isMobile = () => window.innerWidth < 900

  if (isMobile()) {
    // 1. Mobile Auto-reveal after exactly 2.5 seconds (2500ms) delay
    mobileAutoplayTimeout = setTimeout(() => {
      gsap.to(posterOverlayRef.value, {
        opacity: 0,
        scale: 1.12,
        duration: 1.2,
        ease: 'power1.inOut',
        onStart: () => {
          if (videoRef.value) {
            videoRef.value.play().catch(err => {
              console.log('Mobile video autoplay blocked by browser:', err)
            })
          }
        }
      })
      gsap.to(volumeBtnRef.value, {
        opacity: 1,
        duration: 1.2,
        ease: 'power1.inOut'
      })
    }, 2500)

    // 2. Mobile Video control ScrollTrigger (No pinning/no layout spacer)
    ScrollTrigger.create({
      trigger: heroSectionRef.value,
      start: 'top top+=53',
      end: 'bottom top',
      onEnter: () => {
        if (videoRef.value) {
          videoRef.value.play().catch(() => {})
        }
      },
      onLeave: () => {
        if (videoRef.value) {
          videoRef.value.pause()
        }
      },
      onEnterBack: () => {
        if (videoRef.value) {
          videoRef.value.play().catch(() => {})
        }
      },
      onLeaveBack: () => {
        if (videoRef.value) {
          videoRef.value.play().catch(() => {})
        }
      }
    })
  } else {
    // Desktop Mode: Scroll-driven pinning, reveal, and play/pause logic
    if (videoRef.value) {
      videoRef.value.play().catch(() => {})
    }

    scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: heroSectionRef.value,
        start: () => `top top+=${window.innerWidth < 900 ? 53 : 42}`, // Matches user's 42px offset
        end: () => `+=${window.innerWidth < 900 ? 300 : 1800}`, // Pin scroll range
        scrub: isMobile() ? true : 1.5, // Cushioned scrubbing lag on desktop
        pin: isMobile() ? false : '.hero-sticky-container', // Pinned on desktop, standard layout on mobile
        pinSpacing: !isMobile(),
        onEnter: () => {
          if (videoRef.value) {
            videoRef.value.play().catch(() => {})
          }
        },
        onLeave: () => {
          if (videoRef.value) {
            videoRef.value.pause()
          }
        },
        onEnterBack: () => {
          if (videoRef.value) {
            videoRef.value.play().catch(() => {})
          }
        },
        onLeaveBack: () => {
          if (videoRef.value) {
            videoRef.value.play().catch(() => {})
          }
        }
      }
    })

    // Zoom and fade out poster overlay on desktop scroll
    scrollTimeline.to(posterOverlayRef.value, {
      scale: 1.12,
      opacity: 0,
      ease: 'power1.inOut'
    }, 0)

    // Fade in volume button in sync with the poster overlay fade out
    scrollTimeline.to(volumeBtnRef.value, {
      opacity: 1,
      ease: 'power1.inOut'
    }, 0)
  }
})

onUnmounted(() => {
  // Clear timeout to prevent memory leaks
  if (mobileAutoplayTimeout) {
    clearTimeout(mobileAutoplayTimeout)
  }
  // Clean up all ScrollTrigger instances
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<style scoped>
/* Outer container wraps layout and provides offsets for sticky navbar header */
.hero-section {
  position: relative;
  width: 100%;
  padding-top: 42px; /* Desktop navbar offset - user adjusted */
  background-color: #000000;
  overflow: visible;
}

/* Sticky viewport container with native banner aspect ratio (5860 x 2508) */
.hero-sticky-container {
  position: relative;
  width: 100%;
  aspect-ratio: 5860 / 2508; /* Maintain exact aspect ratio, eliminating black space on load */
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
}

/* Background video styles */
.video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: #000000;
}

.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Fits container perfectly due to container aspect-ratio match */
  display: block;
  transform: scale(1.03); /* Scale up slightly to cover any rendering rounding gaps */
  transform-origin: center center;
}

/* Foreground poster styles */
.poster-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  transform-origin: center center;
  will-change: transform, opacity;
}

.poster-full-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Fits container perfectly due to container aspect-ratio match */
  display: block;
  transform: scale(1.03); /* Scale up slightly to cover any rendering rounding gaps */
  transform-origin: center center;
}

/* Volume control button matching the play button border & simple circular styling */
.volume-toggle-btn {
  position: absolute;
  bottom: 5.5%;
  right: 4.5%;
  z-index: 10;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 0; /* Start hidden, animated by GSAP in sync with poster overlay fadeout */
  transition: background-color 0.25s ease, border-color 0.25s ease, transform 0.2s ease;
  padding: 0;
  color: #ffffff;
  outline: none;
}

.volume-toggle-btn:hover {
  background-color: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.9);
  transform: scale(1.05);
}

.volume-toggle-btn:active {
  transform: scale(0.95);
}

.volume-icon {
  width: 20px;
  height: 20px;
  stroke: #ffffff;
  stroke-width: 1.75;
}

/* Responsive adjustment rules for mobile viewports */
@media (max-width: 900px) {
  .hero-section {
    height: auto; /* Let the height be determined naturally by the banner on mobile */
    padding-top: 53px; /* Mobile navbar offset */
  }

  .hero-sticky-container {
    position: relative;
    height: auto; /* Reset any forced height */
  }

  .hero-video {
    transform: scale(1.0); /* Reset scale on mobile */
  }

  .poster-full-img {
    transform: scale(1.0); /* Reset scale on mobile */
  }

  .volume-toggle-btn {
    width: 32px;
    height: 32px;
    bottom: 5%;
    right: 5%;
  }

  .volume-icon {
    width: 14px;
    height: 14px;
  }
}
</style>
