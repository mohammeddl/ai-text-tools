// Utility functions for Fxotary theme

export const fxotaryUtility = {
  customMouse(): void {
    // Custom cursor functionality - enhanced version
    if (typeof window === 'undefined') return;
    
    // Check if device has fine pointer (mouse/trackpad)
    const hasFinePtrDevice = window.matchMedia('(pointer: fine)').matches;
    const isDesktop = window.matchMedia('(min-width: 1025px)').matches;
    
    if (!hasFinePtrDevice || !isDesktop) return;

    const cursor = document.querySelector('#ball') as HTMLElement;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    const smoothness = 0.12; // Smooth following

    // Smooth cursor animation with RAF
    const animateCursor = () => {
      const deltaX = mouseX - cursorX;
      const deltaY = mouseY - cursorY;
      
      cursorX += deltaX * smoothness;
      cursorY += deltaY * smoothness;
      
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      
      requestAnimationFrame(animateCursor);
    };

    // Mouse movement tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.opacity = '0.6';
    };

    // Interactive elements selector
    const interactiveSelectors = [
      'a', 'button', '.btn', '.c-pointer', 
      '[role="button"]', 'input[type="button"]', 
      'input[type="submit"]', '.clickable',
      '.hover-effect', '[data-cursor="pointer"]'
    ].join(', ');

    // Dynamic hover effects
    const addHoverEffects = () => {
      const elements = document.querySelectorAll(interactiveSelectors);
      
      const handleEnter = () => cursor.classList.add('hover');
      const handleLeave = () => cursor.classList.remove('hover');
      
      elements.forEach(el => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);
      });
    };

    // Window visibility handlers
    const handleVisibilityChange = () => {
      cursor.style.opacity = document.hidden ? '0' : '0.6';
    };

    const handleWindowLeave = () => {
      cursor.style.opacity = '0';
    };

    const handleWindowEnter = () => {
      cursor.style.opacity = '0.6';
    };

    // Initialize event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('mouseleave', handleWindowLeave);
    document.addEventListener('mouseenter', handleWindowEnter);
    
    // Initial setup
    addHoverEffects();
    animateCursor();
    
    // Re-apply hover effects when DOM changes (for dynamic content)
    const observer = new MutationObserver(addHoverEffects);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    console.log('✅ Custom cursor initialized');
  },

  imgToSVG(): void {
    // Image to SVG conversion
    console.log('imgToSVG initialized');
  },

  buttonHover(): void {
    // Button hover effects
    console.log('buttonHover initialized');
  },

  lenisScrollAnimation(): void {
    // Lenis scroll animation
    console.log('lenisScrollAnimation initialized');
  },

  scrollAnimation(): void {
    // Scroll animations
    console.log('scrollAnimation initialized');
  },

  scrollTextAnimation(): void {
    // Text scroll animations
    console.log('scrollTextAnimation initialized');
  },

  scrollBtn(): void {
    // Scroll to top button functionality
    const scrollBtn = document.querySelector('.tf__scroll_btn') as HTMLElement;
    if (!scrollBtn) return;

    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        scrollBtn.style.display = 'block';
      } else {
        scrollBtn.style.display = 'none';
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  },

  stickyNav(): void {
    // Sticky navigation functionality
    let prevScrollpos = window.pageYOffset;
    
    window.addEventListener('scroll', () => {
      const currentScrollpos = window.pageYOffset;
      const mainMenu = document.querySelector('.main_menu') as HTMLElement;
      
      if (!mainMenu) return;

      if (prevScrollpos > currentScrollpos) {
        mainMenu.style.top = '0';
      } else {
        mainMenu.style.top = '-100px';
      }

      prevScrollpos = currentScrollpos;
    });
  }
};