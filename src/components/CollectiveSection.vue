<template>
  <section ref="sectionRef" id="collective" class="collective-section">
    <div class="collective-container">
      <!-- Left Side: Text Information -->
      <div class="collective-left">
        <h2 class="brand-title font-sans">Rooted Relevant Collective</h2>
        <p class="brand-subtitle font-sans">Hosted by Cornerstone BDG</p>

        <p class="mission-text font-sans">
          The next generation isn't just the future of the Church, they are the Church of today and the leaders of tomorrow. Join a collective of church leaders committed to discipling, empowering, and sending the next generation.
        </p>

        <div class="cta-wrapper">
          <button @click="$emit('open-tickets')" class="btn-register-rrc font-tech">
            REGISTER RRC27
          </button>
        </div>
      </div>

      <!-- Right Side: 4 Frame Images Collage Grid -->
      <div class="collective-right">
        <div class="collage-image-container">
          <div class="collage-absolute-wrapper">
            <!-- Frame 19: BRANDED Panel Top Left -->
            <div 
              class="collage-item frame-19-box"
              :style="{ transform: `translateY(${parallaxOffset * 2.2}px)` }"
            >
              <img src="/Frame 19.avif" alt="Frame 19" class="frame-img" />
            </div>

            <!-- Frame 20: Pastor Willyem Top Center -->
            <div 
              class="collage-item frame-20-box"
              :style="{ transform: `translateY(${parallaxOffset * 0.75}px)` }"
            >
              <img src="/Frame 20.avif" alt="Frame 20" class="frame-img" />
            </div>

            <!-- Frame 17: Singer Bottom Left -->
            <div 
              class="collage-item frame-17-box"
              :style="{ transform: `translateY(${parallaxOffset * 1.3}px)` }"
            >
              <img src="/Frame 17.avif" alt="Frame 17" class="frame-img" />
            </div>

            <!-- Frame 18: Stage Crowd Right Full Height -->
            <div 
              class="collage-item frame-18-box"
              :style="{ transform: `translateY(${parallaxOffset * 1.8}px)` }"
            >
              <img src="/Frame 18.avif" alt="Frame 18" class="frame-img" />
            </div>
          </div>

          <!-- Floating Sky-Blue Paper Tag -->
          <div 
            class="floating-sky-tag font-tech"
            :style="{ transform: `rotate(-4deg) translateY(${parallaxOffset * 0.4}px)` }"
          >
            <div class="tag-dates">19 – 20</div>
            <div class="tag-month">FEBRUARY</div>
            <div class="tag-year">2027</div>
            <div class="tag-location">
              @Cornerstone,<br />Bandung
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineEmits(['open-tickets'])

const sectionRef = ref(null)
const parallaxOffset = ref(0)
const isSnapped = ref(false)
let isSnapping = false

const handleScroll = () => {
  if (!sectionRef.value) return

  const currentScrollY = window.scrollY
  const rect = sectionRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const targetTop = 72 // Navbar height offset

  // Disable aggressive parallax on mobile for smooth performance & clean layout
  if (window.innerWidth < 768) {
    parallaxOffset.value = 0
    return
  }

  // 1. At Home top (stationary): stay strictly at default position (0px)
  if (currentScrollY <= 0) {
    parallaxOffset.value = 0
    return
  }

  // 2. When screen arrives at Collective Section: LOCK ALL PHOTOS STRICTLY IN THEIR NEAT RESTING GRID POSITIONS (0px)!
  if (rect.top <= targetTop + 5) {
    parallaxOffset.value = 0
    return
  }

  // 3. ONLY while scrolling down towards Collective Section: photos scroll UPWARDS FIRST with strong pre-scroll wave
  if (rect.top < windowHeight && rect.top > targetTop + 5) {
    const scrollProgress = Math.min(1, Math.max(0, currentScrollY / 220))
    parallaxOffset.value = -200 * Math.sin(scrollProgress * Math.PI)

    // Auto-pull full page section when scrolled partially into view
    if (currentScrollY > 80 && rect.top > targetTop + 20 && !isSnapped.value && !isSnapping) {
      isSnapping = true
      isSnapped.value = true
      
      const targetY = sectionRef.value.offsetTop - targetTop
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      })

      setTimeout(() => {
        isSnapping = false
      }, 850)
    }

    if (currentScrollY < 10 || rect.top > windowHeight * 0.95 || rect.bottom < windowHeight * 0.1) {
      isSnapped.value = false
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.collective-section {
  background: #ffffff;
  color: #111111;
  width: 100%;
  position: relative;
  overflow: visible;
  padding-bottom: 3rem;
  scroll-margin-top: 72px;
}

.collective-container {
  max-width: 1680px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.45fr;
  align-items: center;
  position: relative;
}

/* Left Column Styling */
.collective-left {
  padding: 3.5rem 2rem 1.5rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 5;
}

.brand-title {
  font-size: clamp(1.4rem, 2.2vw, 1.85rem);
  font-weight: 800;
  color: #111111;
  margin-bottom: 0.2rem;
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.brand-subtitle {
  font-size: clamp(0.85rem, 1.2vw, 1.05rem);
  color: #555555;
  margin-bottom: 2.2rem;
  font-weight: 500;
}

.mission-text {
  font-size: clamp(1.02rem, 1.35vw, 1.25rem);
  line-height: 1.65;
  color: #222222;
  font-weight: 400;
  margin-bottom: 2.5rem;
  max-width: 530px;
}

.cta-wrapper {
  display: flex;
}

.btn-register-rrc {
  background: #000000;
  color: #ffffff;
  border: none;
  padding: 0.85rem 2.4rem;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.btn-register-rrc:hover {
  background: #222222;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35);
}

/* Right Column & Collage Container */
.collective-right {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  margin-top: 0;
  z-index: 15;
}

.collage-image-container {
  width: 100%;
  position: relative;
}

/* Absolute Positioning Layout matching poster proportions 100% */
.collage-absolute-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1.05 / 1;
  min-height: 520px;
}

.collage-item {
  position: absolute;
  transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
}

.frame-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Neat Resting Grid Coordinates matching reference poster 100% */
.frame-19-box {
  top: 0;
  left: 0;
  width: 29.5%;
  height: 49%;
  z-index: 3;
}

.frame-20-box {
  top: 0;
  left: 29.5%;
  width: 30.5%;
  height: 49%;
  z-index: 4;
}

.frame-17-box {
  top: 49%;
  left: 0;
  width: 60%;
  height: 51%;
  z-index: 2;
}

.frame-18-box {
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  z-index: 2;
}

/* Floating Sky Blue Paper Tag */
.floating-sky-tag {
  position: absolute;
  bottom: -25px;
  left: -50px;
  z-index: 25;
  background: #52e5ff;
  color: #000000;
  padding: 1.8rem 1.4rem 1.6rem;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.28);
  transition: box-shadow 0.3s ease, transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
  width: 220px;
  box-sizing: border-box;
}

.floating-sky-tag:hover {
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.38);
}

.tag-dates {
  font-size: 1.85rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.01em;
  margin-bottom: 0.2rem;
}

.tag-month {
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  line-height: 1.1;
}

.tag-year {
  font-size: 1.45rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  margin-bottom: 0.9rem;
  line-height: 1.1;
}

.tag-location {
  font-size: 1.08rem;
  font-weight: 800;
  line-height: 1.25;
  color: #000000;
}

/* Responsive Rules for Tablet & Mobile */
@media (max-width: 1180px) {
  .collective-right {
    padding-left: 0.5rem;
  }
  .floating-sky-tag {
    left: -35px;
    bottom: -15px;
    width: 200px;
    padding: 1.5rem 1.1rem 1.3rem;
  }
  .tag-dates { font-size: 1.6rem; }
  .tag-month { font-size: 1.2rem; }
  .tag-year { font-size: 1.3rem; margin-bottom: 0.6rem; }
  .tag-location { font-size: 0.98rem; }
}

@media (max-width: 900px) {
  .collective-container {
    grid-template-columns: 1fr;
  }
  
  .collective-left {
    padding: 2.5rem 1.5rem 1.8rem;
  }

  .collective-right {
    padding-left: 0;
    margin-top: 0;
    flex-direction: column;
  }

  .collage-absolute-wrapper {
    min-height: 380px;
  }

  .floating-sky-tag {
    left: -20px;
    bottom: -15px;
    width: 180px;
    padding: 1.2rem 0.9rem 1.1rem;
  }
}

@media (max-width: 640px) {
  .collective-left {
    padding: 1.8rem 1rem 1.2rem;
  }

  .brand-title {
    font-size: 1.45rem;
    line-height: 1.15;
    margin-bottom: 0.15rem;
  }

  .brand-subtitle {
    font-size: 0.82rem;
    margin-bottom: 1.2rem;
  }

  .mission-text {
    font-size: 0.92rem;
    line-height: 1.55;
    margin-bottom: 1.4rem;
  }

  .btn-register-rrc {
    width: 100%;
    padding: 0.75rem 1.5rem;
    font-size: 0.8rem;
    text-align: center;
  }

  .collective-right {
    padding: 0 0.5rem;
  }

  .collage-absolute-wrapper {
    min-height: 260px;
    aspect-ratio: 1.05 / 1;
  }

  .floating-sky-tag {
    position: absolute;
    left: -10px;
    bottom: -10px;
    width: 125px;
    padding: 0.7rem 0.5rem 0.6rem;
    margin: 0;
    transform: rotate(-3deg);
    border-radius: 3px;
  }

  .tag-dates { font-size: 0.95rem; margin-bottom: 0.1rem; }
  .tag-month { font-size: 0.75rem; }
  .tag-year { font-size: 0.8rem; margin-bottom: 0.2rem; }
  .tag-location { font-size: 0.68rem; line-height: 1.15; }
}
</style>
