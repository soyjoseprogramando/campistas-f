// Import Web Components
import './components/nav-bottom.js';
import './components/fab-button.js';
import './components/app-sidebar.js';
import './components/campista-form.js';
import './components/campista-card.js';

// Main app logic
document.addEventListener('DOMContentLoaded', () => {
  const fab = document.querySelector('fab-button');
  const sidebar = document.querySelector('app-sidebar');
  const form = document.querySelector('campista-form');

  // Open form handler
  const openForm = () => {
    form.open();
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
});
