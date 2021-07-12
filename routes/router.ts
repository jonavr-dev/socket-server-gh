
import {Router, Request, Response} from 'express';
import Server from "../main/server";
import {Socket} from "socket.io";
import {connectedUsers, reactions} from "../sockets/sockets";

const router = Router();

// Get messages
router.get('/messages', (req: Request, res: Response) => {
    res.json({
        ok: true,
        message: 'All ok!!'
    });
});

// Send public message
router.post('/messages', (req: Request, res: Response) => {
    const body = req.body.data;
    const de = req.body.de;

    const payload = {
        de,
        body
    };

    const server = Server.instance;
    server.io.emit('new-message', payload);

    res.json({
        ok: true,
        body,
        de
    });
});

// Get users
router.get('/users', (req: Request, res: Response) => {
    const server = Server.instance;

    server.io.allSockets()
        .then((clients) => {
            res.json({
                ok:true,
                clients: Array.from(clients)
            });
        })
        .catch((err) => {
            res.json({
                ok:false,
                err
            });
        });
});

// Get users and their names
router.get('/users-details', (req: Request, res: Response) => {
    res.json({
        ok:true,
        clients: connectedUsers.getList()
    });
});

// Get reactions
router.get('/reactions', (req: Request, res: Response) => {
    res.json({
        ok:true,
        reactions
    });
});

export default router;
