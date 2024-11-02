import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col items-center justify-center h-screen">
        <h1>Accounting Items demo page</h1>
        <Link className="text-blue-600 underline" href="/items">
          {" "}
          Go to Demo Items Page{" "}
        </Link>
      </main>
    </div>
  );
}
