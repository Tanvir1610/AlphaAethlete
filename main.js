// Razorpay Configuration
const RAZORPAY_KEY_ID = "rzp_live_ySJbCj6oQ0w7yy"

// Data Arrays
const features = [
  {
    icon: "📈",
    title: "Performance Focused",
    description: "Engineered for peak athletic performance with cutting-edge technology and materials.",
  },
  {
    icon: "🏆",
    title: "Premium Quality",
    description: "Crafted with the finest materials and attention to detail for lasting durability.",
  },
  {
    icon: "❤️",
    title: "Athlete Approved",
    description: "Tested and endorsed by professional athletes across various sports disciplines.",
  },
]

let wishlist = []

const products = [
  {
    id: 1,
    name: "Hoodie Sweatshirt Black",
    price: 1999,
    category: "Apparel",
    rating: 4.8,
    reviews: 124,
    image: "images/1.jpg",
    tagline: "Ultra-soft fleece. Athletic fit.",
  },
  {
    id: 2,
    name: "Hoodie Sweatshirt Black",
    price: 1999,
    category: "Apparel",
    rating: 4.6,
    reviews: 89,
    image: "images/2.jpg",
    tagline: "Everyday comfort, premium build.",
  },
  {
    id: 3,
    name: "Hoodie Sweatshirt Black",
    price: 1999,
    category: "Apparel",
    rating: 4.7,
    reviews: 156,
    image: "images/3.jpg",
    tagline: "Warmth without the bulk.",
  },
  {
    id: 4,
    name: "Hoodie Sweatshirt Black",
    price: 1999,
    category: "Apparel",
    rating: 4.9,
    reviews: 203,
    image: "images/4.jpg",
    tagline: "Signature silhouette. Timeless.",
  },
  {
    id: 5,
    name: "Hoodie Sweatshirt Black",
    price: 1999,
    category: "Apparel",
    rating: 4.7,
    reviews: 300,
    image: "images/5.jpg",
    tagline: "Durable knit. Travel-ready.",
  },
  {
    id: 6,
    name: "Hoodie Sweatshirt Beige",
    price: 1999,
    category: "Apparel",
    rating: 4.7,
    reviews: 273,
    image: "images/1 (1).jpg",
    tagline: "Cream tone. Premium fleece.",
  },
  {
    id: 7,
    name: "Hoodie Sweatshirt Beige",
    price: 1999,
    category: "Apparel",
    rating: 4.7,
    reviews: 273,
    image: "images/2 (1).jpg",
    tagline: "Neutral classic. Everyday wear.",
  },
  {
    id: 8,
    name: "Hoodie Sweatshirt Beige",
    price: 1999,
    category: "Apparel",
    rating: 4.7,
    reviews: 273,
    image: "images/3 (1).jpg",
    tagline: "Breathable and cozy.",
  },
  {
    id: 9,
    name: "Hoodie Sweatshirt Beige",
    price: 1999,
    category: "Apparel",
    rating: 4.7,
    reviews: 273,
    image: "images/4 (1).jpg",
    tagline: "Elevated basics, refined.",
  },
  {
    id: 10,
    name: "Hoodie Sweatshirt Beige",
    price: 1999,
    category: "Apparel",
    rating: 4.7,
    reviews: 273,
    image: "images/5 (1).jpg",
    tagline: "Minimalist aesthetic.",
  },
]

const collections = [
  {
    name: "Running Essentials",
    productCount: 24,
    image: "images/Running.jpg",
    variant: "female",
  },
  {
    name: "Gym & Training",
    productCount: 18,
    image: "images/Gym.jpg",
    variant: "male",
  },
  {
    name: "Outdoor Adventure",
    productCount: 32,
    image: "images/Adventure.jpeg",
    variant: "female",
  },
]

const testimonials = [
  {
    text: "AlphA Gear has completely transformed my training routine. The quality and performance are unmatched!",
    author: "Sarah Johnson",
    role: "Professional Marathon Runner",
  },
  {
    text: "I've tried many brands, but nothing compares to the comfort and durability of AlphA products.",
    author: "Mike Chen",
    role: "Olympic Weightlifter",
  },
  {
    text: "The attention to detail and innovative design make AlphA my go-to choice for all athletic wear.",
    author: "Emma Rodriguez",
    role: "Fitness Influencer",
  },
]

// Shopping Cart
let cart = []
let currentTestimonial = 0

// DOM Elements
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("navMenu")
const cartBtn = document.getElementById("cartBtn")
const cartModal = document.getElementById("cartModal")
const closeCart = document.getElementById("closeCart")
const cartCount = document.getElementById("cartCount")
const shopNowBtn = document.getElementById("shopNowBtn")
const checkoutBtn = document.getElementById("checkoutBtn")

// Cache sticky elements
const stickyCartBtn = document.getElementById("stickyCartBtn")
const stickyCartCount = document.getElementById("stickyCartCount")
const stickyWishBtn = document.getElementById("stickyWishBtn")
const wishlistCount = document.getElementById("wishlistCount")

// New Constants
const COLLECTIONS = ["All", "Running Essentials", "Gym & Training", "Outdoor Adventure"]
const collectionColors = {
  "Running Essentials": "#2dd4bf", // teal
  "Gym & Training": "#f59e0b", // amber
  "Outdoor Adventure": "#10b981", // emerald
}
const genderColors = {
  male: getComputedStyle(document.documentElement).getPropertyValue("--cursor-male")?.trim() || "#0ea5e9",
  female: getComputedStyle(document.documentElement).getPropertyValue("--cursor-female")?.trim() || "#ec4899",
  unisex: "#111111",
}
let currentCollectionFilter = "All"

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderFeatures()
  renderFilterToolbar() // add toolbar render
  renderProducts()
  renderCollections()
  renderTestimonials()
  initializeCarousel()
  initializeNavigation()
  initializeCart()
  initializeNewsletter()
  applyRevealAnimations()
  initStickyActions()
  initCustomCursor()
  initMagneticButtons()
  initTilt(".collection-card.enable-tilt")
  initTilt(".product-card .enable-tilt")
  wireCursorAccents()
  initRipple()
})

// Navigation
function initializeNavigation() {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    // Update aria-expanded for accessibility
    hamburger.setAttribute("aria-expanded", navMenu.classList.contains("active"))
  })

  // Keyboard accessibility for hamburger
  hamburger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      navMenu.classList.toggle("active")
      hamburger.setAttribute("aria-expanded", navMenu.classList.contains("active"))
    }
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
      navMenu.classList.remove("active")
      hamburger.setAttribute("aria-expanded", "false")
    })
  })

  // Shop Now button scroll to products
  shopNowBtn.addEventListener("click", () => {
    document.getElementById("products").scrollIntoView({
      behavior: "smooth",
    })
  })
}

// Render Functions
function renderFeatures() {
  const featuresGrid = document.getElementById("featuresGrid")
  featuresGrid.innerHTML = features
    .map(
      (feature) => `
        <div class="feature-card reveal">
            <div class="feature-icon">${feature.icon}</div>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        </div>
    `,
    )
    .join("")
}

function renderProducts() {
  const productsGrid = document.getElementById("productsGrid")

  const filtered =
    currentCollectionFilter === "All"
      ? products
      : products.filter((p) => getCollectionForProduct(p) === currentCollectionFilter)

  productsGrid.innerHTML = filtered
    .map((product) => {
      const col = getCollectionForProduct(product)
      const accent = collectionColors[col] || "#e53e3e"
      const variant = getVariantForCollection(col)
      const vAccent = genderColors[variant] || accent
      return `
        <div class="product-card reveal" data-id="${product.id}" data-collection="${col}" data-variant="${variant}" data-cursor-color="${vAccent}">
          <button class="wish-btn ${wishlist.some((w) => w.id === product.id) ? "active" : ""}" aria-label="Add to wishlist" onclick="toggleWishlist(${product.id})">❤</button>
          <div class="product-media enable-tilt has-shine">
            <span class="product-badge" style="border:1px solid rgba(0,0,0,0.06);">${col}</span>
            <img src="${product.image}" alt="${product.name}" class="product-image"
                 onerror="this.onerror=null;this.src='/modern-tech-product.png';"/>
            <div class="product-actions">
              <button class="action-btn magnetic">Add to Cart</button>
              <button class="action-btn magnetic">Quick View</button>
            </div>
          </div>
          <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.tagline || "Premium comfort and performance."}</p>
            <div class="product-price">₹${product.price.toLocaleString()}</div>
            <div class="product-rating">
              <div class="stars">${"★".repeat(Math.floor(product.rating))}${"☆".repeat(5 - Math.floor(product.rating))}</div>
              <span class="reviews">(${product.reviews} reviews)</span>
            </div>
            <button class="btn btn-primary ripple-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            <button class="btn btn-outline ripple-btn" onclick="openQuickView(${product.id})">Quick View</button>
          </div>
        </div>
      `
    })
    .join("")

  // Rebind action buttons (moved into DOM via template)
  document.querySelectorAll(".product-card .product-actions .action-btn:nth-child(1)").forEach((b, i) => {
    const pid = filtered[i]?.id
    if (pid) b.onclick = () => addToCart(pid)
  })
  document.querySelectorAll(".product-card .product-actions .action-btn:nth-child(2)").forEach((b, i) => {
    const pid = filtered[i]?.id
    if (pid) b.onclick = () => openQuickView(pid)
  })

  applyRevealAnimations()
  initTilt(".product-card .enable-tilt")
  wireCursorAccents()
  initRipple()
}

function renderCollections() {
  const collectionsGrid = document.getElementById("collectionsGrid")
  collectionsGrid.innerHTML = collections
    .map((collection) => {
      const colAccent = collectionColors[collection.name] || "#e53e3e"
      const variant = collection.variant || "unisex"
      const vAccent = genderColors[variant] || colAccent
      return `
        <div class="collection-card reveal enable-tilt has-shine" data-name="${collection.name}" data-variant="${variant}" data-cursor-color="${vAccent}">
            <img src="${collection.image}" alt="${collection.name}" class="collection-image"
                 onerror="this.onerror=null;this.src='/--encodeuricomponent-collection-name---collection.jpg';">
            <div class="collection-overlay">
                <h3 class="collection-name">${collection.name}</h3>
                <p class="collection-count">${collection.productCount} Products</p>
            </div>
        </div>
    `
    })
    .join("")

  collectionsGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".collection-card")
    if (!card) return
    const name = card.getAttribute("data-name")
    if (!name) return
    currentCollectionFilter = name
    renderFilterToolbar()
    renderProducts()
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" })
  })

  initTilt(".collection-card.enable-tilt")
  wireCursorAccents()
  initRipple()
}

function renderTestimonials() {
  const testimonialContainer = document.getElementById("testimonialContainer")
  const carouselDots = document.getElementById("carouselDots")

  testimonialContainer.innerHTML = testimonials
    .map(
      (testimonial, index) => `
        <div class="testimonial-slide ${index === 0 ? "active" : ""}">
            <p class="testimonial-text">"${testimonial.text}"</p>
            <h4 class="testimonial-author">${testimonial.author}</h4>
            <p class="testimonial-role">${testimonial.role}</p>
        </div>
    `,
    )
    .join("")

  carouselDots.innerHTML = testimonials
    .map(
      (_, index) => `
        <span class="dot ${index === 0 ? "active" : ""}" onclick="currentSlide(${index})"></span>
    `,
    )
    .join("")
}

// Testimonial Carousel
let carouselInterval = null
function initializeCarousel() {
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")

  prevBtn.addEventListener("click", () => changeSlide(-1))
  nextBtn.addEventListener("click", () => changeSlide(1))

  // Prevent multiple intervals
  if (carouselInterval) clearInterval(carouselInterval)
  carouselInterval = setInterval(() => {
    changeSlide(1)
  }, 5000)
}

function changeSlide(direction) {
  const slides = document.querySelectorAll(".testimonial-slide")
  const dots = document.querySelectorAll(".dot")

  slides[currentTestimonial].classList.remove("active")
  dots[currentTestimonial].classList.remove("active")

  currentTestimonial += direction

  if (currentTestimonial >= testimonials.length) {
    currentTestimonial = 0
  } else if (currentTestimonial < 0) {
    currentTestimonial = testimonials.length - 1
  }

  slides[currentTestimonial].classList.add("active")
  dots[currentTestimonial].classList.add("active")
}

function currentSlide(index) {
  const slides = document.querySelectorAll(".testimonial-slide")
  const dots = document.querySelectorAll(".dot")

  slides[currentTestimonial].classList.remove("active")
  dots[currentTestimonial].classList.remove("active")

  currentTestimonial = index

  slides[currentTestimonial].classList.add("active")
  dots[currentTestimonial].classList.add("active")
}

// Shopping Cart Functions
function initializeCart() {
  cartBtn.addEventListener("click", () => {
    cartModal.style.display = "block"
    renderCart()
  })

  closeCart.addEventListener("click", () => {
    cartModal.style.display = "none"
  })

  window.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      cartModal.style.display = "none"
    }
  })

  // Close modal with Escape key
  window.addEventListener("keydown", (e) => {
    if (cartModal.style.display === "block" && e.key === "Escape") {
      cartModal.style.display = "none"
    }
  })

  checkoutBtn.addEventListener("click", initiatePayment)
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ ...product, quantity: 1 })
  }

  updateCartCount()
  showNotification("Product added to cart!")
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)
  updateCartCount()
  renderCart()
}

function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId)
  if (item) {
    item.quantity += change
    if (item.quantity <= 0) {
      removeFromCart(productId)
    } else {
      updateCartCount()
      renderCart()
    }
  }
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  cartCount.textContent = totalItems
  if (stickyCartCount) {
    stickyCartCount.textContent = String(totalItems)
  }
}

function renderCart() {
  const cartItems = document.getElementById("cartItems")
  const cartTotal = document.getElementById("cartTotal")

  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">Your cart is empty</p>'
    cartTotal.textContent = "Total: ₹0"
    return
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="background: #e53e3e; color: white;">×</button>
        </div>
    `,
    )
    .join("")

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  cartTotal.textContent = `Total: ₹${total.toLocaleString()}`
}

// Razorpay Payment Integration
function initiatePayment() {
  if (cart.length === 0) {
    showNotification("Your cart is empty!", "error")
    return
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const options = {
    key: RAZORPAY_KEY_ID,
    amount: total * 100, // Amount in paise
    currency: "INR",
    name: "AlphA Athlete",
    description: "Athletic Gear Purchase",
    image: "/alpha-athlete-logo.png",
    handler: (response) => {
      // Payment successful
      showNotification("Payment successful! Order placed.", "success")
      cart = []
      updateCartCount()
      cartModal.style.display = "none"

      // Here you would typically send the payment details to your server
      console.log("Payment ID:", response.razorpay_payment_id)
    },
    prefill: {
      name: "Customer Name",
      email: "customer@example.com",
      contact: "9999999999",
    },
    notes: {
      address: "AlphA Athlete Store",
    },
    theme: {
      color: "#e53e3e",
    },
    modal: {
      ondismiss: () => {
        showNotification("Payment cancelled", "error")
      },
    },
  }

  const Razorpay = window.Razorpay // Declare Razorpay variable
  const rzp = new Razorpay(options)
  rzp.open()
}

// Wishlist Handlers
function toggleWishlist(productId) {
  const exists = wishlist.find((p) => p.id === productId)
  if (exists) {
    wishlist = wishlist.filter((p) => p.id !== productId)
  } else {
    const product = products.find((p) => p.id === productId)
    if (product) wishlist.push(product)
  }
  updateWishlistCount()
  renderProducts()
}

function updateWishlistCount() {
  wishlistCount.textContent = String(wishlist.length)
}

// Sticky Actions Behavior
function initStickyActions() {
  if (stickyCartBtn) {
    stickyCartBtn.addEventListener("click", () => {
      cartModal.style.display = "block"
      renderCart()
    })
  }
  if (stickyWishBtn) {
    stickyWishBtn.addEventListener("click", () => {
      if (!wishlist.length) {
        showNotification("Your wishlist is empty", "error")
        return
      }
      const names = wishlist.map((w) => w.name).join(", ")
      showNotification(`Wishlist: ${names}`, "success")
    })
  }
  // sync counts
  updateWishlistCount()
  updateCartCount() // existing, also syncs sticky cart count below
}

function openQuickView(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return
  const modal = document.getElementById("quickViewModal")
  const img = document.getElementById("quickViewImage")
  const title = document.getElementById("quickViewTitle")
  const tagline = document.getElementById("quickViewTagline")
  const price = document.getElementById("quickViewPrice")
  const addBtn = document.getElementById("quickViewAddBtn")

  img.src = product.image
  img.alt = product.name
  title.textContent = product.name
  tagline.textContent = product.tagline || "Premium comfort and performance."
  price.textContent = `₹${product.price.toLocaleString()}`
  addBtn.onclick = () => {
    addToCart(product.id)
    modal.style.display = "none"
  }

  modal.style.display = "block"

  tryMount360Viewer(product)

  const closeQuickView = document.getElementById("closeQuickView")
  closeQuickView.onclick = () => {
    modal.style.display = "none"
    unmount360Viewer()
  }
  window.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Escape") {
        modal.style.display = "none"
        unmount360Viewer()
      }
    },
    { once: true },
  )
  window.addEventListener(
    "click",
    (e) => {
      if (e.target === modal) {
        modal.style.display = "none"
        unmount360Viewer()
      }
    },
    { once: true },
  )
}

function applyRevealAnimations() {
  // Mark items for reveal
  document
    .querySelectorAll(".feature-card, .product-card, .collection-card, .testimonial-slide, .section-title")
    .forEach((el) => {
      el.classList.add("reveal")
    })

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed")
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 },
  )

  document.querySelectorAll(".reveal").forEach((el) => io.observe(el))
}

// Robust custom cursor: create elements if missing, enable only on desktop, add 'cursor-enabled' class
function initCustomCursor() {
  const isTouch = window.matchMedia && window.matchMedia("(pointer: coarse)").matches
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (isTouch || prefersReduced) return

  let cursor = document.getElementById("cursor")
  let dot = document.getElementById("cursorDot")

  // Create if not present
  if (!cursor) {
    cursor = document.createElement("div")
    cursor.id = "cursor"
    cursor.className = "cursor"
    document.body.appendChild(cursor)
  }
  if (!dot) {
    dot = document.createElement("div")
    dot.id = "cursorDot"
    dot.className = "cursor-dot"
    document.body.appendChild(dot)
  }

  // Enable hidden native cursor
  document.body.classList.add("cursor-enabled")

  // Build a small trailing system for 'alpha energy'
  const trailCount = 6
  const trail = []
  for (let i = 0; i < trailCount; i++) {
    const d = document.createElement("div")
    d.className = "cursor-trail-dot"
    document.body.appendChild(d)
    trail.push({ el: d, x: -100, y: -100 })
  }

  let rafId
  let mouseX = -100,
    mouseY = -100

  const move = (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    if (!rafId) rafId = requestAnimationFrame(render)
  }

  const render = () => {
    cursor.style.transform = `translate(${mouseX - 18}px, ${mouseY - 18}px)`
    dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`
    // Update trail with slight interpolation
    trail.forEach((t, i) => {
      const lerp = 0.2 * (1 - i / trailCount)
      t.x += (mouseX - t.x) * lerp
      t.y += (mouseY - t.y) * lerp
      t.el.style.transform = `translate(${t.x - 3}px, ${t.y - 3}px)`
      t.el.style.opacity = String(0.15 + (0.55 * (trailCount - i)) / trailCount)
    })
    rafId = null
  }

  window.addEventListener("mousemove", move, { passive: true })

  const hoverables = [
    ...document.querySelectorAll(
      "a, button, .product-card, .action-btn, .wish-btn, .sticky-btn, .carousel-btn, .collection-card",
    ),
  ]
  hoverables.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("cursor--hover")
      dot.classList.add("cursor-dot--hover")
    })
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("cursor--hover")
      dot.classList.remove("cursor-dot--hover")
    })
  })
}

function initMagneticButtons() {
  const magnets = document.querySelectorAll(".magnetic")
  magnets.forEach((btn) => {
    const strength = 18
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect()
      const relX = e.clientX - rect.left - rect.width / 2
      const relY = e.clientY - rect.top - rect.height / 2
      btn.style.transform = `translate(${(relX / rect.width) * strength}px, ${(relY / rect.height) * strength}px)`
    })
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = `translate(0,0)`
    })
  })
}

// Newsletter
function initializeNewsletter() {
  const newsletterForm = document.getElementById("newsletterForm")
  const emailInput = document.getElementById("emailInput")
  const newsletterMessage = document.getElementById("newsletterMessage")

  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const email = emailInput.value.trim()

    if (!isValidEmail(email)) {
      showNewsletterMessage("Please enter a valid email address.", "error")
      return
    }

    // Simulate newsletter signup
    setTimeout(() => {
      showNewsletterMessage("Thank you for subscribing!", "success")
      emailInput.value = ""
    }, 1000)
  })
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showNewsletterMessage(message, type) {
  const newsletterMessage = document.getElementById("newsletterMessage")
  newsletterMessage.textContent = message
  newsletterMessage.className = `newsletter-message ${type}`

  setTimeout(() => {
    newsletterMessage.textContent = ""
    newsletterMessage.className = "newsletter-message"
  }, 3000)
}

// Utility Functions
function showNotification(message, type = "success") {
  const notification = document.createElement("div")
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#48bb78" : "#e53e3e"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 3000;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `
  notification.textContent = message

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Scroll animations
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

function getCollectionForProduct(product) {
  // Stable mapping based on id
  const idx = (product.id - 1) % 3
  if (idx === 0) return "Running Essentials"
  if (idx === 1) return "Gym & Training"
  return "Outdoor Adventure"
}

function getVariantForCollection(name) {
  const c = collections.find((x) => x.name === name)
  return c?.variant || "unisex"
}

function initTilt(selector) {
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const isTouch = window.matchMedia && window.matchMedia("(pointer: coarse)").matches
  if (prefersReduced || isTouch) return
  const els = typeof selector === "string" ? document.querySelectorAll(selector) : selector
  if (!els) return
  els.forEach((el) => {
    const maxTilt = 10 // degrees
    const perspective = 800
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const relX = e.clientX - rect.left
      const relY = e.clientY - rect.top
      const pctX = (relX / rect.width) * 2 - 1 // -1 to 1
      const pctY = (relY / rect.height) * 2 - 1
      const rotX = (-pctY * maxTilt).toFixed(2)
      const rotY = (pctX * maxTilt).toFixed(2)
      el.style.transform = `perspective(${perspective}px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`
    }
    const onLeave = () => {
      el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)"
    }
    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
  })
}

function wireCursorAccents() {
  const cursor = document.getElementById("cursor")
  const dot = document.getElementById("cursorDot")
  if (!cursor || !dot) return
  const hoverables = document.querySelectorAll("[data-cursor-color], [data-variant]")
  hoverables.forEach((el) => {
    const explicit = el.getAttribute("data-cursor-color")
    const variant = el.getAttribute("data-variant")
    const vColor = variant ? genderColors[variant] || null : null
    el.addEventListener("mouseenter", () => {
      const color = explicit || vColor
      if (color) {
        cursor.style.setProperty("--cursor-accent", color)
        dot.style.setProperty("--cursor-accent", color)
        cursor.setAttribute("data-accent", "true")
        dot.setAttribute("data-accent", "true")
      }
    })
    el.addEventListener("mouseleave", () => {
      cursor.style.removeProperty("--cursor-accent")
      dot.style.removeProperty("--cursor-accent")
      cursor.removeAttribute("data-accent")
      dot.removeAttribute("data-accent")
    })
  })
}

function initRipple() {
  const targets = document.querySelectorAll(".btn, .action-btn, .filter-btn")
  targets.forEach((el) => {
    el.addEventListener("click", (e) => {
      const rect = el.getBoundingClientRect()
      const ripple = document.createElement("span")
      ripple.className = "ripple"
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2
      ripple.style.width = ripple.style.height = `${size}px`
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`
      el.appendChild(ripple)
      setTimeout(() => ripple.remove(), 650)
    })
  })
}

// Ensure filters have a ripple and rebind on render
function renderFilterToolbar() {
  const bar = document.getElementById("collectionFilters")
  if (!bar) return
  bar.innerHTML = COLLECTIONS.map((c) => {
    return `<button class="filter-btn ${c === currentCollectionFilter ? "active" : ""} ripple-btn" role="tab" aria-selected="${c === currentCollectionFilter}" data-filter="${c}">${c}</button>`
  }).join("")
  bar.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentCollectionFilter = btn.getAttribute("data-filter")
      renderFilterToolbar()
      renderProducts()
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  })
  initRipple()
}

let __current360 = null

function tryMount360Viewer(product) {
  // Delay a tick so modal DOM is present
  requestAnimationFrame(() => mount360Viewer(product))
}

function mount360Viewer(product) {
  const media = document.querySelector(".quick-view-media")
  const img = document.getElementById("quickViewImage")
  if (!media || !img) return

  // If already mounted, reset first
  unmount360Viewer()

  // Determine frames
  const slug = (product.slug || product.name || `product-${product.id || "x"}`)
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  const framesFromProduct = Array.isArray(product.images360) ? product.images360 : null
  const framesCount = (product.framesCount && Number(product.framesCount)) || 36
  const frameUrl = (i) => {
    const n = String(i + 1).padStart(3, "0")
    return `/frames/${slug}/frame-${n}.jpg`
  }
  const candidateFrames =
    framesFromProduct && framesFromProduct.length > 0
      ? framesFromProduct
      : Array.from({ length: framesCount }, (_, i) => frameUrl(i))

  // Build container UI
  const container = document.createElement("div")
  container.className = "viewer-360-container"
  container.setAttribute("role", "group")
  container.setAttribute("aria-label", "360 degree product view")

  const display = document.createElement("img")
  display.className = "viewer-360-canvas"
  display.alt = `${product.name} 360 view`

  const hint = document.createElement("div")
  hint.className = "viewer-360-hint"
  hint.textContent = "Use arrows to rotate"

  const controls = document.createElement("div")
  controls.className = "viewer-360-controls"
  const prev = document.createElement("button")
  prev.type = "button"
  prev.setAttribute("aria-label", "Rotate left")
  prev.textContent = "◀"
  const next = document.createElement("button")
  next.type = "button"
  next.setAttribute("aria-label", "Rotate right")
  next.textContent = "▶"
  const reset = document.createElement("button")
  reset.type = "button"
  reset.setAttribute("aria-label", "Reset view")
  reset.textContent = "Reset"
  controls.append(prev, next, reset)

  const loader = document.createElement("div")
  loader.className = "viewer-360-loader"
  const spinner = document.createElement("div")
  spinner.className = "viewer-360-loader-spinner"
  loader.appendChild(spinner)

  container.append(display, hint, controls, loader)

  // Mount container, hide original static image (but keep in DOM for fallback)
  img.style.display = "none"
  media.appendChild(container)

  // Preload frames quickly; require a minimum to enable true 360
  const MIN_OK = 8
  let loaded = 0
  const okFrames = []
  let current = 0
  let keydownHandler = null

  const showFrame = (idx) => {
    current = (idx + okFrames.length) % okFrames.length
    display.src = okFrames[current].src
  }

  const enableControls = () => {
    loader.style.display = "none"
    hint.classList.remove("hidden")

    prev.onclick = () => showFrame(current - 1)
    next.onclick = () => showFrame(current + 1)
    reset.onclick = () => showFrame(0)

    keydownHandler = (e) => {
      if (e.key === "ArrowLeft") showFrame(current - 1)
      if (e.key === "ArrowRight") showFrame(current + 1)
    }
    window.addEventListener("keydown", keydownHandler)

    // initialize first frame
    showFrame(0)

    // record state for cleanup
    __current360 = {
      cleanup() {
        window.removeEventListener("keydown", keydownHandler)
        if (container && container.parentNode) container.parentNode.removeChild(container)
        img.style.display = "" // restore
      },
    }
  }

  const fallbackSingleImage = () => {
    // No enough frames — unmount container and show original img with a subtle rotateY illusion
    if (container && container.parentNode) container.parentNode.removeChild(container)
    img.style.display = ""
    // Optional: add a minimal illusion using arrows
    let angle = 0
    const illusionControls = document.createElement("div")
    illusionControls.className = "viewer-360-controls"
    const prev2 = document.createElement("button")
    prev2.type = "button"
    prev2.setAttribute("aria-label", "Rotate left")
    prev2.textContent = "◀"
    const next2 = document.createElement("button")
    next2.type = "button"
    next2.setAttribute("aria-label", "Rotate right")
    next2.textContent = "▶"
    illusionControls.append(prev2, next2)
    media.appendChild(illusionControls)
    const applyTransform = () => {
      img.style.transition = "transform 250ms var(--ease)"
      img.style.transform = `perspective(1000px) rotateY(${angle}deg)`
    }
    prev2.onclick = () => {
      angle -= 20
      applyTransform()
    }
    next2.onclick = () => {
      angle += 20
      applyTransform()
    }
    keydownHandler = (e) => {
      if (e.key === "ArrowLeft") {
        angle -= 20
        applyTransform()
      }
      if (e.key === "ArrowRight") {
        angle += 20
        applyTransform()
      }
    }
    window.addEventListener("keydown", keydownHandler)
    __current360 = {
      cleanup() {
        window.removeEventListener("keydown", keydownHandler)
        if (illusionControls && illusionControls.parentNode) illusionControls.parentNode.removeChild(illusionControls)
        img.style.transform = ""
        img.style.transition = ""
      },
    }
  }

  // Begin preload
  let canceled = false
  const preloadOne = (url) =>
    new Promise((resolve) => {
      const im = new Image()
      im.onload = () => resolve({ ok: true, img: im })
      im.onerror = () => resolve({ ok: false })
      im.src = url
    })
  ;(async () => {
    for (const url of candidateFrames) {
      if (canceled) break
      const res = await preloadOne(url)
      loaded++
      if (res.ok) okFrames.push(res.img)
      // show spinner until we have enough frames
      if (okFrames.length === MIN_OK) break
      // Also break early if too many fail (avoid long waits)
      if (loaded >= Math.min(18, candidateFrames.length) && okFrames.length < 2) break
    }

    if (canceled) return
    if (okFrames.length >= MIN_OK) {
      enableControls()
    } else {
      fallbackSingleImage()
    }
  })()

  // In case the modal closes before preload completes
  __current360 = {
    cleanup() {
      canceled = true
      // The enableControls/fallback set their own cleanup; ensure container removed and image restored
      if (container && container.parentNode) container.parentNode.removeChild(container)
      img.style.display = ""
      if (keydownHandler) window.removeEventListener("keydown", keydownHandler)
    },
  }
}

function unmount360Viewer() {
  if (__current360 && typeof __current360.cleanup === "function") {
    __current360.cleanup()
  }
  __current360 = null
}
