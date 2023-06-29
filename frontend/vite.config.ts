import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/socket.io": {
        //! this is the target to socket.io server or connection
        target: "http://localhost:3000" || "*",
        //? this show the information that this is a websocket connection
        ws: true,
      },
    },
  },
});
