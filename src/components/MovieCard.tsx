import type { Movie } from "../data/movies";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="movie-card">
      <div
        className="movie-thumb"
        style={{ backgroundImage: `url(${movie.image})` }}
      />
      <div className="movie-details">
        <div className="movie-meta">
          <span>{movie.genre}</span>
          <span>{movie.rating}</span>
        </div>
        <h3>{movie.title}</h3>
        <p>{movie.description}</p>
        <div className="movie-footer">
          <span>{movie.duration}</span>
          <button className="btn-secondary">Watch now</button>
        </div>
      </div>
    </article>
  );
}
