export const formatTitle = (title) => {
  const spacedTitle = title.replace('-', ' ');
  // return spacedTitle.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1).join(' '));
  console.log(spacedTitle.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
  const newTitle = spacedTitle.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return newTitle;
};