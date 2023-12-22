type AbleToDispatch<Actions> = {
	dispatch: (action: Actions, ...args: unknown[]) => void;
}

export type Dispatcher<Actions> = AbleToDispatch<Actions> & {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}
