const menuBtn = document.querySelector('#menu-btn');
const navMenu = document.querySelector('.nav-menu-container');
const listItem = document.querySelectorAll('.list-item');

const showNavMenu = () => {
  navMenu.style.display = 'block';
}

const hideNavMenu = () => {
  navMenu.style.display = 'none';
}

navMenu.addEventListener('mouseover', () => {
  showNavMenu();
});

navMenu.addEventListener('mouseout', () => {
  hideNavMenu();
})

menuBtn.addEventListener('mouseover', () => {
  showNavMenu();
});

menuBtn.addEventListener('mouseout', 
() => {
  hideNavMenu();
});

for (const item of listItem) {
  item.addEventListener('mouseover', () => {
    item.style.backgroundColor = '#646464';
  });
  item.addEventListener('mouseout', () => {
    item.style.backgroundColor = '#414141';
  })
}