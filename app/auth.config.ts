import { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {

      let isLoggedIn = !!auth?.user;
      let isOnDashboard = nextUrl.pathname.startsWith('/protected');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/protected', nextUrl));
      }

      return true;
    },
      async session({ session, token, user }) {
        console.log({ session, token, user })
        // Send properties to the client, like an access_token and user id from a provider.
        // session.accessToken = user.access_token        
        return session
      }
  },
} satisfies NextAuthConfig;
