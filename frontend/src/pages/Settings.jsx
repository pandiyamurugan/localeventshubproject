import Sidebar from "../components/Sidebar";

export default function Settings() {
  return (
    <div className="d-flex" style={{ height: "100vh" }}>

      <Sidebar />

      <main className="flex-grow-1 p-4 overflow-auto">

       
        <h2
          className="fw-bold mb-4"
          style={{
            background: "linear-gradient(to right, gold, pink, purple)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Settings
        </h2>

        <div className="row">

          
          <div className="col-md-6 mb-4">
            <div className="card shadow h-100">
              <div className="card-body">

                <h5 className="fw-semibold mb-3" style={{color:"orange"}}>Preferences</h5>

                <div className="mb-3">
                  <label className="form-label">Language</label>
                  <select className="form-select booking-inputs">
                    <option>English</option>
                    <option>Tamil</option>
                    <option>Hindi</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Theme</label>
                  <select className="form-select booking-inputs">
                    <option>Light</option>
                    <option>Dark</option>
                  </select>
                </div>

                <div className="form-check form-switch mb-3">
                  <input className="form-check-input" type="checkbox" />
                  <label className="form-check-label">
                    Enable Notifications
                  </label>
                </div>

              </div>
            </div>
          </div>

         
          <div className="col-md-6 mb-4">
            <div className="card shadow h-100">
              <div className="card-body">

                <h5 className="fw-semibold mb-3" style={{color:"orange"}}>Security</h5>

                <div className="mb-3">
                  <label className="form-label">Current Password</label>
                  <input type="password" className="form-control booking-inputs" />
                </div>

                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input type="password" className="form-control booking-inputs" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input type="password" className="form-control booking-inputs" />
                </div>

                <button className="btn book-now-btns w-100">
                  Update Password
                </button>

              </div>
            </div>
          </div>

        </div>

        
        <div className="card shadow border-danger mt-3">
          <div className="card-body">

            <h5 className="text-danger fw-bold mb-3">
              Danger Zone
            </h5>

            <p className="text-muted">
              Deleting your account is permanent and cannot be undone.
            </p>

            <button className="btn btn-outline-danger">
              Delete Account
            </button>

          </div>
        </div>

      </main>

    </div>
  );
}