export const fetchAPI = async (URL) => {
  const response = await fetch(URL);
  const data = response.json();
  return data;
}