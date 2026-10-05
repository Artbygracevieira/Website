import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap section" style={{ textAlign: "center" }}>
      <h1>Page not found</h1>
      <p className="lead" style={{ margin: "14px auto 28px" }}>That page moved or never existed.</p>
      <Link href="/shop" className="btn">See available work</Link>
    </div>
  );
}
