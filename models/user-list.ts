import {User} from "./user";

export class UserList {
    private list: User[] = [];

    constructor() {
    }

    public addUser(user: User): User {
        this.list.push(user);
        return user;
    }

    public deleteUser(id: string) {
        const tempUser = this.getUser(id);
        this.list = this.list.filter(user => user.id !== id);

        return tempUser;
    }

    public getUser(id: string) {
        return this.list.find(user => user.id === id);
    }

    public getList() {
        return this.list.filter(user => user.name !== 'Unknown');
    }

    public updateName(id: string, name: string) {
        for (let user of this.list) {
            if (user.id === id) {
                user.name = name;
                break;
            }
        }
    }

    public updateAvatar(id: string, avatar: number) {
        for (let user of this.list) {
            if (user.id === id) {
                user.avatar = avatar;
                break;
            }
        }
    }
}
