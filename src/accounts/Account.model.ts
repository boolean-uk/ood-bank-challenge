import Ownable from "../ownership/Ownbable.model";

export default interface IAccount extends Ownable  { 
    id: string;
    name: string;
    transactions: Array<string>; // TODO : transactions should be an array of Transaction objects

}