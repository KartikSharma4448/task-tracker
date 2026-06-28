// Reusable loading spinner component.

function Spinner({ size = 'md' }) {
  return (
    <div className={`spinner spinner-${size}`} role="status" aria-label="Loading">
      <div className="spinner-ring" />
    </div>
  );
}

export default Spinner;
