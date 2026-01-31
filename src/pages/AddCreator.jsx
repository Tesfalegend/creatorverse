import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';

function AddCreator() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase
      .from('creators')
      .insert([formData]);

    if (error) {
      console.error('Error adding creator:', error);
    } else {
      navigate('/');
    }
  }

  return (
    <div className="add-creator">
      <h2>Add New Creator</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name *
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          URL *
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description *
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Image URL (optional)
          <input
            type="url"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Add Creator</button>
      </form>

      <Link to="/">
        <button type="button">Cancel</button>
      </Link>
    </div>
  );
}

export default AddCreator;