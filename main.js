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
        { name: 'Single Espresso', price: '45 EGP', emoji: '☕', image: 'espresoo/espresoo Single.png', desc: 'Pure and bold shot' },
        { name: 'Double Espresso', price: '60 EGP', emoji: '☕☕', image: 'espresoo/espresoo Double.png', desc: 'Twice the kick' },
        { name: 'Iced Espresso', price: '55 EGP', emoji: '🧊☕', image: 'espresoo/espresoo Iced.png', desc: 'Chilled and strong' },
      ],
      'Croissant': [
        { name: 'Butter Croissant', price: '40 EGP', emoji: '🥐', image: 'croissant_images/ComfyUI_03433_.png', desc: 'Classic flaky layers' },
        { name: 'Chocolate Croissant', price: '50 EGP', emoji: '🥐🍫', image: 'croissant_images/ComfyUI_03443_.png', desc: 'Filled with chocolate' },
        { name: 'Cheese Croissant', price: '48 EGP', emoji: '🥐🧀', image: 'croissant_images/ComfyUI_03435_.png', desc: 'Savory and soft' },
      ],
      'Hot Chocolate': [
        { name: 'Small Hot Chocolate', price: '55 EGP', emoji: '🍫', image: 'hot_chocolate/Hot Chocolate S.png', desc: 'Rich cocoa' },
        { name: 'Regular Hot Chocolate', price: '65 EGP', emoji: '🍫', image: 'hot_chocolate/Hot Chocolate M.png', desc: 'Creamy classic' },
        { name: 'Large Hot Chocolate', price: '75 EGP', emoji: '🍫', image: 'hot_chocolate/Hot Chocolate L.png', desc: 'Extra cozy' },
      ],
      'Donuts': [
        { name: 'Classic Glazed', price: '35 EGP', emoji: '🍩', image: 'donuts/DONUT1.png', desc: 'Sweet and light' },
        { name: 'Chocolate Donut', price: '40 EGP', emoji: '🍩🍫', image: 'donuts/DONUT2.png', desc: 'Chocolate icing' },
        { name: 'Filled Donut', price: '45 EGP', emoji: '🍩', image: 'donuts/DONUT3.png', desc: 'Cream or jam inside' },
      ],
      'Matcha Latte': [
        { name: 'Hot Matcha Latte', price: '75 EGP', emoji: '🍵', image: 'matcha/Matcha .png', desc: 'Earthy and warm' },
        { name: 'Iced Matcha Latte', price: '80 EGP', emoji: '🧊🍵', image: 'matcha/Matcha Iced.png', desc: 'Refreshing' },
        { name: 'Oat Matcha Latte', price: '90 EGP', emoji: '🍵🌾', image: 'matcha/Matcha Oat.png', desc: 'Plant-based' },
      ],
      'Cupcakes': [
        { name: 'Vanilla Cupcake', price: '35 EGP', emoji: '🧁', image: 'cupcakes/Cupcake Vanilla.png', desc: 'Simple and sweet' },
        { name: 'Chocolate Cupcake', price: '38 EGP', emoji: '🧁🍫', image: 'cupcakes/Cupcake Chocolate.png', desc: 'Chocolate sponge' },
        { name: 'Red Velvet Cupcake', price: '42 EGP', emoji: '🧁', image: 'cupcakes/Cupcake Red Velvet.png', desc: 'Cream cheese frosting' },
      ],
    };

    function renderCategory(category) {
      const items = catalog[category] || [];
      categoryNameEl.textContent = category;
      grid.innerHTML = '';

      items.forEach((p) => {
        const card = document.createElement('div');
        card.className = 'bg-white p-6 rounded-xl shadow hover:shadow-xl transition-transform transform hover:-translate-y-2';

        // Media area (image preferred, fallback to emoji)
        const media = document.createElement('div');
        media.className = 'mb-2';
        if (p.image) {
          const img = document.createElement('img');
          img.src = p.image;
          img.alt = p.name;
          img.loading = 'lazy';
          img.decoding = 'async';
          img.className = 'w-full h-36 object-contain object-center rounded-md bg-white';
          img.onerror = function () {
            media.textContent = p.emoji || '';
            media.className = 'text-4xl mb-2';
          };
          media.appendChild(img);
        } else {
          media.textContent = p.emoji || '';
          media.className = 'text-4xl mb-2';
        }
        card.appendChild(media);

        // Text content
        const row = document.createElement('div');
        row.className = 'flex items-baseline justify-between';
        const title = document.createElement('h4');
        title.className = 'text-lg font-semibold text-brown-700';
        title.textContent = p.name;
        const priceTag = document.createElement('span');
        priceTag.className = 'text-amber-700 font-bold';
        priceTag.textContent = p.price;
        row.appendChild(title);
        row.appendChild(priceTag);
        card.appendChild(row);

        if (p.desc) {
          const desc = document.createElement('p');
          desc.className = 'text-gray-600 text-sm mt-1';
          desc.textContent = p.desc;
          card.appendChild(desc);
        }

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
        if (menuSection && typeof menuSection.scrollIntoView === 'function') {
          menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  });

  // Emoji rain removed