export default function Lorem({ className, lorem = "Home" }) {
  return (
    <div className={className}>
      <p className="lorem-2">{lorem}</p>
    </div>
  );
}
