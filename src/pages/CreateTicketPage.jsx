import "./App.css";
import TicketForm from "../components/TicketForm";
import moonIcon from "../assets/whitemoon.png";
import sunIcon from "../assets/darksun.png";

export default function CreateTicketPage({ darkMode, setDarkMode }) {

  return (
    <>
      <div className="center">
        <div className="card">
          <h2>Subir ticket</h2>
          <p>Describe tu problema y nuestro equipo de soporte se encargara de atenderlo</p>

          <TicketForm darkMode={darkMode} />
        </div>
      </div>

      <button
        className="right-corner"
        onClick={() => setDarkMode(!darkMode)}
      >
        <img
          src={darkMode ? sunIcon : moonIcon}
          alt="Toggle Dark Mode"
        />
      </button>
    </>
  );
}