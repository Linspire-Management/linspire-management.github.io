// Scroll to menu section smoothly
function scrollToMenu() {
  const menuSection = document.getElementById("menu");
  menuSection.scrollIntoView({ behavior: "smooth" });
}

// Menu display functionality
document.addEventListener('DOMContentLoaded', function() {
  const menuCards = document.querySelectorAll('.menu-card');
  const menuContents = document.querySelectorAll('.menu-content');

  function showMenu(menuId) {
    // Remove active class from all cards and contents
    menuCards.forEach(card => card.classList.remove('active'));
    menuContents.forEach(content => {
      content.classList.remove('active');
    });

    // Find and activate the selected menu
    const selectedCard = document.querySelector(`.menu-card[data-menu="${menuId}"]`);
    const selectedContent = document.getElementById(`menu-${menuId}`);

    if (selectedCard && selectedContent) {
      selectedCard.classList.add('active');

      // Add a small delay before activating content to ensure clean transition
      setTimeout(() => {
        selectedContent.classList.add('active');
      }, 50);
    }
  }

  // Add hover and click events
  menuCards.forEach(card => {
    const menuId = card.getAttribute('data-menu');

    // Hover to preview
    card.addEventListener('mouseenter', function() {
      showMenu(menuId);
    });

    // Click to pin
    card.addEventListener('click', function() {
      showMenu(menuId);
    });
  });

  // Show Menu A by default
  showMenu('a');
});