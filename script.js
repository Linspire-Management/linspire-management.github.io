// Scroll to menu section smoothly
function scrollToMenu() {
  const menuSection = document.getElementById("menu");
  menuSection.scrollIntoView({ behavior: "smooth" });
}

// Menu display functionality
document.addEventListener('DOMContentLoaded', function() {
  const menuCards = document.querySelectorAll('.menu-card');
  const menuContents = document.querySelectorAll('.menu-content');

  // Populate included items from previous menus
  function populateIncludedItems() {
    menuContents.forEach(content => {
      const includes = content.getAttribute('data-includes');
      if (includes) {
        const menuLists = content.querySelectorAll('.menu-list');
        const regularMenuList = menuLists[0]; // First list for regular items
        const selfServeMenuList = menuLists[1]; // Second list for self-serve items

        // Get items from included menus
        const includeMenus = includes.split(',').map(m => m.trim());

        includeMenus.forEach(menuId => {
          const sourceMenu = document.getElementById(`menu-${menuId}`);
          if (sourceMenu) {
            const sourceLists = sourceMenu.querySelectorAll('.menu-list');

            // Clone regular items from first list
            if (sourceLists[0]) {
              const regularItems = sourceLists[0].querySelectorAll('li:not(.menu-included)');
              regularItems.forEach(item => {
                const clonedItem = item.cloneNode(true);
                clonedItem.classList.add('menu-included');
                regularMenuList.appendChild(clonedItem);
              });
            }

            // Clone self-serve items from second list
            if (sourceLists[1] && selfServeMenuList) {
              const selfServeItems = sourceLists[1].querySelectorAll('li:not(.menu-included)');
              selfServeItems.forEach(item => {
                const clonedItem = item.cloneNode(true);
                clonedItem.classList.add('menu-included');
                selfServeMenuList.appendChild(clonedItem);
              });
            }
          }
        });
      }
    });
  }

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

  // Populate included items first
  populateIncludedItems();

  // Show Menu A by default
  showMenu('a');
});