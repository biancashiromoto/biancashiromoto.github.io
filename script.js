const menuBtn = document.querySelector('#menu-btn');
const navMenu = document.querySelector('.nav-menu');
const list = document.querySelector('.menu-list');
const listItem = document.querySelectorAll('.list-item');


console.log(navMenu, list)
const showNavMenu = () => {
  list.style.display = 'block';
}

const hideNavMenu = () => {
  list.style.display = 'none';
}

list.addEventListener('mouseover', () => {
  showNavMenu();
});

menuBtn.addEventListener('mouseover', () => {
  showNavMenu();
});

list.addEventListener('mouseout', () => {
  hideNavMenu();
})

for (const item of listItem) {
  item.addEventListener('mouseover', () => {
    item.style.backgroundColor = '#646464';
  });
  item.addEventListener('mouseout', () => {
    item.style.backgroundColor = '#414141';
  })
}
