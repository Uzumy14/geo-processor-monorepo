const apiBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

if (!apiBase) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined. Check your .env.local or docker-compose.yml");
}

export const config = {
  apiBase,
};
