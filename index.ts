
import Server from "./main/server";
import router from "./routes/router";
import bodyParser from "body-parser";
import cors from 'cors';

const server = Server.instance;

// Body Parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// CORS
server.app.use(cors({ origin: true, credentials: true }));

// Routes config
server.app.use('/', router);

// Start Server
server.start(() => {
    console.log('Server running on port ' + server.port);
});
