import { v4 as uuidv4 } from "uuid";
class Account {
	private _name: string;
	private _id: string;

	constructor(name: string) {
		this._name = name;
		this._id = uuidv4();
	}

	get name(): string {
		return this._name;
	}

	get id(): string {
		return this._id;
	}
}

export default Account;
