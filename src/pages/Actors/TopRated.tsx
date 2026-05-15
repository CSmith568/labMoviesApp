import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getTopRatedActors } from "../../api/tmdb-api";

interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
}

const ITEMS_PER_PAGE = 5;

export const TopRatedActors = () => {
  const [allActors, setAllActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const totalPages = useMemo(
    () => Math.ceil(allActors.length / ITEMS_PER_PAGE),
    [allActors.length]
  );

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedActors = allActors.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopRatedActors();
        setAllActors(data);
      } catch (err) {
        console.error("Failed to fetch top-rated actors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Top Rated Actors</h1>

      <div style={styles.grid}>
        {paginatedActors.map((actor) => (
          <Link 
            key={actor.id} 
            to={`/actors/${actor.id}`} 
            style={styles.cardLink}
          >
            <div style={styles.card}>
              <img 
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : "https://via.placeholder.com/250x350?text=No+Image"
                }
                alt={actor.name}
                style={styles.image}
              />
              <p style={styles.actorName}>{actor.name}</p>
            </div>
          </Link>
        ))}
      </div>

      <div style={styles.pagination}>
        <button 
          onClick={() => setSearchParams({ page: String(currentPage - 1) })}
          disabled={currentPage === 1}
          style={styles.button}
        >
          Previous
        </button>
        <span style={styles.pageInfo}>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => setSearchParams({ page: String(currentPage + 1) })}
          disabled={currentPage === totalPages}
          style={styles.button}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const styles = {
  // Layout
  container: { padding: "20px", maxWidth: "1200px", margin: "0 auto" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "30px" },
  pagination: { display: "flex", justifyContent: "center", alignItems: "center", gap: "15px" },
  // Typography
  title: { textAlign: "center", marginBottom: "30px", fontSize: "2.5rem", color: "#333" },
  actorName: { padding: "15px", textAlign: "center", fontSize: "1.1rem", fontWeight: "bold", margin: 0 },
  pageInfo: { fontSize: "1rem", minWidth: "150px", textAlign: "center" },
  // Components
  cardLink: { textDecoration: "none", color: "inherit" },
  card: { border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", backgroundColor: "#fff", transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer" },
  image: { width: "100%", height: "300px", objectFit: "cover" },
  button: { padding: "10px 20px", fontSize: "1rem", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
} as const satisfies Record<string, React.CSSProperties>;

