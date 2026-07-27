<template>
  <section id="speakers" class="speakers-section">
    <div class="speakers-container">
      <!-- Top Header Row -->
      <div class="speakers-header-row">
        <h2 class="section-title font-tech">Speakers</h2>

        <!-- Horizontal Scroll Navigation Arrows -->
        <div class="carousel-nav">
          <button @click="scrollLeft" class="nav-arrow-btn" aria-label="Scroll left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          
          <button @click="scrollRight" class="nav-arrow-btn active" aria-label="Scroll right">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <!-- Horizontal Divider Line -->
      <div class="header-divider-line"></div>

      <!-- Horizontal Scrollable Speakers Carousel -->
      <div ref="carouselTrack" class="speakers-carousel-track">
        <div 
          v-for="speaker in speakersList" 
          :key="speaker.id"
          class="speaker-card-item"
        >
          <!-- Speaker Portrait Image Box -->
          <div class="portrait-box">
            <img :src="speaker.image" :alt="speaker.name" class="speaker-portrait-img" />
          </div>

          <!-- SPEAKER Tag Badge -->
          <div class="speaker-tag font-tech">SPEAKER</div>

          <!-- Speaker Name & Title -->
          <div class="speaker-details font-tech">
            <h3 class="speaker-name">{{ speaker.name }}</h3>
            <p class="speaker-role">{{ speaker.role }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const carouselTrack = ref(null)

const scrollLeft = () => {
  if (carouselTrack.value) {
    carouselTrack.value.scrollBy({ left: -320, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  if (carouselTrack.value) {
    carouselTrack.value.scrollBy({ left: 320, behavior: 'smooth' })
  }
}

const speakersList = [
  {
    id: 1,
    name: 'Agus Gunawan',
    role: 'Senior Pastor',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'Willyem O. Wijaya',
    role: 'Lead Pastor',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    name: 'Lucas Suryawan',
    role: 'Preacher',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    name: 'Ervinna Onggo',
    role: 'Preacher',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    name: 'Daniel Hendrata',
    role: 'Senior Pastor',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 6,
    name: 'Debby Catharina',
    role: 'Executive Pastor',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80'
  }
]
</script>

<style scoped>
.speakers-section {
  padding: 5rem 2rem 6rem;
  background: #000000;
  color: #ffffff;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.speakers-container {
  max-width: 1430px;
  margin: 0 auto;
}

/* Header Row */
.speakers-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
}

.section-title {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.8rem, 3vw, 2.3rem);
  font-weight: 400;
  color: #ffffff;
  letter-spacing: -0.01em;
}

/* Carousel Nav Buttons */
.carousel-nav {
  display: flex;
  gap: 0.8rem;
  align-items: center;
}

.nav-arrow-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
}

.nav-arrow-btn svg {
  width: 20px;
  height: 20px;
}

.nav-arrow-btn.active,
.nav-arrow-btn:hover {
  background: #ffffff;
  color: #000000;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
}

/* Divider Line */
.header-divider-line {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin-bottom: 2.5rem;
}

/* Horizontal Scroll Track */
.speakers-carousel-track {
  display: flex;
  gap: 1.8rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding-bottom: 1.5rem;

  /* Hide Scrollbar */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.speakers-carousel-track::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

/* Speaker Card Item */
.speaker-card-item {
  flex: 0 0 calc(25% - 1.35rem);
  min-width: 260px;
  max-width: 320px;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
}

.portrait-box {
  width: 100%;
  height: 380px;
  background: #1c1c1c;
  border-radius: 4px;
  overflow: hidden;
}

.speaker-portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(80%) contrast(110%);
  transition: transform 0.4s ease, filter 0.4s ease;
}

.speaker-card-item:hover .speaker-portrait-img {
  filter: grayscale(0%) contrast(105%);
  transform: scale(1.04);
}

/* SPEAKER Badge Tag */
.speaker-tag {
  display: inline-block;
  align-self: flex-start;
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  border-radius: 50px;
  padding: 0.25rem 0.85rem;
  font-family: 'Manrope', sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #ffffff;
  margin-top: 1.2rem;
  margin-bottom: 0.6rem;
}

/* Speaker Details */
.speaker-details {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.speaker-name {
  font-family: 'Manrope', sans-serif;
  font-size: 1.35rem;
  font-weight: 500;
  color: #ffffff;
  line-height: 1.25;
  letter-spacing: -0.01em;
}

.speaker-role {
  font-family: 'Manrope', sans-serif;
  font-size: 1.15rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.25;
}

/* Responsive Rules for Mobile and Tablet */
@media (max-width: 1024px) {
  .speaker-card-item {
    flex: 0 0 calc(33.333% - 1.2rem);
  }
}

@media (max-width: 768px) {
  .speakers-section {
    padding: 3.5rem 1.25rem 4.5rem;
  }

  .speaker-card-item {
    flex: 0 0 250px;
  }

  .portrait-box {
    height: 320px;
  }

  .speaker-name {
    font-size: 1.2rem;
  }

  .speaker-role {
    font-size: 1rem;
  }
}
</style>
