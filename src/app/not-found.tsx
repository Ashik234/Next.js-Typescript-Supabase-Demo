import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1 className="font-bold text-3xl">404 - Page Not Found</h1>
      <p className="font-light text-xl mb-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" className="rounded-lg bg-black text-white p-3 font-mono">
        Return Home
      </Link>
    </div>
  );
}
