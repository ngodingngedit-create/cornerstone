<template>
  <section id="register" class="registration-section">
    <!-- Main Card Container using Rectangle 9.png background -->
    <div class="registration-card-wrapper">
      <!-- Title Image (Register.avif) -->
      <div class="register-header">
        <img src="/Register.avif" alt="REGISTER" class="register-title-img" />
      </div>

      <!-- Ticket Cards Container -->
      <div class="tickets-container">
        <!-- Ticket 1: Blue Card (ADULT) -->
        <div class="ticket-card card-blue" @click="$emit('select-ticket', { title: 'ADULT PASS', price: 'IDR 450.000' })">
          <div class="card-top-content">
            <h3 class="ticket-title">ADULT</h3>
            <div class="price-badge">IDR 450.000</div>
            <span class="savings-text">SAVE IDR 250.000</span>
          </div>

          <div class="card-image-box">
            <img 
              src="/image 1.avif" 
              alt="Cheering audience" 
              class="bw-card-img" 
            />
          </div>
        </div>

        <!-- Ticket 2: Orange Card (ADULT + YOUTH) -->
        <div class="ticket-card card-orange" @click="$emit('select-ticket', { title: 'ADULT + YOUTH PASS', price: 'IDR 700.000' })">
          <div class="card-top-content">
            <h3 class="ticket-title">ADULT +<br />YOUTH</h3>
            <div class="price-badge">IDR 700.000</div>
            <span class="savings-text">SAVE IDR 200.000</span>
          </div>

          <div class="card-image-box">
            <img 
              src="/image 2.avif" 
              alt="Concert crowd" 
              class="bw-card-img" 
            />
          </div>
        </div>
      </div>

      <!-- Centered CTA Button -->
      <div class="cta-wrapper">
        <button @click="$emit('open-tickets')" class="btn-white-pill">
          REGISTER R2C27
        </button>
      </div>
    </div>

    <!-- Bottom Infinite Marquee Banner outside registration-card-wrapper -->
    <div class="bottom-marquee-bar">
      <div class="marquee-track">
        <div class="marquee-content" v-for="i in 4" :key="i">
          <span>Early bird available from 9 August - 10 October 2026</span>
          <span class="star-icon">✸</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineEmits(['select-ticket', 'open-tickets'])
</script>

<style scoped>
.registration-section {
  padding: 2rem 0 0;
  background: #ffffff;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* Card Wrapper with Rectangle 9.png background */
.registration-card-wrapper {
  width: 94%;
  max-width: 1320px;
  background-image: url('/Rectangle 9.avif');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 4px;
  padding: 3.5rem 2rem 3.5rem;
  margin-bottom: 2rem;
  position: relative;
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

/* Title Image (Register.avif) enlarged */
.register-header {
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: center;
  margin-bottom: -2.2rem;
  position: relative;
  z-index: 1;
}

.register-title-img {
  width: 100%;
  max-width: 840px;
  height: auto;
  display: block;
  object-fit: contain;
  opacity: 0.95;
}

/* Ticket Cards Layout shifted downwards */
.tickets-container {
  display: flex;
  justify-content: center;
  gap: 1.8rem;
  width: 100%;
  max-width: 680px;
  position: relative;
  z-index: 5;
  margin-top: 1.2rem;
  margin-bottom: 2.2rem;
}

.ticket-card {
  flex: 1;
  max-width: 320px;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 2px;
  overflow: hidden;
}

.ticket-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

.card-blue .card-top-content {
  background: #2862e3;
}

.card-orange .card-top-content {
  background: #eb5629;
}

.card-top-content {
  padding: 2rem 1.8rem 1.6rem;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 200px;
  flex-grow: 1;
}

.ticket-title {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.8rem, 2.8vw, 2.3rem);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.01em;
  margin-bottom: 1rem;
  color: #ffffff;
}

.price-badge {
  background: #000000;
  color: #ffffff;
  font-family: 'Manrope', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  padding: 0.3rem 0.8rem;
  border-radius: 2px;
  margin-bottom: 0.4rem;
  letter-spacing: 0.02em;
}

.savings-text {
  font-family: 'Manrope', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
}

.card-image-box {
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: #111111;
}

.bw-card-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: grayscale(100%) contrast(120%) brightness(95%);
  transition: transform 0.4s ease, filter 0.4s ease;
}

.ticket-card:hover .bw-card-img {
  filter: grayscale(0%) contrast(105%) brightness(100%);
  transform: scale(1.05);
}

/* CTA Button shifted downwards */
.cta-wrapper {
  margin-top: 1rem;
  margin-bottom: 3.5rem;
  position: relative;
  z-index: 5;
}

.btn-white-pill {
  background: #ffffff;
  color: #000000;
  border: none;
  padding: 0.8rem 2.5rem;
  font-family: 'Manrope', sans-serif;
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.btn-white-pill:hover {
  background: #000000;
  color: #ffffff;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

/* Bottom Infinite Loop Marquee Banner shifted up visually without affecting lower sections */
.bottom-marquee-bar {
  width: 100%;
  background: #000000;
  color: #ffffff;
  padding: 0.9rem 0;
  overflow: hidden;
  position: relative;
  transform: translateY(-35px);
  margin-bottom: -35px;
  z-index: 10;
}

.marquee-track {
  display: flex;
  white-space: nowrap;
  animation: marqueeLoop 20s linear infinite;
  width: max-content;
}

.marquee-content {
  display: inline-flex;
  align-items: center;
  gap: 2rem;
  padding-right: 2rem;
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.05rem, 1.7vw, 1.35rem);
  font-weight: 300;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.marquee-content strong {
  font-weight: 800;
  color: #ffffff;
}

.star-icon {
  color: #ffffff;
  font-size: 1.35rem;
}

@keyframes marqueeLoop {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Responsive Rules for Mobile and Tablet */
@media (max-width: 1360px) {
  .registration-card-wrapper {
    width: 94%;
  }
}

@media (max-width: 860px) {
  .registration-card-wrapper {
    padding: 2.5rem 1rem 0;
    width: 94%;
  }

  .register-header {
    margin-bottom: -2rem;
  }

  .tickets-container {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .ticket-card {
    width: 100%;
    max-width: 400px;
  }
}

@media (max-width: 640px) {
  .registration-section {
    padding: 1.2rem 0 0;
  }

  .registration-card-wrapper {
    padding: 2rem 0.8rem 1.8rem;
    width: 100%;
    border-radius: 0;
    margin-bottom: 0;
  }

  .tickets-container {
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
    max-width: 420px;
    width: 92%;
    margin-bottom: 2rem;
  }

  .ticket-card {
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }

  .card-top-content {
    padding: 1.2rem 1.1rem 1rem;
    min-height: 140px;
  }

  .ticket-title {
    font-size: 1.45rem;
    margin-bottom: 0.5rem;
  }

  .price-badge {
    font-size: 0.85rem;
    padding: 0.2rem 0.55rem;
  }

  .savings-text {
    font-size: 0.65rem;
  }

  .card-image-box {
    height: 125px;
  }

  .cta-wrapper {
    margin-bottom: 0.8rem;
  }

  .btn-white-pill {
    padding: 0.7rem 1.8rem;
    font-size: 0.8rem;
  }

  /* Slimmer full-width bottom marquee bar tightly connected without gaps */
  .bottom-marquee-bar {
    width: 100%;
    padding: 0.35rem 0;
    margin: 0;
    transform: none;
    background: #000000;
    overflow: hidden;
  }

  .marquee-content {
    font-size: 0.76rem;
    gap: 1rem;
    padding-right: 1rem;
  }

  .star-icon {
    font-size: 0.85rem;
  }
}
</style>
