const projectContainer = document.querySelector('.project-container');

window.addEventListener('load', () => {
  loader.style.display = 'none';
})

const createSection = (projectName) => {
  const section = document.createElement('section');
  projectContainer.appendChild(section);
  section.classList.add('project');
  return section;
};

const createContainer = () =>{
  const container = document.createElement('div');
  container.classList.add('project-item-container');
  createSection().appendChild(container);
  return container;
}

const createContent = (project) => {
  const title = document.createElement('h4');
  const description = document.createElement('p');
  const link = document.createElement('a');
  const img = document.createElement('img');
  title.innerHTML = project.title;
  description.innerHTML = project.description;
  link.href = project.link
  link.innerHTML = 'Link do projeto'
  link.target = '_blank'
  img.src = project.img;
  img.setAttribute('id', 'project-img')
  createContainer().append(title, description, img, link);
};

// const createImg = (project) => {
//   const img = document.createElement('img');
//   createContainer().appendChild(img);
// }

projects.forEach((project) => {
  createContent(project);
})



