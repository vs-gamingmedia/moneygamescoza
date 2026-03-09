import { injectLayout } from '../components/layout';

function init() {
  injectLayout();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
