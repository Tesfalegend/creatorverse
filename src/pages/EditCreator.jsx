import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';

function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });

  useEffect(() => {
    fetchCreator();
  }, [id]);

  async function fetchCreator() {
    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching creator:', error);
    } else {
      setFormData({
        name: data.name || '',
        url: data.url || '',
        description: data.description || '',
        imageURL: data.imageURL || ''
      });
    }
    setLoading(false);
  }

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
      .update(formData)
      .eq('id', id);

    if (error) {
      console.error('Error updating creator:', error);
    } else {
      navigate(`/creator/${id}`);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-creator">
      <h2>Edit Creator</h2>
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

        <button type="submit">Save Changes</button>
      </form>

      <Link to={`/creator/${id}`}>
        <button type="button">Cancel</button>
      </Link>
    </div>
  );
}

export default EditCreator;