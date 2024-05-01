import { auth, signOut } from 'app/auth';
import dynamic from 'next/dynamic';
const ChatBox = dynamic(() => import('../components/ChatBox'), {
  ssr: false,
})


export default async function ProtectedPage() {
  let session = await auth();
  console.log("P@", session)
  return (
    <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center text-stone-600">
        You are logged in as {session?.user?.email}

        <ChatBox token={session?.user?.name}/>
        <SignOut />
      </div>
    </div>
  );
}

function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button type="submit" className="rounded-2xl p-5 bg-slate-300 mx-2">Sign out</button>
    </form>
  );
}
