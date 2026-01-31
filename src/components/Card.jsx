import { Link } from 'react-router-dom';

function Card({ id, name, url, description, imageURL }) {
  return (
    <article>
      {imageURL && (
        <img 
          src={imageURL} 
          alt={name} 
          style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
        />
      )}
      <h3>{name}</h3>
      <p>{description}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        Visit Channel
      </a>
      <footer>
        <Link to={`/creator/${id}`}>
          <button>View</button>
        </Link>
        <Link to={`/edit/${id}`}>
          <button>Edit</button>
        </Link>
      </footer>
    </article>
  );
}

export default Card;