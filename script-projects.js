const projectContainer = document.querySelector('.project-container');

const createNewProject = (object) => {
  const newProject = document.createElement('section');
  projectContainer.appendChild(newProject);
  newProject.classList.add('project');
  const textContainer = document.createElement('div');
  newProject.appendChild(textContainer);
  textContainer.classList.add('project-text-container');
  const projectTitle = document.createElement('h4');
  textContainer.appendChild(projectTitle);
  projectTitle.innerHTML = object.title;
  const projectDescription = document.createElement('p');
  textContainer.appendChild(projectDescription);
  projectDescription.innerHTML = object.description;
  const projectLink = document.createElement('a');
  textContainer.appendChild(projectLink);
  projectLink.innerHTML = 'Link do projeto';
  projectLink.setAttribute('href', object.link);
  const projectImg = document.createElement('img');
  newProject.appendChild(projectImg);
  projectImg.src = object.img;
  projectImg.setAttribute('id', 'project-img');
}

for (const project of projects) {
createNewProject(project);

}



