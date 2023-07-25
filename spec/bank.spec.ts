import { Client } from "../src/client"
import { Bank } from "../src/bank"

describe("Bank tests ", () => {

    let registerClient: Client
    let newClient: Client
    let bank: Bank

    beforeEach(() => { 
        registerClient = new Client("John", "Smith", "01-10-1998")
        newClient = new Client("Chris", "Test", "01-12-1990")
        bank = new Bank()
    })

    it("should return true for registered client", () => {
        expect(bank.ifClientRegistered(registerClient.id)).toBeTruthy
    })

    it("should return false for new client", () => {
        expect(bank.ifClientRegistered(newClient.id)).toBeFalsy
    })

    it("should return client by id", () => {
        expect(bank.getClientByID(registerClient.id)).toEqual(registerClient)
    })

    it("should return undefined for not register client", () => {
        expect(bank.getClientByID(newClient.id)).toEqual(undefined)
    })

    it("should register new client", () => {
        let name = "Chris";
        let lastName = "Test";
        let birthDate = "01-12-1990";
        bank.register(name, lastName, birthDate)

        expect(bank.listClientsOfBank.length).toEqual(4)
        expect(bank.getClientByID(newClient.id)?.fullName).toEqual(name + " " + lastName)
    })

})