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
          <!-- Horizontal Scrollable Photos Row -->
          <div class="filmstrip-photos-row">
            <div class="elfsight-app-dead5d6c-141a-44c1-8cc3-6aa100be5344" data-elfsight-app-lazy></div>
          </div>
          <!-- Black overlay block to cover the free branding logo -->
          <div class="elfsight-branding-cover"></div>
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
import { onMounted, onBeforeUnmount } from 'vue'

onMounted(() => {
  if (!document.getElementById('elfsight-platform-script')) {
    const script = document.createElement('script')
    script.id = 'elfsight-platform-script'
    script.src = 'https://elfsightcdn.com/platform.js'
    script.async = true
    document.body.appendChild(script)
  }

  // Helper to inject styling to hide Elfsight branding inside shadow DOM
  const injectStyleToShadowRoot = (shadowRoot) => {
    if (shadowRoot.getElementById('elfsight-custom-hide-style')) return
    const style = document.createElement('style')
    style.id = 'elfsight-custom-hide-style'
    style.textContent = `
      a[href*="elfsight.com"],
      [class*="eapps-link"],
      a[class*="Link__Component"] {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        height: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      /* Lower and shift the posts view slightly to the right in desktop mode */
      @media (min-width: 769px) {
        .eapps-instagram-feed-posts-view,
        [class*="posts-view"],
        [class*="PostsView__Container"] {
          margin-top: 24px !important;
          margin-left: 24px !important;
        }
      }
    `
    shadowRoot.appendChild(style)
  }

  // Scan elements for shadow DOMs inside updates section
  const checkShadowRoots = () => {
    const widgets = document.querySelectorAll('[class*="elfsight-app"]')
    widgets.forEach(widget => {
      if (widget.shadowRoot) {
        injectStyleToShadowRoot(widget.shadowRoot)
      }
      
      // Also check nested children that might contain shadow DOM
      const allElements = widget.querySelectorAll('*')
      allElements.forEach(el => {
        if (el.shadowRoot) {
          injectStyleToShadowRoot(el.shadowRoot)
        }
      })
    })
  }

  // Periodically check for shadow roots as the widget loads asynchronously
  const interval = setInterval(checkShadowRoots, 300)

  onBeforeUnmount(() => {
    clearInterval(interval)
  })
})
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

/* Horizontal Scrollable Photos Row */
.filmstrip-photos-row {
  display: block;
  padding: 3rem 1rem 1.5rem; /* Increased top padding in desktop mode */
  background: #000000;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
}

@media (min-width: 769px) {
  :deep(.eapps-instagram-feed-posts-view),
  :deep([class*="posts-view"]) {
    margin-top: 24px !important;
    margin-left: 24px !important;
  }
}

/* White Footer Block Extension */
.updates-white-footer {
  background: #ffffff;
  height: 45px;
  border-radius: 0 0 4px 4px;
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
    font-size: clamp(0.85rem, 4.5vw, 1.6rem);
    line-height: 1.2;
    letter-spacing: -0.01em;
    font-weight: 800;
    overflow-wrap: break-word;
  }

  .updates-subtitle {
    font-size: 0.9rem;
    margin-top: 0.35rem;
  }

  .filmstrip-photos-row {
    padding: 1rem 0.5rem;
  }

  .filmstrip-overhang-container {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }
}

.elfsight-branding-cover {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 340px;
  height: 80px;
  background: #000000;
  z-index: 999;
  pointer-events: none;
}

/* Hide Elfsight branding / logo link */
:deep(a[href*="elfsight.com"]),
:deep(.eapps-link),
:deep([class*="eapps-link"]) {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
  height: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
}
</style>
