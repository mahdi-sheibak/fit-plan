import Link from 'next/link';

export default function LinksPage() {
  return (
    <div className="h-[100dvh] flex justify-center items-center flex-col gap-4">
      <Link className="underline" href="/">
        home page
      </Link>
      <Link className="underline" href="/login">
        login page
      </Link>
      <Link className="underline" href="/user-boarding">
        user boarding page
      </Link>
      <Link className="underline" href="/coach-list">
        coach list page
      </Link>
    </div>
  );
}
