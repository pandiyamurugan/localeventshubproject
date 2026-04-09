import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { FiBookmark } from "react-icons/fi";
import BASE_URL from "../api";

export default function Bookmark() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
console.log(localStorage.getItem("userId"));
    if (!userId) return;

    fetch(`${BASE_URL}/api/bookmarks/${userId}`)
      .then((res) => res.json())
      .then((data) => {

        const validData = data.filter((item) => item.eventId !== null);
        setBookmarks(validData);
      })
      .catch((err) => console.log(err));
  }, []);

  
  const removeBookmark = async (card) => {
    const userId = localStorage.getItem("userId");

   
    if (!card.eventId || !card.eventId._id) {
      console.log("Invalid bookmark:", card);
      return;
    }

    await fetch(`${BASE_URL}/api/bookmarks`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        eventId: card.eventId._id,
      }),
    });

   
    const updated = bookmarks.filter(
      (item) => item.eventId?._id !== card.eventId?._id
    );

    setBookmarks(updated);
  };

  if (bookmarks.length === 0) {
    return (
      <div
        className="d-flex"
        style={{ minHeight: "100vh", background: "#f5f7fb" }}
      >
        <Sidebar />
        <main className="flex-grow-1 p-4 d-flex justify-content-center align-items-center">
          <h3 className="text-center">No bookmarks yet!</h3>
        </main>
      </div>
    );
  }

  return (
    <div
      className="d-flex"
      style={{ minHeight: "100vh", background: "#f5f7fb" }}
    >
      <Sidebar />

      <main className="flex-grow-1 p-4">
        <h2 className="mb-4 fw-bold text-black">
          <span>Bookmarked</span>
          <span style={{ color: "orange" }}> Events</span>
        </h2>

        <div className="row g-4">
          {bookmarks
            .filter((card) => card.eventId) 
            .map((card) => (
              <div key={card._id} className="col-md-4 col-12 d-flex">
                <div
                  className="card shadow-sm border-0 flex-fill"
                  style={{ position: "relative" }}
                >
                 
                  <img
                    src={card.eventId.image}
                    alt={card.eventId.title}
                    className="w-100"
                    style={{
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "5px 5px 0 0",
                    }}
                  />

                
                  <button
                    onClick={() => removeBookmark(card)}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "white",
                      border: "none",
                      borderRadius: "10px",
                      padding: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <FiBookmark size={20} color="orange" />
                  </button>

                 
                  <div className="card-body">
                    <h6>{card.eventId.title}</h6>
                    <p>
                      {card.eventId.desc.substring(0, 60)}...
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}