document.addEventListener('DOMContentLoaded', () => {
  const hasVisibleText = (element) => (element.textContent || '').replace(/\s+/g, '') !== '';

  const hasNamedImage = (element) => Array.from(element.querySelectorAll('img[alt]'))
    .some((image) => image.getAttribute('alt').trim() !== '');

  const labelIconLinks = (selector, label) => {
    document.querySelectorAll(selector).forEach((link) => {
      if (!link.getAttribute('aria-label') && !hasVisibleText(link) && !hasNamedImage(link)) {
        link.setAttribute('aria-label', label);
      }
    });
  };

  const mainRegion = document.querySelector('.astroid-component-area');
  if (mainRegion) {
    mainRegion.setAttribute('role', 'main');
    if (!mainRegion.id) {
      mainRegion.id = 'main-content';
    }
  }

  const pageTitle = document.querySelector('#astroid-header .custom.text-menu > *');
  if (pageTitle) {
    pageTitle.setAttribute('role', 'heading');
    pageTitle.setAttribute('aria-level', '1');
    pageTitle.style.margin = '0';
  }

  document.querySelectorAll('a.astroid-logo[href="index.html"]').forEach((link) => {
    link.setAttribute('aria-label', 'Iris Business Support home');
  });

  document.querySelectorAll('[data-href="index.html"][tabindex][role="button"][data-sstype="col"]').forEach((card) => {
    card.removeAttribute('tabindex');
    card.removeAttribute('role');
    card.removeAttribute('data-href');
    card.removeAttribute('data-n2click');
    card.removeAttribute('data-force-pointer');

    const logoImage = card.querySelector('img[src$="logo_iriss_support.png"]');
    if (logoImage) {
      if (!logoImage.getAttribute('alt')) {
        logoImage.setAttribute('alt', 'Iris Business Support');
      }

      const picture = logoImage.closest('picture') || logoImage;
      if (!picture.closest('a')) {
        const homeLink = document.createElement('a');
        homeLink.href = 'index.html';
        homeLink.setAttribute('aria-label', 'Iris Business Support home');
        picture.parentNode.insertBefore(homeLink, picture);
        homeLink.appendChild(picture);
      }
    }
  });

  labelIconLinks('a[href="mailto:info@irissupport.nl"]', 'Email Iris Business Support');
  labelIconLinks('a[href="tel:310653245253"]', 'Bel Iris Business Support op +31 6 53 24 52 53');
  labelIconLinks('a[href="https://www.facebook.com/irisabella.bakker"]', 'Facebook Iris Business Support');
  labelIconLinks('a[href="https://www.instagram.com/irisabella1/"]', 'Instagram Iris Business Support');
  labelIconLinks('a[href="https://www.linkedin.com/in/irisabella-bakker-21731ba7/"]', 'LinkedIn Iris Business Support');
});