// Modern JavaScript for enhanced user experience
(() => {
    'use strict'
  
    // Form validation
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'

    // Enhanced image loading with error handling
    function handleImageLoading() {
        const images = document.querySelectorAll('.card-img-top, .main-image')
        images.forEach(img => {
            // Don't hide images initially - show them right away
            img.style.opacity = '1'
            img.style.transition = 'opacity 0.3s ease'
            
            // Add loading class for skeleton animation
            if (!img.complete) {
                img.classList.add('loading')
            }
            
            img.addEventListener('load', function() {
                this.style.opacity = '1'
                this.classList.remove('loading')
                this.classList.add('loaded')
            })
            
            img.addEventListener('error', function() {
                console.warn('Image failed to load, using fallback:', this.src)
                this.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60'
                this.style.opacity = '1'
                this.classList.remove('loading')
                this.classList.add('loaded')
            })
        })
    }

    // Navbar scroll effect
    function handleNavbarScroll() {
        const navbar = document.querySelector('.navbar')
        if (!navbar) return

        let lastScrollTop = 0
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)'
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)'
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
        })
    }

    // Search functionality
    function handleSearch() {
        const searchForm = document.querySelector('.modern-search')
        const searchInput = document.querySelector('.search-inp')
        
        if (searchForm && searchInput) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const query = searchInput.value.trim()
                
                if (query) {
                    // Add loading state
                    const searchBtn = searchForm.querySelector('.search-btn')
                    const originalHTML = searchBtn.innerHTML
                    searchBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>'
                    
                    // Simulate search (replace with actual search logic)
                    setTimeout(() => {
                        searchBtn.innerHTML = originalHTML
                        // window.location.href = `/listings?search=${encodeURIComponent(query)}`
                        console.log('Searching for:', query)
                    }, 1000)
                }
            })
        }
    }

    // Intersection Observer for animations
    function setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1'
                    entry.target.style.transform = 'translateY(0)'
                }
            })
        }, observerOptions)

        // Observe listing cards
        const cards = document.querySelectorAll('.listing-card')
        cards.forEach((card, index) => {
            card.style.opacity = '0'
            card.style.transform = 'translateY(20px)'
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
            observer.observe(card)
        })
    }

    // Toast notifications
    function showToast(message, type = 'info') {
        const toast = document.createElement('div')
        toast.className = `toast-notification toast-${type}`
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fa-solid fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `
        
        const style = document.createElement('style')
        style.textContent = `
            .toast-notification {
                position: fixed;
                top: 100px;
                right: 24px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                padding: 16px 20px;
                z-index: 1050;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                border-left: 4px solid var(--primary-color);
            }
            .toast-notification.toast-success { border-left-color: #10B981; }
            .toast-notification.toast-error { border-left-color: #EF4444; }
            .toast-notification.show { transform: translateX(0); }
            .toast-content { display: flex; align-items: center; gap: 12px; }
            .toast-content i { color: var(--primary-color); }
        `
        
        if (!document.querySelector('#toast-styles')) {
            style.id = 'toast-styles'
            document.head.appendChild(style)
        }
        
        document.body.appendChild(toast)
        
        setTimeout(() => toast.classList.add('show'), 100)
        setTimeout(() => {
            toast.classList.remove('show')
            setTimeout(() => toast.remove(), 300)
        }, 3000)
    }

    // Initialize all functionality
    document.addEventListener('DOMContentLoaded', () => {
        handleImageLoading()
        handleNavbarScroll()
        handleSearch()
        setupAnimations()
        
        // Add global error handling
        window.addEventListener('error', (e) => {
            console.error('JavaScript error:', e.error)
        })
        
        // Expose toast function globally
        window.showToast = showToast
    })

    // User menu functionality (if implemented)
    const userMenu = document.querySelector('.user-menu')
    if (userMenu) {
        userMenu.addEventListener('click', (e) => {
            e.preventDefault()
            // Toggle user dropdown (implement as needed)
            console.log('User menu clicked')
        })
    }

})()

// Additional utility functions
window.utils = {
    formatPrice: (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price)
    },
    
    debounce: (func, wait) => {
        let timeout
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout)
                func(...args)
            }
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
        }
    },
    
    throttle: (func, limit) => {
        let inThrottle
        return function() {
            const args = arguments
            const context = this
            if (!inThrottle) {
                func.apply(context, args)
                inThrottle = true
                setTimeout(() => inThrottle = false, limit)
            }
        }
    }
}