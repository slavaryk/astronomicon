type AbleToDispatch<Actions> = {
	dispatch: (action: Actions, ...args: unknown[]) => void;
}

export type Dispatcher<Actions> = AbleToDispatch<Actions> & {
	[key: string]: any;
}
