import logo from "../assets/logo.png";
import { useState } from "react";
import ticketIcon from "../assets/ticket.png";
import ticketIconDark from "../assets/ticket-black.png";
import EditIconBlue from "../assets/edit-blue.png";
import EditIconWhite from "../assets/edit-white.png";
import blackEye from "../assets/black-open-eye.png";
import whiteEye from "../assets/white-open-eye.png";
import folderWhite from "../assets/folder-white.png";
import folderBlack from "../assets/folder-black.png";
export default function Navbar({ darkMode }) {
  
  const [showTickets, setShowTickets] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketFilter, setTicketFilter] = useState("TODOS");
  const [editingTicket, setEditingTicket] = useState(null);

  const filteredTickets = tickets.filter(ticket => {
      if (ticketFilter === "TODOS") {
        return true;
      }

      if (ticketFilter === "ABIERTOS") {
        return ticket.status === "ABIERTO";
      }

      if (ticketFilter === "RESUELTOS") {
        return ticket.status === "RESUELTO";
      }

      if (ticketFilter === "EN_PROGRESO") {
        return ticket.status === "EN_PROGRESO";
      }

      return true;
    });
    
  const loadTickets = async () => {  
    const token = localStorage.getItem("sessionToken");
    const response = await fetch(
      `http://localhost:8080/api/tickets/active?sessionToken=${token}`
    );

    const data = await response.json();
    
    setTickets(data);
  };
  const saveTicket = async () => {

  const formData = new FormData();

  formData.append(
    "subject",
    editingTicket.subject
  );

  formData.append(
    "category",
    editingTicket.category
  );

  formData.append(
    "priority",
    editingTicket.priority
  );

  formData.append(
    "description",
    editingTicket.description
  );

  if (editingTicket.newFile) {
    formData.append(
      "file",
      editingTicket.newFile
    );
  }

  await fetch(
    `http://localhost:8080/api/tickets/${editingTicket.ticketId}`,
    {
      method: "PUT",
      body: formData
    }
  );

  await loadTickets();

  setEditingTicket(null);
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
            ...(darkMode ? darkStyles.ticketBtn : {}),
            
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

            borderRadius: "16px",

            boxShadow:
              "0 10px 30px rgba(0,0,0,.15)",

            padding: "24px 28px",

            zIndex: 9999
          }}
        >

          <div 
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              marginBottom: "15px",
              
            }}
          >
            Mis Tickets
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "20px"
            }}
          >

            {[
              ["TODOS", "Todos"],
              ["ABIERTOS", "Abiertos"],
              ["EN_PROGRESO", "En progreso"],
              ["RESUELTOS", "Resueltos"]
            ].map(([value, label]) => (

              <button
                key={value}
                onClick={() => setTicketFilter(value)}
                style={{
                  border:
                    ticketFilter === value
                      ? "2px solid #2563eb"
                      : "1px solid #e5e7eb",

                  background:
                    ticketFilter === value
                      ? "#eff6ff"
                      : "transparent",

                  color:
                    ticketFilter === value
                      ? "#2563eb"
                      : darkMode
                      ? "#cbd5e1"
                      : "#64748b",

                  fontWeight: 600,

                  borderRadius: "20px",

                  padding: "8px 16px",

                  cursor: "pointer"
                }}
              >
                {label}
              </button>

            ))}

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

          {filteredTickets.map(ticket => (
            
            <div
              key={ticket.ticketId}
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",

                padding: "20px",

                marginBottom: "12px",

                borderRadius: "12px",

                border: darkMode
                  ? "1px solid #475569"
                  : "1px solid #e5e7eb",

                background: darkMode
                  ? "#1f2937"
                  : "#ffffff",

                boxShadow: darkMode
                  ? "none"
                  : "0 1px 3px rgba(0,0,0,0.05)"
              }}
            >
               
              <div
                style= {{
                  display: "flex",
                  alignItems: "center",
                  gap: "18px"
                }}
              >

                <div
                  style={{
                    fontWeight: "700",
                    color: "#64748b",
                    minWidth: "95px",
                    fontSize: "18px"
                  }}
                >
                  #{ticket.ticketNumber}
                </div>
                <div
                  style={{
                    width: "1px",
                    height: "90px",
                    background: darkMode
                        ? "#475569"
                        : "#e5e7eb"
                  }}  
                >
                </div>
                <div
                  style= {{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px"
                  }}
                >
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "18px",
                    marginBottom: "8px"
                  }}
                >
                  {ticket.subject}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                    fontSize: "13px",
                    color: darkMode
                      ? "#cbd5e1"
                      : "#6b7280",
                  }}
                >
                  <span
                    style= {{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                      }}
                    > 
                    <img 
                      src={darkMode ? folderWhite : folderBlack}
                      alt="Folder icon"
                  />{ticket.category}</span>
                  <span>
                    {new Date(ticket.createdAt)
                     .toLocaleString()}
                  </span>
                  
                  </div>

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
                    
                    ...(ticket.status === "ABIERTO"
                      ? {
                          background: darkMode ? "#1e40af" : "#dbeafe",
                          color: darkMode ? "#bfdbfe" : "#2563eb"
                        }
                      : ticket.status === "EN_PROGRESO"
                      ? {
                          background: darkMode ? "#78350f" : "#fef3c7",
                          color: darkMode ? "#fde68a" : "#d97706"
                        }
                      : ticket.status === "RESUELTO"
                      ? {
                          background: darkMode ? "#14532d" : "#dcfce7",
                          color: darkMode ? "#86efac" : "#16a34a"
                        }
                      : {
                          background: darkMode ? "#374151" : "#e5e7eb",
                          color: darkMode ? "#d1d5db" : "#4b5563"
                        }),
                 
                    padding: "8px 16px",
                    
                    minWidth: "50px",
                    borderRadius: "999px",

                    fontSize: "13px",
                    fontWeight: 600,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    whiteSpace: "nowrap"
                  }}
                >
                  {ticket.status.replace("_", " ")}
                </span>
                
                <button
                  style={{
                    border: "1px solid #d1d5db",
                    background: darkMode
                        ? "#475569"
                        : "#ffffff",
                    borderRadius: "10px",
                    padding: "10px 18px",
                    cursor: "pointer",
                    fontWeight: 600,
                    color: darkMode
                        ? "#ffffff" 
                        : "#475569",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "5px"
                        
                  }}
                  onClick={() => setSelectedTicket(ticket)}

                >
                  <img className="icon" src={darkMode ?  whiteEye: blackEye } alt="Mostrar" />
                  
                  Mostrar
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
                                fontWeight: 600,

                                display: "flex",
                                alignItems: "center",
                                gap: "18px",
                                borderRadius: "100px",
                                height: "25px",
                                width: "60px"
                            }}
                            
                        >
                          ● {selectedTicket.priority}
                        </span>

                        <span className="status-badge"
                          style={{
                            ...(ticket.status === "ABIERTO"
                            ? {
                                background: darkMode ? "#1e40af" : "#dbeafe",
                                color: darkMode ? "#bfdbfe" : "#2563eb"
                              }
                            : ticket.status === "EN_PROGRESO"
                            ? {
                                background: darkMode ? "#78350f" : "#fef3c7",
                                color: darkMode ? "#fde68a" : "#d97706"
                              }
                            : ticket.status === "RESUELTO"
                            ? {
                                background: darkMode ? "#14532d" : "#dcfce7",
                                color: darkMode ? "#86efac" : "#16a34a"
                              }
                            : {
                                background: darkMode ? "#374151" : "#e5e7eb",
                                color: darkMode ? "#d1d5db" : "#4b5563"
                              }),
                          }}                        
                        
                        >
                          {selectedTicket.status.replace("_", " ")}
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
                <div
                  style={{
                    position: "absolute",
                    top: "1px",
                    right: "1px"
                  }}
                >
                <button
                  onClick={() => setEditingTicket(ticket)}
                  style={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    padding: "0",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <img src={darkMode ?  EditIconWhite : EditIconBlue} alt="Edit" />
                  
                </button>

                {editingTicket && (

                  <div className="ticket-details-overlay">

                    <div className="ticket-details-modal">

                      <button
                        className="close-btn"
                        onClick={() => setEditingTicket(null)}
                      >
                        ✕
                      </button>

                      <h2>Editar Ticket</h2>

                      <div className="field">
                        <label>Título</label>

                        <input
                          value={editingTicket.subject}
                          onChange={(e) =>
                            setEditingTicket({
                              ...editingTicket,
                              subject: e.target.value
                            })
                          }
                        />
                      </div>

                      <div className="field">
                        <label>Categoría</label>

                        <input
                          value={editingTicket.category}
                          onChange={(e) =>
                            setEditingTicket({
                              ...editingTicket,
                              category: e.target.value
                            })
                          }
                        />
                      </div>

                      <div className="field">
                        <label>Prioridad</label>

                        <select
                          value={editingTicket.priority}
                          onChange={(e) =>
                            setEditingTicket({
                              ...editingTicket,
                              priority: e.target.value
                            })
                          }
                        >
                          <option value="BAJA">BAJA</option>
                          <option value="MEDIA">MEDIA</option>
                          <option value="ALTA">ALTA</option>
                        </select>
                      </div>

                      <div className="field">
                        <label>Descripción</label>

                        <textarea
                          value={editingTicket.description}
                          onChange={(e) =>
                            setEditingTicket({
                              ...editingTicket,
                              description: e.target.value
                            })
                          }
                        />
                      </div>

                      <div className="field">
                        <label>Archivo adjunto</label>

                        <input
                          type="file"
                          onChange={(e) =>
                            setEditingTicket({
                              ...editingTicket,
                              newFile: e.target.files[0]
                            })
                          }
                        />
                      </div>

                      <button
                        className="primary-btn"
                        onClick={saveTicket}
                      >
                        Guardar cambios
                      </button>

                    </div>

                  </div>

                )}
                </div>
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
    justifyContent: "center",
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