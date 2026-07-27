<template>
  <div class="ticker-wrapper">
    <div class="ticker-content font-tech">
      <div class="ticker-item" v-for="i in 4" :key="i">
        <span class="highlight-star">★</span>
        <span>R2C27 RELEVANT REVOLUTION</span>
        <span class="highlight-star">★</span>
        <span>19-20 FEBRUARY 2027</span>
        <span class="highlight-star">★</span>
        <span>THE HIVE @ HIVEMIND COLLECTIVE, BANDUNG</span>
        <span class="highlight-star">★</span>
        <span>LIMITED EARLY BIRD TICKETS AVAILABLE</span>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.ticker-wrapper {
  background: #ffffff;
  color: #050814;
  overflow: hidden;
  padding: 0.75rem 0;
  white-space: nowrap;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  position: relative;
  z-index: 10;
}

.ticker-content {
  display: inline-flex;
  gap: 2rem;
  animation: marquee 25s linear infinite;
  font-weight: 900;
  font-size: 0.85rem;
  letter-spacing: 0.15em;
}

.ticker-item {
  display: inline-flex;
  align-items: center;
  gap: 1.5rem;
}

.highlight-star {
  color: #ff5722;
  font-size: 1rem;
}

@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}
</style>
