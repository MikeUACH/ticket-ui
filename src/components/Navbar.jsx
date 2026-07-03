import logo from "../assets/logo.png";
import { useState } from "react";
import ticketIcon from "../assets/ticket.png";
import ticketIconDark from "../assets/ticket-black.png";
export default function Navbar({ darkMode }) {
  
  const [showTickets, setShowTickets] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const loadTickets = async () => {  
    const token = localStorage.getItem("sessionToken");
    const response = await fetch(
      `http://localhost:8080/api/tickets/active?sessionToken=${token}`
    );

    const data = await response.json();
    
    setTickets(data);
  };

  return (
    <div
      style={{
        ...styles.nav,
        ...(darkMode ? darkStyles.nav : {})
      }}
    >
      <div style={styles.left}>
        
      <div
        style={{
          ...styles.logo,
          background: "white",      // ✅ FIX
          padding: "4px",            // ✅ small spacing
          borderRadius: "30px"
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            height: "70px",
            width: "auto",
            display: "block"
          }}
        />
      </div>

    
      </div>

      <div style={styles.right}>
        <div>
          <button 
            style={{
              ...styles.LoginBtn,
              ...(darkMode ? darkStyles.LoginBtn : {})
            }}
          >
            Login (SOLO ADMIN)
          </button>
        </div>
        
        <button
          style={{
            ...styles.ticketBtn,
            ...(darkMode ? darkStyles.ticketBtn : {})
          }}
          
          onClick={() => {
            setShowTickets(!showTickets);

            if (!showTickets) {
              loadTickets();
            }
          }}
          
        >
          <img
            src={darkMode ? ticketIcon : ticketIconDark}
            alt="Ticket Icon"
          />
          Mis tickets

          
        </button>
        
        
      {showTickets && (

        <div
          className="ticket-panel"
          style={{
            position: "absolute",
            top: "80px",
            right: "30px",

            width: "650px",
            maxHeight: "500px",

            overflowY: "auto",

            background: darkMode ? "#1e293b" : "white",
            color: darkMode ? "white" : "black",

            border: darkMode
              ? "1px solid #334155"
              : "1px solid #e5e7eb",

            borderRadius: "12px",

            boxShadow:
              "0 10px 30px rgba(0,0,0,.15)",

            padding: "20px",

            zIndex: 9999
          }}
        >

          <div 
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              marginBottom: "15px"
            }}
          >
            Mis Tickets
          </div>

          {tickets.length === 0 && (
            <div
              style={{
                textAlign: "center",
                color: "#94a3b8",
                padding: "20px"
              }}
            >
              No tienes tickets activos
            </div>
          )}

          {tickets.map(ticket => (

            <div
              key={ticket.ticketId}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",

                padding: "15px",

                marginBottom: "12px",

                borderRadius: "10px",

                border: darkMode
                  ? "1px solid #475569"
                  : "1px solid #e5e7eb",

                background: darkMode
                  ? "#334155"
                  : "#f8fafc"
              }}
            >

              <div>

                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px"
                  }}
                >
                  {ticket.ticketNumber}
                </div>

                <div
                  style={{
                    marginTop: "5px"
                  }}
                >
                  {ticket.subject}
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    color: darkMode
                      ? "#cbd5e1"
                      : "#6b7280",
                    marginTop: "5px"
                  }}
                >
                  {new Date(ticket.createdAt)
                    .toLocaleString()}
                </div>

              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >

                <span
                  style={{
                    color:
                      ticket.status === "ABIERTO"
                        ? "#ef4444"
                        : "#22c55e",

                    fontWeight: "bold"
                  }}
                >
                  ● {ticket.status}
                </span>
                
                <button
                  style={{
                    border: "none",
                    background: "none",
                    color: "#2563eb",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                  onClick={() => setSelectedTicket(ticket)}
                >
                  MOSTRAR
                </button>
                {selectedTicket && (

                <div className="ticket-details-overlay">

                  <div className="ticket-details-modal">

                    <button
                      className="close-btn"
                      onClick={() => setSelectedTicket(null)}
                    >
                      ✕
                    </button>

                    <div className="ticket-details-header">

                      <button
                        className="back-btn"
                        onClick={() => setSelectedTicket(null)}
                      >
                        ← De vuelta a mis tickets
                      </button>

                      <div className="ticket-id">
                        {selectedTicket.ticketNumber}
                      </div>

                      <h1 className="ticket-title">
                        {selectedTicket.subject}
                      </h1>

                      <div className="ticket-badges">

                        <span className="priority-badge"
                          style={{
                              color:
                                selectedTicket.priority === "ALTA"
                                  ? "#ef4444"
                                  : selectedTicket.priority === "MEDIA"
                                  ? "#f59e0b"
                                  : selectedTicket.priority === "BAJA"
                                  ? "#22c55e"
                                  : "#64748b",                              
                              background:
                                  selectedTicket.priority === "ALTA"
                                    ? "rgba(239, 68, 68, 0.15)"
                                    : selectedTicket.priority === "MEDIA"
                                    ? "rgba(245, 158, 11, 0.15)"
                                    : selectedTicket.priority === "BAJA"
                                    ? "rgba(34, 197, 94, 0.15)"
                                    : "rgba(100, 116, 139, 0.15)",

                                fontWeight: "bold",

                                padding: "6px 12px",

                                borderRadius: "999px",

                                display: "inline-block"

                            }}
                            
                        >
                          {selectedTicket.priority}
                        </span>

                        <span className="status-badge">
                          {selectedTicket.status}
                        </span>

                      </div>

                    </div>

                    <div className="ticket-info-grid">

                      <div className="info-card">
                        <div className="info-label">
                          CATEGORIA
                        </div>
                        <div>
                          {selectedTicket.category}
                        </div>
                      </div>

                      <div className="info-card">
                        <div className="info-label">
                          SUBIDO
                        </div>
                        <div>
                          {new Date(
                            selectedTicket.createdAt
                          ).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="info-card">
                        <div className="info-label">
                          ESTADO
                        </div>
                        <div>
                          {selectedTicket.status}
                        </div>
                      </div>

                    </div>

                    <div className="section-card">

                      <div className="section-title">
                        DESCRIPCION
                      </div>

                      <p>
                        {selectedTicket.description}
                      </p>

                    </div>

                    <div className="section-card">

                      <div className="section-title">
                        ARCHIVOS ADJUNTOS
                      </div>
                    <div>

                      {(selectedTicket?.attachments ?? []).length === 0 ? (

                        <div>No hay archivos adjuntos</div>

                      ) : (

                        selectedTicket.attachments.map(file => (

                          <div
                            key={file.id}
                            style={{
                              marginBottom: "10px"
                            }}
                          >
                            <a
                              href={`http://localhost:8080${file.fileUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              📎 {file.fileName}
                            </a>
                          </div>

                        ))

                      )}

                      </div>

                    </div>

                    <div className="section-card">

                      <div className="section-title">
                        ACTIVIDAD
                      </div>

                      <div>
                        Ticket creado el{" "}
                        {new Date(
                          selectedTicket.createdAt
                        ).toLocaleString()}
                      </div>

                    </div>

                  </div>

                </div>

              )}
                
                <button

                  style={{
                    border: "none",
                    background: "none",
                    color: "#2563eb",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  EDITAR
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

        
        <div style={styles.avatar}></div>
      </div>
    </div>
  );
}



const styles = {
  nav: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "white",
    borderBottom: "1px solid #eee"
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  logo: {
    padding: "10px",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "6px"
  },
  avatar: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: "#ddd"
  },
  ticketBtn: {
    height: "42px",
    padding: "0 16px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    background: "#ffffff",
    color: "black",

    display: "flex",
    alignItems: "center",
    gap: "8px",
    justifyContent: "center"

  },

  LoginBtn: {
    height: "42px",
    padding: "0 16px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    background: "#f9fafb",

    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};


const darkStyles = {
  ticketBtn: {
    background: "#334155",
    color: "white"
  },
  nav: {
    background: "#1e293b",
    borderBottom: "1px solid #334155",
    color: "white"
  },
  LoginBtn: {
    background: "#334155",
    color: "white"
  }
 
};