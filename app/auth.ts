import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt-ts';
import { getUser } from 'app/db';
import { authConfig } from 'app/auth.config';
import { cookies } from 'next/headers'
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize({ email, password }: any) {
        // console.log({ email, password })
        let user = await getUser(email, password);
        // console.log({ p:"p",user })
        if (user != null && user.access_token != null) {
          console.log("if", email, user, user.access_token)
          user.email = email
          user.name = user.access_token
          return user
        }
        else{
          console.log("else", email)
          return null
        }
      },
    }),
  ],
});
