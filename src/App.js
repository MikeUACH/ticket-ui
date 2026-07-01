import { useState } from "react";
import Navbar from "./components/Navbar";
import CreateTicketPage from "./pages/CreateTicketPage";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={darkMode ? "dark" : ""}
      style={{
        minHeight: "100vh",
        background: darkMode ? "#0f172a" : "#f5f7fb",
        color: darkMode ? "white" : "black"
      }}
    >
      <Navbar darkMode={darkMode} />

      <CreateTicketPage
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </div>
  );
}

export default App;
