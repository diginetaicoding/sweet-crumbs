# Product Requirements Document (PRD): Sweet Crumbs Website

## 1. Overview
**Sweet Crumbs** is a home bakery in Kochi run by **Sneha**. This website serves as a mobile-first digital storefront where local customers can browse the cake menu, configure their order (cake, weight, delivery date, custom notes), send the pre-filled order directly to Sneha via WhatsApp, and pay a ₹200 advance via a Razorpay payment link for custom cake orders.

---

## 2. Target Audience (Who It Is For)
1. **Local Customers in Kochi**
   - People looking for fresh, homemade cakes for birthdays, anniversaries, and celebrations.
   - Mobile-first users discovering the bakery via WhatsApp status, Instagram, Google Search, or Google Maps.
   - Customers who prefer quick, conversational ordering via WhatsApp without creating an account.
2. **Bakery Owner (Sneha)**
   - Needs structured, complete order inquiries on WhatsApp (cake name, size, price, delivery date, customer details) instead of back-and-forth messages.
   - Needs a simple way to collect a ₹200 advance for custom cake requests via a Razorpay payment link.

---

## 3. Site Structure / Pages
The site will be a fast, mobile-first **single-page website (`index.html`)** divided into clear navigable sections:

1. **Header & Hero Section**
   - Sweet Crumbs branding, tagline ("Handcrafted Home-Baked Cakes by Sneha in Kochi"), and primary CTAs ("Browse Menu" and "Custom Cake Order").
2. **Cake Menu Section**
   - Grid/cards displaying available cakes with photos, descriptions, dietary tags (e.g., Eggless available), and dynamic pricing for **0.5 kg (Half kg)** and **1 kg** sizes.
   - Direct "Select / Order" button on each card that pre-populates the order builder.
3. **Order & WhatsApp Checkout Section**
   - Interactive form where customers choose:
     - Cake flavour/item from the menu
     - Size: **Half kg (0.5 kg)** or **1 kg** (automatically updates estimated price)
     - Delivery / Pickup Date (with minimum notice validation)
     - Message on the cake & delivery area in Kochi
   - **"Send Order on WhatsApp" CTA:** Generates a `wa.me` deep link with all selected details neatly formatted in the message body.
4. **Custom Cake & Advance Payment Section**
   - Dedicated option for custom theme/designer cakes (flavour, weight, theme description, occasion date).
   - Clear policy explaining the **₹200 advance booking fee**.
   - **Razorpay Payment Link Button:** Directs the customer to pay the ₹200 advance via Razorpay, paired with a WhatsApp confirmation link to share the payment reference/screenshot and custom cake details.
5. **About Sneha & Location / Footer Section**
   - Brief story about Sneha's home bakery in Kochi, FSSAI/hygiene note, working hours, contact phone/WhatsApp, and an embedded **Google Maps** location pin + "Get Directions" link.

---

## 4. Key Features & Requirements

### 4.1 Menu & Order Configuration
- **Visual Cake Catalogue:** High-clarity cake cards showing photo, name, short description, and base prices for 0.5 kg and 1 kg.
- **Generated Cake Photos (Replaceable):** Realistic AI-generated cake photos will be included initially in the project assets so the site looks complete out of the box; Sneha can easily swap the image files with her own real cake photos later.
- **Size Toggle & Live Price Display:** Selecting between `0.5 kg` and `1 kg` updates the displayed price immediately.
- **Delivery Date Picker & Lead-Time Validation:**
  - Standard menu cakes: restricted to today/future dates.
  - **Custom cakes:** delivery date must be **at least 2 days ahead** from the current date (enforced via date picker `min` attribute and form validation).
- **Pre-filled WhatsApp Integration:** Constructs a URL-encoded WhatsApp message to Sneha's business number containing:
  - Customer Name & Delivery Location
  - Selected Cake & Size (`0.5 kg` or `1 kg`)
  - Calculated Price
  - Delivery Date & Message on Cake
  - Order Type (Standard Menu Cake vs. Custom Cake)

### 4.2 Custom Cake ₹200 Advance (Razorpay Link)
- Prominent **₹200 Advance Payment** button linking to Sneha's Razorpay Payment Link.
- Option in the custom order form to indicate that the ₹200 advance is being paid, reminding the customer to attach the payment screenshot/ID in the WhatsApp chat.
- Enforces the **minimum 2-day advance notice** on the delivery date before allowing custom order submission.

### 4.3 Centralized Configuration in `script.js`
- A single `CONFIG` object at the very top of `script.js` holding:
  - Placeholder WhatsApp number: `"910000000000"`
  - Placeholder Razorpay payment link (e.g., `"https://rzp.io/l/sweet-crumbs-advance"`)
  - Menu items and image paths so Sneha can update contact/payment links or swap photos in one place.

### 4.4 Local SEO & Google Visibility
- **Optimized Meta Tags:** Descriptive `<title>` (e.g., *Sweet Crumbs by Sneha | Homemade Cakes & Custom Cakes in Kochi*) and `<meta name="description">`.
- **Open Graph Tags:** For rich previews when shared on WhatsApp and Instagram.
- **LocalBusiness / Bakery Schema (`JSON-LD`):** Structured data with business name, Kochi address, geo-coordinates, price range, and contact details for Google Search visibility.
- **Google Maps Integration:** Embedded Google Map showing the bakery location in Kochi plus a direct Maps link.

### 4.5 Technical Stack & Design
- **Plain HTML5, CSS3, and Vanilla JavaScript** (no frameworks or build step required).
- **Mobile-First Responsive Layout:** Optimized for smartphone screens with sticky/easy-reach order actions and fast image loading (`loading="lazy"`).

---

## 5. What Is NOT Included (Out of Scope)
1. **No Backend Server or Database:** Orders are not stored in a database; all orders are transmitted directly via WhatsApp.
2. **No Full Shopping Cart Payment Gateway Integration:** Only a static/hosted Razorpay Payment Link for the ₹200 custom cake advance is included (no server-side Razorpay webhook verification or full cart checkout).
3. **No User Accounts / Login:** Customers do not sign up, log in, or view past order history on the website.
4. **No Real-Time Delivery Tracking or Courier API:** Delivery coordination and exact delivery fee quotes happen over WhatsApp after the order is sent.
5. **No Admin CMS Dashboard:** Menu items, prices, WhatsApp number, and the Razorpay link are managed directly in a clean configuration object inside the code.
