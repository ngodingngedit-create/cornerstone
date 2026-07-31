<template>
  <section id="agenda" class="schedule-section">
    <!-- Background overlay image2262.png -->
    <div class="bg-overlay-2262"></div>

    <div class="schedule-container">
      <div class="agenda-outer-wrapper">
        <!-- DAY 1 / DAY 2 Tabs -->
        <div class="tabs-header-row">
          <button 
            class="tab-box" 
            :class="{ 'is-active': activeDay === 1 }"
            @click="activeDay = 1"
          >
            <span class="tab-label font-display">DAY 1</span>
            <span v-if="activeDay === 1" class="tab-line"></span>
          </button>

          <button 
            class="tab-box" 
            :class="{ 'is-active': activeDay === 2 }"
            @click="activeDay = 2"
          >
            <span class="tab-label font-display">DAY 2</span>
            <span v-if="activeDay === 2" class="tab-line"></span>
          </button>
        </div>

        <!-- Outer Frame Box using Rectangle 201.avif background -->
        <div class="outer-border-frame">
          <!-- Inset Separate Inner Table Card -->
          <div class="inner-table-card">
            <!-- Black Pill Dropdown Header Bar -->
            <div class="date-dropdown-bar">
              <span class="date-text font-tech">{{ activeDay === 1 ? 'FRIDAY, 19 FEBRUARY' : 'SATURDAY, 20 FEBRUARY' }}</span>
              <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>

            <!-- Table Rows List -->
            <div class="agenda-table">
              <div 
                v-for="(item, index) in currentSchedule" 
                :key="index"
                class="agenda-row"
              >
                <div class="time-column font-tech">{{ item.time }}</div>
                <div class="title-column font-tech">{{ item.title }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Smooth Gradient Fade to Black transitioning into Speakers Section -->
    <div class="bottom-gradient-fade"></div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeDay = ref(1)

const day1Schedule = [
  { time: '13.00 - 15.00', title: 'Check-in & Registration' },
  { time: '13.00 - 15.00', title: 'Welcome & Opening Worship' },
  { time: '13.00 - 15.00', title: 'Plenary 1A: Why R2C & Why Next Gen?' },
  { time: '13.00 - 15.00', title: 'Plenary 1B: The Church Needs to Change' },
  { time: '13.00 - 15.00', title: 'Q&A' },
  { time: '13.00 - 15.00', title: 'Closing & Announcement' },
  { time: '13.00 - 15.00', title: 'Break' },
  { time: '13.00 - 15.00', title: 'Dinner' }
]

const day2Schedule = [
  { time: '13.00 - 15.00', title: 'Check-in & Morning Gathering' },
  { time: '13.00 - 15.00', title: 'Plenary 2A: Discipling the Next Generation' },
  { time: '13.00 - 15.00', title: 'Plenary 2B: Empowering Youth Leaders' },
  { time: '13.00 - 15.00', title: 'Interactive Masterclass Sessions' },
  { time: '13.00 - 15.00', title: 'Q&A & Panel Discussion' },
  { time: '13.00 - 15.00', title: 'Grand Finale & Closing' },
  { time: '13.00 - 15.00', title: 'Break' },
  { time: '13.00 - 15.00', title: 'Dinner & Fellowship' }
]

const currentSchedule = computed(() => activeDay.value === 1 ? day1Schedule : day2Schedule)
</script>

<style scoped>
.schedule-section {
  padding: 5rem 2rem 7rem;
  background-image: url('/Background 1.avif');
  background-size: cover;
  background-position: center 30%;
  background-repeat: no-repeat;
  position: relative;
  width: 100%;
  overflow: hidden;
}

.bg-overlay-2262 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/image2262.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.20;
  pointer-events: none;
  z-index: 1;
}

.bottom-gradient-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 220px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 60%, #000000 100%);
  pointer-events: none;
  z-index: 3;
}

.schedule-container {
  max-width: 980px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.agenda-outer-wrapper {
  width: 100%;
  position: relative;
}

/* Tabs Header Row */
.tabs-header-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: 2rem;
  margin-bottom: -0.2rem;
  position: relative;
  z-index: 5;
}

.tab-box {
  padding: 0.6rem 2.2rem 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  position: relative;
  background: rgba(70, 58, 52, 0.75);
  backdrop-filter: blur(8px);
  transition: all 0.25s ease;
}

.tab-box.is-active {
  background: #000000;
  border: none;
  z-index: 6;
}

.tab-label {
  font-size: clamp(2rem, 3.8vw, 2.5rem);
  font-weight: 300;
  color: #ffffff;
  line-height: 1;
  letter-spacing: 0.05em;
}

.tab-box:not(.is-active) .tab-label {
  opacity: 0.95;
}

.tab-line {
  width: 100%;
  height: 2px;
  background: #ffffff;
  margin-top: 0.4rem;
}

/* Outer Border Frame using Rectangle 201.avif background image */
.outer-border-frame {
  border: none;
  background-image: url('/Rectangle 201.avif');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 2.2rem 2.5rem 2.5rem;
  position: relative;
  width: 100%;
}

/* Inset Separate Inner Table Card */
.inner-table-card {
  width: 100%;
  background: rgba(10, 20, 45, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  overflow: hidden;
  padding: 0;
}

/* Black Pill Header Bar */
.date-dropdown-bar {
  background: #000000;
  padding: 1.1rem 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.date-text {
  font-family: 'Manrope', sans-serif;
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #ffffff;
  text-transform: uppercase;
}

.chevron-icon {
  width: 18px;
  height: 18px;
  color: rgba(255, 255, 255, 0.5);
  transition: transform 0.25s ease;
}

.date-dropdown-bar:hover .chevron-icon {
  color: #ffffff;
}

/* Table rows inside separate table card */
.agenda-table {
  display: flex;
  flex-direction: column;
}

.agenda-row {
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
  padding: 1.35rem 1.6rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  transition: background 0.25s ease;
}

.agenda-row:last-child {
  border-bottom: none;
}

.agenda-row:hover {
  background: rgba(255, 255, 255, 0.05);
}

.time-column {
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.02em;
}

.title-column {
  font-family: 'Manrope', sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  color: #ffffff;
  letter-spacing: -0.01em;
}

/* Responsive styles */
@media (max-width: 768px) {
  .schedule-section {
    padding: 1.2rem 0.8rem 4rem;
  }

  .tabs-header-row {
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    white-space: nowrap;
    gap: 0.6rem;
    width: 100%;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .tabs-header-row::-webkit-scrollbar {
    display: none;
  }

  .tab-box {
    padding: 0.45rem 1.3rem 0.35rem;
    flex: 0 0 auto;
    white-space: nowrap;
  }

  .tab-label {
    font-size: 1.25rem;
    white-space: nowrap;
  }

  .outer-border-frame {
    padding: 1rem 0.75rem 1.2rem;
  }

  .agenda-row {
    grid-template-columns: 105px 1fr;
    padding: 0.85rem 0.6rem;
    gap: 0.6rem;
  }

  .time-column {
    font-size: 0.76rem;
  }

  .title-column {
    font-size: 0.82rem;
    line-height: 1.35;
  }
}
</style>
