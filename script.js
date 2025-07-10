// ========== METHODOLOGY SECTION (NO TOGGLE) ==========
// Toggle functionality removed - now using single merged view

// ========== FLOWCHART POPUP ==========
document.addEventListener('DOMContentLoaded', () => {
  const flowchartBtn = document.getElementById('flowchart-btn');
  const popup = document.getElementById('flowchart-popup');
  const closeBtn = document.getElementById('close-popup');

  if (flowchartBtn && popup && closeBtn) {
    flowchartBtn.addEventListener('click', () => {
      popup.classList.remove('hidden');
      popup.classList.add('show');
    });

    closeBtn.addEventListener('click', () => {
      popup.classList.remove('show');
      popup.classList.add('hidden');
    });

    // Close on outside click
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.classList.remove('show');
        popup.classList.add('hidden');
      }
    });
  }
});

// ========== SMOOTH SCROLL ON SCROLL INDICATOR ==========
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    const targetSection = document.querySelector('.section');
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
}

// ================= SIDE NAVIGATION ================= 
// Smooth scroll to section function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Update active navigation dot on scroll
function updateActiveNavDot() {
  const sections = ['hero', 'motivation', 'objectives', 'methodology', 'results'];
  const navDots = document.querySelectorAll('.nav-dot');
  
  let current = '';
  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        current = sectionId;
      }
    }
  });
  
  navDots.forEach((dot, index) => {
    dot.classList.remove('active');
    if (sections[index] === current) {
      dot.classList.add('active');
    }
  });
}

// Add scroll listener for navigation
window.addEventListener('scroll', updateActiveNavDot);

// ========== SCENE DECOMPOSITION SWITCHER ==========
let isShowingBackground = true;

function switchSceneMedia() {
  const sceneImage = document.getElementById('scene-media');
  const poseImage = document.getElementById('pose-media');
  const switchBtn = document.querySelector('.scene-switch-arrow');
  
  if (isShowingBackground) {
    // Switch to pose estimation
    sceneImage.classList.add('hidden');
    poseImage.classList.remove('hidden');
    switchBtn.textContent = '←';
    isShowingBackground = false;
  } else {
    // Switch back to background
    sceneImage.classList.remove('hidden');
    poseImage.classList.add('hidden');
    switchBtn.textContent = '→';
    isShowingBackground = true;
  }
}

// ========== EXPANDABLE MODAL FUNCTIONALITY (Legacy - kept for compatibility) ==========
function openGifModal(gifSrc, caption) {
  const modal = document.getElementById('gif-modal');
  const modalImage = document.getElementById('gif-modal-image');
  const modalCaption = document.getElementById('gif-modal-caption');
  
  if (modal && modalImage && modalCaption) {
    modalImage.src = gifSrc;
    modalImage.alt = caption;
    modalCaption.textContent = caption;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

function closeGifModal() {
  const modal = document.getElementById('gif-modal');
  
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restore scrolling
  }
}

// Initialize modal event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('gif-modal');
  const closeBtn = document.getElementById('gif-modal-close');
  
  if (modal && closeBtn) {
    // Close modal when clicking the X button
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeGifModal();
    });
    
    // Close modal when clicking outside the content
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeGifModal();
      }
    });
    
    // Prevent modal from closing when clicking on the content
    const modalContent = modal.querySelector('.gif-modal-content');
    if (modalContent) {
      modalContent.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeGifModal();
      }
    });
  }
});

// ========== HORIZONTAL ROADMAP TIMELINE ==========
function updateRoadmapTimeline() {
  const roadmapSection = document.querySelector('.roadmap-section');
  const timelineProgress = document.getElementById('timeline-progress');
  const achievementCards = document.querySelectorAll('.achievement-card');
  const monthMarkers = document.querySelectorAll('.month-marker');
  
  if (!roadmapSection || !timelineProgress) return;
  
  const sectionTop = roadmapSection.offsetTop;
  const sectionHeight = roadmapSection.offsetHeight;
  const scrollTop = window.pageYOffset;
  const windowHeight = window.innerHeight;
  
  // Calculate how much of the section is visible
  const sectionProgress = Math.max(0, Math.min(1, 
    (scrollTop + windowHeight - sectionTop) / (sectionHeight + windowHeight)
  ));
  
  // Update the timeline progress bar
  const progressPercent = Math.min(100, sectionProgress * 120);
  timelineProgress.style.width = `${progressPercent}%`;
  
  // Animate achievement cards and month markers based on scroll
  achievementCards.forEach((card, index) => {
    const cardThreshold = (index + 1) / (achievementCards.length + 1) * 0.1;
    const cardPosition = parseFloat(card.style.left) / 100; // Get position from left style
    
    // Use both scroll progress and card position for animation timing
    const animationThreshold = Math.max(cardThreshold, cardPosition * 0.2);
    
    if (sectionProgress > animationThreshold) {
      card.classList.add('visible');
      
      // Add active class for extra emphasis on current card
      const activeThreshold = animationThreshold + 0.1;
      if (sectionProgress > activeThreshold && sectionProgress < activeThreshold + 0.2) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    } else {
      card.classList.remove('visible', 'active');
    }
  });
  
  // Animate month markers
  monthMarkers.forEach((marker, index) => {
    const markerThreshold = (index + 1) / (monthMarkers.length + 1) * 0.7;
    
    if (sectionProgress > markerThreshold) {
      marker.classList.add('active');
    } else {
      marker.classList.remove('active');
    }
  });
}

// Add click handlers for month markers
function initializeRoadmapInteractivity() {
  const monthMarkers = document.querySelectorAll('.month-marker');
  const achievementCards = document.querySelectorAll('.achievement-card');
  
  monthMarkers.forEach((marker, index) => {
    marker.addEventListener('click', () => {
      // Remove active from all cards and markers
      achievementCards.forEach(card => card.classList.remove('active'));
      monthMarkers.forEach(m => m.classList.remove('active'));
      
      // Activate clicked marker and corresponding card
      marker.classList.add('active');
      if (achievementCards[index]) {
        achievementCards[index].classList.add('active');
      }
    });
  });
}

// Initialize roadmap timeline
document.addEventListener('DOMContentLoaded', () => {
  // Initialize performance optimizations first
  const lazyLoader = new LazyLoader();
  const performanceMonitor = new PerformanceMonitor();
  
  // Initialize video systems
  const hoverPlayManager = new HoverPlayManager();
  const videoPerformanceManager = new VideoPerformanceManager();
  
  // Optimize GIF loading
  optimizeGifLoading();
  
  // Initialize roadmap functionality
  updateRoadmapTimeline();
  initializeRoadmapInteractivity();
  
  // Initialize expandable videos
  initializeExpandableVideos();
  
  // Add resize listener to recalculate positions
  window.addEventListener('resize', () => {
    // Debounce resize events too
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(updateRoadmapTimeline, 100);
  });
  
  // Stop all videos when page becomes hidden (performance)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      hoverPlayManager.stopAllVideos();
    }
  });
});

// ========== LAZY LOADING OPTIMIZATION ==========
class LazyLoader {
  constructor() {
    this.imageObserver = null;
    this.videoObserver = null;
    this.init();
  }

  init() {
    // Only proceed if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
      this.setupImageObserver();
      this.setupVideoObserver();
      this.observeElements();
    } else {
      // Fallback for older browsers - load everything immediately
      this.loadAllMedia();
    }
  }

  setupImageObserver() {
    this.imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          this.imageObserver.unobserve(entry.target);
        }
      });
    }, {
      // Start loading when element is 200px away from viewport
      rootMargin: '200px 0px',
      threshold: 0.01
    });
  }

  setupVideoObserver() {
    this.videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadVideo(entry.target);
          this.videoObserver.unobserve(entry.target);
        }
      });
    }, {
      // Start loading when element is 300px away from viewport
      rootMargin: '300px 0px',
      threshold: 0.01
    });
  }

  loadImage(img) {
    const src = img.getAttribute('data-src');
    if (src) {
      // Create a new image to preload
      const newImg = new Image();
      newImg.onload = () => {
        img.src = src;
        img.classList.add('loaded');
        // Remove data-src to prevent re-loading
        img.removeAttribute('data-src');
      };
      newImg.onerror = () => {
        console.warn('Failed to load image:', src);
        img.classList.add('loaded'); // Remove loading state even on error
      };
      newImg.src = src;
    }
  }

  loadVideo(video) {
    const src = video.getAttribute('data-src');
    if (src) {
      // Load video source
      const sources = video.querySelectorAll('source[data-src]');
      sources.forEach(source => {
        const sourceSrc = source.getAttribute('data-src');
        source.src = sourceSrc;
        source.removeAttribute('data-src');
      });
      
      if (src) {
        video.src = src;
      }
      
      video.classList.add('loaded');
      video.removeAttribute('data-src');
      
      // Load video when it's in view
      video.load();
    }
  }

  observeElements() {
    // Observe all lazy-load images
    const lazyImages = document.querySelectorAll('.lazy-load[data-src]');
    lazyImages.forEach(img => {
      this.imageObserver.observe(img);
    });

    // Observe all lazy-load videos
    const lazyVideos = document.querySelectorAll('.lazy-video[data-src]');
    lazyVideos.forEach(video => {
      this.videoObserver.observe(video);
    });
  }

  loadAllMedia() {
    // Fallback for browsers without Intersection Observer
    const lazyImages = document.querySelectorAll('.lazy-load[data-src]');
    lazyImages.forEach(img => this.loadImage(img));

    const lazyVideos = document.querySelectorAll('.lazy-video[data-src]');
    lazyVideos.forEach(video => this.loadVideo(video));
  }
}

// ========== PERFORMANCE MONITORING ==========
class PerformanceMonitor {
  constructor() {
    this.init();
  }

  init() {
    // Debounce scroll events for better performance
    this.debounceScrollEvents();
    
    // Monitor FPS if possible
    if (window.requestAnimationFrame) {
      this.monitorFPS();
    }
  }

  debounceScrollEvents() {
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.addEventListener('scroll', () => {
      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Set new timeout
      scrollTimeout = setTimeout(() => {
        // Call original scroll handlers
        if (typeof updateActiveNavDot === 'function') {
          updateActiveNavDot();
        }
        if (typeof updateRoadmapTimeline === 'function') {
          updateRoadmapTimeline();
        }
      }, 10); // 10ms debounce
    }, { passive: true });
  }

  monitorFPS() {
    let lastTime = performance.now();
    let frames = 0;
    
    const checkFPS = (currentTime) => {
      frames++;
      if (currentTime - lastTime >= 1000) {
        const fps = frames;
        frames = 0;
        lastTime = currentTime;
        
        // Log low FPS warnings
        if (fps < 30) {
          console.warn('Low FPS detected:', fps);
        }
      }
      requestAnimationFrame(checkFPS);
    };
    
    requestAnimationFrame(checkFPS);
  }
}

// ========== IMAGE COMPRESSION HELPER ==========
function optimizeGifLoading() {
  // Add intersection observer for GIF images specifically
  const gifImages = document.querySelectorAll('img[src*=".gif"], img[data-src*=".gif"]');
  
  if ('IntersectionObserver' in window) {
    const gifObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          // Only start GIF animation when in view
          if (img.src && img.src.includes('.gif')) {
            img.style.animationPlayState = 'running';
          }
        } else {
          const img = entry.target;
          // Pause GIF animation when out of view
          if (img.src && img.src.includes('.gif')) {
            img.style.animationPlayState = 'paused';
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    gifImages.forEach(img => gifObserver.observe(img));
  }
}

// ========== HOVER-TO-PLAY VIDEO FUNCTIONALITY ==========
class HoverPlayManager {
  constructor() {
    this.activeVideos = new Set();
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupHoverPlayVideos());
    } else {
      this.setupHoverPlayVideos();
    }
  }

  setupHoverPlayVideos() {
    const hoverPlayVideos = document.querySelectorAll('.hover-play');
    
    hoverPlayVideos.forEach(videoElement => {
      // Add event listeners for hover play functionality
      videoElement.addEventListener('mouseenter', () => this.startPlayback(videoElement));
      videoElement.addEventListener('mouseleave', () => this.stopPlayback(videoElement));
      videoElement.addEventListener('click', () => this.togglePlayback(videoElement));
      
      // Handle video load events
      videoElement.addEventListener('loadeddata', () => {
        videoElement.classList.add('loaded');
        videoElement.classList.remove('loading');
      });
      
      videoElement.addEventListener('loadstart', () => {
        videoElement.classList.add('loading');
      });
    });
  }

  async startPlayback(videoElement) {
    try {
      // Don't start if already playing
      if (this.activeVideos.has(videoElement)) return;
      
      // Ensure video is loaded
      if (videoElement.readyState < 2) {
        videoElement.classList.add('loading');
        await this.ensureVideoLoaded(videoElement);
      }
      
      // Start playback
      await videoElement.play();
      this.activeVideos.add(videoElement);
      videoElement.classList.add('playing');
      videoElement.classList.remove('loading');
      
    } catch (error) {
      console.warn('Video playback failed:', error);
      videoElement.classList.remove('loading');
    }
  }

  stopPlayback(videoElement) {
    if (this.activeVideos.has(videoElement)) {
      videoElement.pause();
      videoElement.currentTime = 0; // Reset to beginning
      this.activeVideos.delete(videoElement);
      videoElement.classList.remove('playing');
    }
  }

  togglePlayback(videoElement) {
    if (this.activeVideos.has(videoElement)) {
      this.stopPlayback(videoElement);
    } else {
      this.startPlayback(videoElement);
    }
  }

  ensureVideoLoaded(videoElement) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Video load timeout'));
      }, 5000); // 5 second timeout

      const onLoadedData = () => {
        clearTimeout(timeout);
        videoElement.removeEventListener('loadeddata', onLoadedData);
        resolve();
      };

      videoElement.addEventListener('loadeddata', onLoadedData);
      
      // Trigger load if not already loading
      if (videoElement.readyState === 0) {
        videoElement.load();
      }
    });
  }

  // Stop all videos (useful for performance)
  stopAllVideos() {
    this.activeVideos.forEach(video => {
      this.stopPlayback(video);
    });
  }
}

// ========== EXPANDABLE VIDEO FUNCTIONALITY ==========
function initializeExpandableVideos() {
  const expandableVideos = document.querySelectorAll('.expandable-video');
  
  expandableVideos.forEach(video => {
    video.addEventListener('click', (e) => {
      // Don't interfere with hover-play functionality
      e.stopPropagation();
      
      const videoSrc = video.src || video.getAttribute('data-src');
      const caption = video.getAttribute('data-caption') || 'Video';
      
      if (videoSrc) {
        openVideoModal(videoSrc, caption);
      }
    });
  });
}

// ========== VIDEO MODAL FUNCTIONALITY ==========
function openVideoModal(videoSrc, caption) {
  const modal = document.getElementById('video-modal');
  const modalVideo = document.getElementById('video-modal-player');
  const modalCaption = document.getElementById('video-modal-caption');
  
  if (modal && modalVideo && modalCaption) {
    // Set video source
    modalVideo.innerHTML = `
      <source src="${videoSrc}" type="video/webm">
      <source src="${videoSrc.replace('.webm', '.mp4')}" type="video/mp4">
      Your browser does not support the video tag.
    `;
    
    modalCaption.textContent = caption;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Auto-play in modal
    modalVideo.load();
    modalVideo.play().catch(console.warn);
  }
}

function closeVideoModal() {
  const modal = document.getElementById('video-modal');
  const modalVideo = document.getElementById('video-modal-player');
  
  if (modal && modalVideo) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    // Stop video playback
    modalVideo.pause();
    modalVideo.currentTime = 0;
  }
}

// Initialize video modal event listeners
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('video-modal');
  const closeBtn = document.getElementById('video-modal-close');
  
  if (modal && closeBtn) {
    // Close modal when clicking the X button
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeVideoModal();
    });
    
    // Close modal when clicking outside the content
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeVideoModal();
      }
    });
    
    // Prevent modal from closing when clicking on the content
    const modalContent = modal.querySelector('.video-modal-content');
    if (modalContent) {
      modalContent.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeVideoModal();
      }
    });
  }
});

// ========== PERFORMANCE OPTIMIZATION FOR VIDEOS ==========
class VideoPerformanceManager {
  constructor() {
    this.visibilityObserver = null;
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.setupVisibilityObserver();
    }
  }

  setupVisibilityObserver() {
    this.visibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        
        if (!entry.isIntersecting) {
          // Pause videos that are out of view
          if (!video.paused) {
            video.pause();
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    // Observe all videos
    document.querySelectorAll('video').forEach(video => {
      this.visibilityObserver.observe(video);
    });
  }
}

// Initialize lazy loading and performance monitoring when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  new LazyLoader();
  new PerformanceMonitor();
  optimizeGifLoading();
  new HoverPlayManager();
  new VideoPerformanceManager();
});
