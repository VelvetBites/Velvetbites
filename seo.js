// Keep structured business/menu data synchronized with the editable settings.
(() => {
  const element = document.getElementById('bakery-schema');
  const data = JSON.parse(element.textContent);
  const phone = String(window.VELVET_BITES_SETTINGS?.whatsappNumber || '').replace(/\D/g, '');
  if (phone) data.telephone = '+' + phone;
  const groups = new Map();
  for (const item of window.VELVET_BITES_MENU || []) {
    const offers = [['priceHalf','½ kg'],['price','1 kg'],['pricePiece','1 piece']]
      .filter(([key]) => Number.isFinite(item[key]) && item[key] > 0)
      .map(([key,label]) => ({'@type':'Offer',name:label,price:item[key],priceCurrency:'INR'}));
    if (!item.name || !offers.length) continue;
    const category = item.category || 'Our cakes';
    if (!groups.has(category)) groups.set(category,[]);
    groups.get(category).push({'@type':'MenuItem',name:item.name,offers});
  }
  data.hasMenu = {'@type':'Menu',name:'Velvet Bites menu',hasMenuSection:[...groups].map(([name,hasMenuItem]) => ({'@type':'MenuSection',name,hasMenuItem}))};
  element.textContent = JSON.stringify(data);
})();
