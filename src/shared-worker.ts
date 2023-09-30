// https://stackoverflow.com/questions/56356655/structuring-a-typescript-project-with-workers
// eslint-disable-next-line
declare let self: SharedWorkerGlobalScope;
export { };

import { API_KEY } from "./constants";
import { MessageParty } from "./enum/MessageParty";
import type { Message } from "./types/Message";
import type { JSONString } from "./types/CommonTypes";

const ports: MessagePort[] = [];
const webSocketClient = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`);

self.onconnect = initEvent => {
	const currentPort = initEvent.source as MessagePort;
	ports.push(currentPort);

	currentPort.onmessage = (event: MessageEvent<Message>) => {
		distributeMessage(event.data);
	};
};

webSocketClient.addEventListener("open", () => {
	webSocketClient.addEventListener("message", handleWebSocketClientMessage);
});

function distributeMessage(message: Message) {
	switch (message.to) {
	case MessageParty.WEB_SOCKET:
		postMessageToWebSocket(message.data);
		break;
	default: throw new Error("Invalid message party");
	}
}

function postMessageToWebSocket(data: unknown) {
	if (webSocketClient.readyState === webSocketClient.OPEN) {
		webSocketClient.send(JSON.stringify(data));
	} else {
		webSocketClient.addEventListener("open", () => {
			webSocketClient.send(JSON.stringify(data));
		}, { once: true });
	}
}

function handleWebSocketClientMessage(event: MessageEvent<JSONString>) {
	const data = JSON.parse(event.data) as unknown;
	const message: Message = {
		from: MessageParty.WEB_SOCKET,
		data,
	};

	notifyPorts(message);
}

function notifyPorts(message: Message) {
	ports.forEach(port => {
		port.postMessage(message);
	});
}
