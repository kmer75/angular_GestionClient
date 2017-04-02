import {Adresse} from './adresse';
export class Client {
    constructor(
        public $key?: string,
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public description?: string,
        public imgPath?: string,
        public telephone?: string,
        public email?: string,
        public genre?: string,
        public adresse?: Adresse
    ) { }


    //public adresse : string = this.rue + ', ' + this.ville + ', ' + this.zipcode;

}
