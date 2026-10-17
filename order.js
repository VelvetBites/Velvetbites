(() => {
  "use strict";
  const form = document.getElementById("order-form");
  const name = document.getElementById("customer-name");
  const phone = document.getElementById("customer-phone");
  const cake = document.getElementById("cake-type");
  const category = document.getElementById("order-category");
  const size = document.getElementById("order-size");
  const sizes = [['priceHalf', '½ kg'], ['price', '1 kg'], ['pricePiece', '1 piece']];
  const currency = new Intl.NumberFormat('en-IN', {style:'currency', currency:'INR', minimumFractionDigits:0, maximumFractionDigits:2});
  const items = (window.VELVET_BITES_MENU || []).filter(item => item.name && sizes.some(([key]) => Number.isFinite(item[key]) && item[key] > 0));
  const categoryOf = item => item.category || 'Our cakes';
  const reset = (select, placeholder) => { select.replaceChildren(new Option(placeholder, '')); select.disabled = true; };
  const selectedItem = () => items.find(item => categoryOf(item) === category.value && item.name === cake.value);
  for (const label of new Set(items.map(categoryOf))) category.add(new Option(label, label));
  category.addEventListener('change', () => {
    reset(cake, category.value ? 'Choose your item' : 'Choose a category first');
    reset(size, 'Choose an item first');
    for (const item of items.filter(item => categoryOf(item) === category.value)) cake.add(new Option(item.name, item.name));
    cake.disabled = cake.options.length < 2;
  });
  cake.addEventListener('change', () => {
    reset(size, cake.value ? 'Choose a size' : 'Choose an item first');
    const item = selectedItem();
    if (!item) return;
    for (const [key, label] of sizes) {
      if (Number.isFinite(item[key]) && item[key] > 0) size.add(new Option(`${label} — ${currency.format(item[key])}`, key));
    }
    size.disabled = size.options.length < 2;
  });
  const date = document.getElementById("required-date");
  const status = document.getElementById("order-status");
  const address = document.getElementById("customer-address");
  const updateMinimumDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    date.min = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;
  };
  updateMinimumDate();
  date.addEventListener("focus", updateMinimumDate);
  document.getElementById("order-submit").disabled = false;
  for (const field of [name, phone, date, address]) {
    field.addEventListener("input", () => field.setCustomValidity(""));
  }
  form.addEventListener("submit", event => {
    event.preventDefault();
    updateMinimumDate();
    date.setCustomValidity(date.value && date.value < date.min ? "Please choose tomorrow or a later date." : "");
    name.setCustomValidity(name.value.trim() ? "" : "Please enter your name.");
    const digits = phone.value.replace(/\D/g, "");
    phone.setCustomValidity(/^[+\d\s().-]+$/.test(phone.value) && digits.length >= 7 && digits.length <= 15 ? "" : "Please enter a valid phone number, including your country code if needed.");
    address.setCustomValidity(address.value.trim() ? "" : "Please enter your address.");
    if (!form.reportValidity()) return;
    const item = selectedItem();
    const chosenSize = sizes.find(([key]) => key === size.value);
    if (!item || !chosenSize || !Number.isFinite(item[size.value]) || item[size.value] <= 0) {
      status.textContent = 'Please choose a category, item and available size.';
      return;
    }
    const number = String(window.VELVET_BITES_SETTINGS?.whatsappNumber || "").replace(/[+\s()-]/g, "");
    if (!/^[1-9]\d{6,14}$/.test(number)) {
      status.textContent = "WhatsApp ordering is temporarily unavailable. Please contact us on Instagram below.";
      return;
    }
    const [year, month, day] = date.value.split("-").map(Number);
    const formattedDate = new Date(year, month - 1, day).toLocaleDateString("en-IN", {day:"numeric", month:"long", year:"numeric"});
    // Read the current textarea contents at submission, including line breaks.
    const submittedFields = new FormData(form);
    const deliveryAddress = String(submittedFields.get("address") || "").trim();
    const specialNotes = String(submittedFields.get("specialNotes") || "").trim();
    const message = ["Hello Velvet Bites! I'd like to request a cake order.", "", `Name: ${name.value.trim()}`, `Phone: ${phone.value.trim()}`, `Category: ${category.value}`, `Item: ${cake.value}`, `Size: ${chosenSize[1]}`, `Listed price: ${currency.format(item[size.value])}`, `Required date: ${formattedDate}`, `Address:\n${deliveryAddress}`, `Special notes:\n${specialNotes || "None"}`, "", "Please confirm availability and the order details. Thank you!"].join("\n");
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    status.textContent = "Continue in WhatsApp and tap Send. Your order has not been confirmed yet.";
    window.location.assign(url);
  });
})();
