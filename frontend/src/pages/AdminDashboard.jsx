import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { FaEdit, FaTrash, FaPlus, FaEllipsisV } from "react-icons/fa";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { FiClock } from "react-icons/fi";
import BASE_URL from "../api";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [upcoming, setUpcoming] = useState([]); // ⭐ NEW ADDED
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    desc: "",
    mentor: "",
    startTime: "",
    endTime: "",
    category: "",
    image: null,
  });

  // ⭐ NEW FUNCTION (ADDED)
  const getUpcomingEvents = (data) => {
    const now = new Date();

    return data.filter((ev) => {
      if (!ev.startTime) return false;

      const [h, m] = ev.startTime.split(":");
      const eventTime = new Date();
      eventTime.setHours(h, m, 0, 0);

      return eventTime > now;
    });
  };


  const loadEvents = () => {
    fetch(`${BASE_URL}/api/events`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);

       
        setUpcoming(getUpcomingEvents(data));
      });
  };

 useEffect(() => {
  loadEvents();
}, [loadEvents]);

  const handleAdd = () => {
    setEditId(null);
    setForm({
      title: "",
      desc: "",
      mentor: "",
      startTime: "",
      endTime: "",
      category: "",
      image: null,
    });
    setShow(true);
  };

  const editEvent = (ev) => {
    setEditId(ev._id);
    setForm({
      title: ev.title,
      desc: ev.desc,
      mentor: ev.mentor || "",
      startTime: ev.startTime || "",
      endTime: ev.endTime || "",
      category: ev.category || "",
      image: null,
    });
    setShow(true);
  };

  const deleteEvent = async (id) => {
    await fetch(`${BASE_URL}/api/events/${id}`, {
      method: "DELETE",
      headers: { Authorization: localStorage.getItem("token") },
    });

    loadEvents();
  };

  const handleEditConfirm = (ev) => {
    if (window.confirm("Are you sure you want to edit this event?")) {
      editEvent(ev);
    }
  };

  const handleDeleteConfirm = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await deleteEvent(id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key]) formData.append(key, form[key]);
    });

    const url = editId
      ? `${BASE_URL}/api/events/${editId}`
      : `${BASE_URL}/api/events`;

    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { Authorization: localStorage.getItem("token") },
      body: formData,
    });

    setShow(false);
    loadEvents();
  };

  return (
    <div className="d-flex">
      <Sidebar role="admin" />

      <main className="p-4 w-100">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>
            ADMIN <span style={{ color: "orange" }}>DASHBOARD</span>
          </h2>
        
          <div className="text-muted me-3">
            Upcoming Events: {upcoming.length}
          </div>

          <button
            className="btn btn-success d-flex align-items-center gap-2"
            onClick={handleAdd}
          >
            <FaPlus /> Add Event
          </button>
        </div>

        <div className="row g-4">
          {events.map((ev) => (
            <div key={ev._id} className="col-12 col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: "15px" }}>
                {ev.image && (
                  <div style={{ position: "relative" }}>
                    <img
                      src={ev.image}
                      className="card-img-top"
                      alt={ev.title}
                      style={{
                        height: "150px",
                        objectFit: "cover",
                        borderTopLeftRadius: "15px",
                        borderTopRightRadius: "15px",
                      }}
                    />

                    <Dropdown
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                      }}
                    >
                      <Dropdown.Toggle
                        variant="light"
                        size="sm"
                        className="no-caret"
                        style={{ border: "none", background: "white" }}
                      >
                        <FaEllipsisV />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleEditConfirm(ev)}>
                          <FaEdit className="me-2" /> Edit
                        </Dropdown.Item>

                        <Dropdown.Item onClick={() => handleDeleteConfirm(ev._id)}>
                          <FaTrash className="me-2 text-danger" /> Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                )}

                <div className="card-body d-flex flex-column">
                  <h6 className="fw-bold">{ev.title}</h6>

                  <p className="text-muted small">
                    {ev.desc.length > 80 ? ev.desc.slice(0, 80) + "..." : ev.desc}
                  </p>

                  {ev.mentor && (
                    <p className="mb-1">
                      <strong>Mentor:</strong> {ev.mentor}
                    </p>
                  )}

                  {ev.startTime && ev.endTime && (
                    <p className="small d-flex align-items-center">
                      <FiClock size={20} className="me-2" />
                      {ev.startTime} - {ev.endTime}
                    </p>
                  )}

                  {ev.category && (
                    <span className="badge mb-2" style={{ background: "black", padding: "13px" }}>
                      {ev.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Modal show={show} onHide={() => setShow(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{editId ? "Edit Event" : "Add Event"}</Modal.Title>
          </Modal.Header>

          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <textarea
                className="form-control mb-2"
                placeholder="Description"
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
              />

              <input
                type="text"
                className="form-control mb-2"
                placeholder="Mentor"
                value={form.mentor}
                onChange={(e) => setForm({ ...form, mentor: e.target.value })}
              />

              <div className="d-flex gap-2 mb-2">
                <input
                  type="time"
                  className="form-control"
                  value={form.startTime}
                  onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                />

                <input
                  type="time"
                  className="form-control"
                  value={form.endTime}
                  onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                />
              </div>

              <select
                className="form-control mb-2"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="">Select Category</option>
                <option>Workshop</option>
                <option>Seminar</option>
                <option>Hackathon</option>
                <option>Webinar</option>
              </select>

              <input
                type="file"
                className="form-control mb-2"
                onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
              />
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Cancel
              </Button>

              <Button type="submit" variant="primary">
                {editId ? "Update" : "Add"}
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </main>
    </div>
  );
}