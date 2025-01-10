import NextAuth, { NextAuthOptions, Session } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { JWT } from "next-auth/jwt";
import { getAuthUrl } from "../../../utils/functions";
import axios from "axios";
import { SpotifyAuthUrl, SpotifyScopes } from "../../../utils/constants";

// Extend the Session type to include custom properties
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
  }
}

//"https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private,user-read-private"; //

const refreshAccessToken = async (refreshToken: string) => {
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refreshToken);
    params.append("client_id", process.env.SPOTIFY_CLIENT_ID!);
    params.append("client_secret", process.env.SPOTIFY_CLIENT_SECRET!);

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, expires_in } = response.data;

    return {
      accessToken: access_token,
      expiresAt: Date.now() + expires_in * 1000, // Convert expires_in to milliseconds
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        url: SpotifyAuthUrl,
        params: {
          scope: SpotifyScopes.join(" "),
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }): Promise<JWT> {
      // Persist the OAuth access token to the token
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = Date.now() + Number(account.expires_in) * 1000; // Convert expires_in to milliseconds
      }

      // If the token is expired or will expire in the next minute, refresh it
      if (Date.now() > (token.expiresAt as number) - 60 * 1000) {
        console.log("Access token is expired, refreshing...");
        const refreshedToken = await refreshAccessToken(
          token.refreshToken as string
        );

        if (refreshedToken) {
          token.accessToken = refreshedToken.accessToken;
          token.expiresAt = refreshedToken.expiresAt;
        } else {
          console.error("Failed to refresh access token");
        }
      }

      return token;
    },
    async session({ session, token }): Promise<Session> {
      // Add accessToken to session for client-side access
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.expiresAt = token.expiresAt as number;
      return session;
    },
  },
};

export default NextAuth(authOptions);
