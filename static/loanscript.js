// FAQ Accordion Logic
const faqButtons = document.querySelectorAll('.faq-question');

faqButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
  });
});
