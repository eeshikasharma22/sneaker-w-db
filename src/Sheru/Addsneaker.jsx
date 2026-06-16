import { useState } from "react";
import { supabase } from "../supabase"; // adjust path if needed

export default function AddSneaker() {
  const [form, setForm] = useState({ name: "", price: "", image: "" });
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase.from("sneakers").insert([form]);

    if (error) {
      setMessage("❌ Error: " + error.message);
    } else {
      setMessage("✅ Sneaker added successfully!");
      setForm({ name: "", price: "", image: "" }); // reset form
    }
  }

  return (
    <section className="AddSneaker">
      <h2>Add New Sneaker</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Sneaker Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="price"
          placeholder="Price (e.g. $129)"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Sneaker</button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
}