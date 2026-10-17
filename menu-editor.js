(() => {
  const rows = document.getElementById('editor-rows');
  let changed = false;
  function add(item = {name:'',priceHalf:'',price:'',pricePiece:'',category:'Cakes'}) {
    const row = document.createElement('div'); row.className = 'edit-row';
    for (const [key,title] of [['name','Cake name'],['priceHalf','½ kg (₹)'],['price','1 kg (₹)'],['pricePiece','Per piece (₹)'],['category','Category']]) {
      const label = document.createElement('label'); label.textContent = title;
      const input = document.createElement('input'); input.dataset.field = key; input.value = item[key] ?? ''; input.required = !key.startsWith('price');
      if (key.startsWith('price')) {input.type = 'number'; input.min = '0.01'; input.step = '0.01';} else {input.maxLength = 100;}
      input.addEventListener('input', () => {changed = true; input.setCustomValidity(''); row.querySelectorAll('input[type=number]').forEach(field => field.setCustomValidity(''));});
      label.append(input); row.append(label);
    }
    const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'remove'; remove.textContent = 'Remove';
    remove.addEventListener('click', () => {row.remove(); changed = true;}); row.append(remove); rows.append(row);
    return row;
  }
  (window.VELVET_BITES_MENU || []).forEach(add);
  document.getElementById('add-item').addEventListener('click', () => {add().querySelector('input').focus(); changed = true;});
  document.getElementById('editor-form').addEventListener('submit', event => {
    event.preventDefault();
    const items = []; const names = new Set();
    for (const row of rows.children) {
      const get = key => row.querySelector(`[data-field="${key}"]`);
      const name = get('name').value.trim(), category = get('category').value.trim();
      get('name').setCustomValidity(!name ? 'Enter a cake name.' : names.has(category.toLowerCase() + ':' + name.toLowerCase()) ? 'Each item needs a unique name within its category.' : '');
      get('category').setCustomValidity(category ? '' : 'Enter a category.');
      names.add(category.toLowerCase() + ':' + name.toLowerCase());
      const prices = Object.fromEntries(['priceHalf','price','pricePiece'].map(key => [key,get(key).value === '' ? null : Number(get(key).value)]));
      get('price').setCustomValidity(Object.values(prices).some(value => value > 0) ? '' : 'Enter at least one price for this item.');
      items.push({name,...prices,category});
    }
    if (!event.target.reportValidity()) return;
    const status = document.getElementById('editor-status');
    if (!items.length) {status.textContent = 'Add at least one cake before downloading.'; return;}
    const text = '// Prices are INR by size. Blank sizes are unavailable. Edit using menu-editor.html.\nwindow.VELVET_BITES_MENU = ' + JSON.stringify(items,null,2) + ';\n';
    const url = URL.createObjectURL(new Blob([text],{type:'text/javascript;charset=utf-8'}));
    const link = document.createElement('a'); link.href = url; link.download = 'menu.js'; link.click(); setTimeout(() => URL.revokeObjectURL(url),10000);
    changed = false; status.textContent = 'Downloaded. Replace your website’s menu.js with this file, then reload the website. Your live website has not changed yet.';
  });
  window.addEventListener('beforeunload', event => {if(changed){event.preventDefault();event.returnValue='';}});
})();
