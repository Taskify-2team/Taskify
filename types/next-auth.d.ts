import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken
  }

  interface User {
    accessToken
  }
}
