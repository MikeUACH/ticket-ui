export default function PrioritySelector({ value, onChange }) {
  const options = ["LOW", "MEDIUM", "HIGH"];

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {options.map((opt) => (
        <button
          type="button"
          key={opt}
          onClick={() => onChange(opt)}
          style={{
            padding: "10px",
            border: value === opt ? "2px solid blue" : "1px solid gray"
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}