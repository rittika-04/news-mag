import defaultImage from "../assets/news.jpg"; // Ensure this path is correct

const NewsItem = ({ title, description, src, url }) => {
  return (
    <div className="card text-white bg-dark mb-3" style={{ maxWidth: "350px", borderRadius: "10px" }}>
      <img 
        src={src || defaultImage} 
        className="card-img-top" 
        alt="News" 
        onError={(e) => e.target.src = defaultImage} // Fallback if image fails to load
        style={{ height: "200px", objectFit: "cover" }} 
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title ? title.slice(0, 50) : "No Title"}</h5>
        <p className="card-text">{description ? description.slice(0, 90) + "..." : "No Description Available"}</p>
        <a href={url} className="btn btn-primary mt-auto" target="_blank" rel="noopener noreferrer">
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
