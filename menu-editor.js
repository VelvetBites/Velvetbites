(() => {
  const rows = document.getElementById('editor-rows');
  let changed = false;
  function add(item = {name:'',price:'',category:'Classics & velvets'}) {
    const row = document.createElement('div'); row.className = 'edit-row';
    for (const [key,title] of [['name','Cake name'],['price','Price per kg (₹)'],['category','Category']]) {
      const label = document.createElement('label'); label.textContent = title;
      const input = document.createElement('input'); input.dataset.field = key; input.value = item[key]; input.required = true;
      if (key === 'price') {input.type = 'number'; input.min = '0.01'; input.step = '0.01';} else {input.maxLength = 100;}
      input.addEventListener('input', () => {changed = true; input.setCustomValidity('');});
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
      get('name').setCustomValidity(!name ? 'Enter a cake name.' : names.has(name.toLowerCase()) ? 'Each cake needs a unique name.' : '');
      get('category').setCustomValidity(category ? '' : 'Enter a category.');
      names.add(name.toLowerCase()); items.push({name,price:Number(get('price').value),category});
    }
    if (!event.target.reportValidity()) return;
    const status = document.getElementById('editor-status');
    if (!items.length) {status.textContent = 'Add at least one cake before downloading.'; return;}
    const text = '// Prices are INR per kg. Edit using menu-editor.html.\nwindow.VELVET_BITES_MENU = ' + JSON.stringify(items,null,2) + ';\n';
    const url = URL.createObjectURL(new Blob([text],{type:'text/javascript;charset=utf-8'}));
    const link = document.createElement('a'); link.href = url; link.download = 'menu.js'; link.click(); setTimeout(() => URL.revokeObjectURL(url),10000);
    changed = false; status.textContent = 'Downloaded. Replace your website’s menu.js with this file, then reload the website. Your live website has not changed yet.';
  });
  window.addEventListener('beforeunload', event => {if(changed){event.preventDefault();event.returnValue='';}});
})();
