import { useState } from "react";
import SendIcon from "../assets/send-icon.png";
import DeleteIcon from "../assets/trash-bin.png";
import viewIconBlack from "../assets/black-closed-eye.png";
import viewIconWhite from "../assets/white-closed-eye.png";
import viewIconBlackOpen from "../assets/black-open-eye.png";
import viewIconWhiteOpen from "../assets/white-open-eye.png";
export default function TicketForm({darkMode})  {

  console.log("TicketForm darkMode:", darkMode);
  const [files, setFiles] = useState([]);
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [openedFiles, setOpenedFiles] = useState({});

  const [form, setForm] = useState({
    subject: "",
    category: "",
    description: "",
    priority: "MEDIUM"
  });
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }; 
  

  
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    setFiles(prev => {

      const newFiles = selectedFiles.filter(
        newFile =>
          !prev.some(
            existing =>
              existing.name === newFile.name &&
              existing.size === newFile.size
          )
      );

      return [...prev, ...newFiles];
    });

    e.target.value = null;
  };

  
  const handleViewFile = (file, index) => {

    setSelectedImage(URL.createObjectURL(file));
    setSelectedImageIndex(index);

    setOpenedFiles(prev => ({
      ...prev,
      [index]: true
    }));
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
        <label>Titulo<span className="asterisks">*</span></label>
        <input
          name="subject"
          placeholder="Breve resumen del problema"
          onChange={handleChange}
        />
      </div>

      {/* ROW: CATEGORY + PRIORITY */}
      <div className="row">

        <div className="field">
          <label>Categoria<span className="asterisks">*</span></label>
          <select name="category" onChange={handleChange}>
            <option value="">Selecciona categoria</option>
            <option value="Bug">Bug</option>
            <option value="Access">Acceso</option>
          </select>
        </div>

        <div className="field">
          <label>Prioridad</label>

          
        <div className="priority-container">
          {["BAJA", "MEDIA", "ALTA"].map((p) => (
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
        <label>Descripcion<span className="asterisks">*</span></label>
        <textarea
          placeholder="Explica el problema en detalle..."
          name="description"
          onChange={handleChange}
        />
      </div>

      {/* ATTACHMENT */}
      
      <div className="field">
        <label>Archivo adjunto (opcional)</label>

        <label htmlFor="fileInput" className="upload-box">
          Dale clic para subir un archivo
          <br />
          PNG, JPG, PDF no arriba de 10MB
        </label>

        <input
          type="file"
          id="fileInput"
          hidden
          multiple
          onChange={handleFileChange}
        />

            
        {files.map((file, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "10px"
            }}
          >
            <span>📎 {file.name}</span>

            <span
              onClick={() => handleViewFile(file, index)}
              style={{
                color: "#60a5fa",
                cursor: "pointer",
                textDecoration: "underline"
              }}
            >
                     
            <img
              className="icon"
              src={
                darkMode
                  ? (
                      openedFiles[index]
                        ? viewIconWhiteOpen
                        : viewIconWhite
                    )
                  : (
                      openedFiles[index]
                        ? viewIconBlackOpen
                        : viewIconBlack
                    )
              }
              alt="View"
            />

            </span>

            <span
              
              onClick={() => {

                setFiles(files.filter((_, i) => i !== index));

                
                setOpenedFiles(prev => {
                  const updated = { ...prev };
                  delete updated[index];
                  return updated;
                });


              }}
              
              style={{
                color: "#ef4444",
                cursor: "pointer",
                textDecoration: "underline"
              }}
              
            >
              <img className="icon" src={DeleteIcon} alt="Delete" />
            </span>
          </div>
        ))}

        </div>
          
      {/* ACTIONS */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <button type="button" className="secondary-btn">Cancelar</button>
        <button type="submit" className="primary-btn">
          <img className="icon" src={SendIcon} alt="Send" />
          Subir ticket
        </button>
      </div>
      {selectedImage && (
        <div className="modal-overlay">

          <div className="modal-content">

            <button
              className="close-btn"
              type="button"
              onClick={() => {

                if (selectedImageIndex !== null) {

                  setOpenedFiles(prev => ({
                    ...prev,
                    [selectedImageIndex]: false
                  }));

                }

                setSelectedImage(null);
                setSelectedImageIndex(null);

              }}
            >
              ✕
            </button>

            
          <div className="preview-wrapper">
            <img
              src={selectedImage}
              alt="Preview"
              className="preview-image"
            />
          </div>


          </div>

        </div>
      )}
    </form>

  );
  
}


