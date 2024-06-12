//@ts-ignore
import { v4 as uuidv4 } from "uuid";
import UUID from "../types/utils/UUID";

export default function generateUUID(): UUID {
	return uuidv4();
}
