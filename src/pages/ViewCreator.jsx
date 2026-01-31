import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';

function ViewCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setCreator(data);
    }
    setLoading(false);
  }

  async function handleDelete() {
    const confirmDelete = window.confirm('Are you sure you want to delete this creator?');
    if (!confirmDelete) return;

    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting creator:', error);
    } else {
      navigate('/');
    }
  }

  if (loading) return <p>Loading...</p>;

  if (!creator) return <p>Creator not found.</p>;

  return (
    <div className="view-creator">
      {creator.imageURL && (
        <img src={creator.imageURL} alt={creator.name} />
      )}
      <h2>{creator.name}</h2>
      <p>{creator.description}</p>
      <a href={creator.url} target="_blank" rel="noopener noreferrer">
        Visit Channel
      </a>
      <div className="actions">
        <Link to={`/edit/${creator.id}`}>
          <button>Edit</button>
        </Link>
        <button onClick={handleDelete}>Delete</button>
        <Link to="/">
          <button>Back to All Creators</button>
        </Link>
      </div>
    </div>
  );
}

export default ViewCreator;