import { string, object, number } from "yup";
import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { fetchPostWine } from "./apis/wineApi";

const url = "http://localhost:3000/wines";

const initialState = {
  id: "",
  name: "",
  region: "",
  price: "",
  rating: "",
  tastingNotes: "",
  image: "",
};

const wineSchema = object({
  name: string().required("Name is required!"),
  region: string().required("Region is required!"),
  price: number().positive().required("Price is required!"),
  rating: number().min(0).max(10).required("Rating is required!"),
  tastingNotes: string().required("Tasting notes is required!"),
  image: string().required("Image is required!"),
});

const WineForm = () => {
  const [formData, setFormData] = useState(initialState); 
  const [error, setError] = useState("");
  const { handleAddWine } = useOutletContext();
  const navigate = useNavigate();

  const handleChange = ({ target: { id, value } }) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    wineSchema
      .validate(formData)
      .then((validFormData) => {
        const finalizedData = {
          ...validFormData,
          id: uuid().slice(0, 4),
          price: Number.parseFloat(formData.price).toFixed(2),
        };
        handleAddWine(finalizedData);
        fetchPostWine(url, finalizedData, handleError, navigate);
      })
      .catch((validationError) => setError(validationError.message));
  };
  return (
    <section>
      {error ? <p className="error-message red">{error}</p> : null}
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <h3>Add New Wine to My Favorites</h3>

        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="region">Region</label>
          <input
            type="text"
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            step="0.01"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            min="0"
            max="10"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="tastingNotes">Tasting Notes</label>
          <input
            type="text"
            id="tastingNotes"
            name="tastingNotes"
            value={formData.tastingNotes}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="image">Image</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Add Wine</button>
      </form>
    </section>
  );
};

export default WineForm;
