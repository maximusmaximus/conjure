import { createConfig } from "wagmi";
import { getPublicClient } from "wagmi/actions";
import {
  createWalletClient,
  custom,
  defineChain,
  erc721Abi,
  http,
  parseAbiItem,
  type Address,
  type Hash,
} from "viem";
import { CHAIN } from "./chain";

/** Robinhood Chain testnet only. This module has no mainnet chain. */
export const robinhoodTestnet = defineChain({
  id: CHAIN.id,
  name: CHAIN.name,
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: { default: { http: [CHAIN.rpc] } },
  blockExplorers: { default: { name: "Explorer", url: CHAIN.explorer } },
  testnet: true,
});

export const wagmiConfig = createConfig({
  chains: [robinhoodTestnet],
  transports: { [robinhoodTestnet.id]: http(CHAIN.rpc) },
  ssr: true,
});

const transferEvent = parseAbiItem(
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
);

export type OwnedToken = { id: string };

function asAddress(value: string): Address {
  if (!/^0x[a-fA-F0-9]{40}$/.test(value)) throw new Error("That address is not valid.");
  return value as Address;
}

export async function listOwnedTokens(owner: string): Promise<OwnedToken[]> {
  if (!CHAIN.contract) return [];
  const client = getPublicClient(wagmiConfig);
  const account = asAddress(owner);
  const logs = await client.getLogs({
    address: CHAIN.contract,
    event: transferEvent,
    fromBlock: 0n,
    toBlock: "latest",
  });
  const holder = new Map<string, Address>();
  for (const log of logs) {
    const id = log.args.tokenId?.toString();
    if (!id || !log.args.to) continue;
    holder.set(id, log.args.to);
  }
  return [...holder.entries()]
    .filter(([, who]) => who.toLowerCase() === account.toLowerCase())
    .map(([id]) => ({ id }))
    .sort((a, b) => Number(a.id) - Number(b.id));
}

export async function transferToken(from: string, to: string, tokenId: string): Promise<Hash> {
  if (!CHAIN.contract) throw new Error("No collection contract is configured.");
  if (typeof window === "undefined") throw new Error("No wallet in this browser.");
  const eth = (window as unknown as { ethereum?: unknown }).ethereum;
  if (!eth) throw new Error("No wallet in this browser.");
  const fromAddr = asAddress(from);
  const toAddr = asAddress(to);
  if (!/^\d+$/.test(tokenId)) throw new Error("Token id must be a number.");
  const wallet = createWalletClient({
    account: fromAddr,
    chain: robinhoodTestnet,
    transport: custom(eth as Parameters<typeof custom>[0]),
  });
  const chainId = await wallet.getChainId();
  if (chainId !== CHAIN.id) throw new Error("Switch the wallet to Robinhood Chain testnet.");
  return wallet.writeContract({
    address: CHAIN.contract,
    abi: erc721Abi,
    functionName: "transferFrom",
    args: [fromAddr, toAddr, BigInt(tokenId)],
    account: fromAddr,
    chain: robinhoodTestnet,
  });
}
