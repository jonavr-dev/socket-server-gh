
import express from 'express';
import {SERVER_PORT} from "../global/environment";
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        // @ts-ignore
        this.io = socketIO( this.httpServer, { origins: '*:*' });

        this.listenSockets();
    }

    private listenSockets() {
        this.io.on('connection', client => {

            // Listen Events

            socket.connectUser(client, this.io);

            socket.configureUser(client, this.io);

            socket.getUsers(client, this.io);

            socket.disconnected(client, this.io);

            socket.message(client, this.io);

            socket.reaction(client, this.io);
        });
    }

    // Singleton
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    start(callback: Function) {
        this.httpServer.listen(this.port, callback());
    }
}
