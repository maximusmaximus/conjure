/** Robinhood Chain testnet only. No keys, no mainnet switch in this build. */
export const CHAIN = {
  id: 46630,
  hex: "0xb626",
  name: "Robinhood Chain Testnet",
  rpc: "https://rpc.testnet.chain.robinhood.com",
  explorer: "https://explorer.testnet.chain.robinhood.com",
  currency: "ETH",
  /**
   * Public collection address. Empty means this deployment has no contract
   * to call. Not a secret.
   */
  contract: "" as `0x${string}` | "",
  royaltyBps: 500,
  dailyCap: 5,
} as const;

export const MINT_ABI = [
  "function mint(address to, string tokenURI)",
] as const;

export type WalletState = {
  address: string;
  chainId: number;
  balanceEth: string;
};

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, cb: (...args: unknown[]) => void) => void;
};

function provider(): EthereumProvider | null {
  if (typeof window === "undefined") return null;
  const eth = (window as unknown as { ethereum?: EthereumProvider }).ethereum;
  return eth && typeof eth.request === "function" ? eth : null;
}

export function walletAvailable(): boolean {
  return provider() != null;
}

function hexToEth(hex: string): string {
  const wei = BigInt(hex);
  const whole = wei / 10n ** 18n;
  const frac = (wei % 10n ** 18n).toString().padStart(18, "0").slice(0, 4);
  return `${whole}.${frac}`;
}

export async function connectWallet(): Promise<WalletState> {
  const eth = provider();
  if (!eth) throw new Error("No wallet in this browser.");
  const accounts = (await eth.request({
    method: "eth_requestAccounts",
  })) as string[];
  const address = accounts[0];
  if (!address) throw new Error("The wallet shared no account.");
  try {
    await eth.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: CHAIN.hex }],
    });
  } catch (error) {
    const code = (error as { code?: number }).code;
    if (code === 4902) {
      await eth.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: CHAIN.hex,
            chainName: CHAIN.name,
            nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
            rpcUrls: [CHAIN.rpc],
            blockExplorerUrls: [CHAIN.explorer],
          },
        ],
      });
    } else {
      throw error;
    }
  }
  const chainHex = (await eth.request({ method: "eth_chainId" })) as string;
  const chainId = Number.parseInt(chainHex, 16);
  const balanceHex = (await eth.request({
    method: "eth_getBalance",
    params: [address, "latest"],
  })) as string;
  return { address, chainId, balanceEth: hexToEth(balanceHex) };
}

export async function mintWithWallet(to: string, tokenUri: string): Promise<string> {
  const eth = provider();
  if (!eth) throw new Error("No wallet in this browser.");
  if (!CHAIN.contract) {
    throw new Error("No collection contract is configured.");
  }
  const chainHex = (await eth.request({ method: "eth_chainId" })) as string;
  if (Number.parseInt(chainHex, 16) !== CHAIN.id) {
    throw new Error("Switch the wallet to Robinhood Chain testnet.");
  }
  const data = encodeMint(to, tokenUri);
  const hash = (await eth.request({
    method: "eth_sendTransaction",
    params: [
      {
        from: to,
        to: CHAIN.contract,
        data,
      },
    ],
  })) as string;
  return hash;
}

function encodeMint(to: string, tokenUri: string): string {
  const selector = "0xd0def521";
  const addr = to.toLowerCase().replace(/^0x/, "").padStart(64, "0");
  const offset = (64).toString(16).padStart(64, "0");
  const bytes = new TextEncoder().encode(tokenUri);
  const len = bytes.length.toString(16).padStart(64, "0");
  let hex = "";
  bytes.forEach((b) => {
    hex += b.toString(16).padStart(2, "0");
  });
  const padded = hex.padEnd(Math.ceil(hex.length / 64) * 64, "0");
  return `${selector}${addr}${offset}${len}${padded}`;
}
