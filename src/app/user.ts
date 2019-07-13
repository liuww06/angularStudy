export class User {

    username:string;
    password:string;

    toString(){
        return `${this.username}->${this.password}`;
    }

}
