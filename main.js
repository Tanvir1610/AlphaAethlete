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

const products = [
  {
    id: 1,
    name: "Pro Runner Shoes",
    price: 8999,
    category: "Footwear",
    rating: 4.8,
    reviews: 124,
    image: "images/red-black-running-shoes.png",
  },
  {
    id: 2,
    name: "Athletic Performance Tee",
    price: 2499,
    category: "Apparel",
    rating: 4.6,
    reviews: 89,
    image: "images/red-athletic-tee.png",
  },
  {
    id: 3,
    name: "Training Shorts",
    price: 1999,
    category: "Apparel",
    rating: 4.7,
    reviews: 156,
    image: "images/Training-Shorts.png",
  },
  {
    id: 4,
    name: "Compression Leggings",
    price: 3499,
    category: "Apparel",
    rating: 4.9,
    reviews: 203,
    image: "images/Leggings.png",
  },
]

const collections = [
  {
    name: "Running Essentials",
    productCount: 24,
    image: "images/running-gear-collection.png",
  },
  {
    name: "Gym & Training",
    productCount: 18,
    image: "images/gym.jpg",
  },
  {
    name: "Outdoor Adventure",
    productCount: 32,
    image: "images/outdoor.jpg",
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

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderFeatures()
  renderProducts()
  renderCollections()
  renderTestimonials()
  initializeCarousel()
  initializeNavigation()
  initializeCart()
  initializeNewsletter()
})

// Navigation
function initializeNavigation() {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")
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
        <div class="feature-card">
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
  productsGrid.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">₹${product.price.toLocaleString()}</div>
                <div class="product-rating">
                    <div class="stars">${"★".repeat(Math.floor(product.rating))}${"☆".repeat(5 - Math.floor(product.rating))}</div>
                    <span class="reviews">(${product.reviews} reviews)</span>
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `,
    )
    .join("")
}

function renderCollections() {
  const collectionsGrid = document.getElementById("collectionsGrid")
  collectionsGrid.innerHTML = collections
    .map(
      (collection) => `
        <div class="collection-card">
            <img src="${collection.image}" alt="${collection.name}" class="collection-image">
            <div class="collection-overlay">
                <h3 class="collection-name">${collection.name}</h3>
                <p class="collection-count">${collection.productCount} Products</p>
            </div>
        </div>
    `,
    )
    .join("")
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
function initializeCarousel() {
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")

  prevBtn.addEventListener("click", () => changeSlide(-1))
  nextBtn.addEventListener("click", () => changeSlide(1))

  // Auto-slide every 5 seconds
  setInterval(() => {
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
