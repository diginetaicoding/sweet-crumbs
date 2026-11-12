# Sweet Crumbs by Sneha — Website & Operations Guide

## 📋 Order Verification Checklist for Sneha (Before Baking)

Because WhatsApp orders are initiated directly from customer phones without a backend database, customers have the ability to edit text messages or type unverified payment claims before tapping send. 

Follow this quick **2-step safety checklist** every time a new order inquiry arrives:

---

### 1. Verify ₹200 Advance on Razorpay (Custom Cakes)
> ⚠️ **Never start baking or purchasing custom supplies based solely on a WhatsApp text or screenshot.**

* **Log into your Razorpay Dashboard** (app or website at [dashboard.razorpay.com](https://dashboard.razorpay.com/)).
* Navigate to **Transactions / Payments** or **Payment Links**.
* **Confirm the ₹200 payment actually settled** and matches the customer's name, phone number, or payment reference ID (`pay_...`).
* Only after you see **"Captured / Successful"** status in Razorpay, confirm the delivery slot and calendar date with the customer.

---

### 2. Verify Menu Price & Surcharges
> ⚠️ **Do not assume the "Estimated Price" in the WhatsApp message is final or unaltered.**

* A customer can edit the text inside WhatsApp before sending the message (e.g. changing `Estimated Price: Rs. 1000` to `Rs. 500`).
* Cross-reference the order against your official menu price card:
  * **0.5 kg vs 1 kg base price**
  * **Eggless surcharge:** Add +₹50 if eggless is requested
  * **Delivery charge:** Quote any applicable local delivery fee based on their Kochi delivery area
* Reply on WhatsApp with your confirmed total bill:
  > *"Hi [Name]! Thanks for reaching out. We have received your order for [Cake Name] ([Size], [Dietary]). The total comes to Rs. [Verified Price]. We will deliver on [Date]."*

---

## 🚀 Pre-Launch Configuration Reminder

Before making this website public, update the central configuration at the top of `script.js` and the header metadata in `index.html`:
1. **WhatsApp Number:** Replace `"910000000000"` with your actual WhatsApp business phone number.
2. **Razorpay Link:** Update `razorpayAdvanceLink` with your live Razorpay custom cake booking link.
