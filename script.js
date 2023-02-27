const menuBtn = document.querySelector('#menu-btn');
const navMenu = document.querySelector('.nav-menu');
const list = document.querySelector('.menu-list');
const listItem = document.querySelectorAll('.list-item');

const showNavMenu = () => {
  list.style.left = '0%';
}

const hideNavMenu = () => {
  list.style.left = '-100%';
}

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
    showNavMenu();
    item.style.backgroundColor = '#646464';
  });
  item.addEventListener('mouseout', () => {
    item.style.backgroundColor = '#414141';
  })
}


