export interface Todo {
    id:string;
    text:string;
    done?:boolean;
    editing:boolean;
    created: Date;
}
