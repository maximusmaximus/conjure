import { o as __toESM, t as __commonJSMin } from "../../_runtime.mjs";
import { n as sha256$1, r as keccak_256, t as keccak_256$1 } from "../noble__hashes.mjs";
import { t as secp256k1 } from "../noble__curves+noble__hashes.mjs";
//#region node_modules/viem/_esm/constants/abis.js
var multicall3Abi = [
	{
		inputs: [{
			components: [
				{
					name: "target",
					type: "address"
				},
				{
					name: "allowFailure",
					type: "bool"
				},
				{
					name: "callData",
					type: "bytes"
				}
			],
			name: "calls",
			type: "tuple[]"
		}],
		name: "aggregate3",
		outputs: [{
			components: [{
				name: "success",
				type: "bool"
			}, {
				name: "returnData",
				type: "bytes"
			}],
			name: "returnData",
			type: "tuple[]"
		}],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [{
			name: "addr",
			type: "address"
		}],
		name: "getEthBalance",
		outputs: [{
			name: "balance",
			type: "uint256"
		}],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		name: "getCurrentBlockTimestamp",
		outputs: [{
			internalType: "uint256",
			name: "timestamp",
			type: "uint256"
		}],
		stateMutability: "view",
		type: "function"
	}
];
var batchGatewayAbi = [{
	name: "query",
	type: "function",
	stateMutability: "view",
	inputs: [{
		type: "tuple[]",
		name: "queries",
		components: [
			{
				type: "address",
				name: "sender"
			},
			{
				type: "string[]",
				name: "urls"
			},
			{
				type: "bytes",
				name: "data"
			}
		]
	}],
	outputs: [{
		type: "bool[]",
		name: "failures"
	}, {
		type: "bytes[]",
		name: "responses"
	}]
}, {
	name: "HttpError",
	type: "error",
	inputs: [{
		type: "uint16",
		name: "status"
	}, {
		type: "string",
		name: "message"
	}]
}];
var universalResolverErrors = [
	{
		inputs: [{
			name: "dns",
			type: "bytes"
		}],
		name: "DNSDecodingFailed",
		type: "error"
	},
	{
		inputs: [{
			name: "ens",
			type: "string"
		}],
		name: "DNSEncodingFailed",
		type: "error"
	},
	{
		inputs: [],
		name: "EmptyAddress",
		type: "error"
	},
	{
		inputs: [{
			name: "status",
			type: "uint16"
		}, {
			name: "message",
			type: "string"
		}],
		name: "HttpError",
		type: "error"
	},
	{
		inputs: [],
		name: "InvalidBatchGatewayResponse",
		type: "error"
	},
	{
		inputs: [{
			name: "errorData",
			type: "bytes"
		}],
		name: "ResolverError",
		type: "error"
	},
	{
		inputs: [{
			name: "name",
			type: "bytes"
		}, {
			name: "resolver",
			type: "address"
		}],
		name: "ResolverNotContract",
		type: "error"
	},
	{
		inputs: [{
			name: "name",
			type: "bytes"
		}],
		name: "ResolverNotFound",
		type: "error"
	},
	{
		inputs: [{
			name: "primary",
			type: "string"
		}, {
			name: "primaryAddress",
			type: "bytes"
		}],
		name: "ReverseAddressMismatch",
		type: "error"
	},
	{
		inputs: [{
			internalType: "bytes4",
			name: "selector",
			type: "bytes4"
		}],
		name: "UnsupportedResolverProfile",
		type: "error"
	}
];
var universalResolverResolveAbi = [...universalResolverErrors, {
	name: "resolveWithGateways",
	type: "function",
	stateMutability: "view",
	inputs: [
		{
			name: "name",
			type: "bytes"
		},
		{
			name: "data",
			type: "bytes"
		},
		{
			name: "gateways",
			type: "string[]"
		}
	],
	outputs: [{
		name: "",
		type: "bytes"
	}, {
		name: "address",
		type: "address"
	}]
}];
var universalResolverReverseAbi = [...universalResolverErrors, {
	name: "reverseWithGateways",
	type: "function",
	stateMutability: "view",
	inputs: [
		{
			type: "bytes",
			name: "reverseName"
		},
		{
			type: "uint256",
			name: "coinType"
		},
		{
			type: "string[]",
			name: "gateways"
		}
	],
	outputs: [
		{
			type: "string",
			name: "resolvedName"
		},
		{
			type: "address",
			name: "resolver"
		},
		{
			type: "address",
			name: "reverseResolver"
		}
	]
}];
var textResolverAbi = [{
	name: "text",
	type: "function",
	stateMutability: "view",
	inputs: [{
		name: "name",
		type: "bytes32"
	}, {
		name: "key",
		type: "string"
	}],
	outputs: [{
		name: "",
		type: "string"
	}]
}];
var addressResolverAbi = [{
	name: "addr",
	type: "function",
	stateMutability: "view",
	inputs: [{
		name: "name",
		type: "bytes32"
	}],
	outputs: [{
		name: "",
		type: "address"
	}]
}, {
	name: "addr",
	type: "function",
	stateMutability: "view",
	inputs: [{
		name: "name",
		type: "bytes32"
	}, {
		name: "coinType",
		type: "uint256"
	}],
	outputs: [{
		name: "",
		type: "bytes"
	}]
}];
/** @internal */
var erc1271Abi = [{
	name: "isValidSignature",
	type: "function",
	stateMutability: "view",
	inputs: [{
		name: "hash",
		type: "bytes32"
	}, {
		name: "signature",
		type: "bytes"
	}],
	outputs: [{
		name: "",
		type: "bytes4"
	}]
}];
var erc6492SignatureValidatorAbi = [{
	inputs: [
		{
			name: "_signer",
			type: "address"
		},
		{
			name: "_hash",
			type: "bytes32"
		},
		{
			name: "_signature",
			type: "bytes"
		}
	],
	stateMutability: "nonpayable",
	type: "constructor"
}, {
	inputs: [
		{
			name: "_signer",
			type: "address"
		},
		{
			name: "_hash",
			type: "bytes32"
		},
		{
			name: "_signature",
			type: "bytes"
		}
	],
	outputs: [{ type: "bool" }],
	stateMutability: "nonpayable",
	type: "function",
	name: "isValidSig"
}];
/** [ERC-20 Token Standard](https://ethereum.org/en/developers/docs/standards/tokens/erc-20) */
var erc20Abi = [
	{
		type: "event",
		name: "Approval",
		inputs: [
			{
				indexed: true,
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				name: "value",
				type: "uint256"
			}
		]
	},
	{
		type: "event",
		name: "Transfer",
		inputs: [
			{
				indexed: true,
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				name: "value",
				type: "uint256"
			}
		]
	},
	{
		type: "function",
		name: "allowance",
		stateMutability: "view",
		inputs: [{
			name: "owner",
			type: "address"
		}, {
			name: "spender",
			type: "address"
		}],
		outputs: [{ type: "uint256" }]
	},
	{
		type: "function",
		name: "approve",
		stateMutability: "nonpayable",
		inputs: [{
			name: "spender",
			type: "address"
		}, {
			name: "amount",
			type: "uint256"
		}],
		outputs: [{ type: "bool" }]
	},
	{
		type: "function",
		name: "balanceOf",
		stateMutability: "view",
		inputs: [{
			name: "account",
			type: "address"
		}],
		outputs: [{ type: "uint256" }]
	},
	{
		type: "function",
		name: "decimals",
		stateMutability: "view",
		inputs: [],
		outputs: [{ type: "uint8" }]
	},
	{
		type: "function",
		name: "name",
		stateMutability: "view",
		inputs: [],
		outputs: [{ type: "string" }]
	},
	{
		type: "function",
		name: "symbol",
		stateMutability: "view",
		inputs: [],
		outputs: [{ type: "string" }]
	},
	{
		type: "function",
		name: "totalSupply",
		stateMutability: "view",
		inputs: [],
		outputs: [{ type: "uint256" }]
	},
	{
		type: "function",
		name: "transfer",
		stateMutability: "nonpayable",
		inputs: [{
			name: "recipient",
			type: "address"
		}, {
			name: "amount",
			type: "uint256"
		}],
		outputs: [{ type: "bool" }]
	},
	{
		type: "function",
		name: "transferFrom",
		stateMutability: "nonpayable",
		inputs: [
			{
				name: "sender",
				type: "address"
			},
			{
				name: "recipient",
				type: "address"
			},
			{
				name: "amount",
				type: "uint256"
			}
		],
		outputs: [{ type: "bool" }]
	}
];
/** [ERC-721 Non-Fungible Token Standard](https://ethereum.org/en/developers/docs/standards/tokens/erc-721) */
var erc721Abi = [
	{
		type: "event",
		name: "Approval",
		inputs: [
			{
				indexed: true,
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				name: "spender",
				type: "address"
			},
			{
				indexed: true,
				name: "tokenId",
				type: "uint256"
			}
		]
	},
	{
		type: "event",
		name: "ApprovalForAll",
		inputs: [
			{
				indexed: true,
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				name: "operator",
				type: "address"
			},
			{
				indexed: false,
				name: "approved",
				type: "bool"
			}
		]
	},
	{
		type: "event",
		name: "Transfer",
		inputs: [
			{
				indexed: true,
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				name: "to",
				type: "address"
			},
			{
				indexed: true,
				name: "tokenId",
				type: "uint256"
			}
		]
	},
	{
		type: "function",
		name: "approve",
		stateMutability: "payable",
		inputs: [{
			name: "spender",
			type: "address"
		}, {
			name: "tokenId",
			type: "uint256"
		}],
		outputs: []
	},
	{
		type: "function",
		name: "balanceOf",
		stateMutability: "view",
		inputs: [{
			name: "account",
			type: "address"
		}],
		outputs: [{ type: "uint256" }]
	},
	{
		type: "function",
		name: "getApproved",
		stateMutability: "view",
		inputs: [{
			name: "tokenId",
			type: "uint256"
		}],
		outputs: [{ type: "address" }]
	},
	{
		type: "function",
		name: "isApprovedForAll",
		stateMutability: "view",
		inputs: [{
			name: "owner",
			type: "address"
		}, {
			name: "operator",
			type: "address"
		}],
		outputs: [{ type: "bool" }]
	},
	{
		type: "function",
		name: "name",
		stateMutability: "view",
		inputs: [],
		outputs: [{ type: "string" }]
	},
	{
		type: "function",
		name: "ownerOf",
		stateMutability: "view",
		inputs: [{
			name: "tokenId",
			type: "uint256"
		}],
		outputs: [{
			name: "owner",
			type: "address"
		}]
	},
	{
		type: "function",
		name: "safeTransferFrom",
		stateMutability: "payable",
		inputs: [
			{
				name: "from",
				type: "address"
			},
			{
				name: "to",
				type: "address"
			},
			{
				name: "tokenId",
				type: "uint256"
			}
		],
		outputs: []
	},
	{
		type: "function",
		name: "safeTransferFrom",
		stateMutability: "nonpayable",
		inputs: [
			{
				name: "from",
				type: "address"
			},
			{
				name: "to",
				type: "address"
			},
			{
				name: "id",
				type: "uint256"
			},
			{
				name: "data",
				type: "bytes"
			}
		],
		outputs: []
	},
	{
		type: "function",
		name: "setApprovalForAll",
		stateMutability: "nonpayable",
		inputs: [{
			name: "operator",
			type: "address"
		}, {
			name: "approved",
			type: "bool"
		}],
		outputs: []
	},
	{
		type: "function",
		name: "supportsInterface",
		stateMutability: "view",
		inputs: [{
			name: "interfaceId",
			type: "bytes4"
		}],
		outputs: [{ type: "bool" }]
	},
	{
		type: "function",
		name: "symbol",
		stateMutability: "view",
		inputs: [],
		outputs: [{ type: "string" }]
	},
	{
		type: "function",
		name: "tokenByIndex",
		stateMutability: "view",
		inputs: [{
			name: "index",
			type: "uint256"
		}],
		outputs: [{ type: "uint256" }]
	},
	{
		type: "function",
		name: "tokenOfOwnerByIndex",
		stateMutability: "view",
		inputs: [{
			name: "owner",
			type: "address"
		}, {
			name: "index",
			type: "uint256"
		}],
		outputs: [{
			name: "tokenId",
			type: "uint256"
		}]
	},
	{
		type: "function",
		name: "tokenURI",
		stateMutability: "view",
		inputs: [{
			name: "tokenId",
			type: "uint256"
		}],
		outputs: [{ type: "string" }]
	},
	{
		type: "function",
		name: "totalSupply",
		stateMutability: "view",
		inputs: [],
		outputs: [{ type: "uint256" }]
	},
	{
		type: "function",
		name: "transferFrom",
		stateMutability: "payable",
		inputs: [
			{
				name: "sender",
				type: "address"
			},
			{
				name: "recipient",
				type: "address"
			},
			{
				name: "tokenId",
				type: "uint256"
			}
		],
		outputs: []
	}
];
//#endregion
//#region node_modules/viem/_esm/utils/abi/formatAbiItem.js
function formatAbiItem$1(abiItem, { includeName = false } = {}) {
	if (abiItem.type !== "function" && abiItem.type !== "event" && abiItem.type !== "error") throw new InvalidDefinitionTypeError(abiItem.type);
	return `${abiItem.name}(${formatAbiParams(abiItem.inputs, { includeName })})`;
}
function formatAbiParams(params, { includeName = false } = {}) {
	if (!params) return "";
	return params.map((param) => formatAbiParam(param, { includeName })).join(includeName ? ", " : ",");
}
function formatAbiParam(param, { includeName }) {
	if (param.type.startsWith("tuple")) return `(${formatAbiParams(param.components, { includeName })})${param.type.slice(5)}`;
	return param.type + (includeName && param.name ? ` ${param.name}` : "");
}
//#endregion
//#region node_modules/viem/_esm/utils/data/size.js
/**
* @description Retrieves the size of the value (in bytes).
*
* @param value The value (hex or byte array) to retrieve the size of.
* @returns The size of the value (in bytes).
*/
function size$4(value) {
	if (typeof value === "string" && value.startsWith("0x")) return Math.ceil((value.length - 2) / 2);
	return value.length;
}
//#endregion
//#region node_modules/viem/_esm/errors/version.js
var version$3 = "2.58.6";
//#endregion
//#region node_modules/viem/_esm/errors/base.js
var errorConfig = {
	getDocsUrl: ({ docsBaseUrl, docsPath = "", docsSlug }) => docsPath ? `${docsBaseUrl ?? "https://viem.sh"}${docsPath}${docsSlug ? `#${docsSlug}` : ""}` : void 0,
	version: `viem@${version$3}`
};
var BaseError$3 = class BaseError$3 extends Error {
	details;
	docsPath;
	metaMessages;
	shortMessage;
	version;
	name = "BaseError";
	constructor(shortMessage, args = {}) {
		const details = (() => {
			if (args.cause instanceof BaseError$3) return args.cause.details;
			if (args.cause?.message) return args.cause.message;
			return args.details;
		})();
		const docsPath = (() => {
			if (args.cause instanceof BaseError$3) return args.cause.docsPath || args.docsPath;
			return args.docsPath;
		})();
		const docsUrl = errorConfig.getDocsUrl?.({
			...args,
			docsPath
		});
		const message = [
			shortMessage || "An error occurred.",
			"",
			...args.metaMessages ? [...args.metaMessages, ""] : [],
			...docsUrl ? [`Docs: ${docsUrl}`] : [],
			...details ? [`Details: ${details}`] : [],
			...errorConfig.version ? [`Version: ${errorConfig.version}`] : []
		].join("\n");
		super(message, args.cause ? { cause: args.cause } : void 0);
		this.details = details;
		this.docsPath = docsPath;
		this.metaMessages = args.metaMessages;
		this.name = args.name ?? this.name;
		this.shortMessage = shortMessage;
		this.version = version$3;
	}
	walk(fn) {
		return walk$1(this, fn);
	}
};
function walk$1(err, fn) {
	if (fn?.(err)) return err;
	if (err && typeof err === "object" && "cause" in err && err.cause !== void 0) return walk$1(err.cause, fn);
	return fn ? null : err;
}
//#endregion
//#region node_modules/viem/_esm/errors/abi.js
var AbiConstructorNotFoundError = class extends BaseError$3 {
	constructor({ docsPath }) {
		super(["A constructor was not found on the ABI.", "Make sure you are using the correct ABI and that the constructor exists on it."].join("\n"), {
			docsPath,
			name: "AbiConstructorNotFoundError"
		});
	}
};
var AbiConstructorParamsNotFoundError = class extends BaseError$3 {
	constructor({ docsPath }) {
		super(["Constructor arguments were provided (`args`), but a constructor parameters (`inputs`) were not found on the ABI.", "Make sure you are using the correct ABI, and that the `inputs` attribute on the constructor exists."].join("\n"), {
			docsPath,
			name: "AbiConstructorParamsNotFoundError"
		});
	}
};
var AbiDecodingDataSizeTooSmallError = class extends BaseError$3 {
	data;
	params;
	size;
	constructor({ data, params, size }) {
		super([`Data size of ${size} bytes is too small for given parameters.`].join("\n"), {
			metaMessages: [`Params: (${formatAbiParams(params, { includeName: true })})`, `Data:   ${data} (${size} bytes)`],
			name: "AbiDecodingDataSizeTooSmallError"
		});
		this.data = data;
		this.params = params;
		this.size = size;
	}
};
var AbiDecodingZeroDataError = class extends BaseError$3 {
	constructor({ cause } = {}) {
		super("Cannot decode zero data (\"0x\") with ABI parameters.", {
			name: "AbiDecodingZeroDataError",
			cause
		});
	}
};
var AbiEncodingArrayLengthMismatchError = class extends BaseError$3 {
	constructor({ expectedLength, givenLength, type }) {
		super([
			`ABI encoding array length mismatch for type ${type}.`,
			`Expected length: ${expectedLength}`,
			`Given length: ${givenLength}`
		].join("\n"), { name: "AbiEncodingArrayLengthMismatchError" });
	}
};
var AbiEncodingBytesSizeMismatchError = class extends BaseError$3 {
	constructor({ expectedSize, value }) {
		super(`Size of bytes "${value}" (bytes${size$4(value)}) does not match expected size (bytes${expectedSize}).`, { name: "AbiEncodingBytesSizeMismatchError" });
	}
};
var AbiEncodingLengthMismatchError = class extends BaseError$3 {
	constructor({ expectedLength, givenLength }) {
		super([
			"ABI encoding params/values length mismatch.",
			`Expected length (params): ${expectedLength}`,
			`Given length (values): ${givenLength}`
		].join("\n"), { name: "AbiEncodingLengthMismatchError" });
	}
};
var AbiErrorInputsNotFoundError = class extends BaseError$3 {
	constructor(errorName, { docsPath }) {
		super([
			`Arguments (\`args\`) were provided to "${errorName}", but "${errorName}" on the ABI does not contain any parameters (\`inputs\`).`,
			"Cannot encode error result without knowing what the parameter types are.",
			"Make sure you are using the correct ABI and that the inputs exist on it."
		].join("\n"), {
			docsPath,
			name: "AbiErrorInputsNotFoundError"
		});
	}
};
var AbiErrorNotFoundError = class extends BaseError$3 {
	constructor(errorName, { docsPath } = {}) {
		super([`Error ${errorName ? `"${errorName}" ` : ""}not found on ABI.`, "Make sure you are using the correct ABI and that the error exists on it."].join("\n"), {
			docsPath,
			name: "AbiErrorNotFoundError"
		});
	}
};
var AbiErrorSignatureNotFoundError = class extends BaseError$3 {
	signature;
	constructor(signature, { docsPath, cause }) {
		super([
			`Encoded error signature "${signature}" not found on ABI.`,
			"Make sure you are using the correct ABI and that the error exists on it.",
			`You can look up the decoded signature here: https://4byte.sourcify.dev/?q=${signature}.`
		].join("\n"), {
			docsPath,
			name: "AbiErrorSignatureNotFoundError",
			cause
		});
		this.signature = signature;
	}
};
var AbiEventSignatureEmptyTopicsError = class extends BaseError$3 {
	constructor({ docsPath }) {
		super("Cannot extract event signature from empty topics.", {
			docsPath,
			name: "AbiEventSignatureEmptyTopicsError"
		});
	}
};
var AbiEventSignatureNotFoundError = class extends BaseError$3 {
	constructor(signature, { docsPath }) {
		super([
			`Encoded event signature "${signature}" not found on ABI.`,
			"Make sure you are using the correct ABI and that the event exists on it.",
			`You can look up the signature here: https://4byte.sourcify.dev/?q=${signature}.`
		].join("\n"), {
			docsPath,
			name: "AbiEventSignatureNotFoundError"
		});
	}
};
var AbiEventNotFoundError = class extends BaseError$3 {
	constructor(eventName, { docsPath } = {}) {
		super([`Event ${eventName ? `"${eventName}" ` : ""}not found on ABI.`, "Make sure you are using the correct ABI and that the event exists on it."].join("\n"), {
			docsPath,
			name: "AbiEventNotFoundError"
		});
	}
};
var AbiFunctionNotFoundError = class extends BaseError$3 {
	constructor(functionName, { docsPath } = {}) {
		super([`Function ${functionName ? `"${functionName}" ` : ""}not found on ABI.`, "Make sure you are using the correct ABI and that the function exists on it."].join("\n"), {
			docsPath,
			name: "AbiFunctionNotFoundError"
		});
	}
};
var AbiFunctionOutputsNotFoundError = class extends BaseError$3 {
	constructor(functionName, { docsPath }) {
		super([
			`Function "${functionName}" does not contain any \`outputs\` on ABI.`,
			"Cannot decode function result without knowing what the parameter types are.",
			"Make sure you are using the correct ABI and that the function exists on it."
		].join("\n"), {
			docsPath,
			name: "AbiFunctionOutputsNotFoundError"
		});
	}
};
var AbiFunctionSignatureNotFoundError = class extends BaseError$3 {
	constructor(signature, { docsPath }) {
		super([
			`Encoded function signature "${signature}" not found on ABI.`,
			"Make sure you are using the correct ABI and that the function exists on it.",
			`You can look up the signature here: https://4byte.sourcify.dev/?q=${signature}.`
		].join("\n"), {
			docsPath,
			name: "AbiFunctionSignatureNotFoundError"
		});
	}
};
var AbiItemAmbiguityError = class extends BaseError$3 {
	constructor(x, y) {
		super("Found ambiguous types in overloaded ABI items.", {
			metaMessages: [
				`\`${x.type}\` in \`${formatAbiItem$1(x.abiItem)}\`, and`,
				`\`${y.type}\` in \`${formatAbiItem$1(y.abiItem)}\``,
				"",
				"These types encode differently and cannot be distinguished at runtime.",
				"Remove one of the ambiguous items in the ABI."
			],
			name: "AbiItemAmbiguityError"
		});
	}
};
var BytesSizeMismatchError$1 = class extends BaseError$3 {
	constructor({ expectedSize, givenSize }) {
		super(`Expected bytes${expectedSize}, got bytes${givenSize}.`, { name: "BytesSizeMismatchError" });
	}
};
var DecodeLogDataMismatch = class extends BaseError$3 {
	abiItem;
	data;
	params;
	size;
	constructor({ abiItem, data, params, size }) {
		super([`Data size of ${size} bytes is too small for non-indexed event parameters.`].join("\n"), {
			metaMessages: [`Params: (${formatAbiParams(params, { includeName: true })})`, `Data:   ${data} (${size} bytes)`],
			name: "DecodeLogDataMismatch"
		});
		this.abiItem = abiItem;
		this.data = data;
		this.params = params;
		this.size = size;
	}
};
var DecodeLogTopicsMismatch = class extends BaseError$3 {
	abiItem;
	constructor({ abiItem, param }) {
		super([`Expected a topic for indexed event parameter${param.name ? ` "${param.name}"` : ""} on event "${formatAbiItem$1(abiItem, { includeName: true })}".`].join("\n"), { name: "DecodeLogTopicsMismatch" });
		this.abiItem = abiItem;
	}
};
var InvalidAbiEncodingTypeError = class extends BaseError$3 {
	constructor(type, { docsPath }) {
		super([`Type "${type}" is not a valid encoding type.`, "Please provide a valid ABI type."].join("\n"), {
			docsPath,
			name: "InvalidAbiEncodingTypeError"
		});
	}
};
var InvalidAbiDecodingTypeError = class extends BaseError$3 {
	constructor(type, { docsPath }) {
		super([`Type "${type}" is not a valid decoding type.`, "Please provide a valid ABI type."].join("\n"), {
			docsPath,
			name: "InvalidAbiDecodingTypeError"
		});
	}
};
var InvalidArrayError$1 = class extends BaseError$3 {
	constructor(value) {
		super([`Value "${value}" is not a valid array.`].join("\n"), { name: "InvalidArrayError" });
	}
};
var InvalidDefinitionTypeError = class extends BaseError$3 {
	constructor(type) {
		super([`"${type}" is not a valid definition type.`, "Valid types: \"function\", \"event\", \"error\""].join("\n"), { name: "InvalidDefinitionTypeError" });
	}
};
//#endregion
//#region node_modules/viem/_esm/errors/address.js
var InvalidAddressError$1 = class extends BaseError$3 {
	constructor({ address }) {
		super(`Address "${address}" is invalid.`, {
			metaMessages: ["- Address must be a hex value of 20 bytes (40 hex characters).", "- Address must match its checksum counterpart."],
			name: "InvalidAddressError"
		});
	}
};
//#endregion
//#region node_modules/viem/_esm/utils/data/isHex.js
function isHex(value, { even = false, strict = true } = {}) {
	if (!value) return false;
	if (typeof value !== "string") return false;
	if (even && value.length % 2 !== 0) return false;
	return strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith("0x");
}
//#endregion
//#region node_modules/viem/_esm/errors/data.js
var SliceOffsetOutOfBoundsError$2 = class extends BaseError$3 {
	constructor({ offset, position, size }) {
		super(`Slice ${position === "start" ? "starting" : "ending"} at offset "${offset}" is out-of-bounds (size: ${size}).`, { name: "SliceOffsetOutOfBoundsError" });
	}
};
var SizeExceedsPaddingSizeError$2 = class extends BaseError$3 {
	constructor({ size, targetSize, type }) {
		super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (${size}) exceeds padding size (${targetSize}).`, { name: "SizeExceedsPaddingSizeError" });
	}
};
var InvalidBytesLengthError = class extends BaseError$3 {
	constructor({ size, targetSize, type }) {
		super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} is expected to be ${targetSize} ${type} long, but is ${size} ${type} long.`, { name: "InvalidBytesLengthError" });
	}
};
//#endregion
//#region node_modules/viem/_esm/utils/data/pad.js
function pad$2(hexOrBytes, { dir, size = 32 } = {}) {
	if (typeof hexOrBytes === "string") return padHex(hexOrBytes, {
		dir,
		size
	});
	return padBytes(hexOrBytes, {
		dir,
		size
	});
}
function padHex(hex_, { dir, size = 32 } = {}) {
	if (size === null) return hex_;
	const hex = hex_.startsWith("0x") ? hex_.slice(2) : hex_.replace("0x", "");
	if (hex.length > size * 2) throw new SizeExceedsPaddingSizeError$2({
		size: Math.ceil(hex.length / 2),
		targetSize: size,
		type: "hex"
	});
	return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size * 2, "0")}`;
}
function padBytes(bytes, { dir, size = 32 } = {}) {
	if (size === null) return bytes;
	if (bytes.length > size) throw new SizeExceedsPaddingSizeError$2({
		size: bytes.length,
		targetSize: size,
		type: "bytes"
	});
	const paddedBytes = new Uint8Array(size);
	if (Number.isSafeInteger(size)) {
		if (bytes.length > 0) paddedBytes.set(bytes, dir === "right" ? 0 : size - bytes.length);
		return paddedBytes;
	}
	for (let i = 0; i < size; i++) {
		const padEnd = dir === "right";
		paddedBytes[padEnd ? i : size - i - 1] = bytes[padEnd ? i : bytes.length - i - 1];
	}
	return paddedBytes;
}
//#endregion
//#region node_modules/viem/_esm/errors/encoding.js
var IntegerOutOfRangeError$1 = class extends BaseError$3 {
	constructor({ max, min, signed, size, value }) {
		super(`Number "${value}" is not in safe ${size ? `${size * 8}-bit ${signed ? "signed" : "unsigned"} ` : ""}integer range ${max ? `(${min} to ${max})` : `(above ${min})`}`, { name: "IntegerOutOfRangeError" });
	}
};
var InvalidBytesBooleanError$1 = class extends BaseError$3 {
	constructor(bytes) {
		super(`Bytes value "${bytes}" is not a valid boolean. The bytes array must contain a single byte of either a 0 or 1 value.`, { name: "InvalidBytesBooleanError" });
	}
};
var InvalidHexBooleanError$1 = class extends BaseError$3 {
	constructor(hex) {
		super(`Hex value "${hex}" is not a valid boolean. The hex value must be "0x0" (false) or "0x1" (true).`, { name: "InvalidHexBooleanError" });
	}
};
var InvalidHexValueError$1 = class extends BaseError$3 {
	constructor(value) {
		super(`Hex value "${value}" is an odd length (${value.length}). It must be an even length.`, { name: "InvalidHexValueError" });
	}
};
var RlpDepthLimitExceededError = class extends BaseError$3 {
	constructor({ limit }) {
		super(`RLP depth limit of \`${limit}\` exceeded.`, { name: "RlpDepthLimitExceededError" });
	}
};
var RlpListBoundaryExceededError = class extends BaseError$3 {
	constructor({ consumed, declared }) {
		super(`RLP list items consumed \`${consumed}\` bytes but the list declared a length of \`${declared}\`.`, { name: "RlpListBoundaryExceededError" });
	}
};
/** Thrown when an RLP payload uses a non-minimal length prefix or wraps a single byte below `0x80` in a length prefix. */
var RlpNonCanonicalError = class extends BaseError$3 {
	constructor({ reason }) {
		super(`RLP payload is not canonically encoded: ${reason}.`, { name: "RlpNonCanonicalError" });
	}
};
var RlpTrailingBytesError = class extends BaseError$3 {
	constructor({ count }) {
		super(`RLP payload encodes a single item, but \`${count}\` trailing ${count === 1 ? "byte remains" : "bytes remain"}.`, { name: "RlpTrailingBytesError" });
	}
};
var SizeOverflowError$2 = class extends BaseError$3 {
	constructor({ givenSize, maxSize }) {
		super(`Size cannot exceed ${maxSize} bytes. Given size: ${givenSize} bytes.`, { name: "SizeOverflowError" });
	}
};
//#endregion
//#region node_modules/viem/_esm/utils/data/trim.js
function trim$1(hexOrBytes, { dir = "left" } = {}) {
	if (typeof hexOrBytes === "string") {
		let data = hexOrBytes.startsWith("0x") ? hexOrBytes.slice(2) : hexOrBytes.replace("0x", "");
		let count = 0;
		if (dir === "left") {
			while (count < data.length - 1 && data.charCodeAt(count) === 48) count++;
			data = data.slice(count);
		} else {
			while (count < data.length - 2 && data.charCodeAt(data.length - count - 1) === 48 && data.charCodeAt(data.length - count - 2) === 48) count += 2;
			data = data.slice(0, data.length - count);
		}
		if (data.length === 1 && dir === "right") data = `${data}0`;
		return `0x${data.length % 2 === 1 ? `0${data}` : data}`;
	}
	const data = hexOrBytes;
	let count = 0;
	if (dir === "left") {
		while (count < data.length - 1 && data[count] === 0) count++;
		return data.slice(count);
	}
	while (count < data.length - 1 && data[data.length - count - 1] === 0) count++;
	return data.slice(0, data.length - count);
}
//#endregion
//#region node_modules/viem/_esm/utils/encoding/fromHex.js
function assertSize$2(hexOrBytes, { size }) {
	if (size$4(hexOrBytes) > size) throw new SizeOverflowError$2({
		givenSize: size$4(hexOrBytes),
		maxSize: size
	});
}
/**
* Decodes a hex value into a bigint.
*
* - Docs: https://viem.sh/docs/utilities/fromHex#hextobigint
*
* @param hex Hex value to decode.
* @param opts Options.
* @returns BigInt value.
*
* @example
* import { hexToBigInt } from 'viem'
* const data = hexToBigInt('0x1a4', { signed: true })
* // 420n
*
* @example
* import { hexToBigInt } from 'viem'
* const data = hexToBigInt('0x00000000000000000000000000000000000000000000000000000000000001a4', { size: 32 })
* // 420n
*/
function hexToBigInt(hex, opts = {}) {
	const { signed } = opts;
	if (opts.size) assertSize$2(hex, { size: opts.size });
	const value = BigInt(hex);
	if (!signed) return value;
	const size = Math.ceil((hex.length - 2) / 2);
	if (value <= (1n << BigInt(size) * 8n - 1n) - 1n) return value;
	if (typeof hex === "string" && hex.startsWith("0x")) return BigInt.asIntN(size * 8, value);
	return value - BigInt(`0x${"f".padStart(size * 2, "f")}`) - 1n;
}
/**
* Decodes a hex value into a boolean.
*
* - Docs: https://viem.sh/docs/utilities/fromHex#hextobool
*
* @param hex Hex value to decode.
* @param opts Options.
* @returns Boolean value.
*
* @example
* import { hexToBool } from 'viem'
* const data = hexToBool('0x01')
* // true
*
* @example
* import { hexToBool } from 'viem'
* const data = hexToBool('0x0000000000000000000000000000000000000000000000000000000000000001', { size: 32 })
* // true
*/
function hexToBool(hex_, opts = {}) {
	let hex = hex_;
	if (opts.size) {
		assertSize$2(hex, { size: opts.size });
		hex = trim$1(hex);
	}
	if (trim$1(hex) === "0x00") return false;
	if (trim$1(hex) === "0x01") return true;
	throw new InvalidHexBooleanError$1(hex);
}
/**
* Decodes a hex string into a number.
*
* - Docs: https://viem.sh/docs/utilities/fromHex#hextonumber
*
* @param hex Hex value to decode.
* @param opts Options.
* @returns Number value.
*
* @example
* import { hexToNumber } from 'viem'
* const data = hexToNumber('0x1a4')
* // 420
*
* @example
* import { hexToNumber } from 'viem'
* const data = hexToNumber('0x00000000000000000000000000000000000000000000000000000000000001a4', { size: 32 })
* // 420
*/
function hexToNumber(hex, opts = {}) {
	const { signed, size } = opts;
	if (!signed && !size && typeof hex === "string" && hex.startsWith("0x")) {
		const number = Number(hex);
		if (Number.isSafeInteger(number)) return number;
	}
	const value = hexToBigInt(hex, opts);
	const number = Number(value);
	if (!Number.isSafeInteger(number)) throw new IntegerOutOfRangeError$1({
		max: `${Number.MAX_SAFE_INTEGER}`,
		min: `${Number.MIN_SAFE_INTEGER}`,
		signed,
		size,
		value: `${value}n`
	});
	return number;
}
//#endregion
//#region node_modules/viem/_esm/utils/encoding/toHex.js
var hexes$1 = /*#__PURE__*/ Array.from({ length: 256 }, (_v, i) => i.toString(16).padStart(2, "0"));
var nativeToHex = /*#__PURE__*/ (() => Uint8Array.prototype.toHex)();
/**
* Encodes a string, number, bigint, or ByteArray into a hex string
*
* - Docs: https://viem.sh/docs/utilities/toHex
* - Example: https://viem.sh/docs/utilities/toHex#usage
*
* @param value Value to encode.
* @param opts Options.
* @returns Hex value.
*
* @example
* import { toHex } from 'viem'
* const data = toHex('Hello world')
* // '0x48656c6c6f20776f726c6421'
*
* @example
* import { toHex } from 'viem'
* const data = toHex(420)
* // '0x1a4'
*
* @example
* import { toHex } from 'viem'
* const data = toHex('Hello world', { size: 32 })
* // '0x48656c6c6f20776f726c64210000000000000000000000000000000000000000'
*/
function toHex(value, opts = {}) {
	if (typeof value === "number" || typeof value === "bigint") return numberToHex(value, opts);
	if (typeof value === "string") return stringToHex(value, opts);
	if (typeof value === "boolean") return boolToHex(value, opts);
	return bytesToHex(value, opts);
}
/**
* Encodes a boolean into a hex string
*
* - Docs: https://viem.sh/docs/utilities/toHex#booltohex
*
* @param value Value to encode.
* @param opts Options.
* @returns Hex value.
*
* @example
* import { boolToHex } from 'viem'
* const data = boolToHex(true)
* // '0x1'
*
* @example
* import { boolToHex } from 'viem'
* const data = boolToHex(false)
* // '0x0'
*
* @example
* import { boolToHex } from 'viem'
* const data = boolToHex(true, { size: 32 })
* // '0x0000000000000000000000000000000000000000000000000000000000000001'
*/
function boolToHex(value, opts = {}) {
	const hex = `0x${Number(value)}`;
	if (typeof opts.size === "number") {
		assertSize$2(hex, { size: opts.size });
		return pad$2(hex, { size: opts.size });
	}
	return hex;
}
/**
* Encodes a bytes array into a hex string
*
* - Docs: https://viem.sh/docs/utilities/toHex#bytestohex
*
* @param value Value to encode.
* @param opts Options.
* @returns Hex value.
*
* @example
* import { bytesToHex } from 'viem'
* const data = bytesToHex(Uint8Array.from([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33])
* // '0x48656c6c6f20576f726c6421'
*
* @example
* import { bytesToHex } from 'viem'
* const data = bytesToHex(Uint8Array.from([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33]), { size: 32 })
* // '0x48656c6c6f20576f726c64210000000000000000000000000000000000000000'
*/
function bytesToHex(value, opts = {}) {
	let string = "";
	if (nativeToHex && value instanceof Uint8Array && value.length > 0) string = nativeToHex.call(value);
	else for (let i = 0; i < value.length; i++) string += hexes$1[value[i]];
	const hex = `0x${string}`;
	if (typeof opts.size === "number") {
		assertSize$2(hex, { size: opts.size });
		return pad$2(hex, {
			dir: "right",
			size: opts.size
		});
	}
	return hex;
}
/**
* Encodes a number or bigint into a hex string
*
* - Docs: https://viem.sh/docs/utilities/toHex#numbertohex
*
* @param value Value to encode.
* @param opts Options.
* @returns Hex value.
*
* @example
* import { numberToHex } from 'viem'
* const data = numberToHex(420)
* // '0x1a4'
*
* @example
* import { numberToHex } from 'viem'
* const data = numberToHex(420, { size: 32 })
* // '0x00000000000000000000000000000000000000000000000000000000000001a4'
*/
function numberToHex(value_, opts = {}) {
	const { signed, size } = opts;
	if (!signed && (typeof value_ === "bigint" ? value_ >= 0n : Number.isSafeInteger(value_) && value_ >= 0)) {
		const hex = value_.toString(16);
		if (!size) return `0x${hex}`;
		if (Number.isSafeInteger(size) && size > 0 && hex.length <= size * 2) return `0x${hex.padStart(size * 2, "0")}`;
	}
	const value = BigInt(value_);
	let maxValue;
	if (size) {
		if (signed) maxValue = (1n << BigInt(size) * 8n - 1n) - 1n;
		else maxValue = 2n ** (BigInt(size) * 8n) - 1n;
	} else if (typeof value_ === "number") maxValue = BigInt(Number.MAX_SAFE_INTEGER);
	const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
	if (maxValue && value > maxValue || value < minValue) {
		const suffix = typeof value_ === "bigint" ? "n" : "";
		throw new IntegerOutOfRangeError$1({
			max: maxValue ? `${maxValue}${suffix}` : void 0,
			min: `${minValue}${suffix}`,
			signed,
			size,
			value: `${value_}${suffix}`
		});
	}
	const hex = `0x${(signed && value < 0 ? (1n << BigInt(size * 8)) + BigInt(value) : value).toString(16)}`;
	if (size) return pad$2(hex, { size });
	return hex;
}
/**
* Encodes a UTF-8 string into a hex string
*
* - Docs: https://viem.sh/docs/utilities/toHex#stringtohex
*
* @param value Value to encode.
* @param opts Options.
* @returns Hex value.
*
* @example
* import { stringToHex } from 'viem'
* const data = stringToHex('Hello World!')
* // '0x48656c6c6f20576f726c6421'
*
* @example
* import { stringToHex } from 'viem'
* const data = stringToHex('Hello World!', { size: 32 })
* // '0x48656c6c6f20576f726c64210000000000000000000000000000000000000000'
*/
function stringToHex(value_, opts = {}) {
	return bytesToHex(stringToBytes(value_), opts);
}
//#endregion
//#region node_modules/viem/_esm/utils/encoding/toBytes.js
var encoder$3 = /*#__PURE__*/ new TextEncoder();
/**
* Encodes a UTF-8 string, hex value, bigint, number or boolean to a byte array.
*
* - Docs: https://viem.sh/docs/utilities/toBytes
* - Example: https://viem.sh/docs/utilities/toBytes#usage
*
* @param value Value to encode.
* @param opts Options.
* @returns Byte array value.
*
* @example
* import { toBytes } from 'viem'
* const data = toBytes('Hello world')
* // Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33])
*
* @example
* import { toBytes } from 'viem'
* const data = toBytes(420)
* // Uint8Array([1, 164])
*
* @example
* import { toBytes } from 'viem'
* const data = toBytes(420, { size: 4 })
* // Uint8Array([0, 0, 1, 164])
*/
function toBytes$1(value, opts = {}) {
	if (typeof value === "number" || typeof value === "bigint") return numberToBytes(value, opts);
	if (typeof value === "boolean") return boolToBytes(value, opts);
	if (!opts.size && typeof value === "string" && value.startsWith("0x")) {
		const bytes = decodeHex(value);
		if (bytes) return bytes;
	}
	if (isHex(value)) return hexToBytes(value, opts);
	return stringToBytes(value, opts);
}
/**
* Encodes a boolean into a byte array.
*
* - Docs: https://viem.sh/docs/utilities/toBytes#booltobytes
*
* @param value Boolean value to encode.
* @param opts Options.
* @returns Byte array value.
*
* @example
* import { boolToBytes } from 'viem'
* const data = boolToBytes(true)
* // Uint8Array([1])
*
* @example
* import { boolToBytes } from 'viem'
* const data = boolToBytes(true, { size: 32 })
* // Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1])
*/
function boolToBytes(value, opts = {}) {
	const bytes = /* @__PURE__ */ new Uint8Array(1);
	bytes[0] = Number(value);
	if (typeof opts.size === "number") {
		assertSize$2(bytes, { size: opts.size });
		return pad$2(bytes, { size: opts.size });
	}
	return bytes;
}
/** Nibble value of each ASCII character code, or `-1` for non-hex characters. */
var nibbles = /*#__PURE__*/ (() => {
	const table = (/* @__PURE__ */ new Int8Array(128)).fill(-1);
	for (let i = 0; i < 10; i++) table[48 + i] = i;
	for (let i = 0; i < 6; i++) table[65 + i] = table[97 + i] = 10 + i;
	return table;
})();
/**
* Decodes the hex digits after a 2-character prefix into a byte array of
* `size` bytes (right-padded), or of the digits' length. Returns `undefined`
* on a non-hex character.
*/
function decodeHex(hex, size) {
	const odd = hex.length & 1;
	const length = hex.length - 1 >> 1;
	const bytes = new Uint8Array(size || length);
	let i = 0;
	let j = 2;
	if (odd) {
		const code = hex.charCodeAt(j++);
		const nibble = code < 128 ? nibbles[code] : -1;
		if (nibble < 0) return void 0;
		bytes[i++] = nibble;
	}
	for (; i < length; i++) {
		const a = hex.charCodeAt(j++);
		const b = hex.charCodeAt(j++);
		const high = a < 128 ? nibbles[a] : -1;
		const low = b < 128 ? nibbles[b] : -1;
		if ((high | low) < 0) return void 0;
		bytes[i] = high << 4 | low;
	}
	return bytes;
}
var charCodeMap$1 = {
	zero: 48,
	nine: 57,
	A: 65,
	F: 70,
	a: 97,
	f: 102
};
function charCodeToBase16$1(char) {
	if (char >= charCodeMap$1.zero && char <= charCodeMap$1.nine) return char - charCodeMap$1.zero;
	if (char >= charCodeMap$1.A && char <= charCodeMap$1.F) return char - (charCodeMap$1.A - 10);
	if (char >= charCodeMap$1.a && char <= charCodeMap$1.f) return char - (charCodeMap$1.a - 10);
}
/**
* Encodes a hex string into a byte array.
*
* - Docs: https://viem.sh/docs/utilities/toBytes#hextobytes
*
* @param hex Hex string to encode.
* @param opts Options.
* @returns Byte array value.
*
* @example
* import { hexToBytes } from 'viem'
* const data = hexToBytes('0x48656c6c6f20776f726c6421')
* // Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33])
*
* @example
* import { hexToBytes } from 'viem'
* const data = hexToBytes('0x48656c6c6f20776f726c6421', { size: 32 })
* // Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
*/
function hexToBytes(hex, opts = {}) {
	const size = opts.size;
	if (typeof hex === "string" && hex.length >= 2 && (!size || Number.isSafeInteger(size) && size > 0)) {
		if (size) assertSize$2(hex, { size });
		const bytes = decodeHex(hex, size);
		if (bytes) return bytes;
	}
	let hexString = hex.slice(2);
	if (hexString.length % 2) hexString = `0${hexString}`;
	if (opts.size) {
		assertSize$2(hex, { size: opts.size });
		hexString = hexString.padEnd(opts.size * 2, "0");
	}
	const length = hexString.length / 2;
	const bytes = new Uint8Array(length);
	for (let index = 0, j = 0; index < length; index++) {
		const nibbleLeft = charCodeToBase16$1(hexString.charCodeAt(j++));
		const nibbleRight = charCodeToBase16$1(hexString.charCodeAt(j++));
		if (nibbleLeft === void 0 || nibbleRight === void 0) throw new BaseError$3(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
		bytes[index] = nibbleLeft * 16 + nibbleRight;
	}
	return bytes;
}
/**
* Encodes a number into a byte array.
*
* - Docs: https://viem.sh/docs/utilities/toBytes#numbertobytes
*
* @param value Number to encode.
* @param opts Options.
* @returns Byte array value.
*
* @example
* import { numberToBytes } from 'viem'
* const data = numberToBytes(420)
* // Uint8Array([1, 164])
*
* @example
* import { numberToBytes } from 'viem'
* const data = numberToBytes(420, { size: 4 })
* // Uint8Array([0, 0, 1, 164])
*/
function numberToBytes(value, opts) {
	return hexToBytes(numberToHex(value, opts));
}
/**
* Encodes a UTF-8 string into a byte array.
*
* - Docs: https://viem.sh/docs/utilities/toBytes#stringtobytes
*
* @param value String to encode.
* @param opts Options.
* @returns Byte array value.
*
* @example
* import { stringToBytes } from 'viem'
* const data = stringToBytes('Hello world!')
* // Uint8Array([72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 33])
*
* @example
* import { stringToBytes } from 'viem'
* const data = stringToBytes('Hello world!', { size: 32 })
* // Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
*/
function stringToBytes(value, opts = {}) {
	const bytes = (() => {
		if (typeof value === "string" && value.length <= 64) {
			const bytes = new Uint8Array(value.length);
			let i = 0;
			for (; i < value.length; i++) {
				const code = value.charCodeAt(i);
				if (code > 127) break;
				bytes[i] = code;
			}
			if (i === value.length) return bytes;
		}
		return encoder$3.encode(value);
	})();
	if (typeof opts.size === "number") {
		assertSize$2(bytes, { size: opts.size });
		return pad$2(bytes, {
			dir: "right",
			size: opts.size
		});
	}
	return bytes;
}
//#endregion
//#region node_modules/viem/_esm/utils/hash/keccak256.js
function keccak256$1(value, to_) {
	const to = to_ || "hex";
	const bytes = keccak_256(isHex(value, { strict: false }) ? toBytes$1(value) : value);
	if (to === "bytes") return bytes;
	return toHex(bytes);
}
//#endregion
//#region node_modules/viem/_esm/utils/lru.js
/**
* Map with a LRU (Least recently used) policy.
*
* @link https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU
*/
var LruMap$1 = class extends Map {
	maxSize;
	constructor(size) {
		super();
		this.maxSize = size;
	}
	get(key) {
		const value = super.get(key);
		if (super.has(key)) {
			super.delete(key);
			super.set(key, value);
		}
		return value;
	}
	set(key, value) {
		if (super.has(key)) super.delete(key);
		super.set(key, value);
		if (this.maxSize && this.size > this.maxSize) {
			const firstKey = super.keys().next().value;
			if (firstKey !== void 0) super.delete(firstKey);
		}
		return this;
	}
};
//#endregion
//#region node_modules/viem/_esm/utils/address/isAddress.js
var addressRegex$1 = /^0x[a-fA-F0-9]{40}$/;
/** @internal */
var isAddressCache = /*#__PURE__*/ new LruMap$1(8192);
/**
* Checks if a string is a valid address.
*
* In strict mode (the default), a mixed-case address must match its
* [EIP-55](https://eips.ethereum.org/EIPS/eip-55) checksum. An all-lowercase
* address has no checksum and is valid.
*
* Use this to validate user input. {@link getAddress} does not validate the
* checksum; it returns the checksummed form of any casing.
*
* - Docs: https://viem.sh/docs/utilities/isAddress
*
* @example
* import { isAddress } from 'viem'
*
* isAddress('0x787bc77F1700DCE0f8c1581c18A12d3153D1B150')
* // true
* isAddress('0x787bc77F1700DCE0f8c1581c18A12d3153D1b150') // last `B` lowercased
* // false
* isAddress('0x787bc77f1700dce0f8c1581c18a12d3153d1b150')
* // true
*/
function isAddress(address, options) {
	const { strict = true } = options ?? {};
	if (!addressRegex$1.test(address)) return false;
	if (!strict || address.toLowerCase() === address) return true;
	let result = isAddressCache.get(address);
	if (result === void 0) {
		result = checksumAddress(address) === address;
		isAddressCache.set(address, result);
	}
	return result;
}
//#endregion
//#region node_modules/viem/_esm/utils/address/getAddress.js
var checksumAddressCache = /*#__PURE__*/ new LruMap$1(8192);
/**
* Returns the [EIP-55](https://eips.ethereum.org/EIPS/eip-55) checksummed form
* of an address. The input's casing is ignored.
*
* Does not validate the input; use {@link getAddress} for untrusted strings.
*/
function checksumAddress(address_, chainId) {
	const lower = address_.toLowerCase();
	const cacheKey = `${lower}.${chainId}`;
	const cached = checksumAddressCache.get(cacheKey);
	if (cached) return cached;
	const hexAddress = chainId ? `${chainId}${lower}` : lower.substring(2);
	const hash = keccak256$1(stringToBytes(hexAddress), "bytes");
	const address = (chainId ? hexAddress.substring(`${chainId}0x`.length) : hexAddress).split("");
	for (let i = 0; i < 40; i += 2) {
		if (hash[i >> 1] >> 4 >= 8 && address[i]) address[i] = address[i].toUpperCase();
		if ((hash[i >> 1] & 15) >= 8 && address[i + 1]) address[i + 1] = address[i + 1].toUpperCase();
	}
	const result = `0x${address.join("")}`;
	checksumAddressCache.set(cacheKey, result);
	return result;
}
/**
* Converts an address into its [EIP-55](https://eips.ethereum.org/EIPS/eip-55)
* checksummed form. Throws if the string is not a `0x`-prefixed, 20-byte hex
* string.
*
* The input's casing is ignored, so an address with a wrong checksum is
* returned with the correct one. To reject a wrong checksum, check the input
* with {@link isAddress} first.
*
* - Docs: https://viem.sh/docs/utilities/getAddress
*
* @example
* import { getAddress } from 'viem'
*
* getAddress('0x787bc77f1700dce0f8c1581c18a12d3153d1b150')
* // '0x787bc77F1700DCE0f8c1581c18A12d3153D1B150'
*/
function getAddress(address, chainId) {
	if (!isAddress(address, { strict: false })) throw new InvalidAddressError$1({ address });
	return checksumAddress(address, chainId);
}
//#endregion
//#region node_modules/viem/_esm/errors/cursor.js
var NegativeOffsetError$1 = class extends BaseError$3 {
	constructor({ offset }) {
		super(`Offset \`${offset}\` cannot be negative.`, { name: "NegativeOffsetError" });
	}
};
var PositionOutOfBoundsError$1 = class extends BaseError$3 {
	constructor({ length, position }) {
		super(`Position \`${position}\` is out of bounds (\`0 < position < ${length}\`).`, { name: "PositionOutOfBoundsError" });
	}
};
var RecursiveReadLimitExceededError$1 = class extends BaseError$3 {
	constructor({ count, limit }) {
		super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`, { name: "RecursiveReadLimitExceededError" });
	}
};
//#endregion
//#region node_modules/viem/_esm/utils/cursor.js
var staticCursor$1 = {
	bytes: /* @__PURE__ */ new Uint8Array(),
	get dataView() {
		const cursor = this;
		cursor._dataView ??= new DataView(this.bytes.buffer ?? this.bytes, this.bytes.byteOffset, this.bytes.byteLength);
		return cursor._dataView;
	},
	position: 0,
	positionReads: void 0,
	recursiveReadCount: 0,
	recursiveReadLimit: Number.POSITIVE_INFINITY,
	assertReadLimit() {
		if (this.recursiveReadCount >= this.recursiveReadLimit) throw new RecursiveReadLimitExceededError$1({
			count: this.recursiveReadCount + 1,
			limit: this.recursiveReadLimit
		});
	},
	assertPosition(position) {
		if (position < 0 || position > this.bytes.length - 1) throw new PositionOutOfBoundsError$1({
			length: this.bytes.length,
			position
		});
	},
	decrementPosition(offset) {
		if (offset < 0) throw new NegativeOffsetError$1({ offset });
		const position = this.position - offset;
		this.assertPosition(position);
		this.position = position;
	},
	incrementPosition(offset) {
		if (offset < 0) throw new NegativeOffsetError$1({ offset });
		const position = this.position + offset;
		this.assertPosition(position);
		this.position = position;
	},
	inspectByte(position_) {
		const position = position_ ?? this.position;
		this.assertPosition(position);
		return this.bytes[position];
	},
	inspectBytes(length, position_) {
		const position = position_ ?? this.position;
		this.assertPosition(position + length - 1);
		return this.bytes.subarray(position, position + length);
	},
	inspectUint8(position_) {
		const position = position_ ?? this.position;
		this.assertPosition(position);
		return this.bytes[position];
	},
	inspectUint16(position_) {
		const position = position_ ?? this.position;
		this.assertPosition(position + 1);
		return this.dataView.getUint16(position);
	},
	inspectUint24(position_) {
		const position = position_ ?? this.position;
		this.assertPosition(position + 2);
		return (this.dataView.getUint16(position) << 8) + this.dataView.getUint8(position + 2);
	},
	inspectUint32(position_) {
		const position = position_ ?? this.position;
		this.assertPosition(position + 3);
		return this.dataView.getUint32(position);
	},
	pushByte(byte) {
		this.assertPosition(this.position);
		this.bytes[this.position] = byte;
		this.position++;
	},
	pushBytes(bytes) {
		this.assertPosition(this.position + bytes.length - 1);
		this.bytes.set(bytes, this.position);
		this.position += bytes.length;
	},
	pushUint8(value) {
		this.assertPosition(this.position);
		this.bytes[this.position] = value;
		this.position++;
	},
	pushUint16(value) {
		this.assertPosition(this.position + 1);
		this.dataView.setUint16(this.position, value);
		this.position += 2;
	},
	pushUint24(value) {
		this.assertPosition(this.position + 2);
		this.dataView.setUint16(this.position, value >> 8);
		this.dataView.setUint8(this.position + 2, value & 255);
		this.position += 3;
	},
	pushUint32(value) {
		this.assertPosition(this.position + 3);
		this.dataView.setUint32(this.position, value);
		this.position += 4;
	},
	readByte() {
		this.assertReadLimit();
		this._touch();
		const value = this.inspectByte();
		this.position++;
		return value;
	},
	readBytes(length, size) {
		this.assertReadLimit();
		this._touch();
		const value = this.inspectBytes(length);
		this.position += size ?? length;
		return value;
	},
	readUint8() {
		this.assertReadLimit();
		this._touch();
		const value = this.inspectUint8();
		this.position += 1;
		return value;
	},
	readUint16() {
		this.assertReadLimit();
		this._touch();
		const value = this.inspectUint16();
		this.position += 2;
		return value;
	},
	readUint24() {
		this.assertReadLimit();
		this._touch();
		const value = this.inspectUint24();
		this.position += 3;
		return value;
	},
	readUint32() {
		this.assertReadLimit();
		this._touch();
		const value = this.inspectUint32();
		this.position += 4;
		return value;
	},
	get remaining() {
		return this.bytes.length - this.position;
	},
	setPosition(position) {
		const oldPosition = this.position;
		this.assertPosition(position);
		this.position = position;
		return () => this.position = oldPosition;
	},
	_touch() {
		if (this.recursiveReadLimit === Number.POSITIVE_INFINITY) return;
		const index = this.position >>> 3;
		let reads = this.positionReads;
		if (!reads || index >= reads.length) {
			const next = new Uint8Array(Math.max(index + 1, (reads?.length ?? 8) * 2));
			if (reads) next.set(reads);
			reads = this.positionReads = next;
		}
		const mask = 1 << (this.position & 7);
		if (reads[index] & mask) this.recursiveReadCount++;
		else reads[index] |= mask;
	}
};
function createCursor(bytes, { recursiveReadLimit = 8192 } = {}) {
	const cursor = Object.create(staticCursor$1);
	cursor.bytes = bytes;
	cursor._dataView = void 0;
	cursor.positionReads = void 0;
	cursor.recursiveReadLimit = recursiveReadLimit;
	return cursor;
}
//#endregion
//#region node_modules/viem/_esm/utils/encoding/fromBytes.js
/**
* Decodes a byte array into a boolean.
*
* - Docs: https://viem.sh/docs/utilities/fromBytes#bytestobool
*
* @param bytes Byte array to decode.
* @param opts Options.
* @returns Boolean value.
*
* @example
* import { bytesToBool } from 'viem'
* const data = bytesToBool(new Uint8Array([1]))
* // true
*/
function bytesToBool(bytes_, opts = {}) {
	let bytes = bytes_;
	if (typeof opts.size !== "undefined") {
		assertSize$2(bytes, { size: opts.size });
		bytes = trim$1(bytes);
	}
	if (bytes.length > 1 || bytes[0] > 1) throw new InvalidBytesBooleanError$1(bytes);
	return Boolean(bytes[0]);
}
/**
* Decodes a byte array into a number.
*
* - Docs: https://viem.sh/docs/utilities/fromBytes#bytestonumber
*
* @param bytes Byte array to decode.
* @param opts Options.
* @returns Number value.
*
* @example
* import { bytesToNumber } from 'viem'
* const data = bytesToNumber(new Uint8Array([1, 164]))
* // 420
*/
function bytesToNumber(bytes, opts = {}) {
	if (typeof opts.size !== "undefined") assertSize$2(bytes, { size: opts.size });
	if (!opts.signed && bytes.length > 0) {
		let i = 0;
		while (i < bytes.length && bytes[i] === 0) i++;
		if (bytes.length - i <= 6) {
			let value = 0;
			for (; i < bytes.length; i++) value = value * 256 + bytes[i];
			return value;
		}
	}
	return hexToNumber(bytesToHex(bytes), opts);
}
//#endregion
//#region node_modules/viem/_esm/utils/data/concat.js
function concat$1(values) {
	if (typeof values[0] === "string") return concatHex(values);
	return concatBytes(values);
}
function concatBytes(values) {
	let length = 0;
	for (const arr of values) length += arr.length;
	const result = new Uint8Array(length);
	let offset = 0;
	for (const arr of values) {
		result.set(arr, offset);
		offset += arr.length;
	}
	return result;
}
function concatHex(values) {
	let result = "";
	for (const value of values) result += value.startsWith("0x") ? value.slice(2) : value.replace("0x", "");
	return `0x${result}`;
}
//#endregion
//#region node_modules/viem/_esm/utils/regex.js
var bytesRegex$2 = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
var integerRegex$2 = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
//#endregion
//#region node_modules/viem/_esm/utils/abi/encodeAbiParameters.js
/**
* @description Encodes a list of primitive values into an ABI-encoded hex value.
*
* - Docs: https://viem.sh/docs/abi/encodeAbiParameters#encodeabiparameters
*
*   Generates ABI encoded data using the [ABI specification](https://docs.soliditylang.org/en/latest/abi-spec), given a set of ABI parameters (inputs/outputs) and their corresponding values.
*
* @param params - a set of ABI Parameters (params), that can be in the shape of the inputs or outputs attribute of an ABI Item.
* @param values - a set of values (values) that correspond to the given params.
* @example
* ```typescript
* import { encodeAbiParameters } from 'viem'
*
* const encodedData = encodeAbiParameters(
*   [
*     { name: 'x', type: 'string' },
*     { name: 'y', type: 'uint' },
*     { name: 'z', type: 'bool' }
*   ],
*   ['wagmi', 420n, true]
* )
* ```
*
* You can also pass in Human Readable parameters with the parseAbiParameters utility.
*
* @example
* ```typescript
* import { encodeAbiParameters, parseAbiParameters } from 'viem'
*
* const encodedData = encodeAbiParameters(
*   parseAbiParameters('string x, uint y, bool z'),
*   ['wagmi', 420n, true]
* )
* ```
*/
function encodeAbiParameters(params, values) {
	if (params.length !== values.length) throw new AbiEncodingLengthMismatchError({
		expectedLength: params.length,
		givenLength: values.length
	});
	const compiled = new Array(params.length);
	const parts = new Array(params.length);
	for (let i = 0; i < params.length; i++) {
		compiled[i] = compile$1(params[i]);
		parts[i] = encode$3(compiled[i], values[i]);
	}
	return ["0x", encodeParts(compiled, parts)].join("");
}
var zeros = "0".repeat(64);
/** Integer bounds by signedness and bit size (at most 64 entries). */
var integerBounds = /* @__PURE__ */ new Map();
function compile$1(param) {
	const compiled = {
		child: void 0,
		components: void 0,
		dynamic: false,
		kind: "other",
		length: null,
		max: 0n,
		min: 0n,
		param,
		signed: false,
		size: 0
	};
	if (typeof param !== "object" || param === null) return compiled;
	const { type } = param;
	if (typeof type !== "string") return compiled;
	const arrayComponents = getArrayComponents$1(type);
	if (arrayComponents) {
		const [length, innerType] = arrayComponents;
		const child = compile$1({
			...param,
			type: innerType
		});
		compiled.kind = "array";
		compiled.length = length;
		compiled.child = child;
		compiled.dynamic = length === null || child.dynamic;
		return compiled;
	}
	if (type === "tuple") {
		const { components } = param;
		if (components === void 0 || components === null) return compiled;
		compiled.kind = "tuple";
		compiled.components = Array.from({ length: components.length }, (_, i) => compile$1(components[i]));
		compiled.dynamic = compiled.components.some(({ dynamic }) => dynamic);
		return compiled;
	}
	if (type === "address") compiled.kind = "address";
	else if (type === "bool") compiled.kind = "bool";
	else if (type.startsWith("uint") || type.startsWith("int")) {
		const signed = type.startsWith("int");
		const [, , size = "256"] = integerRegex$2.exec(type) ?? [];
		const key = signed ? `i${size}` : size;
		let bounds = integerBounds.get(key);
		if (!bounds) {
			const max = 2n ** (BigInt(size) - (signed ? 1n : 0n)) - 1n;
			bounds = [signed ? -max - 1n : 0n, max];
			integerBounds.set(key, bounds);
		}
		compiled.kind = "number";
		compiled.signed = signed;
		compiled.size = Number(size);
		compiled.min = bounds[0];
		compiled.max = bounds[1];
	} else if (type.startsWith("bytes")) {
		compiled.kind = "bytes";
		compiled.size = bytesRegex$2.test(type) ? Number(type.slice(5)) : -1;
		compiled.dynamic = !type.split("bytes")[1];
	} else if (type === "string") {
		compiled.kind = "string";
		compiled.dynamic = true;
	}
	return compiled;
}
/** Encodes a value as un-prefixed hex. */
function encode$3(compiled, value) {
	const { kind, param } = compiled;
	if (kind === "array") return encodeArrayValue(compiled, value);
	if (kind === "tuple") return encodeTupleValue(compiled, value);
	if (kind === "address") {
		if (!isAddress(value)) throw new InvalidAddressError$1({ address: value });
		return `000000000000000000000000${value.toLowerCase().slice(2)}`;
	}
	if (kind === "bool") {
		if (typeof value !== "boolean") throw new BaseError$3(`Invalid boolean value: "${value}" (type: ${typeof value}). Expected: \`true\` or \`false\`.`);
		return value ? `${zeros.slice(1)}1` : zeros;
	}
	if (kind === "bytes") {
		const { size } = compiled;
		if (typeof value === "string" && value.length % 2 === 0 && value.startsWith("0x") && value.indexOf("0x", 2) === -1) {
			const data = value.slice(2);
			const length = data.length / 2;
			if (size === 0) return word(length) + data.padEnd(Math.ceil(length / 32) * 64, "0");
			if (length === size) return data.padEnd(64, "0");
		}
		return encodeBytes$1(value, { param }).encoded.slice(2);
	}
	if (kind === "number") {
		const { max, min, signed, size } = compiled;
		if (value > max || value < min) throw new IntegerOutOfRangeError$1({
			max: max.toString(),
			min: min.toString(),
			signed,
			size: size / 8,
			value: value.toString()
		});
		if (typeof value !== "bigint" && !(typeof value === "number" && Number.isSafeInteger(value))) return numberToHex(value, {
			size: 32,
			signed
		}).slice(2);
		const hex = (value < 0 ? (1n << 256n) + BigInt(value) : value).toString(16);
		return zeros.slice(hex.length) + hex;
	}
	if (kind === "string") {
		const data = stringToHex(value).slice(2);
		const remainder = data.length % 64;
		return word(data.length / 2) + data + (remainder ? zeros.slice(remainder) : "");
	}
	const type = param.type;
	getArrayComponents$1(type);
	if (type === "tuple") param.components.length;
	throw new InvalidAbiEncodingTypeError(type, { docsPath: "/docs/contract/encodeAbiParameters" });
}
function encodeArrayValue(compiled, value) {
	const { length } = compiled;
	const child = compiled.child;
	if (!Array.isArray(value)) throw new InvalidArrayError$1(value);
	if (length !== null && value.length !== length) throw new AbiEncodingArrayLengthMismatchError({
		expectedLength: length,
		givenLength: value.length,
		type: `${child.param.type}[${length}]`
	});
	const dynamicChild = value.length === 0 ? isDynamicType(child.param) : child.dynamic;
	let data = "";
	if (dynamicChild) {
		let head = "";
		let offset = value.length * 32;
		for (let i = 0; i < value.length; i++) {
			const part = encode$3(child, value[i]);
			head += word(offset);
			data += part;
			offset += Math.ceil(part.length / 2);
		}
		data = head + data;
	} else for (let i = 0; i < value.length; i++) data += encode$3(child, value[i]);
	if (length === null) return word(value.length) + data;
	return data;
}
function encodeTupleValue(compiled, value) {
	const components = compiled.components;
	const isArray = Array.isArray(value);
	const parts = new Array(components.length);
	for (let i = 0; i < components.length; i++) {
		const component = components[i];
		parts[i] = encode$3(component, value[isArray ? i : component.param.name]);
	}
	if (compiled.dynamic) return encodeParts(components, parts);
	let data = "";
	for (let i = 0; i < parts.length; i++) data += parts[i];
	return data;
}
/** Lays out encoded parts as static heads followed by dynamic tails. */
function encodeParts(compiled, parts) {
	let offset = 0;
	for (let i = 0; i < parts.length; i++) offset += compiled[i].dynamic ? 32 : Math.ceil(parts[i].length / 2);
	let head = "";
	let tail = "";
	for (let i = 0; i < parts.length; i++) {
		const part = parts[i];
		if (compiled[i].dynamic) {
			head += word(offset);
			tail += part;
			offset += Math.ceil(part.length / 2);
		} else head += part;
	}
	return head + tail;
}
/** Encodes a non-negative integer as a 32-byte word. */
function word(value) {
	const hex = value.toString(16);
	return zeros.slice(hex.length) + hex;
}
function encodeBytes$1(value, { param }) {
	const [, paramSize] = param.type.split("bytes");
	const hex = value.length % 2 ? `0x0${value.slice(2)}` : value;
	const bytesSize = size$4(hex);
	if (!paramSize) {
		let value_ = hex;
		if (bytesSize % 32 !== 0) value_ = padHex(value_, {
			dir: "right",
			size: Math.ceil(bytesSize / 32) * 32
		});
		return {
			dynamic: true,
			encoded: concatHex([padHex(numberToHex(bytesSize, { size: 32 })), value_])
		};
	}
	if (bytesSize !== Number.parseInt(paramSize, 10)) throw new AbiEncodingBytesSizeMismatchError({
		expectedSize: Number.parseInt(paramSize, 10),
		value
	});
	return {
		dynamic: false,
		encoded: padHex(hex, { dir: "right" })
	};
}
function getArrayComponents$1(type) {
	const matches = type.match(/^(.*)\[(\d+)?\]$/);
	return matches ? [matches[2] ? Number(matches[2]) : null, matches[1]] : void 0;
}
function isDynamicType(param) {
	const { type } = param;
	if (type === "string") return true;
	if (type === "bytes") return true;
	if (type.endsWith("[]")) return true;
	if (type === "tuple") return param.components.some(isDynamicType);
	const arrayComponents = getArrayComponents$1(type);
	if (arrayComponents) return isDynamicType({
		...param,
		type: arrayComponents[1]
	});
	return false;
}
//#endregion
//#region node_modules/viem/_esm/utils/abi/decodeAbiParameters.js
function decodeAbiParameters(params, data) {
	const bytes = typeof data === "string" ? hexToBytes(data) : data;
	const cursor = createCursor(bytes);
	if (size$4(bytes) === 0 && params.length > 0) throw new AbiDecodingZeroDataError();
	if (size$4(data) && size$4(data) < 32) throw new AbiDecodingDataSizeTooSmallError({
		data: typeof data === "string" ? data : bytesToHex(data),
		params,
		size: size$4(data)
	});
	const budget = {
		limit: bytes.length * 32,
		used: 0
	};
	let consumed = 0;
	const values = [];
	for (let i = 0; i < params.length; ++i) {
		const param = compile(params[i]);
		cursor.position = consumed;
		values.push(decodeParameter$1(cursor, param, budget, 0));
		consumed += lastSize;
	}
	return values;
}
function compile(param) {
	const compiled = {
		dynamic: false,
		kind: "invalid",
		param,
		child: void 0,
		length: null,
		components: void 0,
		unnamed: false,
		size: 0,
		signed: false
	};
	if (typeof param !== "object" || param === null) return compiled;
	const { type } = param;
	if (typeof type !== "string") return compiled;
	const arrayComponents = getArrayComponents$1(type);
	if (arrayComponents) {
		const [length, innerType] = arrayComponents;
		compiled.kind = "array";
		compiled.length = length;
		compiled.child = compile({
			...param,
			type: innerType
		});
		compiled.dynamic = length === null || compiled.child.dynamic;
		return compiled;
	}
	if (type === "tuple") {
		compiled.kind = "tuple";
		const { components } = param;
		if (!Array.isArray(components) || !components.every((component) => typeof component === "object")) return compiled;
		compiled.components = components.map(compile);
		compiled.unnamed = components.length === 0 || components.some(({ name }) => !name);
		compiled.dynamic = compiled.components.some(({ dynamic }) => dynamic);
		return compiled;
	}
	if (type === "address") compiled.kind = "address";
	else if (type === "bool") compiled.kind = "bool";
	else if (type.startsWith("bytes")) {
		const [_, size] = type.split("bytes");
		if (size) {
			compiled.kind = "fixedBytes";
			compiled.size = Number.parseInt(size, 10);
		} else {
			compiled.kind = "bytes";
			compiled.dynamic = type === "bytes";
		}
	} else if (type.startsWith("uint") || type.startsWith("int")) {
		compiled.kind = "number";
		compiled.signed = type.startsWith("int");
		compiled.size = Number.parseInt(type.split("int")[1] || "256", 10);
	} else if (type === "string") {
		compiled.kind = "string";
		compiled.dynamic = true;
	}
	return compiled;
}
/**
* Bytes consumed in the static part by the last `decodeParameter` call.
* Decoding runs no caller code, so the slot cannot be overwritten in between.
*/
var lastSize = 0;
function decodeParameter$1(cursor, param, budget, staticPosition) {
	lastSize = 32;
	switch (param.kind) {
		case "address": return decodeAddress$2(cursor);
		case "array": return decodeArray$1(cursor, param, budget, staticPosition);
		case "bool": return decodeBool$1(cursor);
		case "bytes": return decodeBytes$1(cursor, budget, staticPosition);
		case "fixedBytes": return bytesToHex(cursor.readBytes(param.size, 32));
		case "number": return decodeNumber$1(cursor, param);
		case "string": return decodeString$1(cursor, budget, staticPosition);
		case "tuple": return decodeTuple$1(cursor, param, budget, staticPosition);
	}
	const type = param.param.type;
	getArrayComponents$1(type);
	throw new InvalidAbiDecodingTypeError(type, { docsPath: "/docs/contract/decodeAbiParameters" });
}
var decoder$2;
/**
* Reads an offset or length word. Words below 2^53 are read directly; others
* go through `bytesToNumber`, which throws for unsafe integers.
*/
function readNumber(cursor) {
	return wordToNumber(cursor.readBytes(32));
}
function wordToNumber(word, signed) {
	let high = 0;
	for (let i = 0; i < 25; i++) high |= word[i];
	if (high === 0 && word[25] < 32) return (word[25] << 16 | word[26] << 8 | word[27]) * 4294967296 + ((word[28] << 24 | word[29] << 16 | word[30] << 8 | word[31]) >>> 0);
	return bytesToNumber(word, { signed });
}
function decodeAddress$2(cursor) {
	return checksumAddress(bytesToHex(cursor.readBytes(32).subarray(12)));
}
function decodeArray$1(cursor, param, budget, staticPosition) {
	const child = param.child;
	if (param.length === null) {
		const start = staticPosition + readNumber(cursor);
		const startOfData = start + 32;
		cursor.setPosition(start);
		const length = readNumber(cursor);
		let consumed = 0;
		const value = [];
		for (let i = 0; i < length; ++i) {
			cursor.setPosition(startOfData + (child.dynamic ? i * 32 : consumed));
			value.push(decodeParameter$1(cursor, child, budget, startOfData));
			consumed += lastSize;
			if (lastSize === 0) {
				cursor.assertReadLimit();
				cursor._touch();
			}
		}
		cursor.setPosition(staticPosition + 32);
		lastSize = 32;
		return value;
	}
	if (child.dynamic) {
		const start = staticPosition + readNumber(cursor);
		const value = [];
		for (let i = 0; i < param.length; ++i) {
			cursor.setPosition(start + i * 32);
			value.push(decodeParameter$1(cursor, child, budget, start));
		}
		cursor.setPosition(staticPosition + 32);
		lastSize = 32;
		return value;
	}
	let consumed = 0;
	const value = [];
	for (let i = 0; i < param.length; ++i) {
		value.push(decodeParameter$1(cursor, child, budget, staticPosition + consumed));
		consumed += lastSize;
		if (lastSize === 0) {
			cursor.assertReadLimit();
			cursor._touch();
		}
	}
	lastSize = consumed;
	return value;
}
function decodeBool$1(cursor) {
	const value = cursor.readBytes(32);
	let high = 0;
	for (let i = 0; i < 31; i++) high |= value[i];
	if (high === 0 && value[31] <= 1) return value[31] === 1;
	return bytesToBool(value, { size: 32 });
}
function decodeBytes$1(cursor, budget, staticPosition) {
	const offset = readNumber(cursor);
	cursor.setPosition(staticPosition + offset);
	const length = readNumber(cursor);
	if (length === 0) {
		cursor.setPosition(staticPosition + 32);
		return "0x";
	}
	const data = cursor.readBytes(length);
	budget.used += length;
	if (budget.used > budget.limit) throw new AbiDecodingSizeLimitExceededError({ limit: budget.limit });
	cursor.setPosition(staticPosition + 32);
	return bytesToHex(data);
}
function decodeNumber$1(cursor, param) {
	const { signed, size } = param;
	const position = cursor.position;
	const value = cursor.readBytes(32);
	if (!(size > 48)) return wordToNumber(value, signed);
	const view = cursor.dataView;
	const result = view.getBigUint64(position) << 192n | view.getBigUint64(position + 8) << 128n | view.getBigUint64(position + 16) << 64n | view.getBigUint64(position + 24);
	if (signed && value[0] >= 128) return result - (1n << 256n);
	return result;
}
function decodeTuple$1(cursor, param, budget, staticPosition) {
	const { components, unnamed } = param;
	if (!components) {
		readComponents(param.param);
		throw new InvalidAbiDecodingTypeError(param.param.type, { docsPath: "/docs/contract/decodeAbiParameters" });
	}
	const value = unnamed ? [] : {};
	let consumed = 0;
	if (param.dynamic) {
		const start = staticPosition + readNumber(cursor);
		for (let i = 0; i < components.length; ++i) {
			const component = components[i];
			cursor.setPosition(start + consumed);
			const data = decodeParameter$1(cursor, component, budget, start);
			consumed += lastSize;
			value[unnamed ? i : component.param.name] = data;
		}
		cursor.setPosition(staticPosition + 32);
		lastSize = 32;
		return value;
	}
	for (let i = 0; i < components.length; ++i) {
		const component = components[i];
		const data = decodeParameter$1(cursor, component, budget, staticPosition);
		value[unnamed ? i : component.param.name] = data;
		consumed += lastSize;
	}
	lastSize = consumed;
	return value;
}
/** Reads a tuple's components the way decoding does, throwing for malformed ones. */
function readComponents(param) {
	return param.components.length === 0 || param.components.some(({ name }) => !name);
}
function decodeString$1(cursor, budget, staticPosition) {
	const start = staticPosition + readNumber(cursor);
	cursor.setPosition(start);
	const length = readNumber(cursor);
	if (length === 0) {
		cursor.setPosition(staticPosition + 32);
		return "";
	}
	const data = cursor.readBytes(length, 32);
	budget.used += length;
	if (budget.used > budget.limit) throw new AbiDecodingSizeLimitExceededError({ limit: budget.limit });
	const value = (decoder$2 ??= new TextDecoder("utf-8", { ignoreBOM: true })).decode(data);
	cursor.setPosition(staticPosition + 32);
	return value;
}
/**
* Thrown by `decodeAbiParameters` when the decoded `bytes` and `string` values
* of one decode add up to more than 32 times the size of the input data.
*/
var AbiDecodingSizeLimitExceededError = class extends BaseError$3 {
	constructor({ limit }) {
		super(`Decoded \`bytes\` and \`string\` values exceed the size limit of ${limit} bytes.`, { name: "AbiDecodingSizeLimitExceededError" });
	}
};
//#endregion
//#region node_modules/abitype/dist/esm/version.js
var version$2 = "1.2.3";
//#endregion
//#region node_modules/abitype/dist/esm/errors.js
var BaseError$2 = class BaseError$2 extends Error {
	constructor(shortMessage, args = {}) {
		const details = args.cause instanceof BaseError$2 ? args.cause.details : args.cause?.message ? args.cause.message : args.details;
		const docsPath = args.cause instanceof BaseError$2 ? args.cause.docsPath || args.docsPath : args.docsPath;
		const message = [
			shortMessage || "An error occurred.",
			"",
			...args.metaMessages ? [...args.metaMessages, ""] : [],
			...docsPath ? [`Docs: https://abitype.dev${docsPath}`] : [],
			...details ? [`Details: ${details}`] : [],
			`Version: abitype@${version$2}`
		].join("\n");
		super(message);
		Object.defineProperty(this, "details", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0
		});
		Object.defineProperty(this, "docsPath", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0
		});
		Object.defineProperty(this, "metaMessages", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0
		});
		Object.defineProperty(this, "shortMessage", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0
		});
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "AbiTypeError"
		});
		if (args.cause) this.cause = args.cause;
		this.details = details;
		this.docsPath = docsPath;
		this.metaMessages = args.metaMessages;
		this.shortMessage = shortMessage;
	}
};
//#endregion
//#region node_modules/abitype/dist/esm/regex.js
function execTyped(regex, string) {
	return regex.exec(string)?.groups;
}
var bytesRegex$1 = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
var integerRegex$1 = /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
var isTupleRegex = /^\(.+?\).*?$/;
//#endregion
//#region node_modules/abitype/dist/esm/human-readable/formatAbiParameter.js
var tupleRegex = /^tuple(?<array>(\[(\d*)\])*)$/;
/**
* Formats {@link AbiParameter} to human-readable ABI parameter.
*
* @param abiParameter - ABI parameter
* @returns Human-readable ABI parameter
*
* @example
* const result = formatAbiParameter({ type: 'address', name: 'from' })
* //    ^? const result: 'address from'
*/
function formatAbiParameter(abiParameter) {
	let type = abiParameter.type;
	if (tupleRegex.test(abiParameter.type) && "components" in abiParameter) {
		type = "(";
		const length = abiParameter.components.length;
		for (let i = 0; i < length; i++) {
			const component = abiParameter.components[i];
			type += formatAbiParameter(component);
			if (i < length - 1) type += ", ";
		}
		const result = execTyped(tupleRegex, abiParameter.type);
		type += `)${result?.array || ""}`;
		return formatAbiParameter({
			...abiParameter,
			type
		});
	}
	if ("indexed" in abiParameter && abiParameter.indexed) type = `${type} indexed`;
	if (abiParameter.name) return `${type} ${abiParameter.name}`;
	return type;
}
//#endregion
//#region node_modules/abitype/dist/esm/human-readable/formatAbiParameters.js
/**
* Formats {@link AbiParameter}s to human-readable ABI parameters.
*
* @param abiParameters - ABI parameters
* @returns Human-readable ABI parameters
*
* @example
* const result = formatAbiParameters([
*   //  ^? const result: 'address from, uint256 tokenId'
*   { type: 'address', name: 'from' },
*   { type: 'uint256', name: 'tokenId' },
* ])
*/
function formatAbiParameters(abiParameters) {
	let params = "";
	const length = abiParameters.length;
	for (let i = 0; i < length; i++) {
		const abiParameter = abiParameters[i];
		params += formatAbiParameter(abiParameter);
		if (i !== length - 1) params += ", ";
	}
	return params;
}
//#endregion
//#region node_modules/abitype/dist/esm/human-readable/formatAbiItem.js
/**
* Formats ABI item (e.g. error, event, function) into human-readable ABI item
*
* @param abiItem - ABI item
* @returns Human-readable ABI item
*/
function formatAbiItem(abiItem) {
	if (abiItem.type === "function") return `function ${abiItem.name}(${formatAbiParameters(abiItem.inputs)})${abiItem.stateMutability && abiItem.stateMutability !== "nonpayable" ? ` ${abiItem.stateMutability}` : ""}${abiItem.outputs?.length ? ` returns (${formatAbiParameters(abiItem.outputs)})` : ""}`;
	if (abiItem.type === "event") return `event ${abiItem.name}(${formatAbiParameters(abiItem.inputs)})`;
	if (abiItem.type === "error") return `error ${abiItem.name}(${formatAbiParameters(abiItem.inputs)})`;
	if (abiItem.type === "constructor") return `constructor(${formatAbiParameters(abiItem.inputs)})${abiItem.stateMutability === "payable" ? " payable" : ""}`;
	if (abiItem.type === "fallback") return `fallback() external${abiItem.stateMutability === "payable" ? " payable" : ""}`;
	return "receive() external payable";
}
//#endregion
//#region node_modules/abitype/dist/esm/human-readable/runtime/signatures.js
var errorSignatureRegex = /^error (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
function isErrorSignature(signature) {
	return errorSignatureRegex.test(signature);
}
function execErrorSignature(signature) {
	return execTyped(errorSignatureRegex, signature);
}
var eventSignatureRegex = /^event (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
function isEventSignature(signature) {
	return eventSignatureRegex.test(signature);
}
function execEventSignature(signature) {
	return execTyped(eventSignatureRegex, signature);
}
var functionSignatureRegex = /^function (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns\s?\((?<returns>.*?)\))?$/;
function isFunctionSignature(signature) {
	return functionSignatureRegex.test(signature);
}
function execFunctionSignature(signature) {
	return execTyped(functionSignatureRegex, signature);
}
var structSignatureRegex = /^struct (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*) \{(?<properties>.*?)\}$/;
function isStructSignature(signature) {
	return structSignatureRegex.test(signature);
}
function execStructSignature(signature) {
	return execTyped(structSignatureRegex, signature);
}
var constructorSignatureRegex = /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
function isConstructorSignature(signature) {
	return constructorSignatureRegex.test(signature);
}
function execConstructorSignature(signature) {
	return execTyped(constructorSignatureRegex, signature);
}
var fallbackSignatureRegex = /^fallback\(\) external(?:\s(?<stateMutability>payable{1}))?$/;
function isFallbackSignature(signature) {
	return fallbackSignatureRegex.test(signature);
}
function execFallbackSignature(signature) {
	return execTyped(fallbackSignatureRegex, signature);
}
var receiveSignatureRegex = /^receive\(\) external payable$/;
function isReceiveSignature(signature) {
	return receiveSignatureRegex.test(signature);
}
var modifiers = /* @__PURE__ */ new Set([
	"memory",
	"indexed",
	"storage",
	"calldata"
]);
var eventModifiers = /* @__PURE__ */ new Set(["indexed"]);
var functionModifiers = /* @__PURE__ */ new Set([
	"calldata",
	"memory",
	"storage"
]);
//#endregion
//#region node_modules/abitype/dist/esm/human-readable/errors/abiItem.js
var InvalidAbiItemError = class extends BaseError$2 {
	constructor({ signature }) {
		super("Failed to parse ABI item.", {
			details: `parseAbiItem(${JSON.stringify(signature, null, 2)})`,
			docsPath: "/api/human#parseabiitem-1"
		});
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "InvalidAbiItemError"
		});
	}
};
var UnknownTypeError = class extends BaseError$2 {
	constructor({ type }) {
		super("Unknown type.", { metaMessages: [`Type "${type}" is not a valid ABI type. Perhaps you forgot to include a struct signature?`] });
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "UnknownTypeError"
		});
	}
};
var UnknownSolidityTypeError = class extends BaseError$2 {
	constructor({ type }) {
		super("Unknown type.", { metaMessages: [`Type "${type}" is not a valid ABI type.`] });
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "UnknownSolidityTypeError"
		});
	}
};
//#endregion
//#region node_modules/abitype/dist/esm/human-readable/errors/abiParameter.js
var InvalidAbiParametersError = class extends BaseError$2 {
	constructor({ params }) {
		super("Failed to parse ABI parameters.", {
			details: `parseAbiParameters(${JSON.stringify(params, null, 2)})`,
			docsPath: "/api/human#parseabiparameters-1"
		});
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "InvalidAbiParametersError"
		});
	}
};
var InvalidParameterError = class extends BaseError$2 {
	constructor({ param }) {
		super("Invalid ABI parameter.", { details: param });
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "InvalidParameterError"
		});
	}
};
var SolidityProtectedKeywordError = class extends BaseError$2 {
	constructor({ param, name }) {
		super("Invalid ABI parameter.", {
			details: param,
			metaMessages: [`"${name}" is a protected Solidity keyword. More info: https://docs.soliditylang.org/en/latest/cheatsheet.html`]
		});
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "SolidityProtectedKeywordError"
		});
	}
};
var InvalidModifierError = class extends BaseError$2 {
	constructor({ param, type, modifier }) {
		super("Invalid ABI parameter.", {
			details: param,
			metaMessages: [`Modifier "${modifier}" not allowed${type ? ` in "${type}" type` : ""}.`]
		});
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "InvalidModifierError"
		});
	}
};
var InvalidFunctionModifierError = class extends BaseError$2 {
	constructor({ param, type, modifier }) {
		super("Invalid ABI parameter.", {
			details: param,
			metaMessages: [`Modifier "${modifier}" not allowed${type ? ` in "${type}" type` : ""}.`, `Data location can only be specified for array, struct, or mapping types, but "${modifier}" was given.`]
		});
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "InvalidFunctionModifierError"
		});
	}
};
var InvalidAbiTypeParameterError = class extends BaseError$2 {
	constructor({ abiParameter }) {
		super("Invalid ABI parameter.", {
			details: JSON.stringify(abiParameter, null, 2),
			metaMessages: ["ABI parameter type is invalid."]
		});
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "InvalidAbiTypeParameterError"
		});
	}
};
//#endregion
//#region node_modules/abitype/dist/esm/human-readable/errors/signature.js
var InvalidSignatureError = class extends BaseError$2 {
	constructor({ signature, type }) {
		super(`Invalid ${type} signature.`, { details: signature });
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "InvalidSignatureError"
		});
	}
};
var UnknownSignatureError = class extends BaseError$2 {
	constructor({ signature }) {
		super("Unknown signature.", { details: signature });
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "UnknownSignatureError"
		});
	}
};
var InvalidStructSignatureError = class extends BaseError$2 {
	constructor({ signature }) {
		super("Invalid struct signature.", {
			details: signature,
			metaMessages: ["No properties exist."]
		});
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "InvalidStructSignatureError"
		});
	}
};
//#endregion
//#region node_modules/abitype/dist/esm/human-readable/errors/struct.js
var CircularReferenceError = class extends BaseError$2 {
	constructor({ type }) {
		super("Circular reference detected.", { metaMessages: [`Struct "${type}" is a circular reference.`] });
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "CircularReferenceError"
		});
	}
};
//#endregion
//#region node_modules/abitype/dist/esm/human-readable/errors/splitParameters.js
var InvalidParenthesisError = class extends BaseError$2 {
	constructor({ current, depth }) {
		super("Unbalanced parentheses.", {
			metaMessages: [`"${current.trim()}" has too many ${depth > 0 ? "opening" : "closing"} parentheses.`],
			details: `Depth "${depth}"`
		});
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "InvalidParenthesisError"
		});
	}
};
//#endregion
//#region node_modules/abitype/dist/esm/human-readable/runtime/cache.js
/**
* Gets {@link parameterCache} cache key namespaced by {@link type} and {@link structs}. This prevents parameters from being accessible to types that don't allow them (e.g. `string indexed foo` not allowed outside of `type: 'event'`) and ensures different struct definitions with the same name are cached separately.
* @param param ABI parameter string
* @param type ABI parameter type
* @param structs Struct definitions to include in cache key
* @returns Cache key for {@link parameterCache}
*/
function getParameterCacheKey(param, type, structs) {
	let structKey = "";
	if (structs) for (const struct of Object.entries(structs)) {
		if (!struct) continue;
		let propertyKey = "";
		for (const property of struct[1]) propertyKey += `[${property.type}${property.name ? `:${property.name}` : ""}]`;
		structKey += `(${struct[0]}{${propertyKey}})`;
	}
	if (type) return `${type}:${param}${structKey}`;
	return `${param}${structKey}`;
}
/**
* Basic cache seeded with common ABI parameter strings.
*
* **Note: When seeding more parameters, make sure you benchmark performance. The current number is the ideal balance between performance and having an already existing cache.**
*/
var parameterCache = /* @__PURE__ */ new Map([
	["address", { type: "address" }],
	["bool", { type: "bool" }],
	["bytes", { type: "bytes" }],
	["bytes32", { type: "bytes32" }],
	["int", { type: "int256" }],
	["int256", { type: "int256" }],
	["string", { type: "string" }],
	["uint", { type: "uint256" }],
	["uint8", { type: "uint8" }],
	["uint16", { type: "uint16" }],
	["uint24", { type: "uint24" }],
	["uint32", { type: "uint32" }],
	["uint64", { type: "uint64" }],
	["uint96", { type: "uint96" }],
	["uint112", { type: "uint112" }],
	["uint160", { type: "uint160" }],
	["uint192", { type: "uint192" }],
	["uint256", { type: "uint256" }],
	["address owner", {
		type: "address",
		name: "owner"
	}],
	["address to", {
		type: "address",
		name: "to"
	}],
	["bool approved", {
		type: "bool",
		name: "approved"
	}],
	["bytes _data", {
		type: "bytes",
		name: "_data"
	}],
	["bytes data", {
		type: "bytes",
		name: "data"
	}],
	["bytes signature", {
		type: "bytes",
		name: "signature"
	}],
	["bytes32 hash", {
		type: "bytes32",
		name: "hash"
	}],
	["bytes32 r", {
		type: "bytes32",
		name: "r"
	}],
	["bytes32 root", {
		type: "bytes32",
		name: "root"
	}],
	["bytes32 s", {
		type: "bytes32",
		name: "s"
	}],
	["string name", {
		type: "string",
		name: "name"
	}],
	["string symbol", {
		type: "string",
		name: "symbol"
	}],
	["string tokenURI", {
		type: "string",
		name: "tokenURI"
	}],
	["uint tokenId", {
		type: "uint256",
		name: "tokenId"
	}],
	["uint8 v", {
		type: "uint8",
		name: "v"
	}],
	["uint256 balance", {
		type: "uint256",
		name: "balance"
	}],
	["uint256 tokenId", {
		type: "uint256",
		name: "tokenId"
	}],
	["uint256 value", {
		type: "uint256",
		name: "value"
	}],
	["event:address indexed from", {
		type: "address",
		name: "from",
		indexed: true
	}],
	["event:address indexed to", {
		type: "address",
		name: "to",
		indexed: true
	}],
	["event:uint indexed tokenId", {
		type: "uint256",
		name: "tokenId",
		indexed: true
	}],
	["event:uint256 indexed tokenId", {
		type: "uint256",
		name: "tokenId",
		indexed: true
	}]
]);
//#endregion
//#region node_modules/abitype/dist/esm/human-readable/runtime/utils.js
function parseSignature(signature, structs = {}) {
	if (isFunctionSignature(signature)) return parseFunctionSignature(signature, structs);
	if (isEventSignature(signature)) return parseEventSignature(signature, structs);
	if (isErrorSignature(signature)) return parseErrorSignature(signature, structs);
	if (isConstructorSignature(signature)) return parseConstructorSignature(signature, structs);
	if (isFallbackSignature(signature)) return parseFallbackSignature(signature);
	if (isReceiveSignature(signature)) return {
		type: "receive",
		stateMutability: "payable"
	};
	throw new UnknownSignatureError({ signature });
}
function parseFunctionSignature(signature, structs = {}) {
	const match = execFunctionSignature(signature);
	if (!match) throw new InvalidSignatureError({
		signature,
		type: "function"
	});
	const inputParams = splitParameters(match.parameters);
	const inputs = [];
	const inputLength = inputParams.length;
	for (let i = 0; i < inputLength; i++) inputs.push(parseAbiParameter(inputParams[i], {
		modifiers: functionModifiers,
		structs,
		type: "function"
	}));
	const outputs = [];
	if (match.returns) {
		const outputParams = splitParameters(match.returns);
		const outputLength = outputParams.length;
		for (let i = 0; i < outputLength; i++) outputs.push(parseAbiParameter(outputParams[i], {
			modifiers: functionModifiers,
			structs,
			type: "function"
		}));
	}
	return {
		name: match.name,
		type: "function",
		stateMutability: match.stateMutability ?? "nonpayable",
		inputs,
		outputs
	};
}
function parseEventSignature(signature, structs = {}) {
	const match = execEventSignature(signature);
	if (!match) throw new InvalidSignatureError({
		signature,
		type: "event"
	});
	const params = splitParameters(match.parameters);
	const abiParameters = [];
	const length = params.length;
	for (let i = 0; i < length; i++) abiParameters.push(parseAbiParameter(params[i], {
		modifiers: eventModifiers,
		structs,
		type: "event"
	}));
	return {
		name: match.name,
		type: "event",
		inputs: abiParameters
	};
}
function parseErrorSignature(signature, structs = {}) {
	const match = execErrorSignature(signature);
	if (!match) throw new InvalidSignatureError({
		signature,
		type: "error"
	});
	const params = splitParameters(match.parameters);
	const abiParameters = [];
	const length = params.length;
	for (let i = 0; i < length; i++) abiParameters.push(parseAbiParameter(params[i], {
		structs,
		type: "error"
	}));
	return {
		name: match.name,
		type: "error",
		inputs: abiParameters
	};
}
function parseConstructorSignature(signature, structs = {}) {
	const match = execConstructorSignature(signature);
	if (!match) throw new InvalidSignatureError({
		signature,
		type: "constructor"
	});
	const params = splitParameters(match.parameters);
	const abiParameters = [];
	const length = params.length;
	for (let i = 0; i < length; i++) abiParameters.push(parseAbiParameter(params[i], {
		structs,
		type: "constructor"
	}));
	return {
		type: "constructor",
		stateMutability: match.stateMutability ?? "nonpayable",
		inputs: abiParameters
	};
}
function parseFallbackSignature(signature) {
	const match = execFallbackSignature(signature);
	if (!match) throw new InvalidSignatureError({
		signature,
		type: "fallback"
	});
	return {
		type: "fallback",
		stateMutability: match.stateMutability ?? "nonpayable"
	};
}
var abiParameterWithoutTupleRegex = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*(?:\spayable)?)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/;
var abiParameterWithTupleRegex = /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/;
var dynamicIntegerRegex = /^u?int$/;
function parseAbiParameter(param, options) {
	const parameterCacheKey = getParameterCacheKey(param, options?.type, options?.structs);
	if (parameterCache.has(parameterCacheKey)) return parameterCache.get(parameterCacheKey);
	const isTuple = isTupleRegex.test(param);
	const match = execTyped(isTuple ? abiParameterWithTupleRegex : abiParameterWithoutTupleRegex, param);
	if (!match) throw new InvalidParameterError({ param });
	if (match.name && isSolidityKeyword(match.name)) throw new SolidityProtectedKeywordError({
		param,
		name: match.name
	});
	const name = match.name ? { name: match.name } : {};
	const indexed = match.modifier === "indexed" ? { indexed: true } : {};
	const structs = options?.structs ?? {};
	let type;
	let components = {};
	if (isTuple) {
		type = "tuple";
		const params = splitParameters(match.type);
		const components_ = [];
		const length = params.length;
		for (let i = 0; i < length; i++) components_.push(parseAbiParameter(params[i], { structs }));
		components = { components: components_ };
	} else if (match.type in structs) {
		type = "tuple";
		components = { components: structs[match.type] };
	} else if (dynamicIntegerRegex.test(match.type)) type = `${match.type}256`;
	else if (match.type === "address payable") type = "address";
	else {
		type = match.type;
		if (!(options?.type === "struct") && !isSolidityType$1(type)) throw new UnknownSolidityTypeError({ type });
	}
	if (match.modifier) {
		if (!options?.modifiers?.has?.(match.modifier)) throw new InvalidModifierError({
			param,
			type: options?.type,
			modifier: match.modifier
		});
		if (functionModifiers.has(match.modifier) && !isValidDataLocation(type, !!match.array)) throw new InvalidFunctionModifierError({
			param,
			type: options?.type,
			modifier: match.modifier
		});
	}
	const abiParameter = {
		type: `${type}${match.array ?? ""}`,
		...name,
		...indexed,
		...components
	};
	parameterCache.set(parameterCacheKey, abiParameter);
	return abiParameter;
}
function splitParameters(params, result = [], current = "", depth = 0) {
	const length = params.trim().length;
	for (let i = 0; i < length; i++) {
		const char = params[i];
		const tail = params.slice(i + 1);
		switch (char) {
			case ",": return depth === 0 ? splitParameters(tail, [...result, current.trim()]) : splitParameters(tail, result, `${current}${char}`, depth);
			case "(": return splitParameters(tail, result, `${current}${char}`, depth + 1);
			case ")": return splitParameters(tail, result, `${current}${char}`, depth - 1);
			default: return splitParameters(tail, result, `${current}${char}`, depth);
		}
	}
	if (current === "") return result;
	if (depth !== 0) throw new InvalidParenthesisError({
		current,
		depth
	});
	result.push(current.trim());
	return result;
}
function isSolidityType$1(type) {
	return type === "address" || type === "bool" || type === "function" || type === "string" || bytesRegex$1.test(type) || integerRegex$1.test(type);
}
var protectedKeywordsRegex = /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
/** @internal */
function isSolidityKeyword(name) {
	return name === "address" || name === "bool" || name === "function" || name === "string" || name === "tuple" || bytesRegex$1.test(name) || integerRegex$1.test(name) || protectedKeywordsRegex.test(name);
}
/** @internal */
function isValidDataLocation(type, isArray) {
	return isArray || type === "bytes" || type === "string" || type === "tuple";
}
//#endregion
//#region node_modules/abitype/dist/esm/human-readable/runtime/structs.js
function parseStructs(signatures) {
	const shallowStructs = {};
	const signaturesLength = signatures.length;
	for (let i = 0; i < signaturesLength; i++) {
		const signature = signatures[i];
		if (!isStructSignature(signature)) continue;
		const match = execStructSignature(signature);
		if (!match) throw new InvalidSignatureError({
			signature,
			type: "struct"
		});
		const properties = match.properties.split(";");
		const components = [];
		const propertiesLength = properties.length;
		for (let k = 0; k < propertiesLength; k++) {
			const trimmed = properties[k].trim();
			if (!trimmed) continue;
			const abiParameter = parseAbiParameter(trimmed, { type: "struct" });
			components.push(abiParameter);
		}
		if (!components.length) throw new InvalidStructSignatureError({ signature });
		shallowStructs[match.name] = components;
	}
	const resolvedStructs = {};
	const entries = Object.entries(shallowStructs);
	const entriesLength = entries.length;
	for (let i = 0; i < entriesLength; i++) {
		const [name, parameters] = entries[i];
		resolvedStructs[name] = resolveStructs(parameters, shallowStructs);
	}
	return resolvedStructs;
}
var typeWithoutTupleRegex = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/;
function resolveStructs(abiParameters = [], structs = {}, ancestors = /* @__PURE__ */ new Set()) {
	const components = [];
	const length = abiParameters.length;
	for (let i = 0; i < length; i++) {
		const abiParameter = abiParameters[i];
		if (isTupleRegex.test(abiParameter.type)) components.push(abiParameter);
		else {
			const match = execTyped(typeWithoutTupleRegex, abiParameter.type);
			if (!match?.type) throw new InvalidAbiTypeParameterError({ abiParameter });
			const { array, type } = match;
			if (type in structs) {
				if (ancestors.has(type)) throw new CircularReferenceError({ type });
				components.push({
					...abiParameter,
					type: `tuple${array ?? ""}`,
					components: resolveStructs(structs[type], structs, /* @__PURE__ */ new Set([...ancestors, type]))
				});
			} else if (isSolidityType$1(type)) components.push(abiParameter);
			else throw new UnknownTypeError({ type });
		}
	}
	return components;
}
//#endregion
//#region node_modules/abitype/dist/esm/human-readable/parseAbiItem.js
/**
* Parses human-readable ABI item (e.g. error, event, function) into {@link Abi} item
*
* @param signature - Human-readable ABI item
* @returns Parsed {@link Abi} item
*
* @example
* const abiItem = parseAbiItem('function balanceOf(address owner) view returns (uint256)')
* //    ^? const abiItem: { name: "balanceOf"; type: "function"; stateMutability: "view";...
*
* @example
* const abiItem = parseAbiItem([
*   //  ^? const abiItem: { name: "foo"; type: "function"; stateMutability: "view"; inputs:...
*   'function foo(Baz bar) view returns (string)',
*   'struct Baz { string name; }',
* ])
*/
function parseAbiItem(signature) {
	let abiItem;
	if (typeof signature === "string") abiItem = parseSignature(signature);
	else {
		const structs = parseStructs(signature);
		const length = signature.length;
		for (let i = 0; i < length; i++) {
			const signature_ = signature[i];
			if (isStructSignature(signature_)) continue;
			abiItem = parseSignature(signature_, structs);
			break;
		}
	}
	if (!abiItem) throw new InvalidAbiItemError({ signature });
	return abiItem;
}
//#endregion
//#region node_modules/abitype/dist/esm/human-readable/parseAbiParameters.js
/**
* Parses human-readable ABI parameters into {@link AbiParameter}s
*
* @param params - Human-readable ABI parameters
* @returns Parsed {@link AbiParameter}s
*
* @example
* const abiParameters = parseAbiParameters('address from, address to, uint256 amount')
* //    ^? const abiParameters: [{ type: "address"; name: "from"; }, { type: "address";...
*
* @example
* const abiParameters = parseAbiParameters([
*   //  ^? const abiParameters: [{ type: "tuple"; components: [{ type: "string"; name:...
*   'Baz bar',
*   'struct Baz { string name; }',
* ])
*/
function parseAbiParameters(params) {
	const abiParameters = [];
	if (typeof params === "string") {
		const parameters = splitParameters(params);
		const length = parameters.length;
		for (let i = 0; i < length; i++) abiParameters.push(parseAbiParameter(parameters[i], { modifiers }));
	} else {
		const structs = parseStructs(params);
		const length = params.length;
		for (let i = 0; i < length; i++) {
			const signature = params[i];
			if (isStructSignature(signature)) continue;
			const parameters = splitParameters(signature);
			const length = parameters.length;
			for (let k = 0; k < length; k++) abiParameters.push(parseAbiParameter(parameters[k], {
				modifiers,
				structs
			}));
		}
	}
	if (abiParameters.length === 0) throw new InvalidAbiParametersError({ params });
	return abiParameters;
}
//#endregion
//#region node_modules/viem/_esm/utils/hash/hashSignature.js
var hash = (value) => keccak256$1(toBytes$1(value));
function hashSignature(sig) {
	return hash(sig);
}
//#endregion
//#region node_modules/viem/_esm/utils/hash/normalizeSignature.js
function normalizeSignature$1(signature) {
	let active = true;
	let current = "";
	let level = 0;
	let result = "";
	let valid = false;
	for (let i = 0; i < signature.length; i++) {
		const char = signature[i];
		if (char === "(" || char === ")" || char === ",") active = true;
		if (char === "(") level++;
		if (char === ")") level--;
		if (!active) continue;
		if (level === 0) {
			if (char === " " && (result === "event" || result === "function" || result === "error" || result === "")) result = "";
			else {
				result += char;
				if (char === ")") {
					valid = true;
					break;
				}
			}
			continue;
		}
		if (char === " ") {
			if (!current.endsWith(",") && !current.endsWith("(")) {
				current = "";
				active = false;
			}
			continue;
		}
		result += char;
		current += char;
	}
	if (!valid) throw new BaseError$3("Unable to normalize signature.");
	return result;
}
//#endregion
//#region node_modules/viem/_esm/utils/hash/toSignature.js
/**
* Returns the signature for a given function, event, or error definition.
*
* @example
* const signature = toSignature('function ownerOf(uint256 tokenId)')
* // 'ownerOf(uint256)'
*
* @example
* const signature_3 = toSignature({
*   name: 'ownerOf',
*   type: 'function',
*   inputs: [{ name: 'tokenId', type: 'uint256' }],
*   outputs: [],
*   stateMutability: 'view',
* })
* // 'ownerOf(uint256)'
*/
var toSignature = (def) => {
	return normalizeSignature$1((() => {
		if (typeof def === "string") return def;
		return formatAbiItem(def);
	})());
};
//#endregion
//#region node_modules/viem/_esm/utils/hash/toSignatureHash.js
/** Signature hashes keyed by their definition, since hashing is costly. */
var signatureHashCache = /*#__PURE__*/ new LruMap$1(8192);
/**
* Returns the hash (of the function/event/error signature) for a given function, event, or error definition.
*/
function toSignatureHash(fn) {
	const definition = typeof fn === "string" ? fn : formatAbiItem(fn);
	const cached = signatureHashCache.get(definition);
	if (cached) return cached;
	const hash = hashSignature(toSignature(definition));
	signatureHashCache.set(definition, hash);
	return hash;
}
//#endregion
//#region node_modules/viem/_esm/utils/hash/toEventSelector.js
/**
* Returns the event selector for a given event definition.
*
* @example
* const selector = toEventSelector('Transfer(address indexed from, address indexed to, uint256 amount)')
* // 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
*/
var toEventSelector = toSignatureHash;
//#endregion
//#region node_modules/viem/_esm/utils/data/slice.js
/**
* @description Returns a section of the hex or byte array given a start/end bytes offset.
*
* @param value The hex or byte array to slice.
* @param start The start offset (in bytes).
* @param end The end offset (in bytes).
*/
function slice$2(value, start, end, { strict } = {}) {
	if (isHex(value, { strict: false })) return sliceHex(value, start, end, { strict });
	return sliceBytes(value, start, end, { strict });
}
function assertStartOffset$2(value, start) {
	if (typeof start === "number" && start > 0 && start > size$4(value) - 1) throw new SliceOffsetOutOfBoundsError$2({
		offset: start,
		position: "start",
		size: size$4(value)
	});
}
function assertEndOffset$2(value, start, end) {
	if (typeof start === "number" && typeof end === "number" && size$4(value) !== end - start) throw new SliceOffsetOutOfBoundsError$2({
		offset: end,
		position: "end",
		size: size$4(value)
	});
}
/**
* @description Returns a section of the byte array given a start/end bytes offset.
*
* @param value The byte array to slice.
* @param start The start offset (in bytes).
* @param end The end offset (in bytes).
*/
function sliceBytes(value_, start, end, { strict } = {}) {
	assertStartOffset$2(value_, start);
	const value = value_.slice(start, end);
	if (strict) assertEndOffset$2(value, start, end);
	return value;
}
/**
* @description Returns a section of the hex value given a start/end bytes offset.
*
* @param value The hex value to slice.
* @param start The start offset (in bytes).
* @param end The end offset (in bytes).
*/
function sliceHex(value_, start, end, { strict } = {}) {
	assertStartOffset$2(value_, start);
	const value = `0x${(value_.startsWith("0x") ? value_.slice(2) : value_.replace("0x", "")).slice((start ?? 0) * 2, (end ?? value_.length) * 2)}`;
	if (strict) assertEndOffset$2(value, start, end);
	return value;
}
//#endregion
//#region node_modules/viem/_esm/utils/hash/toFunctionSelector.js
/**
* Returns the function selector for a given function definition.
*
* @example
* const selector = toFunctionSelector('function ownerOf(uint256 tokenId)')
* // 0x6352211e
*/
var toFunctionSelector = (fn) => slice$2(toSignatureHash(fn), 0, 4);
//#endregion
//#region node_modules/viem/_esm/utils/abi/getAbiItem.js
function getAbiItem(parameters) {
	const { abi, args = [], name } = parameters;
	const isSelector = isHex(name, { strict: false });
	const abiItems = abi.filter((abiItem) => {
		if (isSelector) {
			if (abiItem.type === "function") return toFunctionSelector(abiItem) === name;
			if (abiItem.type === "event") return toEventSelector(abiItem) === name;
			return false;
		}
		return "name" in abiItem && abiItem.name === name;
	});
	if (abiItems.length === 0) return void 0;
	if (abiItems.length === 1) return abiItems[0];
	let matchedAbiItem;
	for (const abiItem of abiItems) {
		if (!("inputs" in abiItem)) continue;
		if (!args || args.length === 0) {
			if (!abiItem.inputs || abiItem.inputs.length === 0) return abiItem;
			continue;
		}
		if (!abiItem.inputs) continue;
		if (abiItem.inputs.length === 0) continue;
		if (abiItem.inputs.length !== args.length) continue;
		if (args.every((arg, index) => {
			const abiParameter = "inputs" in abiItem && abiItem.inputs[index];
			if (!abiParameter) return false;
			return isArgOfType$1(arg, abiParameter);
		})) {
			if (matchedAbiItem && "inputs" in matchedAbiItem && matchedAbiItem.inputs) {
				const ambiguousTypes = getAmbiguousTypes$1(abiItem.inputs, matchedAbiItem.inputs, args);
				if (ambiguousTypes) throw new AbiItemAmbiguityError({
					abiItem,
					type: ambiguousTypes[0]
				}, {
					abiItem: matchedAbiItem,
					type: ambiguousTypes[1]
				});
			}
			matchedAbiItem = abiItem;
		}
	}
	if (matchedAbiItem) return matchedAbiItem;
	return abiItems[0];
}
/** @internal */
function isArgOfType$1(arg, abiParameter) {
	const argType = typeof arg;
	const abiParameterType = abiParameter.type;
	switch (abiParameterType) {
		case "address": return isAddress(arg, { strict: false });
		case "bool": return argType === "boolean";
		case "function": return argType === "string";
		case "string": return argType === "string";
		default: {
			if (abiParameterType === "tuple" && "components" in abiParameter) return Object.values(abiParameter.components).every((component, index) => {
				return argType === "object" && isArgOfType$1(getComponentValue$1(arg, component, index), component);
			});
			if (/^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(abiParameterType)) {
				if (typeof arg !== "bigint" && typeof arg !== "number") return false;
				if (typeof arg === "number" && !Number.isInteger(arg)) return false;
				const signed = abiParameterType.startsWith("int");
				const bits = Number.parseInt(abiParameterType.replace(/^u?int/, "") || "256", 10);
				const max = 2n ** (BigInt(bits) - (signed ? 1n : 0n)) - 1n;
				return arg >= (signed ? -max - 1n : 0n) && arg <= max;
			}
			if (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(abiParameterType)) {
				if (typeof arg !== "string" && !(arg instanceof Uint8Array)) return false;
				const bytes = abiParameterType.slice(5);
				if (!bytes) return arg instanceof Uint8Array || isHex(arg);
				if (typeof arg === "string" && !isHex(arg)) return false;
				return size$4(arg) === Number.parseInt(bytes, 10);
			}
			const arrayComponents = getArrayComponents$1(abiParameterType);
			if (arrayComponents) {
				const [length, type] = arrayComponents;
				return Array.isArray(arg) && (length === null || arg.length === length) && arg.every((x) => isArgOfType$1(x, {
					...abiParameter,
					type
				}));
			}
			return false;
		}
	}
}
/** @internal */
function getAmbiguousTypes$1(sourceParameters, targetParameters, args) {
	for (const parameterIndex in sourceParameters) {
		const sourceParameter = sourceParameters[parameterIndex];
		const targetParameter = targetParameters[parameterIndex];
		if (!targetParameter) continue;
		if (sourceParameter.type === "tuple" && targetParameter.type === "tuple" && "components" in sourceParameter && "components" in targetParameter) {
			const value = args[parameterIndex];
			const types = getAmbiguousTypes$1(sourceParameter.components, targetParameter.components, sourceParameter.components.map((component, index) => getComponentValue$1(value, component, index)));
			if (types) return types;
			continue;
		}
		const sourceArray = getArrayComponents$1(sourceParameter.type);
		const targetArray = getArrayComponents$1(targetParameter.type);
		if (sourceArray && targetArray) {
			const types = getAmbiguousTypes$1([{
				...sourceParameter,
				type: sourceArray[1]
			}], [{
				...targetParameter,
				type: targetArray[1]
			}], [args[parameterIndex]?.[0]]);
			if (types) return types;
			if (sourceArray[1] === targetArray[1] && sourceParameter.type !== targetParameter.type) return [sourceParameter.type, targetParameter.type];
			continue;
		}
		const types = [sourceParameter.type, targetParameter.type];
		const value = args[parameterIndex];
		if ((() => {
			if (types.includes("address") && (types.includes("string") || types.includes("bytes"))) return value === void 0 || isAddress(value, { strict: false });
			if (sourceParameter.type !== targetParameter.type) return true;
			return false;
		})()) return types;
	}
}
/** Reads a tuple component's value by index from arrays and by name from objects, like `encodeAbiParameters`. */
function getComponentValue$1(arg, component, index) {
	if (Array.isArray(arg)) return arg[index];
	return arg?.[component.name];
}
//#endregion
//#region node_modules/viem/_esm/utils/abi/decodeFunctionResult.js
var docsPath$6 = "/docs/contract/decodeFunctionResult";
function decodeFunctionResult(parameters) {
	const { abi, args, functionName, data } = parameters;
	let abiItem = abi[0];
	if (functionName) {
		const item = getAbiItem({
			abi,
			args,
			name: functionName
		});
		if (!item) throw new AbiFunctionNotFoundError(functionName, { docsPath: docsPath$6 });
		abiItem = item;
	}
	if (abiItem.type !== "function") throw new AbiFunctionNotFoundError(void 0, { docsPath: docsPath$6 });
	if (!abiItem.outputs) throw new AbiFunctionOutputsNotFoundError(abiItem.name, { docsPath: docsPath$6 });
	const values = decodeAbiParameters(abiItem.outputs, data);
	if (values && values.length > 1) return values;
	if (values && values.length === 1) return values[0];
}
//#endregion
//#region node_modules/viem/_esm/utils/abi/prepareEncodeFunctionData.js
var docsPath$5 = "/docs/contract/encodeFunctionData";
/** Selectors by function signature, so repeated calls skip hashing. */
var selectors = /*#__PURE__*/ new LruMap$1(1024);
function prepareEncodeFunctionData(parameters) {
	const { abi, args, functionName } = parameters;
	let abiItem = abi[0];
	if (functionName) {
		const item = getAbiItem({
			abi,
			args,
			name: functionName
		});
		if (!item) throw new AbiFunctionNotFoundError(functionName, { docsPath: docsPath$5 });
		abiItem = item;
	}
	if (abiItem.type !== "function") throw new AbiFunctionNotFoundError(void 0, { docsPath: docsPath$5 });
	const signature = formatAbiItem$1(abiItem);
	let selector = selectors.get(signature);
	if (!selector) {
		selector = toFunctionSelector(signature);
		selectors.set(signature, selector);
	}
	return {
		abi: [abiItem],
		functionName: selector
	};
}
//#endregion
//#region node_modules/viem/_esm/utils/abi/encodeFunctionData.js
function encodeFunctionData(parameters) {
	const { args } = parameters;
	const { abi, functionName } = (() => {
		if (parameters.abi.length === 1 && parameters.functionName?.startsWith("0x")) return parameters;
		return prepareEncodeFunctionData(parameters);
	})();
	const abiItem = abi[0];
	const signature = functionName;
	if (!("inputs" in abiItem && abiItem.inputs)) return signature;
	return `${signature}${encodeAbiParameters(abiItem.inputs, args ?? []).slice(2)}`;
}
//#endregion
//#region node_modules/viem/_esm/errors/chain.js
var ChainDoesNotSupportContract = class extends BaseError$3 {
	constructor({ blockNumber, chain, contract }) {
		super(`Chain "${chain.name}" does not support contract "${contract.name}".`, {
			metaMessages: ["This could be due to any of the following:", ...blockNumber !== void 0 && contract.blockCreated !== void 0 && contract.blockCreated > blockNumber ? [`- The contract "${contract.name}" was not deployed until block ${contract.blockCreated} (current block ${blockNumber}).`] : [`- The chain does not have the contract "${contract.name}" configured.`]],
			name: "ChainDoesNotSupportContract"
		});
	}
};
var ChainMismatchError = class extends BaseError$3 {
	constructor({ chain, currentChainId }) {
		super(`The current chain of the wallet (id: ${currentChainId}) does not match the target chain for the transaction (id: ${chain.id} – ${chain.name}).`, {
			metaMessages: [`Current Chain ID:  ${currentChainId}`, `Expected Chain ID: ${chain.id} – ${chain.name}`],
			name: "ChainMismatchError"
		});
	}
};
var ChainNotFoundError = class extends BaseError$3 {
	constructor() {
		super(["No chain was provided to the request.", "Please provide a chain with the `chain` argument on the Action, or by supplying a `chain` to WalletClient."].join("\n"), { name: "ChainNotFoundError" });
	}
};
var ClientChainNotConfiguredError = class extends BaseError$3 {
	constructor() {
		super("No chain was provided to the Client.", { name: "ClientChainNotConfiguredError" });
	}
};
//#endregion
//#region node_modules/viem/_esm/utils/chain/getChainContractAddress.js
function getChainContractAddress({ blockNumber, chain, contract: name }) {
	const contract = chain?.contracts?.[name];
	if (!contract) throw new ChainDoesNotSupportContract({
		chain,
		contract: { name }
	});
	if (blockNumber !== void 0 && contract.blockCreated !== void 0 && contract.blockCreated > blockNumber) throw new ChainDoesNotSupportContract({
		blockNumber,
		chain,
		contract: {
			name,
			blockCreated: contract.blockCreated
		}
	});
	return contract.address;
}
//#endregion
//#region node_modules/viem/_esm/accounts/utils/parseAccount.js
function parseAccount(account) {
	if (typeof account === "string") return {
		address: account,
		type: "json-rpc"
	};
	return account;
}
//#endregion
//#region node_modules/viem/_esm/constants/solidity.js
var panicReasons = {
	1: "An `assert` condition failed.",
	17: "Arithmetic operation resulted in underflow or overflow.",
	18: "Division or modulo by zero (e.g. `5 / 0` or `23 % 0`).",
	33: "Attempted to convert to an invalid type.",
	34: "Attempted to access a storage byte array that is incorrectly encoded.",
	49: "Performed `.pop()` on an empty array",
	50: "Array index is out of bounds.",
	65: "Allocated too much memory or created an array which is too large.",
	81: "Attempted to call a zero-initialized variable of internal function type."
};
var solidityError = {
	inputs: [{
		name: "message",
		type: "string"
	}],
	name: "Error",
	type: "error"
};
var solidityPanic = {
	inputs: [{
		name: "reason",
		type: "uint256"
	}],
	name: "Panic",
	type: "error"
};
//#endregion
//#region node_modules/viem/_esm/utils/abi/decodeErrorResult.js
function decodeErrorResult(parameters) {
	const { abi, data, cause } = parameters;
	const signature = slice$2(data, 0, 4);
	if (signature === "0x") throw new AbiDecodingZeroDataError({ cause });
	const abiItem = [
		...abi || [],
		solidityError,
		solidityPanic
	].find((x) => x.type === "error" && signature === toFunctionSelector(formatAbiItem$1(x)));
	if (!abiItem) throw new AbiErrorSignatureNotFoundError(signature, {
		docsPath: "/docs/contract/decodeErrorResult",
		cause
	});
	return {
		abiItem,
		args: "inputs" in abiItem && abiItem.inputs && abiItem.inputs.length > 0 ? decodeAbiParameters(abiItem.inputs, slice$2(data, 4)) : void 0,
		errorName: abiItem.name
	};
}
//#endregion
//#region node_modules/viem/_esm/utils/stringify.js
var stringify$1 = (value, replacer, space) => JSON.stringify(value, (key, value_) => {
	const value = typeof value_ === "bigint" ? value_.toString() : value_;
	return typeof replacer === "function" ? replacer(key, value) : value;
}, space);
//#endregion
//#region node_modules/viem/_esm/utils/abi/formatAbiItemWithArgs.js
function formatAbiItemWithArgs({ abiItem, args, includeFunctionName = true, includeName = false }) {
	if (!("name" in abiItem)) return;
	if (!("inputs" in abiItem)) return;
	if (!abiItem.inputs) return;
	return `${includeFunctionName ? abiItem.name : ""}(${abiItem.inputs.map((input, i) => `${includeName && input.name ? `${input.name}: ` : ""}${typeof args[i] === "object" ? stringify$1(args[i]) : args[i]}`).join(", ")})`;
}
//#endregion
//#region node_modules/viem/_esm/utils/unit/Value.js
/** @see https://ethereum.github.io/yellowpaper/paper.pdf */
var exponents = {
	wei: 0,
	gwei: 9,
	szabo: 12,
	finney: 15,
	ether: 18
};
/**
* Formats a `bigint` Value to its string representation (divided by the given exponent).
*
* @example
* ```ts twoslash
* import { Value } from 'ox'
*
* Value.format(420_000_000_000n, 9)
* // @log: '420'
* ```
*
* @param value - The `bigint` Value to format.
* @param decimals - The exponent to divide the `bigint` Value by.
* @returns The string representation of the Value.
*/
function format$3(value, decimals = 0) {
	if (!Number.isInteger(decimals) || decimals < 0) throw new InvalidDecimalsError({ decimals });
	let display = value.toString();
	const negative = display.startsWith("-");
	if (negative) display = display.slice(1);
	display = display.padStart(decimals, "0");
	const split = display.length - decimals;
	const integer = display.slice(0, split);
	let end = display.length;
	while (end > split && display.charCodeAt(end - 1) === 48) end--;
	const fraction = display.slice(split, end);
	return `${negative ? "-" : ""}${integer || "0"}${fraction ? `.${fraction}` : ""}`;
}
/**
* Formats a `bigint` Value (default: wei) to a string representation of Ether.
*
* @example
* ```ts twoslash
* import { Value } from 'ox'
*
* Value.formatEther(1_000_000_000_000_000_000n)
* // @log: '1'
* ```
*
* @param wei - The Value to format.
* @param unit - The unit to format the Value in. @default 'wei'.
* @returns The Ether string representation of the Value.
*/
function formatEther$1(wei, unit = "wei") {
	return format$3(wei, exponents.ether - exponents[unit]);
}
/**
* Formats a `bigint` Value (default: wei) to a string representation of Gwei.
*
* @example
* ```ts twoslash
* import { Value } from 'ox'
*
* Value.formatGwei(1_000_000_000n)
* // @log: '1'
* ```
*
* @param wei - The Value to format.
* @param unit - The unit to format the Value in. @default 'wei'.
* @returns The Gwei string representation of the Value.
*/
function formatGwei$1(wei, unit = "wei") {
	return format$3(wei, exponents.gwei - exponents[unit]);
}
/**
* Parses a `string` representation of a Value to `bigint` (multiplied by the given exponent).
*
* @example
* ```ts twoslash
* import { Value } from 'ox'
*
* Value.from('420', 9)
* // @log: 420000000000n
* ```
*
* @param value - The string representation of the Value.
* @param decimals - The exponent to multiply the Value by.
* @returns The `bigint` representation of the Value.
*/
function from$8(value, decimals = 0) {
	if (!Number.isInteger(decimals) || decimals < 0) throw new InvalidDecimalsError({ decimals });
	if (!/^-?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)$/.test(value)) throw new InvalidDecimalNumberError({ value });
	let [integer = "", fraction = "0"] = value.split(".");
	const negative = integer.startsWith("-");
	if (negative) integer = integer.slice(1);
	if (integer === "") integer = "0";
	fraction = fraction.replace(/(0+)$/, "");
	if (decimals === 0) {
		if (fraction.length > 0 && Number.parseInt(fraction[0], 10) >= 5) integer = `${BigInt(integer) + 1n}`;
		fraction = "";
	} else if (fraction.length > decimals) {
		const left = fraction.slice(0, decimals);
		if (Number.parseInt(fraction.slice(decimals, decimals + 1), 10) >= 5) {
			const carried = carry(left);
			if (carried.length > decimals) {
				fraction = carried.slice(1);
				integer = `${BigInt(integer) + 1n}`;
			} else fraction = carried;
		} else fraction = left;
	} else fraction = fraction.padEnd(decimals, "0");
	return BigInt(`${negative ? "-" : ""}${integer}${fraction}`);
}
/**
* Adds 1 to a digit string with carry, returning a string of the same length
* unless the carry overflows past the most-significant digit (in which case
* the returned string is one digit longer).
*
* @internal
*/
function carry(digits) {
	const out = digits.split("");
	let i = out.length - 1;
	while (i >= 0) {
		const d = Number.parseInt(out[i], 10) + 1;
		if (d < 10) {
			out[i] = String(d);
			return out.join("");
		}
		out[i] = "0";
		i--;
	}
	return `1${out.join("")}`;
}
/**
* Thrown when a value is not a valid decimal number.
*
* @example
* ```ts twoslash
* import { Value } from 'ox'
*
* Value.fromEther('123.456.789')
* // @error: Value.InvalidDecimalNumberError: Value `123.456.789` is not a valid decimal number.
* ```
*/
var InvalidDecimalNumberError = class extends Error {
	name = "Value.InvalidDecimalNumberError";
	constructor({ value }) {
		super(`Value \`${value}\` is not a valid decimal number.`);
	}
};
/**
* Thrown when the `decimals` argument is not a non-negative integer.
*
* @example
* ```ts twoslash
* import { Value } from 'ox'
*
* Value.from('1', -1)
* // @error: Value.InvalidDecimalsError: `decimals` must be a non-negative integer. Got `-1`.
* ```
*/
var InvalidDecimalsError = class extends Error {
	name = "Value.InvalidDecimalsError";
	constructor({ decimals }) {
		super(`\`decimals\` must be a non-negative integer. Got \`${decimals}\`.`);
	}
};
//#endregion
//#region node_modules/viem/_esm/utils/unit/formatEther.js
/**
* Converts numerical wei to a string representation of ether.
*
* - Docs: https://viem.sh/docs/utilities/formatEther
*
* @example
* import { formatEther } from 'viem'
*
* formatEther(1000000000000000000n)
* // '1'
*/
function formatEther(wei, unit = "wei") {
	return formatEther$1(wei, unit);
}
//#endregion
//#region node_modules/viem/_esm/utils/unit/formatGwei.js
/**
* Converts numerical wei to a string representation of gwei.
*
* - Docs: https://viem.sh/docs/utilities/formatGwei
*
* @example
* import { formatGwei } from 'viem'
*
* formatGwei(1000000000n)
* // '1'
*/
function formatGwei(wei, unit = "wei") {
	return formatGwei$1(wei, unit);
}
//#endregion
//#region node_modules/viem/_esm/errors/stateOverride.js
var AccountStateConflictError = class extends BaseError$3 {
	constructor({ address }) {
		super(`State for account "${address}" is set multiple times.`, { name: "AccountStateConflictError" });
	}
};
var StateAssignmentConflictError = class extends BaseError$3 {
	constructor() {
		super("state and stateDiff are set on the same account.", { name: "StateAssignmentConflictError" });
	}
};
/** @internal */
function prettyStateMapping(stateMapping) {
	return stateMapping.reduce((pretty, { slot, value }) => {
		return `${pretty}        ${slot}: ${value}\n`;
	}, "");
}
function prettyStateOverride(stateOverride) {
	return stateOverride.reduce((pretty, { address, ...state }) => {
		let val = `${pretty}    ${address}:\n`;
		if (state.nonce) val += `      nonce: ${state.nonce}\n`;
		if (state.balance) val += `      balance: ${state.balance}\n`;
		if (state.code) val += `      code: ${state.code}\n`;
		if (state.state) {
			val += "      state:\n";
			val += prettyStateMapping(state.state);
		}
		if (state.stateDiff) {
			val += "      stateDiff:\n";
			val += prettyStateMapping(state.stateDiff);
		}
		return val;
	}, "  State Override:\n").slice(0, -1);
}
//#endregion
//#region node_modules/viem/_esm/errors/transaction.js
function prettyPrint$1(args) {
	const entries = Object.entries(args).map(([key, value]) => {
		if (value === void 0 || value === false) return null;
		return [key, value];
	}).filter(Boolean);
	const maxLength = entries.reduce((acc, [key]) => Math.max(acc, key.length), 0);
	return entries.map(([key, value]) => `  ${`${key}:`.padEnd(maxLength + 1)}  ${value}`).join("\n");
}
var FeePayerNonceMismatchError = class extends BaseError$3 {
	constructor({ filledNonce, requestedNonce }) {
		super("The filled transaction nonce does not match the requested nonce.", {
			metaMessages: [`Requested Nonce: ${requestedNonce}`, `Filled Nonce: ${filledNonce}`],
			name: "FeePayerNonceMismatchError"
		});
	}
};
var InvalidYParityError$1 = class extends BaseError$3 {
	constructor({ yParity }) {
		super(`Invalid \`yParity\` value "${yParity}". Expected 0 or 1.`, { name: "InvalidYParityError" });
	}
};
var InvalidSerializableTransactionError = class extends BaseError$3 {
	constructor({ transaction }) {
		super("Cannot infer a transaction type from provided transaction.", {
			metaMessages: [
				"Provided Transaction:",
				"{",
				prettyPrint$1(transaction),
				"}",
				"",
				"To infer the type, either provide:",
				"- a `type` to the Transaction, or",
				"- an EIP-1559 Transaction with `maxFeePerGas`, or",
				"- an EIP-2930 Transaction with `gasPrice` & `accessList`, or",
				"- an EIP-4844 Transaction with `blobs`, `blobVersionedHashes`, `sidecars`, or",
				"- an EIP-7702 Transaction with `authorizationList`, or",
				"- a Legacy Transaction with `gasPrice`"
			],
			name: "InvalidSerializableTransactionError"
		});
	}
};
var TransactionExecutionError = class extends BaseError$3 {
	cause;
	constructor(cause, { account, docsPath, chain, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value }) {
		const prettyArgs = prettyPrint$1({
			chain: chain && `${chain?.name} (id: ${chain?.id})`,
			from: account?.address,
			to,
			value: typeof value !== "undefined" && `${formatEther(value)} ${chain?.nativeCurrency?.symbol || "ETH"}`,
			data,
			gas,
			gasPrice: typeof gasPrice !== "undefined" && `${formatGwei(gasPrice)} gwei`,
			maxFeePerGas: typeof maxFeePerGas !== "undefined" && `${formatGwei(maxFeePerGas)} gwei`,
			maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== "undefined" && `${formatGwei(maxPriorityFeePerGas)} gwei`,
			nonce
		});
		super(cause.shortMessage, {
			cause,
			docsPath,
			metaMessages: [
				...cause.metaMessages ? [...cause.metaMessages, " "] : [],
				"Request Arguments:",
				prettyArgs
			].filter(Boolean),
			name: "TransactionExecutionError"
		});
		this.cause = cause;
	}
};
var TransactionNotFoundError = class extends BaseError$3 {
	constructor({ blockHash, blockNumber, blockTag, hash, index }) {
		let identifier = "Transaction";
		if (blockTag && index !== void 0) identifier = `Transaction at block time "${blockTag}" at index "${index}"`;
		if (blockHash && index !== void 0) identifier = `Transaction at block hash "${blockHash}" at index "${index}"`;
		if (blockNumber && index !== void 0) identifier = `Transaction at block number "${blockNumber}" at index "${index}"`;
		if (hash) identifier = `Transaction with hash "${hash}"`;
		super(`${identifier} could not be found.`, { name: "TransactionNotFoundError" });
	}
};
var TransactionReceiptNotFoundError = class extends BaseError$3 {
	constructor({ hash }) {
		super(`Transaction receipt with hash "${hash}" could not be found. The Transaction may not be processed on a block yet.`, { name: "TransactionReceiptNotFoundError" });
	}
};
var TransactionReceiptRevertedError = class extends BaseError$3 {
	receipt;
	constructor({ receipt }) {
		super(`Transaction with hash "${receipt.transactionHash}" reverted.`, {
			metaMessages: [
				"The receipt marked the transaction as \"reverted\". This could mean that the function on the contract you are trying to call threw an error.",
				" ",
				"You can attempt to extract the revert reason by:",
				"- calling the `simulateContract` or `simulateCalls` Action with the `abi` and `functionName` of the contract",
				"- using the `call` Action with raw `data`"
			],
			name: "TransactionReceiptRevertedError"
		});
		this.receipt = receipt;
	}
};
var WaitForTransactionReceiptTimeoutError = class extends BaseError$3 {
	constructor({ hash }) {
		super(`Timed out while waiting for transaction with hash "${hash}" to be confirmed.`, { name: "WaitForTransactionReceiptTimeoutError" });
	}
};
//#endregion
//#region node_modules/viem/_esm/errors/utils.js
var getContractAddress = (address) => address;
function getAbortError(signal) {
	if (signal?.reason) return signal.reason;
	if (typeof DOMException === "function") return new DOMException("This operation was aborted", "AbortError");
	const error = /* @__PURE__ */ new Error("This operation was aborted");
	error.name = "AbortError";
	return error;
}
function isAbortError(error) {
	return typeof error === "object" && error !== null && "name" in error && error.name === "AbortError";
}
/**
* Returns the URL with any embedded basic-auth credentials stripped, so
* error messages and logs don't leak secrets when an RPC URL like
* `https://user:pass@host` is used.
*/
var getUrl = (url) => {
	try {
		const parsed = new URL(url);
		if (!parsed.username && !parsed.password) return url;
		parsed.username = "";
		parsed.password = "";
		return parsed.toString();
	} catch {
		return url;
	}
};
//#endregion
//#region node_modules/viem/_esm/errors/contract.js
var CallExecutionError = class extends BaseError$3 {
	cause;
	constructor(cause, { account: account_, docsPath, chain, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, stateOverride }) {
		let prettyArgs = prettyPrint$1({
			from: (account_ ? parseAccount(account_) : void 0)?.address,
			to,
			value: typeof value !== "undefined" && `${formatEther(value)} ${chain?.nativeCurrency?.symbol || "ETH"}`,
			data,
			gas,
			gasPrice: typeof gasPrice !== "undefined" && `${formatGwei(gasPrice)} gwei`,
			maxFeePerGas: typeof maxFeePerGas !== "undefined" && `${formatGwei(maxFeePerGas)} gwei`,
			maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== "undefined" && `${formatGwei(maxPriorityFeePerGas)} gwei`,
			nonce
		});
		if (stateOverride) prettyArgs += `\n${prettyStateOverride(stateOverride)}`;
		super(cause.shortMessage, {
			cause,
			docsPath,
			metaMessages: [
				...cause.metaMessages ? [...cause.metaMessages, " "] : [],
				"Raw Call Arguments:",
				prettyArgs
			].filter(Boolean),
			name: "CallExecutionError"
		});
		this.cause = cause;
	}
};
var ContractFunctionExecutionError = class extends BaseError$3 {
	abi;
	args;
	cause;
	contractAddress;
	formattedArgs;
	functionName;
	sender;
	constructor(cause, { abi, args, contractAddress, docsPath, functionName, sender }) {
		const abiItem = getAbiItem({
			abi,
			args,
			name: functionName
		});
		const formattedArgs = abiItem ? formatAbiItemWithArgs({
			abiItem,
			args,
			includeFunctionName: false,
			includeName: false
		}) : void 0;
		const functionWithParams = abiItem ? formatAbiItem$1(abiItem, { includeName: true }) : void 0;
		const prettyArgs = prettyPrint$1({
			address: contractAddress && getContractAddress(contractAddress),
			function: functionWithParams,
			args: formattedArgs && formattedArgs !== "()" && `${[...Array(functionName?.length ?? 0).keys()].map(() => " ").join("")}${formattedArgs}`,
			sender
		});
		super(cause.shortMessage || `An unknown error occurred while executing the contract function "${functionName}".`, {
			cause,
			docsPath,
			metaMessages: [
				...cause.metaMessages ? [...cause.metaMessages, " "] : [],
				prettyArgs && "Contract Call:",
				prettyArgs
			].filter(Boolean),
			name: "ContractFunctionExecutionError"
		});
		this.abi = abi;
		this.args = args;
		this.cause = cause;
		this.contractAddress = contractAddress;
		this.functionName = functionName;
		this.sender = sender;
	}
};
var ContractFunctionRevertedError = class extends BaseError$3 {
	data;
	raw;
	reason;
	signature;
	constructor({ abi, data, functionName, message, cause: error }) {
		let cause;
		let decodedData;
		let metaMessages;
		let reason;
		if (data && data !== "0x") try {
			decodedData = decodeErrorResult({
				abi,
				data,
				cause: error
			});
			const { abiItem, errorName, args: errorArgs } = decodedData;
			if (errorName === "Error") reason = errorArgs[0];
			else if (errorName === "Panic") {
				const [firstArg] = errorArgs;
				reason = panicReasons[firstArg];
			} else {
				const errorWithParams = abiItem ? formatAbiItem$1(abiItem, { includeName: true }) : void 0;
				const formattedArgs = abiItem && errorArgs ? formatAbiItemWithArgs({
					abiItem,
					args: errorArgs,
					includeFunctionName: false,
					includeName: false
				}) : void 0;
				metaMessages = [errorWithParams ? `Error: ${errorWithParams}` : "", formattedArgs && formattedArgs !== "()" ? `       ${[...Array(errorName?.length ?? 0).keys()].map(() => " ").join("")}${formattedArgs}` : ""];
			}
		} catch (err) {
			cause = err;
		}
		else if (message) reason = message;
		let signature;
		if (cause instanceof AbiErrorSignatureNotFoundError) {
			signature = cause.signature;
			metaMessages = [
				`Unable to decode signature "${signature}" as it was not found on the provided ABI.`,
				"Make sure you are using the correct ABI and that the error exists on it.",
				`You can look up the decoded signature here: https://4byte.sourcify.dev/?q=${signature}.`
			];
		}
		super(reason && reason !== "execution reverted" || signature ? [`The contract function "${functionName}" reverted with the following ${signature ? "signature" : "reason"}:`, reason || signature].join("\n") : `The contract function "${functionName}" reverted.`, {
			cause: cause ?? error,
			metaMessages,
			name: "ContractFunctionRevertedError"
		});
		this.data = decodedData;
		this.raw = data;
		this.reason = reason;
		this.signature = signature;
	}
};
var ContractFunctionZeroDataError = class extends BaseError$3 {
	constructor({ functionName, cause }) {
		super(`The contract function "${functionName}" returned no data ("0x").`, {
			metaMessages: [
				"This could be due to any of the following:",
				`  - The contract does not have the function "${functionName}",`,
				"  - The parameters passed to the contract function may be invalid, or",
				"  - The address is not a contract."
			],
			name: "ContractFunctionZeroDataError",
			cause
		});
	}
};
var CounterfactualDeploymentFailedError = class extends BaseError$3 {
	constructor({ factory }) {
		super(`Deployment for counterfactual contract call failed${factory ? ` for factory "${factory}".` : ""}`, {
			metaMessages: [
				"Please ensure:",
				"- The `factory` is a valid contract deployment factory (ie. Create2 Factory, ERC-4337 Factory, etc).",
				"- The `factoryData` is a valid encoded function call for contract deployment function on the factory."
			],
			name: "CounterfactualDeploymentFailedError"
		});
	}
};
var RawContractError = class extends BaseError$3 {
	code = 3;
	data;
	constructor({ data, message }) {
		super(message || "", { name: "RawContractError" });
		this.data = data;
	}
};
//#endregion
//#region node_modules/viem/_esm/utils/ens/errors.js
function isNullUniversalResolverError(err) {
	if (!(err instanceof BaseError$3)) return false;
	const cause = err.walk((e) => e instanceof ContractFunctionRevertedError);
	if (!(cause instanceof ContractFunctionRevertedError)) return false;
	if (cause.data?.errorName === "HttpError") return true;
	if (cause.data?.errorName === "ResolverError") return true;
	if (cause.data?.errorName === "ResolverNotContract") return true;
	if (cause.data?.errorName === "ResolverNotFound") return true;
	if (cause.data?.errorName === "ReverseAddressMismatch") return true;
	if (cause.data?.errorName === "UnsupportedResolverProfile") return true;
	return false;
}
//#endregion
//#region node_modules/viem/_esm/errors/request.js
var HttpRequestError = class extends BaseError$3 {
	body;
	headers;
	status;
	url;
	constructor({ body, cause, details, headers, status, url }) {
		super("HTTP request failed.", {
			cause,
			details,
			metaMessages: [
				status && `Status: ${status}`,
				`URL: ${getUrl(url)}`,
				body && `Request body: ${stringify$1(body)}`
			].filter(Boolean),
			name: "HttpRequestError"
		});
		this.body = body;
		this.headers = headers;
		this.status = status;
		this.url = url;
	}
};
var ResponseBodyTooLargeError = class extends BaseError$3 {
	maxSize;
	size;
	constructor({ maxSize, size }) {
		super("HTTP response body exceeded the size limit.", {
			metaMessages: [`Max: ${maxSize} bytes`, `Received: ${size} bytes`],
			name: "ResponseBodyTooLargeError"
		});
		this.maxSize = maxSize;
		this.size = size;
	}
};
var RpcRequestError = class extends BaseError$3 {
	code;
	data;
	/** Response headers, when the error came from a non-2xx HTTP response. */
	headers;
	/** Response status, when the error came from a non-2xx HTTP response. */
	status;
	url;
	constructor({ body, error, headers, status, url }) {
		super("RPC Request failed.", {
			cause: error,
			details: error.message,
			metaMessages: [
				status && `Status: ${status}`,
				`URL: ${getUrl(url)}`,
				`Request body: ${stringify$1(body)}`
			].filter(Boolean),
			name: "RpcRequestError"
		});
		this.code = error.code;
		this.data = error.data;
		this.headers = headers;
		this.status = status;
		this.url = url;
	}
};
var TimeoutError = class extends BaseError$3 {
	url;
	constructor({ body, url }) {
		super("The request took too long to respond.", {
			details: "The request timed out.",
			metaMessages: [`URL: ${getUrl(url)}`, `Request body: ${stringify$1(body)}`],
			name: "TimeoutError"
		});
		this.url = url;
	}
};
//#endregion
//#region node_modules/viem/_esm/utils/abi/decodeFunctionData.js
function decodeFunctionData(parameters) {
	const { abi, data } = parameters;
	const signature = slice$2(data, 0, 4);
	const description = abi.find((x) => x.type === "function" && signature === toFunctionSelector(formatAbiItem$1(x)));
	if (!description) throw new AbiFunctionSignatureNotFoundError(signature, { docsPath: "/docs/contract/decodeFunctionData" });
	return {
		functionName: description.name,
		args: "inputs" in description && description.inputs && description.inputs.length > 0 ? decodeAbiParameters(description.inputs, slice$2(data, 4)) : void 0
	};
}
//#endregion
//#region node_modules/viem/_esm/utils/abi/encodeErrorResult.js
var docsPath$4 = "/docs/contract/encodeErrorResult";
function encodeErrorResult(parameters) {
	const { abi, errorName, args } = parameters;
	let abiItem = abi[0];
	if (errorName) {
		const item = getAbiItem({
			abi,
			args,
			name: errorName
		});
		if (!item) throw new AbiErrorNotFoundError(errorName, { docsPath: docsPath$4 });
		abiItem = item;
	}
	if (abiItem.type !== "error") throw new AbiErrorNotFoundError(void 0, { docsPath: docsPath$4 });
	const signature = toFunctionSelector(formatAbiItem$1(abiItem));
	let data = "0x";
	if (args && args.length > 0) {
		if (!abiItem.inputs) throw new AbiErrorInputsNotFoundError(abiItem.name, { docsPath: docsPath$4 });
		data = encodeAbiParameters(abiItem.inputs, args);
	}
	return concatHex([signature, data]);
}
//#endregion
//#region node_modules/viem/_esm/utils/abi/encodeFunctionResult.js
var docsPath$3 = "/docs/contract/encodeFunctionResult";
function encodeFunctionResult(parameters) {
	const { abi, functionName, result } = parameters;
	let abiItem = abi[0];
	if (functionName) {
		const item = getAbiItem({
			abi,
			name: functionName
		});
		if (!item) throw new AbiFunctionNotFoundError(functionName, { docsPath: docsPath$3 });
		abiItem = item;
	}
	if (abiItem.type !== "function") throw new AbiFunctionNotFoundError(void 0, { docsPath: docsPath$3 });
	if (!abiItem.outputs) throw new AbiFunctionOutputsNotFoundError(abiItem.name, { docsPath: docsPath$3 });
	const values = (() => {
		if (abiItem.outputs.length === 0) return [];
		if (abiItem.outputs.length === 1) return [result];
		if (Array.isArray(result)) return result;
		throw new InvalidArrayError$1(result);
	})();
	return encodeAbiParameters(abiItem.outputs, values);
}
//#endregion
//#region node_modules/viem/_esm/utils/ens/localBatchGatewayRequest.js
var localBatchGatewayUrl = "x-batch-gateway:true";
/**
* Caps for one CCIP-Read lookup.
*
* - `bytes`: local batch response bytes in total, across callbacks and nested
*   batches. Going over it fails the lookup.
* - `concurrency`: gateway requests in flight at once, across nested batches.
* - `depth`: nested callbacks, and separately, nested local batches.
* - `queries`: gateway requests in total, across callbacks and nested batches.
*   Each contract-chosen URL counts once, and a query with none counts once.
*   Gateways a custom `ccipRead.request` adds (such as `ccipReadTunnel`'s
*   `batchGateways`) are the caller's own and are not counted separately.
*/
var ccipReadLimit = {
	bytes: 10485760,
	concurrency: 16,
	depth: 4,
	queries: 256
};
/** Creates the budget for one CCIP-Read lookup. */
function createCcipReadBudget() {
	let active = 0;
	const queue = [];
	return {
		bytes: ccipReadLimit.bytes,
		queries: ccipReadLimit.queries,
		async run(fn) {
			if (active >= ccipReadLimit.concurrency) await new Promise((resolve) => queue.push(resolve));
			else active++;
			try {
				return await fn();
			} finally {
				const next = queue.shift();
				if (next) next();
				else active--;
			}
		}
	};
}
async function localBatchGatewayRequest(parameters) {
	const { data, ccipRequest, budget = createCcipReadBudget(), depth = 0 } = parameters;
	const { args: [queries] } = decodeFunctionData({
		abi: batchGatewayAbi,
		data
	});
	const failures = [];
	const responses = [];
	await Promise.all(queries.map(async (query, i) => {
		try {
			const nested = query.urls.includes(localBatchGatewayUrl);
			if (nested && depth + 1 >= ccipReadLimit.depth) throw new HttpRequestError({
				details: `CCIP Read exceeded the maximum batch depth (${ccipReadLimit.depth}).`,
				url: localBatchGatewayUrl
			});
			if (nested) responses[i] = await localBatchGatewayRequest({
				data: query.data,
				ccipRequest,
				budget,
				depth: depth + 1
			});
			else {
				if (budget.queries <= 0) throw new HttpRequestError({
					details: `CCIP Read exceeded the maximum number of queries (${ccipReadLimit.queries}).`,
					url: query.urls[0] ?? ""
				});
				const urls = query.urls.slice(0, budget.queries);
				budget.queries -= Math.max(1, urls.length);
				const response = await budget.run(async () => budget.bytes < 0 ? "0x" : ccipRequest({
					...query,
					urls
				}));
				budget.bytes -= size$4(response);
				if (budget.bytes < 0) throw new HttpRequestError({
					details: `CCIP Read exceeded the maximum response size (${ccipReadLimit.bytes} bytes).`,
					url: localBatchGatewayUrl
				});
				responses[i] = response;
			}
			failures[i] = false;
		} catch (err) {
			if (budget.bytes < 0) throw err;
			failures[i] = true;
			responses[i] = encodeError(err);
		}
	}));
	return encodeFunctionResult({
		abi: batchGatewayAbi,
		functionName: "query",
		result: [failures, responses]
	});
}
function encodeError(error) {
	if (error.name === "HttpRequestError" && error.status) return encodeErrorResult({
		abi: batchGatewayAbi,
		errorName: "HttpError",
		args: [error.status, error.shortMessage]
	});
	return encodeErrorResult({
		abi: [solidityError],
		errorName: "Error",
		args: ["shortMessage" in error ? error.shortMessage : error.message]
	});
}
//#endregion
//#region node_modules/viem/_esm/utils/ens/encodedLabelToLabelhash.js
function encodedLabelToLabelhash(label) {
	if (label.length !== 66) return null;
	if (label.indexOf("[") !== 0) return null;
	if (label.indexOf("]") !== 65) return null;
	const hash = `0x${label.slice(1, 65)}`;
	if (!isHex(hash)) return null;
	return hash;
}
//#endregion
//#region node_modules/viem/_esm/utils/ens/namehash.js
/**
* @description Hashes ENS name
*
* - Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `namehash`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this.
*
* @example
* namehash('wevm.eth')
* '0x08c85f2f4059e930c45a6aeff9dcd3bd95dc3c5c1cddef6a0626b31152248560'
*
* @link https://eips.ethereum.org/EIPS/eip-137
*/
function namehash(name) {
	let result = (/* @__PURE__ */ new Uint8Array(32)).fill(0);
	if (!name) return bytesToHex(result);
	const labels = name.split(".");
	for (let i = labels.length - 1; i >= 0; i -= 1) {
		const hashFromEncodedLabel = encodedLabelToLabelhash(labels[i]);
		const hashed = hashFromEncodedLabel ? toBytes$1(hashFromEncodedLabel) : keccak256$1(stringToBytes(labels[i]), "bytes");
		result = keccak256$1(concat$1([result, hashed]), "bytes");
	}
	return bytesToHex(result);
}
//#endregion
//#region node_modules/viem/_esm/utils/ens/encodeLabelhash.js
function encodeLabelhash(hash) {
	return `[${hash.slice(2)}]`;
}
//#endregion
//#region node_modules/viem/_esm/utils/ens/labelhash.js
/**
* @description Hashes ENS label
*
* - Since ENS labels prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS labels](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `labelhash`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this.
*
* @example
* labelhash('eth')
* '0x4f5b812789fc606be1b3b16908db13fc7a9adf7ca72641f84d75b47069d3d7f0'
*/
function labelhash(label) {
	const result = (/* @__PURE__ */ new Uint8Array(32)).fill(0);
	if (!label) return bytesToHex(result);
	return encodedLabelToLabelhash(label) || keccak256$1(stringToBytes(label));
}
//#endregion
//#region node_modules/viem/_esm/utils/ens/packetToBytes.js
function packetToBytes(packet) {
	const value = packet.replace(/^\.|\.$/gm, "");
	if (value.length === 0) return /* @__PURE__ */ new Uint8Array(1);
	const bytes = new Uint8Array(stringToBytes(value).byteLength + 2);
	let offset = 0;
	const list = value.split(".");
	for (let i = 0; i < list.length; i++) {
		let encoded = stringToBytes(list[i]);
		if (encoded.byteLength > 255) encoded = stringToBytes(encodeLabelhash(labelhash(list[i])));
		bytes[offset] = encoded.length;
		bytes.set(encoded, offset + 1);
		offset += encoded.length + 1;
	}
	if (bytes.byteLength !== offset + 1) return bytes.slice(0, offset + 1);
	return bytes;
}
//#endregion
//#region node_modules/viem/_esm/utils/getAction.js
/**
* Retrieves and returns an action from the client (if exists), and falls
* back to the tree-shakable action.
*
* Useful for extracting overridden actions from a client (ie. if a consumer
* wants to override the `sendTransaction` implementation).
*/
function getAction(client, actionFn, name) {
	const action_implicit = client[actionFn.name];
	if (typeof action_implicit === "function") return action_implicit;
	const action_explicit = client[name];
	if (typeof action_explicit === "function") return action_explicit;
	return (params) => actionFn(client, params);
}
//#endregion
//#region node_modules/viem/_esm/errors/rpc.js
var unknownErrorCode = -1;
var RpcError = class extends BaseError$3 {
	code;
	constructor(cause, { code, docsPath, metaMessages, name, shortMessage }) {
		super(shortMessage, {
			cause,
			docsPath,
			metaMessages: metaMessages || cause?.metaMessages,
			name: name || "RpcError"
		});
		this.name = name || cause.name;
		this.code = cause instanceof RpcRequestError ? cause.code : code ?? unknownErrorCode;
	}
};
var ProviderRpcError = class extends RpcError {
	data;
	constructor(cause, options) {
		super(cause, options);
		this.data = options.data;
	}
};
var ParseRpcError = class ParseRpcError extends RpcError {
	static code = -32700;
	constructor(cause) {
		super(cause, {
			code: ParseRpcError.code,
			name: "ParseRpcError",
			shortMessage: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."
		});
	}
};
var InvalidRequestRpcError = class InvalidRequestRpcError extends RpcError {
	static code = -32600;
	constructor(cause) {
		super(cause, {
			code: InvalidRequestRpcError.code,
			name: "InvalidRequestRpcError",
			shortMessage: "JSON is not a valid request object."
		});
	}
};
var MethodNotFoundRpcError = class MethodNotFoundRpcError extends RpcError {
	static code = -32601;
	constructor(cause, { method } = {}) {
		super(cause, {
			code: MethodNotFoundRpcError.code,
			name: "MethodNotFoundRpcError",
			shortMessage: `The method${method ? ` "${method}"` : ""} does not exist / is not available.`
		});
	}
};
var InvalidParamsRpcError = class InvalidParamsRpcError extends RpcError {
	static code = -32602;
	constructor(cause) {
		super(cause, {
			code: InvalidParamsRpcError.code,
			name: "InvalidParamsRpcError",
			shortMessage: ["Invalid parameters were provided to the RPC method.", "Double check you have provided the correct parameters."].join("\n")
		});
	}
};
var InternalRpcError = class InternalRpcError extends RpcError {
	static code = -32603;
	constructor(cause) {
		super(cause, {
			code: InternalRpcError.code,
			name: "InternalRpcError",
			shortMessage: "An internal error was received."
		});
	}
};
var InvalidInputRpcError = class InvalidInputRpcError extends RpcError {
	static code = -32e3;
	constructor(cause) {
		super(cause, {
			code: InvalidInputRpcError.code,
			name: "InvalidInputRpcError",
			shortMessage: ["Missing or invalid parameters.", "Double check you have provided the correct parameters."].join("\n")
		});
	}
};
var ResourceNotFoundRpcError = class ResourceNotFoundRpcError extends RpcError {
	name = "ResourceNotFoundRpcError";
	static code = -32001;
	constructor(cause) {
		super(cause, {
			code: ResourceNotFoundRpcError.code,
			name: "ResourceNotFoundRpcError",
			shortMessage: "Requested resource not found."
		});
	}
};
var ResourceUnavailableRpcError = class ResourceUnavailableRpcError extends RpcError {
	static code = -32002;
	constructor(cause) {
		super(cause, {
			code: ResourceUnavailableRpcError.code,
			name: "ResourceUnavailableRpcError",
			shortMessage: "Requested resource not available."
		});
	}
};
var TransactionRejectedRpcError = class TransactionRejectedRpcError extends RpcError {
	static code = -32003;
	constructor(cause) {
		super(cause, {
			code: TransactionRejectedRpcError.code,
			name: "TransactionRejectedRpcError",
			shortMessage: "Transaction creation failed."
		});
	}
};
var MethodNotSupportedRpcError = class MethodNotSupportedRpcError extends RpcError {
	static code = -32004;
	constructor(cause, { method } = {}) {
		super(cause, {
			code: MethodNotSupportedRpcError.code,
			name: "MethodNotSupportedRpcError",
			shortMessage: `Method${method ? ` "${method}"` : ""} is not supported.`
		});
	}
};
var LimitExceededRpcError = class LimitExceededRpcError extends RpcError {
	static code = -32005;
	constructor(cause) {
		super(cause, {
			code: LimitExceededRpcError.code,
			name: "LimitExceededRpcError",
			shortMessage: "Request exceeds defined limit."
		});
	}
};
var JsonRpcVersionUnsupportedError = class JsonRpcVersionUnsupportedError extends RpcError {
	static code = -32006;
	constructor(cause) {
		super(cause, {
			code: JsonRpcVersionUnsupportedError.code,
			name: "JsonRpcVersionUnsupportedError",
			shortMessage: "Version of JSON-RPC protocol is not supported."
		});
	}
};
var UserRejectedRequestError = class UserRejectedRequestError extends ProviderRpcError {
	static code = 4001;
	constructor(cause) {
		super(cause, {
			code: UserRejectedRequestError.code,
			name: "UserRejectedRequestError",
			shortMessage: "User rejected the request."
		});
	}
};
var UnauthorizedProviderError = class UnauthorizedProviderError extends ProviderRpcError {
	static code = 4100;
	constructor(cause) {
		super(cause, {
			code: UnauthorizedProviderError.code,
			name: "UnauthorizedProviderError",
			shortMessage: "The requested method and/or account has not been authorized by the user."
		});
	}
};
var UnsupportedProviderMethodError = class UnsupportedProviderMethodError extends ProviderRpcError {
	static code = 4200;
	constructor(cause, { method } = {}) {
		super(cause, {
			code: UnsupportedProviderMethodError.code,
			name: "UnsupportedProviderMethodError",
			shortMessage: `The Provider does not support the requested method${method ? ` " ${method}"` : ""}.`
		});
	}
};
var ProviderDisconnectedError = class ProviderDisconnectedError extends ProviderRpcError {
	static code = 4900;
	constructor(cause) {
		super(cause, {
			code: ProviderDisconnectedError.code,
			name: "ProviderDisconnectedError",
			shortMessage: "The Provider is disconnected from all chains."
		});
	}
};
var ChainDisconnectedError = class ChainDisconnectedError extends ProviderRpcError {
	static code = 4901;
	constructor(cause) {
		super(cause, {
			code: ChainDisconnectedError.code,
			name: "ChainDisconnectedError",
			shortMessage: "The Provider is not connected to the requested chain."
		});
	}
};
var SwitchChainError = class SwitchChainError extends ProviderRpcError {
	static code = 4902;
	constructor(cause) {
		super(cause, {
			code: SwitchChainError.code,
			name: "SwitchChainError",
			shortMessage: "An error occurred when attempting to switch chain."
		});
	}
};
var UnsupportedNonOptionalCapabilityError = class UnsupportedNonOptionalCapabilityError extends ProviderRpcError {
	static code = 5700;
	constructor(cause) {
		super(cause, {
			code: UnsupportedNonOptionalCapabilityError.code,
			name: "UnsupportedNonOptionalCapabilityError",
			shortMessage: "This Wallet does not support a capability that was not marked as optional."
		});
	}
};
var UnsupportedChainIdError = class UnsupportedChainIdError extends ProviderRpcError {
	static code = 5710;
	constructor(cause) {
		super(cause, {
			code: UnsupportedChainIdError.code,
			name: "UnsupportedChainIdError",
			shortMessage: "This Wallet does not support the requested chain ID."
		});
	}
};
var DuplicateIdError = class DuplicateIdError extends ProviderRpcError {
	static code = 5720;
	constructor(cause) {
		super(cause, {
			code: DuplicateIdError.code,
			name: "DuplicateIdError",
			shortMessage: "There is already a bundle submitted with this ID."
		});
	}
};
var UnknownBundleIdError = class UnknownBundleIdError extends ProviderRpcError {
	static code = 5730;
	constructor(cause) {
		super(cause, {
			code: UnknownBundleIdError.code,
			name: "UnknownBundleIdError",
			shortMessage: "This bundle id is unknown / has not been submitted"
		});
	}
};
var BundleTooLargeError = class BundleTooLargeError extends ProviderRpcError {
	static code = 5740;
	constructor(cause) {
		super(cause, {
			code: BundleTooLargeError.code,
			name: "BundleTooLargeError",
			shortMessage: "The call bundle is too large for the Wallet to process."
		});
	}
};
var AtomicReadyWalletRejectedUpgradeError = class AtomicReadyWalletRejectedUpgradeError extends ProviderRpcError {
	static code = 5750;
	constructor(cause) {
		super(cause, {
			code: AtomicReadyWalletRejectedUpgradeError.code,
			name: "AtomicReadyWalletRejectedUpgradeError",
			shortMessage: "The Wallet can support atomicity after an upgrade, but the user rejected the upgrade."
		});
	}
};
var AtomicityNotSupportedError = class AtomicityNotSupportedError extends ProviderRpcError {
	static code = 5760;
	constructor(cause) {
		super(cause, {
			code: AtomicityNotSupportedError.code,
			name: "AtomicityNotSupportedError",
			shortMessage: "The wallet does not support atomic execution but the request requires it."
		});
	}
};
var WalletConnectSessionSettlementError = class WalletConnectSessionSettlementError extends ProviderRpcError {
	static code = 7e3;
	constructor(cause) {
		super(cause, {
			code: WalletConnectSessionSettlementError.code,
			name: "WalletConnectSessionSettlementError",
			shortMessage: "WalletConnect session settlement failed."
		});
	}
};
var UnknownRpcError = class extends RpcError {
	constructor(cause) {
		super(cause, {
			name: "UnknownRpcError",
			shortMessage: "An unknown RPC error occurred."
		});
	}
};
//#endregion
//#region node_modules/viem/_esm/utils/errors/getContractError.js
var EXECUTION_REVERTED_ERROR_CODE = 3;
function getContractError(err, { abi, address, args, docsPath, functionName, sender }) {
	const error = err instanceof RawContractError ? err : err instanceof BaseError$3 ? err.walk((err) => typeof err === "object" && err !== null && "data" in err) || err.walk() : {};
	const { code, data, details, message, shortMessage } = error;
	return new ContractFunctionExecutionError((() => {
		if (err instanceof AbiDecodingZeroDataError) return new ContractFunctionZeroDataError({
			functionName,
			cause: err
		});
		if ([EXECUTION_REVERTED_ERROR_CODE, InternalRpcError.code].includes(code) && (data || details || message || shortMessage) || code === InvalidInputRpcError.code && details === "execution reverted" && data) return new ContractFunctionRevertedError({
			abi,
			data: typeof data === "object" ? data.data : data,
			functionName,
			message: error instanceof RpcRequestError ? details : shortMessage ?? message,
			cause: err
		});
		return err;
	})(), {
		abi,
		args,
		contractAddress: address,
		docsPath,
		functionName,
		sender
	});
}
//#endregion
//#region node_modules/ox/_esm/core/version.js
/** @internal */
var version$1 = "0.1.1";
//#endregion
//#region node_modules/ox/_esm/core/internal/errors.js
/** @internal */
function getVersion$1() {
	return version$1;
}
//#endregion
//#region node_modules/ox/_esm/core/Errors.js
/**
* Base error class inherited by all errors thrown by ox.
*
* @example
* ```ts
* import { Errors } from 'ox'
* throw new Errors.BaseError('An error occurred')
* ```
*/
var BaseError$1 = class BaseError$1 extends Error {
	static setStaticOptions(options) {
		BaseError$1.prototype.docsOrigin = options.docsOrigin;
		BaseError$1.prototype.showVersion = options.showVersion;
		BaseError$1.prototype.version = options.version;
	}
	constructor(shortMessage, options = {}) {
		const details = (() => {
			if (options.cause instanceof BaseError$1) {
				if (options.cause.details) return options.cause.details;
				if (options.cause.shortMessage) return options.cause.shortMessage;
			}
			if (options.cause && "details" in options.cause && typeof options.cause.details === "string") return options.cause.details;
			if (options.cause?.message) return options.cause.message;
			return options.details;
		})();
		const docsPath = (() => {
			if (options.cause instanceof BaseError$1) return options.cause.docsPath || options.docsPath;
			return options.docsPath;
		})();
		const docsBaseUrl = options.docsOrigin ?? BaseError$1.prototype.docsOrigin;
		const docs = `${docsBaseUrl}${docsPath ?? ""}`;
		const showVersion = Boolean(options.version ?? BaseError$1.prototype.showVersion);
		const version = options.version ?? BaseError$1.prototype.version;
		const message = [
			shortMessage || "An error occurred.",
			...options.metaMessages ? ["", ...options.metaMessages] : [],
			...details || docsPath || showVersion ? [
				"",
				details ? `Details: ${details}` : void 0,
				docsPath ? `See: ${docs}` : void 0,
				showVersion ? `Version: ${version}` : void 0
			] : []
		].filter((x) => typeof x === "string").join("\n");
		super(message, options.cause ? { cause: options.cause } : void 0);
		Object.defineProperty(this, "details", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0
		});
		Object.defineProperty(this, "docs", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0
		});
		Object.defineProperty(this, "docsOrigin", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0
		});
		Object.defineProperty(this, "docsPath", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0
		});
		Object.defineProperty(this, "shortMessage", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0
		});
		Object.defineProperty(this, "showVersion", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0
		});
		Object.defineProperty(this, "version", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0
		});
		Object.defineProperty(this, "cause", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0
		});
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "BaseError"
		});
		this.cause = options.cause;
		this.details = details;
		this.docs = docs;
		this.docsOrigin = docsBaseUrl;
		this.docsPath = docsPath;
		this.shortMessage = shortMessage;
		this.showVersion = showVersion;
		this.version = version;
	}
	walk(fn) {
		return walk(this, fn);
	}
};
Object.defineProperty(BaseError$1, "defaultStaticOptions", {
	enumerable: true,
	configurable: true,
	writable: true,
	value: {
		docsOrigin: "https://oxlib.sh",
		showVersion: false,
		version: `ox@${getVersion$1()}`
	}
});
(() => {
	BaseError$1.setStaticOptions(BaseError$1.defaultStaticOptions);
})();
/** @internal */
function walk(err, fn) {
	if (fn?.(err)) return err;
	if (err && typeof err === "object" && "cause" in err && err.cause) return walk(err.cause, fn);
	return fn ? null : err;
}
//#endregion
//#region node_modules/ox/_esm/core/internal/bytes.js
/** @internal */
function assertSize$1(bytes, size_) {
	if (size$3(bytes) > size_) throw new SizeOverflowError$1({
		givenSize: size$3(bytes),
		maxSize: size_
	});
}
/** @internal */
function assertStartOffset$1(value, start) {
	if (typeof start === "number" && start > 0 && start > size$3(value) - 1) throw new SliceOffsetOutOfBoundsError$1({
		offset: start,
		position: "start",
		size: size$3(value)
	});
}
/** @internal */
function assertEndOffset$1(value, start, end) {
	if (typeof start === "number" && typeof end === "number" && size$3(value) !== end - start) throw new SliceOffsetOutOfBoundsError$1({
		offset: end,
		position: "end",
		size: size$3(value)
	});
}
/** @internal */
var charCodeMap = {
	zero: 48,
	nine: 57,
	A: 65,
	F: 70,
	a: 97,
	f: 102
};
/** @internal */
function charCodeToBase16(char) {
	if (char >= charCodeMap.zero && char <= charCodeMap.nine) return char - charCodeMap.zero;
	if (char >= charCodeMap.A && char <= charCodeMap.F) return char - (charCodeMap.A - 10);
	if (char >= charCodeMap.a && char <= charCodeMap.f) return char - (charCodeMap.a - 10);
}
/** @internal */
function pad$1(bytes, options = {}) {
	const { dir, size = 32 } = options;
	if (size === 0) return bytes;
	if (bytes.length > size) throw new SizeExceedsPaddingSizeError$1({
		size: bytes.length,
		targetSize: size,
		type: "Bytes"
	});
	const paddedBytes = new Uint8Array(size);
	for (let i = 0; i < size; i++) {
		const padEnd = dir === "right";
		paddedBytes[padEnd ? i : size - i - 1] = bytes[padEnd ? i : bytes.length - i - 1];
	}
	return paddedBytes;
}
/** @internal */
function trim(value, options = {}) {
	const { dir = "left" } = options;
	let data = value;
	let sliceLength = 0;
	for (let i = 0; i < data.length - 1; i++) if (data[dir === "left" ? i : data.length - i - 1].toString() === "0") sliceLength++;
	else break;
	data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
	return data;
}
//#endregion
//#region node_modules/ox/_esm/core/internal/hex.js
/** @internal */
function assertSize(hex, size_) {
	if (size$2(hex) > size_) throw new SizeOverflowError({
		givenSize: size$2(hex),
		maxSize: size_
	});
}
/** @internal */
function assertStartOffset(value, start) {
	if (typeof start === "number" && start > 0 && start > size$2(value) - 1) throw new SliceOffsetOutOfBoundsError({
		offset: start,
		position: "start",
		size: size$2(value)
	});
}
/** @internal */
function assertEndOffset(value, start, end) {
	if (typeof start === "number" && typeof end === "number" && size$2(value) !== end - start) throw new SliceOffsetOutOfBoundsError({
		offset: end,
		position: "end",
		size: size$2(value)
	});
}
/** @internal */
function pad(hex_, options = {}) {
	const { dir, size = 32 } = options;
	if (size === 0) return hex_;
	const hex = hex_.replace("0x", "");
	if (hex.length > size * 2) throw new SizeExceedsPaddingSizeError({
		size: Math.ceil(hex.length / 2),
		targetSize: size,
		type: "Hex"
	});
	return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size * 2, "0")}`;
}
//#endregion
//#region node_modules/ox/_esm/core/Json.js
var bigIntSuffix = "#__bigint";
/**
* Stringifies a value to its JSON representation, with support for `bigint`.
*
* @example
* ```ts twoslash
* import { Json } from 'ox'
*
* const json = Json.stringify({
*   foo: 'bar',
*   baz: 69420694206942069420694206942069420694206942069420n,
* })
* // @log: '{"foo":"bar","baz":"69420694206942069420694206942069420694206942069420#__bigint"}'
* ```
*
* @param value - The value to stringify.
* @param replacer - A function that transforms the results. It is passed the key and value of the property, and must return the value to be used in the JSON string. If this function returns `undefined`, the property is not included in the resulting JSON string.
* @param space - A string or number that determines the indentation of the JSON string. If it is a number, it indicates the number of spaces to use as indentation; if it is a string (e.g. `'\t'`), it uses the string as the indentation character.
* @returns The JSON string.
*/
function stringify(value, replacer, space) {
	return JSON.stringify(value, (key, value) => {
		if (typeof replacer === "function") return replacer(key, value);
		if (typeof value === "bigint") return value.toString() + bigIntSuffix;
		return value;
	}, space);
}
//#endregion
//#region node_modules/ox/_esm/core/Bytes.js
var decoder$1 = /*#__PURE__*/ new TextDecoder();
var encoder$2 = /*#__PURE__*/ new TextEncoder();
/**
* Instantiates a {@link ox#Bytes.Bytes} value from a `Uint8Array`, a hex string, or an array of unsigned 8-bit integers.
*
* :::tip
*
* To instantiate from a **Boolean**, **String**, or **Number**, use one of the following:
*
* - `Bytes.fromBoolean`
*
* - `Bytes.fromString`
*
* - `Bytes.fromNumber`
*
* :::
*
* @example
* ```ts twoslash
* // @noErrors
* import { Bytes } from 'ox'
*
* const data = Bytes.from([255, 124, 5, 4])
* // @log: Uint8Array([255, 124, 5, 4])
*
* const data = Bytes.from('0xdeadbeef')
* // @log: Uint8Array([222, 173, 190, 239])
* ```
*
* @param value - Value to convert.
* @returns A {@link ox#Bytes.Bytes} instance.
*/
function from$7(value) {
	if (value instanceof Uint8Array) return value;
	if (typeof value === "string") return fromHex(value);
	return fromArray(value);
}
/**
* Converts an array of unsigned 8-bit integers into {@link ox#Bytes.Bytes}.
*
* @example
* ```ts twoslash
* import { Bytes } from 'ox'
*
* const data = Bytes.fromArray([255, 124, 5, 4])
* // @log: Uint8Array([255, 124, 5, 4])
* ```
*
* @param value - Value to convert.
* @returns A {@link ox#Bytes.Bytes} instance.
*/
function fromArray(value) {
	return value instanceof Uint8Array ? value : new Uint8Array(value);
}
/**
* Encodes a {@link ox#Hex.Hex} value into {@link ox#Bytes.Bytes}.
*
* @example
* ```ts twoslash
* import { Bytes } from 'ox'
*
* const data = Bytes.fromHex('0x48656c6c6f20776f726c6421')
* // @log: Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33])
* ```
*
* @example
* ```ts twoslash
* import { Bytes } from 'ox'
*
* const data = Bytes.fromHex('0x48656c6c6f20776f726c6421', { size: 32 })
* // @log: Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
* ```
*
* @param value - {@link ox#Hex.Hex} value to encode.
* @param options - Encoding options.
* @returns Encoded {@link ox#Bytes.Bytes}.
*/
function fromHex(value, options = {}) {
	const { size } = options;
	let hexString = value.slice(2);
	if (hexString.length % 2) hexString = `0${hexString}`;
	if (size) {
		assertSize(value, size);
		hexString = hexString.padEnd(size * 2, "0");
	}
	const length = hexString.length / 2;
	const bytes = new Uint8Array(length);
	for (let index = 0, j = 0; index < length; index++) {
		const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j++));
		const nibbleRight = charCodeToBase16(hexString.charCodeAt(j++));
		if (nibbleLeft === void 0 || nibbleRight === void 0) throw new BaseError$1(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
		bytes[index] = nibbleLeft << 4 | nibbleRight;
	}
	return bytes;
}
/**
* Encodes a string into {@link ox#Bytes.Bytes}.
*
* @example
* ```ts twoslash
* import { Bytes } from 'ox'
*
* const data = Bytes.fromString('Hello world!')
* // @log: Uint8Array([72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 33])
* ```
*
* @example
* ```ts twoslash
* import { Bytes } from 'ox'
*
* const data = Bytes.fromString('Hello world!', { size: 32 })
* // @log: Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
* ```
*
* @param value - String to encode.
* @param options - Encoding options.
* @returns Encoded {@link ox#Bytes.Bytes}.
*/
function fromString$2(value, options = {}) {
	const { size } = options;
	const bytes = encoder$2.encode(value);
	if (typeof size === "number") {
		assertSize$1(bytes, size);
		return padRight$1(bytes, size);
	}
	return bytes;
}
/**
* Pads a {@link ox#Bytes.Bytes} value to the right with zero bytes until it reaches the given `size` (default: 32 bytes).
*
* @example
* ```ts twoslash
* import { Bytes } from 'ox'
*
* Bytes.padRight(Bytes.from([1]), 4)
* // @log: Uint8Array([1, 0, 0, 0])
* ```
*
* @param value - {@link ox#Bytes.Bytes} value to pad.
* @param size - Size to pad the {@link ox#Bytes.Bytes} value to.
* @returns Padded {@link ox#Bytes.Bytes} value.
*/
function padRight$1(value, size) {
	return pad$1(value, {
		dir: "right",
		size
	});
}
/**
* Retrieves the size of a {@link ox#Bytes.Bytes} value.
*
* @example
* ```ts twoslash
* import { Bytes } from 'ox'
*
* Bytes.size(Bytes.from([1, 2, 3, 4]))
* // @log: 4
* ```
*
* @param value - {@link ox#Bytes.Bytes} value.
* @returns Size of the {@link ox#Bytes.Bytes} value.
*/
function size$3(value) {
	return value.length;
}
/**
* Returns a section of a {@link ox#Bytes.Bytes} value given a start/end bytes offset.
*
* @example
* ```ts twoslash
* import { Bytes } from 'ox'
*
* Bytes.slice(
*   Bytes.from([1, 2, 3, 4, 5, 6, 7, 8, 9]),
*   1,
*   4,
* )
* // @log: Uint8Array([2, 3, 4])
* ```
*
* @param value - The {@link ox#Bytes.Bytes} value.
* @param start - Start offset.
* @param end - End offset.
* @param options - Slice options.
* @returns Sliced {@link ox#Bytes.Bytes} value.
*/
function slice$1(value, start, end, options = {}) {
	const { strict } = options;
	assertStartOffset$1(value, start);
	const value_ = value.slice(start, end);
	if (strict) assertEndOffset$1(value_, start, end);
	return value_;
}
/**
* Decodes a {@link ox#Bytes.Bytes} into a bigint.
*
* @example
* ```ts
* import { Bytes } from 'ox'
*
* Bytes.toBigInt(Bytes.from([1, 164]))
* // @log: 420n
* ```
*
* @param bytes - The {@link ox#Bytes.Bytes} to decode.
* @param options - Decoding options.
* @returns Decoded bigint.
*/
function toBigInt$1(bytes, options = {}) {
	const { size } = options;
	if (typeof size !== "undefined") assertSize$1(bytes, size);
	return toBigInt(fromBytes$1(bytes, options), options);
}
/**
* Decodes a {@link ox#Bytes.Bytes} into a boolean.
*
* @example
* ```ts
* import { Bytes } from 'ox'
*
* Bytes.toBoolean(Bytes.from([1]))
* // @log: true
* ```
*
* @param bytes - The {@link ox#Bytes.Bytes} to decode.
* @param options - Decoding options.
* @returns Decoded boolean.
*/
function toBoolean(bytes, options = {}) {
	const { size } = options;
	let bytes_ = bytes;
	if (typeof size !== "undefined") {
		assertSize$1(bytes_, size);
		bytes_ = trimLeft(bytes_);
	}
	if (bytes_.length > 1 || bytes_[0] > 1) throw new InvalidBytesBooleanError(bytes_);
	return Boolean(bytes_[0]);
}
/**
* Decodes a {@link ox#Bytes.Bytes} into a number.
*
* @example
* ```ts twoslash
* import { Bytes } from 'ox'
*
* Bytes.toNumber(Bytes.from([1, 164]))
* // @log: 420
* ```
*/
function toNumber$1(bytes, options = {}) {
	const { size } = options;
	if (typeof size !== "undefined") assertSize$1(bytes, size);
	return toNumber(fromBytes$1(bytes, options), options);
}
/**
* Decodes a {@link ox#Bytes.Bytes} into a string.
*
* @example
* ```ts twoslash
* import { Bytes } from 'ox'
*
* const data = Bytes.toString(Bytes.from([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33]))
* // @log: 'Hello world'
* ```
*
* @param bytes - The {@link ox#Bytes.Bytes} to decode.
* @param options - Options.
* @returns Decoded string.
*/
function toString$1(bytes, options = {}) {
	const { size } = options;
	let bytes_ = bytes;
	if (typeof size !== "undefined") {
		assertSize$1(bytes_, size);
		bytes_ = trimRight(bytes_);
	}
	return decoder$1.decode(bytes_);
}
/**
* Trims leading zeros from a {@link ox#Bytes.Bytes} value.
*
* @example
* ```ts twoslash
* import { Bytes } from 'ox'
*
* Bytes.trimLeft(Bytes.from([0, 0, 0, 0, 1, 2, 3]))
* // @log: Uint8Array([1, 2, 3])
* ```
*
* @param value - {@link ox#Bytes.Bytes} value.
* @returns Trimmed {@link ox#Bytes.Bytes} value.
*/
function trimLeft(value) {
	return trim(value, { dir: "left" });
}
/**
* Trims trailing zeros from a {@link ox#Bytes.Bytes} value.
*
* @example
* ```ts twoslash
* import { Bytes } from 'ox'
*
* Bytes.trimRight(Bytes.from([1, 2, 3, 0, 0, 0, 0]))
* // @log: Uint8Array([1, 2, 3])
* ```
*
* @param value - {@link ox#Bytes.Bytes} value.
* @returns Trimmed {@link ox#Bytes.Bytes} value.
*/
function trimRight(value) {
	return trim(value, { dir: "right" });
}
/**
* Thrown when the bytes value cannot be represented as a boolean.
*
* @example
* ```ts twoslash
* import { Bytes } from 'ox'
*
* Bytes.toBoolean(Bytes.from([5]))
* // @error: Bytes.InvalidBytesBooleanError: Bytes value `[5]` is not a valid boolean.
* // @error: The bytes array must contain a single byte of either a `0` or `1` value.
* ```
*/
var InvalidBytesBooleanError = class extends BaseError$1 {
	constructor(bytes) {
		super(`Bytes value \`${bytes}\` is not a valid boolean.`, { metaMessages: ["The bytes array must contain a single byte of either a `0` or `1` value."] });
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "Bytes.InvalidBytesBooleanError"
		});
	}
};
/**
* Thrown when a size exceeds the maximum allowed size.
*
* @example
* ```ts twoslash
* import { Bytes } from 'ox'
*
* Bytes.fromString('Hello World!', { size: 8 })
* // @error: Bytes.SizeOverflowError: Size cannot exceed `8` bytes. Given size: `12` bytes.
* ```
*/
var SizeOverflowError$1 = class extends BaseError$1 {
	constructor({ givenSize, maxSize }) {
		super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "Bytes.SizeOverflowError"
		});
	}
};
/**
* Thrown when a slice offset is out-of-bounds.
*
* @example
* ```ts twoslash
* import { Bytes } from 'ox'
*
* Bytes.slice(Bytes.from([1, 2, 3]), 4)
* // @error: Bytes.SliceOffsetOutOfBoundsError: Slice starting at offset `4` is out-of-bounds (size: `3`).
* ```
*/
var SliceOffsetOutOfBoundsError$1 = class extends BaseError$1 {
	constructor({ offset, position, size }) {
		super(`Slice ${position === "start" ? "starting" : "ending"} at offset \`${offset}\` is out-of-bounds (size: \`${size}\`).`);
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "Bytes.SliceOffsetOutOfBoundsError"
		});
	}
};
/**
* Thrown when a the padding size exceeds the maximum allowed size.
*
* @example
* ```ts twoslash
* import { Bytes } from 'ox'
*
* Bytes.padLeft(Bytes.fromString('Hello World!'), 8)
* // @error: [Bytes.SizeExceedsPaddingSizeError: Bytes size (`12`) exceeds padding size (`8`).
* ```
*/
var SizeExceedsPaddingSizeError$1 = class extends BaseError$1 {
	constructor({ size, targetSize, type }) {
		super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (\`${size}\`) exceeds padding size (\`${targetSize}\`).`);
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "Bytes.SizeExceedsPaddingSizeError"
		});
	}
};
//#endregion
//#region node_modules/ox/_esm/core/Hex.js
var encoder$1 = /*#__PURE__*/ new TextEncoder();
var hexes = /*#__PURE__*/ Array.from({ length: 256 }, (_v, i) => i.toString(16).padStart(2, "0"));
var hexRegex$1 = /^0x[0-9a-fA-F]*$/;
/**
* Asserts if the given value is {@link ox#Hex.Hex}.
*
* @example
* ```ts twoslash
* import { Hex } from 'ox'
*
* Hex.assert('abc')
* // @error: InvalidHexValueTypeError:
* // @error: Value `"abc"` of type `string` is an invalid hex type.
* // @error: Hex types must be represented as `"0x\${string}"`.
* ```
*
* @param value - The value to assert.
* @param options - Options.
*/
function assert$4(value, options = {}) {
	const { even = false, strict = false } = options;
	if (!value) throw new InvalidHexTypeError(value);
	if (typeof value !== "string") throw new InvalidHexTypeError(value);
	if (strict) {
		if (!hexRegex$1.test(value)) throw new InvalidHexValueError(value);
	}
	if (!value.startsWith("0x")) throw new InvalidHexValueError(value);
	if (even && value.length % 2 !== 0) throw new InvalidLengthError(value);
}
/**
* Concatenates two or more {@link ox#Hex.Hex}.
*
* @example
* ```ts twoslash
* import { Hex } from 'ox'
*
* Hex.concat('0x123', '0x456')
* // @log: '0x123456'
* ```
*
* @param values - The {@link ox#Hex.Hex} values to concatenate.
* @returns The concatenated {@link ox#Hex.Hex} value.
*/
function concat(...values) {
	return `0x${values.reduce((acc, x) => acc + x.replace("0x", ""), "")}`;
}
/**
* Encodes a boolean into a {@link ox#Hex.Hex} value.
*
* @example
* ```ts twoslash
* import { Hex } from 'ox'
*
* Hex.fromBoolean(true)
* // @log: '0x1'
*
* Hex.fromBoolean(false)
* // @log: '0x0'
*
* Hex.fromBoolean(true, { size: 32 })
* // @log: '0x0000000000000000000000000000000000000000000000000000000000000001'
* ```
*
* @param value - The boolean value to encode.
* @param options - Options.
* @returns The encoded {@link ox#Hex.Hex} value.
*/
function fromBoolean(value, options = {}) {
	const hex = `0x${Number(value)}`;
	if (typeof options.size === "number") {
		assertSize(hex, options.size);
		return padLeft(hex, options.size);
	}
	return hex;
}
/**
* Encodes a {@link ox#Bytes.Bytes} value into a {@link ox#Hex.Hex} value.
*
* @example
* ```ts twoslash
* import { Bytes, Hex } from 'ox'
*
* Hex.fromBytes(Bytes.from([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33]))
* // @log: '0x48656c6c6f20576f726c6421'
* ```
*
* @param value - The {@link ox#Bytes.Bytes} value to encode.
* @param options - Options.
* @returns The encoded {@link ox#Hex.Hex} value.
*/
function fromBytes$1(value, options = {}) {
	let string = "";
	for (let i = 0; i < value.length; i++) string += hexes[value[i]];
	const hex = `0x${string}`;
	if (typeof options.size === "number") {
		assertSize(hex, options.size);
		return padRight(hex, options.size);
	}
	return hex;
}
/**
* Encodes a number or bigint into a {@link ox#Hex.Hex} value.
*
* @example
* ```ts twoslash
* import { Hex } from 'ox'
*
* Hex.fromNumber(420)
* // @log: '0x1a4'
*
* Hex.fromNumber(420, { size: 32 })
* // @log: '0x00000000000000000000000000000000000000000000000000000000000001a4'
* ```
*
* @param value - The number or bigint value to encode.
* @param options - Options.
* @returns The encoded {@link ox#Hex.Hex} value.
*/
function fromNumber(value, options = {}) {
	const { signed, size } = options;
	const value_ = BigInt(value);
	let maxValue;
	if (size) {
		if (signed) maxValue = (1n << BigInt(size) * 8n - 1n) - 1n;
		else maxValue = 2n ** (BigInt(size) * 8n) - 1n;
	} else if (typeof value === "number") maxValue = BigInt(Number.MAX_SAFE_INTEGER);
	const minValue = size && typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
	if (maxValue && value_ > maxValue || value_ < minValue) {
		const suffix = typeof value === "bigint" ? "n" : "";
		throw new IntegerOutOfRangeError({
			max: maxValue ? `${maxValue}${suffix}` : void 0,
			min: `${minValue}${suffix}`,
			signed,
			size,
			value: `${value}${suffix}`
		});
	}
	const hex = `0x${(signed && value_ < 0 ? BigInt.asUintN(size * 8, BigInt(value_)) : value_).toString(16)}`;
	if (size) return padLeft(hex, size);
	return hex;
}
/**
* Encodes a string into a {@link ox#Hex.Hex} value.
*
* @example
* ```ts twoslash
* import { Hex } from 'ox'
* Hex.fromString('Hello World!')
* // '0x48656c6c6f20576f726c6421'
*
* Hex.fromString('Hello World!', { size: 32 })
* // '0x48656c6c6f20576f726c64210000000000000000000000000000000000000000'
* ```
*
* @param value - The string value to encode.
* @param options - Options.
* @returns The encoded {@link ox#Hex.Hex} value.
*/
function fromString$1(value, options = {}) {
	return fromBytes$1(encoder$1.encode(value), options);
}
/**
* Pads a {@link ox#Hex.Hex} value to the left with zero bytes until it reaches the given `size` (default: 32 bytes).
*
* @example
* ```ts twoslash
* import { Hex } from 'ox'
*
* Hex.padLeft('0x1234', 4)
* // @log: '0x00001234'
* ```
*
* @param value - The {@link ox#Hex.Hex} value to pad.
* @param size - The size (in bytes) of the output hex value.
* @returns The padded {@link ox#Hex.Hex} value.
*/
function padLeft(value, size) {
	return pad(value, {
		dir: "left",
		size
	});
}
/**
* Pads a {@link ox#Hex.Hex} value to the right with zero bytes until it reaches the given `size` (default: 32 bytes).
*
* @example
* ```ts
* import { Hex } from 'ox'
*
* Hex.padRight('0x1234', 4)
* // @log: '0x12340000'
* ```
*
* @param value - The {@link ox#Hex.Hex} value to pad.
* @param size - The size (in bytes) of the output hex value.
* @returns The padded {@link ox#Hex.Hex} value.
*/
function padRight(value, size) {
	return pad(value, {
		dir: "right",
		size
	});
}
/**
* Returns a section of a {@link ox#Bytes.Bytes} value given a start/end bytes offset.
*
* @example
* ```ts twoslash
* import { Hex } from 'ox'
*
* Hex.slice('0x0123456789', 1, 4)
* // @log: '0x234567'
* ```
*
* @param value - The {@link ox#Hex.Hex} value to slice.
* @param start - The start offset (in bytes).
* @param end - The end offset (in bytes).
* @param options - Options.
* @returns The sliced {@link ox#Hex.Hex} value.
*/
function slice(value, start, end, options = {}) {
	const { strict } = options;
	assertStartOffset(value, start);
	const value_ = `0x${value.replace("0x", "").slice((start ?? 0) * 2, (end ?? value.length) * 2)}`;
	if (strict) assertEndOffset(value_, start, end);
	return value_;
}
/**
* Retrieves the size of a {@link ox#Hex.Hex} value (in bytes).
*
* @example
* ```ts twoslash
* import { Hex } from 'ox'
*
* Hex.size('0xdeadbeef')
* // @log: 4
* ```
*
* @param value - The {@link ox#Hex.Hex} value to get the size of.
* @returns The size of the {@link ox#Hex.Hex} value (in bytes).
*/
function size$2(value) {
	return Math.ceil((value.length - 2) / 2);
}
/**
* Decodes a {@link ox#Hex.Hex} value into a BigInt.
*
* @example
* ```ts twoslash
* import { Hex } from 'ox'
*
* Hex.toBigInt('0x1a4')
* // @log: 420n
*
* Hex.toBigInt('0x00000000000000000000000000000000000000000000000000000000000001a4', { size: 32 })
* // @log: 420n
* ```
*
* @param hex - The {@link ox#Hex.Hex} value to decode.
* @param options - Options.
* @returns The decoded BigInt.
*/
function toBigInt(hex, options = {}) {
	const { signed } = options;
	if (options.size) assertSize(hex, options.size);
	const value = BigInt(hex);
	if (!signed) return value;
	const max_unsigned = (1n << BigInt(size$2(hex)) * 8n) - 1n;
	if (value <= max_unsigned >> 1n) return value;
	return value - max_unsigned - 1n;
}
/**
* Decodes a {@link ox#Hex.Hex} value into a number.
*
* @example
* ```ts twoslash
* import { Hex } from 'ox'
*
* Hex.toNumber('0x1a4')
* // @log: 420
*
* Hex.toNumber('0x00000000000000000000000000000000000000000000000000000000000001a4', { size: 32 })
* // @log: 420
* ```
*
* @param hex - The {@link ox#Hex.Hex} value to decode.
* @param options - Options.
* @returns The decoded number.
*/
function toNumber(hex, options = {}) {
	const { signed, size } = options;
	if (!signed && !size) return Number(hex);
	return Number(toBigInt(hex, options));
}
/**
* Checks if the given value is {@link ox#Hex.Hex}.
*
* @example
* ```ts twoslash
* import { Bytes, Hex } from 'ox'
*
* Hex.validate('0xdeadbeef')
* // @log: true
*
* Hex.validate(Bytes.from([1, 2, 3]))
* // @log: false
* ```
*
* @param value - The value to check.
* @param options - Options.
* @returns `true` if the value is a {@link ox#Hex.Hex}, `false` otherwise.
*/
function validate$3(value, options = {}) {
	const { even = false, strict = false } = options;
	try {
		assert$4(value, {
			even,
			strict
		});
		return true;
	} catch {
		return false;
	}
}
/**
* Thrown when the provided integer is out of range, and cannot be represented as a hex value.
*
* @example
* ```ts twoslash
* import { Hex } from 'ox'
*
* Hex.fromNumber(420182738912731283712937129)
* // @error: Hex.IntegerOutOfRangeError: Number \`4.2018273891273126e+26\` is not in safe unsigned integer range (`0` to `9007199254740991`)
* ```
*/
var IntegerOutOfRangeError = class extends BaseError$1 {
	constructor({ max, min, signed, size, value }) {
		super(`Number \`${value}\` is not in safe${size ? ` ${size * 8}-bit` : ""}${signed ? " signed" : " unsigned"} integer range ${max ? `(\`${min}\` to \`${max}\`)` : `(above \`${min}\`)`}`);
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "Hex.IntegerOutOfRangeError"
		});
	}
};
/**
* Thrown when the provided value is not a valid hex type.
*
* @example
* ```ts twoslash
* import { Hex } from 'ox'
*
* Hex.assert(1)
* // @error: Hex.InvalidHexTypeError: Value `1` of type `number` is an invalid hex type.
* ```
*/
var InvalidHexTypeError = class extends BaseError$1 {
	constructor(value) {
		super(`Value \`${typeof value === "object" ? stringify(value) : value}\` of type \`${typeof value}\` is an invalid hex type.`, { metaMessages: ["Hex types must be represented as `\"0x${string}\"`."] });
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "Hex.InvalidHexTypeError"
		});
	}
};
/**
* Thrown when the provided hex value is invalid.
*
* @example
* ```ts twoslash
* import { Hex } from 'ox'
*
* Hex.assert('0x0123456789abcdefg')
* // @error: Hex.InvalidHexValueError: Value `0x0123456789abcdefg` is an invalid hex value.
* // @error: Hex values must start with `"0x"` and contain only hexadecimal characters (0-9, a-f, A-F).
* ```
*/
var InvalidHexValueError = class extends BaseError$1 {
	constructor(value) {
		super(`Value \`${value}\` is an invalid hex value.`, { metaMessages: ["Hex values must start with `\"0x\"` and contain only hexadecimal characters (0-9, a-f, A-F)."] });
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "Hex.InvalidHexValueError"
		});
	}
};
/**
* Thrown when the provided hex value is an odd length.
*
* @example
* ```ts twoslash
* import { Bytes } from 'ox'
*
* Bytes.fromHex('0xabcde')
* // @error: Hex.InvalidLengthError: Hex value `"0xabcde"` is an odd length (5 nibbles).
* ```
*/
var InvalidLengthError = class extends BaseError$1 {
	constructor(value) {
		super(`Hex value \`"${value}"\` is an odd length (${value.length - 2} nibbles).`, { metaMessages: ["It must be an even length."] });
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "Hex.InvalidLengthError"
		});
	}
};
/**
* Thrown when the size of the value exceeds the expected max size.
*
* @example
* ```ts twoslash
* import { Hex } from 'ox'
*
* Hex.fromString('Hello World!', { size: 8 })
* // @error: Hex.SizeOverflowError: Size cannot exceed `8` bytes. Given size: `12` bytes.
* ```
*/
var SizeOverflowError = class extends BaseError$1 {
	constructor({ givenSize, maxSize }) {
		super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "Hex.SizeOverflowError"
		});
	}
};
/**
* Thrown when the slice offset exceeds the bounds of the value.
*
* @example
* ```ts twoslash
* import { Hex } from 'ox'
*
* Hex.slice('0x0123456789', 6)
* // @error: Hex.SliceOffsetOutOfBoundsError: Slice starting at offset `6` is out-of-bounds (size: `5`).
* ```
*/
var SliceOffsetOutOfBoundsError = class extends BaseError$1 {
	constructor({ offset, position, size }) {
		super(`Slice ${position === "start" ? "starting" : "ending"} at offset \`${offset}\` is out-of-bounds (size: \`${size}\`).`);
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "Hex.SliceOffsetOutOfBoundsError"
		});
	}
};
/**
* Thrown when the size of the value exceeds the pad size.
*
* @example
* ```ts twoslash
* import { Hex } from 'ox'
*
* Hex.padLeft('0x1a4e12a45a21323123aaa87a897a897a898a6567a578a867a98778a667a85a875a87a6a787a65a675a6a9', 32)
* // @error: Hex.SizeExceedsPaddingSizeError: Hex size (`43`) exceeds padding size (`32`).
* ```
*/
var SizeExceedsPaddingSizeError = class extends BaseError$1 {
	constructor({ size, targetSize, type }) {
		super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (\`${size}\`) exceeds padding size (\`${targetSize}\`).`);
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "Hex.SizeExceedsPaddingSizeError"
		});
	}
};
//#endregion
//#region node_modules/ox/_esm/core/Withdrawal.js
/**
* Converts a {@link ox#Withdrawal.Withdrawal} to an {@link ox#Withdrawal.Rpc}.
*
* @example
* ```ts twoslash
* import { Withdrawal } from 'ox'
*
* const withdrawal = Withdrawal.toRpc({
*   address: '0x00000000219ab540356cBB839Cbe05303d7705Fa',
*   amount: 6423331n,
*   index: 0,
*   validatorIndex: 1,
* })
* // @log: {
* // @log:   address: '0x00000000219ab540356cBB839Cbe05303d7705Fa',
* // @log:   amount: '0x620323',
* // @log:   index: '0x0',
* // @log:   validatorIndex: '0x1',
* // @log: }
* ```
*
* @param withdrawal - The Withdrawal to convert.
* @returns An RPC Withdrawal.
*/
function toRpc$1(withdrawal) {
	return {
		address: withdrawal.address,
		amount: fromNumber(withdrawal.amount),
		index: fromNumber(withdrawal.index),
		validatorIndex: fromNumber(withdrawal.validatorIndex)
	};
}
//#endregion
//#region node_modules/ox/_esm/core/BlockOverrides.js
/**
* Converts an {@link ox#BlockOverrides.BlockOverrides} to an {@link ox#BlockOverrides.Rpc}.
*
* @example
* ```ts twoslash
* import { BlockOverrides } from 'ox'
*
* const blockOverrides = BlockOverrides.toRpc({
*   baseFeePerGas: 1n,
*   blobBaseFee: 2n,
*   feeRecipient: '0x0000000000000000000000000000000000000000',
*   gasLimit: 4n,
*   number: 5n,
*   prevRandao: 6n,
*   time: 78187493520n,
*   withdrawals: [
*     {
*       address: '0x0000000000000000000000000000000000000000',
*       amount: 1n,
*       index: 0,
*       validatorIndex: 1,
*     },
*   ],
* })
* ```
*
* @param blockOverrides - The block overrides to convert.
* @returns An instantiated {@link ox#BlockOverrides.Rpc}.
*/
function toRpc(blockOverrides) {
	return {
		...typeof blockOverrides.baseFeePerGas === "bigint" && { baseFeePerGas: fromNumber(blockOverrides.baseFeePerGas) },
		...typeof blockOverrides.blobBaseFee === "bigint" && { blobBaseFee: fromNumber(blockOverrides.blobBaseFee) },
		...typeof blockOverrides.feeRecipient === "string" && { feeRecipient: blockOverrides.feeRecipient },
		...typeof blockOverrides.gasLimit === "bigint" && { gasLimit: fromNumber(blockOverrides.gasLimit) },
		...typeof blockOverrides.number === "bigint" && { number: fromNumber(blockOverrides.number) },
		...typeof blockOverrides.prevRandao === "bigint" && { prevRandao: fromNumber(blockOverrides.prevRandao) },
		...typeof blockOverrides.time === "bigint" && { time: fromNumber(blockOverrides.time) },
		...blockOverrides.withdrawals && { withdrawals: blockOverrides.withdrawals.map(toRpc$1) }
	};
}
//#endregion
//#region node_modules/viem/_esm/constants/contracts.js
var deploylessCallViaBytecodeBytecode = "0x608060405234801561001057600080fd5b5060405161018e38038061018e83398101604081905261002f91610124565b6000808351602085016000f59050803b61004857600080fd5b6000808351602085016000855af16040513d6000823e81610067573d81fd5b3d81f35b634e487b7160e01b600052604160045260246000fd5b600082601f83011261009257600080fd5b81516001600160401b038111156100ab576100ab61006b565b604051601f8201601f19908116603f011681016001600160401b03811182821017156100d9576100d961006b565b6040528181528382016020018510156100f157600080fd5b60005b82811015610110576020818601810151838301820152016100f4565b506000918101602001919091529392505050565b6000806040838503121561013757600080fd5b82516001600160401b0381111561014d57600080fd5b61015985828601610081565b602085015190935090506001600160401b0381111561017757600080fd5b61018385828601610081565b915050925092905056fe";
var deploylessCallViaFactoryBytecode = "0x608060405234801561001057600080fd5b506040516102c03803806102c083398101604081905261002f916101e6565b836001600160a01b03163b6000036100e457600080836001600160a01b03168360405161005c9190610270565b6000604051808303816000865af19150503d8060008114610099576040519150601f19603f3d011682016040523d82523d6000602084013e61009e565b606091505b50915091508115806100b857506001600160a01b0386163b155b156100e1578060405163101bb98d60e01b81526004016100d8919061028c565b60405180910390fd5b50505b6000808451602086016000885af16040513d6000823e81610103573d81fd5b3d81f35b80516001600160a01b038116811461011e57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561015457818101518382015260200161013c565b50506000910152565b600082601f83011261016e57600080fd5b81516001600160401b0381111561018757610187610123565b604051601f8201601f19908116603f011681016001600160401b03811182821017156101b5576101b5610123565b6040528181528382016020018510156101cd57600080fd5b6101de826020830160208701610139565b949350505050565b600080600080608085870312156101fc57600080fd5b61020585610107565b60208601519094506001600160401b0381111561022157600080fd5b61022d8782880161015d565b93505061023c60408601610107565b60608601519092506001600160401b0381111561025857600080fd5b6102648782880161015d565b91505092959194509250565b60008251610282818460208701610139565b9190910192915050565b60208152600082518060208401526102ab816040850160208701610139565b601f01601f1916919091016040019291505056fe";
var erc6492SignatureValidatorByteCode = "0x608060405234801561001057600080fd5b506040516106ad3803806106ad83398101604081905261002f91610537565b600061003c848484610048565b9050806000526001601ff35b60007f649264926492649264926492649264926492649264926492649264926492649261007483610425565b036101e7576000606080848060200190518101906100929190610590565b60405192955090935091506000906001600160a01b038516906100b69085906105f6565b6000604051808303816000865af19150503d80600081146100f3576040519150601f19603f3d011682016040523d82523d6000602084013e6100f8565b606091505b50509050876001600160a01b03163b60000361016057806101605760405162461bcd60e51b815260206004820152601e60248201527f5369676e617475726556616c696461746f723a206465706c6f796d656e74000060448201526064015b60405180910390fd5b604051630b135d3f60e11b808252906001600160a01b038a1690631626ba7e90610190908b908790600401610612565b602060405180830381865afa1580156101ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101d1919061064c565b6001600160e01b0319161494505050505061041e565b6001600160a01b0384163b1561027a57604051630b135d3f60e11b808252906001600160a01b03861690631626ba7e906102279087908790600401610612565b602060405180830381865afa158015610244573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610268919061064c565b6001600160e01b03191614905061041e565b81516041146102df5760405162461bcd60e51b815260206004820152603a602482015260008051602061068d83398151915260448201527f3a20696e76616c6964207369676e6174757265206c656e6774680000000000006064820152608401610157565b6102e761043e565b5060208201516040808401518451859392600091859190811061030c5761030c610676565b016020015160f81c9050601b811480159061032b57508060ff16601c14155b1561038c5760405162461bcd60e51b815260206004820152603b602482015260008051602061068d83398151915260448201527f3a20696e76616c6964207369676e617475726520762076616c756500000000006064820152608401610157565b604080516000808252602082018084528a905260ff841692820192909252606081018590526080810184905260019060a0016020604051602081039080840390855afa1580156103e0573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116158015906104165750886001600160a01b0316816001600160a01b0316145b955050505050505b9392505050565b600060208251101561043657600080fd5b508051015190565b60405180606001604052806003906020820280368337509192915050565b6001600160a01b038116811461047157600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b60005b838110156104a557818101518382015260200161048d565b50506000910152565b600082601f8301126104bf57600080fd5b81516001600160401b038111156104d8576104d8610474565b604051601f8201601f19908116603f011681016001600160401b038111828210171561050657610506610474565b60405281815283820160200185101561051e57600080fd5b61052f82602083016020870161048a565b949350505050565b60008060006060848603121561054c57600080fd5b83516105578161045c565b6020850151604086015191945092506001600160401b0381111561057a57600080fd5b610586868287016104ae565b9150509250925092565b6000806000606084860312156105a557600080fd5b83516105b08161045c565b60208501519093506001600160401b038111156105cc57600080fd5b6105d8868287016104ae565b604086015190935090506001600160401b0381111561057a57600080fd5b6000825161060881846020870161048a565b9190910192915050565b828152604060208201526000825180604084015261063781606085016020870161048a565b601f01601f1916919091016060019392505050565b60006020828403121561065e57600080fd5b81516001600160e01b03198116811461041e57600080fd5b634e487b7160e01b600052603260045260246000fdfe5369676e617475726556616c696461746f72237265636f7665725369676e6572";
var multicall3Bytecode = "0x608060405234801561001057600080fd5b506115b9806100206000396000f3fe6080604052600436106100f35760003560e01c80634d2301cc1161008a578063a8b0574e11610059578063a8b0574e14610325578063bce38bd714610350578063c3077fa914610380578063ee82ac5e146103b2576100f3565b80634d2301cc1461026257806372425d9d1461029f57806382ad56cb146102ca57806386d516e8146102fa576100f3565b80633408e470116100c65780633408e470146101af578063399542e9146101da5780633e64a6961461020c57806342cbb15c14610237576100f3565b80630f28c97d146100f8578063174dea7114610123578063252dba421461015357806327e86d6e14610184575b600080fd5b34801561010457600080fd5b5061010d6103ef565b60405161011a9190610c0a565b60405180910390f35b61013d60048036038101906101389190610c94565b6103f7565b60405161014a9190610e94565b60405180910390f35b61016d60048036038101906101689190610f0c565b610615565b60405161017b92919061101b565b60405180910390f35b34801561019057600080fd5b506101996107ab565b6040516101a69190611064565b60405180910390f35b3480156101bb57600080fd5b506101c46107b7565b6040516101d19190610c0a565b60405180910390f35b6101f460048036038101906101ef91906110ab565b6107bf565b6040516102039392919061110b565b60405180910390f35b34801561021857600080fd5b506102216107e1565b60405161022e9190610c0a565b60405180910390f35b34801561024357600080fd5b5061024c6107e9565b6040516102599190610c0a565b60405180910390f35b34801561026e57600080fd5b50610289600480360381019061028491906111a7565b6107f1565b6040516102969190610c0a565b60405180910390f35b3480156102ab57600080fd5b506102b4610812565b6040516102c19190610c0a565b60405180910390f35b6102e460048036038101906102df919061122a565b61081a565b6040516102f19190610e94565b60405180910390f35b34801561030657600080fd5b5061030f6109e4565b60405161031c9190610c0a565b60405180910390f35b34801561033157600080fd5b5061033a6109ec565b6040516103479190611286565b60405180910390f35b61036a600480360381019061036591906110ab565b6109f4565b6040516103779190610e94565b60405180910390f35b61039a60048036038101906103959190610f0c565b610ba6565b6040516103a99392919061110b565b60405180910390f35b3480156103be57600080fd5b506103d960048036038101906103d491906112cd565b610bca565b6040516103e69190611064565b60405180910390f35b600042905090565b60606000808484905090508067ffffffffffffffff81111561041c5761041b6112fa565b5b60405190808252806020026020018201604052801561045557816020015b610442610bd5565b81526020019060019003908161043a5790505b5092503660005b828110156105c957600085828151811061047957610478611329565b5b6020026020010151905087878381811061049657610495611329565b5b90506020028101906104a89190611367565b925060008360400135905080860195508360000160208101906104cb91906111a7565b73ffffffffffffffffffffffffffffffffffffffff16818580606001906104f2919061138f565b604051610500929190611431565b60006040518083038185875af1925050503d806000811461053d576040519150601f19603f3d011682016040523d82523d6000602084013e610542565b606091505b5083600001846020018290528215151515815250505081516020850135176105bc577f08c379a000000000000000000000000000000000000000000000000000000000600052602060045260176024527f4d756c746963616c6c333a2063616c6c206661696c656400000000000000000060445260846000fd5b826001019250505061045c565b5082341461060c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610603906114a7565b60405180910390fd5b50505092915050565b6000606043915060008484905090508067ffffffffffffffff81111561063e5761063d6112fa565b5b60405190808252806020026020018201604052801561067157816020015b606081526020019060019003908161065c5790505b5091503660005b828110156107a157600087878381811061069557610694611329565b5b90506020028101906106a791906114c7565b92508260000160208101906106bc91906111a7565b73ffffffffffffffffffffffffffffffffffffffff168380602001906106e2919061138f565b6040516106f0929190611431565b6000604051808303816000865af19150503d806000811461072d576040519150601f19603f3d011682016040523d82523d6000602084013e610732565b606091505b5086848151811061074657610745611329565b5b60200260200101819052819250505080610795576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078c9061153b565b60405180910390fd5b81600101915050610678565b5050509250929050565b60006001430340905090565b600046905090565b6000806060439250434091506107d68686866109f4565b905093509350939050565b600048905090565b600043905090565b60008173ffffffffffffffffffffffffffffffffffffffff16319050919050565b600044905090565b606060008383905090508067ffffffffffffffff81111561083e5761083d6112fa565b5b60405190808252806020026020018201604052801561087757816020015b610864610bd5565b81526020019060019003908161085c5790505b5091503660005b828110156109db57600084828151811061089b5761089a611329565b5b602002602001015190508686838181106108b8576108b7611329565b5b90506020028101906108ca919061155b565b92508260000160208101906108df91906111a7565b73ffffffffffffffffffffffffffffffffffffffff16838060400190610905919061138f565b604051610913929190611431565b6000604051808303816000865af19150503d8060008114610950576040519150601f19603f3d011682016040523d82523d6000602084013e610955565b606091505b5082600001836020018290528215151515815250505080516020840135176109cf577f08c379a000000000000000000000000000000000000000000000000000000000600052602060045260176024527f4d756c746963616c6c333a2063616c6c206661696c656400000000000000000060445260646000fd5b8160010191505061087e565b50505092915050565b600045905090565b600041905090565b606060008383905090508067ffffffffffffffff811115610a1857610a176112fa565b5b604051908082528060200260200182016040528015610a5157816020015b610a3e610bd5565b815260200190600190039081610a365790505b5091503660005b82811015610b9c576000848281518110610a7557610a74611329565b5b60200260200101519050868683818110610a9257610a91611329565b5b9050602002810190610aa491906114c7565b9250826000016020810190610ab991906111a7565b73ffffffffffffffffffffffffffffffffffffffff16838060200190610adf919061138f565b604051610aed929190611431565b6000604051808303816000865af19150503d8060008114610b2a576040519150601f19603f3d011682016040523d82523d6000602084013e610b2f565b606091505b508260000183602001829052821515151581525050508715610b90578060000151610b8f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b869061153b565b60405180910390fd5b5b81600101915050610a58565b5050509392505050565b6000806060610bb7600186866107bf565b8093508194508295505050509250925092565b600081409050919050565b6040518060400160405280600015158152602001606081525090565b6000819050919050565b610c0481610bf1565b82525050565b6000602082019050610c1f6000830184610bfb565b92915050565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b60008083601f840112610c5457610c53610c2f565b5b8235905067ffffffffffffffff811115610c7157610c70610c34565b5b602083019150836020820283011115610c8d57610c8c610c39565b5b9250929050565b60008060208385031215610cab57610caa610c25565b5b600083013567ffffffffffffffff811115610cc957610cc8610c2a565b5b610cd585828601610c3e565b92509250509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b60008115159050919050565b610d2281610d0d565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610d62578082015181840152602081019050610d47565b83811115610d71576000848401525b50505050565b6000601f19601f8301169050919050565b6000610d9382610d28565b610d9d8185610d33565b9350610dad818560208601610d44565b610db681610d77565b840191505092915050565b6000604083016000830151610dd96000860182610d19565b5060208301518482036020860152610df18282610d88565b9150508091505092915050565b6000610e0a8383610dc1565b905092915050565b6000602082019050919050565b6000610e2a82610ce1565b610e348185610cec565b935083602082028501610e4685610cfd565b8060005b85811015610e825784840389528151610e638582610dfe565b9450610e6e83610e12565b925060208a01995050600181019050610e4a565b50829750879550505050505092915050565b60006020820190508181036000830152610eae8184610e1f565b905092915050565b60008083601f840112610ecc57610ecb610c2f565b5b8235905067ffffffffffffffff811115610ee957610ee8610c34565b5b602083019150836020820283011115610f0557610f04610c39565b5b9250929050565b60008060208385031215610f2357610f22610c25565b5b600083013567ffffffffffffffff811115610f4157610f40610c2a565b5b610f4d85828601610eb6565b92509250509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6000610f918383610d88565b905092915050565b6000602082019050919050565b6000610fb182610f59565b610fbb8185610f64565b935083602082028501610fcd85610f75565b8060005b858110156110095784840389528151610fea8582610f85565b9450610ff583610f99565b925060208a01995050600181019050610fd1565b50829750879550505050505092915050565b60006040820190506110306000830185610bfb565b81810360208301526110428184610fa6565b90509392505050565b6000819050919050565b61105e8161104b565b82525050565b60006020820190506110796000830184611055565b92915050565b61108881610d0d565b811461109357600080fd5b50565b6000813590506110a58161107f565b92915050565b6000806000604084860312156110c4576110c3610c25565b5b60006110d286828701611096565b935050602084013567ffffffffffffffff8111156110f3576110f2610c2a565b5b6110ff86828701610eb6565b92509250509250925092565b60006060820190506111206000830186610bfb565b61112d6020830185611055565b818103604083015261113f8184610e1f565b9050949350505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061117482611149565b9050919050565b61118481611169565b811461118f57600080fd5b50565b6000813590506111a18161117b565b92915050565b6000602082840312156111bd576111bc610c25565b5b60006111cb84828501611192565b91505092915050565b60008083601f8401126111ea576111e9610c2f565b5b8235905067ffffffffffffffff81111561120757611206610c34565b5b60208301915083602082028301111561122357611222610c39565b5b9250929050565b6000806020838503121561124157611240610c25565b5b600083013567ffffffffffffffff81111561125f5761125e610c2a565b5b61126b858286016111d4565b92509250509250929050565b61128081611169565b82525050565b600060208201905061129b6000830184611277565b92915050565b6112aa81610bf1565b81146112b557600080fd5b50565b6000813590506112c7816112a1565b92915050565b6000602082840312156112e3576112e2610c25565b5b60006112f1848285016112b8565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600080fd5b600080fd5b600080fd5b60008235600160800383360303811261138357611382611358565b5b80830191505092915050565b600080833560016020038436030381126113ac576113ab611358565b5b80840192508235915067ffffffffffffffff8211156113ce576113cd61135d565b5b6020830192506001820236038313156113ea576113e9611362565b5b509250929050565b600081905092915050565b82818337600083830152505050565b600061141883856113f2565b93506114258385846113fd565b82840190509392505050565b600061143e82848661140c565b91508190509392505050565b600082825260208201905092915050565b7f4d756c746963616c6c333a2076616c7565206d69736d61746368000000000000600082015250565b6000611491601a8361144a565b915061149c8261145b565b602082019050919050565b600060208201905081810360008301526114c081611484565b9050919050565b6000823560016040038336030381126114e3576114e2611358565b5b80830191505092915050565b7f4d756c746963616c6c333a2063616c6c206661696c6564000000000000000000600082015250565b600061152560178361144a565b9150611530826114ef565b602082019050919050565b6000602082019050818103600083015261155481611518565b9050919050565b60008235600160600383360303811261157757611576611358565b5b8083019150509291505056fea264697066735822122020c1bc9aacf8e4a6507193432a895a8e77094f45a1395583f07b24e860ef06cd64736f6c634300080c0033";
//#endregion
//#region node_modules/viem/_esm/utils/abi/encodeDeployData.js
var docsPath$2 = "/docs/contract/encodeDeployData";
function encodeDeployData(parameters) {
	const { abi, args, bytecode } = parameters;
	if (!args || args.length === 0) return bytecode;
	const description = abi.find((x) => "type" in x && x.type === "constructor");
	if (!description) throw new AbiConstructorNotFoundError({ docsPath: docsPath$2 });
	if (!("inputs" in description)) throw new AbiConstructorParamsNotFoundError({ docsPath: docsPath$2 });
	if (!description.inputs || description.inputs.length === 0) throw new AbiConstructorParamsNotFoundError({ docsPath: docsPath$2 });
	return concatHex([bytecode, encodeAbiParameters(description.inputs, args)]);
}
//#endregion
//#region node_modules/viem/_esm/utils/address/isAddressEqual.js
function isAddressEqual(a, b) {
	if (!isAddress(a, { strict: false })) throw new InvalidAddressError$1({ address: a });
	if (!isAddress(b, { strict: false })) throw new InvalidAddressError$1({ address: b });
	return a.toLowerCase() === b.toLowerCase();
}
//#endregion
//#region node_modules/viem/_esm/utils/block/formatBlockParameter.js
/**
* Formats block parameters for RPC calls according to EIP-1898.
*
* @param parameters - Block parameters
* @returns Formatted block parameter for RPC call
*
* @example
* // Using block tag
* formatBlockParameter({ blockTag: 'latest' })
* // => 'latest'
*
* @example
* // Using block number
* formatBlockParameter({ blockNumber: 69420n })
* // => '0x10f2c'
*
* @example
* // Using block hash (EIP-1898)
* formatBlockParameter({ blockHash: '0x...' })
* // => { blockHash: '0x...' }
*
* @example
* // Using block hash with requireCanonical (EIP-1898)
* formatBlockParameter({ blockHash: '0x...', requireCanonical: true })
* // => { blockHash: '0x...', requireCanonical: true }
*/
function formatBlockParameter(parameters) {
	const { blockHash, blockNumber, blockTag, requireCanonical } = parameters;
	if (requireCanonical !== void 0 && !blockHash) throw new BaseError$3("`requireCanonical` can only be provided when `blockHash` is set.");
	if (blockHash) return requireCanonical ? {
		blockHash,
		requireCanonical
	} : { blockHash };
	if (typeof blockNumber === "bigint") return numberToHex(blockNumber);
	return blockTag ?? "latest";
}
//#endregion
//#region node_modules/viem/_esm/errors/node.js
var ExecutionRevertedError = class extends BaseError$3 {
	static code = 3;
	static nodeMessage = /execution reverted|gas required exceeds allowance/;
	constructor({ cause, message } = {}) {
		const reason = message?.replace("execution reverted: ", "")?.replace("execution reverted", "");
		super(`Execution reverted ${reason ? `with reason: ${reason}` : "for an unknown reason"}.`, {
			cause,
			name: "ExecutionRevertedError"
		});
	}
};
var FeeCapTooHighError = class extends BaseError$3 {
	static nodeMessage = /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/;
	constructor({ cause, maxFeePerGas } = {}) {
		super(`The fee cap (\`maxFeePerGas\`${typeof maxFeePerGas === "bigint" ? ` = ${formatGwei(maxFeePerGas)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`, {
			cause,
			name: "FeeCapTooHighError"
		});
	}
};
var FeeCapTooLowError = class extends BaseError$3 {
	static nodeMessage = /max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/;
	constructor({ cause, maxFeePerGas } = {}) {
		super(`The fee cap (\`maxFeePerGas\`${typeof maxFeePerGas === "bigint" ? ` = ${formatGwei(maxFeePerGas)} gwei` : ""}) cannot be lower than the block base fee.`, {
			cause,
			name: "FeeCapTooLowError"
		});
	}
};
var NonceTooHighError = class extends BaseError$3 {
	static nodeMessage = /nonce too high/;
	constructor({ cause, nonce } = {}) {
		super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is higher than the next one expected.`, {
			cause,
			name: "NonceTooHighError"
		});
	}
};
var NonceTooLowError = class extends BaseError$3 {
	static nodeMessage = /nonce too low|transaction already imported|already known/;
	constructor({ cause, nonce } = {}) {
		super([`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is lower than the current nonce of the account.`, "Try increasing the nonce or find the latest nonce with `getTransactionCount`."].join("\n"), {
			cause,
			name: "NonceTooLowError"
		});
	}
};
var NonceMaxValueError = class extends BaseError$3 {
	static nodeMessage = /nonce has max value/;
	constructor({ cause, nonce } = {}) {
		super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}exceeds the maximum allowed nonce.`, {
			cause,
			name: "NonceMaxValueError"
		});
	}
};
var InsufficientFundsError = class extends BaseError$3 {
	static nodeMessage = /insufficient funds|exceeds transaction sender account balance|outoffunds/;
	constructor({ cause } = {}) {
		super(["The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account."].join("\n"), {
			cause,
			metaMessages: [
				"This error could arise when the account does not have enough funds to:",
				" - pay for the total gas fee,",
				" - pay for the value to send.",
				" ",
				"The cost of the transaction is calculated as `gas * gas fee + value`, where:",
				" - `gas` is the amount of gas needed for transaction to execute,",
				" - `gas fee` is the gas fee,",
				" - `value` is the amount of ether to send to the recipient."
			],
			name: "InsufficientFundsError"
		});
	}
};
var IntrinsicGasTooHighError = class extends BaseError$3 {
	static nodeMessage = /intrinsic gas too high|gas limit reached/;
	constructor({ cause, gas } = {}) {
		super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction exceeds the limit allowed for the block.`, {
			cause,
			name: "IntrinsicGasTooHighError"
		});
	}
};
var IntrinsicGasTooLowError = class extends BaseError$3 {
	static nodeMessage = /intrinsic gas too low/;
	constructor({ cause, gas } = {}) {
		super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction is too low.`, {
			cause,
			name: "IntrinsicGasTooLowError"
		});
	}
};
var TransactionTypeNotSupportedError = class extends BaseError$3 {
	static nodeMessage = /transaction type not valid/;
	constructor({ cause }) {
		super("The transaction type is not supported for this chain.", {
			cause,
			name: "TransactionTypeNotSupportedError"
		});
	}
};
var TipAboveFeeCapError = class extends BaseError$3 {
	static nodeMessage = /max priority fee per gas higher than max fee per gas|tip higher than fee cap/;
	constructor({ cause, maxPriorityFeePerGas, maxFeePerGas } = {}) {
		super([`The provided tip (\`maxPriorityFeePerGas\`${typeof maxPriorityFeePerGas === "bigint" ? ` = ${formatGwei(maxPriorityFeePerGas)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${typeof maxFeePerGas === "bigint" ? ` = ${formatGwei(maxFeePerGas)} gwei` : ""}).`].join("\n"), {
			cause,
			name: "TipAboveFeeCapError"
		});
	}
};
var UnknownNodeError = class extends BaseError$3 {
	constructor({ cause }) {
		super(`An error occurred while executing: ${cause?.shortMessage}`, {
			cause,
			name: "UnknownNodeError"
		});
	}
};
//#endregion
//#region node_modules/viem/_esm/utils/errors/getNodeError.js
function getNodeError(err, args) {
	const message = (err.details || "").toLowerCase();
	const executionRevertedError = err instanceof BaseError$3 ? err.walk((e) => e?.code === ExecutionRevertedError.code) : err;
	if (executionRevertedError instanceof BaseError$3) return new ExecutionRevertedError({
		cause: err,
		message: executionRevertedError.details
	});
	if (ExecutionRevertedError.nodeMessage.test(message)) return new ExecutionRevertedError({
		cause: err,
		message: err.details
	});
	if (FeeCapTooHighError.nodeMessage.test(message)) return new FeeCapTooHighError({
		cause: err,
		maxFeePerGas: args?.maxFeePerGas
	});
	if (FeeCapTooLowError.nodeMessage.test(message)) return new FeeCapTooLowError({
		cause: err,
		maxFeePerGas: args?.maxFeePerGas
	});
	if (NonceTooHighError.nodeMessage.test(message)) return new NonceTooHighError({
		cause: err,
		nonce: args?.nonce
	});
	if (NonceTooLowError.nodeMessage.test(message)) return new NonceTooLowError({
		cause: err,
		nonce: args?.nonce
	});
	if (NonceMaxValueError.nodeMessage.test(message)) return new NonceMaxValueError({
		cause: err,
		nonce: args?.nonce
	});
	if (InsufficientFundsError.nodeMessage.test(message)) return new InsufficientFundsError({ cause: err });
	if (IntrinsicGasTooHighError.nodeMessage.test(message)) return new IntrinsicGasTooHighError({
		cause: err,
		gas: args?.gas
	});
	if (IntrinsicGasTooLowError.nodeMessage.test(message)) return new IntrinsicGasTooLowError({
		cause: err,
		gas: args?.gas
	});
	if (TransactionTypeNotSupportedError.nodeMessage.test(message)) return new TransactionTypeNotSupportedError({ cause: err });
	if (TipAboveFeeCapError.nodeMessage.test(message)) return new TipAboveFeeCapError({
		cause: err,
		maxFeePerGas: args?.maxFeePerGas,
		maxPriorityFeePerGas: args?.maxPriorityFeePerGas
	});
	return new UnknownNodeError({ cause: err });
}
//#endregion
//#region node_modules/viem/_esm/utils/errors/getCallError.js
function getCallError(err, { docsPath, ...args }) {
	return new CallExecutionError((() => {
		const cause = getNodeError(err, args);
		if (cause instanceof UnknownNodeError) return err;
		return cause;
	})(), {
		docsPath,
		...args
	});
}
//#endregion
//#region node_modules/viem/_esm/utils/formatters/extract.js
/**
* @description Picks out the keys from `value` that exist in the formatter..
*/
function extract(value_, { format }) {
	if (!format) return {};
	const value = {};
	function extract_(formatted) {
		const keys = Object.keys(formatted);
		for (const key of keys) {
			if (key in value_) value[key] = value_[key];
			if (formatted[key] && typeof formatted[key] === "object" && !Array.isArray(formatted[key])) extract_(formatted[key]);
		}
	}
	extract_(format(value_ || {}));
	return value;
}
//#endregion
//#region node_modules/viem/_esm/utils/formatters/transactionRequest.js
var rpcTransactionType = {
	legacy: "0x0",
	eip2930: "0x1",
	eip1559: "0x2",
	eip4844: "0x3",
	eip7702: "0x4"
};
function formatTransactionRequest(request, _) {
	const rpcRequest = {};
	if (typeof request.authorizationList !== "undefined") rpcRequest.authorizationList = formatAuthorizationList$1(request.authorizationList);
	if (typeof request.accessList !== "undefined") rpcRequest.accessList = request.accessList;
	if (typeof request.blobVersionedHashes !== "undefined") rpcRequest.blobVersionedHashes = request.blobVersionedHashes;
	if (typeof request.blobs !== "undefined") {
		if (typeof request.blobs[0] !== "string") rpcRequest.blobs = request.blobs.map((x) => bytesToHex(x));
		else rpcRequest.blobs = request.blobs;
	}
	if (typeof request.data !== "undefined") rpcRequest.data = request.data;
	if (request.account) rpcRequest.from = request.account.address;
	if (typeof request.from !== "undefined") rpcRequest.from = request.from;
	if (typeof request.gas !== "undefined") rpcRequest.gas = numberToHex(request.gas);
	if (typeof request.gasPrice !== "undefined") rpcRequest.gasPrice = numberToHex(request.gasPrice);
	if (typeof request.maxFeePerBlobGas !== "undefined") rpcRequest.maxFeePerBlobGas = numberToHex(request.maxFeePerBlobGas);
	if (typeof request.maxFeePerGas !== "undefined") rpcRequest.maxFeePerGas = numberToHex(request.maxFeePerGas);
	if (typeof request.maxPriorityFeePerGas !== "undefined") rpcRequest.maxPriorityFeePerGas = numberToHex(request.maxPriorityFeePerGas);
	if (typeof request.nonce !== "undefined") rpcRequest.nonce = numberToHex(request.nonce);
	if (typeof request.to !== "undefined") rpcRequest.to = request.to;
	if (typeof request.type !== "undefined") rpcRequest.type = rpcTransactionType[request.type];
	if (typeof request.value !== "undefined") rpcRequest.value = numberToHex(request.value);
	return rpcRequest;
}
function formatAuthorizationList$1(authorizationList) {
	return authorizationList.map((authorization) => ({
		address: authorization.address,
		r: authorization.r ? numberToHex(BigInt(authorization.r)) : authorization.r,
		s: authorization.s ? numberToHex(BigInt(authorization.s)) : authorization.s,
		chainId: numberToHex(authorization.chainId),
		nonce: numberToHex(authorization.nonce),
		...typeof authorization.yParity !== "undefined" ? { yParity: numberToHex(authorization.yParity) } : {},
		...typeof authorization.v !== "undefined" && typeof authorization.yParity === "undefined" ? { v: numberToHex(authorization.v) } : {}
	}));
}
//#endregion
//#region node_modules/viem/_esm/utils/promise/withResolvers.js
/** @internal */
function withResolvers() {
	let resolve = () => void 0;
	let reject = () => void 0;
	return {
		promise: new Promise((resolve_, reject_) => {
			resolve = resolve_;
			reject = reject_;
		}),
		resolve,
		reject
	};
}
//#endregion
//#region node_modules/viem/_esm/utils/promise/createBatchScheduler.js
var schedulerCache = /*#__PURE__*/ new Map();
var timerCache = /*#__PURE__*/ new Map();
/** @internal */
function createBatchScheduler({ fn, getSize = () => 1, id, shouldSplitBatch, wait = 0, sort }) {
	const exec = async () => {
		const scheduler = schedulerCache.get(id)?.items ?? [];
		flush();
		const args = scheduler.map(({ args }) => args);
		if (args.length === 0) return;
		new Promise((resolve) => resolve(fn(args))).then((data) => {
			if (sort && Array.isArray(data)) data.sort(sort);
			for (let i = 0; i < scheduler.length; i++) {
				const { resolve } = scheduler[i];
				resolve?.([data[i], data]);
			}
		}).catch((err) => {
			for (let i = 0; i < scheduler.length; i++) {
				const { reject } = scheduler[i];
				reject?.(err);
			}
		});
	};
	const flush = () => {
		clearTimeout(timerCache.get(id));
		timerCache.delete(id);
		schedulerCache.delete(id);
	};
	return {
		flush,
		async schedule(args) {
			const { promise, resolve, reject } = withResolvers();
			const size = getSize(args);
			const queued = schedulerCache.get(id);
			if (queued && shouldSplitBatch?.(queued.size + size)) exec();
			const scheduler = schedulerCache.get(id);
			if (scheduler) {
				scheduler.items.push({
					args,
					resolve,
					reject
				});
				scheduler.size += size;
				return promise;
			}
			schedulerCache.set(id, {
				items: [{
					args,
					resolve,
					reject
				}],
				size
			});
			timerCache.set(id, setTimeout(exec, wait));
			return promise;
		}
	};
}
//#endregion
//#region node_modules/viem/_esm/utils/stateOverride.js
/** @internal */
function serializeStateMapping(stateMapping) {
	if (!stateMapping || stateMapping.length === 0) return void 0;
	return stateMapping.reduce((acc, { slot, value }) => {
		if (slot.length !== 66) throw new InvalidBytesLengthError({
			size: slot.length,
			targetSize: 66,
			type: "hex"
		});
		if (value.length !== 66) throw new InvalidBytesLengthError({
			size: value.length,
			targetSize: 66,
			type: "hex"
		});
		acc[slot] = value;
		return acc;
	}, {});
}
/** @internal */
function serializeAccountStateOverride(parameters) {
	const { balance, nonce, state, stateDiff, code } = parameters;
	const rpcAccountStateOverride = {};
	if (code !== void 0) rpcAccountStateOverride.code = code;
	if (balance !== void 0) rpcAccountStateOverride.balance = numberToHex(balance);
	if (nonce !== void 0) rpcAccountStateOverride.nonce = numberToHex(nonce);
	if (state !== void 0) rpcAccountStateOverride.state = serializeStateMapping(state);
	if (stateDiff !== void 0) {
		if (rpcAccountStateOverride.state) throw new StateAssignmentConflictError();
		rpcAccountStateOverride.stateDiff = serializeStateMapping(stateDiff);
	}
	return rpcAccountStateOverride;
}
/** @internal */
function serializeStateOverride(parameters) {
	if (!parameters) return void 0;
	const rpcStateOverride = {};
	const addresses = /* @__PURE__ */ new Set();
	for (const { address, ...accountState } of parameters) {
		if (!isAddress(address, { strict: false })) throw new InvalidAddressError$1({ address });
		const key = address.toLowerCase();
		if (addresses.has(key)) throw new AccountStateConflictError({ address });
		addresses.add(key);
		rpcStateOverride[address] = serializeAccountStateOverride(accountState);
	}
	return rpcStateOverride;
}
2n ** (8n - 1n) - 1n;
2n ** (16n - 1n) - 1n;
2n ** (24n - 1n) - 1n;
2n ** (32n - 1n) - 1n;
2n ** (40n - 1n) - 1n;
2n ** (48n - 1n) - 1n;
2n ** (56n - 1n) - 1n;
2n ** (64n - 1n) - 1n;
2n ** (72n - 1n) - 1n;
2n ** (80n - 1n) - 1n;
2n ** (88n - 1n) - 1n;
2n ** (96n - 1n) - 1n;
2n ** (104n - 1n) - 1n;
2n ** (112n - 1n) - 1n;
2n ** (120n - 1n) - 1n;
2n ** (128n - 1n) - 1n;
2n ** (136n - 1n) - 1n;
2n ** (144n - 1n) - 1n;
2n ** (152n - 1n) - 1n;
2n ** (160n - 1n) - 1n;
2n ** (168n - 1n) - 1n;
2n ** (176n - 1n) - 1n;
2n ** (184n - 1n) - 1n;
2n ** (192n - 1n) - 1n;
2n ** (200n - 1n) - 1n;
2n ** (208n - 1n) - 1n;
2n ** (216n - 1n) - 1n;
2n ** (224n - 1n) - 1n;
2n ** (232n - 1n) - 1n;
2n ** (240n - 1n) - 1n;
2n ** (248n - 1n) - 1n;
2n ** (256n - 1n) - 1n;
-(2n ** (8n - 1n));
-(2n ** (16n - 1n));
-(2n ** (24n - 1n));
-(2n ** (32n - 1n));
-(2n ** (40n - 1n));
-(2n ** (48n - 1n));
-(2n ** (56n - 1n));
-(2n ** (64n - 1n));
-(2n ** (72n - 1n));
-(2n ** (80n - 1n));
-(2n ** (88n - 1n));
-(2n ** (96n - 1n));
-(2n ** (104n - 1n));
-(2n ** (112n - 1n));
-(2n ** (120n - 1n));
-(2n ** (128n - 1n));
-(2n ** (136n - 1n));
-(2n ** (144n - 1n));
-(2n ** (152n - 1n));
-(2n ** (160n - 1n));
-(2n ** (168n - 1n));
-(2n ** (176n - 1n));
-(2n ** (184n - 1n));
-(2n ** (192n - 1n));
-(2n ** (200n - 1n));
-(2n ** (208n - 1n));
-(2n ** (216n - 1n));
-(2n ** (224n - 1n));
-(2n ** (232n - 1n));
-(2n ** (240n - 1n));
-(2n ** (248n - 1n));
-(2n ** (256n - 1n));
var maxUint256$1 = 2n ** 256n - 1n;
//#endregion
//#region node_modules/viem/_esm/utils/transaction/assertRequest.js
function assertRequest(args) {
	const { account: account_, maxFeePerGas, maxPriorityFeePerGas, to } = args;
	const account = account_ ? parseAccount(account_) : void 0;
	if (account && !isAddress(account.address)) throw new InvalidAddressError$1({ address: account.address });
	if (to && !isAddress(to)) throw new InvalidAddressError$1({ address: to });
	if (maxFeePerGas && maxFeePerGas > maxUint256$1) throw new FeeCapTooHighError({ maxFeePerGas });
	if (typeof maxPriorityFeePerGas === "bigint" && typeof maxFeePerGas === "bigint" && maxPriorityFeePerGas > maxFeePerGas) throw new TipAboveFeeCapError({
		maxFeePerGas,
		maxPriorityFeePerGas
	});
}
//#endregion
//#region node_modules/viem/_esm/actions/public/call.js
/**
* Executes a new message call immediately without submitting a transaction to the network.
*
* - Docs: https://viem.sh/docs/actions/public/call
* - JSON-RPC Methods: [`eth_call`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_call)
*
* @param client - Client to use
* @param parameters - {@link CallParameters}
* @returns The call data. {@link CallReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { call } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const data = await call(client, {
*   account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
*   data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
*   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
* })
*/
async function call(client, args) {
	const { account: account_ = client.account, authorizationList, batch = Boolean(client.batch?.multicall), blockHash, blockNumber, blockTag = client.experimental_blockTag ?? "latest", requireCanonical, accessList, blobs, blockOverrides, code, data: data_, factory, factoryData, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce, requestOptions, to, value, stateOverride, ...rest } = args;
	const account = account_ ? parseAccount(account_) : void 0;
	if (code && (factory || factoryData)) throw new BaseError$3("Cannot provide both `code` & `factory`/`factoryData` as parameters.");
	if (code && to) throw new BaseError$3("Cannot provide both `code` & `to` as parameters.");
	const deploylessCallViaBytecode = code && data_;
	const deploylessCallViaFactory = factory && factoryData && to && data_;
	const deploylessCall = deploylessCallViaBytecode || deploylessCallViaFactory;
	const data = (() => {
		if (deploylessCallViaBytecode) return toDeploylessCallViaBytecodeData({
			code,
			data: data_
		});
		if (deploylessCallViaFactory) return toDeploylessCallViaFactoryData({
			data: data_,
			factory,
			factoryData,
			to
		});
		return data_;
	})();
	try {
		assertRequest(args);
		const block = formatBlockParameter({
			blockHash,
			blockNumber,
			blockTag,
			requireCanonical
		});
		const rpcBlockOverrides = blockOverrides ? toRpc(blockOverrides) : void 0;
		const rpcStateOverride = serializeStateOverride(stateOverride);
		const chainFormat = client.chain?.formatters?.transactionRequest?.format;
		const request = (chainFormat || formatTransactionRequest)({
			...extract(rest, { format: chainFormat }),
			accessList,
			account,
			authorizationList,
			blobs,
			data,
			gas,
			gasPrice,
			maxFeePerBlobGas,
			maxFeePerGas,
			maxPriorityFeePerGas,
			nonce,
			to: deploylessCall ? void 0 : to,
			value
		}, "call");
		if (batch && shouldPerformMulticall({ request }) && !rpcBlockOverrides && blockHash === void 0) try {
			const { deployless = false } = typeof client.batch?.multicall === "object" ? client.batch.multicall : {};
			const multicallAddress = getMulticallAddress(client, {
				blockNumber,
				deployless
			});
			if (!multicallAddress || !hasStateOverrideForAddress(rpcStateOverride, multicallAddress)) return await scheduleMulticall$1(client, {
				...request,
				blockHash,
				blockNumber,
				blockTag,
				multicallAddress,
				requestOptions,
				requireCanonical,
				rpcStateOverride
			});
		} catch (err) {
			if (!(err instanceof ClientChainNotConfiguredError) && !(err instanceof ChainDoesNotSupportContract)) throw err;
		}
		const params = (() => {
			const base = [request, block];
			if (rpcStateOverride && rpcBlockOverrides) return [
				...base,
				rpcStateOverride,
				rpcBlockOverrides
			];
			if (rpcStateOverride) return [...base, rpcStateOverride];
			if (rpcBlockOverrides) return [
				...base,
				{},
				rpcBlockOverrides
			];
			return base;
		})();
		const response = await client.request({
			method: "eth_call",
			params
		}, requestOptions);
		if (response === "0x") return { data: void 0 };
		return { data: response };
	} catch (err) {
		if (requestOptions?.signal?.aborted) throw getAbortError(requestOptions.signal);
		if (isAbortError(err)) throw err;
		const data = getRevertErrorData(err);
		const { offchainLookup, offchainLookupSignature } = await import("../viem.mjs").then((n) => n.a);
		if (client.ccipRead !== false && data?.slice(0, 10) === offchainLookupSignature && to) return { data: await offchainLookup(client, {
			blockHash,
			blockNumber,
			blockTag,
			data,
			requestOptions,
			requireCanonical,
			to
		}) };
		if (deploylessCall && data?.slice(0, 10) === "0x101bb98d") throw new CounterfactualDeploymentFailedError({ factory });
		throw getCallError(err, {
			...args,
			account,
			chain: client.chain
		});
	}
}
function shouldPerformMulticall({ request }) {
	const { data, to, ...request_ } = request;
	if (!data) return false;
	if (data.startsWith("0x82ad56cb")) return false;
	if (!to) return false;
	if (Object.values(request_).filter((x) => typeof x !== "undefined").length > 0) return false;
	return true;
}
var requestOptionsId = 0;
var requestOptionsIds = /* @__PURE__ */ new WeakMap();
function getRequestOptionsId(requestOptions) {
	if (!requestOptions) return "default";
	const id = requestOptionsIds.get(requestOptions);
	if (id !== void 0) return id;
	const nextId = requestOptionsId++;
	requestOptionsIds.set(requestOptions, nextId);
	return nextId;
}
async function scheduleMulticall$1(client, args) {
	const { batchSize = 1024, deployless = false, wait = 0 } = typeof client.batch?.multicall === "object" ? client.batch.multicall : {};
	const { blockHash, blockNumber, blockTag = client.experimental_blockTag ?? "latest", requireCanonical, data, multicallAddress: multicallAddress_, requestOptions, rpcStateOverride, to } = args;
	const multicallAddress = multicallAddress_ !== void 0 ? multicallAddress_ : getMulticallAddress(client, {
		blockNumber,
		deployless
	});
	const block = formatBlockParameter({
		blockHash,
		blockNumber,
		blockTag,
		requireCanonical
	});
	const blockId = typeof block === "string" ? block : JSON.stringify(block);
	const stateOverrideKey = rpcStateOverride ? `.${JSON.stringify(rpcStateOverride)}` : "";
	const { schedule } = createBatchScheduler({
		id: `${client.uid}.${blockId}.${getRequestOptionsId(requestOptions)}${stateOverrideKey}`,
		wait,
		getSize: ({ data }) => data.length - 2,
		shouldSplitBatch: (size) => size > batchSize * 2,
		fn: async (requests) => {
			const calls = requests.map((request) => ({
				allowFailure: true,
				callData: request.data,
				target: request.to
			}));
			const calldata = encodeFunctionData({
				abi: multicall3Abi,
				args: [calls],
				functionName: "aggregate3"
			});
			const multicallRequest = { ...multicallAddress === null ? { data: toDeploylessCallViaBytecodeData({
				code: multicall3Bytecode,
				data: calldata
			}) } : {
				to: multicallAddress,
				data: calldata
			} };
			const data = await client.request({
				method: "eth_call",
				params: rpcStateOverride ? [
					multicallRequest,
					block,
					rpcStateOverride
				] : [multicallRequest, block]
			}, requestOptions);
			const results = decodeFunctionResult({
				abi: multicall3Abi,
				args: [calls],
				functionName: "aggregate3",
				data: data || "0x"
			});
			if (results.length !== requests.length) throw new BaseError$3(`Multicall returned ${results.length} results for ${requests.length} calls.`);
			return results;
		}
	});
	const [{ returnData, success }] = await schedule({
		data,
		to
	});
	if (!success) throw new RawContractError({ data: returnData });
	if (returnData === "0x") return { data: void 0 };
	return { data: returnData };
}
function getMulticallAddress(client, parameters) {
	const { blockNumber, deployless } = parameters;
	if (deployless) return null;
	if (client.chain) return getChainContractAddress({
		blockNumber,
		chain: client.chain,
		contract: "multicall3"
	});
	throw new ClientChainNotConfiguredError();
}
function hasStateOverrideForAddress(rpcStateOverride, address) {
	if (!rpcStateOverride) return false;
	return Object.keys(rpcStateOverride).some((stateOverrideAddress) => isAddressEqual(stateOverrideAddress, address));
}
function toDeploylessCallViaBytecodeData(parameters) {
	const { code, data } = parameters;
	return encodeDeployData({
		abi: [{
			type: "constructor",
			stateMutability: "nonpayable",
			inputs: [{ type: "bytes" }, { type: "bytes" }]
		}],
		bytecode: deploylessCallViaBytecodeBytecode,
		args: [code, data]
	});
}
function toDeploylessCallViaFactoryData(parameters) {
	const { data, factory, factoryData, to } = parameters;
	return encodeDeployData({
		abi: [{
			type: "constructor",
			stateMutability: "nonpayable",
			inputs: [
				{ type: "address" },
				{ type: "bytes" },
				{ type: "address" },
				{ type: "bytes" }
			]
		}],
		bytecode: deploylessCallViaFactoryBytecode,
		args: [
			to,
			data,
			factory,
			factoryData
		]
	});
}
/** @internal */
function getRevertErrorData(err) {
	if (!(err instanceof BaseError$3)) return void 0;
	const error = err.walk();
	return typeof error?.data === "object" ? error.data?.data : error.data;
}
//#endregion
//#region node_modules/viem/_esm/actions/public/readContract.js
/**
* Calls a read-only function on a contract, and returns the response.
*
* - Docs: https://viem.sh/docs/contract/readContract
* - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts_reading-contracts
*
* A "read-only" function (constant function) on a Solidity contract is denoted by a `view` or `pure` keyword. They can only read the state of the contract, and cannot make any changes to it. Since read-only methods do not change the state of the contract, they do not require any gas to be executed, and can be called by any user without the need to pay for gas.
*
* Internally, uses a [Public Client](https://viem.sh/docs/clients/public) to call the [`call` action](https://viem.sh/docs/actions/public/call) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData).
*
* @param client - Client to use
* @param parameters - {@link ReadContractParameters}
* @returns The response from the contract. Type is inferred. {@link ReadContractReturnType}
*
* @example
* import { createPublicClient, http, parseAbi } from 'viem'
* import { mainnet } from 'viem/chains'
* import { readContract } from 'viem/contract'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const result = await readContract(client, {
*   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
*   abi: parseAbi(['function balanceOf(address) view returns (uint256)']),
*   functionName: 'balanceOf',
*   args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'],
* })
* // 424122n
*/
async function readContract(client, parameters) {
	const { abi, address, args, functionName, ...rest } = parameters;
	const calldata = encodeFunctionData({
		abi,
		args,
		functionName
	});
	try {
		const { data } = await getAction(client, call, "call")({
			...rest,
			data: calldata,
			to: address
		});
		return decodeFunctionResult({
			abi,
			args,
			functionName,
			data: data || "0x"
		});
	} catch (error) {
		throw getContractError(error, {
			abi,
			address,
			args,
			docsPath: "/docs/contract/readContract",
			functionName
		});
	}
}
//#endregion
//#region node_modules/viem/_esm/actions/ens/getEnsAddress.js
/**
* Gets address for ENS name.
*
* - Docs: https://viem.sh/docs/ens/actions/getEnsAddress
* - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/ens
*
* Calls `resolve(bytes, bytes)` on ENS Universal Resolver Contract.
*
* Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this.
*
* @param client - Client to use
* @param parameters - {@link GetEnsAddressParameters}
* @returns Address for ENS name or `null` if not found. {@link GetEnsAddressReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getEnsAddress, normalize } from 'viem/ens'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const ensAddress = await getEnsAddress(client, {
*   name: normalize('wevm.eth'),
* })
* // '0xd2135CfB216b74109775236E36d4b433F1DF507B'
*/
async function getEnsAddress(client, parameters) {
	const { blockNumber, blockTag, coinType, name, gatewayUrls, strict } = parameters;
	const { chain } = client;
	const universalResolverAddress = (() => {
		if (parameters.universalResolverAddress) return parameters.universalResolverAddress;
		if (!chain) throw new Error("client chain not configured. universalResolverAddress is required.");
		return getChainContractAddress({
			blockNumber,
			chain,
			contract: "ensUniversalResolver"
		});
	})();
	const tlds = chain?.ensTlds;
	if (tlds && !tlds.some((tld) => name.endsWith(tld))) return null;
	const args = (() => {
		if (coinType != null) return [namehash(name), BigInt(coinType)];
		return [namehash(name)];
	})();
	try {
		const functionData = encodeFunctionData({
			abi: addressResolverAbi,
			functionName: "addr",
			args
		});
		const readContractParameters = {
			address: universalResolverAddress,
			abi: universalResolverResolveAbi,
			functionName: "resolveWithGateways",
			args: [
				toHex(packetToBytes(name)),
				functionData,
				gatewayUrls ?? ["x-batch-gateway:true"]
			],
			blockNumber,
			blockTag
		};
		const res = await getAction(client, readContract, "readContract")(readContractParameters);
		if (res[0] === "0x") return null;
		const address = decodeAddress$1({
			coinType,
			data: res[0],
			args
		});
		if (address === "0x") return null;
		if (trim$1(address) === "0x00") return null;
		return address;
	} catch (err) {
		if (strict) throw err;
		if (isNullUniversalResolverError(err)) return null;
		throw err;
	}
}
function decodeAddress$1({ coinType, data, args }) {
	try {
		return decodeFunctionResult({
			abi: addressResolverAbi,
			args,
			functionName: "addr",
			data
		});
	} catch (err) {
		if (coinType == null) throw err;
		const addressSize = 20;
		const abiWordSize = 32;
		const address = trim$1(data);
		const addressLength = size$4(address);
		const dataSize = size$4(data);
		if ((coinType === 60n || coinType >= 2147483648n && coinType <= 4294967295n) && (dataSize === addressSize || dataSize === abiWordSize) && addressLength < addressSize) return getAddress(pad$2(address, { size: addressSize }));
		if (addressLength === addressSize) return getAddress(address);
		throw err;
	}
}
//#endregion
//#region node_modules/ox/_esm/core/Base64.js
var encoder = /*#__PURE__*/ new TextEncoder();
var decoder = /*#__PURE__*/ new TextDecoder();
var integerToCharacter = /*#__PURE__*/ Object.fromEntries(Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/").map((a, i) => [i, a.charCodeAt(0)]));
var characterToInteger = {
	...Object.fromEntries(Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/").map((a, i) => [a.charCodeAt(0), i])),
	["=".charCodeAt(0)]: 0,
	["-".charCodeAt(0)]: 62,
	["_".charCodeAt(0)]: 63
};
/**
* Encodes a {@link ox#Bytes.Bytes} to a Base64-encoded string (with optional padding and/or URL-safe characters).
*
* @example
* ```ts twoslash
* import { Base64, Bytes } from 'ox'
*
* const value = Base64.fromBytes(Bytes.fromString('hello world'))
* // @log: 'aGVsbG8gd29ybGQ='
* ```
*
* @example
* ### No Padding
*
* Turn off [padding of encoded data](https://datatracker.ietf.org/doc/html/rfc4648#section-3.2) with the `pad` option:
*
* ```ts twoslash
* import { Base64, Bytes } from 'ox'
*
* const value = Base64.fromBytes(Bytes.fromString('hello world'), { pad: false })
* // @log: 'aGVsbG8gd29ybGQ'
* ```
*
* ### URL-safe Encoding
*
* Turn on [URL-safe encoding](https://datatracker.ietf.org/doc/html/rfc4648#section-5) (Base64 URL) with the `url` option:
*
* ```ts twoslash
* import { Base64, Bytes } from 'ox'
*
* const value = Base64.fromBytes(Bytes.fromString('hello wod'), { url: true })
* // @log: 'aGVsbG8gd29_77-9ZA=='
* ```
*
* @param value - The byte array to encode.
* @param options - Encoding options.
* @returns The Base64 encoded string.
*/
function fromBytes(value, options = {}) {
	const { pad = true, url = false } = options;
	const encoded = new Uint8Array(Math.ceil(value.length / 3) * 4);
	for (let i = 0, j = 0; j < value.length; i += 4, j += 3) {
		const y = (value[j] << 16) + (value[j + 1] << 8) + (value[j + 2] | 0);
		encoded[i] = integerToCharacter[y >> 18];
		encoded[i + 1] = integerToCharacter[y >> 12 & 63];
		encoded[i + 2] = integerToCharacter[y >> 6 & 63];
		encoded[i + 3] = integerToCharacter[y & 63];
	}
	const k = value.length % 3;
	const end = Math.floor(value.length / 3) * 4 + (k && k + 1);
	let base64 = decoder.decode(new Uint8Array(encoded.buffer, 0, end));
	if (pad && k === 1) base64 += "==";
	if (pad && k === 2) base64 += "=";
	if (url) base64 = base64.replaceAll("+", "-").replaceAll("/", "_");
	return base64;
}
/**
* Encodes a string to a Base64-encoded string (with optional padding and/or URL-safe characters).
*
* @example
* ```ts twoslash
* import { Base64 } from 'ox'
*
* const value = Base64.fromString('hello world')
* // @log: 'aGVsbG8gd29ybGQ='
* ```
*
* @example
* ### No Padding
*
* Turn off [padding of encoded data](https://datatracker.ietf.org/doc/html/rfc4648#section-3.2) with the `pad` option:
*
* ```ts twoslash
* import { Base64 } from 'ox'
*
* const value = Base64.fromString('hello world', { pad: false })
* // @log: 'aGVsbG8gd29ybGQ'
* ```
*
* ### URL-safe Encoding
*
* Turn on [URL-safe encoding](https://datatracker.ietf.org/doc/html/rfc4648#section-5) (Base64 URL) with the `url` option:
*
* ```ts twoslash
* import { Base64 } from 'ox'
*
* const value = Base64.fromString('hello wod', { url: true })
* // @log: 'aGVsbG8gd29_77-9ZA=='
* ```
*
* @param value - The string to encode.
* @param options - Encoding options.
* @returns The Base64 encoded string.
*/
function fromString(value, options = {}) {
	return fromBytes(fromString$2(value), options);
}
/**
* Decodes a Base64-encoded string (with optional padding and/or URL-safe characters) to {@link ox#Bytes.Bytes}.
*
* @example
* ```ts twoslash
* import { Base64, Bytes } from 'ox'
*
* const value = Base64.toBytes('aGVsbG8gd29ybGQ=')
* // @log: Uint8Array([104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100])
* ```
*
* @param value - The string, hex value, or byte array to encode.
* @returns The Base64 decoded {@link ox#Bytes.Bytes}.
*/
function toBytes(value) {
	const base64 = value.replace(/=+$/, "");
	const size = base64.length;
	const decoded = new Uint8Array(size + 3);
	encoder.encodeInto(base64 + "===", decoded);
	for (let i = 0, j = 0; i < base64.length; i += 4, j += 3) {
		const x = (characterToInteger[decoded[i]] << 18) + (characterToInteger[decoded[i + 1]] << 12) + (characterToInteger[decoded[i + 2]] << 6) + characterToInteger[decoded[i + 3]];
		decoded[j] = x >> 16;
		decoded[j + 1] = x >> 8 & 255;
		decoded[j + 2] = x & 255;
	}
	const decodedSize = (size >> 2) * 3 + (size % 4 && size % 4 - 1);
	return new Uint8Array(decoded.buffer, 0, decodedSize);
}
/**
* Decodes a Base64-encoded string (with optional padding and/or URL-safe characters) to a string.
*
* @example
* ```ts twoslash
* import { Base64 } from 'ox'
*
* const value = Base64.toString('aGVsbG8gd29ybGQ=')
* // @log: 'hello world'
* ```
*
* @param value - The string, hex value, or byte array to encode.
* @returns The Base64 decoded string.
*/
function toString(value) {
	return toString$1(toBytes(value));
}
//#endregion
//#region node_modules/viem/_esm/errors/ens.js
var EnsAvatarInvalidMetadataError = class extends BaseError$3 {
	constructor({ data }) {
		super("Unable to extract image from metadata. The metadata may be malformed or invalid.", {
			metaMessages: [
				"- Metadata must be a JSON object with at least an `image`, `image_url` or `image_data` property.",
				"",
				`Provided data: ${JSON.stringify(data)}`
			],
			name: "EnsAvatarInvalidMetadataError"
		});
	}
};
var EnsAvatarInvalidNftUriError = class extends BaseError$3 {
	constructor({ reason }) {
		super(`ENS NFT avatar URI is invalid. ${reason}`, { name: "EnsAvatarInvalidNftUriError" });
	}
};
var EnsAvatarUriResolutionError = class extends BaseError$3 {
	constructor({ uri }) {
		super(`Unable to resolve ENS avatar URI "${uri}". The URI may be malformed, invalid, or does not respond with a valid image.`, { name: "EnsAvatarUriResolutionError" });
	}
};
var EnsAvatarUnsupportedNamespaceError = class extends BaseError$3 {
	constructor({ namespace }) {
		super(`ENS NFT avatar namespace "${namespace}" is not supported. Must be "erc721" or "erc1155".`, { name: "EnsAvatarUnsupportedNamespaceError" });
	}
};
//#endregion
//#region node_modules/viem/_esm/utils/internal/http.js
/**
* Returns a signal that aborts as soon as any of `signals` aborts, and a
* `cleanup` function that detaches the listeners added to `signals`.
*/
function anySignal(signals) {
	const signals_ = signals.filter((signal) => !!signal);
	if (signals_.length < 2) return {
		signal: signals_[0] ?? null,
		cleanup: () => {}
	};
	const controller = new AbortController();
	const onAbort = () => {
		cleanup();
		controller.abort(signals_.find((signal) => signal.aborted)?.reason);
	};
	const cleanup = () => {
		for (const signal of signals_) signal.removeEventListener("abort", onAbort);
	};
	for (const signal of signals_) {
		if (signal.aborted) {
			cleanup();
			controller.abort(signal.reason);
			break;
		}
		signal.addEventListener("abort", onAbort);
	}
	return {
		signal: controller.signal,
		cleanup
	};
}
/**
* Reads a response body as text, throwing once it exceeds
* `maxResponseBodySize` bytes (`false` reads it whole).
*/
async function readResponseBody(response, { maxResponseBodySize }) {
	if (maxResponseBodySize === false) return response.text();
	const contentLength = response.headers.get("Content-Length");
	if (contentLength) {
		const size = Number(contentLength);
		if (size > maxResponseBodySize) {
			await response.body?.cancel();
			throw new ResponseBodyTooLargeError({
				maxSize: maxResponseBodySize,
				size
			});
		}
	}
	if (!response.body) {
		const body = await response.text();
		const size = new TextEncoder().encode(body).length;
		if (size > maxResponseBodySize) throw new ResponseBodyTooLargeError({
			maxSize: maxResponseBodySize,
			size
		});
		return body;
	}
	const reader = response.body.getReader();
	const decoder = new TextDecoder();
	let body = "";
	let size = 0;
	try {
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			size += value.byteLength;
			if (size > maxResponseBodySize) {
				await reader.cancel();
				throw new ResponseBodyTooLargeError({
					maxSize: maxResponseBodySize,
					size
				});
			}
			body += decoder.decode(value, { stream: true });
		}
		body += decoder.decode();
		return body;
	} finally {
		reader.releaseLock();
	}
}
//#endregion
//#region node_modules/viem/_esm/utils/promise/withTimeout.js
function withTimeout(fn, { errorInstance = /* @__PURE__ */ new Error("timed out"), timeout, signal }) {
	return new Promise((resolve, reject) => {
		(async () => {
			let timeoutId;
			const controller = new AbortController();
			try {
				if (timeout > 0) timeoutId = setTimeout(() => {
					if (signal) controller.abort();
					else reject(errorInstance);
				}, timeout);
				resolve(await fn({ signal: controller?.signal || null }));
			} catch (err) {
				if (controller?.signal.aborted && isAbortError(err)) {
					reject(errorInstance);
					return;
				}
				reject(err);
			} finally {
				clearTimeout(timeoutId);
			}
		})();
	});
}
//#endregion
//#region node_modules/viem/_esm/utils/ens/avatar/utils.js
var networkRegex = /(?<protocol>https?:\/\/[^/]*|ipfs:\/|ipns:\/|ar:\/)?(?<root>\/)?(?<subpath>ipfs\/|ipns\/)?(?<target>[\w\-.]+)(?<subtarget>\/.*)?/;
var ipfsHashRegex = /^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})(\/(?<target>[\w\-.]+))?(?<subtarget>\/.*)?$/;
var base64Regex = /^data:([a-zA-Z\-/+]*);base64,([^"].*)/;
var dataURIRegex = /^data:([a-zA-Z\-/+]*)?(;[a-zA-Z0-9].*?)?(,)/;
var fetchTimeout = 1e4;
var maxMetadataBytes = 10485760;
/** @internal */
async function isImageUri(uri, { timeout = fetchTimeout } = {}) {
	try {
		const res = await withTimeout(({ signal }) => fetch(uri, {
			method: "HEAD",
			...signal ? { signal } : {}
		}), {
			errorInstance: new TimeoutError({
				body: {},
				url: uri
			}),
			signal: true,
			timeout
		});
		if (res.status === 200) return res.headers.get("content-type")?.startsWith("image/");
		return false;
	} catch (error) {
		if (error instanceof TimeoutError) return false;
		if (typeof error === "object" && typeof error.response !== "undefined") return false;
		if (!Object.hasOwn(globalThis, "Image")) return false;
		return new Promise((resolve) => {
			const img = new Image();
			img.onload = () => {
				resolve(true);
			};
			img.onerror = () => {
				resolve(false);
			};
			img.src = uri;
		});
	}
}
/** @internal */
function getGateway(custom, defaultGateway) {
	if (!custom) return defaultGateway;
	if (custom.endsWith("/")) return custom.slice(0, -1);
	return custom;
}
function resolveAvatarUri({ uri, gatewayUrls }) {
	const isEncoded = base64Regex.test(uri);
	if (isEncoded) return {
		uri,
		isOnChain: true,
		isEncoded
	};
	const ipfsGateway = getGateway(gatewayUrls?.ipfs, "https://ipfs.io");
	const arweaveGateway = getGateway(gatewayUrls?.arweave, "https://arweave.net");
	const { protocol, subpath, target, subtarget = "" } = uri.match(networkRegex)?.groups || {};
	const isIPNS = protocol === "ipns:/" || subpath === "ipns/";
	const isIPFS = protocol === "ipfs:/" || subpath === "ipfs/" || ipfsHashRegex.test(uri);
	if (uri.startsWith("http") && !isIPNS && !isIPFS) {
		let replacedUri = uri;
		if (gatewayUrls?.arweave) replacedUri = uri.replace(/https:\/\/arweave.net/g, arweaveGateway);
		return {
			uri: replacedUri,
			isOnChain: false,
			isEncoded: false
		};
	}
	if ((isIPNS || isIPFS) && target) return {
		uri: `${ipfsGateway}/${isIPNS ? "ipns" : "ipfs"}/${target}${subtarget}`,
		isOnChain: false,
		isEncoded: false
	};
	if (protocol === "ar:/" && target) return {
		uri: `${arweaveGateway}/${target}${subtarget || ""}`,
		isOnChain: false,
		isEncoded: false
	};
	let parsedUri = uri.replace(dataURIRegex, "");
	if (parsedUri.startsWith("<svg")) parsedUri = `data:image/svg+xml;base64,${fromString(parsedUri)}`;
	if (parsedUri.startsWith("data:") || parsedUri.startsWith("{")) return {
		uri: parsedUri,
		isOnChain: true,
		isEncoded: false
	};
	throw new EnsAvatarUriResolutionError({ uri });
}
function getJsonImage(data) {
	if (typeof data !== "object" || !("image" in data) && !("image_url" in data) && !("image_data" in data)) throw new EnsAvatarInvalidMetadataError({ data });
	return data.image || data.image_url || data.image_data;
}
async function getMetadataAvatarUri({ gatewayUrls, timeout = fetchTimeout, uri }) {
	try {
		const body = await withTimeout(async ({ signal }) => {
			return readResponseBody(await fetch(uri, signal ? { signal } : {}), { maxResponseBodySize: maxMetadataBytes });
		}, {
			errorInstance: new TimeoutError({
				body: {},
				url: uri
			}),
			signal: true,
			timeout
		});
		return await parseAvatarUri({
			gatewayUrls,
			uri: getJsonImage(JSON.parse(body))
		});
	} catch {
		throw new EnsAvatarUriResolutionError({ uri });
	}
}
async function parseAvatarUri({ gatewayUrls, uri }) {
	const { uri: resolvedURI, isOnChain } = resolveAvatarUri({
		uri,
		gatewayUrls
	});
	if (isOnChain) return resolvedURI;
	if (await isImageUri(resolvedURI)) return resolvedURI;
	throw new EnsAvatarUriResolutionError({ uri });
}
function parseNftUri(uri_) {
	let uri = uri_;
	if (uri.startsWith("did:nft:")) uri = uri.replace("did:nft:", "").replace(/_/g, "/");
	const [reference, asset_namespace, tokenID] = uri.split("/");
	const [eip_namespace, chainID] = reference.split(":");
	const [erc_namespace, contractAddress] = asset_namespace.split(":");
	if (!eip_namespace || eip_namespace.toLowerCase() !== "eip155") throw new EnsAvatarInvalidNftUriError({ reason: "Only EIP-155 supported" });
	if (!chainID) throw new EnsAvatarInvalidNftUriError({ reason: "Chain ID not found" });
	if (!contractAddress) throw new EnsAvatarInvalidNftUriError({ reason: "Contract address not found" });
	if (!tokenID) throw new EnsAvatarInvalidNftUriError({ reason: "Token ID not found" });
	if (!erc_namespace) throw new EnsAvatarInvalidNftUriError({ reason: "ERC namespace not found" });
	return {
		chainID: Number.parseInt(chainID, 10),
		namespace: erc_namespace.toLowerCase(),
		contractAddress,
		tokenID
	};
}
async function getNftTokenUri(client, { nft }) {
	if (nft.namespace === "erc721") return readContract(client, {
		address: nft.contractAddress,
		abi: [{
			name: "tokenURI",
			type: "function",
			stateMutability: "view",
			inputs: [{
				name: "tokenId",
				type: "uint256"
			}],
			outputs: [{
				name: "",
				type: "string"
			}]
		}],
		functionName: "tokenURI",
		args: [BigInt(nft.tokenID)]
	});
	if (nft.namespace === "erc1155") return readContract(client, {
		address: nft.contractAddress,
		abi: [{
			name: "uri",
			type: "function",
			stateMutability: "view",
			inputs: [{
				name: "_id",
				type: "uint256"
			}],
			outputs: [{
				name: "",
				type: "string"
			}]
		}],
		functionName: "uri",
		args: [BigInt(nft.tokenID)]
	});
	throw new EnsAvatarUnsupportedNamespaceError({ namespace: nft.namespace });
}
/**
* Substitutes the `{id}` placeholder of an NFT metadata URI with the token ID.
*
* ERC-1155 requires the ID to be substituted as lowercase hex, without a `0x`
* prefix and zero-padded to 64 characters.
*
* @see https://eips.ethereum.org/EIPS/eip-1155#metadata
*/
function getNftMetadataUri({ nft, uri }) {
	const tokenId = nft.namespace === "erc1155" ? numberToHex(BigInt(nft.tokenID), { size: 32 }).slice(2) : nft.tokenID;
	return uri.replace(/(?:0x)?{id}/, tokenId);
}
//#endregion
//#region node_modules/viem/_esm/utils/ens/avatar/parseAvatarRecord.js
async function parseAvatarRecord(client, { gatewayUrls, record }) {
	if (/eip155:/i.test(record)) return parseNftAvatarUri(client, {
		gatewayUrls,
		record
	});
	return parseAvatarUri({
		uri: record,
		gatewayUrls
	});
}
async function parseNftAvatarUri(client, { gatewayUrls, record }) {
	const nft = parseNftUri(record);
	const { uri: resolvedNftUri, isOnChain, isEncoded } = resolveAvatarUri({
		uri: await getNftTokenUri(client, { nft }),
		gatewayUrls
	});
	if (isOnChain && (resolvedNftUri.includes("data:application/json;base64,") || resolvedNftUri.startsWith("{"))) {
		const encodedJson = isEncoded ? toString(resolvedNftUri.replace("data:application/json;base64,", "").replace(/\s/g, "")) : resolvedNftUri;
		return parseAvatarUri({
			uri: getJsonImage(JSON.parse(encodedJson)),
			gatewayUrls
		});
	}
	return getMetadataAvatarUri({
		gatewayUrls,
		uri: getNftMetadataUri({
			nft,
			uri: resolvedNftUri
		})
	});
}
//#endregion
//#region node_modules/viem/_esm/actions/ens/getEnsText.js
/**
* Gets a text record for specified ENS name.
*
* - Docs: https://viem.sh/docs/ens/actions/getEnsResolver
* - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/ens
*
* Calls `resolve(bytes, bytes)` on ENS Universal Resolver Contract.
*
* Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this.
*
* @param client - Client to use
* @param parameters - {@link GetEnsTextParameters}
* @returns Address for ENS resolver. {@link GetEnsTextReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getEnsText, normalize } from 'viem/ens'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const twitterRecord = await getEnsText(client, {
*   name: normalize('wevm.eth'),
*   key: 'com.twitter',
* })
* // 'wevm_dev'
*/
async function getEnsText(client, parameters) {
	const { blockNumber, blockTag, key, name, gatewayUrls, strict } = parameters;
	const { chain } = client;
	const universalResolverAddress = (() => {
		if (parameters.universalResolverAddress) return parameters.universalResolverAddress;
		if (!chain) throw new Error("client chain not configured. universalResolverAddress is required.");
		return getChainContractAddress({
			blockNumber,
			chain,
			contract: "ensUniversalResolver"
		});
	})();
	const tlds = chain?.ensTlds;
	if (tlds && !tlds.some((tld) => name.endsWith(tld))) return null;
	try {
		const readContractParameters = {
			address: universalResolverAddress,
			abi: universalResolverResolveAbi,
			args: [
				toHex(packetToBytes(name)),
				encodeFunctionData({
					abi: textResolverAbi,
					functionName: "text",
					args: [namehash(name), key]
				}),
				gatewayUrls ?? ["x-batch-gateway:true"]
			],
			functionName: "resolveWithGateways",
			blockNumber,
			blockTag
		};
		const res = await getAction(client, readContract, "readContract")(readContractParameters);
		if (res[0] === "0x") return null;
		const record = decodeFunctionResult({
			abi: textResolverAbi,
			functionName: "text",
			data: res[0]
		});
		return record === "" ? null : record;
	} catch (err) {
		if (strict) throw err;
		if (isNullUniversalResolverError(err)) return null;
		throw err;
	}
}
//#endregion
//#region node_modules/viem/_esm/actions/ens/getEnsAvatar.js
/**
* Gets the avatar of an ENS name.
*
* - Docs: https://viem.sh/docs/ens/actions/getEnsAvatar
* - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/ens
*
* Calls [`getEnsText`](https://viem.sh/docs/ens/actions/getEnsText) with `key` set to `'avatar'`.
*
* Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this.
*
* @param client - Client to use
* @param parameters - {@link GetEnsAvatarParameters}
* @returns Avatar URI or `null` if not found. {@link GetEnsAvatarReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getEnsAvatar, normalize } from 'viem/ens'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const ensAvatar = await getEnsAvatar(client, {
*   name: normalize('wevm.eth'),
* })
* // 'https://ipfs.io/ipfs/Qma8mnp6xV3J2cRNf3mTth5C8nV11CAnceVinc3y8jSbio'
*/
async function getEnsAvatar(client, { blockNumber, blockTag, assetGatewayUrls, name, gatewayUrls, strict, universalResolverAddress }) {
	const record = await getAction(client, getEnsText, "getEnsText")({
		blockNumber,
		blockTag,
		key: "avatar",
		name,
		universalResolverAddress,
		gatewayUrls,
		strict
	});
	if (!record) return null;
	try {
		return await parseAvatarRecord(client, {
			record,
			gatewayUrls: assetGatewayUrls
		});
	} catch {
		return null;
	}
}
//#endregion
//#region node_modules/viem/_esm/actions/ens/getEnsName.js
/**
* Gets primary name for specified address.
*
* - Docs: https://viem.sh/docs/ens/actions/getEnsName
* - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/ens
*
* Calls `reverse(bytes)` on ENS Universal Resolver Contract to "reverse resolve" the address to the primary ENS name.
*
* @param client - Client to use
* @param parameters - {@link GetEnsNameParameters}
* @returns Name or `null` if not found. {@link GetEnsNameReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getEnsName } from 'viem/ens'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const ensName = await getEnsName(client, {
*   address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
* })
* // 'wevm.eth'
*/
async function getEnsName(client, parameters) {
	const { address, blockNumber, blockTag, coinType = 60n, gatewayUrls, strict } = parameters;
	const { chain } = client;
	const universalResolverAddress = (() => {
		if (parameters.universalResolverAddress) return parameters.universalResolverAddress;
		if (!chain) throw new Error("client chain not configured. universalResolverAddress is required.");
		return getChainContractAddress({
			blockNumber,
			chain,
			contract: "ensUniversalResolver"
		});
	})();
	try {
		const readContractParameters = {
			address: universalResolverAddress,
			abi: universalResolverReverseAbi,
			args: [
				address,
				coinType,
				gatewayUrls ?? ["x-batch-gateway:true"]
			],
			functionName: "reverseWithGateways",
			blockNumber,
			blockTag
		};
		const [name] = await getAction(client, readContract, "readContract")(readContractParameters);
		return name || null;
	} catch (err) {
		if (strict) throw err;
		if (isNullUniversalResolverError(err)) return null;
		throw err;
	}
}
//#endregion
//#region node_modules/viem/_esm/actions/ens/getEnsResolver.js
/**
* Gets resolver for ENS name.
*
* - Docs: https://viem.sh/docs/ens/actions/getEnsResolver
* - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/ens
*
* Calls `findResolver(bytes)` on ENS Universal Resolver Contract to retrieve the resolver of an ENS name.
*
* Since ENS names prohibit certain forbidden characters (e.g. underscore) and have other validation rules, you likely want to [normalize ENS names](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) with [UTS-46 normalization](https://unicode.org/reports/tr46) before passing them to `getEnsAddress`. You can use the built-in [`normalize`](https://viem.sh/docs/ens/utilities/normalize) function for this.
*
* @param client - Client to use
* @param parameters - {@link GetEnsResolverParameters}
* @returns Address for ENS resolver. {@link GetEnsResolverReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getEnsResolver, normalize } from 'viem/ens'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const resolverAddress = await getEnsResolver(client, {
*   name: normalize('wevm.eth'),
* })
* // '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41'
*/
async function getEnsResolver(client, parameters) {
	const { blockNumber, blockTag, name } = parameters;
	const { chain } = client;
	const universalResolverAddress = (() => {
		if (parameters.universalResolverAddress) return parameters.universalResolverAddress;
		if (!chain) throw new Error("client chain not configured. universalResolverAddress is required.");
		return getChainContractAddress({
			blockNumber,
			chain,
			contract: "ensUniversalResolver"
		});
	})();
	const tlds = chain?.ensTlds;
	if (tlds && !tlds.some((tld) => name.endsWith(tld))) throw new Error(`${name} is not a valid ENS TLD (${tlds?.join(", ")}) for chain "${chain.name}" (id: ${chain.id}).`);
	const [resolverAddress] = await getAction(client, readContract, "readContract")({
		address: universalResolverAddress,
		abi: [{
			inputs: [{ type: "bytes" }],
			name: "findResolver",
			outputs: [
				{ type: "address" },
				{ type: "bytes32" },
				{ type: "uint256" }
			],
			stateMutability: "view",
			type: "function"
		}],
		functionName: "findResolver",
		args: [toHex(packetToBytes(name))],
		blockNumber,
		blockTag
	});
	return resolverAddress;
}
//#endregion
//#region node_modules/viem/_esm/actions/public/createAccessList.js
/**
* Creates an EIP-2930 access list.
*
* - Docs: https://viem.sh/docs/actions/public/createAccessList
* - JSON-RPC Methods: `eth_createAccessList`
*
* @param client - Client to use
* @param parameters - {@link CreateAccessListParameters}
* @returns The access list. {@link CreateAccessListReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { createAccessList } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const data = await createAccessList(client, {
*   account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
*   data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
*   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
* })
*/
async function createAccessList(client, args) {
	const { account: account_ = client.account, blockNumber, blockTag = "latest", blobs, data, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, to, value, ...rest } = args;
	const account = account_ ? parseAccount(account_) : void 0;
	try {
		assertRequest(args);
		const block = (typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0) || blockTag;
		const chainFormat = client.chain?.formatters?.transactionRequest?.format;
		const request = (chainFormat || formatTransactionRequest)({
			...extract(rest, { format: chainFormat }),
			account,
			blobs,
			data,
			gas,
			gasPrice,
			maxFeePerBlobGas,
			maxFeePerGas,
			maxPriorityFeePerGas,
			to,
			value
		}, "createAccessList");
		const response = await client.request({
			method: "eth_createAccessList",
			params: [request, block]
		});
		if (response.error) throw new BaseError$3(response.error, { details: response.error });
		return {
			accessList: response.accessList,
			gasUsed: BigInt(response.gasUsed)
		};
	} catch (err) {
		throw getCallError(err, {
			...args,
			account,
			chain: client.chain
		});
	}
}
//#endregion
//#region node_modules/viem/_esm/utils/filters/createFilterRequestScope.js
/**
* Scopes `request` to the filter ID. If the client is a fallback, it will
* listen for responses and scope the child transport `request` function
* to the successful filter ID.
*/
function createFilterRequestScope(client, { method }) {
	const requestMap = {};
	if (client.transport.type === "fallback") client.transport.onResponse?.(({ method: method_, response: id, status, transport }) => {
		if (status === "success" && method === method_) requestMap[id] = transport.request;
	});
	return ((id) => requestMap[id] || client.request);
}
//#endregion
//#region node_modules/viem/_esm/actions/public/createBlockFilter.js
/**
* Creates a [`Filter`](https://viem.sh/docs/glossary/types#filter) to listen for new block hashes that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges).
*
* - Docs: https://viem.sh/docs/actions/public/createBlockFilter
* - JSON-RPC Methods: [`eth_newBlockFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newBlockFilter)
*
* @param client - Client to use
* @returns [`Filter`](https://viem.sh/docs/glossary/types#filter). {@link CreateBlockFilterReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { createBlockFilter } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const filter = await createBlockFilter(client)
* // { id: "0x345a6572337856574a76364e457a4366", type: 'block' }
*/
async function createBlockFilter(client) {
	const getRequest = createFilterRequestScope(client, { method: "eth_newBlockFilter" });
	const id = await client.request({ method: "eth_newBlockFilter" });
	return {
		id,
		request: getRequest(id),
		type: "block"
	};
}
//#endregion
//#region node_modules/viem/_esm/errors/log.js
var FilterTypeNotSupportedError$1 = class extends BaseError$3 {
	constructor(type) {
		super(`Filter type "${type}" is not supported.`, { name: "FilterTypeNotSupportedError" });
	}
};
//#endregion
//#region node_modules/viem/_esm/utils/abi/encodeEventTopics.js
var docsPath$1 = "/docs/contract/encodeEventTopics";
function encodeEventTopics(parameters) {
	const { abi, eventName, args } = parameters;
	let abiItem = abi[0];
	if (eventName) {
		const item = getAbiItem({
			abi,
			name: eventName
		});
		if (!item) throw new AbiEventNotFoundError(eventName, { docsPath: docsPath$1 });
		abiItem = item;
	}
	if (abiItem.type !== "event") throw new AbiEventNotFoundError(void 0, { docsPath: docsPath$1 });
	let topics = [];
	if (args && "inputs" in abiItem) {
		const indexedInputs = abiItem.inputs?.filter((param) => "indexed" in param && param.indexed);
		const args_ = Array.isArray(args) ? args : Object.values(args).length > 0 ? indexedInputs?.map((x) => args[x.name]) ?? [] : [];
		if (args_.length > 0) topics = indexedInputs?.map((param, i) => {
			if (Array.isArray(args_[i])) return args_[i].map((_, j) => encodeArg({
				param,
				value: args_[i][j]
			}));
			return typeof args_[i] !== "undefined" && args_[i] !== null ? encodeArg({
				param,
				value: args_[i]
			}) : null;
		}) ?? [];
	}
	if (abiItem.anonymous) return topics;
	return [toEventSelector(formatAbiItem$1(abiItem)), ...topics];
}
function encodeArg({ param, value }) {
	if (param.type === "string") return keccak256$1(stringToBytes(value));
	if (param.type === "bytes") return keccak256$1(toBytes$1(value));
	if (param.type === "tuple" || param.type.match(/^(.*)\[(\d+)?\]$/)) throw new FilterTypeNotSupportedError$1(param.type);
	return encodeAbiParameters([param], [value]);
}
//#endregion
//#region node_modules/viem/_esm/actions/public/createContractEventFilter.js
/**
* Creates a Filter to retrieve event logs that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges) or [`getFilterLogs`](https://viem.sh/docs/actions/public/getFilterLogs).
*
* - Docs: https://viem.sh/docs/contract/createContractEventFilter
*
* @param client - Client to use
* @param parameters - {@link CreateContractEventFilterParameters}
* @returns [`Filter`](https://viem.sh/docs/glossary/types#filter). {@link CreateContractEventFilterReturnType}
*
* @example
* import { createPublicClient, http, parseAbi } from 'viem'
* import { mainnet } from 'viem/chains'
* import { createContractEventFilter } from 'viem/contract'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const filter = await createContractEventFilter(client, {
*   abi: parseAbi(['event Transfer(address indexed, address indexed, uint256)']),
* })
*/
async function createContractEventFilter(client, parameters) {
	const { address, abi, args, eventName, fromBlock, strict, toBlock } = parameters;
	const getRequest = createFilterRequestScope(client, { method: "eth_newFilter" });
	const topics = eventName ? encodeEventTopics({
		abi,
		args,
		eventName
	}) : void 0;
	const id = await client.request({
		method: "eth_newFilter",
		params: [{
			address,
			fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
			toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock,
			topics
		}]
	});
	return {
		abi,
		args,
		eventName,
		id,
		request: getRequest(id),
		strict: Boolean(strict),
		type: "event"
	};
}
//#endregion
//#region node_modules/viem/_esm/actions/public/internal/encodeEventFilterTopics.js
/**
* Encodes the `topics` of a log filter from an `event` or `events` option.
*
* A single `event` encodes to its topic list. Otherwise, the topics of every
* event in `events` are flattened into the first topic position.
*/
function encodeEventFilterTopics(parameters) {
	const { args, event } = parameters;
	const events = parameters.events ?? (event ? [event] : void 0);
	if (!events) return [];
	const encoded = events.flatMap((event) => encodeEventTopics({
		abi: [event],
		eventName: event.name,
		args
	}));
	if (event) return encoded;
	return [encoded];
}
//#endregion
//#region node_modules/viem/_esm/actions/public/createEventFilter.js
/**
* Creates a [`Filter`](https://viem.sh/docs/glossary/types#filter) to listen for new events that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges).
*
* - Docs: https://viem.sh/docs/actions/public/createEventFilter
* - JSON-RPC Methods: [`eth_newFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newfilter)
*
* @param client - Client to use
* @param parameters - {@link CreateEventFilterParameters}
* @returns [`Filter`](https://viem.sh/docs/glossary/types#filter). {@link CreateEventFilterReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { createEventFilter } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const filter = await createEventFilter(client, {
*   address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2',
* })
*/
async function createEventFilter(client, { address, args, event, events: events_, fromBlock, strict, toBlock } = {}) {
	const events = events_ ?? (event ? [event] : void 0);
	const getRequest = createFilterRequestScope(client, { method: "eth_newFilter" });
	const topics = encodeEventFilterTopics({
		args,
		event,
		events: events_
	});
	const id = await client.request({
		method: "eth_newFilter",
		params: [{
			address,
			fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
			toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock,
			...topics.length ? { topics } : {}
		}]
	});
	return {
		abi: events,
		args,
		eventName: event ? event.name : void 0,
		fromBlock,
		id,
		request: getRequest(id),
		strict: Boolean(strict),
		toBlock,
		type: "event"
	};
}
//#endregion
//#region node_modules/viem/_esm/actions/public/createPendingTransactionFilter.js
/**
* Creates a Filter to listen for new pending transaction hashes that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges).
*
* - Docs: https://viem.sh/docs/actions/public/createPendingTransactionFilter
* - JSON-RPC Methods: [`eth_newPendingTransactionFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newpendingtransactionfilter)
*
* @param client - Client to use
* @returns [`Filter`](https://viem.sh/docs/glossary/types#filter). {@link CreateBlockFilterReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { createPendingTransactionFilter } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const filter = await createPendingTransactionFilter(client)
* // { id: "0x345a6572337856574a76364e457a4366", type: 'transaction' }
*/
async function createPendingTransactionFilter(client) {
	const getRequest = createFilterRequestScope(client, { method: "eth_newPendingTransactionFilter" });
	const id = await client.request({ method: "eth_newPendingTransactionFilter" });
	return {
		id,
		request: getRequest(id),
		type: "transaction"
	};
}
//#endregion
//#region node_modules/viem/_esm/accounts/utils/publicKeyToAddress.js
/**
* @description Converts an ECDSA public key to an address.
*
* @param publicKey The uncompressed public key (65 bytes, `0x04` prefix) to convert.
*
* @returns The address.
*/
function publicKeyToAddress(publicKey) {
	if (publicKey.length !== 132 || !publicKey.startsWith("0x04")) throw new InvalidPublicKeyError({ publicKey });
	return checksumAddress(`0x${keccak256$1(`0x${publicKey.substring(4)}`).substring(26)}`);
}
/**
* Thrown by `publicKeyToAddress` when the public key is not an uncompressed
* secp256k1 public key.
*/
var InvalidPublicKeyError = class extends BaseError$3 {
	constructor({ publicKey }) {
		super(`Public key "${publicKey}" is invalid.`, {
			metaMessages: ["- Public key must be uncompressed: 65 bytes with a `0x04` prefix."],
			name: "publicKeyToAddress.InvalidPublicKeyError"
		});
	}
};
//#endregion
//#region node_modules/viem/_esm/utils/signature/recoverPublicKey.js
async function recoverPublicKey({ hash, signature }) {
	const hashHex = isHex(hash) ? hash : toHex(hash);
	const { secp256k1 } = await import("../noble__curves+noble__hashes.mjs").then((n) => n.n);
	return `0x${(() => {
		if (typeof signature === "object" && "r" in signature && "s" in signature) {
			const { r, s, v, yParity } = signature;
			const recoveryBit = (() => {
				if (yParity === void 0 && v !== void 0 && v >= 35n) return v % 2n === 0n ? 1 : 0;
				return toRecoveryBit(Number(yParity ?? v));
			})();
			return new secp256k1.Signature(hexToBigInt(r), hexToBigInt(s)).addRecoveryBit(recoveryBit);
		}
		const signatureHex = isHex(signature) ? signature : toHex(signature);
		if (size$4(signatureHex) !== 65) throw new Error("invalid signature length");
		const recoveryBit = toRecoveryBit(hexToNumber(`0x${signatureHex.slice(130)}`));
		return secp256k1.Signature.fromCompact(signatureHex.substring(2, 130)).addRecoveryBit(recoveryBit);
	})().recoverPublicKey(hashHex.substring(2)).toHex(false)}`;
}
function toRecoveryBit(yParityOrV) {
	if (yParityOrV === 0 || yParityOrV === 1) return yParityOrV;
	if (yParityOrV === 27) return 0;
	if (yParityOrV === 28) return 1;
	throw new Error("Invalid yParityOrV value");
}
//#endregion
//#region node_modules/viem/_esm/utils/signature/recoverAddress.js
async function recoverAddress({ hash, signature }) {
	return publicKeyToAddress(await recoverPublicKey({
		hash,
		signature
	}));
}
//#endregion
//#region node_modules/viem/_esm/utils/encoding/toRlp.js
function toRlp(bytes, to = "hex") {
	if (to === "hex") return ["0x", encodeHex(bytes)].join("");
	const encodable = getEncodable(bytes);
	const cursor = createCursor(new Uint8Array(encodable.length));
	encodable.encode(cursor);
	if (to === "hex") return bytesToHex(cursor.bytes);
	return cursor.bytes;
}
var hexRegex = /^0x[0-9a-fA-F]*$/;
/**
* Encodes straight to un-prefixed hex, skipping the byte conversion of each
* leaf and of the output. A leaf that is neither hex nor a `Uint8Array` (such
* as one from another realm) goes through the byte encoder on its own, which
* encodes it or throws the same error as the byte path.
*/
function encodeHex(value) {
	if (Array.isArray(value)) {
		let body = "";
		for (const item of value) body += encodeHex(item);
		return encodeHexPrefix(body.length / 2, 192) + body;
	}
	const body = (() => {
		if (typeof value === "string" && hexRegex.test(value)) {
			const hex = value.slice(2).toLowerCase();
			return hex.length % 2 ? `0${hex}` : hex;
		}
		if (value instanceof Uint8Array) return bytesToHex(value).slice(2);
	})();
	if (body === void 0) {
		const encodable = getEncodableBytes(value);
		const cursor = createCursor(new Uint8Array(encodable.length));
		encodable.encode(cursor);
		return bytesToHex(cursor.bytes).slice(2);
	}
	if (body.length === 2 && body < "80") return body;
	return encodeHexPrefix(body.length / 2, 128) + body;
}
function encodeHexPrefix(length, offset) {
	if (length <= 55) return (offset + length).toString(16);
	const size = getSizeOfLength(length);
	return (offset + 55 + size).toString(16) + length.toString(16).padStart(size * 2, "0");
}
function getEncodable(bytes) {
	if (Array.isArray(bytes)) return getEncodableList(bytes.map((x) => getEncodable(x)));
	return getEncodableBytes(bytes);
}
function getEncodableList(list) {
	const bodyLength = list.reduce((acc, x) => acc + x.length, 0);
	const sizeOfBodyLength = getSizeOfLength(bodyLength);
	return {
		length: (() => {
			if (bodyLength <= 55) return 1 + bodyLength;
			return 1 + sizeOfBodyLength + bodyLength;
		})(),
		encode(cursor) {
			if (bodyLength <= 55) cursor.pushByte(192 + bodyLength);
			else {
				cursor.pushByte(247 + sizeOfBodyLength);
				if (sizeOfBodyLength === 1) cursor.pushUint8(bodyLength);
				else if (sizeOfBodyLength === 2) cursor.pushUint16(bodyLength);
				else if (sizeOfBodyLength === 3) cursor.pushUint24(bodyLength);
				else cursor.pushUint32(bodyLength);
			}
			for (const { encode } of list) encode(cursor);
		}
	};
}
function getEncodableBytes(bytesOrHex) {
	const bytes = typeof bytesOrHex === "string" ? hexToBytes(bytesOrHex) : bytesOrHex;
	const sizeOfBytesLength = getSizeOfLength(bytes.length);
	return {
		length: (() => {
			if (bytes.length === 1 && bytes[0] < 128) return 1;
			if (bytes.length <= 55) return 1 + bytes.length;
			return 1 + sizeOfBytesLength + bytes.length;
		})(),
		encode(cursor) {
			if (bytes.length === 1 && bytes[0] < 128) cursor.pushBytes(bytes);
			else if (bytes.length <= 55) {
				cursor.pushByte(128 + bytes.length);
				cursor.pushBytes(bytes);
			} else {
				cursor.pushByte(183 + sizeOfBytesLength);
				if (sizeOfBytesLength === 1) cursor.pushUint8(bytes.length);
				else if (sizeOfBytesLength === 2) cursor.pushUint16(bytes.length);
				else if (sizeOfBytesLength === 3) cursor.pushUint24(bytes.length);
				else cursor.pushUint32(bytes.length);
				cursor.pushBytes(bytes);
			}
		}
	};
}
function getSizeOfLength(length) {
	if (length < 256) return 1;
	if (length < 2 ** 16) return 2;
	if (length < 2 ** 24) return 3;
	if (length < 2 ** 32) return 4;
	throw new BaseError$3("Length is too large.");
}
//#endregion
//#region node_modules/viem/_esm/utils/authorization/hashAuthorization.js
/**
* Computes an Authorization hash in [EIP-7702 format](https://eips.ethereum.org/EIPS/eip-7702): `keccak256('0x05' || rlp([chain_id, address, nonce]))`.
*/
function hashAuthorization(parameters) {
	const { chainId, nonce, to } = parameters;
	const address = parameters.contractAddress ?? parameters.address;
	const hash = keccak256$1(concatHex(["0x05", toRlp([
		chainId ? numberToHex(chainId) : "0x",
		address,
		nonce ? numberToHex(nonce) : "0x"
	])]));
	if (to === "bytes") return hexToBytes(hash);
	return hash;
}
//#endregion
//#region node_modules/viem/_esm/utils/authorization/recoverAuthorizationAddress.js
async function recoverAuthorizationAddress(parameters) {
	const { authorization } = parameters;
	const signature = parameters.signature ?? authorization;
	if (typeof signature === "object" && typeof signature.yParity === "number" && signature.yParity !== 0 && signature.yParity !== 1) throw new InvalidYParityError$1({ yParity: BigInt(signature.yParity) });
	return recoverAddress({
		hash: hashAuthorization(authorization),
		signature
	});
}
//#endregion
//#region node_modules/viem/_esm/errors/estimateGas.js
var EstimateGasExecutionError = class extends BaseError$3 {
	cause;
	constructor(cause, { account, docsPath, chain, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value }) {
		const prettyArgs = prettyPrint$1({
			from: account?.address,
			to,
			value: typeof value !== "undefined" && `${formatEther(value)} ${chain?.nativeCurrency?.symbol || "ETH"}`,
			data,
			gas,
			gasPrice: typeof gasPrice !== "undefined" && `${formatGwei(gasPrice)} gwei`,
			maxFeePerGas: typeof maxFeePerGas !== "undefined" && `${formatGwei(maxFeePerGas)} gwei`,
			maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== "undefined" && `${formatGwei(maxPriorityFeePerGas)} gwei`,
			nonce
		});
		super(cause.shortMessage, {
			cause,
			docsPath,
			metaMessages: [
				...cause.metaMessages ? [...cause.metaMessages, " "] : [],
				"Estimate Gas Arguments:",
				prettyArgs
			].filter(Boolean),
			name: "EstimateGasExecutionError"
		});
		this.cause = cause;
	}
};
//#endregion
//#region node_modules/viem/_esm/utils/errors/getEstimateGasError.js
function getEstimateGasError(err, { docsPath, ...args }) {
	return new EstimateGasExecutionError((() => {
		const cause = getNodeError(err, args);
		if (cause instanceof UnknownNodeError) return err;
		return cause;
	})(), {
		docsPath,
		...args
	});
}
//#endregion
//#region node_modules/viem/_esm/errors/fee.js
var BaseFeeScalarError = class extends BaseError$3 {
	constructor() {
		super("`baseFeeMultiplier` must be greater than 1.", { name: "BaseFeeScalarError" });
	}
};
var Eip1559FeesNotSupportedError = class extends BaseError$3 {
	constructor() {
		super("Chain does not support EIP-1559 fees.", { name: "Eip1559FeesNotSupportedError" });
	}
};
var MaxFeePerGasTooLowError = class extends BaseError$3 {
	constructor({ maxPriorityFeePerGas }) {
		super(`\`maxFeePerGas\` cannot be less than the \`maxPriorityFeePerGas\` (${formatGwei(maxPriorityFeePerGas)} gwei).`, { name: "MaxFeePerGasTooLowError" });
	}
};
//#endregion
//#region node_modules/viem/_esm/errors/block.js
var BlockNotFoundError = class extends BaseError$3 {
	constructor({ blockHash, blockNumber }) {
		let identifier = "Block";
		if (blockHash) identifier = `Block at hash "${blockHash}"`;
		if (blockNumber) identifier = `Block at number "${blockNumber}"`;
		super(`${identifier} could not be found.`, { name: "BlockNotFoundError" });
	}
};
//#endregion
//#region node_modules/viem/_esm/utils/formatters/transaction.js
var transactionType = {
	"0x0": "legacy",
	"0x1": "eip2930",
	"0x2": "eip1559",
	"0x3": "eip4844",
	"0x4": "eip7702"
};
function formatTransaction(transaction, _) {
	const type = transaction.type ? transactionType[transaction.type] : void 0;
	const transaction_ = {
		...(() => {
			const value = transaction;
			if (type === "legacy") {
				const { accessList: _accessList, maxFeePerBlobGas: _maxFeePerBlobGas, maxFeePerGas: _maxFeePerGas, maxPriorityFeePerGas: _maxPriorityFeePerGas, yParity: _yParity, ...rest } = value;
				return rest;
			}
			if (type === "eip2930") {
				const { maxFeePerBlobGas: _maxFeePerBlobGas, maxFeePerGas: _maxFeePerGas, maxPriorityFeePerGas: _maxPriorityFeePerGas, ...rest } = value;
				return rest;
			}
			if (type === "eip1559") {
				const { maxFeePerBlobGas: _maxFeePerBlobGas, ...rest } = value;
				return rest;
			}
			return transaction;
		})(),
		blockHash: transaction.blockHash ? transaction.blockHash : null,
		blockNumber: transaction.blockNumber ? BigInt(transaction.blockNumber) : null,
		...transaction.blockTimestamp != null && { blockTimestamp: BigInt(transaction.blockTimestamp) },
		chainId: transaction.chainId ? hexToNumber(transaction.chainId) : void 0,
		gas: transaction.gas ? BigInt(transaction.gas) : void 0,
		gasPrice: transaction.gasPrice ? BigInt(transaction.gasPrice) : void 0,
		...(() => {
			const maxFeePerBlobGas = transaction.maxFeePerBlobGas ? BigInt(transaction.maxFeePerBlobGas) : void 0;
			const maxFeePerGas = transaction.maxFeePerGas ? BigInt(transaction.maxFeePerGas) : void 0;
			const maxPriorityFeePerGas = transaction.maxPriorityFeePerGas ? BigInt(transaction.maxPriorityFeePerGas) : void 0;
			if (type === "legacy" || type === "eip2930") return {};
			if (type === "eip1559") return {
				maxFeePerGas,
				maxPriorityFeePerGas
			};
			return {
				maxFeePerBlobGas,
				maxFeePerGas,
				maxPriorityFeePerGas
			};
		})(),
		nonce: transaction.nonce ? hexToNumber(transaction.nonce) : void 0,
		to: transaction.to ? transaction.to : null,
		transactionIndex: transaction.transactionIndex ? Number(transaction.transactionIndex) : null,
		type,
		typeHex: transaction.type ? transaction.type : void 0,
		value: transaction.value ? BigInt(transaction.value) : void 0,
		v: transaction.v ? BigInt(transaction.v) : void 0
	};
	if (transaction.authorizationList) transaction_.authorizationList = formatAuthorizationList(transaction.authorizationList);
	const yParity = (() => {
		if (transaction.yParity) return Number(transaction.yParity);
		if (typeof transaction_.v === "bigint") {
			if (transaction_.v === 0n || transaction_.v === 27n) return 0;
			if (transaction_.v === 1n || transaction_.v === 28n) return 1;
			if (transaction_.v >= 35n) return transaction_.v % 2n === 0n ? 1 : 0;
		}
	})();
	if (type !== "legacy") transaction_.yParity = yParity;
	return transaction_;
}
function formatAuthorizationList(authorizationList) {
	return authorizationList.map((authorization) => ({
		address: authorization.address,
		chainId: Number(authorization.chainId),
		nonce: Number(authorization.nonce),
		r: authorization.r,
		s: authorization.s,
		yParity: Number(authorization.yParity)
	}));
}
//#endregion
//#region node_modules/viem/_esm/utils/formatters/block.js
function formatBlock(block, _) {
	const transactions = (block.transactions ?? []).map((transaction) => {
		if (typeof transaction === "string") return transaction;
		return formatTransaction(transaction);
	});
	return {
		...block,
		baseFeePerGas: block.baseFeePerGas ? BigInt(block.baseFeePerGas) : null,
		blobGasUsed: block.blobGasUsed ? BigInt(block.blobGasUsed) : void 0,
		difficulty: block.difficulty ? BigInt(block.difficulty) : void 0,
		excessBlobGas: block.excessBlobGas ? BigInt(block.excessBlobGas) : void 0,
		gasLimit: block.gasLimit ? BigInt(block.gasLimit) : void 0,
		gasUsed: block.gasUsed ? BigInt(block.gasUsed) : void 0,
		hash: block.hash ? block.hash : null,
		logsBloom: block.logsBloom ? block.logsBloom : null,
		nonce: block.nonce ? block.nonce : null,
		number: block.number ? BigInt(block.number) : null,
		size: block.size ? BigInt(block.size) : void 0,
		timestamp: block.timestamp ? BigInt(block.timestamp) : void 0,
		transactions,
		totalDifficulty: block.totalDifficulty ? BigInt(block.totalDifficulty) : null
	};
}
//#endregion
//#region node_modules/viem/_esm/actions/public/getBlock.js
/**
* Returns information about a block at a block number, hash, or tag.
*
* - Docs: https://viem.sh/docs/actions/public/getBlock
* - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks_fetching-blocks
* - JSON-RPC Methods:
*   - Calls [`eth_getBlockByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbynumber) for `blockNumber` & `blockTag`.
*   - Calls [`eth_getBlockByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbyhash) for `blockHash`.
*
* @param client - Client to use
* @param parameters - {@link GetBlockParameters}
* @returns Information about the block. {@link GetBlockReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getBlock } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const block = await getBlock(client)
*/
async function getBlock(client, { blockHash, blockNumber, blockTag = client.experimental_blockTag ?? "latest", includeTransactions: includeTransactions_ } = {}) {
	const includeTransactions = includeTransactions_ ?? false;
	const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
	let block = null;
	if (blockHash) block = await client.request({
		method: "eth_getBlockByHash",
		params: [blockHash, includeTransactions]
	}, { dedupe: true });
	else block = await client.request({
		method: "eth_getBlockByNumber",
		params: [blockNumberHex || blockTag, includeTransactions]
	}, { dedupe: Boolean(blockNumberHex) });
	if (!block) throw new BlockNotFoundError({
		blockHash,
		blockNumber
	});
	return (client.chain?.formatters?.block?.format || formatBlock)(block, "getBlock");
}
//#endregion
//#region node_modules/viem/_esm/actions/public/getGasPrice.js
/**
* Returns the current price of gas (in wei).
*
* - Docs: https://viem.sh/docs/actions/public/getGasPrice
* - JSON-RPC Methods: [`eth_gasPrice`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gasprice)
*
* @param client - Client to use
* @returns The gas price (in wei). {@link GetGasPriceReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getGasPrice } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const gasPrice = await getGasPrice(client)
*/
async function getGasPrice(client) {
	const gasPrice = await client.request({ method: "eth_gasPrice" });
	return BigInt(gasPrice);
}
//#endregion
//#region node_modules/viem/_esm/actions/public/estimateMaxPriorityFeePerGas.js
/**
* Returns an estimate for the max priority fee per gas (in wei) for a
* transaction to be likely included in the next block.
* Defaults to [`chain.fees.defaultPriorityFee`](/docs/clients/chains#fees-defaultpriorityfee) if set.
*
* - Docs: https://viem.sh/docs/actions/public/estimateMaxPriorityFeePerGas
*
* @param client - Client to use
* @returns An estimate (in wei) for the max priority fee per gas. {@link EstimateMaxPriorityFeePerGasReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { estimateMaxPriorityFeePerGas } from 'viem/actions'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const maxPriorityFeePerGas = await estimateMaxPriorityFeePerGas(client)
* // 10000000n
*/
async function estimateMaxPriorityFeePerGas(client, args) {
	return internal_estimateMaxPriorityFeePerGas(client, args);
}
async function internal_estimateMaxPriorityFeePerGas(client, args) {
	const { block: block_, chain = client.chain, request } = args || {};
	try {
		const maxPriorityFeePerGas = chain?.fees?.maxPriorityFeePerGas ?? chain?.fees?.defaultPriorityFee;
		if (typeof maxPriorityFeePerGas === "function") {
			const maxPriorityFeePerGas_ = await maxPriorityFeePerGas({
				block: await block_ || await getAction(client, getBlock, "getBlock")({}),
				client,
				request
			});
			if (maxPriorityFeePerGas_ === null) throw new Error();
			return maxPriorityFeePerGas_;
		}
		if (typeof maxPriorityFeePerGas !== "undefined") return maxPriorityFeePerGas;
		return hexToBigInt(await client.request({ method: "eth_maxPriorityFeePerGas" }));
	} catch {
		const [block, gasPrice] = await Promise.all([block_ ? Promise.resolve(block_) : getAction(client, getBlock, "getBlock")({}), getAction(client, getGasPrice, "getGasPrice")({})]);
		if (typeof block.baseFeePerGas !== "bigint") throw new Eip1559FeesNotSupportedError();
		const maxPriorityFeePerGas = gasPrice - block.baseFeePerGas;
		if (maxPriorityFeePerGas < 0n) return 0n;
		return maxPriorityFeePerGas;
	}
}
//#endregion
//#region node_modules/viem/_esm/actions/public/estimateFeesPerGas.js
/**
* Whether each client's network has EIP-1559 fees, keyed by client uid.
*
* @internal
*/
var eip1559NetworkCache = /*#__PURE__*/ new LruMap$1(128);
/**
* Returns an estimate for the fees per gas (in wei) for a
* transaction to be likely included in the next block.
* Defaults to [`chain.fees.estimateFeesPerGas`](/docs/clients/chains#fees-estimatefeespergas) if set.
*
* - Docs: https://viem.sh/docs/actions/public/estimateFeesPerGas
*
* @param client - Client to use
* @param parameters - {@link EstimateFeesPerGasParameters}
* @returns An estimate (in wei) for the fees per gas. {@link EstimateFeesPerGasReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { estimateFeesPerGas } from 'viem/actions'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const maxPriorityFeePerGas = await estimateFeesPerGas(client)
* // { maxFeePerGas: ..., maxPriorityFeePerGas: ... }
*/
async function estimateFeesPerGas(client, args) {
	return internal_estimateFeesPerGas(client, args);
}
async function internal_estimateFeesPerGas(client, args) {
	const { block: block_, chain = client.chain, request, type = "eip1559" } = args || {};
	const hasFeeHooks = Object.values(chain?.fees ?? {}).some((fee) => typeof fee === "function");
	const blockPromise = block_ || type === "legacy" && !hasFeeHooks ? void 0 : getAction(client, getBlock, "getBlock")({});
	blockPromise?.catch(() => {});
	const priorityFeePromise = blockPromise && type === "eip1559" && !hasFeeHooks && typeof request?.maxPriorityFeePerGas !== "bigint" && eip1559NetworkCache.get(client.uid) !== false ? internal_estimateMaxPriorityFeePerGas(client, {
		block: blockPromise,
		chain,
		request
	}) : void 0;
	priorityFeePromise?.catch(() => {});
	const block = block_ ?? await blockPromise;
	if (blockPromise) eip1559NetworkCache.set(client.uid, typeof block?.baseFeePerGas === "bigint");
	const baseFeeMultiplier = await (async () => {
		if (typeof chain?.fees?.baseFeeMultiplier === "function") return chain.fees.baseFeeMultiplier({
			block,
			client,
			request
		});
		return chain?.fees?.baseFeeMultiplier ?? 1.2;
	})();
	if (baseFeeMultiplier < 1) throw new BaseFeeScalarError();
	const denominator = 10 ** (baseFeeMultiplier.toString().split(".")[1]?.length ?? 0);
	const multiply = (base) => base * BigInt(Math.round(baseFeeMultiplier * denominator)) / BigInt(denominator);
	if (typeof chain?.fees?.estimateFeesPerGas === "function") {
		const fees = await chain.fees.estimateFeesPerGas({
			block,
			client,
			multiply,
			request,
			type
		});
		if (fees !== null) return fees;
	}
	if (type === "eip1559") {
		if (typeof block?.baseFeePerGas !== "bigint") throw new Eip1559FeesNotSupportedError();
		const maxPriorityFeePerGas = typeof request?.maxPriorityFeePerGas === "bigint" ? request.maxPriorityFeePerGas : await (priorityFeePromise ?? internal_estimateMaxPriorityFeePerGas(client, {
			block,
			chain,
			request
		}));
		const baseFeePerGas = multiply(block.baseFeePerGas);
		return {
			maxFeePerGas: request?.maxFeePerGas ?? baseFeePerGas + maxPriorityFeePerGas,
			maxPriorityFeePerGas
		};
	}
	return { gasPrice: request?.gasPrice ?? multiply(await getAction(client, getGasPrice, "getGasPrice")({})) };
}
//#endregion
//#region node_modules/viem/_esm/actions/public/getTransactionCount.js
/**
* Returns the number of [Transactions](https://viem.sh/docs/glossary/terms#transaction) an Account has sent.
*
* - Docs: https://viem.sh/docs/actions/public/getTransactionCount
* - JSON-RPC Methods: [`eth_getTransactionCount`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactioncount)
*
* @param client - Client to use
* @param parameters - {@link GetTransactionCountParameters}
* @returns The number of transactions an account has sent. {@link GetTransactionCountReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getTransactionCount } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const transactionCount = await getTransactionCount(client, {
*   address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
* })
*/
async function getTransactionCount(client, { address, blockHash, blockNumber, blockTag = "latest", requireCanonical }) {
	const block = formatBlockParameter({
		blockHash,
		blockNumber,
		blockTag,
		requireCanonical
	});
	return hexToNumber(await client.request({
		method: "eth_getTransactionCount",
		params: [address, block]
	}, { dedupe: typeof blockNumber === "bigint" || blockHash !== void 0 }));
}
//#endregion
//#region node_modules/viem/_esm/utils/blob/blobsToCommitments.js
/**
* Compute commitments from a list of blobs.
*
* @example
* ```ts
* import { blobsToCommitments, toBlobs } from 'viem'
* import { kzg } from './kzg'
*
* const blobs = toBlobs({ data: '0x1234' })
* const commitments = blobsToCommitments({ blobs, kzg })
* ```
*/
function blobsToCommitments(parameters) {
	const { kzg } = parameters;
	const to = parameters.to ?? (typeof parameters.blobs[0] === "string" ? "hex" : "bytes");
	const blobs = typeof parameters.blobs[0] === "string" ? parameters.blobs.map((x) => hexToBytes(x)) : parameters.blobs;
	const commitments = [];
	for (const blob of blobs) commitments.push(Uint8Array.from(kzg.blobToKzgCommitment(blob)));
	return to === "bytes" ? commitments : commitments.map((x) => bytesToHex(x));
}
//#endregion
//#region node_modules/viem/_esm/utils/blob/blobsToProofs.js
/**
* Compute the proofs for a list of blobs and their commitments.
*
* @example
* ```ts
* import {
*   blobsToCommitments,
*   toBlobs
* } from 'viem'
* import { kzg } from './kzg'
*
* const blobs = toBlobs({ data: '0x1234' })
* const commitments = blobsToCommitments({ blobs, kzg })
* const proofs = blobsToProofs({ blobs, commitments, kzg })
* ```
*/
function blobsToProofs(parameters) {
	const { kzg } = parameters;
	const to = parameters.to ?? (typeof parameters.blobs[0] === "string" ? "hex" : "bytes");
	const blobs = typeof parameters.blobs[0] === "string" ? parameters.blobs.map((x) => hexToBytes(x)) : parameters.blobs;
	const commitments = typeof parameters.commitments[0] === "string" ? parameters.commitments.map((x) => hexToBytes(x)) : parameters.commitments;
	const proofs = [];
	for (let i = 0; i < blobs.length; i++) {
		const blob = blobs[i];
		const commitment = commitments[i];
		proofs.push(Uint8Array.from(kzg.computeBlobKzgProof(blob, commitment)));
	}
	return to === "bytes" ? proofs : proofs.map((x) => bytesToHex(x));
}
//#endregion
//#region node_modules/viem/_esm/utils/hash/sha256.js
function sha256(value, to_) {
	const to = to_ || "hex";
	const bytes = sha256$1(isHex(value, { strict: false }) ? toBytes$1(value) : value);
	if (to === "bytes") return bytes;
	return toHex(bytes);
}
//#endregion
//#region node_modules/viem/_esm/utils/blob/commitmentToVersionedHash.js
/**
* Transform a commitment to it's versioned hash.
*
* @example
* ```ts
* import {
*   blobsToCommitments,
*   commitmentToVersionedHash,
*   toBlobs
* } from 'viem'
* import { kzg } from './kzg'
*
* const blobs = toBlobs({ data: '0x1234' })
* const [commitment] = blobsToCommitments({ blobs, kzg })
* const versionedHash = commitmentToVersionedHash({ commitment })
* ```
*/
function commitmentToVersionedHash(parameters) {
	const { commitment, version = 1 } = parameters;
	const to = parameters.to ?? (typeof commitment === "string" ? "hex" : "bytes");
	const versionedHash = sha256(commitment, "bytes");
	versionedHash.set([version], 0);
	return to === "bytes" ? versionedHash : bytesToHex(versionedHash);
}
//#endregion
//#region node_modules/viem/_esm/utils/blob/commitmentsToVersionedHashes.js
/**
* Transform a list of commitments to their versioned hashes.
*
* @example
* ```ts
* import {
*   blobsToCommitments,
*   commitmentsToVersionedHashes,
*   toBlobs
* } from 'viem'
* import { kzg } from './kzg'
*
* const blobs = toBlobs({ data: '0x1234' })
* const commitments = blobsToCommitments({ blobs, kzg })
* const versionedHashes = commitmentsToVersionedHashes({ commitments })
* ```
*/
function commitmentsToVersionedHashes(parameters) {
	const { commitments, version } = parameters;
	const to = parameters.to ?? (typeof commitments[0] === "string" ? "hex" : "bytes");
	const hashes = [];
	for (const commitment of commitments) hashes.push(commitmentToVersionedHash({
		commitment,
		to,
		version
	}));
	return hashes;
}
//#endregion
//#region node_modules/viem/_esm/constants/blob.js
/** Blob limit per transaction. */
var blobsPerTransaction = 6;
/** The number of field elements in a blob. */
var fieldElementsPerBlob = 4096;
/** The number of bytes in a blob. */
var bytesPerBlob = 32 * fieldElementsPerBlob;
/** Blob bytes limit per transaction. */
var maxBytesPerTransaction = bytesPerBlob * blobsPerTransaction - 1 - 1 * fieldElementsPerBlob * blobsPerTransaction;
//#endregion
//#region node_modules/viem/_esm/errors/blob.js
var BlobSizeTooLargeError = class extends BaseError$3 {
	constructor({ maxSize, size }) {
		super("Blob size is too large.", {
			metaMessages: [`Max: ${maxSize} bytes`, `Given: ${size} bytes`],
			name: "BlobSizeTooLargeError"
		});
	}
};
var EmptyBlobError = class extends BaseError$3 {
	constructor() {
		super("Blob data must not be empty.", { name: "EmptyBlobError" });
	}
};
//#endregion
//#region node_modules/viem/_esm/utils/blob/toBlobs.js
/**
* Transforms arbitrary data to blobs.
*
* @example
* ```ts
* import { toBlobs, stringToHex } from 'viem'
*
* const blobs = toBlobs({ data: stringToHex('hello world') })
* ```
*/
function toBlobs(parameters) {
	const to = parameters.to ?? (typeof parameters.data === "string" ? "hex" : "bytes");
	const data = typeof parameters.data === "string" ? hexToBytes(parameters.data) : parameters.data;
	const size_ = size$4(data);
	if (!size_) throw new EmptyBlobError();
	if (size_ > 761855) throw new BlobSizeTooLargeError({
		maxSize: maxBytesPerTransaction,
		size: size_
	});
	const blobs = [];
	let active = true;
	let position = 0;
	while (active) {
		const blob = createCursor(new Uint8Array(bytesPerBlob));
		let size = 0;
		while (size < fieldElementsPerBlob) {
			const bytes = data.slice(position, position + 31);
			blob.pushByte(0);
			blob.pushBytes(bytes);
			if (bytes.length < 31) {
				blob.pushByte(128);
				active = false;
				break;
			}
			size++;
			position += 31;
		}
		blobs.push(blob);
	}
	return to === "bytes" ? blobs.map((x) => x.bytes) : blobs.map((x) => bytesToHex(x.bytes));
}
//#endregion
//#region node_modules/viem/_esm/utils/blob/toBlobSidecars.js
/**
* Transforms arbitrary data (or blobs, commitments, & proofs) into a sidecar array.
*
* @example
* ```ts
* import { toBlobSidecars, stringToHex } from 'viem'
*
* const sidecars = toBlobSidecars({ data: stringToHex('hello world') })
* ```
*
* @example
* ```ts
* import {
*   blobsToCommitments,
*   toBlobs,
*   blobsToProofs,
*   toBlobSidecars,
*   stringToHex
* } from 'viem'
*
* const blobs = toBlobs({ data: stringToHex('hello world') })
* const commitments = blobsToCommitments({ blobs, kzg })
* const proofs = blobsToProofs({ blobs, commitments, kzg })
*
* const sidecars = toBlobSidecars({ blobs, commitments, proofs })
* ```
*/
function toBlobSidecars(parameters) {
	const { data, kzg, to } = parameters;
	const blobs = parameters.blobs ?? toBlobs({
		data,
		to
	});
	const commitments = parameters.commitments ?? blobsToCommitments({
		blobs,
		kzg,
		to
	});
	const proofs = parameters.proofs ?? blobsToProofs({
		blobs,
		commitments,
		kzg,
		to
	});
	const sidecars = [];
	for (let i = 0; i < blobs.length; i++) sidecars.push({
		blob: blobs[i],
		commitment: commitments[i],
		proof: proofs[i]
	});
	return sidecars;
}
//#endregion
//#region node_modules/viem/_esm/utils/transaction/getTransactionType.js
function getTransactionType(transaction) {
	if (transaction.type) return transaction.type;
	if (typeof transaction.authorizationList !== "undefined") return "eip7702";
	if (typeof transaction.blobs !== "undefined" || typeof transaction.blobVersionedHashes !== "undefined" || typeof transaction.maxFeePerBlobGas !== "undefined" || typeof transaction.sidecars !== "undefined") return "eip4844";
	if (typeof transaction.maxFeePerGas !== "undefined" || typeof transaction.maxPriorityFeePerGas !== "undefined") return "eip1559";
	if (typeof transaction.gasPrice !== "undefined") {
		if (typeof transaction.accessList !== "undefined") return "eip2930";
		return "legacy";
	}
	throw new InvalidSerializableTransactionError({ transaction });
}
//#endregion
//#region node_modules/viem/_esm/utils/errors/getTransactionError.js
function getTransactionError(err, { docsPath, ...args }) {
	return new TransactionExecutionError((() => {
		const cause = getNodeError(err, args);
		if (cause instanceof UnknownNodeError) return err;
		return cause;
	})(), {
		docsPath,
		...args
	});
}
//#endregion
//#region node_modules/viem/_esm/actions/public/getChainId.js
/**
* Returns the chain ID associated with the current network.
*
* - Docs: https://viem.sh/docs/actions/public/getChainId
* - JSON-RPC Methods: [`eth_chainId`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_chainid)
*
* @param client - Client to use
* @returns The current chain ID. {@link GetChainIdReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getChainId } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const chainId = await getChainId(client)
* // 1
*/
async function getChainId(client) {
	return hexToNumber(await client.request({ method: "eth_chainId" }, { dedupe: true }));
}
//#endregion
//#region node_modules/viem/_esm/actions/public/fillTransaction.js
/**
* Fills a transaction request with the necessary fields to be signed over.
*
* - Docs: https://viem.sh/docs/actions/public/fillTransaction
*
* @param client - Client to use
* @param parameters - {@link FillTransactionParameters}
* @returns The filled transaction. {@link FillTransactionReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { fillTransaction } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const result = await fillTransaction(client, {
*   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
*   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
*   value: parseEther('1'),
* })
*/
async function fillTransaction(client, parameters) {
	const { account = client.account, accessList, authorizationList, chain = client.chain, blobVersionedHashes, blobs, data, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce: nonce_, nonceManager, to, type, value, ...rest } = parameters;
	const nonce = await (async () => {
		if (!account) return nonce_;
		if (!nonceManager) return nonce_;
		if (typeof nonce_ !== "undefined") return nonce_;
		const account_ = parseAccount(account);
		const chainId = chain ? chain.id : await getAction(client, getChainId, "getChainId")({});
		return await nonceManager.consume({
			address: account_.address,
			chainId,
			client
		});
	})();
	assertRequest(parameters);
	const chainFormat = chain?.formatters?.transactionRequest?.format;
	const request = (chainFormat || formatTransactionRequest)({
		...extract(rest, { format: chainFormat }),
		account: account ? parseAccount(account) : void 0,
		accessList,
		authorizationList,
		blobs,
		blobVersionedHashes,
		data,
		gas,
		gasPrice,
		maxFeePerBlobGas,
		maxFeePerGas,
		maxPriorityFeePerGas,
		nonce,
		to,
		type,
		value
	}, "fillTransaction");
	try {
		const response = await client.request({
			method: "eth_fillTransaction",
			params: [request]
		});
		const transaction = (chain?.formatters?.transaction?.format || formatTransaction)(response.tx);
		delete transaction.blockHash;
		delete transaction.blockNumber;
		delete transaction.r;
		delete transaction.s;
		delete transaction.transactionIndex;
		delete transaction.v;
		delete transaction.yParity;
		if (typeof transaction.maxFeePerGas !== "undefined") delete transaction.gasPrice;
		transaction.data = transaction.input;
		const hasFeePayerSignature = typeof transaction.feePayerSignature !== "undefined" && transaction.feePayerSignature !== null;
		if (hasFeePayerSignature && typeof nonce !== "undefined" && BigInt(transaction.nonce) !== BigInt(nonce)) throw new FeePayerNonceMismatchError({
			filledNonce: transaction.nonce,
			requestedNonce: nonce
		});
		if (!hasFeePayerSignature) {
			if (transaction.gas) transaction.gas = parameters.gas ?? transaction.gas;
			if (transaction.gasPrice) transaction.gasPrice = parameters.gasPrice ?? transaction.gasPrice;
			if (transaction.maxFeePerBlobGas) transaction.maxFeePerBlobGas = parameters.maxFeePerBlobGas ?? transaction.maxFeePerBlobGas;
			if (transaction.maxFeePerGas) transaction.maxFeePerGas = parameters.maxFeePerGas ?? transaction.maxFeePerGas;
			if (transaction.maxPriorityFeePerGas) transaction.maxPriorityFeePerGas = parameters.maxPriorityFeePerGas ?? transaction.maxPriorityFeePerGas;
			if (typeof transaction.nonce !== "undefined" && typeof parameters.nonce !== "undefined") transaction.nonce = typeof transaction.nonce === "bigint" ? BigInt(parameters.nonce) : parameters.nonce;
			const feeMultiplier = await (async () => {
				if (typeof chain?.fees?.baseFeeMultiplier === "function") {
					const block = await getAction(client, getBlock, "getBlock")({});
					return chain.fees.baseFeeMultiplier({
						block,
						client,
						request: parameters
					});
				}
				return chain?.fees?.baseFeeMultiplier ?? 1.2;
			})();
			if (feeMultiplier < 1) throw new BaseFeeScalarError();
			const denominator = 10 ** (feeMultiplier.toString().split(".")[1]?.length ?? 0);
			const multiplyFee = (base) => base * BigInt(Math.round(feeMultiplier * denominator)) / BigInt(denominator);
			if (transaction.maxFeePerGas && !parameters.maxFeePerGas) transaction.maxFeePerGas = multiplyFee(transaction.maxFeePerGas);
			if (transaction.gasPrice && !parameters.gasPrice) transaction.gasPrice = multiplyFee(transaction.gasPrice);
		}
		return {
			raw: response.raw,
			transaction: {
				from: request.from,
				...transaction
			},
			...response.capabilities ? { capabilities: response.capabilities } : {}
		};
	} catch (err) {
		throw getTransactionError(err, {
			...parameters,
			chain: client.chain
		});
	}
}
//#endregion
//#region node_modules/viem/_esm/actions/wallet/prepareTransactionRequest.js
var defaultParameters = [
	"blobVersionedHashes",
	"chainId",
	"fees",
	"gas",
	"nonce",
	"type"
];
/** @internal */
var supportsFillTransaction = /*#__PURE__*/ new LruMap$1(128);
/**
* Prepares a transaction request for signing.
*
* - Docs: https://viem.sh/docs/actions/wallet/prepareTransactionRequest
*
* @param args - {@link PrepareTransactionRequestParameters}
* @returns The transaction request. {@link PrepareTransactionRequestReturnType}
*
* @example
* import { createWalletClient, custom } from 'viem'
* import { mainnet } from 'viem/chains'
* import { prepareTransactionRequest } from 'viem/actions'
*
* const client = createWalletClient({
*   chain: mainnet,
*   transport: custom(window.ethereum),
* })
* const request = await prepareTransactionRequest(client, {
*   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
*   to: '0x0000000000000000000000000000000000000000',
*   value: 1n,
* })
*
* @example
* // Account Hoisting
* import { createWalletClient, http } from 'viem'
* import { privateKeyToAccount } from 'viem/accounts'
* import { mainnet } from 'viem/chains'
* import { prepareTransactionRequest } from 'viem/actions'
*
* const client = createWalletClient({
*   account: privateKeyToAccount('0x…'),
*   chain: mainnet,
*   transport: custom(window.ethereum),
* })
* const request = await prepareTransactionRequest(client, {
*   to: '0x0000000000000000000000000000000000000000',
*   value: 1n,
* })
*/
async function prepareTransactionRequest(client, args) {
	let request = { ...args };
	if (typeof request.account === "undefined") request.account = client.account;
	request.parameters ??= defaultParameters;
	const { account: account_, chain = client.chain, nonceManager, parameters } = request;
	const prepareTransactionRequest = (() => {
		if (typeof chain?.prepareTransactionRequest === "function") return {
			fn: chain.prepareTransactionRequest,
			runAt: ["beforeFillTransaction"]
		};
		if (Array.isArray(chain?.prepareTransactionRequest)) return {
			fn: chain.prepareTransactionRequest[0],
			runAt: chain.prepareTransactionRequest[1].runAt
		};
	})();
	let chainId;
	async function getChainId$1() {
		if (chainId) return chainId;
		if (typeof request.chainId !== "undefined") return request.chainId;
		if (chain) return chain.id;
		chainId = await getAction(client, getChainId, "getChainId")({});
		return chainId;
	}
	let account = account_ ? parseAccount(account_) : account_;
	let nonce = request.nonce;
	if (prepareTransactionRequest?.fn && prepareTransactionRequest.runAt?.includes("beforeFillTransaction")) {
		request = await prepareTransactionRequest.fn({
			...request,
			chain
		}, {
			client,
			phase: "beforeFillTransaction"
		}) ?? request;
		nonce ??= request.nonce;
		const sender = request.account ?? request.from;
		account = sender ? parseAccount(sender) : void 0;
	}
	let consumedNonce;
	if (parameters.includes("nonce") && typeof nonce === "undefined" && account && nonceManager) {
		const chainId = await getChainId$1();
		consumedNonce = nonceManager.consume({
			address: account.address,
			chainId,
			client
		});
		consumedNonce.catch(() => {});
	}
	const attemptFill = (() => {
		if ((parameters.includes("blobVersionedHashes") || parameters.includes("sidecars")) && request.kzg && request.blobs) return false;
		if (parameters.length > 0 && "feePayer" in request && request.feePayer && !("feePayerSignature" in request && request.feePayerSignature)) return true;
		if (supportsFillTransaction.get(client.uid) === false) return false;
		if (!["fees", "gas"].some((parameter) => parameters.includes(parameter))) return false;
		if (parameters.includes("chainId") && typeof request.chainId !== "number") return true;
		if (parameters.includes("nonce") && typeof nonce !== "number" && !consumedNonce) return true;
		if (parameters.includes("fees") && typeof request.gasPrice !== "bigint" && (typeof request.maxFeePerGas !== "bigint" || typeof request.maxPriorityFeePerGas !== "bigint")) return true;
		if (parameters.includes("gas") && typeof request.gas !== "bigint") return true;
		return false;
	})();
	if (consumedNonce && (attemptFill || prepareTransactionRequest)) nonce = await consumedNonce;
	let filledChainId;
	const fill = (request) => getAction(client, fillTransaction, "fillTransaction")({
		...request,
		nonce
	}).then((result) => {
		const { chainId, from, gas, gasPrice, nonce, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, type, ...rest } = result.transaction;
		const feeToken = "feeToken" in rest ? rest.feeToken : void 0;
		const hasFilledFeePayerSignature = "feePayerSignature" in rest && rest.feePayerSignature !== null && typeof rest.feePayerSignature !== "undefined";
		const shouldUseFilledFeeToken = typeof feeToken !== "undefined" && feeToken !== null && (!("feeToken" in request) || hasFilledFeePayerSignature);
		supportsFillTransaction.set(client.uid, true);
		filledChainId = chainId;
		const { feeToken: _feeToken, ...unsponsored } = request;
		return {
			...hasFilledFeePayerSignature ? unsponsored : request,
			...from ? { from } : {},
			...type && !request.type ? { type } : {},
			...typeof gas !== "undefined" ? { gas } : {},
			...typeof gasPrice !== "undefined" ? { gasPrice } : {},
			...typeof nonce !== "undefined" ? { nonce } : {},
			...typeof maxFeePerBlobGas !== "undefined" && request.type !== "legacy" && request.type !== "eip2930" ? { maxFeePerBlobGas } : {},
			...typeof maxFeePerGas !== "undefined" && request.type !== "legacy" && request.type !== "eip2930" ? { maxFeePerGas } : {},
			...typeof maxPriorityFeePerGas !== "undefined" && request.type !== "legacy" && request.type !== "eip2930" ? { maxPriorityFeePerGas } : {},
			..."nonceKey" in rest && typeof rest.nonceKey !== "undefined" ? { nonceKey: rest.nonceKey } : {},
			..."validBefore" in rest && rest.validBefore !== null && typeof rest.validBefore !== "undefined" ? { validBefore: rest.validBefore } : {},
			..."validAfter" in rest && rest.validAfter !== null && typeof rest.validAfter !== "undefined" ? { validAfter: rest.validAfter } : {},
			..."keyAuthorization" in rest && typeof rest.keyAuthorization !== "undefined" && rest.keyAuthorization !== null && !("keyAuthorization" in request) ? { keyAuthorization: rest.keyAuthorization } : {},
			..."feePayerSignature" in rest && typeof rest.feePayerSignature !== "undefined" && rest.feePayerSignature !== null ? { feePayerSignature: rest.feePayerSignature } : {},
			...shouldUseFilledFeeToken ? { feeToken } : {},
			...result.capabilities ? { _capabilities: result.capabilities } : {}
		};
	});
	const recover = (e, request) => {
		const error = e;
		if (error.name !== "TransactionExecutionError") return request;
		if (error.walk?.((error) => error instanceof FeePayerNonceMismatchError)) throw e;
		if (error.walk?.((e) => {
			return e.name === "ExecutionRevertedError";
		})) throw e;
		if (error.walk?.((e) => {
			const error = e;
			return error.name === "MethodNotFoundRpcError" || error.name === "MethodNotSupportedRpcError" || error.message?.includes("eth_fillTransaction is not available");
		})) supportsFillTransaction.set(client.uid, false);
		return request;
	};
	const fillResult = attemptFill ? await fill(request).catch(async (error) => {
		const retry = prepareTransactionRequest?.fn && prepareTransactionRequest.runAt?.includes("afterFillTransactionError") ? await prepareTransactionRequest.fn({
			...request,
			chain
		}, {
			client,
			error,
			phase: "afterFillTransactionError"
		}) : void 0;
		if (!retry) return recover(error, request);
		return fill(retry).catch((error) => recover(error, retry));
	}) : request;
	nonce ??= fillResult.nonce;
	request = {
		...fillResult,
		...account ? { from: account?.address } : {},
		...typeof nonce !== "undefined" ? { nonce } : {}
	};
	if (typeof filledChainId !== "undefined") {
		request.chainId ??= chain?.id ?? filledChainId;
		if (request.chainId !== filledChainId) throw new ChainMismatchError({
			chain: chain?.id === request.chainId ? chain : {
				id: request.chainId,
				name: "Unknown"
			},
			currentChainId: filledChainId
		});
	}
	const { blobs, gas, kzg, type } = request;
	if (prepareTransactionRequest?.fn && prepareTransactionRequest.runAt?.includes("beforeFillParameters")) request = await prepareTransactionRequest.fn({
		...request,
		chain
	}, {
		client,
		phase: "beforeFillParameters"
	}) ?? request;
	let block;
	function getBlock$1() {
		block ??= getAction(client, getBlock, "getBlock")({ blockTag: "latest" });
		return block;
	}
	const hasFeeHooks = Object.values(chain?.fees ?? {}).some((fee) => typeof fee === "function");
	const noncePromise = typeof nonce === "undefined" && consumedNonce ? consumedNonce : parameters.includes("nonce") && typeof nonce === "undefined" && account && !nonceManager ? getAction(client, getTransactionCount, "getTransactionCount")({
		address: account.address,
		blockTag: "pending"
	}) : void 0;
	noncePromise?.catch(() => {});
	if (noncePromise && hasFeeHooks) request.nonce = await noncePromise;
	try {
		if ((parameters.includes("blobVersionedHashes") || parameters.includes("sidecars")) && blobs && kzg) {
			const commitments = blobsToCommitments({
				blobs,
				kzg
			});
			if (parameters.includes("blobVersionedHashes")) {
				const versionedHashes = commitmentsToVersionedHashes({
					commitments,
					to: "hex"
				});
				request.blobVersionedHashes = versionedHashes;
			}
			if (parameters.includes("sidecars")) {
				const sidecars = toBlobSidecars({
					blobs,
					commitments,
					proofs: blobsToProofs({
						blobs,
						commitments,
						kzg
					}),
					to: "hex"
				});
				request.sidecars = sidecars;
			}
		}
		if (parameters.includes("chainId")) request.chainId = await getChainId$1();
		let priorityFeePromise;
		if ((parameters.includes("fees") || parameters.includes("type")) && typeof type === "undefined") try {
			request.type = getTransactionType(request);
		} catch {
			let isEip1559Network = eip1559NetworkCache.get(client.uid);
			if (typeof isEip1559Network === "undefined") {
				if (parameters.includes("fees") && !hasFeeHooks) {
					priorityFeePromise = internal_estimateMaxPriorityFeePerGas(client, {
						block: getBlock$1(),
						chain,
						request
					});
					priorityFeePromise.catch(() => {});
				}
				isEip1559Network = typeof (await getBlock$1())?.baseFeePerGas === "bigint";
				eip1559NetworkCache.set(client.uid, isEip1559Network);
			}
			request.type = isEip1559Network ? "eip1559" : "legacy";
		}
		if (parameters.includes("fees")) {
			if (request.type !== "legacy" && request.type !== "eip2930") {
				if (typeof request.maxFeePerGas === "undefined" || typeof request.maxPriorityFeePerGas === "undefined") {
					const [block, priorityFee] = await Promise.all([getBlock$1(), hasFeeHooks || typeof request.maxPriorityFeePerGas === "bigint" ? void 0 : priorityFeePromise ?? internal_estimateMaxPriorityFeePerGas(client, {
						block: getBlock$1(),
						chain,
						request
					})]);
					const { maxFeePerGas, maxPriorityFeePerGas } = await internal_estimateFeesPerGas(client, {
						block,
						chain,
						request: typeof priorityFee === "bigint" ? {
							...request,
							maxPriorityFeePerGas: priorityFee
						} : request
					});
					if (typeof request.maxPriorityFeePerGas === "undefined" && typeof request.maxFeePerGas === "bigint" && request.maxFeePerGas < maxPriorityFeePerGas) throw new MaxFeePerGasTooLowError({ maxPriorityFeePerGas });
					request.maxPriorityFeePerGas = maxPriorityFeePerGas;
					request.maxFeePerGas = maxFeePerGas;
				}
			} else {
				if (typeof request.maxFeePerGas !== "undefined" || typeof request.maxPriorityFeePerGas !== "undefined") throw new Eip1559FeesNotSupportedError();
				if (typeof request.gasPrice === "undefined") {
					const { gasPrice: gasPrice_ } = await internal_estimateFeesPerGas(client, {
						block: hasFeeHooks ? await getBlock$1() : void 0,
						chain,
						request,
						type: "legacy"
					});
					request.gasPrice = gasPrice_;
				}
			}
		}
	} catch (error) {
		await noncePromise;
		throw error;
	}
	if (noncePromise) request.nonce = await noncePromise;
	if (parameters.includes("gas") && typeof gas === "undefined") request.gas = await getAction(client, estimateGas, "estimateGas")({
		...request,
		account,
		prepare: account?.type === "local" ? [] : ["blobVersionedHashes"]
	});
	if (prepareTransactionRequest?.fn && prepareTransactionRequest.runAt?.includes("afterFillParameters")) request = await prepareTransactionRequest.fn({
		...request,
		chain
	}, {
		client,
		phase: "afterFillParameters"
	}) ?? request;
	assertRequest(request);
	delete request.parameters;
	return request;
}
//#endregion
//#region node_modules/viem/_esm/actions/public/estimateGas.js
/**
* Estimates the gas necessary to complete a transaction without submitting it to the network.
*
* - Docs: https://viem.sh/docs/actions/public/estimateGas
* - JSON-RPC Methods: [`eth_estimateGas`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_estimategas)
*
* @param client - Client to use
* @param parameters - {@link EstimateGasParameters}
* @returns The gas estimate (in gas units). {@link EstimateGasReturnType}
*
* @example
* import { createPublicClient, http, parseEther } from 'viem'
* import { mainnet } from 'viem/chains'
* import { estimateGas } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const gasEstimate = await estimateGas(client, {
*   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
*   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
*   value: parseEther('1'),
* })
*/
async function estimateGas(client, args) {
	const { account: account_ = client.account, prepare = true } = args;
	const account = account_ ? parseAccount(account_) : void 0;
	const hasContext = args.stateOverride !== void 0 || typeof args.blockNumber === "bigint" || args.blockTag !== void 0;
	const parameters = (() => {
		if (Array.isArray(prepare)) return prepare;
		if (account?.type !== "local" || hasContext) return ["blobVersionedHashes"];
	})();
	try {
		const to = await (async () => {
			if (args.to) return args.to;
			if (args.authorizationList && args.authorizationList.length > 0) return await recoverAuthorizationAddress({ authorization: args.authorizationList[0] }).catch(() => {
				throw new BaseError$3("`to` is required. Could not infer from `authorizationList`");
			});
		})();
		const { accessList, authorizationList, blobs, blobVersionedHashes, blockNumber, blockTag, data, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce, value, stateOverride, ...rest } = prepare ? await prepareTransactionRequest(client, {
			...args,
			parameters,
			to
		}) : args;
		if (gas && args.gas !== gas && !hasContext) return gas;
		const block = (typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0) || blockTag;
		const rpcStateOverride = serializeStateOverride(stateOverride);
		assertRequest(args);
		const chainFormat = client.chain?.formatters?.transactionRequest?.format;
		const request = (chainFormat || formatTransactionRequest)({
			...extract(rest, { format: chainFormat }),
			account,
			accessList,
			authorizationList,
			blobs,
			blobVersionedHashes,
			data,
			gasPrice,
			maxFeePerBlobGas,
			maxFeePerGas,
			maxPriorityFeePerGas,
			nonce,
			to,
			value
		}, "estimateGas");
		return BigInt(await client.request({
			method: "eth_estimateGas",
			params: rpcStateOverride ? [
				request,
				block ?? client.experimental_blockTag ?? "latest",
				rpcStateOverride
			] : block ? [request, block] : [request]
		}));
	} catch (err) {
		throw getEstimateGasError(err, {
			...args,
			account,
			chain: client.chain
		});
	}
}
//#endregion
//#region node_modules/viem/_esm/actions/public/estimateContractGas.js
/**
* Estimates the gas required to successfully execute a contract write function call.
*
* - Docs: https://viem.sh/docs/contract/estimateContractGas
*
* Internally, uses a [Public Client](https://viem.sh/docs/clients/public) to call the [`estimateGas` action](https://viem.sh/docs/actions/public/estimateGas) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData).
*
* @param client - Client to use
* @param parameters - {@link EstimateContractGasParameters}
* @returns The gas estimate (in wei). {@link EstimateContractGasReturnType}
*
* @example
* import { createPublicClient, http, parseAbi } from 'viem'
* import { mainnet } from 'viem/chains'
* import { estimateContractGas } from 'viem/contract'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const gas = await estimateContractGas(client, {
*   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
*   abi: parseAbi(['function mint() public']),
*   functionName: 'mint',
*   account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
* })
*/
async function estimateContractGas(client, parameters) {
	const { abi, address, args, functionName, dataSuffix = typeof client.dataSuffix === "string" ? client.dataSuffix : client.dataSuffix?.value, ...request } = parameters;
	const data = encodeFunctionData({
		abi,
		args,
		functionName
	});
	try {
		return await getAction(client, estimateGas, "estimateGas")({
			data: dataSuffix ? concat$1([data, dataSuffix.length % 2 ? `0x0${dataSuffix.slice(2)}` : dataSuffix]) : data,
			to: address,
			...request
		});
	} catch (error) {
		throw getContractError(error, {
			abi,
			address,
			args,
			docsPath: "/docs/contract/estimateContractGas",
			functionName,
			sender: (request.account ? parseAccount(request.account) : void 0)?.address
		});
	}
}
//#endregion
//#region node_modules/viem/_esm/actions/public/getBalance.js
/**
* Returns the balance of an address in wei.
*
* - Docs: https://viem.sh/docs/actions/public/getBalance
* - JSON-RPC Methods: [`eth_getBalance`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getbalance)
*
* You can convert the balance to ether units with [`formatEther`](https://viem.sh/docs/utilities/formatEther).
*
* ```ts
* const balance = await getBalance(client, {
*   address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
*   blockTag: 'safe'
* })
* const balanceAsEther = formatEther(balance)
* // "6.942"
* ```
*
* @param client - Client to use
* @param parameters - {@link GetBalanceParameters}
* @returns The balance of the address in wei. {@link GetBalanceReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getBalance } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const balance = await getBalance(client, {
*   address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
* })
* // 10000000000000000000000n (wei)
*/
async function getBalance$1(client, { address, blockHash, blockNumber, blockTag = client.experimental_blockTag ?? "latest", requireCanonical }) {
	const block = formatBlockParameter({
		blockHash,
		blockNumber,
		blockTag,
		requireCanonical
	});
	if (client.batch?.multicall && client.chain?.contracts?.multicall3) {
		const multicall3Address = client.chain.contracts.multicall3.address;
		const calldata = encodeFunctionData({
			abi: multicall3Abi,
			functionName: "getEthBalance",
			args: [address]
		});
		const { data } = await getAction(client, call, "call")({
			to: multicall3Address,
			data: calldata,
			blockHash,
			blockNumber,
			blockTag,
			requireCanonical
		});
		return decodeFunctionResult({
			abi: multicall3Abi,
			functionName: "getEthBalance",
			args: [address],
			data: data || "0x"
		});
	}
	const balance = await client.request({
		method: "eth_getBalance",
		params: [address, block]
	});
	return BigInt(balance);
}
//#endregion
//#region node_modules/viem/_esm/actions/public/getBlobBaseFee.js
/**
* Returns the base fee per blob gas in wei.
*
* - Docs: https://viem.sh/docs/actions/public/getBlobBaseFee
* - JSON-RPC Methods: [`eth_blobBaseFee`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_blobBaseFee)
*
* @param client - Client to use
* @returns The blob base fee (in wei). {@link GetBlobBaseFeeReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getBlobBaseFee } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const blobBaseFee = await getBlobBaseFee(client)
*/
async function getBlobBaseFee(client) {
	const baseFee = await client.request({ method: "eth_blobBaseFee" });
	return BigInt(baseFee);
}
//#endregion
//#region node_modules/viem/_esm/utils/promise/withCache.js
/** @internal */
var promiseCache = /*#__PURE__*/ new LruMap$1(8192);
/** @internal */
var responseCache = /*#__PURE__*/ new LruMap$1(8192);
function getCache(cacheKey) {
	const buildCache = (cacheKey, cache) => ({
		clear: () => cache.delete(cacheKey),
		get: () => cache.get(cacheKey),
		set: (data) => cache.set(cacheKey, data)
	});
	const promise = buildCache(cacheKey, promiseCache);
	const response = buildCache(cacheKey, responseCache);
	return {
		clear: () => {
			promise.clear();
			response.clear();
		},
		promise,
		response
	};
}
/**
* @description Returns the result of a given promise, and caches the result for
* subsequent invocations against a provided cache key.
*/
async function withCache(fn, { cacheKey, cacheTime = Number.POSITIVE_INFINITY }) {
	const cache = getCache(cacheKey);
	const response = cache.response.get();
	if (response && cacheTime > 0) {
		if (Date.now() - response.created.getTime() < cacheTime) return response.data;
	}
	let promise = cache.promise.get();
	if (!promise) {
		promise = fn();
		cache.promise.set(promise);
	}
	try {
		const data = await promise;
		cache.response.set({
			created: /* @__PURE__ */ new Date(),
			data
		});
		return data;
	} finally {
		cache.promise.clear();
	}
}
//#endregion
//#region node_modules/viem/_esm/actions/public/getBlockNumber.js
var cacheKey = (id) => `blockNumber.${id}`;
/**
* Returns the number of the most recent block seen.
*
* - Docs: https://viem.sh/docs/actions/public/getBlockNumber
* - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks_fetching-blocks
* - JSON-RPC Methods: [`eth_blockNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_blocknumber)
*
* @param client - Client to use
* @param parameters - {@link GetBlockNumberParameters}
* @returns The number of the block. {@link GetBlockNumberReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getBlockNumber } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const blockNumber = await getBlockNumber(client)
* // 69420n
*/
async function getBlockNumber(client, { cacheTime = client.cacheTime } = {}) {
	const blockNumberHex = await withCache(() => client.request({ method: "eth_blockNumber" }), {
		cacheKey: cacheKey(client.uid),
		cacheTime
	});
	return BigInt(blockNumberHex);
}
//#endregion
//#region node_modules/viem/_esm/utils/formatters/log.js
function formatLog(log, { args, eventName } = {}) {
	const result = {
		...log,
		blockHash: log.blockHash ? log.blockHash : null,
		blockNumber: log.blockNumber ? BigInt(log.blockNumber) : null,
		blockTimestamp: log.blockTimestamp ? BigInt(log.blockTimestamp) : log.blockTimestamp === null ? null : void 0,
		logIndex: log.logIndex ? Number(log.logIndex) : null,
		transactionHash: log.transactionHash ? log.transactionHash : null,
		transactionIndex: log.transactionIndex ? Number(log.transactionIndex) : null
	};
	if (eventName) {
		result.args = args;
		result.eventName = eventName;
	}
	return result;
}
//#endregion
//#region node_modules/viem/_esm/utils/formatters/transactionReceipt.js
var receiptStatuses = {
	"0x0": "reverted",
	"0x1": "success"
};
function formatTransactionReceipt(transactionReceipt, _) {
	const receipt = {
		...transactionReceipt,
		blockNumber: transactionReceipt.blockNumber ? BigInt(transactionReceipt.blockNumber) : null,
		contractAddress: transactionReceipt.contractAddress ? transactionReceipt.contractAddress : null,
		cumulativeGasUsed: transactionReceipt.cumulativeGasUsed ? BigInt(transactionReceipt.cumulativeGasUsed) : null,
		effectiveGasPrice: transactionReceipt.effectiveGasPrice ? BigInt(transactionReceipt.effectiveGasPrice) : null,
		gasUsed: transactionReceipt.gasUsed ? BigInt(transactionReceipt.gasUsed) : null,
		logs: transactionReceipt.logs ? transactionReceipt.logs.map((log) => formatLog(log)) : null,
		to: transactionReceipt.to ? transactionReceipt.to : null,
		transactionIndex: transactionReceipt.transactionIndex ? hexToNumber(transactionReceipt.transactionIndex) : null,
		status: transactionReceipt.status ? receiptStatuses[transactionReceipt.status] : null,
		type: transactionReceipt.type ? transactionType[transactionReceipt.type] || transactionReceipt.type : null
	};
	if (transactionReceipt.blobGasPrice) receipt.blobGasPrice = BigInt(transactionReceipt.blobGasPrice);
	if (transactionReceipt.blobGasUsed) receipt.blobGasUsed = BigInt(transactionReceipt.blobGasUsed);
	return receipt;
}
//#endregion
//#region node_modules/viem/_esm/actions/public/getBlockReceipts.js
/**
* Returns the transaction receipts of a block at a block number, hash, or tag.
*
* - Docs: https://viem.sh/docs/actions/public/getBlockReceipts
* - JSON-RPC Methods: [`eth_getBlockReceipts`](https://ethereum.github.io/execution-apis/api/methods/eth_getBlockReceipts/)
*
* @param client - Client to use
* @param parameters - {@link GetBlockReceiptsParameters}
* @returns The transaction receipts. {@link GetBlockReceiptsReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getBlockReceipts } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const receipts = await getBlockReceipts(client, {
*   blockNumber: 69420n,
* })
*/
async function getBlockReceipts(client, { blockHash, blockNumber, blockTag = client.experimental_blockTag ?? "latest" } = {}) {
	const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
	const receipts = await client.request({
		method: "eth_getBlockReceipts",
		params: [blockHash || blockNumberHex || blockTag]
	}, { dedupe: Boolean(blockHash || blockNumberHex) });
	if (!receipts) throw new BlockNotFoundError({
		blockHash,
		blockNumber
	});
	const format = client.chain?.formatters?.transactionReceipt?.format || formatTransactionReceipt;
	return receipts.map((receipt) => format(receipt, "getBlockReceipts"));
}
//#endregion
//#region node_modules/viem/_esm/actions/public/getBlockTransactionCount.js
/**
* Returns the number of Transactions at a block number, hash, or tag.
*
* - Docs: https://viem.sh/docs/actions/public/getBlockTransactionCount
* - JSON-RPC Methods:
*   - Calls [`eth_getBlockTransactionCountByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbynumber) for `blockNumber` & `blockTag`.
*   - Calls [`eth_getBlockTransactionCountByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbyhash) for `blockHash`.
*
* @param client - Client to use
* @param parameters - {@link GetBlockTransactionCountParameters}
* @returns The block transaction count. {@link GetBlockTransactionCountReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getBlockTransactionCount } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const count = await getBlockTransactionCount(client)
*/
async function getBlockTransactionCount(client, { blockHash, blockNumber, blockTag = "latest" } = {}) {
	const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
	let count;
	if (blockHash) count = await client.request({
		method: "eth_getBlockTransactionCountByHash",
		params: [blockHash]
	}, { dedupe: true });
	else count = await client.request({
		method: "eth_getBlockTransactionCountByNumber",
		params: [blockNumberHex || blockTag]
	}, { dedupe: Boolean(blockNumberHex) });
	return hexToNumber(count);
}
//#endregion
//#region node_modules/viem/_esm/actions/public/getCode.js
/**
* Retrieves the bytecode at an address.
*
* - Docs: https://viem.sh/docs/contract/getCode
* - JSON-RPC Methods: [`eth_getCode`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getcode)
*
* @param client - Client to use
* @param parameters - {@link GetCodeParameters}
* @returns The contract's bytecode. {@link GetCodeReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getCode } from 'viem/contract'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const code = await getCode(client, {
*   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
* })
*/
async function getCode(client, { address, blockHash, blockNumber, blockTag = "latest", requireCanonical }) {
	const block = formatBlockParameter({
		blockHash,
		blockNumber,
		blockTag,
		requireCanonical
	});
	const hex = await client.request({
		method: "eth_getCode",
		params: [address, block]
	}, { dedupe: typeof blockNumber === "bigint" || blockHash !== void 0 });
	if (hex === "0x") return void 0;
	return hex;
}
//#endregion
//#region node_modules/viem/_esm/utils/abi/decodeEventLog.js
var docsPath = "/docs/contract/decodeEventLog";
function decodeEventLog(parameters) {
	const { abi, data, eventName, strict: strict_, topics } = parameters;
	const strict = strict_ ?? true;
	const events = abi.filter((item) => item.type === "event" && "name" in item);
	const signature = topics[0];
	const bySelector = signature ? events.find((item) => !item.anonymous && signature === toEventSelector(formatAbiItem$1(item))) : void 0;
	const candidates = bySelector ? [bySelector] : anonymousCandidates(events, topics.length, eventName);
	if (candidates.length > 1) throw new AbiEventAmbiguityError(candidates.map((item) => item.name));
	const abiItem = candidates[0];
	if (!abiItem) {
		if (!signature) throw new AbiEventSignatureEmptyTopicsError({ docsPath });
		throw new AbiEventSignatureNotFoundError(signature, { docsPath });
	}
	return decodeMatchedEventLog({
		argTopics: abiItem.anonymous ? topics : topics.slice(1),
		data,
		plan: toEventPlan(abiItem),
		strict
	});
}
/** @internal */
function toEventPlan(abiItem) {
	const { inputs } = abiItem;
	const isUnnamed = inputs?.some((x) => !("name" in x && x.name));
	return {
		abiItem,
		indexedInputs: inputs.map((x, i) => [x, i]).filter(([x]) => "indexed" in x && x.indexed).map(([x, i]) => [
			x,
			i,
			topicKind(x)
		]),
		isUnnamed,
		nonIndexedInputs: inputs.filter((x) => !("indexed" in x && x.indexed)),
		selector: void 0
	};
}
/**
* Decodes a log against one event, as `decodeEventLog` does with an ABI that
* holds only that event.
*
* @internal
*/
function decodeEventLogWithPlan(plan, { data, eventName, strict, topics }) {
	const { abiItem } = plan;
	const signature = topics[0];
	const events = "name" in abiItem ? [abiItem] : [];
	if (events.length > 0 && signature && !abiItem.anonymous) {
		plan.selector ??= toEventSelector(formatAbiItem$1(abiItem));
		if (signature === plan.selector) return decodeMatchedEventLog({
			argTopics: topics.slice(1),
			data,
			plan,
			strict
		});
	}
	if (anonymousCandidates(events, topics.length, eventName).length === 0) {
		if (!signature) throw new AbiEventSignatureEmptyTopicsError({ docsPath });
		throw new AbiEventSignatureNotFoundError(signature, { docsPath });
	}
	return decodeMatchedEventLog({
		argTopics: topics,
		data,
		plan,
		strict
	});
}
function anonymousCandidates(events, topicCount, eventName) {
	return (() => {
		if (eventName) return events.filter((item) => item.name === eventName);
		if (events.every((item) => item.anonymous)) return events;
		return [];
	})().filter((item) => item.anonymous && indexedCount(item) === topicCount);
}
function indexedCount(item) {
	return item.inputs?.filter((input) => input.indexed).length ?? 0;
}
function decodeMatchedEventLog({ argTopics, data, plan, strict }) {
	const { abiItem, indexedInputs, isUnnamed, nonIndexedInputs } = plan;
	const { name, inputs } = abiItem;
	const args = isUnnamed ? [] : {};
	const missingIndexedInputs = [];
	for (let i = 0; i < indexedInputs.length; i++) {
		const [param, argIndex, kind] = indexedInputs[i];
		const topic = argTopics[i];
		if (!topic) {
			if (strict) throw new DecodeLogTopicsMismatch({
				abiItem,
				param
			});
			missingIndexedInputs.push([param, argIndex]);
			continue;
		}
		args[isUnnamed ? argIndex : param.name || argIndex] = decodeTopic(param, kind, topic);
	}
	const inputsToDecode = strict ? nonIndexedInputs : [...missingIndexedInputs.map(([param]) => param), ...nonIndexedInputs];
	if (inputsToDecode.length > 0) {
		if (data && data !== "0x") try {
			const decodedData = decodeAbiParameters(inputsToDecode, data);
			if (decodedData) {
				let dataIndex = 0;
				if (!strict) for (const [param, argIndex] of missingIndexedInputs) args[isUnnamed ? argIndex : param.name || argIndex] = decodedData[dataIndex++];
				if (isUnnamed) {
					for (let i = 0; i < inputs.length; i++) if (args[i] === void 0 && dataIndex < decodedData.length) args[i] = decodedData[dataIndex++];
				} else for (let i = 0; i < nonIndexedInputs.length; i++) args[nonIndexedInputs[i].name] = decodedData[dataIndex++];
			}
		} catch (err) {
			if (strict) {
				if (err instanceof AbiDecodingDataSizeTooSmallError || err instanceof PositionOutOfBoundsError$1) throw new DecodeLogDataMismatch({
					abiItem,
					data,
					params: inputsToDecode,
					size: size$4(data)
				});
				throw err;
			}
		}
		else if (strict) throw new DecodeLogDataMismatch({
			abiItem,
			data: "0x",
			params: inputsToDecode,
			size: 0
		});
	}
	return {
		eventName: name,
		args: Object.values(args).length > 0 ? args : void 0
	};
}
function topicKind(param) {
	const { type } = param;
	if (typeof type !== "string") return "decode";
	if (type === "string" || type === "bytes" || type === "tuple" || type.match(/^(.*)\[(\d+)?\]$/)) return "hashed";
	if (type === "address") return "address";
	if (bytesRegex$2.test(type)) return "bytes";
	const integer = integerRegex$2.exec(type);
	if (integer?.[1] === "uint" && Number(integer[2] ?? 256) > 48) return "uint";
	return "decode";
}
var topicRegex = /^0x[0-9a-fA-F]{64}$/;
function decodeTopic(param, kind, value) {
	if (kind !== "decode" && kind !== "hashed" && topicRegex.test(value)) {
		if (kind === "address") return checksumAddress(`0x${value.slice(26).toLowerCase()}`);
		if (kind === "uint") return BigInt(value);
		return value.slice(0, 2 + Number(param.type.slice(5)) * 2).toLowerCase();
	}
	if (param.type === "string" || param.type === "bytes" || param.type === "tuple" || param.type.match(/^(.*)\[(\d+)?\]$/)) return value;
	return (decodeAbiParameters([param], value) || [])[0];
}
/**
* Thrown by {@link decodeEventLog} when an anonymous event log fits more than
* one requested anonymous event with the same number of indexed inputs.
*/
var AbiEventAmbiguityError = class extends BaseError$3 {
	constructor(eventNames) {
		const distinct = new Set(eventNames).size === eventNames.length;
		super("Ambiguous anonymous event log.", {
			docsPath,
			metaMessages: [
				`Matched ${eventNames.map((name) => `\`${name}\``).join(", ")}.`,
				"These events take the same number of indexed topics.",
				distinct ? "Pass `eventName` to choose one." : "Pass an `abi` that holds only the event to decode."
			],
			name: "AbiEventAmbiguityError"
		});
	}
};
//#endregion
//#region node_modules/viem/_esm/utils/abi/parseEventLogs.js
/**
* Extracts & decodes logs matching the provided signature(s) (`abi` + optional `eventName`)
* from a set of opaque logs.
*
* @param parameters - {@link ParseEventLogsParameters}
* @returns The logs. {@link ParseEventLogsReturnType}
*
* @example
* import { createClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { parseEventLogs } from 'viem/op-stack'
*
* const client = createClient({
*   chain: mainnet,
*   transport: http(),
* })
*
* const receipt = await getTransactionReceipt(client, {
*   hash: '0xec23b2ba4bc59ba61554507c1b1bc91649e6586eb2dd00c728e8ed0db8bb37ea',
* })
*
* const logs = parseEventLogs({ logs: receipt.logs })
* // [{ args: { ... }, eventName: 'TransactionDeposited', ... }, ...]
*/
function parseEventLogs(parameters) {
	const { abi, args, logs, strict = true } = parameters;
	const eventName = (() => {
		if (!parameters.eventName) return void 0;
		if (Array.isArray(parameters.eventName)) return parameters.eventName;
		return [parameters.eventName];
	})();
	const plans = [];
	const bySelector = /* @__PURE__ */ new Map();
	for (const abiItem of abi) {
		if (abiItem.type !== "event") continue;
		const topic = toEventSelector(abiItem);
		const plan = {
			...toEventPlan(abiItem),
			topic
		};
		plans.push(plan);
		if (abiItem.anonymous) continue;
		const list = bySelector.get(plan.topic);
		if (list) list.push(plan);
		else bySelector.set(plan.topic, [plan]);
	}
	const anonymousPlans = (() => {
		if (eventName) return plans.filter((item) => item.abiItem.anonymous && eventName.includes(item.abiItem.name));
		if (plans.every((item) => item.abiItem.anonymous)) return plans;
		return [];
	})();
	const result = [];
	for (const log of logs) {
		const formattedLog = typeof log.blockNumber === "string" ? formatLog(log) : log;
		const { topics } = formattedLog;
		const plansBySelector = bySelector.get(topics[0]);
		const candidates = (() => {
			if (plansBySelector) {
				if (!eventName) return plansBySelector;
				return plansBySelector.filter((item) => eventName.includes(item.abiItem.name));
			}
			const anonymous = anonymousPlans.filter((item) => item.indexedInputs.length === topics.length);
			if (anonymous.length === 1) return anonymous;
			return [];
		})();
		if (candidates.length === 0) continue;
		let event;
		let plan;
		for (const item of candidates) {
			if (topics.length - (item.abiItem.anonymous ? 0 : 1) < item.indexedInputs.length || item.nonIndexedInputs.length > 0 && (!formattedLog.data || formattedLog.data === "0x")) continue;
			try {
				event = decodeEventLogWithPlan(item, {
					data: formattedLog.data,
					eventName: formattedLog.eventName,
					strict: true,
					topics
				});
				plan = item;
				break;
			} catch {}
		}
		if (!event && !strict) {
			const fallback = candidates[0];
			if (!fallback || fallback.abiItem.anonymous) continue;
			plan = fallback;
			try {
				event = decodeEventLogWithPlan(plan, {
					data: formattedLog.data,
					eventName: void 0,
					strict: false,
					topics
				});
			} catch {
				event = {
					eventName: plan.abiItem.name,
					args: plan.isUnnamed ? [] : {}
				};
			}
		}
		if (!event || !plan) continue;
		if (eventName && !eventName.includes(event.eventName)) continue;
		if (!includesArgs({
			anonymous: plan.abiItem.anonymous,
			args: event.args,
			inputs: plan.abiItem.inputs,
			matchArgs: args,
			topics
		})) continue;
		result.push({
			...event,
			...formattedLog
		});
	}
	return result;
}
function includesArgs(parameters) {
	const { anonymous, args, inputs, matchArgs, topics } = parameters;
	if (!matchArgs) return true;
	if (!args) return false;
	const topicInputs = inputs.filter((input) => input.indexed).slice(0, anonymous ? topics.length : topics.length - 1);
	function isEqual(input, value, arg) {
		try {
			if (input.type === "address") return isAddressEqual(value, arg);
			if (topicInputs.includes(input) && (input.type === "string" || input.type === "bytes")) return keccak256$1(input.type === "string" ? stringToBytes(value) : toBytes$1(value)) === arg;
			if (typeof value === "string" && typeof arg === "string" && bytesRegex$2.test(input.type)) return value.toLowerCase() === arg.toLowerCase();
			if (integerRegex$2.test(input.type) && (typeof value === "number" || typeof value === "bigint") && (typeof arg === "number" || typeof arg === "bigint")) return BigInt(value) === BigInt(arg);
			return value === arg;
		} catch {
			return false;
		}
	}
	if (Array.isArray(args) && Array.isArray(matchArgs)) return matchArgs.every((value, index) => {
		if (value === null || value === void 0) return true;
		const input = inputs[index];
		if (!input) return false;
		return (Array.isArray(value) ? value : [value]).some((value) => isEqual(input, value, args[index]));
	});
	if (typeof args === "object" && !Array.isArray(args) && typeof matchArgs === "object" && !Array.isArray(matchArgs)) return Object.entries(matchArgs).every(([key, value]) => {
		if (value === null || value === void 0) return true;
		const input = inputs.find((input) => input.name === key);
		if (!input) return false;
		return (Array.isArray(value) ? value : [value]).some((value) => isEqual(input, value, args[key]));
	});
	return false;
}
//#endregion
//#region node_modules/viem/_esm/actions/public/internal/isRangeError.js
/** Returns whether a failed `eth_getLogs` request may succeed with a smaller block range. */
function isRangeError(error) {
	if (!(error instanceof BaseError$3)) return true;
	const cause = error.walk((err) => err instanceof HttpRequestError || err instanceof RpcRequestError);
	if (!cause) return true;
	if (cause instanceof RpcRequestError && cause.code === 429) return false;
	if (cause instanceof HttpRequestError && cause.status === void 0) return false;
	return cause.status !== 401 && cause.status !== 403 && cause.status !== 429;
}
//#endregion
//#region node_modules/viem/_esm/actions/public/iterateLogs.js
/**
* Iterates over the event logs in a block range, one page of blocks at a time.
*
* - Docs: https://viem.sh/docs/actions/public/iterateLogs
* - JSON-RPC Methods: [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs)
*
* Pages are contiguous and are yielded even when they contain no logs, so a consumer that
* stores each page's `toBlock` can resume from `toBlock + 1n`. A page is only requested
* once the consumer asks for it. If a request fails with an error that a smaller block
* range may avoid (such as an RPC Provider's block range or response size limit), the page
* is halved and requested again.
*
* @param client - Client to use
* @param parameters - {@link IterateLogsParameters}
* @returns An async iterator of log pages. {@link IterateLogsReturnType}
*
* @example
* import { createPublicClient, http, parseAbiItem } from 'viem'
* import { mainnet } from 'viem/chains'
* import { iterateLogs } from 'viem/actions'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* for await (const page of iterateLogs(client, {
*   event: parseAbiItem('event Transfer(address indexed, address indexed, uint256)'),
*   fromBlock: 16330000n,
*   toBlock: 16340000n,
* })) {
*   console.log(page.toBlock, page.logs)
* }
*/
async function* iterateLogs(client, parameters) {
	const { address, args, blockRange = 1000n, event, events, fromBlock, strict, toBlock = "latest" } = parameters;
	if (blockRange < 1n) throw new BaseError$3(`\`blockRange\` must be at least 1n.`);
	const endBlock = typeof toBlock === "bigint" ? toBlock : (await getAction(client, getBlock, "getBlock")({ blockTag: toBlock })).number;
	let size = blockRange;
	let from = fromBlock;
	while (from <= endBlock) {
		const end = from + size - 1n;
		const to = end < endBlock ? end : endBlock;
		const logs = await getAction(client, getLogs, "getLogs")({
			address,
			args,
			event,
			events,
			fromBlock: from,
			strict,
			toBlock: to
		}).catch((error) => {
			if (from === to || !isRangeError(error)) throw error;
		});
		if (!logs) {
			size = (to - from + 1n) / 2n;
			continue;
		}
		yield {
			endBlock,
			fromBlock: from,
			logs,
			toBlock: to
		};
		from = to + 1n;
		size = size * 2n < blockRange ? size * 2n : blockRange;
	}
}
//#endregion
//#region node_modules/viem/_esm/actions/public/getLogs.js
/**
* Returns a list of event logs matching the provided parameters.
*
* - Docs: https://viem.sh/docs/actions/public/getLogs
* - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/logs_event-logs
* - JSON-RPC Methods: [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs)
*
* @param client - Client to use
* @param parameters - {@link GetLogsParameters}
* @returns A list of event logs. {@link GetLogsReturnType}
*
* @example
* import { createPublicClient, http, parseAbiItem } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getLogs } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const logs = await getLogs(client)
*/
async function getLogs(client, { address, blockHash, fromBlock, toBlock, event, events: events_, args, blockRange, strict: strict_ } = {}) {
	if (blockRange !== void 0) {
		const logs = [];
		for await (const page of iterateLogs(client, {
			address,
			args,
			blockRange,
			event,
			events: events_,
			fromBlock,
			strict: strict_,
			toBlock
		})) for (const log of page.logs) logs.push(log);
		return logs;
	}
	const strict = strict_ ?? false;
	const events = events_ ?? (event ? [event] : void 0);
	const topics = encodeEventFilterTopics({
		args: events_ ? void 0 : args,
		event,
		events: events_
	});
	let logs;
	if (blockHash) logs = await client.request({
		method: "eth_getLogs",
		params: [{
			address,
			topics,
			blockHash
		}]
	});
	else logs = await client.request({
		method: "eth_getLogs",
		params: [{
			address,
			topics,
			fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
			toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock
		}]
	});
	const formattedLogs = logs.map((log) => formatLog(log));
	if (!events) return formattedLogs;
	return parseEventLogs({
		abi: events,
		args,
		logs: formattedLogs,
		strict
	});
}
//#endregion
//#region node_modules/viem/_esm/actions/public/getContractEvents.js
/**
* Returns a list of event logs emitted by a contract.
*
* - Docs: https://viem.sh/docs/contract/getContractEvents#getcontractevents
* - JSON-RPC Methods: [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs)
*
* @param client - Client to use
* @param parameters - {@link GetContractEventsParameters}
* @returns A list of event logs. {@link GetContractEventsReturnType}
*
* @example
* import { createClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getContractEvents } from 'viem/public'
* import { wagmiAbi } from './abi'
*
* const client = createClient({
*   chain: mainnet,
*   transport: http(),
* })
* const logs = await getContractEvents(client, {
*  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
*  abi: wagmiAbi,
*  eventName: 'Transfer'
* })
*/
async function getContractEvents(client, parameters) {
	const { abi, address, args, blockHash, eventName, fromBlock, toBlock, strict } = parameters;
	const event = eventName ? getAbiItem({
		abi,
		name: eventName
	}) : void 0;
	const events = !event ? abi.filter((x) => x.type === "event") : void 0;
	return getAction(client, getLogs, "getLogs")({
		address,
		args,
		blockHash,
		event,
		events,
		fromBlock,
		toBlock,
		strict
	});
}
//#endregion
//#region node_modules/viem/_esm/actions/public/getDelegation.js
/**
* Returns the address that an account has delegated to via EIP-7702.
*
* - Docs: https://viem.sh/docs/actions/public/getDelegation
*
* @param client - Client to use
* @param parameters - {@link GetDelegationParameters}
* @returns The delegated address, or undefined if not delegated. {@link GetDelegationReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getDelegation } from 'viem/actions'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const delegation = await getDelegation(client, {
*   address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
* })
*/
async function getDelegation(client, { address, blockNumber, blockTag = "latest" }) {
	const code = await getAction(client, getCode, "getCode")({
		address,
		...blockNumber !== void 0 ? { blockNumber } : { blockTag }
	});
	if (!code) return void 0;
	if (size$4(code) !== 23) return void 0;
	if (!code.startsWith("0xef0100")) return void 0;
	return getAddress(slice$2(code, 3, 23));
}
//#endregion
//#region node_modules/viem/_esm/errors/eip712.js
var Eip712DomainNotFoundError = class extends BaseError$3 {
	constructor({ address }) {
		super(`No EIP-712 domain found on contract "${address}".`, {
			metaMessages: [
				"Ensure that:",
				`- The contract is deployed at the address "${address}".`,
				"- `eip712Domain()` function exists on the contract.",
				"- `eip712Domain()` function matches signature to ERC-5267 specification."
			],
			name: "Eip712DomainNotFoundError"
		});
	}
};
//#endregion
//#region node_modules/viem/_esm/actions/public/getEip712Domain.js
/**
* Reads the EIP-712 domain from a contract, based on the ERC-5267 specification.
*
* @param client - A {@link Client} instance.
* @param parameters - The parameters of the action. {@link GetEip712DomainParameters}
* @returns The EIP-712 domain, fields, and extensions. {@link GetEip712DomainReturnType}
*
* @example
* ```ts
* import { createPublicClient, http, getEip712Domain } from 'viem'
* import { mainnet } from 'viem/chains'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
*
* const domain = await getEip712Domain(client, {
*   address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
* })
* // {
* //   domain: {
* //     name: 'ExampleContract',
* //     version: '1',
* //     chainId: 1,
* //     verifyingContract: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
* //   },
* //   fields: '0x0f',
* //   extensions: [],
* // }
* ```
*/
async function getEip712Domain(client, parameters) {
	const { address, factory, factoryData } = parameters;
	try {
		const [fields, name, version, chainId, verifyingContract, salt, extensions] = await getAction(client, readContract, "readContract")({
			abi,
			address,
			functionName: "eip712Domain",
			factory,
			factoryData
		});
		return {
			domain: {
				name,
				version,
				chainId: Number(chainId),
				verifyingContract,
				salt
			},
			extensions,
			fields
		};
	} catch (e) {
		const error = e;
		if (error.name === "ContractFunctionExecutionError" && error.cause.name === "ContractFunctionZeroDataError") throw new Eip712DomainNotFoundError({ address });
		throw error;
	}
}
var abi = [{
	inputs: [],
	name: "eip712Domain",
	outputs: [
		{
			name: "fields",
			type: "bytes1"
		},
		{
			name: "name",
			type: "string"
		},
		{
			name: "version",
			type: "string"
		},
		{
			name: "chainId",
			type: "uint256"
		},
		{
			name: "verifyingContract",
			type: "address"
		},
		{
			name: "salt",
			type: "bytes32"
		},
		{
			name: "extensions",
			type: "uint256[]"
		}
	],
	stateMutability: "view",
	type: "function"
}];
//#endregion
//#region node_modules/viem/_esm/utils/formatters/feeHistory.js
function formatFeeHistory(feeHistory) {
	const { baseFeePerBlobGas, blobGasUsedRatio } = feeHistory;
	return {
		...baseFeePerBlobGas && { baseFeePerBlobGas: baseFeePerBlobGas.map((value) => BigInt(value)) },
		baseFeePerGas: feeHistory.baseFeePerGas.map((value) => BigInt(value)),
		...blobGasUsedRatio && { blobGasUsedRatio },
		gasUsedRatio: feeHistory.gasUsedRatio,
		oldestBlock: BigInt(feeHistory.oldestBlock),
		reward: feeHistory.reward?.map((reward) => reward.map((value) => BigInt(value)))
	};
}
//#endregion
//#region node_modules/viem/_esm/actions/public/getFeeHistory.js
/**
* Returns a collection of historical gas information.
*
* - Docs: https://viem.sh/docs/actions/public/getFeeHistory
* - JSON-RPC Methods: [`eth_feeHistory`](https://docs.alchemy.com/reference/eth-feehistory)
*
* @param client - Client to use
* @param parameters - {@link GetFeeHistoryParameters}
* @returns The gas estimate (in wei). {@link GetFeeHistoryReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getFeeHistory } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const feeHistory = await getFeeHistory(client, {
*   blockCount: 4,
*   rewardPercentiles: [25, 75],
* })
*/
async function getFeeHistory(client, { blockCount, blockNumber, blockTag = "latest", rewardPercentiles }) {
	const blockNumberHex = typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0;
	return formatFeeHistory(await client.request({
		method: "eth_feeHistory",
		params: [
			numberToHex(blockCount),
			blockNumberHex || blockTag,
			rewardPercentiles
		]
	}, { dedupe: Boolean(blockNumberHex) }));
}
//#endregion
//#region node_modules/viem/_esm/actions/public/getFilterChanges.js
/**
* Returns a list of logs or hashes based on a [Filter](/docs/glossary/terms#filter) since the last time it was called.
*
* - Docs: https://viem.sh/docs/actions/public/getFilterChanges
* - JSON-RPC Methods: [`eth_getFilterChanges`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges)
*
* A Filter can be created from the following actions:
*
* - [`createBlockFilter`](https://viem.sh/docs/actions/public/createBlockFilter)
* - [`createContractEventFilter`](https://viem.sh/docs/contract/createContractEventFilter)
* - [`createEventFilter`](https://viem.sh/docs/actions/public/createEventFilter)
* - [`createPendingTransactionFilter`](https://viem.sh/docs/actions/public/createPendingTransactionFilter)
*
* Depending on the type of filter, the return value will be different:
*
* - If the filter was created with `createContractEventFilter` or `createEventFilter`, it returns a list of logs.
* - If the filter was created with `createPendingTransactionFilter`, it returns a list of transaction hashes.
* - If the filter was created with `createBlockFilter`, it returns a list of block hashes.
*
* @param client - Client to use
* @param parameters - {@link GetFilterChangesParameters}
* @returns Logs or hashes. {@link GetFilterChangesReturnType}
*
* @example
* // Blocks
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { createBlockFilter, getFilterChanges } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const filter = await createBlockFilter(client)
* const hashes = await getFilterChanges(client, { filter })
*
* @example
* // Contract Events
* import { createPublicClient, http, parseAbi } from 'viem'
* import { mainnet } from 'viem/chains'
* import { createContractEventFilter, getFilterChanges } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const filter = await createContractEventFilter(client, {
*   address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
*   abi: parseAbi(['event Transfer(address indexed, address indexed, uint256)']),
*   eventName: 'Transfer',
* })
* const logs = await getFilterChanges(client, { filter })
*
* @example
* // Raw Events
* import { createPublicClient, http, parseAbiItem } from 'viem'
* import { mainnet } from 'viem/chains'
* import { createEventFilter, getFilterChanges } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const filter = await createEventFilter(client, {
*   address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
*   event: parseAbiItem('event Transfer(address indexed, address indexed, uint256)'),
* })
* const logs = await getFilterChanges(client, { filter })
*
* @example
* // Transactions
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { createPendingTransactionFilter, getFilterChanges } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const filter = await createPendingTransactionFilter(client)
* const hashes = await getFilterChanges(client, { filter })
*/
async function getFilterChanges(_client, { filter }) {
	const strict = "strict" in filter && filter.strict;
	const logs = await filter.request({
		method: "eth_getFilterChanges",
		params: [filter.id]
	});
	if (typeof logs[0] === "string") return logs;
	const formattedLogs = logs.map((log) => formatLog(log));
	if (!("abi" in filter) || !filter.abi) return formattedLogs;
	return parseEventLogs({
		abi: filter.abi,
		eventName: filter.eventName,
		logs: formattedLogs,
		strict
	});
}
//#endregion
//#region node_modules/viem/_esm/actions/public/getFilterLogs.js
/**
* Returns a list of event logs since the filter was created.
*
* - Docs: https://viem.sh/docs/actions/public/getFilterLogs
* - JSON-RPC Methods: [`eth_getFilterLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterlogs)
*
* `getFilterLogs` is only compatible with **event filters**.
*
* @param client - Client to use
* @param parameters - {@link GetFilterLogsParameters}
* @returns A list of event logs. {@link GetFilterLogsReturnType}
*
* @example
* import { createPublicClient, http, parseAbiItem } from 'viem'
* import { mainnet } from 'viem/chains'
* import { createEventFilter, getFilterLogs } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const filter = await createEventFilter(client, {
*   address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
*   event: parseAbiItem('event Transfer(address indexed, address indexed, uint256)'),
* })
* const logs = await getFilterLogs(client, { filter })
*/
async function getFilterLogs(_client, { filter }) {
	const strict = filter.strict ?? false;
	const formattedLogs = (await filter.request({
		method: "eth_getFilterLogs",
		params: [filter.id]
	})).map((log) => formatLog(log));
	if (!filter.abi) return formattedLogs;
	return parseEventLogs({
		abi: filter.abi,
		eventName: filter.eventName,
		logs: formattedLogs,
		strict
	});
}
//#endregion
//#region node_modules/viem/_esm/utils/authorization/verifyAuthorization.js
/**
* Verify that an Authorization object was signed by the provided address.
*
* - Docs {@link https://viem.sh/docs/utilities/verifyAuthorization}
*
* @param parameters - {@link VerifyAuthorizationParameters}
* @returns Whether or not the signature is valid. {@link VerifyAuthorizationReturnType}
*/
async function verifyAuthorization({ address, authorization, signature }) {
	const recovered = await (async () => {
		try {
			return await recoverAuthorizationAddress({
				authorization,
				signature
			});
		} catch (error) {
			if (error instanceof InvalidYParityError$1) return void 0;
			throw error;
		}
	})();
	if (!recovered) return false;
	return isAddressEqual(getAddress(address), recovered);
}
//#endregion
//#region node_modules/viem/_esm/utils/wait.js
async function wait(time, { signal } = {}) {
	return new Promise((resolve, reject) => {
		if (signal?.aborted) {
			reject(getAbortError(signal));
			return;
		}
		const cleanup = () => signal?.removeEventListener("abort", onAbort);
		const timeout = setTimeout(() => {
			cleanup();
			resolve();
		}, Math.min(time, 2 ** 31 - 1));
		const onAbort = () => {
			clearTimeout(timeout);
			cleanup();
			reject(getAbortError(signal));
		};
		signal?.addEventListener("abort", onAbort, { once: true });
	});
}
//#endregion
//#region node_modules/viem/_esm/utils/promise/withRetry.js
function withRetry(fn, { delay: delay_ = 100, retryCount = 2, shouldRetry = () => true, signal } = {}) {
	return new Promise((resolve, reject) => {
		const onAbort = () => reject(getAbortError(signal));
		signal?.addEventListener("abort", onAbort, { once: true });
		const attemptRetry = async ({ count = 0 } = {}) => {
			if (signal?.aborted) {
				reject(getAbortError(signal));
				return;
			}
			const retry = async ({ error }) => {
				const delay = typeof delay_ === "function" ? delay_({
					count,
					error
				}) : delay_;
				if (delay) try {
					await wait(delay, { signal });
				} catch (err) {
					reject(err);
					return;
				}
				return attemptRetry({ count: count + 1 });
			};
			try {
				resolve(await fn());
			} catch (err) {
				if (signal?.aborted) {
					reject(getAbortError(signal));
					return;
				}
				if (isAbortError(err)) {
					reject(err);
					return;
				}
				if (count < retryCount && await shouldRetry({
					count,
					error: err
				})) return retry({ error: err });
				reject(err);
			}
		};
		attemptRetry().catch(reject).finally(() => signal?.removeEventListener("abort", onAbort));
	});
}
//#endregion
//#region node_modules/viem/_esm/constants/strings.js
var presignMessagePrefix = "Ethereum Signed Message:\n";
//#endregion
//#region node_modules/viem/_esm/utils/signature/toPrefixedMessage.js
function toPrefixedMessage(message_) {
	const message = (() => {
		if (typeof message_ === "string") return stringToHex(message_);
		if (typeof message_.raw === "string") return message_.raw.length % 2 ? `0x0${message_.raw.slice(2)}` : message_.raw;
		return bytesToHex(message_.raw);
	})();
	return concat$1([stringToHex(`${presignMessagePrefix}${size$4(message)}`), message]);
}
//#endregion
//#region node_modules/viem/_esm/utils/signature/hashMessage.js
function hashMessage(message, to_) {
	return keccak256$1(toPrefixedMessage(message), to_);
}
//#endregion
//#region node_modules/viem/_esm/errors/typedData.js
var InvalidDomainError = class extends BaseError$3 {
	constructor({ domain }) {
		super(`Invalid domain "${stringify$1(domain)}".`, {
			metaMessages: ["Must be a valid EIP-712 domain."],
			name: "InvalidDomainError"
		});
	}
};
var InvalidPrimaryTypeError = class extends BaseError$3 {
	constructor({ primaryType, types }) {
		super(`Invalid primary type \`${primaryType}\` must be one of \`${JSON.stringify(Object.keys(types))}\`.`, {
			docsPath: "/api/glossary/Errors#typeddatainvalidprimarytypeerror",
			metaMessages: ["Check that the primary type is a key in `types`."],
			name: "InvalidPrimaryTypeError"
		});
	}
};
var InvalidStructTypeError = class extends BaseError$3 {
	constructor({ type }) {
		super(`Struct type "${type}" is invalid.`, {
			metaMessages: ["Struct type must contain only letters, digits, \"_\", \"$\" and \":\", and must not be a Solidity type."],
			name: "InvalidStructTypeError"
		});
	}
};
var InvalidTypedDataTypeError = class extends BaseError$3 {
	constructor({ type }) {
		const isAlias = /^u?int(\[[0-9]*\])*$/.test(type);
		super(`Type "${type}" is not a valid EIP-712 type.`, {
			metaMessages: isAlias ? [`Use "${type.replace(/^(u?int)/, "$&256")}" instead.`] : void 0,
			name: "InvalidTypedDataTypeError"
		});
	}
};
//#endregion
//#region node_modules/viem/_esm/utils/typedData.js
function serializeTypedData(parameters) {
	const { domain: domain_, message: message_, primaryType, types } = parameters;
	const normalizeData = (struct, data_) => {
		const data = { ...data_ };
		for (const param of struct) {
			const { name, type } = param;
			if (type === "address") data[name] = data[name].toLowerCase();
		}
		return data;
	};
	return stringify$1({
		domain: (() => {
			if (!types.EIP712Domain) return {};
			if (!domain_) return {};
			return normalizeData(types.EIP712Domain, domain_);
		})(),
		message: (() => {
			if (primaryType === "EIP712Domain") return void 0;
			return normalizeData(types[primaryType], message_);
		})(),
		primaryType,
		types
	});
}
function validateTypedData(parameters) {
	const { domain, message, primaryType, types } = parameters;
	const validateData = (struct, data) => {
		for (const param of struct) {
			const { name, type } = param;
			const value = data[name];
			const integerMatch = type.match(integerRegex$2);
			if (integerMatch && (typeof value === "number" || typeof value === "bigint")) {
				const [_type, base, size_] = integerMatch;
				numberToHex(value, {
					signed: base === "int",
					size: Number.parseInt(size_, 10) / 8
				});
			}
			if (type === "address" && typeof value === "string" && !isAddress(value)) throw new InvalidAddressError$1({ address: value });
			const bytesMatch = type.match(bytesRegex$2);
			if (bytesMatch) {
				const [_type, size_] = bytesMatch;
				if (size_ && size$4(value) !== Number.parseInt(size_, 10)) throw new BytesSizeMismatchError$1({
					expectedSize: Number.parseInt(size_, 10),
					givenSize: size$4(value)
				});
			}
			if (Object.hasOwn(types, type)) validateData(types[type], value);
			if (type.endsWith("]")) validateArray(type, value);
		}
	};
	const validateArray = (type, value) => {
		if (!Array.isArray(value)) return;
		const inner = type.slice(0, type.lastIndexOf("["));
		const length = type.slice(type.lastIndexOf("[") + 1, -1);
		if (length && value.length !== Number.parseInt(length, 10)) throw new AbiEncodingArrayLengthMismatchError({
			expectedLength: Number.parseInt(length, 10),
			givenLength: value.length,
			type
		});
		for (const item of value) if (inner.endsWith("]")) validateArray(inner, item);
		else if (Object.hasOwn(types, inner) && item) validateData(types[inner], item);
	};
	for (const type of Object.keys(types)) validateReference(type);
	for (const struct of Object.values(types)) for (const field of struct ?? []) validateField(field.type, types);
	if (types.EIP712Domain && domain) {
		if (typeof domain !== "object") throw new InvalidDomainError({ domain });
		validateData(types.EIP712Domain, domain);
	}
	if (primaryType !== "EIP712Domain") {
		if (types[primaryType]) validateData(types[primaryType], message);
		else throw new InvalidPrimaryTypeError({
			primaryType,
			types
		});
	}
}
function getTypesForEIP712Domain({ domain }) {
	return [
		domain?.name != null && {
			name: "name",
			type: "string"
		},
		domain?.version != null && {
			name: "version",
			type: "string"
		},
		domain?.chainId != null && {
			name: "chainId",
			type: "uint256"
		},
		domain?.verifyingContract != null && {
			name: "verifyingContract",
			type: "address"
		},
		domain?.salt != null && {
			name: "salt",
			type: "bytes32"
		}
	].filter(Boolean);
}
/** @internal */
function validateField(type, types) {
	const baseType = type.replace(/(\[[0-9]*\])+$/, "");
	if (baseType === "int" || baseType === "uint") throw new InvalidTypedDataTypeError({ type });
	if (!Object.hasOwn(types, baseType) && !isSolidityType(baseType)) throw new InvalidTypedDataTypeError({ type });
}
/** @internal */
function isSolidityType(type) {
	return type === "address" || type === "bool" || type === "string" || bytesRegex$2.test(type) || integerRegex$2.test(type);
}
/** @internal */
function validateReference(type) {
	if (!/^[A-Za-z0-9_$:]+$/.test(type) || type === "address" || type === "bool" || type === "string" || /^(u?int|bytes)[0-9]*$/.test(type)) throw new InvalidStructTypeError({ type });
}
//#endregion
//#region node_modules/viem/_esm/utils/signature/hashTypedData.js
function hashTypedData(parameters) {
	const { domain = {}, message, primaryType } = parameters;
	const types = {
		EIP712Domain: getTypesForEIP712Domain({ domain }),
		...parameters.types
	};
	validateTypedData({
		domain,
		message,
		primaryType,
		types
	});
	const parts = ["0x1901"];
	if (domain) parts.push(hashDomain({
		domain,
		types
	}));
	if (primaryType !== "EIP712Domain") parts.push(hashStruct({
		data: message,
		primaryType,
		types
	}));
	return keccak256$1(concat$1(parts));
}
function hashDomain({ domain, types }) {
	return hashStruct({
		data: domain,
		primaryType: "EIP712Domain",
		types
	});
}
function hashStruct({ data, primaryType, types }) {
	return keccak256$1(encodeData$1({
		data,
		primaryType,
		typeHashes: /* @__PURE__ */ new Map(),
		types
	}));
}
function encodeData$1({ data, primaryType, typeHashes, types }) {
	const encodedTypes = [{ type: "bytes32" }];
	const encodedValues = [typeHashes.get(primaryType) ?? (() => {
		const hash = hashType({
			primaryType,
			types
		});
		typeHashes.set(primaryType, hash);
		return hash;
	})()];
	for (const field of types[primaryType]) {
		const [type, value] = encodeField({
			typeHashes,
			types,
			name: field.name,
			type: field.type,
			value: data[field.name]
		});
		encodedTypes.push(type);
		encodedValues.push(value);
	}
	return encodeAbiParameters(encodedTypes, encodedValues);
}
function hashType({ primaryType, types }) {
	return keccak256$1(toHex(encodeType({
		primaryType,
		types
	})));
}
function encodeType({ primaryType, types }) {
	let result = "";
	const unsortedDeps = findTypeDependencies({
		primaryType,
		types
	});
	unsortedDeps.delete(primaryType);
	const deps = [primaryType, ...Array.from(unsortedDeps).sort()];
	for (const type of deps) result += `${type}(${types[type].map(({ name, type: t }) => `${t} ${name}`).join(",")})`;
	return result;
}
function findTypeDependencies({ primaryType: primaryType_, types }, results = /* @__PURE__ */ new Set()) {
	const primaryType = primaryType_.replace(/(\[[0-9]*\])+$/, "");
	if (results.has(primaryType) || types[primaryType] === void 0) return results;
	results.add(primaryType);
	for (const field of types[primaryType]) findTypeDependencies({
		primaryType: field.type,
		types
	}, results);
	return results;
}
function encodeField({ typeHashes, types, name, type, value }) {
	if (types[type] !== void 0) return [{ type: "bytes32" }, keccak256$1(encodeData$1({
		data: value,
		primaryType: type,
		typeHashes,
		types
	}))];
	if (type === "bytes") return [{ type: "bytes32" }, keccak256$1(value)];
	if (type === "string") return [{ type: "bytes32" }, keccak256$1(toHex(value))];
	if (type.lastIndexOf("]") === type.length - 1) {
		const parsedType = type.slice(0, type.lastIndexOf("["));
		const typeValuePairs = value.map((item) => encodeField({
			name,
			type: parsedType,
			typeHashes,
			types,
			value: item
		}));
		return [{ type: "bytes32" }, keccak256$1(encodeAbiParameters(typeValuePairs.map(([t]) => t), typeValuePairs.map(([, v]) => v)))];
	}
	return [{ type }, value];
}
//#endregion
//#region node_modules/ox/_esm/core/internal/lru.js
/**
* @internal
*
* Map with a LRU (Least recently used) policy.
* @see https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU
*/
var LruMap = class extends Map {
	constructor(size) {
		super();
		Object.defineProperty(this, "maxSize", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0
		});
		this.maxSize = size;
	}
	get(key) {
		const value = super.get(key);
		if (super.has(key) && value !== void 0) {
			this.delete(key);
			super.set(key, value);
		}
		return value;
	}
	set(key, value) {
		super.set(key, value);
		if (this.maxSize && this.size > this.maxSize) {
			const firstKey = this.keys().next().value;
			if (firstKey) this.delete(firstKey);
		}
		return this;
	}
};
//#endregion
//#region node_modules/ox/_esm/core/internal/caches.js
/**
* Global caches, cleared together by `Caches.clear`.
* Only `checksum` is public (`Caches.checksum`).
*/
var caches = {
	checksum: /*#__PURE__*/ new LruMap(8192),
	signatureHash: /*#__PURE__*/ new LruMap(8192)
};
//#endregion
//#region node_modules/ox/_esm/core/Caches.js
var checksum$1 = caches.checksum;
//#endregion
//#region node_modules/ox/_esm/core/Hash.js
/**
* Calculates the [Keccak256](https://en.wikipedia.org/wiki/SHA-3) hash of a {@link ox#Bytes.Bytes} or {@link ox#Hex.Hex} value.
*
* This function is a re-export of `keccak_256` from [`@noble/hashes`](https://github.com/paulmillr/noble-hashes), an audited & minimal JS hashing library.
*
* @example
* ```ts twoslash
* import { Hash } from 'ox'
*
* Hash.keccak256('0xdeadbeef')
* // @log: '0xd4fd4e189132273036449fc9e11198c739161b4c0116a9a2dccdfa1c492006f1'
* ```
*
* @example
* ### Calculate Hash of a String
*
* ```ts twoslash
* import { Hash, Hex } from 'ox'
*
* Hash.keccak256(Hex.fromString('hello world'))
* // @log: '0x3ea2f1d0abf3fc66cf29eebb70cbd4e7fe762ef8a09bcc06c8edf641230afec0'
* ```
*
* @example
* ### Configure Return Type
*
* ```ts twoslash
* import { Hash } from 'ox'
*
* Hash.keccak256('0xdeadbeef', { as: 'Bytes' })
* // @log: Uint8Array [...]
* ```
*
* @param value - {@link ox#Bytes.Bytes} or {@link ox#Hex.Hex} value.
* @param options - Options.
* @returns Keccak256 hash.
*/
function keccak256(value, options = {}) {
	const { as = typeof value === "string" ? "Hex" : "Bytes" } = options;
	const bytes = keccak_256$1(from$7(value));
	if (as === "Bytes") return bytes;
	return fromBytes$1(bytes);
}
//#endregion
//#region node_modules/ox/_esm/core/Address.js
var addressRegex = /^0x[a-fA-F0-9]{40}$/;
/**
* Asserts that the given value is a valid {@link ox#Address.Address}.
*
* @example
* ```ts twoslash
* import { Address } from 'ox'
*
* Address.assert('0xA0Cf798816D4b9b9866b5330EEa46a18382f251e')
* ```
*
* @example
* ```ts twoslash
* import { Address } from 'ox'
*
* Address.assert('0xdeadbeef')
* // @error: InvalidAddressError: Address "0xdeadbeef" is invalid.
* ```
*
* @param value - Value to assert if it is a valid address.
* @param options - Assertion options.
*/
function assert$3(value, options = {}) {
	const { strict = true } = options;
	if (!addressRegex.test(value)) throw new InvalidAddressError({
		address: value,
		cause: new InvalidInputError()
	});
	if (strict) {
		if (value.toLowerCase() === value) return;
		if (checksum(value) !== value) throw new InvalidAddressError({
			address: value,
			cause: new InvalidChecksumError()
		});
	}
}
/**
* Computes the checksum address for the given {@link ox#Address.Address}.
*
* @example
* ```ts twoslash
* import { Address } from 'ox'
*
* Address.checksum('0xa0cf798816d4b9b9866b5330eea46a18382f251e')
* // @log: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'
* ```
*
* @param address - The address to compute the checksum for.
* @returns The checksummed address.
*/
function checksum(address) {
	if (checksum$1.has(address)) return checksum$1.get(address);
	assert$3(address, { strict: false });
	const hexAddress = address.substring(2).toLowerCase();
	const hash = keccak256(fromString$2(hexAddress), { as: "Bytes" });
	const characters = hexAddress.split("");
	for (let i = 0; i < 40; i += 2) {
		if (hash[i >> 1] >> 4 >= 8 && characters[i]) characters[i] = characters[i].toUpperCase();
		if ((hash[i >> 1] & 15) >= 8 && characters[i + 1]) characters[i + 1] = characters[i + 1].toUpperCase();
	}
	const result = `0x${characters.join("")}`;
	checksum$1.set(address, result);
	return result;
}
/**
* Checks if the given address is a valid {@link ox#Address.Address}.
*
* @example
* ```ts twoslash
* import { Address } from 'ox'
*
* Address.validate('0xA0Cf798816D4b9b9866b5330EEa46a18382f251e')
* // @log: true
* ```
*
* @example
* ```ts twoslash
* import { Address } from 'ox'
*
* Address.validate('0xdeadbeef')
* // @log: false
* ```
*
* @param address - Value to check if it is a valid address.
* @param options - Check options.
* @returns Whether the address is a valid address.
*/
function validate$2(address, options = {}) {
	const { strict = true } = options ?? {};
	try {
		assert$3(address, { strict });
		return true;
	} catch {
		return false;
	}
}
/**
* Thrown when an address is invalid.
*
* @example
* ```ts twoslash
* import { Address } from 'ox'
*
* Address.from('0x123')
* // @error: Address.InvalidAddressError: Address `0x123` is invalid.
* ```
*/
var InvalidAddressError = class extends BaseError$1 {
	constructor({ address, cause }) {
		super(`Address "${address}" is invalid.`, { cause });
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "Address.InvalidAddressError"
		});
	}
};
/** Thrown when an address is not a 20 byte (40 hexadecimal character) value. */
var InvalidInputError = class extends BaseError$1 {
	constructor() {
		super("Address is not a 20 byte (40 hexadecimal character) value.");
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "Address.InvalidInputError"
		});
	}
};
/** Thrown when an address does not match its checksum counterpart. */
var InvalidChecksumError = class extends BaseError$1 {
	constructor() {
		super("Address does not match its checksum counterpart.");
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "Address.InvalidChecksumError"
		});
	}
};
//#endregion
//#region node_modules/ox/_esm/core/Solidity.js
var arrayRegex = /^(.*)\[([0-9]*)\]$/;
var bytesRegex = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
var integerRegex = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
2n ** (8n - 1n) - 1n;
2n ** (16n - 1n) - 1n;
2n ** (24n - 1n) - 1n;
2n ** (32n - 1n) - 1n;
2n ** (40n - 1n) - 1n;
2n ** (48n - 1n) - 1n;
2n ** (56n - 1n) - 1n;
2n ** (64n - 1n) - 1n;
2n ** (72n - 1n) - 1n;
2n ** (80n - 1n) - 1n;
2n ** (88n - 1n) - 1n;
2n ** (96n - 1n) - 1n;
2n ** (104n - 1n) - 1n;
2n ** (112n - 1n) - 1n;
2n ** (120n - 1n) - 1n;
2n ** (128n - 1n) - 1n;
2n ** (136n - 1n) - 1n;
2n ** (144n - 1n) - 1n;
2n ** (152n - 1n) - 1n;
2n ** (160n - 1n) - 1n;
2n ** (168n - 1n) - 1n;
2n ** (176n - 1n) - 1n;
2n ** (184n - 1n) - 1n;
2n ** (192n - 1n) - 1n;
2n ** (200n - 1n) - 1n;
2n ** (208n - 1n) - 1n;
2n ** (216n - 1n) - 1n;
2n ** (224n - 1n) - 1n;
2n ** (232n - 1n) - 1n;
2n ** (240n - 1n) - 1n;
2n ** (248n - 1n) - 1n;
2n ** (256n - 1n) - 1n;
-(2n ** (8n - 1n));
-(2n ** (16n - 1n));
-(2n ** (24n - 1n));
-(2n ** (32n - 1n));
-(2n ** (40n - 1n));
-(2n ** (48n - 1n));
-(2n ** (56n - 1n));
-(2n ** (64n - 1n));
-(2n ** (72n - 1n));
-(2n ** (80n - 1n));
-(2n ** (88n - 1n));
-(2n ** (96n - 1n));
-(2n ** (104n - 1n));
-(2n ** (112n - 1n));
-(2n ** (120n - 1n));
-(2n ** (128n - 1n));
-(2n ** (136n - 1n));
-(2n ** (144n - 1n));
-(2n ** (152n - 1n));
-(2n ** (160n - 1n));
-(2n ** (168n - 1n));
-(2n ** (176n - 1n));
-(2n ** (184n - 1n));
-(2n ** (192n - 1n));
-(2n ** (200n - 1n));
-(2n ** (208n - 1n));
-(2n ** (216n - 1n));
-(2n ** (224n - 1n));
-(2n ** (232n - 1n));
-(2n ** (240n - 1n));
-(2n ** (248n - 1n));
-(2n ** (256n - 1n));
var maxUint256 = 2n ** 256n - 1n;
//#endregion
//#region node_modules/ox/_esm/core/internal/abiParameters.js
/** @internal */
function decodeParameter(cursor, param, options) {
	const { checksumAddress, staticPosition } = options;
	const arrayComponents = getArrayComponents(param.type);
	if (arrayComponents) {
		const [length, type] = arrayComponents;
		return decodeArray(cursor, {
			...param,
			type
		}, {
			checksumAddress,
			length,
			staticPosition
		});
	}
	if (param.type === "tuple") return decodeTuple(cursor, param, {
		checksumAddress,
		staticPosition
	});
	if (param.type === "address") return decodeAddress(cursor, { checksum: checksumAddress });
	if (param.type === "bool") return decodeBool(cursor);
	if (param.type.startsWith("bytes")) return decodeBytes(cursor, param, { staticPosition });
	if (param.type.startsWith("uint") || param.type.startsWith("int")) return decodeNumber(cursor, param);
	if (param.type === "string") return decodeString(cursor, { staticPosition });
	throw new InvalidTypeError(param.type);
}
var sizeOfLength = 32;
var sizeOfOffset = 32;
/** @internal */
function decodeAddress(cursor, options = {}) {
	const { checksum: checksum$2 = false } = options;
	const value = cursor.readBytes(32);
	for (let i = 0; i < 12; i++) if (value[i] !== 0) throw new InvalidAddressError({
		address: fromBytes$1(value),
		cause: new InvalidInputError()
	});
	const wrap = (address) => checksum$2 ? checksum(address) : address;
	return [wrap(fromBytes$1(slice$1(value, -20))), 32];
}
/** @internal */
function decodeArray(cursor, param, options) {
	const { checksumAddress, length, staticPosition } = options;
	if (length === null) {
		const start = staticPosition + toNumber$1(cursor.readBytes(sizeOfOffset));
		const startOfData = start + sizeOfLength;
		cursor.setPosition(start);
		const length = toNumber$1(cursor.readBytes(sizeOfLength));
		const dynamicChild = hasDynamicChild(param);
		let consumed = 0;
		const value = [];
		for (let i = 0; i < length; ++i) {
			cursor.setPosition(startOfData + (dynamicChild ? i * 32 : consumed));
			const [data, consumed_] = decodeParameter(cursor, param, {
				checksumAddress,
				staticPosition: startOfData
			});
			consumed += consumed_;
			value.push(data);
			if (consumed_ === 0) {
				cursor.assertReadLimit();
				cursor._touch();
			}
		}
		cursor.setPosition(staticPosition + 32);
		return [value, 32];
	}
	if (hasDynamicChild(param)) {
		const start = staticPosition + toNumber$1(cursor.readBytes(sizeOfOffset));
		const value = [];
		for (let i = 0; i < length; ++i) {
			cursor.setPosition(start + i * 32);
			const [data] = decodeParameter(cursor, param, {
				checksumAddress,
				staticPosition: start
			});
			value.push(data);
		}
		cursor.setPosition(staticPosition + 32);
		return [value, 32];
	}
	let consumed = 0;
	const value = [];
	for (let i = 0; i < length; ++i) {
		const [data, consumed_] = decodeParameter(cursor, param, {
			checksumAddress,
			staticPosition: staticPosition + consumed
		});
		consumed += consumed_;
		value.push(data);
		if (consumed_ === 0) {
			cursor.assertReadLimit();
			cursor._touch();
		}
	}
	return [value, consumed];
}
/** @internal */
function decodeBool(cursor) {
	return [toBoolean(cursor.readBytes(32), { size: 32 }), 32];
}
/** @internal */
function decodeBytes(cursor, param, { staticPosition }) {
	const [_, size] = param.type.split("bytes");
	if (!size) {
		const offset = toNumber$1(cursor.readBytes(32));
		cursor.setPosition(staticPosition + offset);
		const length = toNumber$1(cursor.readBytes(32));
		if (length === 0) {
			cursor.setPosition(staticPosition + 32);
			return ["0x", 32];
		}
		const data = cursor.readBytes(length);
		cursor.setPosition(staticPosition + 32);
		return [fromBytes$1(data), 32];
	}
	return [fromBytes$1(cursor.readBytes(32).subarray(0, Number.parseInt(size, 10))), 32];
}
/** @internal */
function decodeNumber(cursor, param) {
	const signed = param.type.startsWith("int");
	const size = Number.parseInt(param.type.split("int")[1] || "256", 10);
	const value = toBigInt$1(cursor.readBytes(32), { signed });
	if (size < 256) {
		const max = (1n << BigInt(signed ? size - 1 : size)) - 1n;
		const min = signed ? -max - 1n : 0n;
		if (value > max || value < min) throw new IntegerOutOfRangeError({
			max: max.toString(),
			min: min.toString(),
			signed,
			size: size / 8,
			value: value.toString()
		});
	}
	return [size > 48 ? value : Number(value), 32];
}
/** @internal */
function decodeTuple(cursor, param, options) {
	const { checksumAddress, staticPosition } = options;
	const hasUnnamedChild = param.components.length === 0 || param.components.some(({ name }) => !name);
	const value = hasUnnamedChild ? [] : {};
	let consumed = 0;
	if (hasDynamicChild(param)) {
		const start = staticPosition + toNumber$1(cursor.readBytes(sizeOfOffset));
		for (let i = 0; i < param.components.length; ++i) {
			const component = param.components[i];
			cursor.setPosition(start + consumed);
			const [data, consumed_] = decodeParameter(cursor, component, {
				checksumAddress,
				staticPosition: start
			});
			consumed += consumed_;
			value[hasUnnamedChild ? i : component?.name] = data;
		}
		cursor.setPosition(staticPosition + 32);
		return [value, 32];
	}
	for (let i = 0; i < param.components.length; ++i) {
		const component = param.components[i];
		const [data, consumed_] = decodeParameter(cursor, component, {
			checksumAddress,
			staticPosition
		});
		value[hasUnnamedChild ? i : component?.name] = data;
		consumed += consumed_;
	}
	return [value, consumed];
}
/** @internal */
function decodeString(cursor, { staticPosition }) {
	const start = staticPosition + toNumber$1(cursor.readBytes(32));
	cursor.setPosition(start);
	const length = toNumber$1(cursor.readBytes(32));
	if (length === 0) {
		cursor.setPosition(staticPosition + 32);
		return ["", 32];
	}
	const value = toString$1(trimLeft(cursor.readBytes(length, 32)));
	cursor.setPosition(staticPosition + 32);
	return [value, 32];
}
/** @internal */
function prepareParameters({ checksumAddress, parameters, values }) {
	const preparedParameters = [];
	for (let i = 0; i < parameters.length; i++) preparedParameters.push(prepareParameter({
		checksumAddress,
		parameter: parameters[i],
		value: values[i]
	}));
	return preparedParameters;
}
/** @internal */
function prepareParameter({ checksumAddress = false, parameter: parameter_, value }) {
	const parameter = parameter_;
	const arrayComponents = getArrayComponents(parameter.type);
	if (arrayComponents) {
		const [length, type] = arrayComponents;
		return encodeArray(value, {
			checksumAddress,
			length,
			parameter: {
				...parameter,
				type
			}
		});
	}
	if (parameter.type === "tuple") return encodeTuple(value, {
		checksumAddress,
		parameter
	});
	if (parameter.type === "address") return encodeAddress(value, { checksum: checksumAddress });
	if (parameter.type === "bool") return encodeBoolean(value);
	if (parameter.type.startsWith("uint") || parameter.type.startsWith("int")) {
		const signed = parameter.type.startsWith("int");
		const [, , size = "256"] = integerRegex.exec(parameter.type) ?? [];
		return encodeNumber(value, {
			signed,
			size: Number(size)
		});
	}
	if (parameter.type.startsWith("bytes")) return encodeBytes(value, { type: parameter.type });
	if (parameter.type === "string") return encodeString(value);
	throw new InvalidTypeError(parameter.type);
}
/** @internal */
function encode$2(preparedParameters) {
	let staticSize = 0;
	for (let i = 0; i < preparedParameters.length; i++) {
		const { dynamic, encoded } = preparedParameters[i];
		if (dynamic) staticSize += 32;
		else staticSize += size$2(encoded);
	}
	const staticParameters = [];
	const dynamicParameters = [];
	let dynamicSize = 0;
	for (let i = 0; i < preparedParameters.length; i++) {
		const { dynamic, encoded } = preparedParameters[i];
		if (dynamic) {
			staticParameters.push(fromNumber(staticSize + dynamicSize, { size: 32 }));
			dynamicParameters.push(encoded);
			dynamicSize += size$2(encoded);
		} else staticParameters.push(encoded);
	}
	return concat(...staticParameters, ...dynamicParameters);
}
/** @internal */
function encodeAddress(value, options) {
	const { checksum = false } = options;
	assert$3(value, { strict: checksum });
	return {
		dynamic: false,
		encoded: padLeft(value.toLowerCase())
	};
}
/** @internal */
function encodeArray(value, options) {
	const { checksumAddress, length, parameter } = options;
	const dynamic = length === null;
	if (!Array.isArray(value)) throw new InvalidArrayError(value);
	if (!dynamic && value.length !== length) throw new ArrayLengthMismatchError({
		expectedLength: length,
		givenLength: value.length,
		type: `${parameter.type}[${length}]`
	});
	let dynamicChild = value.length === 0 && hasDynamicChild(parameter);
	const preparedParameters = [];
	for (let i = 0; i < value.length; i++) {
		const preparedParam = prepareParameter({
			checksumAddress,
			parameter,
			value: value[i]
		});
		if (preparedParam.dynamic) dynamicChild = true;
		preparedParameters.push(preparedParam);
	}
	if (dynamic || dynamicChild) {
		const data = encode$2(preparedParameters);
		if (dynamic) {
			const length = fromNumber(preparedParameters.length, { size: 32 });
			return {
				dynamic: true,
				encoded: preparedParameters.length > 0 ? concat(length, data) : length
			};
		}
		if (dynamicChild) return {
			dynamic: true,
			encoded: data
		};
	}
	return {
		dynamic: false,
		encoded: concat(...preparedParameters.map(({ encoded }) => encoded))
	};
}
/** @internal */
function encodeBytes(value, { type }) {
	const [, parametersize] = type.split("bytes");
	const bytesSize = size$2(value);
	if (!parametersize) {
		if (value.length % 2 !== 0) throw new InvalidLengthError(value);
		let value_ = value;
		if (bytesSize % 32 !== 0) value_ = padRight(value_, Math.ceil((value.length - 2) / 2 / 32) * 32);
		return {
			dynamic: true,
			encoded: concat(padLeft(fromNumber(bytesSize, { size: 32 })), value_)
		};
	}
	if (bytesSize !== Number.parseInt(parametersize, 10)) throw new BytesSizeMismatchError({
		expectedSize: Number.parseInt(parametersize, 10),
		value
	});
	if (value.length % 2 !== 0) throw new InvalidLengthError(value);
	return {
		dynamic: false,
		encoded: padRight(value)
	};
}
/** @internal */
function encodeBoolean(value) {
	if (typeof value !== "boolean") throw new BaseError$1(`Invalid boolean value: "${value}" (type: ${typeof value}). Expected: \`true\` or \`false\`.`);
	return {
		dynamic: false,
		encoded: padLeft(fromBoolean(value))
	};
}
/** @internal */
function encodeNumber(value, { signed, size }) {
	if (typeof size === "number") {
		const max = 2n ** (BigInt(size) - (signed ? 1n : 0n)) - 1n;
		const min = signed ? -max - 1n : 0n;
		if (value > max || value < min) throw new IntegerOutOfRangeError({
			max: max.toString(),
			min: min.toString(),
			signed,
			size: size / 8,
			value: value.toString()
		});
	}
	return {
		dynamic: false,
		encoded: fromNumber(value, {
			size: 32,
			signed
		})
	};
}
/** @internal */
function encodeString(value) {
	const hexValue = fromString$1(value);
	const partsLength = Math.ceil(size$2(hexValue) / 32);
	const parts = [];
	for (let i = 0; i < partsLength; i++) parts.push(padRight(slice(hexValue, i * 32, (i + 1) * 32)));
	return {
		dynamic: true,
		encoded: concat(padRight(fromNumber(size$2(hexValue), { size: 32 })), ...parts)
	};
}
/** @internal */
function encodeTuple(value, options) {
	const { checksumAddress, parameter } = options;
	let dynamic = false;
	const preparedParameters = [];
	for (let i = 0; i < parameter.components.length; i++) {
		const param_ = parameter.components[i];
		const preparedParam = prepareParameter({
			checksumAddress,
			parameter: param_,
			value: value[Array.isArray(value) ? i : param_.name]
		});
		preparedParameters.push(preparedParam);
		if (preparedParam.dynamic) dynamic = true;
	}
	return {
		dynamic,
		encoded: dynamic ? encode$2(preparedParameters) : concat(...preparedParameters.map(({ encoded }) => encoded))
	};
}
/** @internal */
function getArrayComponents(type) {
	const matches = type.match(/^(.*)\[(\d+)?\]$/);
	return matches ? [matches[2] ? Number(matches[2]) : null, matches[1]] : void 0;
}
/** @internal */
function hasDynamicChild(param) {
	const { type } = param;
	if (type === "string") return true;
	if (type === "bytes") return true;
	if (type.endsWith("[]")) return true;
	if (type === "tuple") return param.components?.some(hasDynamicChild);
	const arrayComponents = getArrayComponents(param.type);
	if (arrayComponents && hasDynamicChild({
		...param,
		type: arrayComponents[1]
	})) return true;
	return false;
}
//#endregion
//#region node_modules/ox/_esm/core/internal/cursor.js
var staticCursor = {
	bytes: /* @__PURE__ */ new Uint8Array(),
	dataView: /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(0)),
	position: 0,
	positionReadCount: /* @__PURE__ */ new Map(),
	readSize: 0,
	readSizeLimit: Number.POSITIVE_INFINITY,
	recursiveReadCount: 0,
	recursiveReadLimit: Number.POSITIVE_INFINITY,
	assertReadLimit() {
		if (this.recursiveReadCount >= this.recursiveReadLimit) throw new RecursiveReadLimitExceededError({
			count: this.recursiveReadCount + 1,
			limit: this.recursiveReadLimit
		});
	},
	assertReadSize(length) {
		this.readSize += length;
		if (this.readSize > this.readSizeLimit) throw new ReadSizeLimitExceededError({
			limit: this.readSizeLimit,
			size: this.readSize
		});
	},
	assertPosition(position) {
		if (position < 0 || position > this.bytes.length - 1) throw new PositionOutOfBoundsError({
			length: this.bytes.length,
			position
		});
	},
	decrementPosition(offset) {
		if (offset < 0) throw new NegativeOffsetError({ offset });
		const position = this.position - offset;
		this.assertPosition(position);
		this.position = position;
	},
	getReadCount(position) {
		return this.positionReadCount.get(position || this.position) || 0;
	},
	incrementPosition(offset) {
		if (offset < 0) throw new NegativeOffsetError({ offset });
		const position = this.position + offset;
		this.assertPosition(position);
		this.position = position;
	},
	inspectByte(position_) {
		const position = position_ ?? this.position;
		this.assertPosition(position);
		return this.bytes[position];
	},
	inspectBytes(length, position_) {
		const position = position_ ?? this.position;
		this.assertPosition(position + length - 1);
		return this.bytes.subarray(position, position + length);
	},
	inspectUint8(position_) {
		const position = position_ ?? this.position;
		this.assertPosition(position);
		return this.bytes[position];
	},
	inspectUint16(position_) {
		const position = position_ ?? this.position;
		this.assertPosition(position + 1);
		return this.dataView.getUint16(position);
	},
	inspectUint24(position_) {
		const position = position_ ?? this.position;
		this.assertPosition(position + 2);
		return (this.dataView.getUint16(position) << 8) + this.dataView.getUint8(position + 2);
	},
	inspectUint32(position_) {
		const position = position_ ?? this.position;
		this.assertPosition(position + 3);
		return this.dataView.getUint32(position);
	},
	pushByte(byte) {
		this.assertPosition(this.position);
		this.bytes[this.position] = byte;
		this.position++;
	},
	pushBytes(bytes) {
		this.assertPosition(this.position + bytes.length - 1);
		this.bytes.set(bytes, this.position);
		this.position += bytes.length;
	},
	pushUint8(value) {
		this.assertPosition(this.position);
		this.bytes[this.position] = value;
		this.position++;
	},
	pushUint16(value) {
		this.assertPosition(this.position + 1);
		this.dataView.setUint16(this.position, value);
		this.position += 2;
	},
	pushUint24(value) {
		this.assertPosition(this.position + 2);
		this.dataView.setUint16(this.position, value >> 8);
		this.dataView.setUint8(this.position + 2, value & 255);
		this.position += 3;
	},
	pushUint32(value) {
		this.assertPosition(this.position + 3);
		this.dataView.setUint32(this.position, value);
		this.position += 4;
	},
	readByte() {
		this.assertReadLimit();
		this._touch();
		const value = this.inspectByte();
		this.assertReadSize(1);
		this.position++;
		return value;
	},
	readBytes(length, size) {
		this.assertReadLimit();
		this._touch();
		const value = this.inspectBytes(length);
		this.assertReadSize(length);
		this.position += size ?? length;
		return value;
	},
	readUint8() {
		this.assertReadLimit();
		this._touch();
		const value = this.inspectUint8();
		this.assertReadSize(1);
		this.position += 1;
		return value;
	},
	readUint16() {
		this.assertReadLimit();
		this._touch();
		const value = this.inspectUint16();
		this.assertReadSize(2);
		this.position += 2;
		return value;
	},
	readUint24() {
		this.assertReadLimit();
		this._touch();
		const value = this.inspectUint24();
		this.assertReadSize(3);
		this.position += 3;
		return value;
	},
	readUint32() {
		this.assertReadLimit();
		this._touch();
		const value = this.inspectUint32();
		this.assertReadSize(4);
		this.position += 4;
		return value;
	},
	get remaining() {
		return this.bytes.length - this.position;
	},
	setPosition(position) {
		const oldPosition = this.position;
		this.assertPosition(position);
		this.position = position;
		return () => this.position = oldPosition;
	},
	_touch() {
		if (this.recursiveReadLimit === Number.POSITIVE_INFINITY) return;
		const count = this.getReadCount();
		this.positionReadCount.set(this.position, count + 1);
		if (count > 0) this.recursiveReadCount++;
	}
};
/** @internal */
function create(bytes, { recursiveReadLimit = 8192 } = {}) {
	const cursor = Object.create(staticCursor);
	cursor.bytes = bytes;
	cursor.dataView = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
	cursor.positionReadCount = /* @__PURE__ */ new Map();
	cursor.recursiveReadLimit = recursiveReadLimit;
	cursor.readSizeLimit = 32 * (bytes.length + recursiveReadLimit);
	return cursor;
}
/** @internal */
var NegativeOffsetError = class extends BaseError$1 {
	constructor({ offset }) {
		super(`Offset \`${offset}\` cannot be negative.`);
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "Cursor.NegativeOffsetError"
		});
	}
};
/** @internal */
var PositionOutOfBoundsError = class extends BaseError$1 {
	constructor({ length, position }) {
		super(`Position \`${position}\` is out of bounds (\`0 < position < ${length}\`).`);
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "Cursor.PositionOutOfBoundsError"
		});
	}
};
/** @internal */
var ReadSizeLimitExceededError = class extends BaseError$1 {
	constructor({ limit, size }) {
		super(`Read size limit of \`${limit}\` bytes exceeded (read size: \`${size}\` bytes).`);
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "Cursor.ReadSizeLimitExceededError"
		});
	}
};
/** @internal */
var RecursiveReadLimitExceededError = class extends BaseError$1 {
	constructor({ count, limit }) {
		super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`);
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "Cursor.RecursiveReadLimitExceededError"
		});
	}
};
//#endregion
//#region node_modules/ox/_esm/core/AbiParameters.js
function decode(parameters, data, options = {}) {
	const { as = "Array", checksumAddress = false } = options;
	const bytes = typeof data === "string" ? fromHex(data) : data;
	const cursor = create(bytes);
	if (size$3(bytes) === 0 && parameters.length > 0) throw new ZeroDataError();
	if (size$3(bytes) && size$3(bytes) < 32) throw new DataSizeTooSmallError({
		data: typeof data === "string" ? data : fromBytes$1(data),
		parameters,
		size: size$3(bytes)
	});
	let consumed = 0;
	const values = as === "Array" ? [] : {};
	for (let i = 0; i < parameters.length; ++i) {
		const param = parameters[i];
		if (consumed < bytes.length) cursor.setPosition(consumed);
		const [data, consumed_] = decodeParameter(cursor, param, {
			checksumAddress,
			staticPosition: 0
		});
		consumed += consumed_;
		if (as === "Array") values.push(data);
		else values[param.name ?? i] = data;
	}
	return values;
}
/**
* Encodes primitive values into ABI encoded data as per the [Application Binary Interface (ABI) Specification](https://docs.soliditylang.org/en/latest/abi-spec).
*
* @example
* ```ts twoslash
* import { AbiParameters } from 'ox'
*
* const data = AbiParameters.encode(
*   AbiParameters.from(['string', 'uint', 'bool']),
*   ['wagmi', 420n, true],
* )
* ```
*
* @example
* ### JSON Parameters
*
* Specify **JSON ABI** Parameters as schema:
*
* ```ts twoslash
* import { AbiParameters } from 'ox'
*
* const data = AbiParameters.encode(
*   [
*     { type: 'string', name: 'name' },
*     { type: 'uint', name: 'age' },
*     { type: 'bool', name: 'isOwner' },
*   ],
*   ['wagmi', 420n, true],
* )
* ```
*
* @param parameters - The set of ABI parameters to encode, in the shape of the `inputs` or `outputs` attribute of an ABI Item. These parameters must include valid [ABI types](https://docs.soliditylang.org/en/latest/types.html).
* @param values - The set of primitive values that correspond to the ABI types defined in `parameters`.
* @returns ABI encoded data.
*/
function encode$1(parameters, values, options) {
	const { checksumAddress = false } = options ?? {};
	if (parameters.length !== values.length) throw new LengthMismatchError({
		expectedLength: parameters.length,
		givenLength: values.length
	});
	const data = encode$2(prepareParameters({
		checksumAddress,
		parameters,
		values
	}));
	if (data.length === 0) return "0x";
	return data;
}
/**
* Encodes an array of primitive values to a [packed ABI encoding](https://docs.soliditylang.org/en/latest/abi-spec.html#non-standard-packed-mode).
*
* @example
* ```ts twoslash
* import { AbiParameters } from 'ox'
*
* const encoded = AbiParameters.encodePacked(
*   ['address', 'string'],
*   ['0xd8da6bf26964af9d7eed9e03e53415d37aa96045', 'hello world'],
* )
* // @log: '0xd8da6bf26964af9d7eed9e03e53415d37aa9604568656c6c6f20776f726c64'
* ```
*
* @param types - Set of ABI types to pack encode.
* @param values - The set of primitive values that correspond to the ABI types defined in `types`.
* @returns The encoded packed data.
*/
function encodePacked(types, values) {
	if (types.length !== values.length) throw new LengthMismatchError({
		expectedLength: types.length,
		givenLength: values.length
	});
	const data = [];
	for (let i = 0; i < types.length; i++) {
		const type = types[i];
		const value = values[i];
		data.push(encodePacked.encode(type, value));
	}
	return concat(...data);
}
(function(encodePacked) {
	function encode(type, value, isArray = false) {
		if (type === "address") {
			const address = value;
			assert$3(address);
			return padLeft(address.toLowerCase(), isArray ? 32 : 0);
		}
		if (type === "string") return fromString$1(value);
		if (type === "bytes") return value;
		if (type === "bool") return padLeft(fromBoolean(value), isArray ? 32 : 1);
		const intMatch = type.match(integerRegex);
		if (intMatch) {
			const [_type, baseType, bits = "256"] = intMatch;
			const size = Number.parseInt(bits, 10) / 8;
			return fromNumber(value, {
				size: isArray ? 32 : size,
				signed: baseType === "int"
			});
		}
		const bytesMatch = type.match(bytesRegex);
		if (bytesMatch) {
			const [_type, size] = bytesMatch;
			if (Number.parseInt(size, 10) !== (value.length - 2) / 2) throw new BytesSizeMismatchError({
				expectedSize: Number.parseInt(size, 10),
				value
			});
			return padRight(value, isArray ? 32 : 0);
		}
		const arrayMatch = type.match(arrayRegex);
		if (arrayMatch && Array.isArray(value)) {
			const [_type, childType] = arrayMatch;
			const data = [];
			for (let i = 0; i < value.length; i++) data.push(encode(childType, value[i], true));
			if (data.length === 0) return "0x";
			return concat(...data);
		}
		throw new InvalidTypeError(type);
	}
	encodePacked.encode = encode;
})(encodePacked || (encodePacked = {}));
/**
* Parses arbitrary **JSON ABI Parameters** or **Human Readable ABI Parameters** into typed {@link ox#AbiParameters.AbiParameters}.
*
* @example
* ### JSON Parameters
*
* ```ts twoslash
* import { AbiParameters } from 'ox'
*
* const parameters = AbiParameters.from([
*   {
*     name: 'spender',
*     type: 'address',
*   },
*   {
*     name: 'amount',
*     type: 'uint256',
*   },
* ])
*
* parameters
* //^?
*
*
*
*
*
*
*
* ```
*
* @example
* ### Human Readable Parameters
*
* Human Readable ABI Parameters can be parsed into a typed {@link ox#AbiParameters.AbiParameters}:
*
* ```ts twoslash
* import { AbiParameters } from 'ox'
*
* const parameters = AbiParameters.from('address spender, uint256 amount')
*
* parameters
* //^?
*
*
*
*
*
*
*
* ```
*
* @example
* It is possible to specify `struct`s along with your definitions:
*
* ```ts twoslash
* import { AbiParameters } from 'ox'
*
* const parameters = AbiParameters.from([
*   'struct Foo { address spender; uint256 amount; }', // [!code hl]
*   'Foo foo, address bar',
* ])
*
* parameters
* //^?
*
*
*
*
*
*
*
*
*
*
*
*
* ```
*
*
*
* @param parameters - The ABI Parameters to parse.
* @returns The typed ABI Parameters.
*/
function from$5(parameters) {
	if (Array.isArray(parameters) && typeof parameters[0] === "string") return parseAbiParameters(parameters);
	if (typeof parameters === "string") return parseAbiParameters(parameters);
	return parameters;
}
/**
* Throws when the data size is too small for the given parameters.
*
* @example
* ```ts twoslash
* import { AbiParameters } from 'ox'
*
* AbiParameters.decode([{ type: 'uint256' }], '0x010f')
* //                                             ↑ ❌ 2 bytes
* // @error: AbiParameters.DataSizeTooSmallError: Data size of 2 bytes is too small for given parameters.
* // @error: Params: (uint256)
* // @error: Data:   0x010f (2 bytes)
* ```
*
* ### Solution
*
* Pass a valid data size.
*
* ```ts twoslash
* import { AbiParameters } from 'ox'
*
* AbiParameters.decode([{ type: 'uint256' }], '0x00000000000000000000000000000000000000000000000000000000000010f')
* //                                             ↑ ✅ 32 bytes
* ```
*/
var DataSizeTooSmallError = class extends BaseError$1 {
	constructor({ data, parameters, size }) {
		super(`Data size of ${size} bytes is too small for given parameters.`, { metaMessages: [`Params: (${formatAbiParameters(parameters)})`, `Data:   ${data} (${size} bytes)`] });
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "AbiParameters.DataSizeTooSmallError"
		});
	}
};
/**
* Throws when zero data is provided, but data is expected.
*
* @example
* ```ts twoslash
* import { AbiParameters } from 'ox'
*
* AbiParameters.decode([{ type: 'uint256' }], '0x')
* //                                           ↑ ❌ zero data
* // @error: AbiParameters.DataSizeTooSmallError: Data size of 2 bytes is too small for given parameters.
* // @error: Params: (uint256)
* // @error: Data:   0x010f (2 bytes)
* ```
*
* ### Solution
*
* Pass valid data.
*
* ```ts twoslash
* import { AbiParameters } from 'ox'
*
* AbiParameters.decode([{ type: 'uint256' }], '0x00000000000000000000000000000000000000000000000000000000000010f')
* //                                             ↑ ✅ 32 bytes
* ```
*/
var ZeroDataError = class extends BaseError$1 {
	constructor() {
		super("Cannot decode zero data (\"0x\") with ABI parameters.");
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "AbiParameters.ZeroDataError"
		});
	}
};
/**
* The length of the array value does not match the length specified in the corresponding ABI parameter.
*
* ### Example
*
* ```ts twoslash
* // @noErrors
* import { AbiParameters } from 'ox'
* // ---cut---
* AbiParameters.encode(AbiParameters.from('uint256[3]'), [[69n, 420n]])
* //                                               ↑ expected: 3  ↑ ❌ length: 2
* // @error: AbiParameters.ArrayLengthMismatchError: ABI encoding array length mismatch
* // @error: for type `uint256[3]`. Expected: `3`. Given: `2`.
* ```
*
* ### Solution
*
* Pass an array of the correct length.
*
* ```ts twoslash
* import { AbiParameters } from 'ox'
* // ---cut---
* AbiParameters.encode(AbiParameters.from(['uint256[3]']), [[69n, 420n, 69n]])
* //                                                         ↑ ✅ length: 3
* ```
*/
var ArrayLengthMismatchError = class extends BaseError$1 {
	constructor({ expectedLength, givenLength, type }) {
		super(`Array length mismatch for type \`${type}\`. Expected: \`${expectedLength}\`. Given: \`${givenLength}\`.`);
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "AbiParameters.ArrayLengthMismatchError"
		});
	}
};
/**
* The size of the bytes value does not match the size specified in the corresponding ABI parameter.
*
* ### Example
*
* ```ts twoslash
* // @noErrors
* import { AbiParameters } from 'ox'
* // ---cut---
* AbiParameters.encode(AbiParameters.from('bytes8'), [['0xdeadbeefdeadbeefdeadbeef']])
* //                                            ↑ expected: 8 bytes  ↑ ❌ size: 12 bytes
* // @error: BytesSizeMismatchError: Size of bytes "0xdeadbeefdeadbeefdeadbeef"
* // @error: (bytes12) does not match expected size (bytes8).
* ```
*
* ### Solution
*
* Pass a bytes value of the correct size.
*
* ```ts twoslash
* import { AbiParameters } from 'ox'
* // ---cut---
* AbiParameters.encode(AbiParameters.from(['bytes8']), ['0xdeadbeefdeadbeef'])
* //                                                       ↑ ✅ size: 8 bytes
* ```
*/
var BytesSizeMismatchError = class extends BaseError$1 {
	constructor({ expectedSize, value }) {
		super(`Size of bytes "${value}" (bytes${size$2(value)}) does not match expected size (bytes${expectedSize}).`);
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "AbiParameters.BytesSizeMismatchError"
		});
	}
};
/**
* The length of the values to encode does not match the length of the ABI parameters.
*
* ### Example
*
* ```ts twoslash
* // @noErrors
* import { AbiParameters } from 'ox'
* // ---cut---
* AbiParameters.encode(AbiParameters.from(['string', 'uint256']), ['hello'])
* // @error: LengthMismatchError: ABI encoding params/values length mismatch.
* // @error: Expected length (params): 2
* // @error: Given length (values): 1
* ```
*
* ### Solution
*
* Pass the correct number of values to encode.
*
* ### Solution
*
* Pass a [valid ABI type](https://docs.soliditylang.org/en/develop/abi-spec.html#types).
*/
var LengthMismatchError = class extends BaseError$1 {
	constructor({ expectedLength, givenLength }) {
		super([
			"ABI encoding parameters/values length mismatch.",
			`Expected length (parameters): ${expectedLength}`,
			`Given length (values): ${givenLength}`
		].join("\n"));
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "AbiParameters.LengthMismatchError"
		});
	}
};
/**
* The value provided is not a valid array as specified in the corresponding ABI parameter.
*
* ### Example
*
* ```ts twoslash
* // @noErrors
* import { AbiParameters } from 'ox'
* // ---cut---
* AbiParameters.encode(AbiParameters.from(['uint256[3]']), [69])
* ```
*
* ### Solution
*
* Pass an array value.
*/
var InvalidArrayError = class extends BaseError$1 {
	constructor(value) {
		super(`Value \`${value}\` is not a valid array.`);
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "AbiParameters.InvalidArrayError"
		});
	}
};
/**
* Throws when the ABI parameter type is invalid.
*
* @example
* ```ts twoslash
* import { AbiParameters } from 'ox'
*
* AbiParameters.decode([{ type: 'lol' }], '0x00000000000000000000000000000000000000000000000000000000000010f')
* //                             ↑ ❌ invalid type
* // @error: AbiParameters.InvalidTypeError: Type `lol` is not a valid ABI Type.
* ```
*/
var InvalidTypeError = class extends BaseError$1 {
	constructor(type) {
		super(`Type \`${type}\` is not a valid ABI Type.`);
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "AbiParameters.InvalidTypeError"
		});
	}
};
//#endregion
//#region node_modules/ox/_esm/core/Signature.js
/**
* Asserts that a Signature is valid.
*
* @example
* ```ts twoslash
* import { Signature } from 'ox'
*
* Signature.assert({
*   r: -49782753348462494199823712700004552394425719014458918871452329774910450607807n,
*   s: 33726695977844476214676913201140481102225469284307016937915595756355928419768n,
*   yParity: 1,
* })
* // @error: InvalidSignatureRError:
* // @error: Value `-549...n` is an invalid r value.
* // @error: r must be a positive integer less than 2^256.
* ```
*
* @param signature - The signature object to assert.
*/
function assert$2(signature, options = {}) {
	const { recovered } = options;
	if (typeof signature.r === "undefined") throw new MissingPropertiesError({ signature });
	if (typeof signature.s === "undefined") throw new MissingPropertiesError({ signature });
	if (recovered && (signature.yParity === void 0 || signature.yParity === null)) throw new MissingPropertiesError({ signature });
	if (signature.r < 0n || signature.r > maxUint256) throw new InvalidRError({ value: signature.r });
	if (signature.s < 0n || signature.s > maxUint256) throw new InvalidSError({ value: signature.s });
	if (signature.yParity !== void 0 && signature.yParity !== 0 && signature.yParity !== 1) throw new InvalidYParityError({ value: signature.yParity });
}
/**
* Converts a {@link ox#Signature.Rpc} into a {@link ox#Signature.Signature}.
*
* @example
* ```ts twoslash
* import { Signature } from 'ox'
*
* const signature = Signature.fromRpc({
*   r: '0x635dc2033e60185bb36709c29c75d64ea51dfbd91c32ef4be198e4ceb169fb4d',
*   s: '0x50c2667ac4c771072746acfdcf1f1483336dcca8bd2df47cd83175dbe60f0540',
*   yParity: '0x0',
* })
* ```
*
* @param signature - The {@link ox#Signature.Rpc} to convert.
* @returns The converted {@link ox#Signature.Signature}.
*/
function fromRpc$1(signature) {
	const yParity = (() => {
		const v = signature.v ? Number(signature.v) : void 0;
		let yParity = signature.yParity ? Number(signature.yParity) : void 0;
		if (typeof v === "number" && typeof yParity !== "number") yParity = vToYParity(v);
		if (typeof yParity !== "number") throw new InvalidYParityError({ value: signature.yParity });
		return yParity;
	})();
	return {
		r: BigInt(signature.r),
		s: BigInt(signature.s),
		yParity
	};
}
/**
* Converts a ECDSA `v` value to a `yParity` value.
*
* @example
* ```ts twoslash
* import { Signature } from 'ox'
*
* const yParity = Signature.vToYParity(28)
* // @log: 1
* ```
*
* @param v - The ECDSA `v` value to convert.
* @returns The `yParity` value.
*/
function vToYParity(v) {
	if (v === 0 || v === 27) return 0;
	if (v === 1 || v === 28) return 1;
	if (v >= 35) return v % 2 === 0 ? 1 : 0;
	throw new InvalidVError({ value: v });
}
/** Thrown when the signature is missing either an `r`, `s`, or `yParity` property. */
var MissingPropertiesError = class extends BaseError$1 {
	constructor({ signature }) {
		super(`Signature \`${stringify(signature)}\` is missing either an \`r\`, \`s\`, or \`yParity\` property.`);
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "Signature.MissingPropertiesError"
		});
	}
};
/** Thrown when the signature has an invalid `r` value. */
var InvalidRError = class extends BaseError$1 {
	constructor({ value }) {
		super(`Value \`${value}\` is an invalid r value. r must be a positive integer less than 2^256.`);
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "Signature.InvalidRError"
		});
	}
};
/** Thrown when the signature has an invalid `s` value. */
var InvalidSError = class extends BaseError$1 {
	constructor({ value }) {
		super(`Value \`${value}\` is an invalid s value. s must be a positive integer less than 2^256.`);
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "Signature.InvalidSError"
		});
	}
};
/** Thrown when the signature has an invalid `yParity` value. */
var InvalidYParityError = class extends BaseError$1 {
	constructor({ value }) {
		super(`Value \`${value}\` is an invalid y-parity value. Y-parity must be 0 or 1.`);
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "Signature.InvalidYParityError"
		});
	}
};
/** Thrown when the signature has an invalid `v` value. */
var InvalidVError = class extends BaseError$1 {
	constructor({ value }) {
		super(`Value \`${value}\` is an invalid v value. v must be 27, 28 or >=35.`);
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "Signature.InvalidVError"
		});
	}
};
//#endregion
//#region node_modules/ox/_esm/core/Authorization.js
/**
* Converts an [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) Authorization object into a typed {@link ox#Authorization.Authorization}.
*
* @example
* An Authorization can be instantiated from an [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) Authorization tuple in object format.
*
* ```ts twoslash
* import { Authorization } from 'ox'
*
* const authorization = Authorization.from({
*   address: '0x1234567890abcdef1234567890abcdef12345678',
*   chainId: 1,
*   nonce: 69n,
* })
* ```
*
* @example
* ### Attaching Signatures
*
* A {@link ox#Signature.Signature} can be attached with the `signature` option. The example below demonstrates signing
* an Authorization with {@link ox#Secp256k1.(sign:function)}.
*
* ```ts twoslash
* import { Authorization, Secp256k1 } from 'ox'
*
* const authorization = Authorization.from({
*   address: '0xbe95c3f554e9fc85ec51be69a3d807a0d55bcf2c',
*   chainId: 1,
*   nonce: 40n,
* })
*
* const signature = Secp256k1.sign({
*   payload: Authorization.getSignPayload(authorization),
*   privateKey: '0x...',
* })
*
* const authorization_signed = Authorization.from(authorization, { signature }) // [!code focus]
* ```
*
* @param authorization - An [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) Authorization tuple in object format.
* @param options - Authorization options.
* @returns The {@link ox#Authorization.Authorization}.
*/
function from$4(authorization, options = {}) {
	if (typeof authorization.chainId === "string") return fromRpc(authorization);
	return {
		...authorization,
		...options.signature
	};
}
/**
* Converts an {@link ox#Authorization.Rpc} to an {@link ox#Authorization.Authorization}.
*
* @example
* ```ts twoslash
* import { Authorization } from 'ox'
*
* const authorization = Authorization.fromRpc({
*   address: '0x0000000000000000000000000000000000000000',
*   chainId: '0x1',
*   nonce: '0x1',
*   r: '0x635dc2033e60185bb36709c29c75d64ea51dfbd91c32ef4be198e4ceb169fb4d',
*   s: '0x50c2667ac4c771072746acfdcf1f1483336dcca8bd2df47cd83175dbe60f0540',
*   yParity: '0x0',
* })
* ```
*
* @param authorization - The RPC-formatted Authorization.
* @returns A signed {@link ox#Authorization.Authorization}.
*/
function fromRpc(authorization) {
	const { address, chainId, nonce } = authorization;
	const signature = fromRpc$1(authorization);
	assert$2({
		r: signature.r,
		s: signature.s
	});
	assertYParity(signature.yParity);
	return {
		address,
		chainId: toChainId(chainId),
		nonce: BigInt(nonce),
		...signature
	};
}
function toChainId(chainId) {
	const value = Number(chainId);
	if (Number.isSafeInteger(value)) return value;
	throw new IntegerOutOfRangeError({
		max: `${Number.MAX_SAFE_INTEGER}`,
		min: "0",
		signed: false,
		value: `${value}`
	});
}
function assertYParity(yParity) {
	if (Number.isInteger(yParity) && yParity >= 0 && yParity < 256) return;
	throw new IntegerOutOfRangeError({
		max: "255",
		min: "0",
		signed: false,
		size: 1,
		value: `${yParity}`
	});
}
/** Suffix ABI parameters for the ERC-8010 wrapped signature. */
var suffixParameters = from$5("(uint256 chainId, address delegation, uint256 nonce, uint8 yParity, uint256 r, uint256 s), address to, bytes data");
/**
* Asserts that the wrapped signature is valid.
*
* @example
* ```ts twoslash
* import { SignatureErc8010 } from 'ox/erc8010'
*
* SignatureErc8010.assert('0xdeadbeef')
* // @error: InvalidWrappedSignatureError: Value `0xdeadbeef` is an invalid ERC-8010 wrapped signature.
* ```
*
* @param value - The value to assert.
*/
function assert$1(value) {
	if (typeof value === "string") {
		if (slice(value, -32) !== "0x8010801080108010801080108010801080108010801080108010801080108010") throw new InvalidWrappedSignatureError$1(value);
	} else assert$2(value.authorization);
}
/**
* Unwraps an [ERC-8010 wrapped signature](https://github.com/jxom/ERCs/blob/16f7e3891fff2e1e9c25dea0485497739db8a816/ERCS/erc-8010.md) into its constituent parts.
*
* @example
* ```ts twoslash
* import { SignatureErc8010 } from 'ox/erc8010'
*
* const { authorization, data, signature } = SignatureErc8010.unwrap('0x...')
* ```
*
* @param wrapped - Wrapped signature to unwrap.
* @returns Unwrapped signature.
*/
function unwrap(wrapped) {
	assert$1(wrapped);
	const suffixLength = toNumber(slice(wrapped, -64, -32));
	const suffix = slice(wrapped, -suffixLength - 64, -64);
	const signature = slice(wrapped, 0, -suffixLength - 64);
	const [auth, to, data] = decode(suffixParameters, suffix);
	return {
		authorization: from$4({
			address: auth.delegation,
			chainId: Number(auth.chainId),
			nonce: auth.nonce,
			yParity: auth.yParity,
			r: auth.r,
			s: auth.s
		}),
		signature,
		...data && data !== "0x" ? {
			data,
			to
		} : {}
	};
}
/**
* Validates a wrapped signature. Returns `true` if the wrapped signature is valid, `false` otherwise.
*
* @example
* ```ts twoslash
* import { SignatureErc8010 } from 'ox/erc8010'
*
* const valid = SignatureErc8010.validate('0xdeadbeef')
* // @log: false
* ```
*
* @param value - The value to validate.
* @returns `true` if the value is valid, `false` otherwise.
*/
function validate$1(value) {
	try {
		assert$1(value);
		return true;
	} catch {
		return false;
	}
}
/** Thrown when the ERC-8010 wrapped signature is invalid. */
var InvalidWrappedSignatureError$1 = class extends BaseError$1 {
	constructor(wrapped) {
		super(`Value \`${wrapped}\` is an invalid ERC-8010 wrapped signature.`);
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "SignatureErc8010.InvalidWrappedSignatureError"
		});
	}
};
//#endregion
//#region node_modules/viem/_esm/utils/unit/formatUnits.js
/**
*  Divides a number by a given exponent of base 10 (10exponent), and formats it into a string representation of the number..
*
* - Docs: https://viem.sh/docs/utilities/formatUnits
*
* @example
* import { formatUnits } from 'viem'
*
* formatUnits(420000000000n, 9)
* // '420'
*/
function formatUnits(value, decimals) {
	return format$3(value, decimals);
}
//#endregion
//#region node_modules/viem/_esm/utils/unit/parseUnits.js
/**
* Multiplies a string representation of a number by a given exponent of base 10 (10exponent).
*
* - Docs: https://viem.sh/docs/utilities/parseUnits
*
* @example
* import { parseUnits } from 'viem'
*
* parseUnits('420', 9)
* // 420000000000n
*/
function parseUnits(value, decimals) {
	return from$8(value, decimals);
}
//#endregion
//#region node_modules/viem/_esm/utils/formatters/proof.js
function formatStorageProof(storageProof) {
	return storageProof.map((proof) => ({
		...proof,
		value: BigInt(proof.value)
	}));
}
function formatProof(proof) {
	return {
		...proof,
		balance: proof.balance ? BigInt(proof.balance) : void 0,
		nonce: proof.nonce ? hexToNumber(proof.nonce) : void 0,
		storageProof: proof.storageProof ? formatStorageProof(proof.storageProof) : void 0
	};
}
//#endregion
//#region node_modules/viem/_esm/actions/public/getProof.js
/**
* Returns the account and storage values of the specified account including the Merkle-proof.
*
* - Docs: https://viem.sh/docs/actions/public/getProof
* - JSON-RPC Methods:
*   - Calls [`eth_getProof`](https://eips.ethereum.org/EIPS/eip-1186)
*
* @param client - Client to use
* @param parameters - {@link GetProofParameters}
* @returns Proof data. {@link GetProofReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getProof } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const block = await getProof(client, {
*  address: '0x...',
*  storageKeys: ['0x...'],
* })
*/
async function getProof(client, { address, blockHash, blockNumber, blockTag = "latest", requireCanonical, storageKeys }) {
	const block = formatBlockParameter({
		blockHash,
		blockNumber,
		blockTag,
		requireCanonical
	});
	return formatProof(await client.request({
		method: "eth_getProof",
		params: [
			address,
			storageKeys,
			block
		]
	}));
}
//#endregion
//#region node_modules/viem/_esm/actions/public/getRawTransaction.js
/**
* Returns the raw, serialized [Transaction](https://viem.sh/docs/glossary/terms#transaction) given a hash.
*
* - Docs: https://viem.sh/docs/actions/public/getRawTransaction
* - JSON-RPC Methods: `eth_getRawTransactionByHash`
*
* @param client - Client to use
* @param parameters - {@link GetRawTransactionParameters}
* @returns The raw, serialized transaction. {@link GetRawTransactionReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getRawTransaction } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const rawTransaction = await getRawTransaction(client, {
*   hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
* })
*/
async function getRawTransaction(client, { hash }) {
	const rawTransaction = await client.request({
		method: "eth_getRawTransactionByHash",
		params: [hash]
	}, { dedupe: true });
	if (!rawTransaction) throw new TransactionNotFoundError({ hash });
	return rawTransaction;
}
//#endregion
//#region node_modules/viem/_esm/actions/public/getStorageAt.js
/**
* Returns the value from a storage slot at a given address.
*
* - Docs: https://viem.sh/docs/contract/getStorageAt
* - JSON-RPC Methods: [`eth_getStorageAt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getstorageat)
*
* @param client - Client to use
* @param parameters - {@link GetStorageAtParameters}
* @returns The value of the storage slot. {@link GetStorageAtReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getStorageAt } from 'viem/contract'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const code = await getStorageAt(client, {
*   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
*   slot: toHex(0),
* })
*/
async function getStorageAt(client, { address, blockHash, blockNumber, blockTag = "latest", requireCanonical, slot }) {
	const block = formatBlockParameter({
		blockHash,
		blockNumber,
		blockTag,
		requireCanonical
	});
	return await client.request({
		method: "eth_getStorageAt",
		params: [
			address,
			slot,
			block
		]
	});
}
//#endregion
//#region node_modules/viem/_esm/actions/public/getStorageValues.js
/**
* Returns values from multiple storage slots for multiple adddresses at a given block.
*
* - Docs: https://viem.sh/docs/actions/public/getStorageValues
* - JSON-RPC Methods: [`eth_getStorageValues`](https://github.com/ethereum/execution-apis/issues/752)
*
* @param client - Client to use
* @param parameters - {@link GetStorageValuesParameters}
* @returns The values of the requested storage slots. {@link GetStorageValuesReturnType}
*
* @example
* import { createPublicClient, http, toHex } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getStorageValues } from 'viem/actions'
*
* const client = createPublicClient({ chain: mainnet, transport: http() })
* const values = await getStorageValues(client, {
*   requests: {
*     '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2': [
*       toHex(0, { size: 32 }),
*       toHex(1, { size: 32 }),
*     ],
*   },
* })
*/
async function getStorageValues(client, { blockHash, blockNumber, blockTag = "latest", requireCanonical, requests }) {
	const block = formatBlockParameter({
		blockHash,
		blockNumber,
		blockTag,
		requireCanonical
	});
	return client.request({
		method: "eth_getStorageValues",
		params: [requests, block]
	});
}
//#endregion
//#region node_modules/viem/_esm/actions/public/getTransaction.js
/**
* Returns information about a [Transaction](https://viem.sh/docs/glossary/terms#transaction) given a hash or block identifier.
*
* - Docs: https://viem.sh/docs/actions/public/getTransaction
* - Example: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_fetching-transactions
* - JSON-RPC Methods: [`eth_getTransactionByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionByHash)
*
* @param client - Client to use
* @param parameters - {@link GetTransactionParameters}
* @returns The transaction information. {@link GetTransactionReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getTransaction } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const transaction = await getTransaction(client, {
*   hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
* })
*/
async function getTransaction(client, { blockHash, blockNumber, blockTag: blockTag_, hash, index, sender, nonce }) {
	const blockTag = blockTag_ || "latest";
	const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
	let transaction = null;
	if (hash) transaction = await client.request({
		method: "eth_getTransactionByHash",
		params: [hash]
	}, { dedupe: true });
	else if (blockHash) transaction = await client.request({
		method: "eth_getTransactionByBlockHashAndIndex",
		params: [blockHash, numberToHex(index)]
	}, { dedupe: true });
	else if ((blockNumberHex || blockTag) && typeof index === "number") transaction = await client.request({
		method: "eth_getTransactionByBlockNumberAndIndex",
		params: [blockNumberHex || blockTag, numberToHex(index)]
	}, { dedupe: Boolean(blockNumberHex) });
	else if (sender && typeof nonce === "number") transaction = await client.request({
		method: "eth_getTransactionBySenderAndNonce",
		params: [sender, numberToHex(nonce)]
	}, { dedupe: true });
	if (!transaction) throw new TransactionNotFoundError({
		blockHash,
		blockNumber,
		blockTag,
		hash,
		index
	});
	return (client.chain?.formatters?.transaction?.format || formatTransaction)(transaction, "getTransaction");
}
//#endregion
//#region node_modules/viem/_esm/actions/public/getTransactionConfirmations.js
/**
* Returns the number of blocks passed (confirmations) since the transaction was processed on a block.
*
* - Docs: https://viem.sh/docs/actions/public/getTransactionConfirmations
* - Example: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_fetching-transactions
* - JSON-RPC Methods: [`eth_getTransactionConfirmations`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionConfirmations)
*
* @param client - Client to use
* @param parameters - {@link GetTransactionConfirmationsParameters}
* @returns The number of blocks passed since the transaction was processed. If confirmations is 0, then the Transaction has not been confirmed & processed yet. {@link GetTransactionConfirmationsReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getTransactionConfirmations } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const confirmations = await getTransactionConfirmations(client, {
*   hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
* })
*/
async function getTransactionConfirmations(client, { hash, transactionReceipt }) {
	const [blockNumber, transaction] = await Promise.all([getAction(client, getBlockNumber, "getBlockNumber")({}), hash ? getAction(client, getTransaction, "getTransaction")({ hash }) : void 0]);
	const transactionBlockNumber = transactionReceipt?.blockNumber || transaction?.blockNumber;
	if (!transactionBlockNumber) return 0n;
	const headBlockNumber = blockNumber < transactionBlockNumber ? await getAction(client, getBlockNumber, "getBlockNumber")({ cacheTime: 0 }) : blockNumber;
	if (headBlockNumber < transactionBlockNumber) return 1n;
	return headBlockNumber - transactionBlockNumber + 1n;
}
//#endregion
//#region node_modules/viem/_esm/actions/public/getTransactionReceipt.js
/**
* Returns the [Transaction Receipt](https://viem.sh/docs/glossary/terms#transaction-receipt) given a [Transaction](https://viem.sh/docs/glossary/terms#transaction) hash.
*
* - Docs: https://viem.sh/docs/actions/public/getTransactionReceipt
* - Example: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_fetching-transactions
* - JSON-RPC Methods: [`eth_getTransactionReceipt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactionreceipt)
*
* @param client - Client to use
* @param parameters - {@link GetTransactionReceiptParameters}
* @returns The transaction receipt. {@link GetTransactionReceiptReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getTransactionReceipt } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const transactionReceipt = await getTransactionReceipt(client, {
*   hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
* })
*/
async function getTransactionReceipt(client, { hash }) {
	const receipt = await client.request({
		method: "eth_getTransactionReceipt",
		params: [hash]
	}, { dedupe: true });
	if (!receipt) throw new TransactionReceiptNotFoundError({ hash });
	return (client.chain?.formatters?.transactionReceipt?.format || formatTransactionReceipt)(receipt, "getTransactionReceipt");
}
//#endregion
//#region node_modules/viem/_esm/actions/public/multicall.js
/**
* Similar to [`readContract`](https://viem.sh/docs/contract/readContract), but batches up multiple functions on a contract in a single RPC call via the [`multicall3` contract](https://github.com/mds1/multicall).
*
* - Docs: https://viem.sh/docs/contract/multicall
*
* @param client - Client to use
* @param parameters - {@link MulticallParameters}
* @returns An array of results with accompanying status. {@link MulticallReturnType}
*
* @example
* import { createPublicClient, http, parseAbi } from 'viem'
* import { mainnet } from 'viem/chains'
* import { multicall } from 'viem/contract'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const abi = parseAbi([
*   'function balanceOf(address) view returns (uint256)',
*   'function totalSupply() view returns (uint256)',
* ])
* const results = await multicall(client, {
*   contracts: [
*     {
*       address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
*       abi,
*       functionName: 'balanceOf',
*       args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'],
*     },
*     {
*       address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
*       abi,
*       functionName: 'totalSupply',
*     },
*   ],
* })
* // [{ result: 424122n, status: 'success' }, { result: 1000000n, status: 'success' }]
*/
async function multicall(client, parameters) {
	const { account, authorizationList, allowFailure = true, blockHash, blockNumber, blockOverrides, blockTag, requireCanonical, stateOverride } = parameters;
	const contracts = parameters.contracts;
	const batch = typeof client.batch?.multicall === "object" ? client.batch.multicall : {};
	const batchSize = parameters.batchSize ?? batch.batchSize ?? 1024;
	const deployless = parameters.deployless ?? batch.deployless ?? false;
	const multicallAddress = (() => {
		if (parameters.multicallAddress) return parameters.multicallAddress;
		if (deployless) return null;
		if (client.chain) return getChainContractAddress({
			blockNumber,
			chain: client.chain,
			contract: "multicall3"
		});
		throw new Error("client chain not configured. multicallAddress is required.");
	})();
	const chunkedCalls = [[]];
	let currentChunk = 0;
	let currentChunkSize = 0;
	for (let i = 0; i < contracts.length; i++) {
		const { abi, address, args, functionName } = contracts[i];
		try {
			const callData = encodeFunctionData({
				abi,
				args,
				functionName
			});
			currentChunkSize += (callData.length - 2) / 2;
			if (batchSize > 0 && currentChunkSize > batchSize && chunkedCalls[currentChunk].length > 0) {
				currentChunk++;
				currentChunkSize = (callData.length - 2) / 2;
				chunkedCalls[currentChunk] = [];
			}
			chunkedCalls[currentChunk].push({
				allowFailure: true,
				callData,
				target: address
			});
		} catch (err) {
			const error = getContractError(err, {
				abi,
				address,
				args,
				docsPath: "/docs/contract/multicall",
				functionName,
				sender: account
			});
			if (!allowFailure) throw error;
			chunkedCalls[currentChunk].push({
				allowFailure: true,
				callData: "0x",
				target: address
			});
		}
	}
	const batching = Boolean(client.batch?.multicall);
	const batches = batching ? chunkedCalls.flatMap((calls) => calls.map((call) => [call])) : chunkedCalls;
	const aggregate3Results = await Promise.allSettled(batches.map((calls) => {
		if (batching) return scheduleMulticall(client, {
			account,
			authorizationList,
			batchSize,
			blockHash,
			blockNumber,
			blockOverrides,
			blockTag,
			call: calls[0],
			multicallAddress,
			requireCanonical,
			stateOverride
		}).then((result) => [result]);
		return getAction(client, readContract, "readContract")({
			...multicallAddress === null ? { code: multicall3Bytecode } : { address: multicallAddress },
			abi: multicall3Abi,
			account,
			args: [calls],
			authorizationList,
			blockHash,
			blockNumber,
			blockOverrides,
			blockTag,
			functionName: "aggregate3",
			requireCanonical,
			stateOverride
		});
	}));
	const results = [];
	for (let i = 0; i < aggregate3Results.length; i++) {
		const result = aggregate3Results[i];
		if (result.status === "rejected") {
			if (!allowFailure) throw result.reason;
			for (let j = 0; j < batches[i].length; j++) results.push({
				status: "failure",
				error: result.reason,
				result: void 0
			});
			continue;
		}
		const aggregate3Result = result.value;
		for (let j = 0; j < aggregate3Result.length; j++) {
			const { returnData, success } = aggregate3Result[j];
			const { callData } = batches[i][j];
			const { abi, address, functionName, args } = contracts[results.length];
			try {
				if (callData === "0x") throw new AbiDecodingZeroDataError();
				if (!success) throw new RawContractError({ data: returnData });
				const result = decodeFunctionResult({
					abi,
					args,
					data: returnData,
					functionName
				});
				results.push(allowFailure ? {
					result,
					status: "success"
				} : result);
			} catch (err) {
				const error = getContractError(err, {
					abi,
					address,
					args,
					docsPath: "/docs/contract/multicall",
					functionName
				});
				if (!allowFailure) throw error;
				results.push({
					error,
					result: void 0,
					status: "failure"
				});
			}
		}
	}
	if (results.length !== contracts.length) throw new BaseError$3("multicall results mismatch");
	return results;
}
async function scheduleMulticall(client, parameters) {
	const { batchSize, call, multicallAddress, ...rest } = parameters;
	const { wait = 0 } = typeof client.batch?.multicall === "object" ? client.batch.multicall : {};
	const { schedule } = createBatchScheduler({
		id: stringify$1([
			"multicall",
			client.uid,
			batchSize,
			multicallAddress,
			rest
		]),
		wait,
		getSize: ({ callData }) => (callData.length - 2) / 2,
		shouldSplitBatch: (size) => batchSize !== 0 && size > batchSize,
		fn: (calls) => getAction(client, readContract, "readContract")({
			...multicallAddress === null ? { code: multicall3Bytecode } : { address: multicallAddress },
			...rest,
			abi: multicall3Abi,
			args: [calls],
			functionName: "aggregate3"
		})
	});
	const [result] = await schedule(call);
	return result;
}
//#endregion
//#region node_modules/viem/_esm/actions/public/simulateBlocks.js
/**
* Simulates a set of calls on block(s) with optional block and state overrides.
*
* @example
* ```ts
* import { createClient, http, parseEther } from 'viem'
* import { simulate } from 'viem/actions'
* import { mainnet } from 'viem/chains'
*
* const client = createClient({
*   chain: mainnet,
*   transport: http(),
* })
*
* const result = await simulate(client, {
*   blocks: [{
*     blockOverrides: {
*       number: 69420n,
*     },
*     calls: [{
*       {
*         account: '0x5a0b54d5dc17e482fe8b0bdca5320161b95fb929',
*         data: '0xdeadbeef',
*         to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
*       },
*       {
*         account: '0x5a0b54d5dc17e482fe8b0bdca5320161b95fb929',
*         to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
*         value: parseEther('1'),
*       },
*     }],
*     stateOverrides: [{
*       address: '0x5a0b54d5dc17e482fe8b0bdca5320161b95fb929',
*       balance: parseEther('10'),
*     }],
*   }]
* })
* ```
*
* @param client - Client to use.
* @param parameters - {@link SimulateBlocksParameters}
* @returns Simulated blocks. {@link SimulateBlocksReturnType}
*/
async function simulateBlocks(client, parameters) {
	const { blockNumber, blockTag = client.experimental_blockTag ?? "latest", blocks, returnFullTransactions, traceTransfers, validation } = parameters;
	try {
		const blockStateCalls = [];
		for (const block of blocks) {
			const blockOverrides = block.blockOverrides ? toRpc(block.blockOverrides) : void 0;
			const calls = block.calls.map((call_) => {
				const call = call_;
				const account = call.account ? parseAccount(call.account) : void 0;
				const data = call.abi ? encodeFunctionData(call) : call.data;
				const request = {
					...call,
					account,
					data: call.dataSuffix ? concat$1([data || "0x", call.dataSuffix.length % 2 ? `0x0${call.dataSuffix.slice(2)}` : call.dataSuffix]) : data,
					from: call.from ?? account?.address
				};
				assertRequest(request);
				return formatTransactionRequest(request);
			});
			const stateOverrides = block.stateOverrides ? serializeStateOverride(block.stateOverrides) : void 0;
			blockStateCalls.push({
				blockOverrides,
				calls,
				stateOverrides
			});
		}
		const block = (typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0) || blockTag;
		return (await client.request({
			method: "eth_simulateV1",
			params: [{
				blockStateCalls,
				returnFullTransactions,
				traceTransfers,
				validation
			}, block]
		})).map((block, i) => ({
			...formatBlock(block),
			calls: block.calls.map((call, j) => {
				const { abi, args, functionName, to } = blocks[i].calls[j];
				const data = call.error?.data ?? call.returnData;
				const gasUsed = BigInt(call.gasUsed);
				const maxUsedGas = call.maxUsedGas === void 0 ? void 0 : BigInt(call.maxUsedGas);
				const logs = call.logs?.map((log) => formatLog(log));
				const status = call.status === "0x1" ? "success" : "failure";
				const result = abi && status === "success" && data !== "0x" ? decodeFunctionResult({
					abi,
					args,
					data,
					functionName
				}) : null;
				const error = (() => {
					if (status === "success") return void 0;
					let error;
					if (data === "0x") error = new AbiDecodingZeroDataError();
					else if (data) error = new RawContractError({ data });
					if (!error) return void 0;
					return getContractError(error, {
						abi: abi ?? [],
						address: to ?? "0x",
						args,
						functionName: functionName ?? "<unknown>"
					});
				})();
				return {
					data,
					gasUsed,
					logs,
					...maxUsedGas === void 0 ? {} : { maxUsedGas },
					status,
					...status === "success" ? { result } : { error }
				};
			})
		}));
	} catch (e) {
		const cause = e;
		const error = getNodeError(cause, {});
		if (error instanceof UnknownNodeError) throw cause;
		throw error;
	}
}
//#endregion
//#region node_modules/ox/_esm/core/internal/abiItem.js
/** @internal */
function normalizeSignature(signature) {
	let active = true;
	let current = "";
	let level = 0;
	let result = "";
	let valid = false;
	for (let i = 0; i < signature.length; i++) {
		const char = signature[i];
		if ([
			"(",
			")",
			","
		].includes(char)) active = true;
		if (char === "(") level++;
		if (char === ")") level--;
		if (!active) continue;
		if (level === 0) {
			if (char === " " && [
				"event",
				"function",
				"error",
				""
			].includes(result)) result = "";
			else {
				result += char;
				if (char === ")") {
					valid = true;
					break;
				}
			}
			continue;
		}
		if (char === " ") {
			if (!current.endsWith(",") && !current.endsWith("(")) {
				current = "";
				active = false;
			}
			continue;
		}
		result += char;
		current += char;
	}
	if (!valid) throw new BaseError$1("Unable to normalize signature.");
	return result;
}
/**
* `(u)int<M>` regex: (un)signed integer type of `M` bits, `0 < M <= 256`,
* `M % 8 == 0`. Hoisted to module scope; the prior literal at the call
* site was recompiled per overload-resolution iteration.
*
* @internal
*/
var integerTypeRegex = /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
/**
* `bytes<M>` regex: binary type of `M` bytes, `0 < M <= 32`.
*
* @internal
*/
var fixedBytesTypeRegex = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
/** @internal */
function isArgOfType(arg, abiParameter) {
	const argType = typeof arg;
	const abiParameterType = abiParameter.type;
	switch (abiParameterType) {
		case "address": return validate$2(arg, { strict: false });
		case "bool": return argType === "boolean";
		case "function": return argType === "string";
		case "string": return argType === "string";
		default: {
			if (abiParameterType === "tuple" && "components" in abiParameter) return Object.values(abiParameter.components).every((component, index) => {
				return argType === "object" && isArgOfType(getComponentValue(arg, component, index), component);
			});
			const integerMatch = integerTypeRegex.exec(abiParameterType);
			if (integerMatch) {
				if (typeof arg !== "bigint" && typeof arg !== "number") return false;
				if (typeof arg === "number" && !Number.isInteger(arg)) return false;
				const signed = abiParameterType.startsWith("int");
				const bits = Number.parseInt(integerMatch[1] ?? "256", 10);
				const max = 2n ** (BigInt(bits) - (signed ? 1n : 0n)) - 1n;
				return arg >= (signed ? -max - 1n : 0n) && arg <= max;
			}
			if (fixedBytesTypeRegex.test(abiParameterType)) {
				if (typeof arg !== "string" && !(arg instanceof Uint8Array)) return false;
				const bytes = abiParameterType.slice(5);
				if (!bytes) return arg instanceof Uint8Array || validate$3(arg);
				if (arg instanceof Uint8Array) return arg.length === Number.parseInt(bytes, 10);
				if (!validate$3(arg)) return false;
				return size$2(arg) === Number.parseInt(bytes, 10);
			}
			const arrayComponents = getArrayComponents(abiParameterType);
			if (arrayComponents) {
				const [length, type] = arrayComponents;
				return Array.isArray(arg) && (length === null || arg.length === length) && arg.every((x) => isArgOfType(x, {
					...abiParameter,
					type
				}));
			}
			return false;
		}
	}
}
/** @internal */
function getAmbiguousTypes(sourceParameters, targetParameters, args) {
	for (const parameterIndex in sourceParameters) {
		const sourceParameter = sourceParameters[parameterIndex];
		const targetParameter = targetParameters[parameterIndex];
		if (!targetParameter) continue;
		if (sourceParameter.type === "tuple" && targetParameter.type === "tuple" && "components" in sourceParameter && "components" in targetParameter) {
			const value = args[parameterIndex];
			const types = getAmbiguousTypes(sourceParameter.components, targetParameter.components, sourceParameter.components.map((component, index) => getComponentValue(value, component, index)));
			if (types) return types;
			continue;
		}
		const sourceArray = getArrayComponents(sourceParameter.type);
		const targetArray = getArrayComponents(targetParameter.type);
		if (sourceArray && targetArray) {
			const types = getAmbiguousTypes([{
				...sourceParameter,
				type: sourceArray[1]
			}], [{
				...targetParameter,
				type: targetArray[1]
			}], [args[parameterIndex]?.[0]]);
			if (types) return types;
			if (sourceArray[1] === targetArray[1] && sourceParameter.type !== targetParameter.type) return [sourceParameter.type, targetParameter.type];
			continue;
		}
		const types = [sourceParameter.type, targetParameter.type];
		const value = args[parameterIndex];
		if ((() => {
			if (types.includes("address") && (types.includes("string") || types.includes("bytes"))) return value === void 0 || validate$2(value, { strict: false });
			return sourceParameter.type !== targetParameter.type;
		})()) return types;
	}
}
function getComponentValue(arg, component, index) {
	if (Array.isArray(arg)) return arg[index];
	return arg?.[component.name];
}
//#endregion
//#region node_modules/ox/_esm/core/AbiItem.js
/**
* Parses an arbitrary **JSON ABI Item** or **Human Readable ABI Item** into a typed {@link ox#AbiItem.AbiItem}.
*
* @example
* ### JSON ABIs
*
* ```ts twoslash
* import { AbiItem } from 'ox'
*
* const abiItem = AbiItem.from({
*   type: 'function',
*   name: 'approve',
*   stateMutability: 'nonpayable',
*   inputs: [
*     {
*       name: 'spender',
*       type: 'address',
*     },
*     {
*       name: 'amount',
*       type: 'uint256',
*     },
*   ],
*   outputs: [{ type: 'bool' }],
* })
*
* abiItem
* //^?
*
*
*
*
*
*
*
*
*
*
*
*
* ```
*
* @example
* ### Human Readable ABIs
*
* A Human Readable ABI can be parsed into a typed ABI object:
*
* ```ts twoslash
* import { AbiItem } from 'ox'
*
* const abiItem = AbiItem.from(
*   'function approve(address spender, uint256 amount) returns (bool)' // [!code hl]
* )
*
* abiItem
* //^?
*
*
*
*
*
*
*
*
*
*
*
*
*
* ```
*
* @example
* It is possible to specify `struct`s along with your definitions:
*
* ```ts twoslash
* import { AbiItem } from 'ox'
*
* const abiItem = AbiItem.from([
*   'struct Foo { address spender; uint256 amount; }', // [!code hl]
*   'function approve(Foo foo) returns (bool)',
* ])
*
* abiItem
* //^?
*
*
*
*
*
*
*
*
*
*
*
*
* ```
*
*
*
* @param abiItem - The ABI Item to parse.
* @returns The typed ABI Item.
*/
function from$3(abiItem, options = {}) {
	const { prepare = true } = options;
	const item = (() => {
		if (Array.isArray(abiItem)) return parseAbiItem(abiItem);
		if (typeof abiItem === "string") return parseAbiItem(abiItem);
		return abiItem;
	})();
	return {
		...item,
		...prepare ? { hash: getSignatureHash(item) } : {}
	};
}
/**
* Extracts an {@link ox#AbiItem.AbiItem} from an {@link ox#Abi.Abi} given a name and optional arguments.
*
* @example
* ABI Items can be extracted by their name using the `name` option:
*
* ```ts twoslash
* import { Abi, AbiItem } from 'ox'
*
* const abi = Abi.from([
*   'function foo()',
*   'event Transfer(address owner, address to, uint256 tokenId)',
*   'function bar(string a) returns (uint256 x)',
* ])
*
* const item = AbiItem.fromAbi(abi, 'Transfer') // [!code focus]
* //    ^?
*
*
*
*
*
*
* ```
*
* @example
* ### Extracting by Selector
*
* ABI Items can be extract by their selector when {@link ox#Hex.Hex} is provided to `name`.
*
* ```ts twoslash
* import { Abi, AbiItem } from 'ox'
*
* const abi = Abi.from([
*   'function foo()',
*   'event Transfer(address owner, address to, uint256 tokenId)',
*   'function bar(string a) returns (uint256 x)',
* ])
* const item = AbiItem.fromAbi(abi, '0x095ea7b3') // [!code focus]
* //    ^?
*
*
*
*
*
*
*
*
*
*
*
*
*
* ```
*
* :::note
*
* Extracting via a hex selector is useful when extracting an ABI Item from an `eth_call` RPC response,
* a Transaction `input`, or from Event Log `topics`.
*
* :::
*
* @param abi - The ABI to extract from.
* @param name - The name (or selector) of the ABI item to extract.
* @param options - Extraction options.
* @returns The ABI item.
*/
function fromAbi$2(abi, name, options) {
	const { args = [], prepare = true } = options ?? {};
	const isSelector = validate$3(name, { strict: false });
	const abiItems = abi.filter((abiItem) => {
		if (isSelector) {
			if (abiItem.type === "function" || abiItem.type === "error") return getSelector$2(abiItem) === slice(name, 0, 4);
			if (abiItem.type === "event") return getSignatureHash(abiItem) === name;
			return false;
		}
		return "name" in abiItem && abiItem.name === name;
	});
	if (abiItems.length === 0) throw new NotFoundError({ name });
	if (abiItems.length === 1) return {
		...abiItems[0],
		...prepare ? { hash: getSignatureHash(abiItems[0]) } : {}
	};
	let matchedAbiItem;
	let zeroArgAbiItem;
	for (const abiItem of abiItems) {
		if (!("inputs" in abiItem)) continue;
		if (!args || args.length === 0) {
			if (!zeroArgAbiItem && (!abiItem.inputs || abiItem.inputs.length === 0)) zeroArgAbiItem = abiItem;
			continue;
		}
		if (!abiItem.inputs) continue;
		if (abiItem.inputs.length === 0) continue;
		if (abiItem.inputs.length !== args.length) continue;
		if (args.every((arg, index) => {
			const abiParameter = "inputs" in abiItem && abiItem.inputs[index];
			if (!abiParameter) return false;
			return isArgOfType(arg, abiParameter);
		})) {
			if (matchedAbiItem && "inputs" in matchedAbiItem && matchedAbiItem.inputs) {
				const ambiguousTypes = getAmbiguousTypes(abiItem.inputs, matchedAbiItem.inputs, args);
				if (ambiguousTypes) throw new AmbiguityError({
					abiItem,
					type: ambiguousTypes[0]
				}, {
					abiItem: matchedAbiItem,
					type: ambiguousTypes[1]
				});
			}
			matchedAbiItem = abiItem;
		}
	}
	const abiItem = (() => {
		if (matchedAbiItem) return matchedAbiItem;
		const chosen = zeroArgAbiItem ?? abiItems[0];
		const overloads = abiItems.filter((item) => item !== chosen);
		return {
			...chosen,
			overloads
		};
	})();
	if (!abiItem) throw new NotFoundError({ name });
	return {
		...abiItem,
		...prepare ? { hash: getSignatureHash(abiItem) } : {}
	};
}
function getSelector$2(...parameters) {
	return slice(getSignatureHash((() => {
		if (Array.isArray(parameters[0])) {
			const [abi, name] = parameters;
			return fromAbi$2(abi, name);
		}
		return parameters[0];
	})()), 0, 4);
}
function getSignature(...parameters) {
	const abiItem = (() => {
		if (Array.isArray(parameters[0])) {
			const [abi, name] = parameters;
			return fromAbi$2(abi, name);
		}
		return parameters[0];
	})();
	return normalizeSignature((() => {
		if (typeof abiItem === "string") return abiItem;
		return formatAbiItem(abiItem);
	})());
}
function getSignatureHash(...parameters) {
	const abiItem = (() => {
		if (Array.isArray(parameters[0])) {
			const [abi, name] = parameters;
			return fromAbi$2(abi, name);
		}
		return parameters[0];
	})();
	if (typeof abiItem !== "string" && "hash" in abiItem && abiItem.hash) return abiItem.hash;
	const signature = getSignature(abiItem);
	const cached = caches.signatureHash.get(signature);
	if (cached) return cached;
	const hash = keccak256(fromString$1(signature));
	caches.signatureHash.set(signature, hash);
	return hash;
}
/**
* Throws when ambiguous types are found on overloaded ABI items.
*
* @example
* ```ts twoslash
* import { Abi, AbiFunction } from 'ox'
*
* const foo = Abi.from(['function foo(address)', 'function foo(bytes20)'])
* AbiFunction.fromAbi(foo, 'foo', {
*   args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'],
* })
* // @error: AbiItem.AmbiguityError: Found ambiguous types in overloaded ABI Items.
* // @error: `bytes20` in `foo(bytes20)`, and
* // @error: `address` in `foo(address)`
* // @error: These types encode differently and cannot be distinguished at runtime.
* // @error: Remove one of the ambiguous items in the ABI.
* ```
*
* ### Solution
*
* Remove one of the ambiguous types from the ABI.
*
* ```ts twoslash
* import { Abi, AbiFunction } from 'ox'
*
* const foo = Abi.from([
*   'function foo(address)',
*   'function foo(bytes20)' // [!code --]
* ])
* AbiFunction.fromAbi(foo, 'foo', {
*   args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'],
* })
* // @error: AbiItem.AmbiguityError: Found ambiguous types in overloaded ABI Items.
* // @error: `bytes20` in `foo(bytes20)`, and
* // @error: `address` in `foo(address)`
* // @error: These types encode differently and cannot be distinguished at runtime.
* // @error: Remove one of the ambiguous items in the ABI.
* ```
*/
var AmbiguityError = class extends BaseError$1 {
	constructor(x, y) {
		super("Found ambiguous types in overloaded ABI Items.", { metaMessages: [
			`\`${x.type}\` in \`${normalizeSignature(formatAbiItem(x.abiItem))}\`, and`,
			`\`${y.type}\` in \`${normalizeSignature(formatAbiItem(y.abiItem))}\``,
			"",
			"These types encode differently and cannot be distinguished at runtime.",
			"Remove one of the ambiguous items in the ABI."
		] });
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "AbiItem.AmbiguityError"
		});
	}
};
/**
* Throws when an ABI item is not found in the ABI.
*
* @example
* ```ts twoslash
* // @noErrors
* import { Abi, AbiFunction } from 'ox'
*
* const foo = Abi.from([
*   'function foo(address)',
*   'function bar(uint)'
* ])
* AbiFunction.fromAbi(foo, 'baz')
* // @error: AbiItem.NotFoundError: ABI function with name "baz" not found.
* ```
*
* ### Solution
*
* Ensure the ABI item exists on the ABI.
*
* ```ts twoslash
* // @noErrors
* import { Abi, AbiFunction } from 'ox'
*
* const foo = Abi.from([
*   'function foo(address)',
*   'function bar(uint)',
*   'function baz(bool)' // [!code ++]
* ])
* AbiFunction.fromAbi(foo, 'baz')
* ```
*/
var NotFoundError = class extends BaseError$1 {
	constructor({ name, data, type = "item" }) {
		const selector = (() => {
			if (name) return ` with name "${name}"`;
			if (data) return ` with data "${data}"`;
			return "";
		})();
		super(`ABI ${type}${selector} not found.`);
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "AbiItem.NotFoundError"
		});
	}
};
//#endregion
//#region node_modules/ox/_esm/core/AbiConstructor.js
function encode(...parameters) {
	const [abiConstructor, options] = (() => {
		if (Array.isArray(parameters[0])) {
			const [abi, options] = parameters;
			return [fromAbi$1(abi), options];
		}
		return parameters;
	})();
	const { bytecode, args } = options;
	return concat(bytecode, abiConstructor.inputs?.length && args?.length ? encode$1(abiConstructor.inputs, args) : "0x");
}
/** @internal */
function from$2(abiConstructor) {
	return from$3(abiConstructor);
}
/** @internal */
function fromAbi$1(abi) {
	const item = abi.find((item) => item.type === "constructor");
	if (!item) throw new NotFoundError({ name: "constructor" });
	return item;
}
/**
* Parses an arbitrary **JSON ABI Event** or **Human Readable ABI Event** into a typed {@link ox#AbiEvent.AbiEvent}.
*
* @example
* ### JSON ABIs
*
* ```ts twoslash
* import { AbiEvent } from 'ox'
*
* const transfer = AbiEvent.from({
*   name: 'Transfer',
*   type: 'event',
*   inputs: [
*     { name: 'from', type: 'address', indexed: true },
*     { name: 'to', type: 'address', indexed: true },
*     { name: 'value', type: 'uint256' },
*   ],
* })
*
* transfer
* //^?
*
*
*
*
*
*
*
*
*
*
*
*
* ```
*
* @example
* ### Human Readable ABIs
*
* A Human Readable ABI can be parsed into a typed ABI object:
*
* ```ts twoslash
* import { AbiEvent } from 'ox'
*
* const transfer = AbiEvent.from(
*   'event Transfer(address indexed from, address indexed to, uint256 value)' // [!code hl]
* )
*
* transfer
* //^?
*
*
*
*
*
*
*
*
*
*
*
*
*
* ```
*
* @param abiEvent - The ABI Event to parse.
* @returns Typed ABI Event.
*/
function from$1(abiEvent, options = {}) {
	return from$3(abiEvent, options);
}
/**
* Computes the event selector (hash of event signature) for an {@link ox#AbiEvent.AbiEvent}.
*
* @example
* ```ts twoslash
* import { AbiEvent } from 'ox'
*
* const selector = AbiEvent.getSelector('event Transfer(address indexed from, address indexed to, uint256 value)')
* // @log: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f556a2'
* ```
*
* @example
* ```ts twoslash
* import { AbiEvent } from 'ox'
*
* const selector = AbiEvent.getSelector({
*   name: 'Transfer',
*   type: 'event',
*   inputs: [
*     { name: 'from', type: 'address', indexed: true },
*     { name: 'to', type: 'address', indexed: true },
*     { name: 'value', type: 'uint256' }
*   ]
* })
* // @log: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f556a2'
* ```
*
* @param abiItem - The ABI event to compute the selector for.
* @returns The {@link ox#Hash.(keccak256:function)} hash of the event signature.
*/
function getSelector$1(abiItem) {
	return getSignatureHash(abiItem);
}
//#endregion
//#region node_modules/ox/_esm/core/AbiFunction.js
function decodeResult(...parameters) {
	const [abiFunction, data, options = {}] = (() => {
		if (Array.isArray(parameters[0])) {
			const [abi, name, data, options] = parameters;
			return [
				fromAbi(abi, name),
				data,
				options
			];
		}
		return parameters;
	})();
	const values = decode(abiFunction.outputs, data, options);
	if (values && Object.keys(values).length === 0) return void 0;
	if (values && Object.keys(values).length === 1) {
		if (Array.isArray(values)) return values[0];
		return Object.values(values)[0];
	}
	return values;
}
function encodeData(...parameters) {
	const [abiFunction, args = []] = (() => {
		if (Array.isArray(parameters[0])) {
			const [abi, name, args] = parameters;
			return [fromAbi(abi, name, { args }), args];
		}
		const [abiFunction, args] = parameters;
		return [abiFunction, args];
	})();
	const { overloads } = abiFunction;
	const item = overloads ? fromAbi([abiFunction, ...overloads], abiFunction.name, { args }) : abiFunction;
	const selector = getSelector(item);
	const data = args.length > 0 ? encode$1(item.inputs, args) : void 0;
	return data ? concat(selector, data) : selector;
}
/**
* Parses an arbitrary **JSON ABI Function** or **Human Readable ABI Function** into a typed {@link ox#AbiFunction.AbiFunction}.
*
* @example
* ### JSON ABIs
*
* ```ts twoslash
* import { AbiFunction } from 'ox'
*
* const approve = AbiFunction.from({
*   type: 'function',
*   name: 'approve',
*   stateMutability: 'nonpayable',
*   inputs: [
*     {
*       name: 'spender',
*       type: 'address',
*     },
*     {
*       name: 'amount',
*       type: 'uint256',
*     },
*   ],
*   outputs: [{ type: 'bool' }],
* })
*
* approve
* //^?
*
*
*
*
*
*
*
*
*
*
*
*
* ```
*
* @example
* ### Human Readable ABIs
*
* A Human Readable ABI can be parsed into a typed ABI object:
*
* ```ts twoslash
* import { AbiFunction } from 'ox'
*
* const approve = AbiFunction.from(
*   'function approve(address spender, uint256 amount) returns (bool)' // [!code hl]
* )
*
* approve
* //^?
*
*
*
*
*
*
*
*
*
*
*
*
*
* ```
*
* @example
* It is possible to specify `struct`s along with your definitions:
*
* ```ts twoslash
* import { AbiFunction } from 'ox'
*
* const approve = AbiFunction.from([
*   'struct Foo { address spender; uint256 amount; }', // [!code hl]
*   'function approve(Foo foo) returns (bool)',
* ])
*
* approve
* //^?
*
*
*
*
*
*
*
*
*
*
*
*
* ```
*
*
*
* @param abiFunction - The ABI Function to parse.
* @returns Typed ABI Function.
*/
function from(abiFunction, options = {}) {
	return from$3(abiFunction, options);
}
/**
* Extracts an {@link ox#AbiFunction.AbiFunction} from an {@link ox#Abi.Abi} given a name and optional arguments.
*
* @example
* ### Extracting by Name
*
* ABI Functions can be extracted by their name using the `name` option:
*
* ```ts twoslash
* import { Abi, AbiFunction } from 'ox'
*
* const abi = Abi.from([
*   'function foo()',
*   'event Transfer(address owner, address to, uint256 tokenId)',
*   'function bar(string a) returns (uint256 x)',
* ])
*
* const item = AbiFunction.fromAbi(abi, 'foo') // [!code focus]
* //    ^?
*
*
*
*
*
*
* ```
*
* @example
* ### Extracting by Selector
*
* ABI Functions can be extract by their selector when {@link ox#Hex.Hex} is provided to `name`.
*
* ```ts twoslash
* import { Abi, AbiFunction } from 'ox'
*
* const abi = Abi.from([
*   'function foo()',
*   'event Transfer(address owner, address to, uint256 tokenId)',
*   'function bar(string a) returns (uint256 x)',
* ])
* const item = AbiFunction.fromAbi(abi, '0x095ea7b3') // [!code focus]
* //    ^?
*
*
*
*
*
*
*
*
*
* ```
*
* :::note
*
* Extracting via a hex selector is useful when extracting an ABI Function from an `eth_call` RPC response or
* from a Transaction `input`.
*
* :::
*
* @param abi - The ABI to extract from.
* @param name - The name (or selector) of the ABI item to extract.
* @param options - Extraction options.
* @returns The ABI item.
*/
function fromAbi(abi, name, options) {
	const item = fromAbi$2(abi, name, options);
	if (item.type !== "function") throw new NotFoundError({
		name,
		type: "function"
	});
	return item;
}
/**
* Computes the [4-byte selector](https://solidity-by-example.org/function-selector/) for an {@link ox#AbiFunction.AbiFunction}.
*
* Useful for computing function selectors for calldata.
*
* @example
* ```ts twoslash
* import { AbiFunction } from 'ox'
*
* const selector = AbiFunction.getSelector('function ownerOf(uint256 tokenId)')
* // @log: '0x6352211e'
* ```
*
* @example
* ```ts twoslash
* import { AbiFunction } from 'ox'
*
* const selector = AbiFunction.getSelector({
*   inputs: [{ type: 'uint256' }],
*   name: 'ownerOf',
*   outputs: [],
*   stateMutability: 'view',
*   type: 'function'
* })
* // @log: '0x6352211e'
* ```
*
* @param abiItem - The ABI item to compute the selector for.
* @returns The first 4 bytes of the {@link ox#Hash.(keccak256:function)} hash of the function signature.
*/
function getSelector(abiItem) {
	return getSelector$2(abiItem);
}
//#endregion
//#region node_modules/viem/_esm/constants/address.js
var ethAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
var zeroAddress = "0x0000000000000000000000000000000000000000";
//#endregion
//#region node_modules/viem/_esm/actions/public/simulateCalls.js
var getBalanceCode = "0x6080604052348015600e575f80fd5b5061016d8061001c5f395ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c8063f8b2cb4f1461002d575b5f80fd5b610047600480360381019061004291906100db565b61005d565b604051610054919061011e565b60405180910390f35b5f8173ffffffffffffffffffffffffffffffffffffffff16319050919050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6100aa82610081565b9050919050565b6100ba816100a0565b81146100c4575f80fd5b50565b5f813590506100d5816100b1565b92915050565b5f602082840312156100f0576100ef61007d565b5b5f6100fd848285016100c7565b91505092915050565b5f819050919050565b61011881610106565b82525050565b5f6020820190506101315f83018461010f565b9291505056fea26469706673582212203b9fe929fe995c7cf9887f0bdba8a36dd78e8b73f149b17d2d9ad7cd09d2dc6264736f6c634300081a0033";
var staticCallCode = "0x608060405234801561000f575f5ffd5b5060043610610029575f3560e01c8063fd00430c1461002d575b5f5ffd5b6100476004803603810190610042919061012b565b610049565b005b80825f375f5f825f865afa610060573d5f5f3e3d5ffd5b3d5f5f3e3d5ff35b5f5ffd5b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f61009982610070565b9050919050565b6100a98161008f565b81146100b3575f5ffd5b50565b5f813590506100c4816100a0565b92915050565b5f5ffd5b5f5ffd5b5f5ffd5b5f5f83601f8401126100eb576100ea6100ca565b5b8235905067ffffffffffffffff811115610108576101076100ce565b5b602083019150836001820283011115610124576101236100d2565b5b9250929050565b5f5f5f6040848603121561014257610141610068565b5b5f61014f868287016100b6565b935050602084013567ffffffffffffffff8111156101705761016f61006c565b5b61017c868287016100d6565b9250925050925092509256fea2646970667358221220635ed99185cacf3f2acba6921f23687c969cec2bbaf5f9ad599f507e6e105e6964736f6c63430008230033";
var assetProbeGas = 1000000n;
var staticCallAddressBase = 3735928559n;
var transferEventSelector = getSelector$1(from$1("event Transfer(address indexed from, address indexed to, uint256 value)"));
var balanceOfFunction = from("function balanceOf(address) returns (uint256)");
var decimalsFunction = from("function decimals() returns (uint256)");
var tokenUriFunction = from("function tokenURI(uint256) returns (string)");
var symbolFunction = from("function symbol() returns (string)");
var staticCallFunction = from("function query(address target, bytes data)");
/**
* Simulates execution of a batch of calls.
*
* @param client - Client to use
* @param parameters - {@link SimulateCallsParameters}
* @returns Results. {@link SimulateCallsReturnType}
*
* @example
* ```ts
* import { createPublicClient, http, parseEther } from 'viem'
* import { mainnet } from 'viem/chains'
* import { simulateCalls } from 'viem/actions'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
*
* const result = await simulateCalls(client, {
*   account: '0x5a0b54d5dc17e482fe8b0bdca5320161b95fb929',
*   calls: [{
*     {
*       data: '0xdeadbeef',
*       to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
*     },
*     {
*       to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
*       value: parseEther('1'),
*     },
*   ]
* })
* ```
*/
async function simulateCalls(client, parameters) {
	const { blockNumber, blockTag, calls, stateOverrides, traceAssetChanges, traceTransfers, validation } = parameters;
	const account = parameters.account ? parseAccount(parameters.account) : void 0;
	if (traceAssetChanges && !account) throw new BaseError$3("`account` is required when `traceAssetChanges` is true");
	const getBalanceData = account ? encode(from$2("constructor(bytes, bytes)"), {
		bytecode: deploylessCallViaBytecodeBytecode,
		args: [getBalanceCode, encodeData(from("function getBalance(address)"), [account.address])]
	}) : void 0;
	const blockTag_ = blockTag ?? client.experimental_blockTag ?? "latest";
	let baseBlockNumber = blockNumber;
	if (traceAssetChanges && typeof baseBlockNumber !== "bigint" && blockTag_ !== "earliest" && blockTag_ !== "pending") {
		if (blockTag_ === "latest") baseBlockNumber = await getBlockNumber(client, { cacheTime: 0 });
		else {
			const block = await getBlock(client, { blockTag: blockTag_ });
			if (typeof block.number !== "bigint") throw new BaseError$3(`Block tag \`${blockTag_}\` did not resolve to a number.`);
			baseBlockNumber = block.number;
		}
	}
	const block_ = typeof baseBlockNumber === "bigint" ? { blockNumber: baseBlockNumber } : { blockTag: blockTag_ };
	const discovery = traceAssetChanges ? await simulateBlocks(client, {
		...block_,
		blocks: [{
			calls: calls.map((call) => ({
				...call,
				from: account.address
			})),
			stateOverrides
		}],
		traceTransfers,
		validation
	}) : void 0;
	const assetAddresses = discovery ? [.../* @__PURE__ */ new Set([...tokensFromLogs(discovery[0].calls.flatMap((call) => call.logs ?? []), account.address), ...parameters.calls.map((call) => call.to?.toLowerCase())])].filter((address) => Boolean(address) && address !== "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" && address !== "0x0000000000000000000000000000000000000000") : [];
	const staticCallAddress = getStaticCallAddress([
		...account ? [account.address] : [],
		...assetAddresses,
		...stateOverrides?.map(({ address }) => address) ?? []
	]);
	const staticCallStateOverrides = [{
		address: staticCallAddress,
		code: staticCallCode
	}];
	const [balanceCallsPre, blocks] = await Promise.all([traceAssetChanges ? Promise.all([readBalance(client, {
		account: account.address,
		...block_,
		data: getBalanceData,
		stateOverride: stateOverrides
	}), ...assetAddresses.map((address) => readBalance(client, {
		account: account.address,
		address,
		...block_,
		data: encodeData(balanceOfFunction, [account.address]),
		staticCallAddress,
		stateOverride: stateOverrides
	}))]) : [], simulateBlocks(client, {
		...block_,
		blocks: [{
			calls: [...calls, { to: zeroAddress }].map((call) => ({
				...call,
				from: account?.address
			})),
			stateOverrides
		}, ...traceAssetChanges ? [
			{ calls: [{ data: getBalanceData }] },
			{
				calls: assetAddresses.map((address) => ({
					to: staticCallAddress,
					gas: assetProbeGas,
					data: encodeStaticCall(address, encodeData(balanceOfFunction, [account.address]))
				})),
				stateOverrides: staticCallStateOverrides
			},
			{
				calls: assetAddresses.map((address) => ({
					to: staticCallAddress,
					gas: assetProbeGas,
					data: encodeStaticCall(address, encodeData(decimalsFunction))
				})),
				stateOverrides: staticCallStateOverrides
			},
			{
				calls: assetAddresses.map((address) => ({
					to: staticCallAddress,
					gas: assetProbeGas,
					data: encodeStaticCall(address, encodeData(tokenUriFunction, [0n]))
				})),
				stateOverrides: staticCallStateOverrides
			},
			{
				calls: assetAddresses.map((address) => ({
					to: staticCallAddress,
					gas: assetProbeGas,
					data: encodeStaticCall(address, encodeData(symbolFunction))
				})),
				stateOverrides: staticCallStateOverrides
			}
		] : []],
		traceTransfers,
		validation
	})]);
	const block_results = blocks[0];
	const [block_ethPost, block_assetsPost, block_decimals, block_tokenURI, block_symbols] = traceAssetChanges ? blocks.slice(1) : [];
	const { calls: block_calls, ...block } = block_results;
	const results = block_calls.slice(0, -1);
	const balancesPre = balanceCallsPre.map((call) => isBalance(call) ? hexToBigInt(call.data) : null);
	const ethPost = block_ethPost?.calls ?? [];
	const assetsPost = block_assetsPost?.calls ?? [];
	const balancesPost = [...ethPost, ...assetsPost].map((call) => isBalance(call) ? hexToBigInt(call.data) : null);
	const decimals = (block_decimals?.calls ?? []).map((call) => decodeAssetResult(call, decimalsFunction));
	const symbols = (block_symbols?.calls ?? []).map((call) => decodeAssetResult(call, symbolFunction));
	const tokenURI = (block_tokenURI?.calls ?? []).map((call) => decodeAssetResult(call, tokenUriFunction));
	const changes = [];
	for (const [i, balancePost] of balancesPost.entries()) {
		const balancePre_ = balancesPre[i];
		const preCall = balanceCallsPre[i];
		const balancePre = typeof balancePre_ === "bigint" ? balancePre_ : i > 0 && preCall?.status === "success" && preCall.data === "0x" ? 0n : null;
		if (typeof balancePost !== "bigint") continue;
		if (typeof balancePre !== "bigint") continue;
		const decimals_ = decimals[i - 1];
		const symbol_ = symbols[i - 1];
		const tokenURI_ = tokenURI[i - 1];
		const token = (() => {
			if (i === 0) return {
				address: ethAddress,
				decimals: 18,
				symbol: "ETH"
			};
			return {
				address: assetAddresses[i - 1],
				decimals: tokenURI_ || decimals_ ? Number(decimals_ ?? 1) : void 0,
				symbol: symbol_ ?? void 0
			};
		})();
		changes.push({
			token,
			value: {
				pre: balancePre,
				post: balancePost,
				diff: balancePost - balancePre
			}
		});
	}
	return {
		assetChanges: changes,
		block,
		results
	};
}
function encodeStaticCall(address, data) {
	return encodeData(staticCallFunction, [address, data]);
}
function tokensFromLogs(logs, account) {
	const account_ = pad$2(account.toLowerCase(), { size: 32 });
	return logs.filter((log) => {
		if (log.topics[0]?.toLowerCase() !== transferEventSelector) return false;
		if (log.address.toLowerCase() === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") return false;
		return log.topics[1]?.toLowerCase() === account_ || log.topics[2]?.toLowerCase() === account_;
	}).map((log) => log.address.toLowerCase());
}
function isBalance(call) {
	return call.status === "success" && /^0x[\da-f]{64}$/i.test(call.data);
}
function decodeAssetResult(call, abiFunction) {
	if (call.status === "failure" || call.data === "0x") return null;
	try {
		return decodeResult(abiFunction, call.data);
	} catch {
		return null;
	}
}
async function readBalance(client, parameters) {
	const { account, address, blockNumber, blockTag, data, staticCallAddress, stateOverride } = parameters;
	try {
		return {
			data: (await call({
				...client,
				ccipRead: false
			}, {
				account: address ? "0x0000000000000000000000000000000000000000" : account,
				data: address ? encodeStaticCall(address, data) : data,
				stateOverride: address && staticCallAddress ? [...stateOverride ?? [], {
					address: staticCallAddress,
					code: staticCallCode
				}] : stateOverride,
				...address ? {
					gas: assetProbeGas,
					to: staticCallAddress
				} : {},
				...typeof blockNumber === "bigint" ? { blockNumber } : { blockTag }
			})).data ?? "0x",
			status: "success"
		};
	} catch (error) {
		if (!(error instanceof CallExecutionError) || !(error.cause instanceof ExecutionRevertedError)) throw error;
		return {
			data: "0x",
			status: "failure"
		};
	}
}
function getStaticCallAddress(addresses) {
	const occupied = new Set(addresses.map((address) => address.toLowerCase()));
	let value = staticCallAddressBase;
	while (occupied.has(`0x${value.toString(16).padStart(40, "0")}`)) value++;
	return `0x${value.toString(16).padStart(40, "0")}`;
}
//#endregion
//#region node_modules/viem/_esm/actions/public/simulateContract.js
/**
* Simulates/validates a contract interaction. This is useful for retrieving **return data** and **revert reasons** of contract write functions.
*
* - Docs: https://viem.sh/docs/contract/simulateContract
* - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts_writing-to-contracts
*
* This function does not require gas to execute and _**does not**_ change the state of the blockchain. It is almost identical to [`readContract`](https://viem.sh/docs/contract/readContract), but also supports contract write functions.
*
* Internally, uses a [Public Client](https://viem.sh/docs/clients/public) to call the [`call` action](https://viem.sh/docs/actions/public/call) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData).
*
* @param client - Client to use
* @param parameters - {@link SimulateContractParameters}
* @returns The simulation result and write request. {@link SimulateContractReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { simulateContract } from 'viem/contract'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const result = await simulateContract(client, {
*   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
*   abi: parseAbi(['function mint(uint32) view returns (uint32)']),
*   functionName: 'mint',
*   args: ['69420'],
*   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
* })
*/
async function simulateContract(client, parameters) {
	const { abi, address, args, functionName, dataSuffix = typeof client.dataSuffix === "string" ? client.dataSuffix : client.dataSuffix?.value, ...callRequest } = parameters;
	const account = callRequest.account === void 0 ? client.account : callRequest.account && parseAccount(callRequest.account);
	const calldata = encodeFunctionData({
		abi,
		args,
		functionName
	});
	try {
		const { data } = await getAction(client, call, "call")({
			batch: false,
			data: dataSuffix ? concat$1([calldata, dataSuffix.length % 2 ? `0x0${dataSuffix.slice(2)}` : dataSuffix]) : calldata,
			to: address,
			...callRequest,
			account
		});
		return {
			result: decodeFunctionResult({
				abi,
				args,
				functionName,
				data: data || "0x"
			}),
			request: {
				abi: abi.filter((abiItem) => "name" in abiItem && abiItem.name === parameters.functionName),
				address,
				args,
				dataSuffix,
				functionName,
				...callRequest,
				account
			}
		};
	} catch (error) {
		throw getContractError(error, {
			abi,
			address,
			args,
			docsPath: "/docs/contract/simulateContract",
			functionName,
			sender: account?.address
		});
	}
}
//#endregion
//#region node_modules/viem/_esm/actions/public/uninstallFilter.js
/**
* Destroys a [`Filter`](https://viem.sh/docs/glossary/types#filter).
*
* - Docs: https://viem.sh/docs/actions/public/uninstallFilter
* - JSON-RPC Methods: [`eth_uninstallFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_uninstallFilter)
*
* Destroys a Filter that was created from one of the following Actions:
* - [`createBlockFilter`](https://viem.sh/docs/actions/public/createBlockFilter)
* - [`createEventFilter`](https://viem.sh/docs/actions/public/createEventFilter)
* - [`createPendingTransactionFilter`](https://viem.sh/docs/actions/public/createPendingTransactionFilter)
*
* @param client - Client to use
* @param parameters - {@link UninstallFilterParameters}
* @returns A boolean indicating if the Filter was successfully uninstalled. {@link UninstallFilterReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { createPendingTransactionFilter, uninstallFilter } from 'viem/public'
*
* const filter = await createPendingTransactionFilter(client)
* const uninstalled = await uninstallFilter(client, { filter })
* // true
*/
async function uninstallFilter(_client, { filter }) {
	return filter.request({
		method: "eth_uninstallFilter",
		params: [filter.id]
	});
}
//#endregion
//#region node_modules/ox/_esm/erc6492/SignatureErc6492.js
/**
* Magic bytes used to identify ERC-6492 wrapped signatures.
*/
var magicBytes = "0x6492649264926492649264926492649264926492649264926492649264926492";
/**
* Asserts that the wrapped signature is valid.
*
* @example
* ```ts twoslash
* import { SignatureErc6492 } from 'ox/erc6492'
*
* SignatureErc6492.assert('0xdeadbeef')
* // @error: InvalidWrappedSignatureError: Value `0xdeadbeef` is an invalid ERC-6492 wrapped signature.
* ```
*
* @param wrapped - The wrapped signature to assert.
*/
function assert(wrapped) {
	if (slice(wrapped, -32) !== "0x6492649264926492649264926492649264926492649264926492649264926492") throw new InvalidWrappedSignatureError(wrapped);
}
/**
* Serializes an [ERC-6492 wrapped signature](https://eips.ethereum.org/EIPS/eip-6492#specification).
*
* @example
* ```ts twoslash
* import { Secp256k1, Signature } from 'ox'
* import { SignatureErc6492 } from 'ox/erc6492' // [!code focus]
*
* const signature = Secp256k1.sign({
*   payload: '0x...',
*   privateKey: '0x...',
* })
*
* const wrapped = SignatureErc6492.wrap({ // [!code focus]
*   data: '0xdeadbeef', // [!code focus]
*   signature: Signature.toHex(signature), // [!code focus]
*   to: '0x00000000219ab540356cBB839Cbe05303d7705Fa', // [!code focus]
* }) // [!code focus]
* ```
*
* @param value - Wrapped signature to serialize.
* @returns Serialized wrapped signature.
*/
function wrap(value) {
	const { data, signature, to } = value;
	return concat(encode$1(from$5("address, bytes, bytes"), [
		to,
		data,
		signature
	]), magicBytes);
}
/**
* Validates a wrapped signature. Returns `true` if the wrapped signature is valid, `false` otherwise.
*
* @example
* ```ts twoslash
* import { SignatureErc6492 } from 'ox/erc6492'
*
* const valid = SignatureErc6492.validate('0xdeadbeef')
* // @log: false
* ```
*
* @param wrapped - The wrapped signature to validate.
* @returns `true` if the wrapped signature is valid, `false` otherwise.
*/
function validate(wrapped) {
	try {
		assert(wrapped);
		return true;
	} catch {
		return false;
	}
}
/** Thrown when the ERC-6492 wrapped signature is invalid. */
var InvalidWrappedSignatureError = class extends BaseError$1 {
	constructor(wrapped) {
		super(`Value \`${wrapped}\` is an invalid ERC-6492 wrapped signature.`);
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "SignatureErc6492.InvalidWrappedSignatureError"
		});
	}
};
//#endregion
//#region node_modules/viem/_esm/utils/signature/serializeSignature.js
/**
* @description Converts a signature into hex format.
*
* @param signature The signature to convert.
* @returns The signature in hex format.
*
* @example
* serializeSignature({
*   r: '0x6e100a352ec6ad1b70802290e18aeed190704973570f3b8ed42cb9808e2ea6bf',
*   s: '0x4a90a229a244495b41890987806fcbd2d5d23fc0dbe5f5256c2613c039d76db8',
*   yParity: 1
* })
* // "0x6e100a352ec6ad1b70802290e18aeed190704973570f3b8ed42cb9808e2ea6bf4a90a229a244495b41890987806fcbd2d5d23fc0dbe5f5256c2613c039d76db81c"
*/
function serializeSignature({ r, s, to = "hex", v, yParity }) {
	const yParity_ = (() => {
		if (yParity === 0 || yParity === 1) return yParity;
		if (v && (v === 27n || v === 28n || v >= 35n)) return v % 2n === 0n ? 1 : 0;
		throw new Error("Invalid `v` or `yParity` value");
	})();
	const signature = `0x${new secp256k1.Signature(hexToBigInt(r), hexToBigInt(s)).toCompactHex()}${yParity_ === 0 ? "1b" : "1c"}`;
	if (to === "hex") return signature;
	return hexToBytes(signature);
}
//#endregion
//#region node_modules/viem/_esm/actions/public/verifyHash.js
/**
* Verifies a message hash onchain using ERC-6492.
*
* @param client - Client to use.
* @param parameters - {@link VerifyHashParameters}
* @returns Whether or not the signature is valid. {@link VerifyHashReturnType}
*/
async function verifyHash(client, parameters) {
	const { address, chain = client.chain, hash, erc6492VerifierAddress: verifierAddress = parameters.universalSignatureVerifierAddress ?? (() => {
		const { blockNumber } = parameters;
		const verifier = chain?.contracts?.erc6492Verifier;
		if (blockNumber !== void 0 && verifier?.blockCreated && verifier.blockCreated > blockNumber) return void 0;
		return verifier?.address;
	})(), multicallAddress = parameters.multicallAddress ?? chain?.contracts?.multicall3?.address, mode = "auto" } = parameters;
	if (address === "0x0000000000000000000000000000000000000000") return false;
	if (chain?.verifyHash) return await chain.verifyHash(client, parameters);
	const signature = (() => {
		const signature = parameters.signature;
		if (isHex(signature)) return signature;
		if (typeof signature === "object" && "r" in signature && "s" in signature) return serializeSignature(signature);
		return bytesToHex(signature);
	})();
	try {
		if (mode === "eoa") try {
			if (isAddressEqual(getAddress(address), await recoverAddress({
				hash,
				signature
			}))) return true;
		} catch {}
		if (validate$1(signature)) return await verifyErc8010(client, {
			...parameters,
			multicallAddress,
			signature
		});
		return await verifyErc6492(client, {
			...parameters,
			verifierAddress,
			signature
		});
	} catch (error) {
		if (mode !== "eoa") try {
			if (isAddressEqual(getAddress(address), await recoverAddress({
				hash,
				signature
			}))) return true;
		} catch {}
		if (error instanceof VerificationError) return false;
		throw error;
	}
}
/** @internal */
async function verifyErc8010(client, parameters) {
	const { address, blockHash, blockNumber, blockTag, hash, multicallAddress, requireCanonical } = parameters;
	const { authorization: authorization_ox, data: initData, signature, to } = unwrap(parameters.signature);
	if (await getCode(client, {
		address,
		blockHash,
		blockNumber,
		blockTag,
		requireCanonical
	}) === concatHex(["0xef0100", authorization_ox.address])) return await verifyErc1271(client, {
		...parameters,
		signature
	});
	const authorization = {
		address: authorization_ox.address,
		chainId: Number(authorization_ox.chainId),
		nonce: Number(authorization_ox.nonce),
		r: numberToHex(authorization_ox.r, { size: 32 }),
		s: numberToHex(authorization_ox.s, { size: 32 }),
		yParity: authorization_ox.yParity
	};
	if (!await verifyAuthorization({
		address,
		authorization
	})) throw new VerificationError();
	const { data: aggregate3Data } = await call({
		...client,
		ccipRead: false
	}, {
		...multicallAddress ? { to: multicallAddress } : { code: multicall3Bytecode },
		authorizationList: [authorization],
		blockHash,
		blockNumber,
		blockTag: blockTag ?? "pending",
		data: encodeFunctionData({
			abi: multicall3Abi,
			functionName: "aggregate3",
			args: [[...initData ? [{
				allowFailure: true,
				target: to ?? address,
				callData: initData
			}] : [], {
				allowFailure: true,
				target: address,
				callData: encodeFunctionData({
					abi: erc1271Abi,
					functionName: "isValidSignature",
					args: [hash, signature]
				})
			}]]
		}),
		requireCanonical
	});
	const results = decodeFunctionResult({
		abi: multicall3Abi,
		functionName: "aggregate3",
		data: aggregate3Data ?? "0x"
	});
	const result = results[results.length - 1];
	if (result?.success && result.returnData.startsWith("0x1626ba7e")) return true;
	throw new VerificationError();
}
/** @internal */
async function verifyErc6492(client, parameters) {
	const { address, factory, factoryData, hash, signature, verifierAddress, ...rest } = parameters;
	const wrappedSignature = await (async () => {
		if (!factory && !factoryData) return signature;
		if (validate(signature)) return signature;
		return wrap({
			data: factoryData,
			signature,
			to: factory
		});
	})();
	const args = verifierAddress ? {
		batch: false,
		to: verifierAddress,
		data: encodeFunctionData({
			abi: erc6492SignatureValidatorAbi,
			functionName: "isValidSig",
			args: [
				address,
				hash,
				wrappedSignature
			]
		}),
		...rest
	} : {
		data: encodeDeployData({
			abi: erc6492SignatureValidatorAbi,
			args: [
				address,
				hash,
				wrappedSignature
			],
			bytecode: erc6492SignatureValidatorByteCode
		}),
		...rest
	};
	const { data } = await call({
		...client,
		ccipRead: false
	}, args).catch((error) => {
		if (error instanceof CallExecutionError) throw new VerificationError();
		throw error;
	});
	if (hexToBool(data ?? "0x0")) return true;
	throw new VerificationError();
}
/** @internal */
async function verifyErc1271(client, parameters) {
	const { address, blockHash, blockNumber, blockTag, hash, requireCanonical, signature } = parameters;
	const { data } = await call({
		...client,
		ccipRead: false
	}, {
		batch: false,
		blockHash,
		blockNumber,
		blockTag,
		data: encodeFunctionData({
			abi: erc1271Abi,
			functionName: "isValidSignature",
			args: [hash, signature]
		}),
		requireCanonical,
		to: address
	}).catch((error) => {
		if (error instanceof CallExecutionError) throw new VerificationError();
		throw error;
	});
	if ((() => {
		try {
			return decodeFunctionResult({
				abi: erc1271Abi,
				functionName: "isValidSignature",
				data: data ?? "0x"
			});
		} catch {
			throw new VerificationError();
		}
	})().startsWith("0x1626ba7e")) return true;
	throw new VerificationError();
}
var VerificationError = class extends Error {};
//#endregion
//#region node_modules/viem/_esm/actions/public/verifyMessage.js
/**
* Verify that a message was signed by the provided address.
*
* Compatible with Smart Contract Accounts & Externally Owned Accounts via [ERC-6492](https://eips.ethereum.org/EIPS/eip-6492).
*
* - Docs {@link https://viem.sh/docs/actions/public/verifyMessage}
*
* @param client - Client to use.
* @param parameters - {@link VerifyMessageParameters}
* @returns Whether or not the signature is valid. {@link VerifyMessageReturnType}
*/
async function verifyMessage(client, { address, message, factory, factoryData, signature, ...callRequest }) {
	const hash = hashMessage(message);
	return getAction(client, verifyHash, "verifyHash")({
		address,
		factory,
		factoryData,
		hash,
		signature,
		...callRequest
	});
}
//#endregion
//#region node_modules/viem/_esm/actions/public/verifyTypedData.js
/**
* Verify that typed data was signed by the provided address.
*
* - Docs {@link https://viem.sh/docs/actions/public/verifyTypedData}
*
* @param client - Client to use.
* @param parameters - {@link VerifyTypedDataParameters}
* @returns Whether or not the signature is valid. {@link VerifyTypedDataReturnType}
*/
async function verifyTypedData(client, parameters) {
	const { address, factory, factoryData, signature, message, primaryType, types, domain, ...callRequest } = parameters;
	const hash = hashTypedData({
		message,
		primaryType,
		types,
		domain
	});
	return getAction(client, verifyHash, "verifyHash")({
		address,
		factory,
		factoryData,
		hash,
		signature,
		...callRequest
	});
}
//#endregion
//#region node_modules/viem/_esm/utils/observe.js
/** @internal */
var listenersCache = /*#__PURE__*/ new Map();
/** @internal */
var cleanupCache = /*#__PURE__*/ new Map();
var callbackCount = 0;
/**
* @description Sets up an observer for a given function. If another function
* is set up under the same observer id, the function will only be called once
* for both instances of the observer.
*/
function observe(observerId, callbacks, fn) {
	const callbackId = ++callbackCount;
	const getListeners = () => listenersCache.get(observerId) || [];
	const unsubscribe = () => {
		const nextListeners = getListeners().filter((cb) => cb.id !== callbackId);
		if (nextListeners.length === 0) {
			listenersCache.delete(observerId);
			cleanupCache.delete(observerId);
			return;
		}
		listenersCache.set(observerId, nextListeners);
	};
	const unwatch = () => {
		const listeners = getListeners();
		if (!listeners.some((cb) => cb.id === callbackId)) return;
		const cleanup = cleanupCache.get(observerId);
		if (listeners.length === 1 && cleanup) {
			const p = cleanup();
			if (p instanceof Promise) p.catch(() => {});
		}
		unsubscribe();
	};
	const listeners = getListeners();
	listenersCache.set(observerId, [...listeners, {
		id: callbackId,
		fns: callbacks
	}]);
	if (listeners && listeners.length > 0) return unwatch;
	const emit = {};
	for (const key in callbacks) emit[key] = ((...args) => {
		const listeners = getListeners();
		if (listeners.length === 0) return;
		for (const listener of listeners) listener.fns[key]?.(...args);
	});
	const cleanup = fn(emit);
	if (typeof cleanup === "function") cleanupCache.set(observerId, cleanup);
	return unwatch;
}
//#endregion
//#region node_modules/viem/_esm/utils/uid.js
var size$1 = 256;
var index$1 = size$1;
var buffer$1;
function uid$1(length = 11) {
	if (!buffer$1 || index$1 + length > size$1 * 2) {
		buffer$1 = "";
		index$1 = 0;
		for (let i = 0; i < size$1; i++) buffer$1 += (256 + Math.random() * 256 | 0).toString(16).substring(1);
	}
	return buffer$1.substring(index$1, index$1++ + length);
}
//#endregion
//#region node_modules/viem/_esm/utils/poll.js
/**
* @description Polls a function at a specified interval.
*/
function poll(fn, { emitOnBegin, initialWaitTime, interval }) {
	let active = true;
	const unwatch = () => active = false;
	const watch = async () => {
		let data;
		if (emitOnBegin) data = await fn({ unpoll: unwatch });
		await wait(await initialWaitTime?.(data) ?? interval);
		const poll = async () => {
			if (!active) return;
			await fn({ unpoll: unwatch });
			await wait(interval);
			poll();
		};
		poll();
	};
	watch();
	return unwatch;
}
//#endregion
//#region node_modules/viem/_esm/actions/public/internal/watchTransport.js
/** Selects the first direct socket member of a fallback transport. */
function getSubscriptionTransport(client) {
	if (client.transport.type === "fallback") {
		const transport = client.transport.transports.find((transport) => transport.config.type === "webSocket" || transport.config.type === "ipc");
		if (!transport) return client.transport;
		return transport.value;
	}
	return client.transport;
}
/** Defaults to subscriptions only when the first transport supports them. */
function shouldPoll(client) {
	if (client.transport.type === "webSocket" || client.transport.type === "ipc") return false;
	if (client.transport.type === "fallback" && (client.transport.transports[0].config.type === "webSocket" || client.transport.transports[0].config.type === "ipc")) return false;
	return true;
}
//#endregion
//#region node_modules/viem/_esm/actions/public/watchBlockNumber.js
/**
* Watches and returns incoming block numbers.
*
* - Docs: https://viem.sh/docs/actions/public/watchBlockNumber
* - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks_watching-blocks
* - JSON-RPC Methods:
*   - When `poll: true`, calls [`eth_blockNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_blocknumber) on a polling interval.
*   - When `poll: false` & WebSocket Transport, uses a WebSocket subscription via [`eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe-polygon) and the `"newHeads"` event.
*
* @param client - Client to use
* @param parameters - {@link WatchBlockNumberParameters}
* @returns A function that can be invoked to stop watching for new block numbers. {@link WatchBlockNumberReturnType}
*
* @example
* import { createPublicClient, watchBlockNumber, http } from 'viem'
* import { mainnet } from 'viem/chains'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const unwatch = watchBlockNumber(client, {
*   onBlockNumber: (blockNumber) => console.log(blockNumber),
* })
*/
function watchBlockNumber(client, { emitOnBegin = false, emitMissed: emitMissed_, onBlockNumber, onError, poll: poll_, pollingInterval = client.pollingInterval }) {
	const enablePolling = (() => {
		if (typeof poll_ !== "undefined") return poll_;
		return shouldPoll(client);
	})();
	const blockTime = client.chain?.blockTime;
	const emitMissed = emitMissed_ ?? (blockTime !== void 0 && pollingInterval > blockTime / 2);
	let prevBlockNumber;
	const pollBlockNumber = () => {
		return observe(stringify$1([
			"watchBlockNumber",
			client.uid,
			emitOnBegin,
			emitMissed,
			pollingInterval
		]), {
			onBlockNumber,
			onError
		}, (emit) => poll(async () => {
			try {
				const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({ cacheTime: 0 });
				if (prevBlockNumber !== void 0) {
					if (blockNumber === prevBlockNumber) return;
					if (blockNumber - prevBlockNumber > 1 && emitMissed) for (let i = prevBlockNumber + 1n; i < blockNumber; i++) {
						emit.onBlockNumber(i, prevBlockNumber);
						prevBlockNumber = i;
					}
				}
				if (prevBlockNumber === void 0 || blockNumber > prevBlockNumber) {
					emit.onBlockNumber(blockNumber, prevBlockNumber);
					prevBlockNumber = blockNumber;
				}
			} catch (err) {
				emit.onError?.(err);
			}
		}, {
			emitOnBegin,
			interval: pollingInterval
		}));
	};
	const subscribeBlockNumber = () => {
		return observe(stringify$1([
			"watchBlockNumber",
			client.uid,
			emitOnBegin,
			emitMissed
		]), {
			onBlockNumber,
			onError
		}, (emit) => {
			let active = true;
			let unsubscribe = () => active = false;
			(async () => {
				try {
					const { unsubscribe: unsubscribe_ } = await getSubscriptionTransport(client).subscribe({
						params: ["newHeads"],
						onData(data) {
							if (!active) return;
							const blockNumber = hexToBigInt(data.result?.number);
							emit.onBlockNumber(blockNumber, prevBlockNumber);
							prevBlockNumber = blockNumber;
						},
						onError(error) {
							emit.onError?.(error);
						}
					});
					unsubscribe = unsubscribe_;
					if (!active) unsubscribe();
				} catch (err) {
					onError?.(err);
				}
			})();
			return () => unsubscribe();
		});
	};
	return enablePolling ? pollBlockNumber() : subscribeBlockNumber();
}
//#endregion
//#region node_modules/viem/_esm/actions/public/waitForTransactionReceipt.js
/**
* Stops the block polling of each shared observer. Only the caller that
* started the polling holds its `unwatch`, so the last caller to leave reads
* it from here.
*/
var unwatchers = /*#__PURE__*/ new Map();
/**
* Waits for the [Transaction](https://viem.sh/docs/glossary/terms#transaction) to be included on a [Block](https://viem.sh/docs/glossary/terms#block) (one confirmation), and then returns the [Transaction Receipt](https://viem.sh/docs/glossary/terms#transaction-receipt).
*
* - Docs: https://viem.sh/docs/actions/public/waitForTransactionReceipt
* - Example: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_sending-transactions
* - JSON-RPC Methods:
*   - Polls [`eth_getTransactionReceipt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionReceipt) on each block until it has been processed.
*   - If a Transaction has been replaced:
*     - Calls [`eth_getBlockByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbynumber) and extracts the transactions
*     - Checks if one of the Transactions is a replacement
*     - If so, calls [`eth_getTransactionReceipt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionReceipt).
*   - If the Transaction is not found and `replacement` is provided:
*     - Calls `eth_getTransactionBySenderAndNonce` to find the Transaction in its nonce slot
*     - If it is a replacement, calls [`eth_getTransactionReceipt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionReceipt).
*
* The `waitForTransactionReceipt` action additionally supports Replacement detection (e.g. sped up Transactions).
*
* Transactions can be replaced when a user modifies their transaction in their wallet (to speed up or cancel). Transactions are replaced when they are sent from the same nonce.
*
* There are 3 types of Transaction Replacement reasons:
*
* - `repriced`: The gas price has been modified (e.g. different `maxFeePerGas`)
* - `cancelled`: The Transaction has been cancelled (e.g. `value === 0n`)
* - `replaced`: The Transaction has been replaced (e.g. different `value` or `data`)
*
* @param client - Client to use
* @param parameters - {@link WaitForTransactionReceiptParameters}
* @returns The transaction receipt. {@link WaitForTransactionReceiptReturnType}
*
* @example
* import { createPublicClient, waitForTransactionReceipt, http } from 'viem'
* import { mainnet } from 'viem/chains'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const transactionReceipt = await waitForTransactionReceipt(client, {
*   hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
* })
*/
async function waitForTransactionReceipt(client, parameters) {
	const { checkReplacement = client.chain?.supportsTransactionReplacementDetection ?? true, confirmations = 1, hash, onReplaced, retryCount = 6, retryDelay = ({ count }) => ~~(1 << count) * 200, signal, timeout = 18e4 } = parameters;
	if (signal?.aborted) throw getAbortError(signal);
	const replacement = client.chain?.transactionReplacement?.getKey ? void 0 : parameters.replacement;
	const getReplacementKey = (transaction) => client.chain?.transactionReplacement?.getKey?.(transaction) ?? String(transaction.nonce);
	const pollingInterval = (() => {
		if (parameters.pollingInterval) return parameters.pollingInterval;
		if (client.chain?.experimental_preconfirmationTime) return client.chain.experimental_preconfirmationTime;
		return client.pollingInterval;
	})();
	const observerId = stringify$1([
		"waitForTransactionReceipt",
		client.uid,
		hash,
		{
			checkReplacement,
			confirmations,
			pollingInterval,
			replacement,
			retryCount,
			signal: signal ? uid$1() : void 0,
			timeout
		}
	]);
	let transaction;
	let receipt;
	let replacementResponse;
	let retrying = false;
	let latest;
	let _unobserve;
	let _unwatch;
	let timedOut = false;
	const { promise, resolve, reject } = withResolvers();
	const timer = timeout ? setTimeout(() => {
		timedOut = true;
		_unobserve?.();
		if (!listenersCache.get(observerId)?.length) {
			_unwatch?.();
			latest = void 0;
		}
		reject(new WaitForTransactionReceiptTimeoutError({ hash }));
	}, timeout) : void 0;
	const onAbort = () => {
		clearTimeout(timer);
		_unwatch?.();
		_unobserve?.();
		reject(getAbortError(signal));
	};
	signal?.addEventListener("abort", onAbort, { once: true });
	_unobserve = observe(observerId, {
		onReplaced,
		resolve,
		reject
	}, async (emit) => {
		receipt = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({ hash }).catch(() => void 0);
		if (signal?.aborted) return;
		if (receipt && confirmations <= 1) {
			clearTimeout(timer);
			emit.resolve(receipt);
			_unobserve?.();
			return;
		}
		if (timedOut && !listenersCache.get(observerId)?.length) return;
		const handleBlock = async (blockNumber_) => {
			const done = (fn) => {
				latest = void 0;
				clearTimeout(timer);
				_unwatch?.();
				fn();
				_unobserve?.();
			};
			let blockNumber = blockNumber_;
			try {
				if (receipt) {
					if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations)) return;
					const receipt_ = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({ hash: receipt.transactionHash }).catch((error) => error instanceof TransactionReceiptNotFoundError ? null : void 0);
					if (receipt_ === void 0) return;
					if (!receipt_) {
						receipt = void 0;
						if (!replacementResponse) transaction = void 0;
						replacementResponse = void 0;
						return;
					}
					receipt = receipt_;
					if (confirmations > 1 && (!receipt_.blockNumber || blockNumber - receipt_.blockNumber + 1n < confirmations)) return;
					const replacement = replacementResponse;
					if (replacement) {
						if (replacement.transaction.blockHash !== receipt_.blockHash) replacement.transaction = await getAction(client, getTransaction, "getTransaction")({ hash: receipt_.transactionHash });
						replacement.transactionReceipt = receipt_;
					}
					done(() => {
						if (replacement) emit.onReplaced?.(replacement);
						emit.resolve(receipt_);
					});
					return;
				}
				if (checkReplacement && !transaction) {
					retrying = true;
					await withRetry(async () => {
						transaction = await getAction(client, getTransaction, "getTransaction")({ hash });
						if (transaction.blockNumber) blockNumber = transaction.blockNumber;
					}, {
						delay: retryDelay,
						retryCount,
						signal,
						shouldRetry: ({ error }) => !(replacement && error instanceof TransactionNotFoundError)
					});
					retrying = false;
				}
				receipt = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({ hash });
				if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations)) return;
				done(() => emit.resolve(receipt));
			} catch (err) {
				if (err instanceof TransactionNotFoundError || err instanceof TransactionReceiptNotFoundError) {
					retrying = false;
					const replaced = transaction ?? (checkReplacement && replacement ? {
						...replacement,
						hash: hash.toLowerCase()
					} : void 0);
					if (!replaced) return;
					if (replaced.blockNumber) return;
					try {
						if (!transaction) {
							retrying = true;
							const found = await getAction(client, getTransaction, "getTransaction")({
								nonce: replaced.nonce,
								sender: replaced.from
							}).catch((error) => {
								if (error instanceof MethodNotFoundRpcError || error instanceof MethodNotSupportedRpcError) transaction = replaced;
							});
							retrying = false;
							if (found?.hash.toLowerCase() === replaced.hash) {
								transaction = found;
								return;
							}
							if (found) {
								const replacementReceipt = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({ hash: found.hash }).catch((error) => {
									if (error instanceof TransactionReceiptNotFoundError) return void 0;
									throw error;
								});
								if (!replacementReceipt) return;
								receipt = replacementReceipt;
								replacementResponse = {
									reason: client.chain?.transactionReplacement?.getReason?.({
										replaced,
										replacement: found
									}) ?? getReplacementReason(replaced, found),
									replacedTransaction: replaced,
									transaction: found,
									transactionReceipt: receipt
								};
								if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations)) return;
								done(() => {
									emit.onReplaced?.(replacementResponse);
									emit.resolve(receipt);
								});
								return;
							}
						}
						retrying = true;
						const block = await withRetry(() => getAction(client, getBlock, "getBlock")({
							blockNumber,
							includeTransactions: true
						}), {
							delay: retryDelay,
							retryCount,
							signal,
							shouldRetry: ({ error }) => error instanceof BlockNotFoundError
						});
						retrying = false;
						const replacedKey = getReplacementKey(replaced);
						const replacementTransaction = block.transactions.find((candidate) => isAddressEqual(candidate.from, replaced.from) && candidate.hash !== replaced.hash && getReplacementKey(candidate) === replacedKey);
						if (!replacementTransaction) return;
						receipt = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({ hash: replacementTransaction.hash });
						replacementResponse = {
							reason: client.chain?.transactionReplacement?.getReason?.({
								replaced,
								replacement: replacementTransaction
							}) ?? getReplacementReason(replaced, replacementTransaction),
							replacedTransaction: replaced,
							transaction: replacementTransaction,
							transactionReceipt: receipt
						};
						if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations)) return;
						done(() => {
							emit.onReplaced?.(replacementResponse);
							emit.resolve(receipt);
						});
					} catch (err_) {
						done(() => emit.reject(err_));
					}
				} else done(() => emit.reject(err));
			}
		};
		_unwatch = getAction(client, watchBlockNumber, "watchBlockNumber")({
			emitMissed: true,
			emitOnBegin: true,
			poll: true,
			pollingInterval,
			async onBlockNumber(blockNumber) {
				if (!listenersCache.get(observerId)?.length) {
					_unwatch?.();
					return;
				}
				latest = blockNumber;
				while (latest !== void 0 && !retrying) {
					const next = latest;
					latest = void 0;
					await handleBlock(next);
				}
			}
		});
		unwatchers.set(observerId, _unwatch);
	});
	return promise.finally(() => {
		signal?.removeEventListener("abort", onAbort);
		clearTimeout(timer);
		_unobserve?.();
		if (listenersCache.get(observerId)?.length) return;
		unwatchers.get(observerId)?.();
		unwatchers.delete(observerId);
	});
}
function getReplacementReason(replaced, replacement) {
	if ((replacement.to && replaced.to ? isAddressEqual(replacement.to, replaced.to) : replacement.to === replaced.to) && replacement.value === replaced.value && replacement.input === replaced.input) return "repriced";
	if (replacement.from === replacement.to && replacement.value === 0n) return "cancelled";
	return "replaced";
}
//#endregion
//#region node_modules/viem/_esm/actions/public/watchBlockHeaders.js
var blockFields = [
	"size",
	"totalDifficulty",
	"transactions",
	"uncles",
	"withdrawals"
];
/**
* Watches and returns incoming block headers.
*
* - Docs: https://viem.sh/docs/actions/public/watchBlockHeaders
* - JSON-RPC Methods: Uses a WebSocket or IPC subscription via [`eth_subscribe`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_subscribe) and the `"newHeads"` event.
*
* @param client - Client to use
* @param parameters - {@link WatchBlockHeadersParameters}
* @returns A function that can be invoked to stop watching for new block headers. {@link WatchBlockHeadersReturnType}
*
* @example
* import { createPublicClient, webSocket } from 'viem'
* import { watchBlockHeaders } from 'viem/actions'
* import { mainnet } from 'viem/chains'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: webSocket(),
* })
* const unwatch = watchBlockHeaders(client, {
*   onBlockHeader: (blockHeader) => console.log(blockHeader),
* })
*/
function watchBlockHeaders(client, { onBlockHeader, onError }) {
	let prevBlockHeader;
	return observe(stringify$1(["watchBlockHeaders", client.uid]), {
		onBlockHeader,
		onError
	}, (emit) => {
		let active = true;
		let subscribed = false;
		let unsubscribe = () => active = false;
		(async () => {
			try {
				const { unsubscribe: unsubscribe_ } = await getSubscriptionTransport(client).subscribe({
					params: ["newHeads"],
					onData(data) {
						if (!active) return;
						const blockHeader = (client.chain?.formatters?.block?.format || formatBlock)(data.result, "watchBlockHeaders");
						for (const field of blockFields) delete blockHeader[field];
						emit.onBlockHeader(blockHeader, prevBlockHeader);
						prevBlockHeader = blockHeader;
					},
					onError(error) {
						if (subscribed) emit.onError?.(error);
					}
				});
				subscribed = true;
				unsubscribe = unsubscribe_;
				if (!active) unsubscribe();
			} catch (err) {
				emit.onError?.(err);
			}
		})();
		return () => unsubscribe();
	});
}
//#endregion
//#region node_modules/viem/_esm/actions/public/watchBlocks.js
/**
* Watches and returns information for incoming blocks.
*
* - Docs: https://viem.sh/docs/actions/public/watchBlocks
* - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks_watching-blocks
* - JSON-RPC Methods:
*   - When `poll: true`, calls [`eth_getBlockByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getBlockByNumber) on a polling interval.
*   - When `poll: false` & WebSocket Transport, uses a WebSocket subscription via [`eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe-polygon) and the `"newHeads"` event.
*
* @param client - Client to use
* @param parameters - {@link WatchBlocksParameters}
* @returns A function that can be invoked to stop watching for new block numbers. {@link WatchBlocksReturnType}
*
* @example
* import { createPublicClient, watchBlocks, http } from 'viem'
* import { mainnet } from 'viem/chains'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const unwatch = watchBlocks(client, {
*   onBlock: (block) => console.log(block),
* })
*/
function watchBlocks(client, { blockTag = client.experimental_blockTag ?? "latest", emitMissed: emitMissed_, emitOnBegin = false, onBlock, onError, includeTransactions: includeTransactions_, poll: poll_, pollingInterval = client.pollingInterval }) {
	const enablePolling = (() => {
		if (typeof poll_ !== "undefined") return poll_;
		return shouldPoll(client);
	})();
	const includeTransactions = includeTransactions_ ?? false;
	const blockTime = client.chain?.blockTime;
	const emitMissed = emitMissed_ ?? ((blockTag === "latest" || blockTag === "pending") && blockTime !== void 0 && pollingInterval > blockTime / 2);
	const maxMissed = emitMissed_ === void 0 ? 100 : Number.POSITIVE_INFINITY;
	let prevBlock;
	const pollBlocks = () => {
		return observe(stringify$1([
			"watchBlocks",
			client.uid,
			blockTag,
			emitMissed,
			emitOnBegin,
			includeTransactions,
			maxMissed,
			pollingInterval
		]), {
			onBlock,
			onError
		}, (emit) => poll(async () => {
			try {
				const block = await getAction(client, getBlock, "getBlock")({
					blockTag,
					includeTransactions
				});
				if (block.number !== null && prevBlock?.number != null) {
					if (block.number === prevBlock.number) return;
					const missed = Number(block.number - prevBlock.number) - 1;
					if (missed > 0 && missed <= maxMissed && emitMissed) {
						const batchSize = 10;
						const start = prevBlock.number + 1n;
						for (let i = 0; i < missed; i += batchSize) {
							const blocks = await Promise.all(Array.from({ length: Math.min(batchSize, missed - i) }, (_, j) => getAction(client, getBlock, "getBlock")({
								blockNumber: start + BigInt(i + j),
								includeTransactions
							})));
							for (const block of blocks) {
								emit.onBlock(block, prevBlock);
								prevBlock = block;
							}
						}
					}
				}
				if (prevBlock?.number == null || blockTag === "pending" && block?.number == null || block.number !== null && block.number > prevBlock.number) {
					emit.onBlock(block, prevBlock);
					prevBlock = block;
				}
			} catch (err) {
				emit.onError?.(err);
			}
		}, {
			emitOnBegin,
			interval: pollingInterval
		}));
	};
	const subscribeBlocks = () => {
		let active = true;
		let emitFetched = true;
		let unsubscribe = () => active = false;
		(async () => {
			try {
				if (emitOnBegin) getAction(client, getBlock, "getBlock")({
					blockTag,
					includeTransactions
				}).then((block) => {
					if (!active) return;
					if (!emitFetched) return;
					onBlock(block, void 0);
					emitFetched = false;
				}).catch(onError);
				const { unsubscribe: unsubscribe_ } = await getSubscriptionTransport(client).subscribe({
					params: ["newHeads"],
					async onData(data) {
						if (!active) return;
						const block = await getAction(client, getBlock, "getBlock")({
							blockNumber: data.result?.number,
							includeTransactions
						}).catch(() => {});
						if (!active) return;
						onBlock(block, prevBlock);
						emitFetched = false;
						prevBlock = block;
					},
					onError(error) {
						onError?.(error);
					}
				});
				unsubscribe = unsubscribe_;
				if (!active) unsubscribe();
			} catch (err) {
				onError?.(err);
			}
		})();
		return () => unsubscribe();
	};
	return enablePolling ? pollBlocks() : subscribeBlocks();
}
//#endregion
//#region node_modules/viem/_esm/actions/public/watchContractEvent.js
/**
* Watches and returns emitted contract event logs.
*
* - Docs: https://viem.sh/docs/contract/watchContractEvent
*
* This Action will batch up all the event logs found within the [`pollingInterval`](https://viem.sh/docs/contract/watchContractEvent#pollinginterval-optional), and invoke them via [`onLogs`](https://viem.sh/docs/contract/watchContractEvent#onLogs).
*
* `watchContractEvent` will attempt to create an [Event Filter](https://viem.sh/docs/contract/createContractEventFilter) and listen to changes to the Filter per polling interval, however, if the RPC Provider does not support Filters (e.g. `eth_newFilter`), then `watchContractEvent` will fall back to using [`getLogs`](https://viem.sh/docs/actions/public/getLogs) instead. If `getLogs` fails for a block range, `watchContractEvent` will retry with smaller block ranges and may call `onLogs` more than once per polling interval.
*
* @param client - Client to use
* @param parameters - {@link WatchContractEventParameters}
* @returns A function that can be invoked to stop watching for new event logs. {@link WatchContractEventReturnType}
*
* @example
* import { createPublicClient, http, parseAbi } from 'viem'
* import { mainnet } from 'viem/chains'
* import { watchContractEvent } from 'viem/contract'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const unwatch = watchContractEvent(client, {
*   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
*   abi: parseAbi(['event Transfer(address indexed from, address indexed to, uint256 value)']),
*   eventName: 'Transfer',
*   args: { from: '0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b' },
*   onLogs: (logs) => console.log(logs),
* })
*/
function watchContractEvent(client, parameters) {
	const { abi, address, args, batch = true, eventName, fromBlock, onError, onLogs, poll: poll_, pollingInterval = client.pollingInterval, strict: strict_ } = parameters;
	const enablePolling = (() => {
		if (typeof poll_ !== "undefined") return poll_;
		if (typeof fromBlock === "bigint") return true;
		return shouldPoll(client);
	})();
	const pollContractEvent = () => {
		const strict = strict_ ?? false;
		return observe(stringify$1([
			"watchContractEvent",
			address,
			args,
			batch,
			client.uid,
			eventName,
			pollingInterval,
			strict,
			fromBlock
		]), {
			onLogs,
			onError
		}, (emit) => {
			let active = true;
			let previousBlockNumber = fromBlock === void 0 ? void 0 : fromBlock - 1n;
			let filter;
			let initialized = false;
			const emitLogs = (logs) => {
				if (logs.length === 0) return;
				if (batch) emit.onLogs(logs);
				else for (const log of logs) emit.onLogs([log]);
			};
			const getLogsInRange = (from, to) => getAction(client, getContractEvents, "getContractEvents")({
				abi,
				address,
				args,
				eventName,
				fromBlock: from,
				toBlock: to,
				strict
			});
			const unwatch = poll(async () => {
				if (!initialized) {
					try {
						filter = await getAction(client, createContractEventFilter, "createContractEventFilter")({
							abi,
							address,
							args,
							eventName,
							strict,
							fromBlock
						});
					} catch {}
					initialized = true;
					if (filter) return;
				}
				try {
					if (filter) {
						const logs = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
						emitLogs(logs);
						return;
					}
					const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({});
					previousBlockNumber ??= blockNumber;
					let size = blockNumber - previousBlockNumber;
					while (previousBlockNumber < blockNumber) {
						const from = previousBlockNumber + 1n;
						const end = previousBlockNumber + size;
						const to = end < blockNumber ? end : blockNumber;
						const logs = await getLogsInRange(from, to).catch((error) => {
							if (from === to || !isRangeError(error)) throw error;
						});
						if (!active) return;
						if (!logs) {
							size = (to - from + 1n) / 2n;
							continue;
						}
						previousBlockNumber = to;
						emitLogs(logs);
					}
				} catch (err) {
					if (filter && err instanceof InvalidInputRpcError) initialized = false;
					emit.onError?.(err);
				}
			}, {
				emitOnBegin: true,
				interval: pollingInterval
			});
			return async () => {
				active = false;
				if (filter) await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
				unwatch();
			};
		});
	};
	const subscribeContractEvent = () => {
		const strict = strict_ ?? false;
		const observerId = stringify$1([
			"watchContractEvent",
			address,
			args,
			batch,
			client.uid,
			eventName,
			pollingInterval,
			strict
		]);
		let active = true;
		let unsubscribe = () => active = false;
		return observe(observerId, {
			onLogs,
			onError
		}, (emit) => {
			(async () => {
				try {
					const transport = getSubscriptionTransport(client);
					const skipUnmatched = Boolean(eventName || strict_);
					const topics = eventName ? encodeEventTopics({
						abi,
						eventName,
						args
					}) : [];
					const { unsubscribe: unsubscribe_ } = await transport.subscribe({
						params: ["logs", {
							address,
							topics
						}],
						onData(data) {
							if (!active) return;
							const log = data.result;
							try {
								const decoded = decodeEventLog({
									abi,
									data: log.data,
									eventName,
									topics: log.topics,
									strict: strict_
								});
								const formatted = formatLog(log, {
									args: decoded.args,
									eventName: decoded.eventName
								});
								emit.onLogs([formatted]);
							} catch (err) {
								if (skipUnmatched && (err instanceof AbiEventAmbiguityError || err instanceof AbiEventSignatureEmptyTopicsError || err instanceof AbiEventSignatureNotFoundError)) return;
								let eventName;
								let isUnnamed;
								if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
									if (strict_) return;
									eventName = err.abiItem.name;
									isUnnamed = err.abiItem.inputs?.some((x) => !("name" in x && x.name));
								}
								const formatted = formatLog(log, {
									args: isUnnamed ? [] : {},
									eventName
								});
								emit.onLogs([formatted]);
							}
						},
						onError(error) {
							emit.onError?.(error);
						}
					});
					unsubscribe = unsubscribe_;
					if (!active) unsubscribe();
				} catch (err) {
					onError?.(err);
				}
			})();
			return () => unsubscribe();
		});
	};
	return enablePolling ? pollContractEvent() : subscribeContractEvent();
}
//#endregion
//#region node_modules/viem/_esm/actions/public/watchEvent.js
/**
* Watches and returns emitted [Event Logs](https://viem.sh/docs/glossary/terms#event-log).
*
* - Docs: https://viem.sh/docs/actions/public/watchEvent
* - JSON-RPC Methods:
*   - **RPC Provider supports `eth_newFilter`:**
*     - Calls [`eth_newFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newfilter) to create a filter (called on initialize).
*     - On a polling interval, it will call [`eth_getFilterChanges`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges).
*   - **RPC Provider does not support `eth_newFilter`:**
*     - Calls [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs) for each block between the polling interval.
*
* This Action will batch up all the Event Logs found within the [`pollingInterval`](https://viem.sh/docs/actions/public/watchEvent#pollinginterval-optional), and invoke them via [`onLogs`](https://viem.sh/docs/actions/public/watchEvent#onLogs).
*
* `watchEvent` will attempt to create an [Event Filter](https://viem.sh/docs/actions/public/createEventFilter) and listen to changes to the Filter per polling interval, however, if the RPC Provider does not support Filters (e.g. `eth_newFilter`), then `watchEvent` will fall back to using [`getLogs`](https://viem.sh/docs/actions/public/getLogs) instead. If `getLogs` fails for a block range, `watchEvent` will retry with smaller block ranges and may call `onLogs` more than once per polling interval.
*
* @param client - Client to use
* @param parameters - {@link WatchEventParameters}
* @returns A function that can be invoked to stop watching for new Event Logs. {@link WatchEventReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { watchEvent } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const unwatch = watchEvent(client, {
*   onLogs: (logs) => console.log(logs),
* })
*/
function watchEvent(client, { address, args, batch = true, event, events, fromBlock, onError, onLogs, poll: poll_, pollingInterval = client.pollingInterval, strict: strict_ }) {
	const enablePolling = (() => {
		if (typeof poll_ !== "undefined") return poll_;
		if (typeof fromBlock === "bigint") return true;
		return shouldPoll(client);
	})();
	const strict = strict_ ?? false;
	const pollEvent = () => {
		return observe(stringify$1([
			"watchEvent",
			address,
			args,
			batch,
			client.uid,
			event,
			events,
			pollingInterval,
			strict,
			fromBlock
		]), {
			onLogs,
			onError
		}, (emit) => {
			let active = true;
			let previousBlockNumber = fromBlock === void 0 ? void 0 : fromBlock - 1n;
			let filter;
			let initialized = false;
			const emitLogs = (logs) => {
				if (logs.length === 0) return;
				if (batch) emit.onLogs(logs);
				else for (const log of logs) emit.onLogs([log]);
			};
			const getLogsInRange = (from, to) => getAction(client, getLogs, "getLogs")({
				address,
				args,
				event,
				events,
				fromBlock: from,
				strict,
				toBlock: to
			});
			const unwatch = poll(async () => {
				if (!initialized) {
					try {
						filter = await getAction(client, createEventFilter, "createEventFilter")({
							address,
							args,
							event,
							events,
							strict,
							fromBlock
						});
					} catch {}
					initialized = true;
					if (filter) return;
				}
				try {
					if (filter) {
						const logs = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
						emitLogs(logs);
						return;
					}
					const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({});
					previousBlockNumber ??= blockNumber;
					let size = blockNumber - previousBlockNumber;
					while (previousBlockNumber < blockNumber) {
						const from = previousBlockNumber + 1n;
						const end = previousBlockNumber + size;
						const to = end < blockNumber ? end : blockNumber;
						const logs = await getLogsInRange(from, to).catch((error) => {
							if (from === to || !isRangeError(error)) throw error;
						});
						if (!active) return;
						if (!logs) {
							size = (to - from + 1n) / 2n;
							continue;
						}
						previousBlockNumber = to;
						emitLogs(logs);
					}
				} catch (err) {
					if (filter && err instanceof InvalidInputRpcError) initialized = false;
					emit.onError?.(err);
				}
			}, {
				emitOnBegin: true,
				interval: pollingInterval
			});
			return async () => {
				active = false;
				if (filter) await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
				unwatch();
			};
		});
	};
	const subscribeEvent = () => {
		let active = true;
		let unsubscribe = () => active = false;
		(async () => {
			try {
				const transport = getSubscriptionTransport(client);
				const events_ = events ?? (event ? [event] : void 0);
				const topics = encodeEventFilterTopics({
					args,
					event,
					events
				});
				const { unsubscribe: unsubscribe_ } = await transport.subscribe({
					params: ["logs", {
						address,
						topics
					}],
					onData(data) {
						if (!active) return;
						const log = data.result;
						try {
							const { eventName, args } = decodeEventLog({
								abi: events_ ?? [],
								data: log.data,
								topics: log.topics,
								strict
							});
							onLogs([formatLog(log, {
								args,
								eventName
							})]);
						} catch (err) {
							if ((events_ || strict_) && (err instanceof AbiEventAmbiguityError || err instanceof AbiEventSignatureEmptyTopicsError || err instanceof AbiEventSignatureNotFoundError)) return;
							let eventName;
							let isUnnamed;
							if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
								if (strict_) return;
								eventName = err.abiItem.name;
								isUnnamed = err.abiItem.inputs?.some((x) => !("name" in x && x.name));
							}
							onLogs([formatLog(log, {
								args: isUnnamed ? [] : {},
								eventName
							})]);
						}
					},
					onError(error) {
						onError?.(error);
					}
				});
				unsubscribe = unsubscribe_;
				if (!active) unsubscribe();
			} catch (err) {
				onError?.(err);
			}
		})();
		return () => unsubscribe();
	};
	return enablePolling ? pollEvent() : subscribeEvent();
}
//#endregion
//#region node_modules/viem/_esm/actions/public/watchPendingTransactions.js
/**
* Watches and returns pending transaction hashes.
*
* - Docs: https://viem.sh/docs/actions/public/watchPendingTransactions
* - JSON-RPC Methods:
*   - When `poll: true`
*     - Calls [`eth_newPendingTransactionFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newpendingtransactionfilter) to initialize the filter.
*     - Calls [`eth_getFilterChanges`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getFilterChanges) on a polling interval.
*   - When `poll: false` & WebSocket Transport, uses a WebSocket subscription via [`eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe-polygon) and the `"newPendingTransactions"` event.
*
* This Action will batch up all the pending transactions found within the [`pollingInterval`](https://viem.sh/docs/actions/public/watchPendingTransactions#pollinginterval-optional), and invoke them via [`onTransactions`](https://viem.sh/docs/actions/public/watchPendingTransactions#ontransactions).
*
* @param client - Client to use
* @param parameters - {@link WatchPendingTransactionsParameters}
* @returns A function that can be invoked to stop watching for new pending transaction hashes. {@link WatchPendingTransactionsReturnType}
*
* @example
* import { createPublicClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { watchPendingTransactions } from 'viem/public'
*
* const client = createPublicClient({
*   chain: mainnet,
*   transport: http(),
* })
* const unwatch = await watchPendingTransactions(client, {
*   onTransactions: (hashes) => console.log(hashes),
* })
*/
function watchPendingTransactions(client, { batch = true, onError, onTransactions, poll: poll_, pollingInterval = client.pollingInterval }) {
	const enablePolling = typeof poll_ !== "undefined" ? poll_ : client.transport.type !== "webSocket" && client.transport.type !== "ipc";
	const pollPendingTransactions = () => {
		return observe(stringify$1([
			"watchPendingTransactions",
			client.uid,
			batch,
			pollingInterval
		]), {
			onTransactions,
			onError
		}, (emit) => {
			let filter;
			const unwatch = poll(async () => {
				try {
					if (!filter) try {
						filter = await getAction(client, createPendingTransactionFilter, "createPendingTransactionFilter")({});
						return;
					} catch (err) {
						unwatch();
						throw err;
					}
					const hashes = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
					if (hashes.length === 0) return;
					if (batch) emit.onTransactions(hashes);
					else for (const hash of hashes) emit.onTransactions([hash]);
				} catch (err) {
					emit.onError?.(err);
				}
			}, {
				emitOnBegin: true,
				interval: pollingInterval
			});
			return async () => {
				if (filter) await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
				unwatch();
			};
		});
	};
	const subscribePendingTransactions = () => {
		let active = true;
		let unsubscribe = () => active = false;
		(async () => {
			try {
				const { unsubscribe: unsubscribe_ } = await client.transport.subscribe({
					params: ["newPendingTransactions"],
					onData(data) {
						if (!active) return;
						const transaction = data.result;
						onTransactions([transaction]);
					},
					onError(error) {
						onError?.(error);
					}
				});
				unsubscribe = unsubscribe_;
				if (!active) unsubscribe();
			} catch (err) {
				onError?.(err);
			}
		})();
		return () => unsubscribe();
	};
	return enablePolling ? pollPendingTransactions() : subscribePendingTransactions();
}
//#endregion
//#region node_modules/viem/_esm/errors/account.js
var AccountNotFoundError = class extends BaseError$3 {
	constructor({ docsPath } = {}) {
		super(["Could not find an Account to execute with this Action.", "Please provide an Account with the `account` argument on the Action, or by supplying an `account` to the Client."].join("\n"), {
			docsPath,
			docsSlug: "account",
			name: "AccountNotFoundError"
		});
	}
};
var AccountTypeNotSupportedError = class extends BaseError$3 {
	constructor({ docsPath, metaMessages, type }) {
		super(`Account type "${type}" is not supported.`, {
			docsPath,
			metaMessages,
			name: "AccountTypeNotSupportedError"
		});
	}
};
//#endregion
//#region node_modules/viem/_esm/actions/wallet/sendRawTransaction.js
/**
* Sends a **signed** transaction to the network
*
* - Docs: https://viem.sh/docs/actions/wallet/sendRawTransaction
* - JSON-RPC Method: [`eth_sendRawTransaction`](https://ethereum.github.io/execution-apis/api-documentation/)
*
* @param client - Client to use
* @param parameters - {@link SendRawTransactionParameters}
* @returns The transaction hash. {@link SendRawTransactionReturnType}
*
* @example
* import { createWalletClient, custom } from 'viem'
* import { mainnet } from 'viem/chains'
* import { sendRawTransaction } from 'viem/wallet'
*
* const client = createWalletClient({
*   chain: mainnet,
*   transport: custom(window.ethereum),
* })
*
* const hash = await sendRawTransaction(client, {
*   serializedTransaction: '0x02f850018203118080825208808080c080a04012522854168b27e5dc3d5839bab5e6b39e1a0ffd343901ce1622e3d64b48f1a04e00902ae0502c4728cbf12156290df99c3ed7de85b1dbfe20b5c36931733a33'
* })
*/
async function sendRawTransaction(client, { serializedTransaction }) {
	return client.request({
		method: "eth_sendRawTransaction",
		params: [serializedTransaction]
	}, { retryCount: 0 });
}
//#endregion
//#region node_modules/viem/_esm/actions/token/internal.js
/**
* Shapes a base-unit value into an {@link Amount} (base units, `decimals`, and
* human-readable `formatted` string).
*
* @param amount - Amount in base units.
* @param decimals - Token decimals used to format the amount.
* @returns The {@link Amount}.
*/
function toAmount(amount, decimals) {
	return {
		amount,
		decimals,
		formatted: formatUnits(amount, decimals)
	};
}
/**
* Resolves a write amount to base units.
*
* @param amount - Base-unit amount, or formatted helper.
* @param decimals - Token decimals used to parse formatted amounts.
* @returns Amount in base units.
*/
function toBaseUnits(amount, decimals) {
	if (typeof amount === "bigint") return amount;
	const resolved = amount.decimals ?? decimals;
	return parseUnits(amount.formatted, requireTokenDecimals(resolved));
}
/**
* Requires resolved token decimals for parsing or formatting amounts.
*
* @param decimals - Token decimals.
* @returns Token decimals.
* @internal
*/
function requireTokenDecimals(decimals) {
	if (decimals === void 0) throw new Error("Token decimals are required. Pass `amount.decimals` or select a declared token.");
	return decimals;
}
/**
* Resolves the decimals used for formatting a write amount.
*
* @param amount - Base-unit amount, or formatted helper.
* @param decimals - Token decimals.
* @returns Token decimals, overridden by the formatted helper when present.
*/
function resolveAmountDecimals(amount, decimals) {
	if (typeof amount === "bigint") return decimals;
	return amount.decimals ?? decimals;
}
/**
* Resolves the token contract `address` and `decimals` from a `token`, which is
* either the symbol of a token declared on the client's `tokens` array or a
* contract `address`.
*
* When `token` is a declared symbol, the `address` and `decimals` are resolved
* from the Client's `tokens` array for the Client's `chain.id` (`decimals` can
* be overridden via the explicit `decimals`). When `token` is an address, its
* `decimals` is inferred from the Client's `tokens` array when the address
* matches a declared token, otherwise taken from the explicit `decimals`.
*
* @param client - Client.
* @param parameters - Parameters.
* @returns The resolved `address` and `decimals`.
*/
function resolveToken(client, parameters) {
	const { decimals, token } = parameters;
	const declared = findDeclaredToken(client, token);
	if (declared) return {
		address: declared.address,
		decimals: decimals ?? declared.decimals
	};
	if (isAddress(token, { strict: false })) return {
		address: token,
		decimals: decimals ?? inferDecimals(client, token)
	};
	throw new Error(`Token "${token}" is not a declared ERC-20 token on the client's \`tokens\` array (with an address for the client's chain), and is not a valid address.`);
}
/**
* Finds the declared token on the Client's `tokens` array matching `token`
* (either a token symbol or contract `address`), resolved to a {@link ResolvedToken}
* for the Client's `chain.id`. Returns `undefined` when no declared token
* matches, or the matching token has no address for the Client's chain.
*
* @param client - Client.
* @param token - Token symbol (declared on the client's `tokens` array) or contract address.
* @returns The matching resolved token config, or `undefined`.
*/
function findDeclaredToken(client, token) {
	const tokens = client.tokens;
	const chainId = client.chain?.id;
	if (!tokens || chainId === void 0) return void 0;
	const bySymbol = findTokenBySymbol(tokens, token);
	if (bySymbol) return resolveTokenForChain(bySymbol, chainId);
	if (isAddress(token, { strict: false })) for (const token_ of tokens) {
		const resolved = resolveTokenForChain(token_, chainId);
		if (resolved && isAddressEqual(resolved.address, token)) return resolved;
	}
}
/**
* Resolves a {@link Token} to a {@link ResolvedToken} for `chainId`, or
* `undefined` when the token has no address for `chainId`. @internal
*/
function resolveTokenForChain(token, chainId) {
	if (!token.addresses[chainId]) return void 0;
	return token(chainId);
}
/** Finds a {@link Token} by symbol (case-insensitively) on a `tokens` array. @internal */
function findTokenBySymbol(tokens, symbol) {
	const lowerSymbol = symbol.toLowerCase();
	for (const token of tokens) if (token.symbol?.toLowerCase() === lowerSymbol) return token;
}
/**
* Infers a token's `decimals` from the Client's `tokens` array by matching
* `address` against each token's address for the Client's `chain.id`.
* @internal
*/
function inferDecimals(client, address) {
	const tokens = client.tokens;
	const chainId = client.chain?.id;
	if (tokens && chainId !== void 0) for (const token of tokens) {
		const resolved = resolveTokenForChain(token, chainId);
		if (resolved && isAddressEqual(resolved.address, address)) return resolved.decimals;
	}
}
/**
* Resolves token decimals, fetching from the token contract when they are not
* provided explicitly or declared on the client.
* @internal
*/
async function resolveTokenWithDecimals(client, parameters) {
	const { address, decimals } = resolveToken(client, parameters);
	if (decimals !== void 0) return {
		address,
		decimals
	};
	return {
		address,
		decimals: await readContract(client, {
			abi: erc20Abi,
			address,
			functionName: "decimals"
		})
	};
}
/**
* Picks the transaction-override fields shared by write actions, so the
* action-specific args (`token`, `amount`, `to`, etc.) don't leak into
* `estimateContractGas` / `simulateContract` requests. @internal
*/
function pickWriteParameters(parameters) {
	const { account, chain, gas, maxFeePerGas, maxPriorityFeePerGas, nonce } = parameters;
	return {
		account,
		chain,
		gas,
		maxFeePerGas,
		maxPriorityFeePerGas,
		nonce
	};
}
function defineCall(call) {
	return {
		...call,
		data: encodeFunctionData(call),
		to: call.address
	};
}
//#endregion
//#region node_modules/viem/_esm/actions/wallet/sendRawTransactionSync.js
/**
* Sends a **signed** transaction to the network synchronously,
* and waits for the transaction to be included in a block.
*
* - Docs: https://viem.sh/docs/actions/wallet/sendRawTransactionSync
* - JSON-RPC Method: [`eth_sendRawTransactionSync`](https://eips.ethereum.org/EIPS/eip-7966)
*
* @param client - Client to use
* @param parameters - {@link SendRawTransactionParameters}
* @returns The transaction receipt. {@link SendRawTransactionSyncReturnType}
*
* @example
* import { createWalletClient, custom } from 'viem'
* import { mainnet } from 'viem/chains'
* import { sendRawTransactionSync } from 'viem/wallet'
*
* const client = createWalletClient({
*   chain: mainnet,
*   transport: custom(window.ethereum),
* })
*
* const receipt = await sendRawTransactionSync(client, {
*   serializedTransaction: '0x02f850018203118080825208808080c080a04012522854168b27e5dc3d5839bab5e6b39e1a0ffd343901ce1622e3d64b48f1a04e00902ae0502c4728cbf12156290df99c3ed7de85b1dbfe20b5c36931733a33'
* })
*/
async function sendRawTransactionSync(client, { serializedTransaction, throwOnReceiptRevert, timeout }) {
	const receipt = await client.request({
		method: "eth_sendRawTransactionSync",
		params: timeout ? [serializedTransaction, timeout] : [serializedTransaction]
	}, { retryCount: 0 });
	const formatted = (client.chain?.formatters?.transactionReceipt?.format || formatTransactionReceipt)(receipt);
	if (formatted.status === "reverted" && throwOnReceiptRevert) throw new TransactionReceiptRevertedError({ receipt: formatted });
	return formatted;
}
//#endregion
//#region node_modules/viem/_esm/actions/token/getAllowance.js
/**
* Gets the ERC-20 allowance a spender has over an account's tokens.
*
* @example
* ```ts
* import { createClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { token } from 'viem/actions'
*
* const client = createClient({ chain: mainnet, transport: http() })
*
* const allowance = await token.getAllowance(client, {
*   account: '0x...',
*   spender: '0x...',
*   token: '0x...',
* })
* ```
*
* @param client - Client.
* @param parameters - Parameters.
* @returns The allowance, in base units and human-readable form.
*/
async function getAllowance(client, parameters) {
	const { account, decimals, spender, token, ...rest } = parameters;
	const [amount, { decimals: resolved }] = await Promise.all([readContract(client, {
		...rest,
		...getAllowance.call(client, {
			account,
			spender,
			token
		})
	}), resolveTokenWithDecimals(client, {
		decimals,
		token
	})]);
	return toAmount(amount, resolved);
}
(function(getAllowance) {
	/**
	* Defines a call to the `allowance` function.
	*
	* Can be passed as a parameter to `multicall`, `simulateContract`, or any
	* other action that accepts a contract call. The token is selected by `token`
	* symbol (resolved from the client's `tokens` array) or contract address.
	*
	* @param client - Client.
	* @param args - Arguments.
	* @returns The call.
	*/
	function call(client, args) {
		return defineCall({
			address: resolveToken(client, args).address,
			abi: erc20Abi,
			functionName: "allowance",
			args: [args.account, args.spender]
		});
	}
	Object.defineProperty(getAllowance, "call", {
		configurable: true,
		enumerable: true,
		value: call,
		writable: true
	});
})(getAllowance || (getAllowance = {}));
//#endregion
//#region node_modules/viem/_esm/actions/token/getBalance.js
/**
* Gets the ERC-20 token balance of an account.
*
* @example
* ```ts
* import { createClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { token } from 'viem/actions'
*
* const client = createClient({ chain: mainnet, transport: http() })
*
* const balance = await token.getBalance(client, {
*   account: '0x...',
*   token: '0x...',
* })
* ```
*
* @param client - Client.
* @param parameters - Parameters.
* @returns The token balance, in base units and human-readable form.
*/
async function getBalance(client, parameters) {
	const { account: account_ = client.account, decimals, token, ...rest } = parameters;
	if (!account_) throw new AccountNotFoundError();
	const account = parseAccount(account_).address;
	const [amount, { decimals: resolved }] = await Promise.all([readContract(client, {
		...rest,
		...getBalance.call(client, {
			account,
			token
		})
	}), resolveTokenWithDecimals(client, {
		decimals,
		token
	})]);
	return toAmount(amount, resolved);
}
(function(getBalance) {
	/**
	* Defines a call to the `balanceOf` function.
	*
	* Can be passed as a parameter to `multicall`, `simulateContract`, or any
	* other action that accepts a contract call. The token is selected by `token`
	* symbol (resolved from the client's `tokens` array) or contract address.
	*
	* @param client - Client.
	* @param args - Arguments.
	* @returns The call.
	*/
	function call(client, args) {
		const account_ = args.account ?? client.account;
		if (!account_) throw new AccountNotFoundError();
		const account = parseAccount(account_).address;
		return defineCall({
			address: resolveToken(client, args).address,
			abi: erc20Abi,
			functionName: "balanceOf",
			args: [account]
		});
	}
	Object.defineProperty(getBalance, "call", {
		configurable: true,
		enumerable: true,
		value: call,
		writable: true
	});
})(getBalance || (getBalance = {}));
//#endregion
//#region node_modules/viem/_esm/actions/token/getMetadata.js
/**
* Gets the metadata (`decimals`, `name`, `symbol`) of an ERC-20 token.
*
* Fields declared on the Client's `tokens` array are used as-is; any missing
* field is fetched from the token contract.
*
* @example
* ```ts
* import { createClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { token } from 'viem/actions'
*
* const client = createClient({ chain: mainnet, transport: http() })
*
* const metadata = await token.getMetadata(client, {
*   token: '0x...',
* })
* ```
*
* @param client - Client.
* @param parameters - Parameters.
* @returns The token metadata (`decimals`, `name`, `symbol`).
*/
async function getMetadata(client, parameters) {
	const { token, ...rest } = parameters;
	const { address } = resolveToken(client, { token });
	const declared = findDeclaredToken(client, token);
	const [decimals_, name, symbol] = await Promise.all([
		declared?.decimals ?? readContract(client, {
			...rest,
			abi: erc20Abi,
			address,
			functionName: "decimals"
		}),
		declared?.name ?? readContract(client, {
			...rest,
			abi: erc20Abi,
			address,
			functionName: "name"
		}),
		declared?.symbol ?? readContract(client, {
			...rest,
			abi: erc20Abi,
			address,
			functionName: "symbol"
		})
	]);
	return {
		decimals: decimals_,
		name,
		symbol
	};
}
//#endregion
//#region node_modules/viem/_esm/actions/token/getTotalSupply.js
/**
* Gets the total supply of an ERC-20 token.
*
* @example
* ```ts
* import { createClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { token } from 'viem/actions'
*
* const client = createClient({ chain: mainnet, transport: http() })
*
* const totalSupply = await token.getTotalSupply(client, {
*   token: '0x...',
* })
* ```
*
* @param client - Client.
* @param parameters - Parameters.
* @returns The token total supply, in base units and human-readable form.
*/
async function getTotalSupply(client, parameters) {
	const { decimals, token, ...rest } = parameters;
	const [amount, { decimals: resolved }] = await Promise.all([readContract(client, {
		...rest,
		...getTotalSupply.call(client, { token })
	}), resolveTokenWithDecimals(client, {
		decimals,
		token
	})]);
	return toAmount(amount, resolved);
}
(function(getTotalSupply) {
	/**
	* Defines a call to the `totalSupply` function.
	*
	* Can be passed as a parameter to `multicall`, `simulateContract`, or any
	* other action that accepts a contract call. The token is selected by `token`
	* symbol (resolved from the client's `tokens` array) or contract address.
	*
	* @param client - Client.
	* @param args - Arguments.
	* @returns The call.
	*/
	function call(client, args) {
		return defineCall({
			address: resolveToken(client, args).address,
			abi: erc20Abi,
			args: [],
			functionName: "totalSupply"
		});
	}
	Object.defineProperty(getTotalSupply, "call", {
		configurable: true,
		enumerable: true,
		value: call,
		writable: true
	});
})(getTotalSupply || (getTotalSupply = {}));
//#endregion
//#region node_modules/wagmi/node_modules/@wagmi/core/dist/esm/version.js
var version = "3.6.9";
//#endregion
//#region node_modules/wagmi/node_modules/@wagmi/core/dist/esm/utils/getVersion.js
var getVersion = () => `@wagmi/core@${version}`;
//#endregion
//#region node_modules/wagmi/node_modules/@wagmi/core/dist/esm/errors/base.js
var __classPrivateFieldGet = function(receiver, state, kind, f) {
	if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
	if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
	return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BaseError_instances;
var _BaseError_walk;
var BaseError = class BaseError extends Error {
	get docsBaseUrl() {
		return "https://wagmi.sh/core";
	}
	get version() {
		return getVersion();
	}
	constructor(shortMessage, options = {}) {
		super();
		_BaseError_instances.add(this);
		Object.defineProperty(this, "details", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0
		});
		Object.defineProperty(this, "docsPath", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0
		});
		Object.defineProperty(this, "metaMessages", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0
		});
		Object.defineProperty(this, "shortMessage", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0
		});
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "WagmiCoreError"
		});
		const details = options.cause instanceof BaseError ? options.cause.details : options.cause?.message ? options.cause.message : options.details;
		const docsPath = options.cause instanceof BaseError ? options.cause.docsPath || options.docsPath : options.docsPath;
		this.message = [
			shortMessage || "An error occurred.",
			"",
			...options.metaMessages ? [...options.metaMessages, ""] : [],
			...docsPath ? [`Docs: ${this.docsBaseUrl}${docsPath}.html${options.docsSlug ? `#${options.docsSlug}` : ""}`] : [],
			...details ? [`Details: ${details}`] : [],
			`Version: ${this.version}`
		].join("\n");
		if (options.cause) this.cause = options.cause;
		this.details = details;
		this.docsPath = docsPath;
		this.metaMessages = options.metaMessages;
		this.shortMessage = shortMessage;
	}
	walk(fn) {
		return __classPrivateFieldGet(this, _BaseError_instances, "m", _BaseError_walk).call(this, this, fn);
	}
};
_BaseError_instances = /* @__PURE__ */ new WeakSet(), _BaseError_walk = function _BaseError_walk(err, fn) {
	if (fn?.(err)) return err;
	if (err.cause) return __classPrivateFieldGet(this, _BaseError_instances, "m", _BaseError_walk).call(this, err.cause, fn);
	return err;
};
//#endregion
//#region node_modules/wagmi/node_modules/@wagmi/core/dist/esm/errors/config.js
var ChainNotConfiguredError = class extends BaseError {
	constructor() {
		super("Chain not configured.");
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "ChainNotConfiguredError"
		});
	}
};
//#endregion
//#region node_modules/viem/_esm/clients/createClient.js
function createClient(parameters) {
	const { batch, chain, ccipRead, dataSuffix, key = "base", name = "Base Client", tokens, type = "base" } = parameters;
	const experimental_blockTag = parameters.experimental_blockTag ?? (typeof chain?.experimental_preconfirmationTime === "number" ? "pending" : void 0);
	const blockTime = chain?.blockTime ?? 12e3;
	const defaultPollingInterval = Math.min(Math.max(Math.floor(blockTime / 2), 500), 4e3);
	const pollingInterval = parameters.pollingInterval ?? defaultPollingInterval;
	const cacheTime = parameters.cacheTime ?? Math.min(pollingInterval, Math.floor(blockTime / 2));
	const account = parameters.account ? parseAccount(parameters.account) : void 0;
	const { config, request, value } = parameters.transport({
		account,
		chain,
		pollingInterval
	});
	return decorate({
		account,
		batch,
		cacheTime,
		ccipRead,
		chain,
		dataSuffix,
		key,
		name,
		pollingInterval,
		request,
		tokens,
		transport: {
			...config,
			...value
		},
		type,
		uid: uid$1(),
		...experimental_blockTag ? { experimental_blockTag } : {}
	});
}
/** Built-in `scope` functions, which an extension named `scope` takes precedence over. */
var scopes_builtin = /* @__PURE__ */ new WeakSet();
var scopeId = 0;
/**
* Attaches `extend` and `scope` to a base Client. Base keys other than
* `scope` are reserved, so extensions cannot override them.
*/
function decorate(client) {
	function extend(base, extensions) {
		return (extendFn) => {
			const extended = extendFn(base);
			for (const key in client) if (key !== "scope") delete extended[key];
			const combined = {
				...base,
				...extended
			};
			for (const key in extended) {
				const a = base[key];
				const b = extended[key];
				if (isPlainObject(a) && isPlainObject(b)) combined[key] = {
					...a,
					...b
				};
			}
			const next = [...extensions, extendFn];
			const { scope: scope_combined } = combined;
			return Object.assign(combined, {
				extend: extend(combined, next),
				scope: typeof scope_combined === "function" && scopes_builtin.has(scope_combined) ? scope(next) : scope_combined
			});
		};
	}
	function scope(extensions) {
		const scopes = /* @__PURE__ */ new WeakMap();
		const fn = (options = {}) => {
			const cached = options.signal && scopes.get(options.signal);
			if (cached) return cached;
			const id = `scope.${scopeId++}`;
			const controller = new AbortController();
			const { signal } = options;
			if (signal?.aborted) controller.abort(signal.reason);
			else signal?.addEventListener("abort", () => controller.abort(signal.reason), { once: true });
			const request = (args, options_request) => client.request(args, {
				...options_request,
				signal: options_request?.signal ?? controller.signal,
				uid: options_request?.uid ?? id
			});
			const scoped = extensions.reduce((base, extendFn) => base.extend(extendFn), decorate({
				...client,
				request,
				uid: id
			}));
			if (signal) scopes.set(signal, scoped);
			return scoped;
		};
		scopes_builtin.add(fn);
		return fn;
	}
	return Object.assign(client, {
		extend: extend(client, []),
		scope: scope([])
	});
}
/** Whether `value` is a plain object (`{}`), as opposed to a function, array,
* or class instance. Used to decide which extension namespaces to merge. */
function isPlainObject(value) {
	if (typeof value !== "object" || value === null) return false;
	const prototype = Object.getPrototypeOf(value);
	return prototype === Object.prototype || prototype === null;
}
/**
* Binds an action function to a `client`, returning a parameter-only version
* along with any helpers the action exposes. Helpers that need a client
* (`.call`, `.calls`, `.callWithPeriod`, `.estimateGas`, `.prepare`,
* `.prepareRecipient`, `.predict`, `.simulate`) are bound to `client`;
* pure helpers (`.extractEvent`, `.extractEvents`) are copied as-is. Used
* by decorators that attach namespaced actions to a Client.
* @internal
*/
function bindActionDecorators(client, action) {
	const wrapped = (parameters = {}) => action(client, parameters);
	for (const key of [
		"call",
		"calls",
		"callWithPeriod",
		"estimateGas",
		"prepare",
		"prepareRecipient",
		"predict",
		"simulate"
	]) if (Object.hasOwn(action, key)) {
		const helper = action[key];
		wrapped[key] = (args = {}) => {
			if (helper.length === 1) return helper(args);
			return helper(client, args);
		};
	}
	for (const key of ["extractEvent", "extractEvents"]) if (Object.hasOwn(action, key)) wrapped[key] = action[key];
	return wrapped;
}
//#endregion
//#region node_modules/viem/_esm/utils/siwe/parseSiweMessage.js
var siweDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;
function isValidSiweDateTime(value) {
	if (!siweDateTimeRegex.test(value)) return false;
	return !Number.isNaN(new Date(value).getTime());
}
function parseSiweDateTime(value) {
	if (!isValidSiweDateTime(value)) return /* @__PURE__ */ new Date(NaN);
	return new Date(value);
}
/**
* @description Parses EIP-4361 formatted message into message fields object.
*
* @see https://eips.ethereum.org/EIPS/eip-4361
*
* @returns EIP-4361 fields object
*/
function parseSiweMessage(message) {
	const prefixMatch = message.match(prefixRegex);
	const suffixMatch = message.match(suffixRegex);
	if (prefixMatch && suffixMatch) {
		const section = message.slice(message.indexOf("\n\n") + 2, suffixMatch.index).replace(/\n\n?$/, "");
		if (/[\r\n\u2028\u2029]/.test(section)) return {};
	}
	const { scheme, statement, ...prefix } = prefixMatch?.groups ?? {};
	const { chainId, expirationTime, issuedAt, notBefore, requestId, resources: resources_, ...suffix } = suffixMatch?.groups ?? {};
	const resources = resources_?.split("\n- ").slice(1);
	return {
		...prefix,
		...suffix,
		...chainId ? { chainId: Number(chainId) } : {},
		...expirationTime ? { expirationTime: parseSiweDateTime(expirationTime) } : {},
		...issuedAt ? { issuedAt: parseSiweDateTime(issuedAt) } : {},
		...notBefore ? { notBefore: parseSiweDateTime(notBefore) } : {},
		...requestId ? { requestId } : {},
		...resources ? { resources } : {},
		...scheme ? { scheme } : {},
		...statement ? { statement } : {}
	};
}
var prefixRegex = /^(?:(?<scheme>[a-zA-Z][a-zA-Z0-9+\-.]*):\/\/)?(?<domain>[a-zA-Z0-9+-.]*(?::[0-9]{1,5})?) (?:wants you to sign in with your Ethereum account:\n)(?<address>0x[a-fA-F0-9]{40})\n\n(?:(?<statement>.*)\n\n)?/;
var suffixRegex = /^(?:URI: (?<uri>.+))\n(?:Version: (?<version>.+))\n(?:Chain ID: (?<chainId>\d+))\n(?:Nonce: (?<nonce>[a-zA-Z0-9]+))\n(?:Issued At: (?<issuedAt>.+))(?:\nExpiration Time: (?<expirationTime>.+))?(?:\nNot Before: (?<notBefore>.+))?(?:\nRequest ID: (?<requestId>.*))?(?:\nResources:(?<resources>(?:\n- .+)*))?/m;
//#endregion
//#region node_modules/viem/_esm/utils/siwe/validateSiweMessage.js
/**
* @description Validates EIP-4361 message.
*
* @see https://eips.ethereum.org/EIPS/eip-4361
*/
function validateSiweMessage(parameters) {
	const { address, domain, message, nonce, scheme, time = /* @__PURE__ */ new Date() } = parameters;
	if (domain && message.domain !== domain) return false;
	if (nonce && message.nonce !== nonce) return false;
	if (scheme && (message.scheme ?? "https") !== scheme) return false;
	if (message.nonce !== void 0 && !nonceRegex.test(message.nonce)) return false;
	if (message.version !== void 0 && message.version !== "1") return false;
	if (Number.isNaN(time.getTime())) return false;
	if (message.expirationTime) {
		if (Number.isNaN(message.expirationTime.getTime())) return false;
		if (time >= message.expirationTime) return false;
	}
	if (message.notBefore) {
		if (Number.isNaN(message.notBefore.getTime())) return false;
		if (time < message.notBefore) return false;
	}
	try {
		if (!message.address) return false;
		if (!isAddress(message.address, { strict: false })) return false;
		if (address && !isAddressEqual(message.address, address)) return false;
	} catch {
		return false;
	}
	return true;
}
var nonceRegex = /^[a-zA-Z0-9]{8,}$/;
//#endregion
//#region node_modules/viem/_esm/actions/siwe/verifySiweMessage.js
/**
* Verifies [EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) formatted message was signed.
*
* Compatible with Smart Contract Accounts & Externally Owned Accounts via [ERC-6492](https://eips.ethereum.org/EIPS/eip-6492).
*
* - Docs {@link https://viem.sh/docs/siwe/actions/verifySiweMessage}
*
* @param client - Client to use.
* @param parameters - {@link VerifySiweMessageParameters}
* @returns Whether or not the signature is valid. {@link VerifySiweMessageReturnType}
*/
async function verifySiweMessage(client, parameters) {
	const { address, domain, message, nonce, scheme, signature, time = /* @__PURE__ */ new Date(), ...callRequest } = parameters;
	const parsed = parseSiweMessage(message);
	if (!parsed.address) return false;
	if (!validateSiweMessage({
		address,
		domain,
		message: parsed,
		nonce,
		scheme,
		time
	})) return false;
	const hash = hashMessage(message);
	return verifyHash(client, {
		address: parsed.address,
		hash,
		signature,
		...callRequest
	});
}
//#endregion
//#region node_modules/viem/_esm/clients/decorators/public.js
function publicActions(client) {
	return {
		call: (args) => call(client, args),
		createAccessList: (args) => createAccessList(client, args),
		createBlockFilter: () => createBlockFilter(client),
		createContractEventFilter: (args) => createContractEventFilter(client, args),
		createEventFilter: (args) => createEventFilter(client, args),
		createPendingTransactionFilter: () => createPendingTransactionFilter(client),
		estimateContractGas: (args) => estimateContractGas(client, args),
		estimateGas: (args) => estimateGas(client, args),
		getBalance: (args) => getBalance$1(client, args),
		getBlobBaseFee: () => getBlobBaseFee(client),
		getBlock: (args) => getBlock(client, args),
		getBlockNumber: (args) => getBlockNumber(client, args),
		getBlockReceipts: (args) => getBlockReceipts(client, args),
		getBlockTransactionCount: (args) => getBlockTransactionCount(client, args),
		getBytecode: (args) => getCode(client, args),
		getChainId: () => getChainId(client),
		getCode: (args) => getCode(client, args),
		getContractEvents: (args) => getContractEvents(client, args),
		getDelegation: (args) => getDelegation(client, args),
		getEip712Domain: (args) => getEip712Domain(client, args),
		getEnsAddress: (args) => getEnsAddress(client, args),
		getEnsAvatar: (args) => getEnsAvatar(client, args),
		getEnsName: (args) => getEnsName(client, args),
		getEnsResolver: (args) => getEnsResolver(client, args),
		getEnsText: (args) => getEnsText(client, args),
		getFeeHistory: (args) => getFeeHistory(client, args),
		estimateFeesPerGas: (args) => estimateFeesPerGas(client, args),
		getFilterChanges: (args) => getFilterChanges(client, args),
		getFilterLogs: (args) => getFilterLogs(client, args),
		getGasPrice: () => getGasPrice(client),
		getLogs: (args) => getLogs(client, args),
		getProof: (args) => getProof(client, args),
		estimateMaxPriorityFeePerGas: (args) => estimateMaxPriorityFeePerGas(client, args),
		fillTransaction: (args) => fillTransaction(client, args),
		getRawTransaction: (args) => getRawTransaction(client, args),
		getStorageAt: (args) => getStorageAt(client, args),
		getStorageValues: (args) => getStorageValues(client, args),
		getTransaction: (args) => getTransaction(client, args),
		getTransactionConfirmations: (args) => getTransactionConfirmations(client, args),
		getTransactionCount: (args) => getTransactionCount(client, args),
		getTransactionReceipt: (args) => getTransactionReceipt(client, args),
		iterateLogs: (args) => iterateLogs(client, args),
		multicall: (args) => multicall(client, args),
		prepareTransactionRequest: (args) => prepareTransactionRequest(client, args),
		readContract: (args) => readContract(client, args),
		sendRawTransaction: (args) => sendRawTransaction(client, args),
		sendRawTransactionSync: (args) => sendRawTransactionSync(client, args),
		simulate: (args) => simulateBlocks(client, args),
		simulateBlocks: (args) => simulateBlocks(client, args),
		simulateCalls: (args) => simulateCalls(client, args),
		simulateContract: (args) => simulateContract(client, args),
		verifyHash: (args) => verifyHash(client, args),
		verifyMessage: (args) => verifyMessage(client, args),
		verifySiweMessage: (args) => verifySiweMessage(client, args),
		verifyTypedData: (args) => verifyTypedData(client, args),
		uninstallFilter: (args) => uninstallFilter(client, args),
		waitForTransactionReceipt: (args) => waitForTransactionReceipt(client, args),
		watchBlockHeaders: (args) => watchBlockHeaders(client, args),
		watchBlocks: (args) => watchBlocks(client, args),
		watchBlockNumber: (args) => watchBlockNumber(client, args),
		watchContractEvent: (args) => watchContractEvent(client, args),
		watchEvent: (args) => watchEvent(client, args),
		watchPendingTransactions: (args) => watchPendingTransactions(client, args),
		token: bindPublicToken(client)
	};
}
/**
* Binds the read-only ERC-20 actions (and their `.call` helpers) to `client`.
* Merged with the write actions from {@link walletActions} (when present) by the
* Client's `extend`, which shallow-merges conflicting plain-object namespaces.
* @internal
*/
function bindPublicToken(client) {
	return {
		getAllowance: bindActionDecorators(client, getAllowance),
		getBalance: bindActionDecorators(client, getBalance),
		getMetadata: bindActionDecorators(client, getMetadata),
		getTotalSupply: bindActionDecorators(client, getTotalSupply)
	};
}
//#endregion
//#region node_modules/wagmi/node_modules/@wagmi/core/dist/esm/actions/getClient.js
function getClient(config, parameters = {}) {
	try {
		return config.getClient(parameters);
	} catch {
		return;
	}
}
//#endregion
//#region node_modules/wagmi/node_modules/@wagmi/core/dist/esm/actions/getPublicClient.js
function getPublicClient(config, parameters = {}) {
	return getClient(config, parameters)?.extend(publicActions);
}
//#endregion
//#region node_modules/wagmi/node_modules/@wagmi/core/dist/esm/errors/connector.js
var ProviderNotFoundError = class extends BaseError {
	constructor() {
		super("Provider not found.");
		Object.defineProperty(this, "name", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: "ProviderNotFoundError"
		});
	}
};
//#endregion
//#region node_modules/wagmi/node_modules/@wagmi/core/dist/esm/connectors/createConnector.js
function createConnector(createConnectorFn) {
	return createConnectorFn;
}
//#endregion
//#region node_modules/wagmi/node_modules/@wagmi/core/dist/esm/connectors/injected.js
injected.type = "injected";
function injected(parameters = {}) {
	const { shimDisconnect = true, unstable_shimAsyncInject } = parameters;
	function getTarget() {
		const target = parameters.target;
		if (typeof target === "function") {
			const result = target();
			if (result) return result;
		}
		if (typeof target === "object") return target;
		if (typeof target === "string") return { ...targetMap[target] ?? {
			id: target,
			name: `${target[0].toUpperCase()}${target.slice(1)}`,
			provider: `is${target[0].toUpperCase()}${target.slice(1)}`
		} };
		return {
			id: "injected",
			name: "Injected",
			provider(window) {
				return window?.ethereum;
			}
		};
	}
	let accountsChanged;
	let chainChanged;
	let connect;
	let disconnect;
	return createConnector((config) => ({
		get icon() {
			return getTarget().icon;
		},
		get id() {
			return getTarget().id;
		},
		get name() {
			return getTarget().name;
		},
		type: injected.type,
		async setup() {
			const provider = await this.getProvider();
			if (provider?.on && parameters.target) {
				if (!connect) {
					connect = this.onConnect.bind(this);
					provider.on("connect", connect);
				}
				if (!accountsChanged) {
					accountsChanged = this.onAccountsChanged.bind(this);
					provider.on("accountsChanged", accountsChanged);
				}
			}
		},
		async connect({ chainId, isReconnecting, withCapabilities } = {}) {
			const provider = await this.getProvider();
			if (!provider) throw new ProviderNotFoundError();
			let accounts = [];
			if (isReconnecting) accounts = await this.getAccounts().catch(() => []);
			else if (shimDisconnect) try {
				accounts = (await provider.request({
					method: "wallet_requestPermissions",
					params: [{ eth_accounts: {} }]
				}))[0]?.caveats?.[0]?.value?.map((x) => getAddress(x));
				if (accounts.length > 0) accounts = await this.getAccounts();
			} catch (err) {
				const error = err;
				if (error.code === UserRejectedRequestError.code) throw new UserRejectedRequestError(error);
				if (error.code === ResourceUnavailableRpcError.code) throw error;
			}
			try {
				if (!accounts?.length && !isReconnecting) accounts = (await provider.request({ method: "eth_requestAccounts" })).map((x) => getAddress(x));
				if (connect) {
					provider.removeListener("connect", connect);
					connect = void 0;
				}
				if (!accountsChanged) {
					accountsChanged = this.onAccountsChanged.bind(this);
					provider.on("accountsChanged", accountsChanged);
				}
				if (!chainChanged) {
					chainChanged = this.onChainChanged.bind(this);
					provider.on("chainChanged", chainChanged);
				}
				if (!disconnect) {
					disconnect = this.onDisconnect.bind(this);
					provider.on("disconnect", disconnect);
				}
				let currentChainId = await this.getChainId();
				if (chainId && currentChainId !== chainId) currentChainId = (await this.switchChain({ chainId }).catch((error) => {
					if (error.code === UserRejectedRequestError.code) throw error;
					return { id: currentChainId };
				}))?.id ?? currentChainId;
				if (shimDisconnect) await config.storage?.removeItem(`${this.id}.disconnected`);
				if (!parameters.target) await config.storage?.setItem("injected.connected", true);
				return {
					accounts: withCapabilities ? accounts.map((address) => ({
						address,
						capabilities: {}
					})) : accounts,
					chainId: currentChainId
				};
			} catch (err) {
				const error = err;
				if (error.code === UserRejectedRequestError.code) throw new UserRejectedRequestError(error);
				if (error.code === ResourceUnavailableRpcError.code) throw new ResourceUnavailableRpcError(error);
				throw error;
			}
		},
		async disconnect() {
			const provider = await this.getProvider();
			if (!provider) throw new ProviderNotFoundError();
			if (chainChanged) {
				provider.removeListener("chainChanged", chainChanged);
				chainChanged = void 0;
			}
			if (disconnect) {
				provider.removeListener("disconnect", disconnect);
				disconnect = void 0;
			}
			if (!connect) {
				connect = this.onConnect.bind(this);
				provider.on("connect", connect);
			}
			try {
				await withTimeout(() => provider.request({
					method: "wallet_revokePermissions",
					params: [{ eth_accounts: {} }]
				}), { timeout: 100 });
			} catch {}
			if (shimDisconnect) await config.storage?.setItem(`${this.id}.disconnected`, true);
			if (!parameters.target) await config.storage?.removeItem("injected.connected");
		},
		async getAccounts() {
			const provider = await this.getProvider();
			if (!provider) throw new ProviderNotFoundError();
			return (await provider.request({ method: "eth_accounts" })).map((x) => getAddress(x));
		},
		async getChainId() {
			const provider = await this.getProvider();
			if (!provider) throw new ProviderNotFoundError();
			const hexChainId = await provider.request({ method: "eth_chainId" });
			return Number(hexChainId);
		},
		async getProvider() {
			if (typeof window === "undefined") return void 0;
			let provider;
			const target = getTarget();
			if (typeof target.provider === "function") provider = target.provider(window);
			else if (typeof target.provider === "string") provider = findProvider(window, target.provider);
			else provider = target.provider;
			if (provider && !provider.removeListener) {
				if ("off" in provider && typeof provider.off === "function") provider.removeListener = provider.off;
				else provider.removeListener = () => {};
			}
			return provider;
		},
		async isAuthorized() {
			try {
				if (shimDisconnect && await config.storage?.getItem(`${this.id}.disconnected`)) return false;
				if (!parameters.target) {
					if (!await config.storage?.getItem("injected.connected")) return false;
				}
				if (!await this.getProvider()) {
					if (unstable_shimAsyncInject !== void 0 && unstable_shimAsyncInject !== false) {
						const handleEthereum = async () => {
							if (typeof window !== "undefined") window.removeEventListener("ethereum#initialized", handleEthereum);
							return !!await this.getProvider();
						};
						const timeout = typeof unstable_shimAsyncInject === "number" ? unstable_shimAsyncInject : 1e3;
						if (await Promise.race([...typeof window !== "undefined" ? [new Promise((resolve) => window.addEventListener("ethereum#initialized", () => resolve(handleEthereum()), { once: true }))] : [], new Promise((resolve) => setTimeout(() => resolve(handleEthereum()), timeout))])) return true;
					}
					throw new ProviderNotFoundError();
				}
				return !!(await withRetry(() => this.getAccounts())).length;
			} catch {
				return false;
			}
		},
		async switchChain({ addEthereumChainParameter, chainId }) {
			const provider = await this.getProvider();
			if (!provider) throw new ProviderNotFoundError();
			const chain = config.chains.find((x) => x.id === chainId);
			if (!chain) throw new SwitchChainError(new ChainNotConfiguredError());
			const promise = new Promise((resolve) => {
				const listener = ((data) => {
					if ("chainId" in data && data.chainId === chainId) {
						config.emitter.off("change", listener);
						resolve();
					}
				});
				config.emitter.on("change", listener);
			});
			try {
				await Promise.all([provider.request({
					method: "wallet_switchEthereumChain",
					params: [{ chainId: numberToHex(chainId) }]
				}).then(async () => {
					if (await this.getChainId() === chainId) config.emitter.emit("change", { chainId });
				}), promise]);
				return chain;
			} catch (err) {
				const error = err;
				if (error.code === 4902 || error?.data?.originalError?.code === 4902) try {
					const { default: blockExplorer, ...blockExplorers } = chain.blockExplorers ?? {};
					let blockExplorerUrls;
					if (addEthereumChainParameter?.blockExplorerUrls) blockExplorerUrls = addEthereumChainParameter.blockExplorerUrls;
					else if (blockExplorer) blockExplorerUrls = [blockExplorer.url, ...Object.values(blockExplorers).map((x) => x.url)];
					let rpcUrls;
					if (addEthereumChainParameter?.rpcUrls?.length) rpcUrls = addEthereumChainParameter.rpcUrls;
					else rpcUrls = [chain.rpcUrls.default?.http[0] ?? ""];
					const addEthereumChain = {
						blockExplorerUrls,
						chainId: numberToHex(chainId),
						chainName: addEthereumChainParameter?.chainName ?? chain.name,
						iconUrls: addEthereumChainParameter?.iconUrls,
						nativeCurrency: addEthereumChainParameter?.nativeCurrency ?? chain.nativeCurrency,
						rpcUrls
					};
					await Promise.all([provider.request({
						method: "wallet_addEthereumChain",
						params: [addEthereumChain]
					}).then(async () => {
						if (await this.getChainId() === chainId) config.emitter.emit("change", { chainId });
						else throw new UserRejectedRequestError(/* @__PURE__ */ new Error("User rejected switch after adding network."));
					}), promise]);
					return chain;
				} catch (error) {
					throw new UserRejectedRequestError(error);
				}
				if (error.code === UserRejectedRequestError.code) throw new UserRejectedRequestError(error);
				throw new SwitchChainError(error);
			}
		},
		async onAccountsChanged(accounts) {
			if (accounts.length === 0) this.onDisconnect();
			else if (config.emitter.listenerCount("connect")) {
				const chainId = (await this.getChainId()).toString();
				this.onConnect({ chainId });
				if (shimDisconnect) await config.storage?.removeItem(`${this.id}.disconnected`);
			} else config.emitter.emit("change", { accounts: accounts.map((x) => getAddress(x)) });
		},
		onChainChanged(chain) {
			const chainId = Number(chain);
			config.emitter.emit("change", { chainId });
		},
		async onConnect(connectInfo) {
			const accounts = await this.getAccounts();
			if (accounts.length === 0) return;
			const chainId = Number(connectInfo.chainId);
			config.emitter.emit("connect", {
				accounts,
				chainId
			});
			const provider = await this.getProvider();
			if (provider) {
				if (connect) {
					provider.removeListener("connect", connect);
					connect = void 0;
				}
				if (!accountsChanged) {
					accountsChanged = this.onAccountsChanged.bind(this);
					provider.on("accountsChanged", accountsChanged);
				}
				if (!chainChanged) {
					chainChanged = this.onChainChanged.bind(this);
					provider.on("chainChanged", chainChanged);
				}
				if (!disconnect) {
					disconnect = this.onDisconnect.bind(this);
					provider.on("disconnect", disconnect);
				}
			}
		},
		async onDisconnect(error) {
			const provider = await this.getProvider();
			if (error && error.code === 1013) {
				if (provider && !!(await this.getAccounts()).length) return;
			}
			config.emitter.emit("disconnect");
			if (provider) {
				if (chainChanged) {
					provider.removeListener("chainChanged", chainChanged);
					chainChanged = void 0;
				}
				if (disconnect) {
					provider.removeListener("disconnect", disconnect);
					disconnect = void 0;
				}
				if (!connect) {
					connect = this.onConnect.bind(this);
					provider.on("connect", connect);
				}
			}
		}
	}));
}
var targetMap = {
	coinbaseWallet: {
		id: "coinbaseWallet",
		name: "Coinbase Wallet",
		provider(window) {
			if (window?.coinbaseWalletExtension) return window.coinbaseWalletExtension;
			return findProvider(window, "isCoinbaseWallet");
		}
	},
	metaMask: {
		id: "metaMask",
		name: "MetaMask",
		provider(window) {
			return findProvider(window, (provider) => {
				if (!provider.isMetaMask) return false;
				if (provider.isBraveWallet && !provider._events && !provider._state) return false;
				for (const flag of [
					"isApexWallet",
					"isAvalanche",
					"isBitKeep",
					"isBlockWallet",
					"isKuCoinWallet",
					"isMathWallet",
					"isOkxWallet",
					"isOKExWallet",
					"isOneInchIOSWallet",
					"isOneInchAndroidWallet",
					"isOpera",
					"isPhantom",
					"isPortal",
					"isRabby",
					"isTokenPocket",
					"isTokenary",
					"isUniswapWallet",
					"isZerion"
				]) if (provider[flag]) return false;
				return true;
			});
		}
	},
	phantom: {
		id: "phantom",
		name: "Phantom",
		provider(window) {
			if (window?.phantom?.ethereum) return window.phantom?.ethereum;
			return findProvider(window, "isPhantom");
		}
	}
};
function findProvider(window, select) {
	function isProvider(provider) {
		if (typeof select === "function") return select(provider);
		if (typeof select === "string") return provider[select];
		return true;
	}
	const ethereum = window.ethereum;
	if (ethereum?.providers) return ethereum.providers.find((provider) => isProvider(provider));
	if (ethereum && isProvider(ethereum)) return ethereum;
}
//#endregion
//#region node_modules/mipd/dist/esm/utils.js
/**
* Watches for EIP-1193 Providers to be announced.
*/
function requestProviders(listener) {
	if (typeof window === "undefined") return;
	const handler = (event) => listener(event.detail);
	window.addEventListener("eip6963:announceProvider", handler);
	window.dispatchEvent(new CustomEvent("eip6963:requestProvider"));
	return () => window.removeEventListener("eip6963:announceProvider", handler);
}
//#endregion
//#region node_modules/mipd/dist/esm/store.js
function createStore$1() {
	const listeners = /* @__PURE__ */ new Set();
	let providerDetails = [];
	const request = () => requestProviders((providerDetail) => {
		if (providerDetails.some(({ info }) => info.uuid === providerDetail.info.uuid)) return;
		providerDetails = [...providerDetails, providerDetail];
		listeners.forEach((listener) => listener(providerDetails, { added: [providerDetail] }));
	});
	let unwatch = request();
	return {
		_listeners() {
			return listeners;
		},
		clear() {
			listeners.forEach((listener) => listener([], { removed: [...providerDetails] }));
			providerDetails = [];
		},
		destroy() {
			this.clear();
			listeners.clear();
			unwatch?.();
		},
		findProvider({ rdns }) {
			return providerDetails.find((providerDetail) => providerDetail.info.rdns === rdns);
		},
		getProviders() {
			return providerDetails;
		},
		reset() {
			this.clear();
			unwatch?.();
			unwatch = request();
		},
		subscribe(listener, { emitImmediately } = {}) {
			listeners.add(listener);
			if (emitImmediately) listener(providerDetails, { added: providerDetails });
			return () => listeners.delete(listener);
		}
	};
}
//#endregion
//#region node_modules/wagmi/node_modules/zustand/esm/middleware.mjs
var subscribeWithSelectorImpl = (fn) => (set, get, api) => {
	const origSubscribe = api.subscribe;
	api.subscribe = (selector, optListener, options) => {
		let listener = selector;
		if (optListener) {
			const equalityFn = (options == null ? void 0 : options.equalityFn) || Object.is;
			let currentSlice = selector(api.getState());
			listener = (state) => {
				const nextSlice = selector(state);
				if (!equalityFn(currentSlice, nextSlice)) {
					const previousSlice = currentSlice;
					optListener(currentSlice = nextSlice, previousSlice);
				}
			};
			if (options == null ? void 0 : options.fireImmediately) optListener(currentSlice, currentSlice);
		}
		return origSubscribe(listener);
	};
	return fn(set, get, api);
};
var subscribeWithSelector = subscribeWithSelectorImpl;
function createJSONStorage(getStorage, options) {
	let storage;
	try {
		storage = getStorage();
	} catch (e) {
		return;
	}
	return {
		getItem: (name) => {
			var _a;
			const parse = (str2) => {
				if (str2 === null) return null;
				return JSON.parse(str2, options == null ? void 0 : options.reviver);
			};
			const str = (_a = storage.getItem(name)) != null ? _a : null;
			if (str instanceof Promise) return str.then(parse);
			return parse(str);
		},
		setItem: (name, newValue) => storage.setItem(name, JSON.stringify(newValue, options == null ? void 0 : options.replacer)),
		removeItem: (name) => storage.removeItem(name)
	};
}
var toThenable = (fn) => (input) => {
	try {
		const result = fn(input);
		if (result instanceof Promise) return result;
		return {
			then(onFulfilled) {
				return toThenable(onFulfilled)(result);
			},
			catch(_onRejected) {
				return this;
			}
		};
	} catch (e) {
		return {
			then(_onFulfilled) {
				return this;
			},
			catch(onRejected) {
				return toThenable(onRejected)(e);
			}
		};
	}
};
var persistImpl = (config, baseOptions) => (set, get, api) => {
	let options = {
		storage: createJSONStorage(() => localStorage),
		partialize: (state) => state,
		version: 0,
		merge: (persistedState, currentState) => ({
			...currentState,
			...persistedState
		}),
		...baseOptions
	};
	let hasHydrated = false;
	const hydrationListeners = /* @__PURE__ */ new Set();
	const finishHydrationListeners = /* @__PURE__ */ new Set();
	let storage = options.storage;
	if (!storage) return config((...args) => {
		console.warn(`[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`);
		set(...args);
	}, get, api);
	const setItem = () => {
		const state = options.partialize({ ...get() });
		return storage.setItem(options.name, {
			state,
			version: options.version
		});
	};
	const savedSetState = api.setState;
	api.setState = (state, replace) => {
		savedSetState(state, replace);
		setItem();
	};
	const configResult = config((...args) => {
		set(...args);
		setItem();
	}, get, api);
	api.getInitialState = () => configResult;
	let stateFromStorage;
	const hydrate = () => {
		var _a, _b;
		if (!storage) return;
		hasHydrated = false;
		hydrationListeners.forEach((cb) => {
			var _a2;
			return cb((_a2 = get()) != null ? _a2 : configResult);
		});
		const postRehydrationCallback = ((_b = options.onRehydrateStorage) == null ? void 0 : _b.call(options, (_a = get()) != null ? _a : configResult)) || void 0;
		return toThenable(storage.getItem.bind(storage))(options.name).then((deserializedStorageValue) => {
			if (deserializedStorageValue) {
				if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
					if (options.migrate) return [true, options.migrate(deserializedStorageValue.state, deserializedStorageValue.version)];
					console.error(`State loaded from storage couldn't be migrated since no migrate function was provided`);
				} else return [false, deserializedStorageValue.state];
			}
			return [false, void 0];
		}).then((migrationResult) => {
			var _a2;
			const [migrated, migratedState] = migrationResult;
			stateFromStorage = options.merge(migratedState, (_a2 = get()) != null ? _a2 : configResult);
			set(stateFromStorage, true);
			if (migrated) return setItem();
		}).then(() => {
			postRehydrationCallback?.(stateFromStorage, void 0);
			stateFromStorage = get();
			hasHydrated = true;
			finishHydrationListeners.forEach((cb) => cb(stateFromStorage));
		}).catch((e) => {
			postRehydrationCallback?.(void 0, e);
		});
	};
	api.persist = {
		setOptions: (newOptions) => {
			options = {
				...options,
				...newOptions
			};
			if (newOptions.storage) storage = newOptions.storage;
		},
		clearStorage: () => {
			storage?.removeItem(options.name);
		},
		getOptions: () => options,
		rehydrate: () => hydrate(),
		hasHydrated: () => hasHydrated,
		onHydrate: (cb) => {
			hydrationListeners.add(cb);
			return () => {
				hydrationListeners.delete(cb);
			};
		},
		onFinishHydration: (cb) => {
			finishHydrationListeners.add(cb);
			return () => {
				finishHydrationListeners.delete(cb);
			};
		}
	};
	if (!options.skipHydration) hydrate();
	return stateFromStorage || configResult;
};
var persist = persistImpl;
//#endregion
//#region node_modules/wagmi/node_modules/zustand/esm/vanilla.mjs
var createStoreImpl = (createState) => {
	let state;
	const listeners = /* @__PURE__ */ new Set();
	const setState = (partial, replace) => {
		const nextState = typeof partial === "function" ? partial(state) : partial;
		if (!Object.is(nextState, state)) {
			const previousState = state;
			state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
			listeners.forEach((listener) => listener(state, previousState));
		}
	};
	const getState = () => state;
	const getInitialState = () => initialState;
	const subscribe = (listener) => {
		listeners.add(listener);
		return () => listeners.delete(listener);
	};
	const api = {
		setState,
		getState,
		getInitialState,
		subscribe
	};
	const initialState = state = createState(setState, getState, api);
	return api;
};
var createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
//#endregion
//#region node_modules/wagmi/node_modules/eventemitter3/index.mjs
var import_eventemitter3 = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	var has = Object.prototype.hasOwnProperty;
	var prefix = "~";
	/**
	* Constructor to create a storage for our `EE` objects.
	* An `Events` instance is a plain object whose properties are event names.
	*
	* @constructor
	* @private
	*/
	function Events() {}
	if (Object.create) {
		Events.prototype = Object.create(null);
		if (!new Events().__proto__) prefix = false;
	}
	/**
	* Representation of a single event listener.
	*
	* @param {Function} fn The listener function.
	* @param {*} context The context to invoke the listener with.
	* @param {Boolean} [once=false] Specify if the listener is a one-time listener.
	* @constructor
	* @private
	*/
	function EE(fn, context, once) {
		this.fn = fn;
		this.context = context;
		this.once = once || false;
	}
	/**
	* Add a listener for a given event.
	*
	* @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
	* @param {(String|Symbol)} event The event name.
	* @param {Function} fn The listener function.
	* @param {*} context The context to invoke the listener with.
	* @param {Boolean} once Specify if the listener is a one-time listener.
	* @returns {EventEmitter}
	* @private
	*/
	function addListener(emitter, event, fn, context, once) {
		if (typeof fn !== "function") throw new TypeError("The listener must be a function");
		var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
		if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
		else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
		else emitter._events[evt] = [emitter._events[evt], listener];
		return emitter;
	}
	/**
	* Clear event by name.
	*
	* @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
	* @param {(String|Symbol)} evt The Event name.
	* @private
	*/
	function clearEvent(emitter, evt) {
		if (--emitter._eventsCount === 0) emitter._events = new Events();
		else delete emitter._events[evt];
	}
	/**
	* Minimal `EventEmitter` interface that is molded against the Node.js
	* `EventEmitter` interface.
	*
	* @constructor
	* @public
	*/
	function EventEmitter() {
		this._events = new Events();
		this._eventsCount = 0;
	}
	/**
	* Return an array listing the events for which the emitter has registered
	* listeners.
	*
	* @returns {Array}
	* @public
	*/
	EventEmitter.prototype.eventNames = function eventNames() {
		var names = [], events, name;
		if (this._eventsCount === 0) return names;
		for (name in events = this._events) if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
		if (Object.getOwnPropertySymbols) return names.concat(Object.getOwnPropertySymbols(events));
		return names;
	};
	/**
	* Return the listeners registered for a given event.
	*
	* @param {(String|Symbol)} event The event name.
	* @returns {Array} The registered listeners.
	* @public
	*/
	EventEmitter.prototype.listeners = function listeners(event) {
		var evt = prefix ? prefix + event : event, handlers = this._events[evt];
		if (!handlers) return [];
		if (handlers.fn) return [handlers.fn];
		for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) ee[i] = handlers[i].fn;
		return ee;
	};
	/**
	* Return the number of listeners listening to a given event.
	*
	* @param {(String|Symbol)} event The event name.
	* @returns {Number} The number of listeners.
	* @public
	*/
	EventEmitter.prototype.listenerCount = function listenerCount(event) {
		var evt = prefix ? prefix + event : event, listeners = this._events[evt];
		if (!listeners) return 0;
		if (listeners.fn) return 1;
		return listeners.length;
	};
	/**
	* Calls each of the listeners registered for a given event.
	*
	* @param {(String|Symbol)} event The event name.
	* @returns {Boolean} `true` if the event had listeners, else `false`.
	* @public
	*/
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
		var evt = prefix ? prefix + event : event;
		if (!this._events[evt]) return false;
		var listeners = this._events[evt], len = arguments.length, args, i;
		if (listeners.fn) {
			if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
			switch (len) {
				case 1: return listeners.fn.call(listeners.context), true;
				case 2: return listeners.fn.call(listeners.context, a1), true;
				case 3: return listeners.fn.call(listeners.context, a1, a2), true;
				case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
				case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
				case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
			}
			for (i = 1, args = new Array(len - 1); i < len; i++) args[i - 1] = arguments[i];
			listeners.fn.apply(listeners.context, args);
		} else {
			var length = listeners.length, j;
			for (i = 0; i < length; i++) {
				if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
				switch (len) {
					case 1:
						listeners[i].fn.call(listeners[i].context);
						break;
					case 2:
						listeners[i].fn.call(listeners[i].context, a1);
						break;
					case 3:
						listeners[i].fn.call(listeners[i].context, a1, a2);
						break;
					case 4:
						listeners[i].fn.call(listeners[i].context, a1, a2, a3);
						break;
					default:
						if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) args[j - 1] = arguments[j];
						listeners[i].fn.apply(listeners[i].context, args);
				}
			}
		}
		return true;
	};
	/**
	* Add a listener for a given event.
	*
	* @param {(String|Symbol)} event The event name.
	* @param {Function} fn The listener function.
	* @param {*} [context=this] The context to invoke the listener with.
	* @returns {EventEmitter} `this`.
	* @public
	*/
	EventEmitter.prototype.on = function on(event, fn, context) {
		return addListener(this, event, fn, context, false);
	};
	/**
	* Add a one-time listener for a given event.
	*
	* @param {(String|Symbol)} event The event name.
	* @param {Function} fn The listener function.
	* @param {*} [context=this] The context to invoke the listener with.
	* @returns {EventEmitter} `this`.
	* @public
	*/
	EventEmitter.prototype.once = function once(event, fn, context) {
		return addListener(this, event, fn, context, true);
	};
	/**
	* Remove the listeners of a given event.
	*
	* @param {(String|Symbol)} event The event name.
	* @param {Function} fn Only remove the listeners that match this function.
	* @param {*} context Only remove the listeners that have this context.
	* @param {Boolean} once Only remove one-time listeners.
	* @returns {EventEmitter} `this`.
	* @public
	*/
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
		var evt = prefix ? prefix + event : event;
		if (!this._events[evt]) return this;
		if (!fn) {
			clearEvent(this, evt);
			return this;
		}
		var listeners = this._events[evt];
		if (listeners.fn) {
			if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) clearEvent(this, evt);
		} else {
			for (var i = 0, events = [], length = listeners.length; i < length; i++) if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) events.push(listeners[i]);
			if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
			else clearEvent(this, evt);
		}
		return this;
	};
	/**
	* Remove all listeners, or those of the specified event.
	*
	* @param {(String|Symbol)} [event] The event name.
	* @returns {EventEmitter} `this`.
	* @public
	*/
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
		var evt;
		if (event) {
			evt = prefix ? prefix + event : event;
			if (this._events[evt]) clearEvent(this, evt);
		} else {
			this._events = new Events();
			this._eventsCount = 0;
		}
		return this;
	};
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;
	EventEmitter.prefixed = prefix;
	EventEmitter.EventEmitter = EventEmitter;
	if ("undefined" !== typeof module) module.exports = EventEmitter;
})))(), 1);
//#endregion
//#region node_modules/wagmi/node_modules/@wagmi/core/dist/esm/createEmitter.js
var Emitter = class {
	constructor(uid) {
		Object.defineProperty(this, "uid", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: uid
		});
		Object.defineProperty(this, "_emitter", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: new import_eventemitter3.default()
		});
	}
	on(eventName, fn) {
		this._emitter.on(eventName, fn);
	}
	once(eventName, fn) {
		this._emitter.once(eventName, fn);
	}
	off(eventName, fn) {
		this._emitter.off(eventName, fn);
	}
	emit(eventName, ...params) {
		const data = params[0];
		this._emitter.emit(eventName, {
			uid: this.uid,
			...data
		});
	}
	listenerCount(eventName) {
		return this._emitter.listenerCount(eventName);
	}
};
function createEmitter(uid) {
	return new Emitter(uid);
}
//#endregion
//#region node_modules/wagmi/node_modules/@wagmi/core/dist/esm/utils/deserialize.js
function deserialize(value, reviver) {
	return JSON.parse(value, (key, value_) => {
		let value = value_;
		if (value?.__type === "bigint") value = BigInt(value.value);
		if (value?.__type === "Map") value = new Map(value.value);
		return reviver?.(key, value) ?? value;
	});
}
//#endregion
//#region node_modules/wagmi/node_modules/@wagmi/core/dist/esm/utils/serialize.js
/**
* Get the reference key for the circular value
*
* @param keys the keys to build the reference key from
* @param cutoff the maximum number of keys to include
* @returns the reference key
*/
function getReferenceKey(keys, cutoff) {
	return keys.slice(0, cutoff).join(".") || ".";
}
/**
* Faster `Array.prototype.indexOf` implementation build for slicing / splicing
*
* @param array the array to match the value in
* @param value the value to match
* @returns the matching index, or -1
*/
function getCutoff(array, value) {
	const { length } = array;
	for (let index = 0; index < length; ++index) if (array[index] === value) return index + 1;
	return 0;
}
/**
* Create a replacer method that handles circular values
*
* @param [replacer] a custom replacer to use for non-circular values
* @param [circularReplacer] a custom replacer to use for circular methods
* @returns the value to stringify
*/
function createReplacer(replacer, circularReplacer) {
	const hasReplacer = typeof replacer === "function";
	const hasCircularReplacer = typeof circularReplacer === "function";
	const cache = [];
	const keys = [];
	return function replace(key, value) {
		if (typeof value === "object") {
			if (cache.length) {
				const thisCutoff = getCutoff(cache, this);
				if (thisCutoff === 0) cache[cache.length] = this;
				else {
					cache.splice(thisCutoff);
					keys.splice(thisCutoff);
				}
				keys[keys.length] = key;
				const valueCutoff = getCutoff(cache, value);
				if (valueCutoff !== 0) return hasCircularReplacer ? circularReplacer.call(this, key, value, getReferenceKey(keys, valueCutoff)) : `[ref=${getReferenceKey(keys, valueCutoff)}]`;
			} else {
				cache[0] = value;
				keys[0] = key;
			}
		}
		return hasReplacer ? replacer.call(this, key, value) : value;
	};
}
/**
* Stringifier that handles circular values
*
* Forked from https://github.com/planttheidea/fast-stringify
*
* @param value to stringify
* @param [replacer] a custom replacer function for handling standard values
* @param [indent] the number of spaces to indent the output by
* @param [circularReplacer] a custom replacer function for handling circular values
* @returns the stringified output
*/
function serialize(value, replacer, indent, circularReplacer) {
	return JSON.stringify(value, createReplacer((key, value_) => {
		let value = value_;
		if (typeof value === "bigint") value = {
			__type: "bigint",
			value: value_.toString()
		};
		if (value instanceof Map) value = {
			__type: "Map",
			value: Array.from(value_.entries())
		};
		return replacer?.(key, value) ?? value;
	}, circularReplacer), indent ?? void 0);
}
//#endregion
//#region node_modules/wagmi/node_modules/@wagmi/core/dist/esm/createStorage.js
function createStorage(parameters) {
	const { deserialize: deserialize$1 = deserialize, key: prefix = "wagmi", serialize: serialize$1 = serialize, storage = noopStorage } = parameters;
	function unwrap(value) {
		if (value instanceof Promise) return value.then((x) => x).catch(() => null);
		return value;
	}
	return {
		...storage,
		key: prefix,
		async getItem(key, defaultValue) {
			const unwrapped = await unwrap(storage.getItem(`${prefix}.${key}`));
			if (unwrapped) return deserialize$1(unwrapped) ?? null;
			return defaultValue ?? null;
		},
		async setItem(key, value) {
			const storageKey = `${prefix}.${key}`;
			if (value === null) await unwrap(storage.removeItem(storageKey));
			else await unwrap(storage.setItem(storageKey, serialize$1(value)));
		},
		async removeItem(key) {
			await unwrap(storage.removeItem(`${prefix}.${key}`));
		}
	};
}
var noopStorage = {
	getItem: () => null,
	setItem: () => {},
	removeItem: () => {}
};
function getDefaultStorage() {
	const storage = (() => {
		if (typeof window !== "undefined" && window.localStorage) return window.localStorage;
		return noopStorage;
	})();
	return {
		getItem(key) {
			return storage.getItem(key);
		},
		removeItem(key) {
			storage.removeItem(key);
		},
		setItem(key, value) {
			try {
				storage.setItem(key, value);
			} catch {}
		}
	};
}
//#endregion
//#region node_modules/wagmi/node_modules/@wagmi/core/dist/esm/utils/uid.js
var size = 256;
var index = size;
var buffer;
function uid(length = 11) {
	if (!buffer || index + length > size * 2) {
		buffer = "";
		index = 0;
		for (let i = 0; i < size; i++) buffer += (256 + Math.random() * 256 | 0).toString(16).substring(1);
	}
	return buffer.substring(index, index++ + length);
}
//#endregion
//#region node_modules/wagmi/node_modules/@wagmi/core/dist/esm/createConfig.js
function createConfig(parameters) {
	const { multiInjectedProviderDiscovery = true, storage = createStorage({ storage: getDefaultStorage() }), syncConnectedChain = true, ssr = false, ...rest } = parameters;
	const mipd = typeof window !== "undefined" && multiInjectedProviderDiscovery ? createStore$1() : void 0;
	const chains = createStore(() => rest.chains);
	const connectors = createStore(() => {
		const collection = [];
		const rdnsSet = /* @__PURE__ */ new Set();
		for (const connectorFns of rest.connectors ?? []) {
			const connector = setup(connectorFns);
			collection.push(connector);
			if (!ssr && connector.rdns) {
				const rdnsValues = typeof connector.rdns === "string" ? [connector.rdns] : connector.rdns;
				for (const rdns of rdnsValues) rdnsSet.add(rdns);
			}
		}
		if (!ssr && mipd) {
			const providers = mipd.getProviders();
			for (const provider of providers) {
				if (rdnsSet.has(provider.info.rdns)) continue;
				collection.push(setup(providerDetailToConnector(provider)));
			}
		}
		return collection;
	});
	function setup(connectorFn) {
		const emitter = createEmitter(uid());
		let rdns;
		const connector = {
			...connectorFn({
				emitter,
				chains: chains.getState(),
				get providers() {
					if (!mipd || !rdns) return [];
					const rdnsValues = typeof rdns === "string" ? [rdns] : rdns;
					const providers = mipd.getProviders();
					return rdnsValues.flatMap((rdns) => providers.filter((provider) => provider.info.rdns === rdns));
				},
				storage,
				transports: rest.transports
			}),
			emitter,
			uid: emitter.uid
		};
		rdns = connector.rdns;
		emitter.on("connect", connect);
		connector.setup?.();
		return connector;
	}
	function providerDetailToConnector(providerDetail) {
		const { info } = providerDetail;
		const provider = providerDetail.provider;
		return injected({ target: {
			...info,
			id: info.rdns,
			provider
		} });
	}
	const clients = /* @__PURE__ */ new Map();
	function getClient(config = {}) {
		const chainId = config.chainId ?? store.getState().chainId;
		const chain = chains.getState().find((x) => x.id === chainId);
		if (config.chainId && !chain) throw new ChainNotConfiguredError();
		{
			const client = clients.get(store.getState().chainId);
			if (client && !chain) return client;
			if (!chain) throw new ChainNotConfiguredError();
		}
		{
			const client = clients.get(chainId);
			if (client) return client;
		}
		let client;
		if (rest.client) client = rest.client({ chain });
		else {
			const chainId = chain.id;
			const chainIds = chains.getState().map((x) => x.id);
			const properties = {};
			const entries = Object.entries(rest);
			for (const [key, value] of entries) {
				if (key === "chains" || key === "client" || key === "connectors" || key === "transports") continue;
				if (typeof value === "object") {
					if (chainId in value) properties[key] = value[chainId];
					else {
						if (chainIds.some((x) => x in value)) continue;
						properties[key] = value;
					}
				} else properties[key] = value;
			}
			client = createClient({
				...properties,
				chain,
				batch: properties.batch ?? { multicall: true },
				transport: (parameters) => rest.transports[chainId]({
					...parameters,
					connectors
				})
			});
		}
		clients.set(chainId, client);
		return client;
	}
	function getInitialState() {
		return {
			chainId: chains.getState()[0].id,
			connections: /* @__PURE__ */ new Map(),
			current: null,
			status: "disconnected"
		};
	}
	let currentVersion;
	const prefix = "0.0.0-canary-";
	if ("3.6.9".startsWith(prefix)) currentVersion = Number.parseInt(version.replace(prefix, ""), 10);
	else currentVersion = Number.parseInt("3.6.9".split(".")[0] ?? "0", 10);
	const store = createStore(subscribeWithSelector(storage ? persist(getInitialState, {
		migrate(persistedState, version) {
			if (version === currentVersion) return persistedState;
			const initialState = getInitialState();
			const chainId = validatePersistedChainId(persistedState, initialState.chainId);
			return {
				...initialState,
				chainId
			};
		},
		name: "store",
		partialize(state) {
			return {
				connections: {
					__type: "Map",
					value: Array.from(state.connections.entries()).map(([key, connection]) => {
						const { id, name, type, uid } = connection.connector;
						const connector = {
							id,
							name,
							type,
							uid
						};
						return [key, {
							...connection,
							connector
						}];
					})
				},
				chainId: state.chainId,
				current: state.current
			};
		},
		merge(persistedState, currentState) {
			if (typeof persistedState === "object" && persistedState && "status" in persistedState) delete persistedState.status;
			const chainId = validatePersistedChainId(persistedState, currentState.chainId);
			return {
				...currentState,
				...persistedState,
				chainId
			};
		},
		skipHydration: ssr,
		storage,
		version: currentVersion
	}) : getInitialState));
	store.setState(getInitialState());
	function validatePersistedChainId(persistedState, defaultChainId) {
		return persistedState && typeof persistedState === "object" && "chainId" in persistedState && typeof persistedState.chainId === "number" && chains.getState().some((x) => x.id === persistedState.chainId) ? persistedState.chainId : defaultChainId;
	}
	if (syncConnectedChain) store.subscribe(({ connections, current }) => current ? connections.get(current)?.chainId : void 0, (chainId) => {
		if (!chains.getState().some((x) => x.id === chainId)) return;
		return store.setState((x) => ({
			...x,
			chainId: chainId ?? x.chainId
		}));
	});
	mipd?.subscribe((providerDetails) => {
		const connectorIdSet = /* @__PURE__ */ new Set();
		const connectorRdnsSet = /* @__PURE__ */ new Set();
		for (const connector of connectors.getState()) {
			connectorIdSet.add(connector.id);
			if (connector.rdns) {
				const rdnsValues = typeof connector.rdns === "string" ? [connector.rdns] : connector.rdns;
				for (const rdns of rdnsValues) connectorRdnsSet.add(rdns);
			}
		}
		const newConnectors = [];
		for (const providerDetail of providerDetails) {
			if (connectorRdnsSet.has(providerDetail.info.rdns)) continue;
			const connector = setup(providerDetailToConnector(providerDetail));
			if (connectorIdSet.has(connector.id)) continue;
			newConnectors.push(connector);
		}
		if (storage && !store.persist.hasHydrated()) return;
		connectors.setState((x) => [...x, ...newConnectors], true);
	});
	function change(data) {
		store.setState((x) => {
			const connection = x.connections.get(data.uid);
			if (!connection) return x;
			return {
				...x,
				connections: new Map(x.connections).set(data.uid, {
					accounts: data.accounts ?? connection.accounts,
					chainId: data.chainId ?? connection.chainId,
					connector: connection.connector
				})
			};
		});
	}
	function connect(data) {
		if (store.getState().status === "connecting" || store.getState().status === "reconnecting") return;
		store.setState((x) => {
			const connector = connectors.getState().find((x) => x.uid === data.uid);
			if (!connector) return x;
			if (connector.emitter.listenerCount("connect")) connector.emitter.off("connect", change);
			if (!connector.emitter.listenerCount("change")) connector.emitter.on("change", change);
			if (!connector.emitter.listenerCount("disconnect")) connector.emitter.on("disconnect", disconnect);
			return {
				...x,
				connections: new Map(x.connections).set(data.uid, {
					accounts: data.accounts,
					chainId: data.chainId,
					connector
				}),
				current: data.uid,
				status: "connected"
			};
		});
	}
	function disconnect(data) {
		store.setState((x) => {
			const connection = x.connections.get(data.uid);
			if (connection) {
				const connector = connection.connector;
				if (connector.emitter.listenerCount("change")) connection.connector.emitter.off("change", change);
				if (connector.emitter.listenerCount("disconnect")) connection.connector.emitter.off("disconnect", disconnect);
				if (!connector.emitter.listenerCount("connect")) connection.connector.emitter.on("connect", connect);
			}
			x.connections.delete(data.uid);
			if (x.connections.size === 0) return {
				...x,
				connections: /* @__PURE__ */ new Map(),
				current: null,
				status: "disconnected"
			};
			const nextConnection = x.connections.values().next().value;
			return {
				...x,
				connections: new Map(x.connections),
				current: nextConnection.connector.uid
			};
		});
	}
	return {
		get chains() {
			return chains.getState();
		},
		get connectors() {
			return connectors.getState();
		},
		storage,
		getClient,
		get state() {
			return store.getState();
		},
		setState(value) {
			let newState;
			if (typeof value === "function") newState = value(store.getState());
			else newState = value;
			const initialState = getInitialState();
			if (typeof newState !== "object") newState = initialState;
			if (Object.keys(initialState).some((x) => !(x in newState))) newState = initialState;
			store.setState(newState, true);
		},
		subscribe(selector, listener, options) {
			return store.subscribe(selector, listener, options ? {
				...options,
				fireImmediately: options.emitImmediately
			} : void 0);
		},
		_internal: {
			mipd,
			async revalidate() {
				const state = store.getState();
				const connections = state.connections;
				let current = state.current;
				for (const [, connection] of connections) {
					const connector = connection.connector;
					if (connector.isAuthorized ? await connector.isAuthorized().catch(() => false) : false) continue;
					connections.delete(connector.uid);
					if (current === connector.uid) current = null;
				}
				store.setState((x) => ({
					...x,
					connections,
					current
				}));
			},
			store,
			ssr: Boolean(ssr),
			syncConnectedChain,
			transports: rest.transports,
			chains: {
				setState(value) {
					const nextChains = typeof value === "function" ? value(chains.getState()) : value;
					if (nextChains.length === 0) return;
					return chains.setState(nextChains, true);
				},
				subscribe(listener) {
					return chains.subscribe(listener);
				}
			},
			connectors: {
				providerDetailToConnector,
				setup,
				setState(value) {
					return connectors.setState(typeof value === "function" ? value(connectors.getState()) : value, true);
				},
				subscribe(listener) {
					return connectors.subscribe(listener);
				}
			},
			events: {
				change,
				connect,
				disconnect
			}
		}
	};
}
//#endregion
export { InternalRpcError as $, numberToHex as $t, getChainId as A, getAbortError as At, assertRequest as B, encodeFunctionData as Bt, withRetry as C, createCcipReadBudget as Ct, defaultParameters as D, ResponseBodyTooLargeError as Dt, estimateContractGas as E, HttpRequestError as Et, withTimeout as F, stringify$1 as Ft, isAddressEqual as G, createCursor as Gt, withResolvers as H, parseAbiItem as Ht, anySignal as I, decodeErrorResult as It, AtomicReadyWalletRejectedUpgradeError as J, getAddress as Jt, encodeDeployData as K, PositionOutOfBoundsError$1 as Kt, readResponseBody as L, parseAccount as Lt, getTransactionCount as M, isAbortError as Mt, recoverAuthorizationAddress as N, TransactionReceiptRevertedError as Nt, prepareTransactionRequest as O, RpcRequestError as Ot, toRlp as P, WaitForTransactionReceiptTimeoutError as Pt, DuplicateIdError as Q, bytesToHex as Qt, call as R, ChainMismatchError as Rt, validateTypedData as S, ccipReadLimit as St, receiptStatuses as T, localBatchGatewayUrl as Tt, formatTransactionRequest as U, encodeAbiParameters as Ut, createBatchScheduler as V, sliceHex as Vt, extract as W, concat$1 as Wt, BundleTooLargeError as X, keccak256$1 as Xt, AtomicityNotSupportedError as Y, LruMap$1 as Yt, ChainDisconnectedError as Z, hexToBytes as Zt, observe as _, UnsupportedNonOptionalCapabilityError as _t, sendRawTransactionSync as a, InvalidHexValueError$1 as an, MethodNotFoundRpcError as at, getTypesForEIP712Domain as b, WalletConnectSessionSettlementError as bt, resolveAmountDecimals as c, RlpNonCanonicalError as cn, ProviderDisconnectedError as ct, sendRawTransaction as d, BaseError$3 as dn, SwitchChainError as dt, stringToHex as en, InvalidInputRpcError as et, AccountNotFoundError as f, erc20Abi as fn, TransactionRejectedRpcError as ft, uid$1 as g, UnsupportedChainIdError as gt, poll as h, UnknownRpcError as ht, createClient as i, trim$1 as in, LimitExceededRpcError as it, getTransactionError as j, getUrl as jt, fillTransaction as k, TimeoutError as kt, resolveToken as l, RlpTrailingBytesError as ln, ResourceNotFoundRpcError as lt, waitForTransactionReceipt as m, UnknownBundleIdError as mt, getPublicClient as n, hexToBigInt as nn, InvalidRequestRpcError as nt, defineCall as o, RlpDepthLimitExceededError as on, MethodNotSupportedRpcError as ot, AccountTypeNotSupportedError as p, erc721Abi as pn, UnauthorizedProviderError as pt, getContractError as q, checksumAddress as qt, bindActionDecorators as r, hexToNumber as rn, JsonRpcVersionUnsupportedError as rt, pickWriteParameters as s, RlpListBoundaryExceededError as sn, ParseRpcError as st, createConfig as t, toHex as tn, InvalidParamsRpcError as tt, toBaseUnits as u, isHex as un, ResourceUnavailableRpcError as ut, simulateContract as v, UnsupportedProviderMethodError as vt, parseEventLogs as w, localBatchGatewayRequest as wt, serializeTypedData as x, getAction as xt, formatUnits as y, UserRejectedRequestError as yt, getRevertErrorData as z, ChainNotFoundError as zt };
