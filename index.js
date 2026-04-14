// Import Web Components
import './components/nav-bottom.js';
import './components/fab-button.js';
import './components/app-sidebar.js';
import './components/campista-form.js';
import './components/campista-card.js';
import './components/campista-detail.js';

// App state
let currentView = 'list';

// Main app logic
document.addEventListener('DOMContentLoaded', () => {
  const fab = document.querySelector('fab-button');
  const sidebar = document.querySelector('app-sidebar');
  const form = document.querySelector('campista-form');
  const detail = document.querySelector('campista-detail');
  const campersList = document.querySelector('.campers__list');

  // Open form handler
  const openForm = () => {
    form.open();
  };

  // Navigate to detail view
  const showDetail = (campista) => {
    currentView = 'detail';
    if (detail) {
      detail.show(campista);
    }
    if (campersList) {
      campersList.style.display = 'none';
    }
  };

  // Navigate back to list view
  const showList = () => {
    currentView = 'list';
    if (campersList) {
      campersList.style.display = 'block';
    }
    if (detail) {
      // Ensure any previous inline override does not block :host display rules.
      detail.style.display = '';
      detail.hide();
    }
  };

  // FAB click opens form
  fab.addEventListener('fab-click', openForm);

  // Sidebar add button opens form
  sidebar.addEventListener('add-camper', openForm);

  // Handle camper save
  form.addEventListener('camper-save', (e) => {
    console.log('Campista guardado:', e.detail);
    // TODO: Add logic to save camper to list
  });

  // Handle back to list from detail view
  detail?.addEventListener('back-to-list', showList);

  // Add click listeners to camper cards
  if (campersList) {
    campersList.addEventListener('card-click', (e) => {
      showDetail(e.detail);
    });
  }
});
