export const formatTitle = (title) => {
  const spacedTitle = title.replace('-', ' ');
  const newTitle = spacedTitle.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return newTitle;
};