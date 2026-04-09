import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

export default function Users() {
  const [bookmarkedCards, setBookmarkedCards] = useState([]);

  useEffect(() => {
    const loadBookmarks = () => {
      const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
      setBookmarkedCards(saved);
    };

    loadBookmarks();

    
    window.addEventListener("storage", loadBookmarks);

    return () => window.removeEventListener("storage", loadBookmarks);
  }, []);

  return (
    <div className="d-flex" style={{ height: "100vh", background: "#f5f7fb" }}>
      <Sidebar />

      <main
  className="p-4 overflow-auto"
  style={{
    flex: 1,
    minWidth: 0
  }}
>
        <h2 className="mb-4 fw-bold text-black">
          BOOKMARKED <span style={{color:"orange"}}>EVENTS</span>
        </h2>

        <div className="row g-4">
          {bookmarkedCards.length === 0 ? (
            <p>No bookmarks yet</p>
          ) : (
            bookmarkedCards.map((card) => (
              <div key={card.id} className="col-md-4 col-12">
                <div className="card shadow-sm border-0 h-100">

                  <img
                    src={card.image}
                    className="w-100"
                    style={{ height: "180px", objectFit: "cover" }}
                    alt=""
                  />

                  <div className="card-body">
                    <h6>{card.title}</h6>
                    <p>{card.desc?.substring(0, 60)}...</p>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}