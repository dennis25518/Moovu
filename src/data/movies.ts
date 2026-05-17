export interface Movie {
  id: string;
  title: string;
  year: string;
  genre: string;
  rating: string;
  duration: string;
  description: string;
  image: string;
}

export const categories = [
  "Action",
  "Drama",
  "Sci-Fi",
  "Comedy",
  "Thriller",
  "Documentary",
];

export const movies: Movie[] = [
  {
    id: "m1",
    title: "Moonlight Chase",
    year: "2025",
    genre: "Drama / Thriller",
    rating: "8.7",
    duration: "2h 13m",
    description:
      "A former spy reconnects with his past while racing against time to save a friend.",
    image:
      "https://images.unsplash.com/photo-1517604931442-7c6bcbfcBB37?auto=format&fit=crop&w=920&q=80",
  },
  {
    id: "m2",
    title: "Skyline Rebels",
    year: "2024",
    genre: "Action / Adventure",
    rating: "8.2",
    duration: "1h 58m",
    description:
      "A team of renegades battles a corrupt corporation to reclaim their city.",
    image:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "m3",
    title: "Neon Horizons",
    year: "2025",
    genre: "Sci-Fi / Mystery",
    rating: "9.0",
    duration: "2h 5m",
    description:
      "An investigator uncovers a conspiracy beneath the neon-lit skyline of the future.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "m4",
    title: "Frozen Echoes",
    year: "2023",
    genre: "Thriller / Horror",
    rating: "7.9",
    duration: "1h 47m",
    description:
      "A secluded resort hides secrets that resurface when winter traps its guests inside.",
    image:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80",
  },
];
