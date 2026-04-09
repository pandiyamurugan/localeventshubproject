import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import BASE_URL from "../api";

export default function Profile() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/auth/all`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#f4f6fb" }}>
      <Sidebar />

      <main className="flex-grow-1 p-4 overflow-auto">
       
        <h2 className="fw-bold mb-4">
          User <span style={{ color: "orange" }}>Profile</span>
        </h2>

       
        <div
          className="card border-0 shadow-lg"
          style={{ borderRadius: "16px", overflow: "hidden" }}
        >
         
          <div
            style={{
              background: "linear-gradient(135deg, #ff9800, #ff5722)",
              padding: "15px 20px",
              color: "#fff",
            }}
          >
            <h5 className="mb-0 fw-bold">All Users</h5>
            <small>Manage and view all registered users</small>
          </div>

          <div className="card-body p-3">
            {users.length === 0 ? (
              <p className="text-center text-muted">No users found</p>
            ) : (
              <div className="table-responsive">
                <table
                  className="table align-middle mb-0"
                  style={{ borderRadius: "12px", overflow: "hidden" }}
                >
                  <thead>
                    <tr style={{ background: "#f8f9fa" }}>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user, index) => (
                      <tr
                        key={user._id}
                        style={{
                          transition: "0.2s",
                          cursor: "pointer",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.background = "#fff7ed")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <td>
                          <span className="fw-bold text-muted">
                            {index + 1}
                          </span>
                        </td>

                        <td className="fw-semibold">{user.name}</td>

                        <td className="text-muted">{user.email}</td>

                        <td>
                          <span
                            style={{
                              padding: "6px 12px",
                              borderRadius: "20px",
                              fontSize: "12px",
                              fontWeight: "bold",
                              color: "#fff",
                              background:
                                user.role === "admin"
                                  ? "linear-gradient(135deg,#e53935,#d32f2f)"
                                  : "linear-gradient(135deg,#43a047,#2e7d32)",
                            }}
                          >
                            {user.role.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}