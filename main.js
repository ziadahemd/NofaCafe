document.addEventListener('DOMContentLoaded', function () {
  var menuButton = document.getElementById('menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  var menuOpenIcon = document.getElementById('menu-open');
  var menuCloseIcon = document.getElementById('menu-close');

  if (!menuButton || !mobileMenu) return;

  function syncMenuUI() {
    var isOpen = !mobileMenu.classList.contains('hidden');
    if (menuOpenIcon) menuOpenIcon.classList.toggle('hidden', isOpen);
    if (menuCloseIcon) menuCloseIcon.classList.toggle('hidden', !isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
  }

  // Initialize state
  menuButton.setAttribute('aria-controls', 'mobile-menu');
  mobileMenu.classList.add('hidden');
  syncMenuUI();

  // Toggle on button click
  menuButton.addEventListener('click', function () {
    mobileMenu.classList.toggle('hidden');
    syncMenuUI();
  });

  // Close menu after selecting a link
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.add('hidden');
      syncMenuUI();
    });
  });

  // Ensure menu is closed when resizing to desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) {
      mobileMenu.classList.add('hidden');
      syncMenuUI();
    }
  });
});


  // Category products view
  document.addEventListener('DOMContentLoaded', function () {
    const section = document.getElementById('category-products');
    const menuSection = document.getElementById('menu');
    const categoryNameEl = document.getElementById('category-name');
    const grid = document.getElementById('products-grid');
    const backLink = document.getElementById('back-to-menu');
    const tiles = document.querySelectorAll('.menu-item');

    if (!section || !categoryNameEl || !grid || tiles.length === 0) return;

    const catalog = {
      'Espresso': [
        { name: 'Single Espresso', price: '45 EGP', emoji: '☕', desc: 'Pure and bold shot' },
        { name: 'Double Espresso', price: '60 EGP', emoji: '☕☕', desc: 'Twice the kick' },
        { name: 'Iced Espresso', price: '55 EGP', emoji: '🧊☕', desc: 'Chilled and strong' },
      ],
      'Croissant': [
        { name: 'Butter Croissant', price: '40 EGP', emoji: '🥐', desc: 'Classic flaky layers' },
        { name: 'Chocolate Croissant', price: '50 EGP', emoji: '🥐🍫', desc: 'Filled with chocolate' },
        { name: 'Cheese Croissant', price: '48 EGP', emoji: '🥐🧀', desc: 'Savory and soft' },
      ],
      'Hot Chocolate': [
        { name: 'Small Hot Chocolate', price: '55 EGP', emoji: '🍫', desc: 'Rich cocoa' },
        { name: 'Regular Hot Chocolate', price: '65 EGP', emoji: '🍫', desc: 'Creamy classic' },
        { name: 'Large Hot Chocolate', price: '75 EGP', emoji: '🍫', desc: 'Extra cozy' },
      ],
      'Donuts': [
        { name: 'Classic Glazed', price: '35 EGP', emoji: '🍩', desc: 'Sweet and light' },
        { name: 'Chocolate Donut', price: '40 EGP', emoji: '🍩🍫', desc: 'Chocolate icing' },
        { name: 'Filled Donut', price: '45 EGP', emoji: '🍩', desc: 'Cream or jam inside' },
      ],
      'Matcha Latte': [
        { name: 'Hot Matcha Latte', price: '75 EGP', emoji: '🍵', desc: 'Earthy and warm' },
        { name: 'Iced Matcha Latte', price: '80 EGP', emoji: '🧊🍵', desc: 'Refreshing' },
        { name: 'Oat Matcha Latte', price: '90 EGP', emoji: '🍵🌾', desc: 'Plant-based' },
      ],
      'Cupcakes': [
        { name: 'Vanilla Cupcake', price: '35 EGP', emoji: '🧁', desc: 'Simple and sweet' },
        { name: 'Chocolate Cupcake', price: '38 EGP', emoji: '🧁🍫', desc: 'Chocolate sponge' },
        { name: 'Red Velvet Cupcake', price: '42 EGP', emoji: '🧁', desc: 'Cream cheese frosting' },
      ],
    };

    function renderCategory(category) {
      const items = catalog[category] || [];
      categoryNameEl.textContent = category;
      grid.innerHTML = '';

      items.forEach((p) => {
        const card = document.createElement('div');
        card.className = 'bg-white p-6 rounded-xl shadow hover:shadow-xl transition-transform transform hover:-translate-y-2';
        card.innerHTML = `
          <div class="text-4xl mb-2">${p.emoji || ''}</div>
          <div class="flex items-baseline justify-between">
            <h4 class="text-lg font-semibold text-brown-700">${p.name}</h4>
            <span class="text-amber-700 font-bold">${p.price}</span>
          </div>
          ${p.desc ? `<p class="text-gray-600 text-sm mt-1">${p.desc}</p>` : ''}
        `;
        grid.appendChild(card);
      });

      if (menuSection) menuSection.classList.add('hidden');
      section.classList.remove('hidden');
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    tiles.forEach((t) => {
      t.addEventListener('click', () => {
        const cat = t.getAttribute('data-product');
        renderCategory(cat);
      });
    });

    if (backLink) {
      backLink.addEventListener('click', () => {
        section.classList.add('hidden');
        if (menuSection) menuSection.classList.remove('hidden');
        menuSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  });