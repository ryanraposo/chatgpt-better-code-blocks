console.log('BETTER CODE BLOCKS - CONTENT SCRIPT RUNNING');

$(document).ready(function() {
  console.log("Script is running");
  let isInitialRun = true;

  const blockSelector = 'div.dark.bg-gray-950.rounded-md.border-\\[0\\.5px\\].border-token-border-medium';
  const fullPageSelector = 'div.flex.flex-col.text-sm.md\\:pb-9';

  function enhanceCodeBlocks() {
    const codeBlocks = $(blockSelector);
    codeBlocks.each(function() {
      if ($(this).find('.scroll-to-top').length === 0) {
        console.log('Enhancing block...');
        // Create the bottomDiv using jQuery
        const $bottomDiv = $('<div>', {
          class: 'flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-0 text-xs font-sans justify-between rounded-b-md'
        });
        // Create the scrollToTopButton using jQuery
        const $scrollToTopButton = $('<button>', {
          class: 'flex gap-0 items-center align-center scroll-to-top',
          html: `
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" class="icon-sm">
              <path fill="currentColor" fill-rule="evenodd" d="M12 2l6 6-1.414 1.414L13 6.828V20h-2V6.828L7.414 9.414 6 8l6-6z" clip-rule="evenodd"></path>
            </svg>
            <p>Scroll to Top</p>
          `,
          click: () => {
            const closestP = $(this).parent().prevAll('p')[0];
            console.log('Scrolling to element:', closestP);
            closestP.scrollIntoView({ behavior: 'smooth' });
          }
        });
        // Find and clone the copyCodeButton using jQuery
        const $copyCodeButton = $(this).find('button').first().clone(true);
        // Append buttons to bottomDiv
        $bottomDiv.append($scrollToTopButton);
        $bottomDiv.append($copyCodeButton);
        // Append bottomDiv to the current code block
        $(this).append($bottomDiv);
        console.log('Added buttons to block:', this);
      }
    })
  }

  enhanceCodeBlocks();

  // Select the target node
  const chatAreaNode = document.querySelectorAll('div.flex-1.overflow-hidden')[1];
  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(function(mutationsList, observer) {
    for (const mutation of mutationsList) {
      enhanceCodeBlocks();
    }
  });
  // Start observing the target node with configuration for the observer
  observer.observe(chatAreaNode, {
    attributes: true, 
    childList: true, 
    subtree: true 
  });
});