import { role } from './role';
export class Admin {
    _id: string;
    nom: string;
    prenom: string ;
    email: string;
    motdepasse: string;
    image:String;
    cv:String ;
    role: role;
    datenaissance:String;
    roleType:String;

}
