import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getActor, getActorCredits } from "../../api/tmdb-api";

// TypeScript interface defining the structure of cast member
interface CastMember {
  id: number;
  character: string; 
  title: string; 
}

// TypeScript interface defining the structure of actor details from AP
interface ActorDetail {
  id: number;
  name: string;
  biography: string;
  profile_path: string | null; 
  combined_credits?: {
    cast: CastMember[]; 
  };
}

// Main component that displays detailed information about a single actor
export const ActorDetail = () => {
  const { id } = useParams();
  const [actor, setActor] = useState<ActorDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch actor's basic info (name, bio, photo)
        const actorData = await getActor(Number(id));

        // Fetch list of movies/shows actor appeared in
        const credits = await getActorCredits(Number(id));setActor({
          ...actorData,
          combined_credits: { cast: credits }
        });
      } catch (err) {setError(err instanceof Error ? err.message : "Failed to load actor");
      } finally {setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Re-run if actor ID changes

  // loading message while data fetches
  if (loading) return <div>Loading...</div>;

  // error msg if fetch failed
  if (error) return <div className="error">Error: {error}</div>;

  // Show msg if no actor data found
  if (!actor) return <div>Actor not found.</div>;

  // Get list of movies actor appeared in
  const movies = actor.combined_credits?.cast || [];

  // Get only top 10 most prominent roles
  const topMovies = movies.slice(0, 10);

  
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Display actor's profile photo if available */}
        {actor.profile_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
            alt={actor.name}
            style={styles.image}
          />
        )}

       
        <div style={styles.info}>
          {/* Display actor's name as heading */}
          <h1 style={styles.title}>{actor.name}</h1>

         
          <section style={styles.section}>
            <h2>Biography</h2>
            <p>{actor.biography || "No biography available."}</p>
          </section>

         
          <section style={styles.section}>
            <h2>Known For (Role Name & Description)</h2>
            <ul style={styles.filmList}>
              {/* Loop through movies and display character and title */}
              {topMovies.map((movie: any) => (
                <li key={`${movie.id}-${movie.character}`} style={styles.filmItem}>
                  <strong>Role:</strong> {movie.character || "Unknown"} 
                  <br />
                  <strong>Movie:</strong> {movie.title}
                </li>
              ))}
            </ul>
          </section>

          //Link to view full actor profile on TMDB website 
          <a 
            href={`https://www.themoviedb.org/person/${actor.id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.externalLink}
          >
            View on TMDB →
          </a>
        </div>
      </div>
    </div>
  );
};

// Styling object for all component elements
const styles: Record<string, React.CSSProperties> = {
  container: { padding: "20px", maxWidth: "1000px", margin: "0 auto" }, // Main container - centered max width
  content: { display: "grid", gridTemplateColumns: "300px 1fr", gap: "30px" }, // Two-column grid: photo left, info right
  image: { width: "100%", borderRadius: "8px" }, // Actor photo styling
  info: { display: "flex", flexDirection: "column" }, // Stack info vertically
  title: { fontSize: "2.5rem", margin: "0 0 20px 0" }, // Actor name heading
  section: { marginBottom: "30px" }, // Spacing between sections
  filmList: { listStylePosition: "inside", lineHeight: "1.8" }, // Movie list styling
  filmItem: { fontSize: "1rem", color: "#666", marginBottom: "15px" }, // Individual movie item styling
  externalLink: { color: "#007bff", textDecoration: "none", fontSize: "1.1rem", fontWeight: "bold" }, // TMDB link styling
};
