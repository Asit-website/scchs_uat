import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { setCookie } from "nookies";

const nextAuthOptions = (req, res) => {
  return {
    session: {
      strategy: "jwt",
      maxAge: 60 * 60 * 24 * 14,
    },
    jwt: {
      maxAge: 60 * 60 * 24 * 14,
      secret: process.env.NEXTAUTH_SECRET,
      async encode({ secret, token }) {
        return jwt.sign(token, secret);
      },
      async decode({ secret, token }) {
        return jwt.verify(token, secret);
      }
    },
    providers: [
      CredentialsProvider({
        id: "nextjs-mainlogin-form",
        name: "Sign in",
        credentials: {
          email: {
            label: "Email",
            type: "email",
            placeholder: "example@example.com",
          },
          password: { label: "Password", type: "password" },
        },
        secret: "farichildFun@09072023",
        async authorize(credentials) {
          const formData = new FormData();

          try {
            formData.append("email", credentials.username);
            formData.append("password", credentials.password);
            const loginRes = await fetch(`${process.env.server.api}login`, { method: "POST",body: formData});
            const loginData = await loginRes.json();
            if (loginData.status == false) {
              formData.append("email", "");
              formData.append("password", "");
              nookies.destroy(null, "access_token");
              return false;
            } else {
              const access_token = loginData.data.access_token;
              const userData = loginData.data.user_info;

              const user = {
                id: userData.id,
                f_name: userData.name,
                l_name: userData.last_name,
                email: userData.email,
                bcId: userData.bigcommerce_customer_id,
                access_token: access_token,
              };

              setCookie({ res }, "access_token", access_token, {
                maxAge: 5 * 24 * 60 * 60,
                httpOnly: true,
                path: "/",
              });
              formData.append("email", "");
              formData.append("password", "");
              return { user: user };
            }
          } catch (err) {
            formData.append("email", "");
            formData.append("password", "");
            return false;
          }
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        return { ...token, ...user };
      },
      async session({ session, user, token }) {
        return { ...token, ...user };
      },
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
      signOut: "/logout",
      error: "/auth/error",
    },
  };
};

const NextAuthFN = (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};

export default NextAuthFN;
