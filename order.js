(() => {
  "use strict";
  const form = document.getElementById("order-form");
  const name = document.getElementById("customer-name");
  const phone = document.getElementById("customer-phone");
  const cake = document.getElementById("cake-type");
  const date = document.getElementById("required-date");
  const status = document.getElementById("order-status");
  const localDate = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const updateMinimum = () => {
    const earliest = new Date();
    earliest.setDate(earliest.getDate() + 5);
    date.min = localDate(earliest);
  };
  updateMinimum();
  document.getElementById("order-submit").disabled = false;
  for (const field of [name, phone, date]) {
    field.addEventListener("input", () => field.setCustomValidity(""));
  }
  form.addEventListener("submit", event => {
    event.preventDefault();
    updateMinimum();
    name.setCustomValidity(name.value.trim() ? "" : "Please enter your name.");
    const digits = phone.value.replace(/\D/g, "");
    phone.setCustomValidity(/^[+\d\s().-]+$/.test(phone.value) && digits.length >= 7 && digits.length <= 15 ? "" : "Please enter a valid phone number, including your country code if needed.");
    date.setCustomValidity(date.value && date.value < date.min ? "Please choose a date at least 5 days from today." : "");
    if (!form.reportValidity()) return;
    const number = String(window.VELVET_BITES_SETTINGS?.whatsappNumber || "").replace(/[+\s()-]/g, "");
    if (!/^[1-9]\d{6,14}$/.test(number)) {
      status.textContent = "WhatsApp ordering is temporarily unavailable. Please contact us on Instagram below.";
      return;
    }
    const [year, month, day] = date.value.split("-").map(Number);
    const formattedDate = new Date(year, month - 1, day).toLocaleDateString("en-IN", {day:"numeric", month:"long", year:"numeric"});
    const message = ["Hello Velvet Bites! I'd like to request a cake order.", "", `Name: ${name.value.trim()}`, `Phone: ${phone.value.trim()}`, `Cake: ${cake.value}`, `Required date: ${formattedDate}`, "", "Please confirm availability and the order details. Thank you!"].join("\n");
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    status.textContent = "Continue in WhatsApp and tap Send. Your order has not been confirmed yet.";
    window.location.assign(url);
  });
})();
