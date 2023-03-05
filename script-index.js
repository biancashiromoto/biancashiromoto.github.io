const loader = document.querySelector('.loader-container');
const menuBtn = document.querySelector('#menu-btn');
const list = document.querySelector('.menu-list');
const listItem = document.querySelectorAll('.list-item');

window.addEventListener('load', () => {
  loader.style.display = 'none';
})

const showNavMenu = () => { list.style.top = '55px'; };

const hideNavMenu = () => { list.style.top = '-100%'; };

list.addEventListener('mouseover', () => {
  showNavMenu();
});

menuBtn.addEventListener('mouseover', () => {
  showNavMenu();
});

list.addEventListener('mouseleave', () => {
  hideNavMenu();
});

menuBtn.addEventListener('mouseleave', () => {
  hideNavMenu();
});

for (const item of listItem) {
  item.addEventListener('mouseover', () => {
    item.classList.add('selected-item');
  });
  item.addEventListener('mouseout', () => {
    item.classList.remove('selected-item');
  })
}

