// Lightweight GA4 wrapper
let initialized = false;

export function initAnalytics(measurementId) {
  if (!measurementId || initialized) return;
  // inject gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', measurementId);
  initialized = true;
}

export function trackPageView(path) {
  if (!window.gtag) return;
  window.gtag('event', 'page_view', { page_path: path });
}

export function trackEvent(eventName, params = {}) {
  if (!window.gtag) return;
  window.gtag('event', eventName, params);
}


