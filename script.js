const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  nav.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });
}

const filterButtons = document.querySelectorAll('[data-filter]');
const galleryCards = document.querySelectorAll('[data-category]');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');

    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    galleryCards.forEach((card) => {
      const category = card.getAttribute('data-category');
      card.hidden = filter !== 'all' && category !== filter;
    });
  });
});

const bookingForm = document.querySelector('#booking-form');
const formStatus = document.querySelector('#form-status');

if (bookingForm && formStatus) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const requiredFields = ['name', 'email', 'service', 'design', 'date'];
    const missing = requiredFields.filter((field) => !String(formData.get(field) || '').trim());

    if (missing.length > 0) {
      formStatus.textContent = 'Please fill out the required details before preparing the request.';
      return;
    }

    const email = String(formData.get('email'));
    const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailLooksValid) {
      formStatus.textContent = 'Please enter a valid email address.';
      return;
    }

    const requestSummary = [
      `Name: ${formData.get('name')}`,
      `Email: ${formData.get('email')}`,
      `Service: ${formData.get('service')}`,
      `Design level: ${formData.get('design')}`,
      `Preferred date: ${formData.get('date')}`,
      `Notes: ${formData.get('notes') || 'No notes provided'}`
    ].join('\n');

    formStatus.textContent = 'Request prepared. Replace this demo behavior with a real booking form before publishing.';
    console.info('Booking request preview:\n' + requestSummary);
  });
}

const header = document.querySelector('[data-header]');
let lastScroll = 0;

if (header) {
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    header.style.transform = current > lastScroll && current > 120 ? 'translateY(-120%)' : 'translateY(0)';
    lastScroll = current;
  }, { passive: true });
}
