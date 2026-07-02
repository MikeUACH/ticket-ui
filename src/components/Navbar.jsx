
import logo from "../assets/logo.png";
import ticketIcon from "../assets/ticket.png";
import ticketIconDark from "../assets/ticket-black.png";
export default function Navbar({ darkMode }) {
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
        <button className="mis-ticketsbtn"
          style={{
            ...styles.ticketBtn,
            ...(darkMode ? darkStyles.ticketBtn : {})
          }}
        > <span><img 
        src={
              darkMode ? ticketIcon : ticketIconDark
            } alt="Ticket Icon" />
        </span>
          Mis tickets
        </button>
        
        <div style={styles.avatar}></div>
      </div>
    </div>
  );
}


const styles = {
  nav: {
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
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    background: "#f9fafb"
  },

  LoginBtn: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    background: "#f9fafb"
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

