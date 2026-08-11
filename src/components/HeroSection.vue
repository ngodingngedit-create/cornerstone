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
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <!-- Poster Overlay Layer -->
      <div ref="posterOverlayRef" class="poster-overlay">
        <img :src="heroImg" alt="R2C27 Hero Banner - Next Is Now" class="poster-full-img" />
      </div>
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
    })
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
}
</style>
