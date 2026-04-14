// ===== НАВИГАЦИЯ =====
function showPage(pageId) {
  // Скрыть все страницы
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Убрать активную кнопку
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  // Показать нужную страницу
  const page = document.getElementById(pageId);
  if (page) page.classList.add('active');

  // Подсветить кнопку
  document.querySelectorAll('.nav-btn').forEach(btn => {
    if (btn.getAttribute('onclick') === `showPage('${pageId}')`) {
      btn.classList.add('active');
    }
  });

  // Прокрутить наверх
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== ГАЛЕРЕЯ =====
function filterGallery(cat, btn) {
  // Переключить активный таб
  document.querySelectorAll('.gtab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  // Показать/скрыть элементы
  document.querySelectorAll('.gallery-item').forEach(item => {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

function openModal(el) {
  const imgEl = el.querySelector('.gallery-img');
  const caption = el.querySelector('.gallery-caption').textContent;

  const modal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');

  // Копируем стиль фона и содержимое
  modalImg.style.background = imgEl.style.background;
  const placeholder = imgEl.querySelector('.gallery-placeholder');
  modalImg.textContent = placeholder ? placeholder.textContent : '';
  modalCaption.textContent = caption;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('galleryModal').classList.remove('open');
  document.body.style.overflow = '';
}

// Закрыть модалку по Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ===== КОРЗИНА (ЗАЯВКИ) =====
let cart = [];

function addToCart(name, price) {
  // Не добавлять дубликат
  if (cart.find(i => i.name === name)) {
    alert(`"${name}" уже добавлен в заявки.`);
    return;
  }
  cart.push({ name, price });
  renderCart();

  // Показать все блоки корзины на странице
  document.querySelectorAll('#cartBlock').forEach(el => {
    el.style.display = 'block';
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

function renderCart() {
  const itemsEl = document.querySelectorAll('#cartItems');
  const totalEl = document.querySelectorAll('#cartTotal');

  const html = cart.map((item, i) => `
    <div class="cart-item">
      <span class="cart-item-name">${item.name}</span>
      <button class="cart-item-remove" onclick="removeFromCart(${i})" title="Удалить">×</button>
    </div>
  `).join('');

  const total = cart.reduce((sum, i) => sum + i.price, 0);

  itemsEl.forEach(el => el.innerHTML = html);
  totalEl.forEach(el => el.textContent = total.toLocaleString('ru-RU'));
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
  if (cart.length === 0) {
    document.querySelectorAll('#cartBlock').forEach(el => el.style.display = 'none');
  }
}

function clearCart() {
  cart = [];
  document.querySelectorAll('#cartBlock').forEach(el => el.style.display = 'none');
}

function checkout() {
  const name = document.getElementById('clientName')?.value.trim();
  const phone = document.getElementById('clientPhone')?.value.trim();

  if (!name || !phone) {
    alert('Пожалуйста, укажите имя и номер телефона.');
    return;
  }

  if (cart.length === 0) {
    alert('Добавьте хотя бы одно помещение в заявку.');
    return;
  }

  const items = cart.map(i => i.name).join(', ');
  alert(`Спасибо, ${name}!\n\nЗаявка на аренду получена:\n${items}\n\nМы свяжемся с вами по номеру ${phone} в течение суток.`);

  clearCart();
  document.getElementById('clientName').value = '';
  document.getElementById('clientPhone').value = '';
  const company = document.getElementById('clientCompany');
  if (company) company.value = '';
}

// ===== ФОРМА ЗЕМЕЛЬНОГО УЧАСТКА =====
function submitLandForm() {
  const name = document.getElementById('landName')?.value.trim();
  const phone = document.getElementById('landPhone')?.value.trim();
  const purpose = document.getElementById('landPurpose')?.value;
  const comment = document.getElementById('landComment')?.value.trim();

  if (!name || !phone) {
    alert('Пожалуйста, укажите имя и номер телефона.');
    return;
  }

  const purposeText = purpose ? `\nЦель: ${purpose}` : '';
  const commentText = comment ? `\nПожелания: ${comment}` : '';

  alert(`Спасибо!\n\nЗаявка на аренду земельного участка принята.\n\nКонтакт: ${name}, ${phone}${purposeText}${commentText}\n\nМы свяжемся с вами в течение рабочего дня.`);

  document.getElementById('landName').value = '';
  document.getElementById('landPhone').value = '';
  document.getElementById('landPurpose').value = '';
  document.getElementById('landComment').value = '';
}
