import Link from "next/link";

export const Header = () => {
  return (
    <div className="bg-emerald-500">
      <nav className="m-auto flex max-w-5xl p-3 pl-5 font-bold text-white">
        <Link href="/" className="mr-5">
          Home
        </Link>
      </nav>
    </div>
  );
};
