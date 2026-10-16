(() => {
  const container = document.getElementById('menu-items');
  const select = document.getElementById('cake-type');
  const items = window.VELVET_BITES_MENU;
  if (!Array.isArray(items) || !items.length) {
    container.textContent = 'Please contact us on Instagram for our current cake selection.';
    return;
  }
  const groups = new Map();
  const currency = new Intl.NumberFormat('en-IN', {style:'currency', currency:'INR', minimumFractionDigits:0, maximumFractionDigits:2});
  for (const item of items) {
    if (!item.name || !Number.isFinite(item.price) || item.price <= 0) continue;
    const category = item.category || 'Our cakes';
    if (!groups.has(category)) {
      const article = document.createElement('article'); article.className = 'menu-card';
      const title = document.createElement('span'); title.className = 'category'; title.textContent = category;
      const list = document.createElement('dl'); article.append(title,list); container.append(article); groups.set(category,list);
    }
    const row = document.createElement('div');
    const name = document.createElement('dt'); name.textContent = item.name;
    const price = document.createElement('dd'); price.textContent = currency.format(item.price);
    row.append(name,price); groups.get(category).append(row);
    const option = document.createElement('option'); option.value = item.name; option.textContent = `${item.name} — ${currency.format(item.price)}/kg`; select.append(option);
  }
})();

