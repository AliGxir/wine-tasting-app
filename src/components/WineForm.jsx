import { string, object } from "yup";
import {useState} from "react";
import { useOutletContext, useNavigate, useLocation } from "react-router-dom";

const url = "http://localhost:3000/wines"

const initialState = {
    id: "",
    name: "",
    region: "",
    price: "",
    rating: "",
    tastingNotes: "",
    image: ""
}

const wineSchema = object({
    name: string().required('Name is required!'),
    region: string().required('Region is required!'),
    price: string().required('Price is required!'),
    rating: string().required('Rating is required!'),
    tastingNotes: string().required('Tasting notes is required!'),
    image: string().required('Image is required!')
})

const WineForm = () => {

    const[formData, setFormData] = useState(initialState)
    const [error, setError] = useState("")
    const { handleAddWine } = useOutletContext()
    const navigate = useNavigate()
    
    
    const handleChange = ({target: {id, value}}) => {
        setFormData({...FormData, [id] : value})
    }

    const handleFormData = (dataObj) => setFormData(dataObj)

    const handleError = (errorMessage) => {
        setError(errorMessage);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // validate with yup
        wineSchema.validate(formData)
        .then(validFormData => {
            const finalizedData = {...validFormData, id: wineId}
            handleAddWine(finalizedData)
            fetchPostWine(url, finalizedData, handleFormData, initialState, handleError, navigate)
        })
        .catch(validationError => setError(validationError.message))
    }
    return (
        <section>
        {error ? <p className="error-message red">{error}</p> : null}
        <form className="form" autoComplete="off" onSubmit={handleSubmit}>
          <h3>Add New Wine to My Favorites</h3>
  
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
    )
}

export default WineForm;