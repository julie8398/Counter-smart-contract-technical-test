import { createConfig, http } from 'wagmi'
import { polygonAmoy } from 'wagmi/chains'
import { metaMask, mock } from 'wagmi/connectors'

export const config = createConfig({
	chains: [polygonAmoy],
	ssr: true,
	connectors: [
		metaMask(),
		mock({
			accounts: ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"],
		})],
	transports: {
		[polygonAmoy.id]: http(),
	},
})

declare module 'wagmi' {
	interface Register {
		config: typeof config
	}
}
