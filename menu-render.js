(() => {
  const container = document.getElementById('menu-items');
  const items = window.VELVET_BITES_MENU;
  if (!Array.isArray(items) || !items.length) {
    container.textContent = 'Please contact us on Instagram for our current cake selection.';
    return;
  }
  const groups = new Map();
  const currency = new Intl.NumberFormat('en-IN', {style:'currency', currency:'INR', minimumFractionDigits:0, maximumFractionDigits:2});
  for (const item of items) {
    const variants = [['priceHalf','½ kg'],['price','1 kg'],['pricePiece','piece']].filter(([key]) => Number.isFinite(item[key]) && item[key] > 0);
    if (!item.name || !variants.length) continue;
    const category = item.category || 'Our cakes';
    if (!groups.has(category)) {
      const article = document.createElement('article'); article.className = 'menu-card';
      const title = document.createElement('span'); title.className = 'category'; title.textContent = category;
      const list = document.createElement('dl'); article.append(title,list); container.append(article); groups.set(category,list);
    }
    const row = document.createElement('div');
    const name = document.createElement('dt'); name.textContent = item.name;
    const price = document.createElement('dd'); price.className = 'size-prices';
    for (const [key,unit] of variants) { const line = document.createElement('span'); line.textContent = `${currency.format(item[key])} / ${unit}`; price.append(line); }
    row.append(name,price); groups.get(category).append(row);

  }
  const tabs = document.createElement('div');
  tabs.className = 'menu-tabs';
  tabs.setAttribute('role', 'tablist');
  tabs.setAttribute('aria-label', 'Menu categories');
  container.before(tabs);
  const panels = [...groups.values()].map(list => list.parentElement);
  const buttons = [];
  function activate(index, focus = false) {
    buttons.forEach((button, i) => {
      button.setAttribute('aria-selected', String(i === index));
      button.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (focus) buttons[index].focus();
  }
  [...groups.keys()].forEach((category, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = category;
    button.id = `menu-tab-${index}`;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', `menu-panel-${index}`);
    panels[index].id = `menu-panel-${index}`;
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].setAttribute('aria-labelledby', button.id);
    panels[index].tabIndex = 0;
    button.addEventListener('click', () => activate(index));
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % panels.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + panels.length) % panels.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = panels.length - 1;
      if (next !== undefined) { event.preventDefault(); activate(next, true); }
    });
    buttons.push(button);
    tabs.append(button);
  });
  if (buttons.length) activate(0);
})();

