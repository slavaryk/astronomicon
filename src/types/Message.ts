import { MessageParty } from "../enum/MessageParty";

export type Message<Data = unknown> = {
	from?: MessageParty;
	to?: MessageParty;
	data: Data;
}
