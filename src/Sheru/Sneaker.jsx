const shoes = [
  {
    name: "AIR RUNNER",
    price: "$129",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
  },
  {
    name: "PHANTOM",
    price: "$149",
    image:
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800"
  },
  {
    name: "URBAN X",
    price: "$169",
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800"
  },
  {
    name: "SPORT PRO",
    price: "$179",
    image:
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800"
  }
];

export default function Sneaker() {
  return (
    <section className="Sneaker">
      <h2>Featured Sneakers</h2>

      <div className="shoe-grid">
        {shoes.map((shoe, index) => (
          <div className="shoe-card" key={index}>
            <img src={shoe.image} alt="" />

            <h3>{shoe.name}</h3>

            <p>{shoe.price}</p>

            <button>Add To Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
}