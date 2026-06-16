import { useEffect, useState } from "react";
import { supabase } from "../supabase"; // adjust path if needed

export default function Sneaker() {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShoes() {
      const { data, error } = await supabase.from("sneakers").select("*");
      if (error) {
        console.error("Error fetching sneakers:", error.message);
      } else {
        setShoes(data);
      }
      setLoading(false);
    }
    fetchShoes();
  }, []);

  if (loading) return <p>Loading sneakers...</p>;

  return (
    <section className="Sneaker">
      <h2>Featured Sneakers</h2>
      <div className="shoe-grid">
        {shoes.map((shoe) => (
          <div className="shoe-card" key={shoe.id}>
            <img src={shoe.image} alt={shoe.name} />
            <h3>{shoe.name}</h3>
            <p>{shoe.price}</p>
            <button>Add To Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
}