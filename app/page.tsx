import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="text-center max-w-screen-sm mb-10">
          <h1 className="text-stone-200 font-bold text-2xl">
            Strom AI Chat App
          </h1>
          <p className="text-stone-400 mt-5">
            Please login to go to the chat app
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/protected"
            className="text-stone-400 underline hover:text-stone-200 transition-all"
          >
            Chat
          </Link>
        </div>
      </div>
    </div>
  );
}
