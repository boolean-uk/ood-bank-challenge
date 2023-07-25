import { Client } from "./client";

export class Bank{
    private clientsOfBank: Client[] = [new Client("John", "Smith", "01-10-1998"), 
                                        new Client("Beata", "Johanson", "18-09-2000"), 
                                        new Client("Fredy", "Mercury", "23-12-1968")]
    constructor(){
    }

    get listClientsOfBank(): Client[] {
        return this.clientsOfBank
    }

    register(name: string, lastName: string, birthDate: string){
        this.clientsOfBank.push(new Client(name, lastName, birthDate))
    }

    ifClientRegistered(newId: number){
        for(let i=0; i < this.clientsOfBank.length ; i++){
            if (this.clientsOfBank[i].id === newId) return true
        }
        return false
    }

    getClientByID(newId: number){
        for(let i=0; i < this.clientsOfBank.length ; i++){
            if (this.clientsOfBank[i].id === newId) return this.clientsOfBank[i]
        }
        return undefined
    }
}