import { useState } from "react";

export default function TicketForm() {
  const [form, setForm] = useState({
    subject: "",
    category: "",
    description: "",
    priority: "MEDIUM"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
  e.preventDefault();

  // alert("HANDLE SUBMIT WORKS");
  console.log("Submitting ticket...");

  const payload = {
    subject: form.subject,
    category: form.category,
    description: form.description,
    priority: form.priority,
    deviceId: navigator.userAgent,
    sessionToken: crypto.randomUUID()
  };

    try {
      const response = await fetch(
        "http://localhost:8080/api/tickets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();

      console.log("Saved:", data);

      alert(`Ticket created: ${data.ticketNumber}`);
    } catch (error) {
      console.error(error);
      alert("Could not create ticket.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      {/* SUBJECT */}
      <div className="field">
        <label>Subject *</label>
        <input
          name="subject"
          placeholder="Breve resumen del problema..."
          onChange={handleChange}
        />
      </div>

      {/* ROW: CATEGORY + PRIORITY */}
      <div className="row">

        <div className="field">
          <label>Category *</label>
          <select name="category" onChange={handleChange}>
            <option value="">Selecciona categoria</option>
            <option value="Bug">Bug</option>
            <option value="Access">Access</option>
          </select>
        </div>

        <div className="field">
          <label>Priority</label>

          
        <div className="priority-container">
          {["LOW", "MEDIUM", "HIGH"].map((p) => (
            <button
              type="button"
              key={p}
              className={`priority-btn ${form.priority === p ? "active" : ""}`}
              onClick={() => setForm({ ...form, priority: p })}
            >
              <span className={`dot ${p.toLowerCase()}`}></span>
              {p}
            </button>
          ))}
        </div>


        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="field">
        <label>Descripcion *</label>
        <textarea
          placeholder="Explica el problema en detalle..."
          name="description"
          onChange={handleChange}
        />
      </div>

      {/* ATTACHMENT */}
      <div className="field">
        <label>Attachment (optional)</label>
        <div className="upload-box">
          Click to upload or drag and drop
          <br />
          PNG, JPG, PDF up to 10MB
        </div>
      </div>

      {/* ACTIONS */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <button type="button" className="secondary-btn">Cancel</button>
        <button type="submit" className="primary-btn">Submit Ticket</button>
      </div>

    </form>
  );
}


