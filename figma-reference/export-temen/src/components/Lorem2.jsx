export default function Lorem2({ className, lorem = "Olympiad" }) {
  return (
    <a className={className} href="#">
      <span className="lorem-2">{lorem}</span>
    </a>
  );
}
