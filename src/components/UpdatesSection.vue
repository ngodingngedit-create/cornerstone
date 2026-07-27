<template>
  <section id="updates" class="updates-section">
    <div class="updates-container">
      <!-- Centered White Card Background Wrapper -->
      <div class="updates-white-wrapper">
        <!-- White Top Header Block -->
        <div class="updates-white-card">
          <h2 class="updates-title font-tech">
            LATEST UPDATE FROM<br />
            @ROOTEDRELEVANTCOLLECTIVE
          </h2>
          <p class="updates-subtitle font-tech">Tag us to be featured!</p>
        </div>

        <!-- Overhanging Black Filmstrip Strip (Extending 100vw full width edge-to-edge) -->
        <div class="filmstrip-overhang-container">
          <!-- Top Sprocket Holes Bar (Infinite CSS Gradient Pattern) -->
          <div class="sprocket-holes-bar"></div>

          <!-- Horizontal Scrollable Photos Row -->
          <div class="filmstrip-photos-row">
            <div 
              v-for="(photo, index) in updatesPhotos" 
              :key="index"
              class="film-photo-card"
            >
              <img :src="photo.url" :alt="photo.caption" class="film-img" />
            </div>
          </div>

          <!-- Bottom Sprocket Holes Bar (Infinite CSS Gradient Pattern) -->
          <div class="sprocket-holes-bar"></div>
        </div>

        <!-- White Footer Block Extension -->
        <div class="updates-white-footer"></div>
      </div>
    </div>

    <!-- Bottom Gradient Fade to Black transitioning seamlessly into Footer -->
    <div class="bottom-gradient-fade"></div>
  </section>
</template>

<script setup>
const updatesPhotos = [
  {
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
    caption: 'Cheering youth audience'
  },
  {
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    caption: 'Team group gathering'
  },
  {
    url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80',
    caption: 'Speaker on stage'
  },
  {
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
    caption: 'Female worship leader'
  },
  {
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
    caption: 'Concert stage band'
  },
  {
    url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80',
    caption: 'Interactive workshop session'
  },
  {
    url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=600&q=80',
    caption: 'Youth fellowship gathering'
  },
  {
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
    caption: 'Night concert praise & worship'
  },
  {
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
    caption: 'Stage lighting and production'
  },
  {
    url: 'https://images.unsplash.com/photo-1508997449629-303059a039c0?auto=format&fit=crop&w=600&q=80',
    caption: 'R2C team celebration'
  }
]
</script>

<style scoped>
.updates-section {
  padding: 0 2rem 5rem;
  background: transparent;
  color: #000000;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.bottom-gradient-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 250px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.85) 70%, #000000 100%);
  pointer-events: none;
  z-index: 1;
}

.updates-container {
  max-width: 1430px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
}

/* Centered White Card Background Wrapper */
.updates-white-wrapper {
  background: #ffffff;
  border-radius: 4px;
  position: relative;
  max-width: 1220px;
  margin: 0 auto;
  width: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

/* White Top Header Block */
.updates-white-card {
  background: #ffffff;
  padding: 3.5rem 3.5rem 2.2rem;
  border-radius: 4px 4px 0 0;
}

.updates-title {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.8rem, 4vw, 3.2rem);
  font-weight: 900;
  color: #000000;
  line-height: 1.05;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.updates-subtitle {
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #555555;
  margin-top: 1rem;
}

/* Overhanging Black Filmstrip Strip (Full Viewport Width edge to edge) */
.filmstrip-overhang-container {
  background: #000000;
  padding: 0.6rem 0;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  z-index: 10;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.7);
  border-radius: 0;
}

/* Sprocket Holes Bar (Infinite CSS Gradient Pattern across 100% full width) */
.sprocket-holes-bar {
  width: 100%;
  height: 14px;
  background-color: #000000;
  background-image: repeating-linear-gradient(
    90deg,
    #ffffff 0px,
    #ffffff 10px,
    transparent 10px,
    transparent 22px
  );
  margin: 0.3rem 0;
}

/* Horizontal Scrollable Photos Row */
.filmstrip-photos-row {
  display: flex;
  gap: 0.8rem;
  padding: 0.4rem 0.6rem;
  background: #000000;
  width: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  /* Hide Scrollbar */
  -ms-overflow-style: none;  /* IE & Edge */
  scrollbar-width: none;  /* Firefox */
}

.filmstrip-photos-row::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.film-photo-card {
  flex: 0 0 280px;
  height: 240px;
  background: #111111;
  overflow: hidden;
  scroll-snap-align: start;
}

.film-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease, filter 0.35s ease;
}

.film-photo-card:hover .film-img {
  transform: scale(1.05);
}

/* White Footer Block Extension */
.updates-white-footer {
  background: #ffffff;
  height: 45px;
  border-radius: 0 0 4px 4px;
}

/* Responsive Rules */
@media (max-width: 1024px) {
  .film-photo-card {
    flex: 0 0 240px;
    height: 210px;
  }
}

@media (max-width: 768px) {
  .updates-section {
    padding: 0 0.8rem 4rem;
  }

  .updates-container {
    padding: 0 0.8rem;
  }

  .updates-white-card {
    padding: 1.2rem 0.9rem 0.8rem;
  }

  .updates-title {
    font-size: 0.88rem;
    line-height: 1.2;
    letter-spacing: -0.01em;
    font-weight: 800;
  }

  .updates-subtitle {
    font-size: 0.72rem;
    margin-top: 0.35rem;
  }

  .filmstrip-overhang-container {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }

  .film-photo-card {
    flex: 0 0 180px;
    height: 155px;
  }

  .sprocket-holes-bar {
    height: 9px;
    background-image: repeating-linear-gradient(
      90deg,
      #ffffff 0px,
      #ffffff 6px,
      transparent 6px,
      transparent 14px
    );
  }
}
</style>
