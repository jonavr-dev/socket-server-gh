
import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import {UserList} from "../models/user-list";
import {User} from "../models/user";

export const connectedUsers = new UserList();
export let reactions = {
    loveit: 0,
    applause: 0,
    doubt: 0,
    change: ''
};

export const connectUser = (client: Socket, io: socketIO.Server) => {
    const user = new User(client.id);
    connectedUsers.addUser(user);
};

export const disconnected = (client: Socket, io: socketIO.Server) => {
    client.on('disconnect', () => {
        console.log('User disconnected |X|');
        connectedUsers.deleteUser(client.id);

        io.emit('active-users', connectedUsers.getList());
    });
}

export const message = (client: Socket, socketIO: socketIO.Server) => {
    client.on('message', (payload: {de: string, body: string}) => {
        console.log('Received message  |>| ', payload.body);
        socketIO.emit('new-message', payload);
    });
}

export const reaction = (client: Socket, socketIO: socketIO.Server) => {
    client.on('reaction',
        (payload: {de: string, body: string}) => {
        console.log('Received reaction |R| ', payload.body);

        switch (payload.body) {
            case 'loveit':
                reactions.loveit = reactions.loveit + 1;
                reactions.change = 'loveit';
                break;

            case 'applause':
                reactions.applause = reactions.applause + 1;
                reactions.change = 'applause';
                break;

            case 'doubt':
                reactions.doubt = reactions.doubt + 1;
                reactions.change = 'doubt';
                break;
        }

        socketIO.emit('new-reaction', reactions);
    });
}

export const configureUser = (client: Socket, io: socketIO.Server) => {
    client.on('config-user', (payload: {name: string, avatar: number}, callback: Function) => {
        console.log('Configuring name  |C| ', payload.name);
        connectedUsers.updateName(client.id, payload.name);
        connectedUsers.updateAvatar(client.id, payload.avatar);
        console.log('myAvatar: ', payload.avatar);
        // console.log('list: ', connectedUsers.getList());
        io.emit('active-users', connectedUsers.getList());
        callback({
            ok: true,
            message: `User ${ payload.name } configured`
        });
    });
};

export const getUsers = (client: Socket, io: socketIO.Server) => {
    client.on('get-users', () => {
        io.to(client.id).emit('active-users', connectedUsers.getList());
    });
};
