import { createConfig, http } from 'wagmi'
import { polygonAmoy } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

export const config = createConfig({
	chains: [polygonAmoy],
	ssr: true,
	connectors: [metaMask()],
	transports: {
		[polygonAmoy.id]: http(),
	},
})

declare module 'wagmi' {
	interface Register {
		config: typeof config
	}
}
