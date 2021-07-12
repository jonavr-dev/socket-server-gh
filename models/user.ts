
export class User {
    public id: string;
    public name?: string;
    public avatar?: number;
    public room?: string;

    constructor(id: string) {
        this.id = id;
        this.name = 'Unknown';
        this.avatar = -1;
        this.room = 'No room';
    }
}
