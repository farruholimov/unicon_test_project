import { vars } from "../config/conf";
import App from "./server";
import http from "http"
import router from "./router";

const app = new App(router)

const server = http.createServer(app.getServer)
const port = Number(vars.httpPort);

server.listen(port, '0.0.0.0', () => console.log(`Server is running at http://localhost:${port}`))