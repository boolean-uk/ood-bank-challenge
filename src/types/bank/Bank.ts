import { Money } from "ts-money";
import Holder from "../account holders/Holder";
import Account from "../account/Account";
import UUID from "../utils/UUID";

export default class Bank {
	private _users: Map<UUID, Holder>;

	constructor(users: Map<UUID, Holder>) {
		this._users = users;
	}

	addUser(user: Holder) {
		if (this._users.has(user.id)) return false;

		this._users.set(user.id, user);
	}
	deactivateUser(userId: UUID) {
		const user = this._users.get(userId);
		if (!user) throw new Error("user not found while deactivating");

		return user.closeAll();
	}

	get users() {
		return [...this._users.values()];
	}

    
}
