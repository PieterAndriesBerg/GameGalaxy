export const formatGenres = (genres) => {
  return genres
    .map((genre) => genre.name.charAt(0).toUpperCase() + genre.name.slice(1))
    .join(", ");
};
