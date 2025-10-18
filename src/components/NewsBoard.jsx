import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category = "general" }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const apiKey = import.meta.env.VITE_API_KEY; // Ensure .env is configured correctly
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
        
        let response = await fetch(url);
        let data = await response.json();

        if (data.status !== "ok" || !data.articles) {
          throw new Error(data.message || "Failed to fetch news");
        }

        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);  // 🔹 Fetches news again when category changes

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">
        Latest <span className="badge bg-danger">{category.toUpperCase()}</span> News
      </h2>

      {loading ? (
        <h4 className="text-center my-4">Loading...</h4>
      ) : articles.length === 0 ? (
        <h4 className="text-center my-4 text-danger">No News Available</h4>
      ) : (
        <div className="row">
          {articles.map((news, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <NewsItem 
                title={news.title || "No Title"} 
                description={news.description || "No Description Available"} 
                src={news.urlToImage && news.urlToImage.startsWith("http") ? news.urlToImage : "https://via.placeholder.com/360x200"} 
                url={news.url || "#"} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsBoard;
