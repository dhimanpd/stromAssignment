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
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center text-white">
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
      <button type="submit">Sign out</button>
    </form>
  );
}
