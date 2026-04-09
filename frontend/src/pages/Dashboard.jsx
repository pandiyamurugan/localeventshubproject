import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import { FiSearch, FiBookmark } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { FaStar } from "react-icons/fa";
import BASE_URL from "../api";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [cards, setCards] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  
const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  
  const getCategoryColor = (category) => {
    switch (category) {
      case "Music":
        return "#ff4d4d";
      case "Theatre":
        return "#6f42c1";
      case "Workshop":
        return "#20c997";
      default:
        return "#999";
    }
  };

  
  useEffect(() => {
    fetch(`${BASE_URL}/api/events`)
      .then((res) => res.json())
      .then((data) => setCards(data))
      .catch((err) => console.log(err));
  }, []);


  useEffect(() => {
    if (!userId) return;

    fetch(`${BASE_URL}/api/bookmarks/${userId}`)
      .then((res) => res.json())
      .then((data) => setBookmarks(data))
      .catch((err) => console.log(err));
  }, [userId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredCards = useMemo(() => {
  return cards.filter((card) => {
    const matchSearch = card.title
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    const matchCategory =
      selectedCategory === "All" || card.category === selectedCategory;

    return matchSearch && matchCategory;
  });
}, [cards, debouncedSearch, selectedCategory]);

  
  const toggleBookmark = async (card) => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    const exists = bookmarks.some(
      (b) => b.eventId?._id === card._id
    );

    if (exists) {
      await fetch(`${BASE_URL}/api/bookmarks`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, eventId: card._id }),
      });

      setBookmarks((prev) =>
        prev.filter((b) => b.eventId?._id !== card._id)
      );
    } else {
      const res = await fetch(`${BASE_URL}/api/bookmarks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, eventId: card._id }),
      });

      const data = await res.json();
      setBookmarks((prev) => [...prev, data]);
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#f5f7fb" }}>
      <Sidebar />

      <main className="p-4 main-rgt-ctns  overflow-auto" style={{ flex: 1 ,zIndex:9999}}>
        <h2 className="mb-4 fw-bold text-black">
          EVENTS HUB <span style={{ color: "orange" }}>DASHBOARD</span>
        </h2>

   
        <div className="d-flex justify-content-end ">
          <div className="position-relative w-100" style={{ maxWidth: "500px" }}>
            <span className="position-absolute" style={{ top: "50%", left: "15px", transform: "translateY(-50%)" }}>
              <FiSearch size={22} color="red" />
            </span>

            <input
              type="text"
              className="form-control ps-5 py-3 shadow-sm"
              style={{ borderRadius: "50px" }}
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

      <div className="d-flex gap-2 mb-4 flex-wrap">
  {["All", "Webinar", "Seminar", "Workshop", "Hackathon"].map((cat) => (
    <button
      key={cat}
      onClick={() => setSelectedCategory(cat)}
      className="btn"
      style={{
        background: selectedCategory === cat ? "orange" : "white",
        color: selectedCategory === cat ? "white" : "black",
        borderRadius: "20px",
        border: "1px solid orange",
      }}
    >
      {cat}
    </button>
  ))}
</div>

       
        <div className="row g-4" style={{zIndex:9999}}>
          {filteredCards.map((card) => (
            <div key={card._id} className="col-md-4 col-12">
              <div className="card shadow-sm border-0 h-100">
                <div>
                  <img
                    src={card.image}
                    className="w-100"
                    style={{ height: "200px", objectFit: "cover" }}
                    alt=""
                  />

                 
                  {card.category && (
                    <button
                      className="position-absolute"
                      style={{
                        left: "15px",
                        top: "15px",
                        background: getCategoryColor(card.category),
                        border: "none",
                        borderRadius: "18px",
                        color: "white",
                        padding: "3px 10px",
                      }}
                    >
                      {card.category}
                    </button>
                  )}

               
                  <button
                    onClick={() => toggleBookmark(card)}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "white",
                      border: "none",
                      borderRadius: "10px",
                      padding: "8px",
                    }}
                  >
                    <FiBookmark
                      size={20}
                      color={
                        bookmarks.some(
                          (b) => b.eventId?._id === card._id
                        )
                          ? "orange"
                          : "gray"
                      }
                    />
                  </button>
                </div>

                <div className="card-body">
                  <h6>{card.title}</h6>
                  <p>{card.desc.substring(0, 60)}...</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
  {[...Array(5)].map((_, index) => (
    <FaStar key={index} size={16} color="gold" />
  ))}
  <span style={{ fontSize: "14px", color: "gray" }}>
    5.0
  </span>
</div>
                  <button
  className="btn btn-sm mt-2"
  style={{ background: "orange", color: "white", borderRadius: "20px" }}
  onClick={() => {
    setSelectedCard(card);
    setShowModal(true);
  }}
>
  View Details
</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showModal && selectedCard && (
  <div className="custom-modal-overlay">
    <div className="custom-modal">

      <button
        onClick={() => setShowModal(false)}
        style={{
          position: "absolute",
          top: "10px",
          right: "15px",
          border: "none",
          background: "transparent",
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        ✖
      </button>

      <div className="row g-0">

   
        <div className="col-md-6">
          <img
            src={selectedCard.image}
            alt=""
            className="w-100 h-100"
            style={{ objectFit: "cover", borderRadius: "10px 0 0 10px" }}
          />
        </div>

       
        <div className="col-md-6 p-4">
          <h3>{selectedCard.title}</h3>

          <p className="text-muted">{selectedCard.desc}</p>

          <p>
            <strong>Category:</strong> {selectedCard.category}
          </p>

          <p>
            <strong>Mentor:</strong> {selectedCard.mentor}
          </p>

          <p>
            <strong>Time:</strong> {selectedCard.startTime} - {selectedCard.endTime}
          </p>
          <button
  className="btn btn-warning mt-3"
  onClick={() => navigate(`/book/${selectedCard._id}`)}
>
  Book Your Seat
</button>
        </div>

      </div>
    </div>
  </div>
)}
      </main>
    </div>
  );
}