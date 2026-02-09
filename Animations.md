

#🎨 Motion Animations Documentation

This website has been enhanced with subtle, professional animations using [Motion](https://motion.dev/), a modern animation library for React. Below is a comprehensive list of all implemented effects.

---

## ✨ Implemented Animations

### 1. **Hero Section** - [src/components/Hero.tsx](src/components/Hero.tsx)

#### Location Badge Fade-In
- **Lines:** 37-42
- **Effect:** Fade in from below with upward slide
- **Properties:** `opacity: 0 → 1`, `y: 20 → 0`
- **Timing:** Duration 0.6s, delay 0.2s
- **Use Case:** Subtle entry animation for location indicator

#### Main Heading Animation
- **Lines:** 47-53
- **Effect:** Delayed fade-in with slide up
- **Properties:** `opacity: 0 → 1`, `y: 30 → 0`
- **Timing:** Duration 0.8s, delay 0.4s
- **Use Case:** Creates visual hierarchy by animating after location

#### Subtitle Animation
- **Lines:** 58-64
- **Effect:** Sequential fade and slide
- **Properties:** `opacity: 0 → 1`, `y: 30 → 0`
- **Timing:** Duration 0.8s, delay 0.6s
- **Use Case:** Continues the cascading animation sequence

#### Call-to-Action Buttons
- **Lines:** 68-91
- **Container Animation:** Fade-in group (0.8s delay)
- **Interactive Effects:**
  - `whileHover={{ scale: 1.05 }}` - Gentle scale on hover
  - `whileTap={{ scale: 0.95 }}` - Press feedback
- **Use Case:** Draws attention to primary actions with smooth interactions

---

### 2. **Services Section** - [src/components/Services.tsx](src/components/Services.tsx)

#### Section Header
- **Lines:** 61-68
- **Effect:** Scroll-triggered fade and slide from below
- **Properties:** `opacity: 0 → 1`, `y: 30 → 0`
- **Viewport:** Triggers once when 0px into viewport
- **Timing:** 0.6s duration
- **Use Case:** Announces section content on scroll

---

### 3. **Service Cards** - [src/components/ui/Card.tsx](src/components/ui/Card.tsx)

#### Card Entrance
- **Lines:** 17-24
- **Effect:** Scroll-triggered fade and slide up
- **Properties:** `opacity: 0 → 1`, `y: 50 → 0`
- **Viewport:** Triggers once, 100px before entering viewport
- **Timing:** 0.6s duration
- **Hover:** `y: -8` - Lifts card on hover
- **Use Case:** Creates engaging card reveal as user scrolls

#### Icon Container
- **Lines:** 26-31
- **Effect:** Rotate and scale on hover
- **Properties:** `rotate: 5deg`, `scale: 1.1`
- **Timing:** 0.3s duration
- **Use Case:** Adds playful interaction to static icons

#### Action Button
- **Lines:** 52-59
- **Interactive Effects:**
  - `whileHover={{ scale: 1.05 }}` - Subtle growth
  - `whileTap={{ scale: 0.95 }}` - Click feedback
- **Use Case:** Provides tactile button feedback

---

### 4. **Destinations Section** - [src/components/Destinations.tsx](src/components/Destinations.tsx)

#### Section Header
- **Lines:** 61-68
- **Effect:** Identical to Services header animation
- **Properties:** Fade and slide on scroll
- **Use Case:** Maintains consistent section introductions

---

### 5. **Destination Cards** - [src/components/ui/Destination.tsx](src/components/ui/Destination.tsx)

#### Card Entrance
- **Lines:** 14-21
- **Effect:** Scale and fade on scroll
- **Properties:** `opacity: 0 → 1`, `scale: 0.9 → 1`
- **Viewport:** Triggers once, 50px before viewport
- **Timing:** 0.5s duration
- **Hover:** `y: -8` - Card lift
- **Use Case:** Creates zoom-in reveal effect for destination cards

#### Image Hover
- **Line:** 29
- **Effect:** CSS scale on group hover
- **Properties:** `scale: 1.1` (via Tailwind)
- **Timing:** 500ms
- **Use Case:** Subtle parallax/zoom effect on image

---

### 6. **Contact Section** - [src/components/Contact.tsx](src/components/Contact.tsx)

#### Section Header
- **Lines:** 13-20
- **Effect:** Scroll-triggered fade and slide
- **Properties:** `opacity: 0 → 1`, `y: 30 → 0`
- **Timing:** 0.6s duration
- **Use Case:** Consistent header animation pattern

---

### 7. **Contact Information** - [src/components/ui/ContactInfo.tsx](src/components/ui/ContactInfo.tsx)

#### Container Entrance
- **Lines:** 7-12
- **Effect:** Slide from left with fade
- **Properties:** `opacity: 0 → 1`, `x: -50 → 0`
- **Timing:** 0.6s duration
- **Use Case:** Creates directional flow from left side

#### Icon Containers (3 instances)
- **Lines:** 20-24, 37-41, 54-58
- **Effect:** Scale and rotate on hover
- **Properties:** `scale: 1.1`, `rotate: 5deg`
- **Timing:** 0.3s duration
- **Use Case:** Makes contact icons interactive and engaging

---

### 8. **Contact Form** - [src/components/ui/ContactForm.tsx](src/components/ui/ContactForm.tsx)

#### Form Container
- **Lines:** 47-52
- **Effect:** Slide from right with fade
- **Properties:** `opacity: 0 → 1`, `x: 50 → 0`
- **Timing:** 0.6s duration
- **Use Case:** Balances info section's left slide

#### Submit Button
- **Lines:** 166-172
- **Interactive Effects:**
  - `whileHover={{ scale: 1.02, y: -2 }}` - Subtle lift
  - `whileTap={{ scale: 0.98 }}` - Press feedback
- **Use Case:** Encourages form submission with micro-interactions

---

### 9. **Navigation Bar** - [src/components/Navbar.tsx](src/components/Navbar.tsx)

#### Login/Connexion Button
- **Lines:** 72-78
- **Interactive Effects:**
  - `whileHover={{ scale: 1.05 }}` - Button growth
  - `whileTap={{ scale: 0.95 }}` - Click feedback
- **Use Case:** Makes primary navigation action more engaging

---

## 🚀 Quick Effect Variations You Can Try

Want to experiment with different animation styles? Here are quick modifications you can make by changing just a few words in the existing code:

### 1. **Spring Animations** (Bouncy Effect)
Replace any `transition={{ duration: 0.6 }}` with:
```tsx
transition={{ type: "spring", bounce: 0.25 }}
```
**Where to try:** Hero heading, Card entrances, Buttons
**Effect:** Creates natural, physics-based bounce

### 2. **Stronger Bounce**
```tsx
transition={{ type: "spring", bounce: 0.6 }}
```
**Effect:** More dramatic spring effect (bounce ranges 0-1)

### 3. **Rotate on Enter**
Add to any `initial` animation:
```tsx
initial={{ opacity: 0, rotate: -10 }}
whileInView={{ opacity: 1, rotate: 0 }}
```
**Where to try:** Cards, Destination cards
**Effect:** Element rotates into place

### 4. **Blur Effect**
Replace fade-in animations with:
```tsx
initial={{ opacity: 0, filter: "blur(10px)" }}
whileInView={{ opacity: 1, filter: "blur(0px)" }}
```
**Where to try:** Section headers, Cards
**Effect:** Content sharpens as it appears

### 5. **Stagger Children** (Sequential Animation)
For sections with multiple cards, wrap them in:
```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.1  // 0.1s delay between each card
      }
    }
  }}
>
  {/* cards here */}
</motion.div>
```
**Where to try:** Services grid, Destinations grid
**Effect:** Cards animate one after another

### 6. **Keyframe Animation** (Multiple Steps)
Replace simple animations with:
```tsx
animate={{
  y: [0, -20, 0],  // Move up then back down
  transition: { 
    duration: 2, 
    repeat: Infinity,  // Loop forever
    ease: "easeInOut" 
  }
}}
```
**Where to try:** Arrows, Icons, Location badge
**Effect:** Creates floating/bobbing animation

### 7. **Rotation on Hover** (Full Spin)
Change hover effects to:
```tsx
whileHover={{ rotate: 360, scale: 1.2 }}
transition={{ duration: 0.5 }}
```
**Where to try:** Icons, Logo, Service card icons
**Effect:** Element spins completely on hover

### 8. **Exit Animations** (For Modals/Dropdowns)
Add to components that appear/disappear:
```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    />
  )}
</AnimatePresence>
```
**Where to try:** Mobile menu, Auth modals
**Effect:** Smooth in/out transitions

### 9. **Gradient Background Shift**
For buttons:
```tsx
whileHover={{
  background: "linear-gradient(45deg, #3b82f6, #06b6d4)"
}}
```
**Where to try:** CTA buttons, Form submit
**Effect:** Dynamic color transition

### 10. **Elastic Hover**
Replace scale effects with:
```tsx
whileHover={{ 
  scale: 1.1,
  transition: { type: "spring", stiffness: 400, damping: 10 }
}}
```
**Where to try:** Buttons, Cards, Images
**Effect:** Snappy, high-energy interaction

### 11. **Continuous Rotation**
For decorative elements:
```tsx
animate={{
  rotate: 360,
}}
transition={{
  duration: 20,
  repeat: Infinity,
  ease: "linear"
}}
```
**Where to try:** Icons, Background elements
**Effect:** Slow perpetual spin

### 12. **Pulse Effect**
For attention-grabbing elements:
```tsx
animate={{
  scale: [1, 1.05, 1],
}}
transition={{
  duration: 2,
  repeat: Infinity,
  ease: "easeInOut"
}}
```
**Where to try:** CTA buttons, "New" badges
**Effect:** Gentle breathing animation

---

## 📝 Implementation Notes

- **Performance:** All animations use GPU-accelerated transforms (`x`, `y`, `scale`, `rotate`, `opacity`)
- **Accessibility:** Scroll-triggered animations respect `viewport={{ once: true }}` to prevent repetitive motion
- **Browser Support:** Motion uses Web Animations API with fallbacks for older browsers
- **Bundle Size:** Motion uses tree-shaking to include only used features

## 🔧 How to Modify

1. **Change timing:** Adjust `duration` values (in seconds)
2. **Change delays:** Modify `delay` in transition objects
3. **Change distance:** Update `x` and `y` offset values
4. **Change viewport trigger:** Modify `margin` in viewport settings (e.g., `"-100px"` triggers 100px before visible)

---

**Happy animating! 🎉**