import { useState } from "react";
import { object, string } from "yup";
import { fetchPatchWine } from "../apis/wineApi";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:3000/wines";

const wineSchema = object({
    name: string().required('Name is required!'),
    region: string().required('Region is required!'),
    price: string().required('Price is required!'),
    rating: string().required('Rating is required!'),
    tastingNotes: string().required('Tasting notes is required!'),
    image: string().required('Image is required!')
})

const EditWineForm = ({
  handlePatchWine,
  name,
  region,
  price,
  rating,
  tasingNotes,
  image,
  toggleEditMode,
}) => {
  const initialState = {
    id,
    name,
    region,
    price,
    rating,
    tastingNotes,
    image
  };
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleChange = ({target: {id, value}}) => {
    setFormData({...FormData, [id] : value})}

  const handleError = (errorMsg) => {
    setError(errorMsg);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //! Validate with yup
    wineSchema
      .validate(formData)
      .then((validFormData) => {
        // Talk to the server
        const finalUrl = `${url}/${id}`
        fetchPatchWine(
          finalUrl,
          validFormData,
          handlePatchWine,
          toggleEditMode,
          handleError,
          navigate
        );
      })
      .catch((validationError) => setError(validationError.message));
  };

  return (
    <section>
    {error ? <p className="error-message red">{error}</p> : null}
    <form className="form" autoComplete="off" onSubmit={handleSubmit}>
      <h3>Patch Wine</h3>

      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

      <label htmlFor="region">Region</label>
      <input type="text" id="region" name="region" value={formData.region} onChange={handleChange} />
      
      <label htmlFor="price">Price</label>
      <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} />
      
      <label htmlFor="rating">Rating</label>
      <input type="text" id="rating" name="rating" value={formData.rating} onChange={handleChange} />

      <label htmlFor="tastingNotes">Tasting Notes</label>
      <input type="text" id="tastingNotes" name="tastingNotes" value={formData.tastingNotes} onChange={handleChange} />

      <label htmlFor="image">Image</label>
      <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />

      <button type="submit">Add Wine</button>
    </form>
  </section>
  );
};

export default EditProjectForm;
