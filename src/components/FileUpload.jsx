export default function FileUpload({ onFileSelect }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <label>Attachment (optional)</label>

      <input
        type="file"
        onChange={(e) => onFileSelect(e.target.files[0])}
      />
    </div>
  );
}