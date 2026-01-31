import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import Card from '../components/Card';

function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCreators();
  }, []);

  async function fetchCreators() {
    const { data, error } = await supabase
      .from('creators')
      .select('*');
    
    if (error) {
      console.error('Error fetching creators:', error);
    } else {
      setCreators(data);
    }
    setLoading(false);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Creatorverse</h1>
      <Link to="/new">
        <button>Add New Creator</button>
      </Link>

      {creators.length === 0 ? (
        <p>No creators found.</p>
      ) : (
        <div className="grid">
          {creators.map((creator) => (
            <Card
              key={creator.id}
              id={creator.id}
              name={creator.name}
              url={creator.url}
              description={creator.description}
              imageURL={creator.imageURL}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowCreators;