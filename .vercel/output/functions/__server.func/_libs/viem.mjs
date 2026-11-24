import { r as __exportAll } from "../_runtime.mjs";
import { $ as InternalRpcError, $t as numberToHex, A as getChainId, At as getAbortError, B as assertRequest, Bt as encodeFunctionData, C as withRetry, Ct as createCcipReadBudget, D as defaultParameters, Dt as ResponseBodyTooLargeError, E as estimateContractGas, Et as HttpRequestError, F as withTimeout, Ft as stringify, G as isAddressEqual, Gt as createCursor, H as withResolvers, I as anySignal, It as decodeErrorResult, J as AtomicReadyWalletRejectedUpgradeError, Jt as getAddress, K as encodeDeployData, Kt as PositionOutOfBoundsError, L as readResponseBody, Lt as parseAccount, M as getTransactionCount, Mt as isAbortError, N as recoverAuthorizationAddress, Nt as TransactionReceiptRevertedError, O as prepareTransactionRequest, Ot as RpcRequestError, P as toRlp, Pt as WaitForTransactionReceiptTimeoutError, Q as DuplicateIdError, Qt as bytesToHex, R as call, Rt as ChainMismatchError, S as validateTypedData, St as ccipReadLimit, T as receiptStatuses, U as formatTransactionRequest, Ut as encodeAbiParameters, V as createBatchScheduler, Vt as sliceHex, W as extract, Wt as concat, X as BundleTooLargeError, Xt as keccak256, Y as AtomicityNotSupportedError, Yt as LruMap, Z as ChainDisconnectedError, Zt as hexToBytes, _ as observe, _t as UnsupportedNonOptionalCapabilityError, a as sendRawTransactionSync, an as InvalidHexValueError, at as MethodNotFoundRpcError, b as getTypesForEIP712Domain, bt as WalletConnectSessionSettlementError, c as resolveAmountDecimals, cn as RlpNonCanonicalError, ct as ProviderDisconnectedError, d as sendRawTransaction, dn as BaseError, dt as SwitchChainError, en as stringToHex, et as InvalidInputRpcError, f as AccountNotFoundError, fn as erc20Abi, ft as TransactionRejectedRpcError, g as uid, gt as UnsupportedChainIdError, h as poll, ht as UnknownRpcError, i as createClient, in as trim, it as LimitExceededRpcError, j as getTransactionError, jt as getUrl, k as fillTransaction, kt as TimeoutError, l as resolveToken, ln as RlpTrailingBytesError, lt as ResourceNotFoundRpcError, m as waitForTransactionReceipt, mt as UnknownBundleIdError, nn as hexToBigInt, nt as InvalidRequestRpcError, o as defineCall, on as RlpDepthLimitExceededError, ot as MethodNotSupportedRpcError, p as AccountTypeNotSupportedError, pt as UnauthorizedProviderError, q as getContractError, qt as checksumAddress, r as bindActionDecorators, rn as hexToNumber, rt as JsonRpcVersionUnsupportedError, s as pickWriteParameters, sn as RlpListBoundaryExceededError, st as ParseRpcError, tn as toHex, tt as InvalidParamsRpcError, u as toBaseUnits, un as isHex, ut as ResourceUnavailableRpcError, v as simulateContract, vt as UnsupportedProviderMethodError, w as parseEventLogs, wt as localBatchGatewayRequest, x as serializeTypedData, xt as getAction, y as formatUnits, yt as UserRejectedRequestError, z as getRevertErrorData, zt as ChainNotFoundError } from "./@wagmi/core+[...].mjs";
//#region node_modules/viem/_esm/utils/promise/withDedupe.js
/** @internal */
var promiseCache = /*#__PURE__*/ new LruMap(8192);
/** Deduplicates in-flight promises. */
function withDedupe(fn, { enabled = true, id }) {
	if (!enabled || !id) return fn();
	const cached = promiseCache.get(id);
	if (cached) return cached;
	const promise = fn().finally(() => promiseCache.delete(id));
	promiseCache.set(id, promise);
	return promise;
}
//#endregion
//#region node_modules/viem/_esm/utils/buildRequest.js
function buildRequest(request, options = {}) {
	return async (args, overrideOptions = {}) => {
		const { dedupe = false, methods, retryDelay = 150, retryCount = 3, signal, uid } = {
			...options,
			...overrideOptions
		};
		const { method } = args;
		if (methods?.exclude?.includes(method)) throw new MethodNotSupportedRpcError(/* @__PURE__ */ new Error("method not supported"), { method });
		if (methods?.include && !methods.include.includes(method)) throw new MethodNotSupportedRpcError(/* @__PURE__ */ new Error("method not supported"), { method });
		if (signal?.aborted) throw getAbortError(signal);
		return withDedupe(() => withRetry(async () => {
			try {
				return await request(args, signal ? { signal } : void 0);
			} catch (err_) {
				if (signal?.aborted) throw getAbortError(signal);
				if (isAbortError(err_)) throw err_;
				const err = err_;
				switch (err.code) {
					case ParseRpcError.code: throw new ParseRpcError(err);
					case InvalidRequestRpcError.code: throw new InvalidRequestRpcError(err);
					case MethodNotFoundRpcError.code: throw new MethodNotFoundRpcError(err, { method: args.method });
					case InvalidParamsRpcError.code: throw new InvalidParamsRpcError(err);
					case InternalRpcError.code: throw new InternalRpcError(err);
					case InvalidInputRpcError.code: throw new InvalidInputRpcError(err);
					case ResourceNotFoundRpcError.code: throw new ResourceNotFoundRpcError(err);
					case ResourceUnavailableRpcError.code: throw new ResourceUnavailableRpcError(err);
					case TransactionRejectedRpcError.code: throw new TransactionRejectedRpcError(err);
					case MethodNotSupportedRpcError.code: throw new MethodNotSupportedRpcError(err, { method: args.method });
					case LimitExceededRpcError.code: throw new LimitExceededRpcError(err);
					case JsonRpcVersionUnsupportedError.code: throw new JsonRpcVersionUnsupportedError(err);
					case UserRejectedRequestError.code: throw new UserRejectedRequestError(err);
					case UnauthorizedProviderError.code: throw new UnauthorizedProviderError(err);
					case UnsupportedProviderMethodError.code: throw new UnsupportedProviderMethodError(err);
					case ProviderDisconnectedError.code: throw new ProviderDisconnectedError(err);
					case ChainDisconnectedError.code: throw new ChainDisconnectedError(err);
					case SwitchChainError.code: throw new SwitchChainError(err);
					case UnsupportedNonOptionalCapabilityError.code: throw new UnsupportedNonOptionalCapabilityError(err);
					case UnsupportedChainIdError.code: throw new UnsupportedChainIdError(err);
					case DuplicateIdError.code: throw new DuplicateIdError(err);
					case UnknownBundleIdError.code: throw new UnknownBundleIdError(err);
					case BundleTooLargeError.code: throw new BundleTooLargeError(err);
					case AtomicReadyWalletRejectedUpgradeError.code: throw new AtomicReadyWalletRejectedUpgradeError(err);
					case AtomicityNotSupportedError.code: throw new AtomicityNotSupportedError(err);
					case 5e3: throw new UserRejectedRequestError(err);
					case WalletConnectSessionSettlementError.code: throw new WalletConnectSessionSettlementError(err);
					default:
						if (err_ instanceof BaseError) throw err_;
						throw new UnknownRpcError(err);
				}
			}
		}, {
			delay: ({ count, error }) => {
				const retryAfter = getHttpError(error)?.headers?.get("Retry-After");
				if (retryAfter) {
					const seconds = Number.parseInt(retryAfter, 10);
					if (!Number.isNaN(seconds)) return seconds * 1e3;
					const delay = Date.parse(retryAfter) - Date.now();
					if (delay > 0) return delay;
				}
				return ~~(1 << count) * retryDelay;
			},
			retryCount,
			signal,
			shouldRetry: ({ error }) => shouldRetry(error)
		}), {
			enabled: dedupe,
			id: dedupe ? hashString(`${uid}.${stringify(args)}`) : void 0
		});
	};
}
/** @internal */
function shouldRetry(error) {
	if (isAbortError(error)) return false;
	const status = getHttpError(error)?.status;
	if ("code" in error && typeof error.code === "number") {
		if (error.code === -1) return true;
		if (error.code === LimitExceededRpcError.code) return true;
		if (error.code === InternalRpcError.code) return true;
		if (error.code === 429) return true;
		if (error.code === -32007) return true;
		if (error.code === MethodNotFoundRpcError.code) return false;
		if (error.code === MethodNotSupportedRpcError.code) return false;
		if (!status) return false;
	}
	if (status) {
		if (status === 403) return true;
		if (status === 408) return true;
		if (status === 413) return true;
		if (status === 429) return true;
		if (status === 500) return true;
		if (status === 502) return true;
		if (status === 503) return true;
		if (status === 504) return true;
		return false;
	}
	return true;
}
/** Returns the error in the cause chain that carries the HTTP response. */
function getHttpError(error) {
	if (!(error instanceof BaseError)) return void 0;
	return error.walk((err) => err instanceof HttpRequestError || err instanceof RpcRequestError);
}
/** @internal cyrb53 – fast, non-cryptographic 53-bit string hash */
function hashString(str, seed = 0) {
	let h1 = 3735928559 ^ seed;
	let h2 = 1103547991 ^ seed;
	for (let i = 0; i < str.length; i++) {
		const ch = str.charCodeAt(i);
		h1 = Math.imul(h1 ^ ch, 2654435761);
		h2 = Math.imul(h2 ^ ch, 1597334677);
	}
	h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507);
	h1 ^= Math.imul(h2 ^ h2 >>> 16, 3266489909);
	h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507);
	h2 ^= Math.imul(h1 ^ h1 >>> 16, 3266489909);
	return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}
//#endregion
//#region node_modules/viem/_esm/errors/ccip.js
var OffchainLookupError = class extends BaseError {
	constructor({ callbackSelector, cause, data, extraData, sender, urls }) {
		super(cause.shortMessage || "An error occurred while fetching for an offchain result.", {
			cause,
			metaMessages: [
				...cause.metaMessages || [],
				cause.metaMessages?.length ? "" : [],
				"Offchain Gateway Call:",
				urls && ["  Gateway URL(s):", ...urls.map((url) => `    ${getUrl(url)}`)],
				`  Sender: ${sender}`,
				`  Data: ${data}`,
				`  Callback selector: ${callbackSelector}`,
				`  Extra data: ${extraData}`
			].flat(),
			name: "OffchainLookupError"
		});
	}
};
var OffchainLookupResponseMalformedError = class extends BaseError {
	constructor({ result, url }) {
		super("Offchain gateway response is malformed. Response data must be a hex value.", {
			metaMessages: [`Gateway URL: ${getUrl(url)}`, `Response: ${stringify(result)}`],
			name: "OffchainLookupResponseMalformedError"
		});
	}
};
var OffchainLookupSenderMismatchError = class extends BaseError {
	constructor({ sender, to }) {
		super("Reverted sender address does not match target contract address (`to`).", {
			metaMessages: [`Contract address: ${to}`, `OffchainLookup sender address: ${sender}`],
			name: "OffchainLookupSenderMismatchError"
		});
	}
};
//#endregion
//#region node_modules/viem/_esm/utils/ccip.js
var ccip_exports = /* @__PURE__ */ __exportAll({
	ccipRequest: () => ccipRequest,
	offchainLookup: () => offchainLookup,
	offchainLookupAbiItem: () => offchainLookupAbiItem,
	offchainLookupSignature: () => offchainLookupSignature
});
var ccipTimeout = 1e4;
var maxCcipResponseBytes = 10485760;
var offchainLookupSignature = "0x556f1830";
var offchainLookupAbiItem = {
	name: "OffchainLookup",
	type: "error",
	inputs: [
		{
			name: "sender",
			type: "address"
		},
		{
			name: "urls",
			type: "string[]"
		},
		{
			name: "callData",
			type: "bytes"
		},
		{
			name: "callbackFunction",
			type: "bytes4"
		},
		{
			name: "extraData",
			type: "bytes"
		}
	]
};
/**
* Performs an EIP-3668 CCIP-Read lookup for a reverted `OffchainLookup` call.
*
* Follows at most 4 nested callbacks. Every gateway request of the lookup,
* including nested local batches, draws from one query and concurrency budget,
* and local batch responses draw from one byte budget. Each gateway request
* uses the client transport timeout.
*/
async function offchainLookup(client, { blockHash, blockNumber, blockTag, budget = createCcipReadBudget(), data, depth = 0, requestOptions, requireCanonical, to }) {
	const { args } = decodeErrorResult({
		data,
		abi: [offchainLookupAbiItem]
	});
	const [sender, urls, callData, callbackSelector, extraData] = args;
	const { ccipRead } = client;
	const ccipRequest_ = ccipRead && typeof ccipRead?.request === "function" ? ccipRead.request : ccipRequest;
	const timeout = getTransportTimeout(client.transport);
	try {
		if (depth >= ccipReadLimit.depth) throw new HttpRequestError({
			details: `CCIP Read exceeded the maximum callback depth (${ccipReadLimit.depth}).`,
			url: urls[0] ?? ""
		});
		if (!isAddressEqual(to, sender)) throw new OffchainLookupSenderMismatchError({
			sender,
			to
		});
		const result = await (async () => {
			if (urls.includes("x-batch-gateway:true")) return localBatchGatewayRequest({
				budget,
				ccipRequest: (parameters) => ccipRequest_({
					...parameters,
					requestOptions,
					timeout: parameters.timeout ?? timeout
				}),
				data: callData
			});
			if (budget.queries <= 0) throw new HttpRequestError({
				details: `CCIP Read exceeded the maximum number of queries (${ccipReadLimit.queries}).`,
				url: urls[0] ?? ""
			});
			const urls_ = urls.slice(0, budget.queries);
			budget.queries -= Math.max(1, urls_.length);
			return budget.run(() => ccipRequest_({
				data: callData,
				requestOptions,
				sender,
				timeout,
				urls: urls_
			}));
		})();
		const callbackData = concat([callbackSelector, encodeAbiParameters([{ type: "bytes" }, { type: "bytes" }], [result, extraData])]);
		try {
			const { data: data_ } = await call({
				...client,
				ccipRead: false
			}, {
				blockHash,
				blockNumber,
				blockTag,
				data: callbackData,
				requestOptions,
				requireCanonical,
				to
			});
			return data_;
		} catch (err) {
			const revertData = getRevertErrorData(err);
			if (revertData?.slice(0, 10) !== "0x556f1830") throw err;
			return await offchainLookup(client, {
				blockHash,
				blockNumber,
				blockTag,
				budget,
				data: revertData,
				depth: depth + 1,
				requestOptions,
				requireCanonical,
				to
			});
		}
	} catch (err) {
		if (requestOptions?.signal?.aborted) throw getAbortError(requestOptions.signal);
		if (isAbortError(err)) throw err;
		throw new OffchainLookupError({
			callbackSelector,
			cause: err,
			data,
			extraData,
			sender,
			urls
		});
	}
}
/**
* Requests a CCIP-Read gateway result.
*
* Tries each HTTP(S) URL in order. Each request, including the response body,
* times out after `timeout` (default 10 seconds) and reads at most 10 MiB.
*/
async function ccipRequest({ data, requestOptions, sender, timeout = ccipTimeout, urls }) {
	let error = /* @__PURE__ */ new Error("An unknown error occurred.");
	for (const url of urls) {
		if (requestOptions?.signal?.aborted) throw getAbortError(requestOptions.signal);
		const requestUrl = url.replace("{sender}", sender.toLowerCase()).replace("{data}", data);
		const method = url.includes("{data}") ? "GET" : "POST";
		const body = method === "POST" ? {
			data,
			sender
		} : void 0;
		const headers = method === "POST" ? { "Content-Type": "application/json" } : {};
		try {
			assertCcipUrl(requestUrl);
			const { response, responseBody } = await withTimeout(async ({ signal: timeoutSignal }) => {
				const { signal, cleanup } = anySignal([requestOptions?.signal, timeout > 0 ? timeoutSignal : null]);
				try {
					const response = await fetch(requestUrl, {
						body: JSON.stringify(body),
						headers,
						method,
						...signal ? { signal } : {}
					});
					return {
						response,
						responseBody: await readResponseBody(response, { maxResponseBodySize: maxCcipResponseBytes })
					};
				} finally {
					cleanup();
				}
			}, {
				errorInstance: new TimeoutError({
					body: body ?? {
						data,
						sender
					},
					url
				}),
				signal: true,
				timeout
			});
			let result;
			let message;
			if (response.headers.get("Content-Type")?.startsWith("application/json")) {
				const json = JSON.parse(responseBody);
				result = json.data;
				if (typeof json.message === "string") message = json.message;
			} else result = responseBody;
			if (!response.ok) {
				error = new HttpRequestError({
					body,
					details: result?.error ? stringify(result.error) : message ?? response.statusText,
					headers: response.headers,
					status: response.status,
					url
				});
				continue;
			}
			if (!isHex(result)) {
				error = new OffchainLookupResponseMalformedError({
					result,
					url
				});
				continue;
			}
			return result;
		} catch (err) {
			if (requestOptions?.signal?.aborted) throw getAbortError(requestOptions.signal);
			if (isAbortError(err)) throw err;
			if (err instanceof HttpRequestError || err instanceof TimeoutError || err instanceof ResponseBodyTooLargeError) {
				error = err;
				continue;
			}
			error = new HttpRequestError({
				body,
				cause: err,
				url
			});
		}
	}
	throw error;
}
function assertCcipUrl(url) {
	const parsed = (() => {
		try {
			return new URL(url);
		} catch {
			throw new HttpRequestError({
				details: "CCIP Read URL is invalid.",
				url
			});
		}
	})();
	if (parsed.protocol === "http:" || parsed.protocol === "https:") return;
	throw new HttpRequestError({
		details: `CCIP Read URL scheme "${parsed.protocol.slice(0, -1)}" is not allowed.`,
		url
	});
}
/**
* Returns the transport timeout. A wrapper that sets none (such as
* `fallback`) uses the longest timeout of its transports, since any of them
* may have served the call.
*/
function getTransportTimeout(transport) {
	const timeout = transport.timeout ?? transport.config?.timeout;
	if (timeout !== void 0) return timeout;
	const timeouts = (transport.transports ?? transport.value?.transports ?? []).map(getTransportTimeout).filter((timeout) => timeout !== void 0);
	return timeouts.length ? Math.max(...timeouts) : void 0;
}
//#endregion
//#region node_modules/viem/_esm/utils/chain/assertCurrentChain.js
function assertCurrentChain({ chain, currentChainId }) {
	if (!chain) throw new ChainNotFoundError();
	if (currentChainId !== chain.id) throw new ChainMismatchError({
		chain,
		currentChainId
	});
}
//#endregion
//#region node_modules/viem/_esm/utils/chain/defineChain.js
function defineChain(chain) {
	const chainInstance = {
		formatters: void 0,
		fees: void 0,
		serializers: void 0,
		...chain
	};
	function extend(base) {
		return (fnOrExtended) => {
			const properties = typeof fnOrExtended === "function" ? fnOrExtended(base) : fnOrExtended;
			const combined = {
				...base,
				...properties
			};
			return Object.assign(combined, { extend: extend(combined) });
		};
	}
	return Object.assign(chainInstance, { extend: extend(chainInstance) });
}
//#endregion
//#region node_modules/viem/_esm/utils/encoding/fromRlp.js
var rlpDepthLimit = 1024;
var hexRegex = /^0x[0-9a-fA-F]*$/;
function fromRlp(value, to = "hex") {
	if (typeof value === "string" && value.length > 3 && value.length % 2 !== 0) throw new InvalidHexValueError(value);
	if (to === "hex" && typeof value === "string" && hexRegex.test(value)) return fromRlpHex(value);
	const bytes = typeof value === "string" ? hexToBytes(value) : value;
	const cursor = createCursor(bytes, { recursiveReadLimit: Number.POSITIVE_INFINITY });
	const result = fromRlpCursor(cursor, to);
	if (cursor.position < cursor.bytes.length) throw new RlpTrailingBytesError({ count: cursor.bytes.length - cursor.position });
	return result;
}
function fromRlpCursor(cursor, to = "hex", recursiveDepth = 0) {
	if (recursiveDepth >= rlpDepthLimit) throw new RlpDepthLimitExceededError({ limit: rlpDepthLimit });
	if (cursor.bytes.length === 0) return to === "hex" ? bytesToHex(cursor.bytes) : cursor.bytes;
	const prefix = cursor.readByte();
	if (prefix < 128) cursor.decrementPosition(1);
	if (prefix < 192) {
		const length = readLength(cursor, prefix, 128);
		const bytes = cursor.readBytes(length);
		if (prefix >= 128 && length === 1 && bytes[0] < 128) throw new RlpNonCanonicalError({ reason: "single byte below `0x80` has a length prefix" });
		return to === "hex" ? bytesToHex(bytes) : bytes;
	}
	return readList(cursor, readLength(cursor, prefix, 192), to, recursiveDepth + 1);
}
function readLength(cursor, prefix, offset) {
	if (offset === 128 && prefix < 128) return 1;
	if (prefix <= offset + 55) return prefix - offset;
	if (prefix === offset + 55 + 1) {
		const length = cursor.readUint8();
		if (length <= 55) throw nonCanonicalLengthError(length);
		return length;
	}
	if (prefix === offset + 55 + 2) {
		const length = cursor.readUint16();
		if (length <= 255) throw nonCanonicalLengthError(length);
		return length;
	}
	if (prefix === offset + 55 + 3) {
		const length = cursor.readUint24();
		if (length <= 65535) throw nonCanonicalLengthError(length);
		return length;
	}
	if (prefix === offset + 55 + 4) {
		const length = cursor.readUint32();
		if (length <= 16777215) throw nonCanonicalLengthError(length);
		return length;
	}
	throw new BaseError("Invalid RLP prefix");
}
function nonCanonicalLengthError(length) {
	return new RlpNonCanonicalError({ reason: `length \`${length}\` does not use the shortest length prefix` });
}
function readList(cursor, length, to, recursiveDepth) {
	const position = cursor.position;
	const value = [];
	while (cursor.position - position < length) value.push(fromRlpCursor(cursor, to, recursiveDepth));
	if (cursor.position - position !== length) throw new RlpListBoundaryExceededError({
		consumed: cursor.position - position,
		declared: length
	});
	return value;
}
/**
* Decodes a hex input straight from its string. Matches `hexToBytes` followed
* by `fromRlpCursor`, including the cursor's bounds errors.
*/
function fromRlpHex(value) {
	const hex = value.slice(2).toLowerCase();
	const source = hex.length % 2 ? `0${hex}` : hex;
	const reader = {
		assertPosition(position) {
			if (position < 0 || position > this.length - 1) throw new PositionOutOfBoundsError({
				length: this.length,
				position
			});
		},
		length: source.length / 2,
		position: 0,
		readUint8() {
			return readHexUint(this, 1);
		},
		readUint16() {
			return readHexUint(this, 2);
		},
		readUint24() {
			return readHexUint(this, 3);
		},
		readUint32() {
			return readHexUint(this, 4);
		},
		source
	};
	if (reader.length === 0) return "0x";
	const result = fromRlpHexItem(reader, 0);
	if (reader.position < reader.length) throw new RlpTrailingBytesError({ count: reader.length - reader.position });
	return result;
}
function fromRlpHexItem(reader, recursiveDepth) {
	if (recursiveDepth >= rlpDepthLimit) throw new RlpDepthLimitExceededError({ limit: rlpDepthLimit });
	const prefix = reader.readUint8();
	if (prefix < 128) reader.position--;
	if (prefix < 192) {
		const length = readLength(reader, prefix, 128);
		const start = reader.position;
		reader.assertPosition(start + length - 1);
		reader.position += length;
		const value = reader.source.slice(start * 2, reader.position * 2);
		if (prefix >= 128 && length === 1 && value < "80") throw new RlpNonCanonicalError({ reason: "single byte below `0x80` has a length prefix" });
		if (length * 4 < reader.source.length) return ["0x", value].join("");
		return `0x${value}`;
	}
	const length = readLength(reader, prefix, 192);
	const position = reader.position;
	const value = [];
	while (reader.position - position < length) value.push(fromRlpHexItem(reader, recursiveDepth + 1));
	if (reader.position - position !== length) throw new RlpListBoundaryExceededError({
		consumed: reader.position - position,
		declared: length
	});
	return value;
}
function readHexUint(reader, size) {
	const { position } = reader;
	reader.assertPosition(position + size - 1);
	reader.position += size;
	return Number.parseInt(reader.source.slice(position * 2, reader.position * 2), 16);
}
//#endregion
//#region node_modules/viem/_esm/utils/hash/isHash.js
function isHash(hash) {
	return isHex(hash) && hash.length === 66;
}
//#endregion
//#region node_modules/viem/_esm/utils/rpc/id.js
function createIdStore() {
	return {
		current: 0,
		take() {
			return this.current++;
		},
		reset() {
			this.current = 0;
		}
	};
}
var idCache = /*#__PURE__*/ createIdStore();
//#endregion
//#region node_modules/viem/_esm/utils/rpc/http.js
var defaultMaxResponseBodySize = 10485760;
/**
* Rejection of a request that timed out. Replaced by a `TimeoutError`, which
* serializes the request body, only once a request actually times out.
*/
var timedOut = /*#__PURE__*/ new Error("timed out");
function getHttpRpcClient(url_, options = {}) {
	const { url, headers: headers_url } = parseUrl(url_);
	return { async request(params) {
		const { body, fetchFn = options.fetchFn ?? fetch, maxResponseBodySize = options.maxResponseBodySize ?? defaultMaxResponseBodySize, onRequest = options.onRequest, onResponse = options.onResponse, timeout = options.timeout ?? 1e4 } = params;
		const fetchOptions = {
			...options.fetchOptions ?? {},
			...params.fetchOptions ?? {}
		};
		const { headers, method, signal: signal_ } = fetchOptions;
		try {
			const { response, responseBody } = await withTimeout(async ({ signal: timeoutSignal }) => {
				const { signal, cleanup } = anySignal([signal_, timeout > 0 ? timeoutSignal : null]);
				try {
					const headers_ = {};
					for (const init of [
						headers_url,
						{ "Content-Type": "application/json" },
						headers
					]) new Headers(init).forEach((value, key) => {
						headers_[key] = value;
					});
					const init = {
						...fetchOptions,
						body: Array.isArray(body) ? stringify(body.map((body) => ({
							jsonrpc: "2.0",
							id: body.id ?? idCache.take(),
							...body
						}))) : stringify({
							jsonrpc: "2.0",
							id: body.id ?? idCache.take(),
							...body
						}),
						headers: headers_,
						method: method || "POST",
						signal
					};
					const args = (onRequest && await onRequest(new Request(url, init), init)) ?? {
						...init,
						url
					};
					const response = await fetchFn(args.url ?? url, args);
					if (onResponse) await onResponse(response);
					return {
						response,
						responseBody: await readResponseBody(response, { maxResponseBodySize })
					};
				} finally {
					cleanup();
				}
			}, {
				errorInstance: timedOut,
				timeout,
				signal: true
			});
			let data;
			if (response.headers.get("Content-Type")?.startsWith("application/json")) data = JSON.parse(responseBody);
			else {
				data = responseBody;
				try {
					data = JSON.parse(data || "{}");
				} catch (err) {
					if (response.ok) throw err;
					data = { error: data };
				}
			}
			const error = Array.isArray(body) && Array.isArray(data) && data.length === 1 ? data[0] : data;
			if (!response.ok) {
				if (isRpcError(error)) throw new RpcRequestError({
					body,
					error: error.error,
					headers: response.headers,
					status: response.status,
					url
				});
				throw new HttpRequestError({
					body,
					details: stringify(data.error) || response.statusText,
					headers: response.headers,
					status: response.status,
					url
				});
			}
			if (!Array.isArray(body) || !body.length) {
				if (!isRpcResponse(data)) throw new Error("Invalid JSON-RPC response: expected an object with a result or error.");
				return data;
			}
			if (Array.isArray(data) && data.length >= body.length) return data;
			if (!isRpcError(error)) throw new Error(`Expected ${body.length} responses to batch request.`);
			return body.map(({ id }) => ({
				...error,
				id: id ?? error.id
			}));
		} catch (err) {
			if (signal_?.aborted) throw getAbortError(signal_);
			if (err === timedOut) throw new TimeoutError({
				body,
				url
			});
			if (isAbortError(err)) throw err;
			if (err instanceof HttpRequestError) throw err;
			if (err instanceof ResponseBodyTooLargeError) throw err;
			if (err instanceof RpcRequestError) throw err;
			if (err instanceof TimeoutError) throw err;
			throw new HttpRequestError({
				body,
				cause: err,
				url
			});
		}
	} };
}
function isRpcError(data) {
	return typeof data?.error?.code === "number" && typeof data?.error?.message === "string";
}
function isRpcResponse(data) {
	return typeof data === "object" && data !== null && ("result" in data || "error" in data);
}
/** @internal */
function parseUrl(url_) {
	try {
		const url = new URL(url_);
		const result = (() => {
			if (url.username) {
				const credentials = `${decodeURIComponent(url.username)}:${decodeURIComponent(url.password)}`;
				url.username = "";
				url.password = "";
				return {
					url: url.toString(),
					headers: { Authorization: `Basic ${btoa(credentials)}` }
				};
			}
		})();
		return {
			url: url.toString(),
			...result
		};
	} catch {
		return { url: url_ };
	}
}
//#endregion
//#region node_modules/viem/_esm/actions/wallet/sendTransaction.js
var supportsWalletNamespace$1 = new LruMap(128);
/**
* Creates, signs, and sends a new transaction to the network.
*
* - Docs: https://viem.sh/docs/actions/wallet/sendTransaction
* - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_sending-transactions
* - JSON-RPC Methods:
*   - JSON-RPC Accounts: [`eth_sendTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction)
*   - Local Accounts: [`eth_sendRawTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendrawtransaction)
*
* @param client - Client to use
* @param parameters - {@link SendTransactionParameters}
* @returns The [Transaction](https://viem.sh/docs/glossary/terms#transaction) hash. {@link SendTransactionReturnType}
*
* @example
* import { createWalletClient, custom } from 'viem'
* import { mainnet } from 'viem/chains'
* import { sendTransaction } from 'viem/wallet'
*
* const client = createWalletClient({
*   chain: mainnet,
*   transport: custom(window.ethereum),
* })
* const hash = await sendTransaction(client, {
*   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
*   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
*   value: 1000000000000000000n,
* })
*
* @example
* // Account Hoisting
* import { createWalletClient, http } from 'viem'
* import { privateKeyToAccount } from 'viem/accounts'
* import { mainnet } from 'viem/chains'
* import { sendTransaction } from 'viem/wallet'
*
* const client = createWalletClient({
*   account: privateKeyToAccount('0x…'),
*   chain: mainnet,
*   transport: http(),
* })
* const hash = await sendTransaction(client, {
*   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
*   value: 1000000000000000000n,
* })
*/
async function sendTransaction(client, parameters) {
	const { account: account_ = client.account, assertChainId = true, chain = client.chain, accessList, authorizationList, blobs, data, dataSuffix = typeof client.dataSuffix === "string" ? client.dataSuffix : client.dataSuffix?.value, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce, type, value, ...rest } = parameters;
	if (typeof account_ === "undefined") throw new AccountNotFoundError({ docsPath: "/docs/actions/wallet/sendTransaction" });
	const account = account_ ? parseAccount(account_) : null;
	const calldata = dataSuffix ? concat([data ?? "0x", dataSuffix.length % 2 ? `0x0${dataSuffix.slice(2)}` : dataSuffix]) : data;
	let nonceManagerParameters;
	try {
		assertRequest(parameters);
		const to = await (async () => {
			if (parameters.to) return parameters.to;
			if (parameters.to === null) return void 0;
			if (authorizationList && authorizationList.length > 0) return await recoverAuthorizationAddress({ authorization: authorizationList[0] }).catch(() => {
				throw new BaseError("`to` is required. Could not infer from `authorizationList`.");
			});
		})();
		if (account?.type === "json-rpc" || account === null) {
			let chainId;
			if (chain !== null) {
				chainId = await getAction(client, getChainId, "getChainId")({});
				if (assertChainId) assertCurrentChain({
					currentChainId: chainId,
					chain
				});
			}
			const chainFormat = client.chain?.formatters?.transactionRequest?.format;
			const request = (chainFormat || formatTransactionRequest)({
				...extract(rest, { format: chainFormat }),
				accessList,
				account,
				authorizationList,
				blobs,
				chainId,
				data: calldata,
				gas,
				gasPrice,
				maxFeePerBlobGas,
				maxFeePerGas,
				maxPriorityFeePerGas,
				nonce,
				to,
				type,
				value
			}, "sendTransaction");
			const isWalletNamespaceSupported = supportsWalletNamespace$1.get(client.uid);
			const method = isWalletNamespaceSupported ? "wallet_sendTransaction" : "eth_sendTransaction";
			try {
				return await client.request({
					method,
					params: [request]
				}, { retryCount: 0 });
			} catch (e) {
				if (isWalletNamespaceSupported === false) throw e;
				const error = e;
				if (error.name === "InvalidInputRpcError" || error.name === "InvalidParamsRpcError" || error.name === "MethodNotFoundRpcError" || error.name === "MethodNotSupportedRpcError") return await client.request({
					method: "wallet_sendTransaction",
					params: [request]
				}, { retryCount: 0 }).then((hash) => {
					supportsWalletNamespace$1.set(client.uid, true);
					return hash;
				}).catch((e) => {
					const walletNamespaceError = e;
					if (walletNamespaceError.name === "MethodNotFoundRpcError" || walletNamespaceError.name === "MethodNotSupportedRpcError") {
						supportsWalletNamespace$1.set(client.uid, false);
						throw error;
					}
					throw walletNamespaceError;
				});
				throw error;
			}
		}
		if (account?.type === "local") {
			const nonceManager = (() => {
				if (!account.nonceManager || typeof nonce !== "undefined") return account.nonceManager;
				const nonceManager = account.nonceManager;
				return {
					async consume(parameters) {
						nonceManagerParameters = {
							address: parameters.address,
							chainId: parameters.chainId
						};
						const nonce = await nonceManager.consume(parameters);
						nonceManagerParameters = {
							...nonceManagerParameters,
							nonce
						};
						return nonce;
					},
					get(parameters) {
						return nonceManager.get(parameters);
					},
					increment(parameters) {
						return nonceManager.increment(parameters);
					},
					reset(parameters) {
						return nonceManager.reset(parameters);
					}
				};
			})();
			const request = await getAction(client, prepareTransactionRequest, "prepareTransactionRequest")({
				account,
				accessList,
				authorizationList,
				blobs,
				chain,
				data: calldata,
				gas,
				gasPrice,
				maxFeePerBlobGas,
				maxFeePerGas,
				maxPriorityFeePerGas,
				nonce,
				nonceManager,
				parameters: [...defaultParameters, "sidecars"],
				type,
				value,
				...rest,
				to
			});
			const serializer = chain?.serializers?.transaction;
			const signedTransaction = await account.signTransaction(request, { serializer });
			const transactionEnvelope = (chain ?? client.chain)?.serializers?.transactionEnvelope;
			const serializedTransaction = transactionEnvelope ? await transactionEnvelope({
				serializedTransaction: signedTransaction,
				transaction: request
			}) : signedTransaction;
			return await getAction(client, sendRawTransaction, "sendRawTransaction")({ serializedTransaction });
		}
		if (account?.type === "smart") throw new AccountTypeNotSupportedError({
			metaMessages: ["Consider using the `sendUserOperation` Action instead."],
			docsPath: "/docs/actions/bundler/sendUserOperation",
			type: "smart"
		});
		throw new AccountTypeNotSupportedError({
			docsPath: "/docs/actions/wallet/sendTransaction",
			type: account?.type
		});
	} catch (err) {
		if (err instanceof AccountTypeNotSupportedError) throw err;
		if (nonceManagerParameters) account?.nonceManager?.reset(nonceManagerParameters);
		throw getTransactionError(err, {
			...parameters,
			account,
			chain: parameters.chain || void 0
		});
	}
}
//#endregion
//#region node_modules/viem/_esm/actions/wallet/writeContract.js
/**
* Executes a write function on a contract.
*
* - Docs: https://viem.sh/docs/contract/writeContract
* - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts_writing-to-contracts
*
* A "write" function on a Solidity contract modifies the state of the blockchain. These types of functions require gas to be executed, and hence a [Transaction](https://viem.sh/docs/glossary/terms) is needed to be broadcast in order to change the state.
*
* Internally, uses a [Wallet Client](https://viem.sh/docs/clients/wallet) to call the [`sendTransaction` action](https://viem.sh/docs/actions/wallet/sendTransaction) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData).
*
* __Warning: The `write` internally sends a transaction – it does not validate if the contract write will succeed (the contract may throw an error). It is highly recommended to [simulate the contract write with `contract.simulate`](https://viem.sh/docs/contract/writeContract#usage) before you execute it.__
*
* @param client - Client to use
* @param parameters - {@link WriteContractParameters}
* @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms#hash). {@link WriteContractReturnType}
*
* @example
* import { createWalletClient, custom, parseAbi } from 'viem'
* import { mainnet } from 'viem/chains'
* import { writeContract } from 'viem/contract'
*
* const client = createWalletClient({
*   chain: mainnet,
*   transport: custom(window.ethereum),
* })
* const hash = await writeContract(client, {
*   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
*   abi: parseAbi(['function mint(uint32 tokenId) nonpayable']),
*   functionName: 'mint',
*   args: [69420],
* })
*
* @example
* // With Validation
* import { createWalletClient, http, parseAbi } from 'viem'
* import { mainnet } from 'viem/chains'
* import { simulateContract, writeContract } from 'viem/contract'
*
* const client = createWalletClient({
*   chain: mainnet,
*   transport: http(),
* })
* const { request } = await simulateContract(client, {
*   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
*   abi: parseAbi(['function mint(uint32 tokenId) nonpayable']),
*   functionName: 'mint',
*   args: [69420],
* }
* const hash = await writeContract(client, request)
*/
async function writeContract(client, parameters) {
	return writeContract.internal(client, sendTransaction, "sendTransaction", parameters);
}
(function(writeContract) {
	async function internal(client, actionFn, name, parameters) {
		const { abi, account: account_ = client.account, address, args, functionName, ...request } = parameters;
		if (typeof account_ === "undefined") throw new AccountNotFoundError({ docsPath: "/docs/contract/writeContract" });
		const account = account_ ? parseAccount(account_) : null;
		const data = encodeFunctionData({
			abi,
			args,
			functionName
		});
		try {
			return await getAction(client, actionFn, name)({
				data,
				to: address,
				account,
				...request
			});
		} catch (error) {
			throw getContractError(error, {
				abi,
				address,
				args,
				docsPath: "/docs/contract/writeContract",
				functionName,
				sender: account?.address
			});
		}
	}
	writeContract.internal = internal;
})(writeContract || (writeContract = {}));
//#endregion
//#region node_modules/viem/_esm/actions/token/approve.js
/**
* Approves a spender to transfer ERC-20 tokens on behalf of the caller.
*
* @example
* ```ts
* import { createClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { privateKeyToAccount } from 'viem/accounts'
* import { token } from 'viem/actions'
*
* const client = createClient({
*   account: privateKeyToAccount('0x...'),
*   chain: mainnet,
*   transport: http(),
* })
*
* const hash = await token.approve(client, {
*   amount: 100000000n,
*   spender: '0x...',
*   token: '0x...',
* })
* ```
*
* @param client - Client.
* @param parameters - Parameters.
* @returns The transaction hash.
*/
async function approve(client, parameters) {
	return approve.inner(writeContract, client, parameters);
}
(function(approve) {
	/** @internal */
	async function inner(action, client, parameters) {
		return await action(client, {
			...parameters,
			...approve.call(client, parameters)
		});
	}
	approve.inner = inner;
	/**
	* Defines a call to the `approve` function.
	*
	* Can be passed as a parameter to `estimateContractGas`, `simulateContract`,
	* `sendCalls`, `sendTransaction` (`calls`), or `multicall`. The token is
	* selected by `token`, which is either a token symbol (resolved from the
	* client's `tokens` array) or a contract `address`; `amount.decimals`
	* is inferred from declared client tokens when omitted.
	*
	* @param client - Client.
	* @param parameters - Parameters.
	* @returns The call.
	*/
	function call(client, parameters) {
		return defineCall(getCall$1(client, parameters));
	}
	Object.defineProperty(approve, "call", {
		configurable: true,
		enumerable: true,
		value: call,
		writable: true
	});
	/**
	* Estimates the gas required to approve a spender. `amount.decimals` is
	* inferred from declared client tokens when omitted.
	*
	* @param client - Client.
	* @param parameters - Parameters.
	* @returns The gas estimate.
	*/
	async function estimateGas(client, parameters) {
		return estimateContractGas(client, {
			...pickWriteParameters(parameters),
			...approve.call(client, parameters)
		});
	}
	approve.estimateGas = estimateGas;
	/**
	* Simulates an approval of a spender. `amount.decimals` is inferred from
	* declared client tokens when omitted.
	*
	* @param client - Client.
	* @param parameters - Parameters.
	* @returns The simulation result and write request.
	*/
	async function simulate(client, parameters) {
		return simulateContract(client, {
			...pickWriteParameters(parameters),
			...approve.call(client, parameters)
		});
	}
	approve.simulate = simulate;
	/**
	* Extracts the `Approval` event from logs.
	*
	* @param logs - The logs.
	* @returns The `Approval` event.
	*/
	function extractEvent(logs) {
		const [log] = parseEventLogs({
			abi: erc20Abi,
			logs,
			eventName: "Approval",
			strict: true
		});
		if (!log) throw new Error("`Approval` event not found.");
		return log;
	}
	approve.extractEvent = extractEvent;
})(approve || (approve = {}));
/** Builds the underlying `approve` contract call. @internal */
function getCall$1(client, parameters) {
	const { amount, spender, token } = parameters;
	const { address, decimals } = resolveToken(client, { token });
	return {
		abi: erc20Abi,
		address,
		args: [spender, toBaseUnits(amount, decimals)],
		functionName: "approve"
	};
}
//#endregion
//#region node_modules/viem/_esm/actions/wallet/sendTransactionSync.js
var supportsWalletNamespace = new LruMap(128);
/**
* Creates, signs, and sends a new transaction to the network synchronously.
* Returns the transaction receipt.
*
* @param client - Client to use
* @param parameters - {@link SendTransactionSyncParameters}
* @returns The transaction receipt. {@link SendTransactionSyncReturnType}
*
* @example
* import { createWalletClient, custom } from 'viem'
* import { mainnet } from 'viem/chains'
* import { sendTransactionSync } from 'viem/wallet'
*
* const client = createWalletClient({
*   chain: mainnet,
*   transport: custom(window.ethereum),
* })
* const receipt = await sendTransactionSync(client, {
*   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
*   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
*   value: 1000000000000000000n,
* })
*
* @example
* // Account Hoisting
* import { createWalletClient, http } from 'viem'
* import { privateKeyToAccount } from 'viem/accounts'
* import { mainnet } from 'viem/chains'
* import { sendTransactionSync } from 'viem/wallet'
*
* const client = createWalletClient({
*   account: privateKeyToAccount('0x…'),
*   chain: mainnet,
*   transport: http(),
* })
* const receipt = await sendTransactionSync(client, {
*   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
*   value: 1000000000000000000n,
* })
*/
async function sendTransactionSync(client, parameters) {
	const { account: account_ = client.account, assertChainId = true, chain = client.chain, accessList, authorizationList, blobs, data, dataSuffix = typeof client.dataSuffix === "string" ? client.dataSuffix : client.dataSuffix?.value, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce, pollingInterval, throwOnReceiptRevert, type, value, ...rest } = parameters;
	const timeout = parameters.timeout ?? Math.max((chain?.blockTime ?? 0) * 3, 5e3);
	if (typeof account_ === "undefined") throw new AccountNotFoundError({ docsPath: "/docs/actions/wallet/sendTransactionSync" });
	const account = account_ ? parseAccount(account_) : null;
	const calldata = dataSuffix ? concat([data ?? "0x", dataSuffix.length % 2 ? `0x0${dataSuffix.slice(2)}` : dataSuffix]) : data;
	let nonceManagerParameters;
	try {
		assertRequest(parameters);
		const to = await (async () => {
			if (parameters.to) return parameters.to;
			if (parameters.to === null) return void 0;
			if (authorizationList && authorizationList.length > 0) return await recoverAuthorizationAddress({ authorization: authorizationList[0] }).catch(() => {
				throw new BaseError("`to` is required. Could not infer from `authorizationList`.");
			});
		})();
		if (account?.type === "json-rpc" || account === null) {
			let chainId;
			if (chain !== null) {
				chainId = await getAction(client, getChainId, "getChainId")({});
				if (assertChainId) assertCurrentChain({
					currentChainId: chainId,
					chain
				});
			}
			const chainFormat = client.chain?.formatters?.transactionRequest?.format;
			const request = (chainFormat || formatTransactionRequest)({
				...extract(rest, { format: chainFormat }),
				accessList,
				account,
				authorizationList,
				blobs,
				chainId,
				data: calldata,
				gas,
				gasPrice,
				maxFeePerBlobGas,
				maxFeePerGas,
				maxPriorityFeePerGas,
				nonce,
				to,
				type,
				value
			}, "sendTransaction");
			const isWalletNamespaceSupported = supportsWalletNamespace.get(client.uid);
			const method = isWalletNamespaceSupported ? "wallet_sendTransaction" : "eth_sendTransaction";
			const hash = await (async () => {
				try {
					return await client.request({
						method,
						params: [request]
					}, { retryCount: 0 });
				} catch (e) {
					if (isWalletNamespaceSupported === false) throw e;
					const error = e;
					if (error.name === "InvalidInputRpcError" || error.name === "InvalidParamsRpcError" || error.name === "MethodNotFoundRpcError" || error.name === "MethodNotSupportedRpcError") return await client.request({
						method: "wallet_sendTransaction",
						params: [request]
					}, { retryCount: 0 }).then((hash) => {
						supportsWalletNamespace.set(client.uid, true);
						return hash;
					}).catch((e) => {
						const walletNamespaceError = e;
						if (walletNamespaceError.name === "MethodNotFoundRpcError" || walletNamespaceError.name === "MethodNotSupportedRpcError") {
							supportsWalletNamespace.set(client.uid, false);
							throw error;
						}
						throw walletNamespaceError;
					});
					throw error;
				}
			})();
			const receipt = await getAction(client, waitForTransactionReceipt, "waitForTransactionReceipt")({
				checkReplacement: false,
				hash,
				pollingInterval,
				timeout
			});
			if (throwOnReceiptRevert && receipt.status === "reverted") throw new TransactionReceiptRevertedError({ receipt });
			return receipt;
		}
		if (account?.type === "local") {
			const nonceManager = (() => {
				if (!account.nonceManager || typeof nonce !== "undefined") return account.nonceManager;
				const nonceManager = account.nonceManager;
				return {
					async consume(parameters) {
						nonceManagerParameters = {
							address: parameters.address,
							chainId: parameters.chainId
						};
						const nonce = await nonceManager.consume(parameters);
						nonceManagerParameters = {
							...nonceManagerParameters,
							nonce
						};
						return nonce;
					},
					get(parameters) {
						return nonceManager.get(parameters);
					},
					increment(parameters) {
						return nonceManager.increment(parameters);
					},
					reset(parameters) {
						return nonceManager.reset(parameters);
					}
				};
			})();
			const request = await getAction(client, prepareTransactionRequest, "prepareTransactionRequest")({
				account,
				accessList,
				authorizationList,
				blobs,
				chain,
				data: calldata,
				gas,
				gasPrice,
				maxFeePerBlobGas,
				maxFeePerGas,
				maxPriorityFeePerGas,
				nonce,
				nonceManager,
				parameters: [...defaultParameters, "sidecars"],
				type,
				value,
				...rest,
				to
			});
			const serializer = chain?.serializers?.transaction;
			const signedTransaction = await account.signTransaction(request, { serializer });
			const transactionEnvelope = (chain ?? client.chain)?.serializers?.transactionEnvelope;
			const serializedTransaction = transactionEnvelope ? await transactionEnvelope({
				serializedTransaction: signedTransaction,
				transaction: request
			}) : signedTransaction;
			const start = Date.now();
			try {
				return await getAction(client, sendRawTransactionSync, "sendRawTransactionSync")({
					serializedTransaction,
					throwOnReceiptRevert,
					timeout: parameters.timeout
				});
			} catch (err) {
				const timeoutError = err instanceof BaseError ? err.walk((e) => e?.code === 4) : null;
				if (!timeoutError) throw err;
				nonceManagerParameters = void 0;
				const hash = (() => {
					const { data } = timeoutError;
					if (typeof data === "string" && isHash(data)) return data;
					if (sliceHex(serializedTransaction, 0, 1) === "0x03") {
						const fields = fromRlp(sliceHex(serializedTransaction, 1));
						if (fields.length === 4 && Array.isArray(fields[0])) return keccak256(concat(["0x03", toRlp(fields[0])]));
					}
					return keccak256(serializedTransaction);
				})();
				const remaining = timeout - (Date.now() - start);
				if (remaining <= 0) throw new WaitForTransactionReceiptTimeoutError({ hash });
				const receipt = await getAction(client, waitForTransactionReceipt, "waitForTransactionReceipt")({
					checkReplacement: false,
					hash,
					pollingInterval,
					timeout: remaining
				});
				if (throwOnReceiptRevert && receipt.status === "reverted") throw new TransactionReceiptRevertedError({ receipt });
				return receipt;
			}
		}
		if (account?.type === "smart") throw new AccountTypeNotSupportedError({
			metaMessages: ["Consider using the `sendUserOperation` Action instead."],
			docsPath: "/docs/actions/bundler/sendUserOperation",
			type: "smart"
		});
		throw new AccountTypeNotSupportedError({
			docsPath: "/docs/actions/wallet/sendTransactionSync",
			type: account?.type
		});
	} catch (err) {
		if (err instanceof AccountTypeNotSupportedError) throw err;
		if (nonceManagerParameters && !(err instanceof TransactionReceiptRevertedError)) account?.nonceManager?.reset(nonceManagerParameters);
		throw getTransactionError(err, {
			...parameters,
			account,
			chain: parameters.chain || void 0
		});
	}
}
//#endregion
//#region node_modules/viem/_esm/actions/wallet/writeContractSync.js
/**
* Executes a write function on a contract synchronously.
* Returns the transaction receipt.
*
* - Docs: https://viem.sh/docs/contract/writeContractSync
*
* A "write" function on a Solidity contract modifies the state of the blockchain. These types of functions require gas to be executed, and hence a [Transaction](https://viem.sh/docs/glossary/terms) is needed to be broadcast in order to change the state.
*
* Internally, uses a [Wallet Client](https://viem.sh/docs/clients/wallet) to call the [`sendTransaction` action](https://viem.sh/docs/actions/wallet/sendTransaction) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData).
*
* __Warning: The `write` internally sends a transaction – it does not validate if the contract write will succeed (the contract may throw an error). It is highly recommended to [simulate the contract write with `contract.simulate`](https://viem.sh/docs/contract/writeContract#usage) before you execute it.__
*
* @param client - Client to use
* @param parameters - {@link WriteContractParameters}
* @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms#hash). {@link WriteContractReturnType}
*
* @example
* import { createWalletClient, custom, parseAbi } from 'viem'
* import { mainnet } from 'viem/chains'
* import { writeContract } from 'viem/contract'
*
* const client = createWalletClient({
*   chain: mainnet,
*   transport: custom(window.ethereum),
* })
* const receipt = await writeContractSync(client, {
*   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
*   abi: parseAbi(['function mint(uint32 tokenId) nonpayable']),
*   functionName: 'mint',
*   args: [69420],
* })
*/
async function writeContractSync(client, parameters) {
	return writeContract.internal(client, sendTransactionSync, "sendTransactionSync", parameters);
}
//#endregion
//#region node_modules/viem/_esm/actions/token/approveSync.js
/**
* Approves a spender to transfer ERC-20 tokens on behalf of the caller, and
* waits for the transaction to be confirmed.
*
* @example
* ```ts
* import { createClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { privateKeyToAccount } from 'viem/accounts'
* import { token } from 'viem/actions'
*
* const client = createClient({
*   account: privateKeyToAccount('0x...'),
*   chain: mainnet,
*   transport: http(),
* })
*
* const { receipt, ...event } = await token.approveSync(client, {
*   amount: 100000000n,
*   spender: '0x...',
*   token: '0x...',
* })
* ```
*
* @param client - Client.
* @param parameters - Parameters.
* @returns The transaction receipt and event data.
*/
async function approveSync(client, parameters) {
	const { amount, token, throwOnReceiptRevert = true } = parameters;
	const { decimals } = resolveToken(client, { token });
	const resolved = resolveAmountDecimals(amount, decimals);
	const receipt = await approve.inner(writeContractSync, client, {
		...parameters,
		throwOnReceiptRevert
	});
	const { args } = approve.extractEvent(receipt.logs);
	return {
		...args,
		...resolved === void 0 ? {} : {
			decimals: resolved,
			formatted: formatUnits(args.value, resolved)
		},
		receipt
	};
}
//#endregion
//#region node_modules/viem/_esm/actions/token/transfer.js
/**
* Transfers ERC-20 tokens to another address.
*
* Pass `from` to transfer on behalf of another address using an allowance
* (calls `transferFrom`); otherwise transfers from the caller (calls
* `transfer`).
*
* @example
* ```ts
* import { createClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { privateKeyToAccount } from 'viem/accounts'
* import { token } from 'viem/actions'
*
* const client = createClient({
*   account: privateKeyToAccount('0x...'),
*   chain: mainnet,
*   transport: http(),
* })
*
* const hash = await token.transfer(client, {
*   amount: 100000000n,
*   to: '0x...',
*   token: '0x...',
* })
* ```
*
* @example
* ```ts
* // Transfer on behalf of another address (via an allowance).
* const hash = await token.transfer(client, {
*   amount: 100000000n,
*   from: '0x...',
*   to: '0x...',
*   token: '0x...',
* })
* ```
*
* @param client - Client.
* @param parameters - Parameters.
* @returns The transaction hash.
*/
async function transfer(client, parameters) {
	return transfer.inner(writeContract, client, parameters);
}
(function(transfer) {
	/** @internal */
	async function inner(action, client, parameters) {
		return await action(client, {
			...parameters,
			...transfer.call(client, parameters)
		});
	}
	transfer.inner = inner;
	/**
	* Defines a call to the `transfer` (or `transferFrom`, when `from` is given)
	* function.
	*
	* Can be passed as a parameter to `estimateContractGas`, `simulateContract`,
	* `sendCalls`, `sendTransaction` (`calls`), or `multicall`. The token is
	* selected by `token`, which is either a token symbol (resolved from the
	* client's `tokens` array) or a contract `address`; `amount.decimals`
	* is inferred from declared client tokens when omitted.
	*
	* @param client - Client.
	* @param parameters - Parameters.
	* @returns The call.
	*/
	function call(client, parameters) {
		return defineCall(getCall(client, parameters));
	}
	Object.defineProperty(transfer, "call", {
		configurable: true,
		enumerable: true,
		value: call,
		writable: true
	});
	/**
	* Estimates the gas required to transfer ERC-20 tokens. `amount.decimals` is
	* inferred from declared client tokens when omitted.
	*
	* @param client - Client.
	* @param parameters - Parameters.
	* @returns The gas estimate.
	*/
	async function estimateGas(client, parameters) {
		return estimateContractGas(client, {
			...pickWriteParameters(parameters),
			...transfer.call(client, parameters)
		});
	}
	transfer.estimateGas = estimateGas;
	/**
	* Simulates a transfer of ERC-20 tokens. `amount.decimals` is inferred from
	* declared client tokens when omitted.
	*
	* @param client - Client.
	* @param parameters - Parameters.
	* @returns The simulation result and write request.
	*/
	async function simulate(client, parameters) {
		return simulateContract(client, {
			...pickWriteParameters(parameters),
			...transfer.call(client, parameters)
		});
	}
	transfer.simulate = simulate;
	/**
	* Extracts the `Transfer` event from logs.
	*
	* @param logs - The logs.
	* @returns The `Transfer` event.
	*/
	function extractEvent(logs) {
		const [log] = parseEventLogs({
			abi: erc20Abi,
			logs,
			eventName: "Transfer",
			strict: true
		});
		if (!log) throw new Error("`Transfer` event not found.");
		return log;
	}
	transfer.extractEvent = extractEvent;
})(transfer || (transfer = {}));
/** Builds the underlying `transfer`/`transferFrom` contract call. @internal */
function getCall(client, parameters) {
	const { amount, from, to, token } = parameters;
	const { address, decimals } = resolveToken(client, { token });
	const value = toBaseUnits(amount, decimals);
	if (from) return {
		abi: erc20Abi,
		address,
		args: [
			from,
			to,
			value
		],
		functionName: "transferFrom"
	};
	return {
		abi: erc20Abi,
		address,
		args: [to, value],
		functionName: "transfer"
	};
}
//#endregion
//#region node_modules/viem/_esm/actions/token/transferSync.js
/**
* Transfers ERC-20 tokens to another address, and waits for the transaction to
* be confirmed.
*
* Pass `from` to transfer on behalf of another address using an allowance
* (calls `transferFrom`); otherwise transfers from the caller (calls
* `transfer`).
*
* @example
* ```ts
* import { createClient, http } from 'viem'
* import { mainnet } from 'viem/chains'
* import { privateKeyToAccount } from 'viem/accounts'
* import { token } from 'viem/actions'
*
* const client = createClient({
*   account: privateKeyToAccount('0x...'),
*   chain: mainnet,
*   transport: http(),
* })
*
* const { receipt, ...event } = await token.transferSync(client, {
*   amount: 100000000n,
*   to: '0x...',
*   token: '0x...',
* })
* ```
*
* @param client - Client.
* @param parameters - Parameters.
* @returns The transaction receipt and event data.
*/
async function transferSync(client, parameters) {
	const { amount, token, throwOnReceiptRevert = true } = parameters;
	const { decimals } = resolveToken(client, { token });
	const resolved = resolveAmountDecimals(amount, decimals);
	const receipt = await transfer.inner(writeContractSync, client, {
		...parameters,
		throwOnReceiptRevert
	});
	const { args } = transfer.extractEvent(receipt.logs);
	return {
		...args,
		...resolved === void 0 ? {} : {
			decimals: resolved,
			formatted: formatUnits(args.value, resolved)
		},
		receipt
	};
}
//#endregion
//#region node_modules/viem/_esm/actions/wallet/addChain.js
/**
* Adds an EVM chain to the wallet.
*
* - Docs: https://viem.sh/docs/actions/wallet/addChain
* - JSON-RPC Methods: [`eth_addEthereumChain`](https://eips.ethereum.org/EIPS/eip-3085)
*
* @param client - Client to use
* @param parameters - {@link AddChainParameters}
*
* @example
* import { createWalletClient, custom } from 'viem'
* import { optimism } from 'viem/chains'
* import { addChain } from 'viem/wallet'
*
* const client = createWalletClient({
*   transport: custom(window.ethereum),
* })
* await addChain(client, { chain: optimism })
*/
async function addChain(client, { chain }) {
	const { id, name, nativeCurrency, rpcUrls, blockExplorers } = chain;
	await client.request({
		method: "wallet_addEthereumChain",
		params: [{
			chainId: numberToHex(id),
			chainName: name,
			nativeCurrency,
			rpcUrls: rpcUrls.default.http,
			blockExplorerUrls: blockExplorers ? Object.values(blockExplorers).map(({ url }) => url) : void 0
		}]
	}, {
		dedupe: true,
		retryCount: 0
	});
}
//#endregion
//#region node_modules/viem/_esm/actions/wallet/deployContract.js
/**
* Deploys a contract to the network, given bytecode and constructor arguments.
*
* - Docs: https://viem.sh/docs/contract/deployContract
* - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts_deploying-contracts
*
* @param client - Client to use
* @param parameters - {@link DeployContractParameters}
* @returns The [Transaction](https://viem.sh/docs/glossary/terms#transaction) hash. {@link DeployContractReturnType}
*
* @example
* import { createWalletClient, http } from 'viem'
* import { privateKeyToAccount } from 'viem/accounts'
* import { mainnet } from 'viem/chains'
* import { deployContract } from 'viem/contract'
*
* const client = createWalletClient({
*   account: privateKeyToAccount('0x…'),
*   chain: mainnet,
*   transport: http(),
* })
* const hash = await deployContract(client, {
*   abi: [],
*   account: '0x…,
*   bytecode: '0x608060405260405161083e38038061083e833981016040819052610...',
* })
*/
function deployContract(walletClient, parameters) {
	const { abi, args, bytecode, ...request } = parameters;
	const calldata = encodeDeployData({
		abi,
		args,
		bytecode
	});
	return getAction(walletClient, sendTransaction, "sendTransaction")({
		...request,
		...request.authorizationList ? { to: null } : {},
		data: calldata
	});
}
//#endregion
//#region node_modules/viem/_esm/actions/wallet/getAddresses.js
/**
* Returns a list of account addresses owned by the wallet or client.
*
* - Docs: https://viem.sh/docs/actions/wallet/getAddresses
* - JSON-RPC Methods: [`eth_accounts`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_accounts)
*
* @param client - Client to use
* @returns List of account addresses owned by the wallet or client. {@link GetAddressesReturnType}
*
* @example
* import { createWalletClient, custom } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getAddresses } from 'viem/wallet'
*
* const client = createWalletClient({
*   chain: mainnet,
*   transport: custom(window.ethereum),
* })
* const accounts = await getAddresses(client)
*/
async function getAddresses(client) {
	if (client.account?.type === "local") return [client.account.address];
	return (await client.request({ method: "eth_accounts" }, { dedupe: true })).map((address) => checksumAddress(address));
}
//#endregion
//#region node_modules/viem/_esm/actions/wallet/sendCalls.js
var fallbackMagicIdentifier = "0x5792579257925792579257925792579257925792579257925792579257925792";
var fallbackTransactionErrorMagicIdentifier = numberToHex(0, { size: 32 });
/**
* Requests the connected wallet to send a batch of calls.
*
* - Docs: https://viem.sh/docs/actions/wallet/sendCalls
* - JSON-RPC Methods: [`wallet_sendCalls`](https://eips.ethereum.org/EIPS/eip-5792)
*
* @param client - Client to use
* @returns Transaction identifier. {@link SendCallsReturnType}
*
* @example
* import { createWalletClient, custom } from 'viem'
* import { mainnet } from 'viem/chains'
* import { sendCalls } from 'viem/actions'
*
* const client = createWalletClient({
*   chain: mainnet,
*   transport: custom(window.ethereum),
* })
* const id = await sendCalls(client, {
*   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
*   calls: [
*     {
*       data: '0xdeadbeef',
*       to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
*     },
*     {
*       to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
*       value: 69420n,
*     },
*   ],
* })
*/
async function sendCalls(client, parameters) {
	const { account: account_ = client.account, chain = client.chain, experimental_fallback, experimental_fallbackDelay = 32, forceAtomic = false, id, version = "2.0.0" } = parameters;
	const account = account_ ? parseAccount(account_) : null;
	let capabilities = parameters.capabilities;
	if (client.dataSuffix && !parameters.capabilities?.dataSuffix) {
		if (typeof client.dataSuffix === "string") capabilities = {
			...parameters.capabilities,
			dataSuffix: {
				value: client.dataSuffix,
				optional: true
			}
		};
		else capabilities = {
			...parameters.capabilities,
			dataSuffix: {
				value: client.dataSuffix.value,
				...client.dataSuffix.required ? {} : { optional: true }
			}
		};
	}
	const calls = parameters.calls.map((call_) => {
		const call = call_;
		const data = call.abi ? encodeFunctionData({
			abi: call.abi,
			functionName: call.functionName,
			args: call.args
		}) : call.data;
		return {
			data: call.dataSuffix ? concat([data ?? "0x", call.dataSuffix.length % 2 ? `0x0${call.dataSuffix.slice(2)}` : call.dataSuffix]) : data,
			to: call.to,
			value: call.value ? numberToHex(call.value) : void 0
		};
	});
	try {
		const response = await client.request({
			method: "wallet_sendCalls",
			params: [{
				atomicRequired: forceAtomic,
				calls,
				capabilities,
				chainId: numberToHex(chain.id),
				from: account?.address,
				id,
				version
			}]
		}, { retryCount: 0 });
		if (typeof response === "string") return { id: response };
		return response;
	} catch (err) {
		const error = err;
		if (experimental_fallback && (error.name === "MethodNotFoundRpcError" || error.name === "MethodNotSupportedRpcError" || error.name === "UnknownRpcError" || error.details.toLowerCase() === "this request method is not supported" || error.details.toLowerCase().includes("does not exist / is not available") || error.details.toLowerCase().includes("missing or invalid. request()") || error.details.toLowerCase().includes("did not match any variant of untagged enum") || error.details.toLowerCase().includes("account upgraded to unsupported contract") || error.details.toLowerCase().includes("eip-7702 not supported") || error.details.toLowerCase().includes("unsupported wc_ method") || error.details.toLowerCase().includes("feature toggled misconfigured") || error.details.toLowerCase().includes("jsonrpcengine: response has no error or result for request"))) {
			if (capabilities) {
				if (Object.values(capabilities).some((capability) => !capability.optional)) {
					const message = "non-optional `capabilities` are not supported on fallback to `eth_sendTransaction`.";
					throw new UnsupportedNonOptionalCapabilityError(new BaseError(message, { details: message }));
				}
			}
			if (forceAtomic && calls.length > 1) {
				const message = "`forceAtomic` is not supported on fallback to `eth_sendTransaction`.";
				throw new AtomicityNotSupportedError(new BaseError(message, { details: message }));
			}
			const results = [];
			for (const call of calls) {
				try {
					const value = await getAction(client, sendTransaction, "sendTransaction")({
						account,
						chain,
						data: call.data,
						to: call.to,
						value: call.value ? hexToBigInt(call.value) : void 0
					});
					results.push({
						status: "fulfilled",
						value
					});
				} catch (reason) {
					results.push({
						reason,
						status: "rejected"
					});
				}
				if (experimental_fallbackDelay > 0) await new Promise((resolve) => setTimeout(resolve, experimental_fallbackDelay));
			}
			if (results.every((r) => r.status === "rejected")) throw results[0].reason;
			const hashes = results.map((result) => {
				if (result.status === "fulfilled") return result.value;
				return fallbackTransactionErrorMagicIdentifier;
			});
			return { id: concat([
				...hashes,
				numberToHex(chain.id, { size: 32 }),
				fallbackMagicIdentifier
			]) };
		}
		throw getTransactionError(err, {
			...parameters,
			account,
			chain: parameters.chain
		});
	}
}
//#endregion
//#region node_modules/viem/_esm/actions/wallet/getCallsStatus.js
/**
* Returns the status of a call batch that was sent via `sendCalls`.
*
* - Docs: https://viem.sh/docs/actions/wallet/getCallsStatus
* - JSON-RPC Methods: [`wallet_getCallsStatus`](https://eips.ethereum.org/EIPS/eip-5792)
*
* @param client - Client to use
* @returns Status of the calls. {@link GetCallsStatusReturnType}
*
* @example
* import { createWalletClient, custom } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getCallsStatus } from 'viem/actions'
*
* const client = createWalletClient({
*   chain: mainnet,
*   transport: custom(window.ethereum),
* })
* const { receipts, status } = await getCallsStatus(client, { id: '0xdeadbeef' })
*/
async function getCallsStatus(client, parameters) {
	async function getStatus(id) {
		if (id.endsWith("0x5792579257925792579257925792579257925792579257925792579257925792".slice(2))) {
			const chainId = trim(sliceHex(id, -64, -32));
			const hashes = sliceHex(id, 0, -64).slice(2).match(/.{1,64}/g);
			const receipts = await Promise.all(hashes.map((hash) => fallbackTransactionErrorMagicIdentifier.slice(2) !== hash ? client.request({
				method: "eth_getTransactionReceipt",
				params: [`0x${hash}`]
			}, { dedupe: true }) : void 0));
			const status = (() => {
				if (receipts.some((r) => r === null)) return 100;
				if (receipts.every((r) => r?.status === "0x1")) return 200;
				if (receipts.every((r) => r?.status === "0x0")) return 500;
				return 600;
			})();
			return {
				atomic: false,
				chainId: hexToNumber(chainId),
				receipts: receipts.filter(Boolean),
				status,
				version: "2.0.0"
			};
		}
		return client.request({
			method: "wallet_getCallsStatus",
			params: [id]
		});
	}
	const { atomic = false, chainId, receipts, version = "2.0.0", ...response } = await getStatus(parameters.id);
	const [status, statusCode] = (() => {
		const statusCode = response.status;
		if (statusCode >= 100 && statusCode < 200) return ["pending", statusCode];
		if (statusCode >= 200 && statusCode < 300) return ["success", statusCode];
		if (statusCode >= 300 && statusCode < 700) return ["failure", statusCode];
		if (statusCode === "CONFIRMED") return ["success", 200];
		if (statusCode === "PENDING") return ["pending", 100];
		return [void 0, statusCode];
	})();
	return {
		...response,
		atomic,
		chainId: chainId ? hexToNumber(chainId) : void 0,
		receipts: receipts?.map((receipt) => ({
			...receipt,
			blockNumber: hexToBigInt(receipt.blockNumber),
			gasUsed: hexToBigInt(receipt.gasUsed),
			status: receiptStatuses[receipt.status]
		})) ?? [],
		statusCode,
		status,
		version
	};
}
//#endregion
//#region node_modules/viem/_esm/actions/wallet/getCapabilities.js
/**
* Extract capabilities that a connected wallet supports (e.g. paymasters, session keys, etc).
*
* - Docs: https://viem.sh/docs/actions/wallet/getCapabilities
* - JSON-RPC Methods: [`wallet_getCapabilities`](https://eips.ethereum.org/EIPS/eip-5792)
*
* @param client - Client to use
* @returns The wallet's capabilities. {@link GetCapabilitiesReturnType}
*
* @example
* import { createWalletClient, custom } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getCapabilities } from 'viem/actions'
*
* const client = createWalletClient({
*   chain: mainnet,
*   transport: custom(window.ethereum),
* })
* const capabilities = await getCapabilities(client)
*/
async function getCapabilities(client, parameters = {}) {
	const { account = client.account, chainId } = parameters;
	const account_ = account ? parseAccount(account) : void 0;
	const params = chainId ? [account_?.address, [numberToHex(chainId)]] : [account_?.address];
	const capabilities_raw = await client.request({
		method: "wallet_getCapabilities",
		params
	});
	const capabilities = {};
	for (const [chainId, capabilities_] of Object.entries(capabilities_raw)) {
		capabilities[Number(chainId)] = {};
		for (let [key, value] of Object.entries(capabilities_)) {
			if (key === "addSubAccount") key = "unstable_addSubAccount";
			capabilities[Number(chainId)][key] = value;
		}
	}
	return typeof chainId === "number" ? capabilities[chainId] : capabilities;
}
//#endregion
//#region node_modules/viem/_esm/actions/wallet/getPermissions.js
/**
* Gets the wallets current permissions.
*
* - Docs: https://viem.sh/docs/actions/wallet/getPermissions
* - JSON-RPC Methods: [`wallet_getPermissions`](https://eips.ethereum.org/EIPS/eip-2255)
*
* @param client - Client to use
* @returns The wallet permissions. {@link GetPermissionsReturnType}
*
* @example
* import { createWalletClient, custom } from 'viem'
* import { mainnet } from 'viem/chains'
* import { getPermissions } from 'viem/wallet'
*
* const client = createWalletClient({
*   chain: mainnet,
*   transport: custom(window.ethereum),
* })
* const permissions = await getPermissions(client)
*/
async function getPermissions(client) {
	return await client.request({ method: "wallet_getPermissions" }, { dedupe: true });
}
//#endregion
//#region node_modules/viem/_esm/actions/wallet/prepareAuthorization.js
/**
* Prepares an [EIP-7702 Authorization](https://eips.ethereum.org/EIPS/eip-7702) object for signing.
* This Action will fill the required fields of the Authorization object if they are not provided (e.g. `nonce` and `chainId`).
*
* With the prepared Authorization object, you can use [`signAuthorization`](https://viem.sh/docs/eip7702/signAuthorization) to sign over the Authorization object.
*
* @param client - Client to use
* @param parameters - {@link PrepareAuthorizationParameters}
* @returns The prepared Authorization object. {@link PrepareAuthorizationReturnType}
*
* @example
* import { createClient, http } from 'viem'
* import { privateKeyToAccount } from 'viem/accounts'
* import { mainnet } from 'viem/chains'
* import { prepareAuthorization } from 'viem/experimental'
*
* const client = createClient({
*   chain: mainnet,
*   transport: http(),
* })
* const authorization = await prepareAuthorization(client, {
*   account: privateKeyToAccount('0x..'),
*   contractAddress: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
* })
*
* @example
* // Account Hoisting
* import { createClient, http } from 'viem'
* import { privateKeyToAccount } from 'viem/accounts'
* import { mainnet } from 'viem/chains'
* import { prepareAuthorization } from 'viem/experimental'
*
* const client = createClient({
*   account: privateKeyToAccount('0x…'),
*   chain: mainnet,
*   transport: http(),
* })
* const authorization = await prepareAuthorization(client, {
*   contractAddress: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
* })
*/
async function prepareAuthorization(client, parameters) {
	const { account: account_ = client.account, chainId, nonce } = parameters;
	if (!account_) throw new AccountNotFoundError({ docsPath: "/docs/eip7702/prepareAuthorization" });
	const account = parseAccount(account_);
	const executor = (() => {
		if (!parameters.executor) return void 0;
		if (parameters.executor === "self") return parameters.executor;
		return parseAccount(parameters.executor);
	})();
	const authorization = {
		address: parameters.contractAddress ?? parameters.address,
		chainId,
		nonce
	};
	if (typeof authorization.chainId === "undefined") authorization.chainId = client.chain?.id ?? await getAction(client, getChainId, "getChainId")({});
	if (typeof authorization.nonce === "undefined") {
		authorization.nonce = await getAction(client, getTransactionCount, "getTransactionCount")({
			address: account.address,
			blockTag: "pending"
		});
		if (executor === "self" || executor?.address && isAddressEqual(executor.address, account.address)) authorization.nonce += 1;
	}
	return authorization;
}
//#endregion
//#region node_modules/viem/_esm/actions/wallet/requestAddresses.js
/**
* Requests a list of accounts managed by a wallet.
*
* - Docs: https://viem.sh/docs/actions/wallet/requestAddresses
* - JSON-RPC Methods: [`eth_requestAccounts`](https://eips.ethereum.org/EIPS/eip-1102)
*
* Sends a request to the wallet, asking for permission to access the user's accounts. After the user accepts the request, it will return a list of accounts (addresses).
*
* This API can be useful for dapps that need to access the user's accounts in order to execute transactions or interact with smart contracts.
*
* @param client - Client to use
* @returns List of accounts managed by a wallet {@link RequestAddressesReturnType}
*
* @example
* import { createWalletClient, custom } from 'viem'
* import { mainnet } from 'viem/chains'
* import { requestAddresses } from 'viem/wallet'
*
* const client = createWalletClient({
*   chain: mainnet,
*   transport: custom(window.ethereum),
* })
* const accounts = await requestAddresses(client)
*/
async function requestAddresses(client) {
	return (await client.request({ method: "eth_requestAccounts" }, {
		dedupe: true,
		retryCount: 0
	})).map((address) => getAddress(address));
}
//#endregion
//#region node_modules/viem/_esm/actions/wallet/requestPermissions.js
/**
* Requests permissions for a wallet.
*
* - Docs: https://viem.sh/docs/actions/wallet/requestPermissions
* - JSON-RPC Methods: [`wallet_requestPermissions`](https://eips.ethereum.org/EIPS/eip-2255)
*
* @param client - Client to use
* @param parameters - {@link RequestPermissionsParameters}
* @returns The wallet permissions. {@link RequestPermissionsReturnType}
*
* @example
* import { createWalletClient, custom } from 'viem'
* import { mainnet } from 'viem/chains'
* import { requestPermissions } from 'viem/wallet'
*
* const client = createWalletClient({
*   chain: mainnet,
*   transport: custom(window.ethereum),
* })
* const permissions = await requestPermissions(client, {
*   eth_accounts: {}
* })
*/
async function requestPermissions(client, permissions) {
	return client.request({
		method: "wallet_requestPermissions",
		params: [permissions]
	}, { retryCount: 0 });
}
//#endregion
//#region node_modules/viem/_esm/errors/calls.js
var BundleFailedError = class extends BaseError {
	result;
	constructor(result) {
		super(`Call bundle failed with status: ${result.statusCode}`, { name: "BundleFailedError" });
		this.result = result;
	}
};
//#endregion
//#region node_modules/viem/_esm/actions/wallet/waitForCallsStatus.js
var functionIds = /*#__PURE__*/ new WeakMap();
var functionCount = 0;
function getFunctionId(fn) {
	let fnId = functionIds.get(fn);
	if (fnId === void 0) {
		fnId = ++functionCount;
		functionIds.set(fn, fnId);
	}
	return fnId;
}
/**
* Waits for the status & receipts of a call bundle that was sent via `sendCalls`.
*
* - Docs: https://viem.sh/docs/actions/wallet/waitForCallsStatus
* - JSON-RPC Methods: [`wallet_getCallsStatus`](https://eips.ethereum.org/EIPS/eip-5792)
*
* @param client - Client to use
* @param parameters - {@link WaitForCallsStatusParameters}
* @returns Status & receipts of the call bundle. {@link WaitForCallsStatusReturnType}
*
* @example
* import { createWalletClient, custom } from 'viem'
* import { mainnet } from 'viem/chains'
* import { waitForCallsStatus } from 'viem/actions'
*
* const client = createWalletClient({
*   chain: mainnet,
*   transport: custom(window.ethereum),
* })
*
* const { receipts, status } = await waitForCallsStatus(client, { id: '0xdeadbeef' })
*/
async function waitForCallsStatus(client, parameters) {
	const { id, pollingInterval = client.pollingInterval, status = ({ statusCode }) => statusCode === 200 || statusCode >= 300, retryCount = 4, retryDelay = ({ count }) => ~~(1 << count) * 200, timeout = 6e4, throwOnFailure = false } = parameters;
	const observerId = stringify([
		"waitForCallsStatus",
		client.uid,
		id,
		{
			pollingInterval,
			retryCount,
			retryDelay: typeof parameters.retryDelay === "function" ? ["function", getFunctionId(parameters.retryDelay)] : parameters.retryDelay,
			status: parameters.status ? getFunctionId(parameters.status) : void 0,
			throwOnFailure
		}
	]);
	const { promise, resolve, reject } = withResolvers();
	let timer;
	const unobserve = observe(observerId, {
		resolve,
		reject
	}, (emit) => {
		const unpoll = poll(async () => {
			const done = (fn) => {
				clearTimeout(timer);
				unpoll();
				fn();
				unobserve();
			};
			try {
				const result = await withRetry(async () => {
					const result = await getAction(client, getCallsStatus, "getCallsStatus")({ id });
					if (throwOnFailure && result.status === "failure") throw new BundleFailedError(result);
					return result;
				}, {
					retryCount,
					delay: retryDelay
				});
				if (!status(result)) return;
				done(() => emit.resolve(result));
			} catch (error) {
				done(() => emit.reject(error));
			}
		}, {
			interval: pollingInterval,
			emitOnBegin: true
		});
		return unpoll;
	});
	timer = timeout ? setTimeout(() => {
		unobserve();
		clearTimeout(timer);
		reject(new WaitForCallsStatusTimeoutError({ id }));
	}, timeout) : void 0;
	return await promise.finally(() => unobserve());
}
var WaitForCallsStatusTimeoutError = class extends BaseError {
	constructor({ id }) {
		super(`Timed out while waiting for call bundle with id "${id}" to be confirmed.`, { name: "WaitForCallsStatusTimeoutError" });
	}
};
//#endregion
//#region node_modules/viem/_esm/actions/wallet/sendCallsSync.js
/**
* Requests the connected wallet to send a batch of calls, and waits for the calls to be included in a block.
*
* - Docs: https://viem.sh/docs/actions/wallet/sendCallsSync
* - JSON-RPC Methods: [`wallet_sendCalls`](https://eips.ethereum.org/EIPS/eip-5792)
*
* @param client - Client to use
* @returns Calls status. {@link SendCallsSyncReturnType}
*
* @example
* import { createWalletClient, custom } from 'viem'
* import { mainnet } from 'viem/chains'
* import { sendCalls } from 'viem/actions'
*
* const client = createWalletClient({
*   chain: mainnet,
*   transport: custom(window.ethereum),
* })
* const status = await sendCallsSync(client, {
*   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
*   calls: [
*     {
*       data: '0xdeadbeef',
*       to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
*     },
*     {
*       to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
*       value: 69420n,
*     },
*   ],
* })
*/
async function sendCallsSync(client, parameters) {
	const { chain = client.chain } = parameters;
	const timeout = parameters.timeout ?? Math.max((chain?.blockTime ?? 0) * 3, 5e3);
	const result = await getAction(client, sendCalls, "sendCalls")(parameters);
	return await getAction(client, waitForCallsStatus, "waitForCallsStatus")({
		...parameters,
		id: result.id,
		timeout
	});
}
//#endregion
//#region node_modules/viem/_esm/actions/wallet/showCallsStatus.js
/**
* Requests for the wallet to show information about a call batch
* that was sent via `sendCalls`.
*
* - Docs: https://viem.sh/docs/actions/wallet/showCallsStatus
* - JSON-RPC Methods: [`wallet_showCallsStatus`](https://eips.ethereum.org/EIPS/eip-5792)
*
* @param client - Client to use
* @returns Status of the calls. {@link ShowCallsStatusReturnType}
*
* @example
* import { createWalletClient, custom } from 'viem'
* import { mainnet } from 'viem/chains'
* import { showCallsStatus } from 'viem/actions'
*
* const client = createWalletClient({
*   chain: mainnet,
*   transport: custom(window.ethereum),
* })
* await showCallsStatus(client, { id: '0xdeadbeef' })
*/
async function showCallsStatus(client, parameters) {
	const { id } = parameters;
	await client.request({
		method: "wallet_showCallsStatus",
		params: [id]
	});
}
//#endregion
//#region node_modules/viem/_esm/actions/wallet/signAuthorization.js
/**
* Signs an [EIP-7702 Authorization](https://eips.ethereum.org/EIPS/eip-7702) object.
*
* With the calculated signature, you can:
* - use [`verifyAuthorization`](https://viem.sh/docs/eip7702/verifyAuthorization) to verify the signed Authorization object,
* - use [`recoverAuthorizationAddress`](https://viem.sh/docs/eip7702/recoverAuthorizationAddress) to recover the signing address from the signed Authorization object.
*
* @param client - Client to use
* @param parameters - {@link SignAuthorizationParameters}
* @returns The signed Authorization object. {@link SignAuthorizationReturnType}
*
* @example
* import { createClient, http } from 'viem'
* import { privateKeyToAccount } from 'viem/accounts'
* import { mainnet } from 'viem/chains'
* import { signAuthorization } from 'viem/experimental'
*
* const client = createClient({
*   chain: mainnet,
*   transport: http(),
* })
* const signature = await signAuthorization(client, {
*   account: privateKeyToAccount('0x..'),
*   contractAddress: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
* })
*
* @example
* // Account Hoisting
* import { createClient, http } from 'viem'
* import { privateKeyToAccount } from 'viem/accounts'
* import { mainnet } from 'viem/chains'
* import { signAuthorization } from 'viem/experimental'
*
* const client = createClient({
*   account: privateKeyToAccount('0x…'),
*   chain: mainnet,
*   transport: http(),
* })
* const signature = await signAuthorization(client, {
*   contractAddress: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
* })
*/
async function signAuthorization(client, parameters) {
	const { account: account_ = client.account } = parameters;
	if (!account_) throw new AccountNotFoundError({ docsPath: "/docs/eip7702/signAuthorization" });
	const account = parseAccount(account_);
	if (!account.signAuthorization) throw new AccountTypeNotSupportedError({
		docsPath: "/docs/eip7702/signAuthorization",
		metaMessages: ["The `signAuthorization` Action does not support JSON-RPC Accounts."],
		type: account.type
	});
	const authorization = await getAction(client, prepareAuthorization, "prepareAuthorization")(parameters);
	return account.signAuthorization(authorization);
}
//#endregion
//#region node_modules/viem/_esm/actions/wallet/signMessage.js
/**
* Calculates an Ethereum-specific signature in [EIP-191 format](https://eips.ethereum.org/EIPS/eip-191): `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`.
*
* - Docs: https://viem.sh/docs/actions/wallet/signMessage
* - JSON-RPC Methods:
*   - JSON-RPC Accounts: [`personal_sign`](https://docs.metamask.io/guide/signing-data#personal-sign)
*   - Local Accounts: Signs locally. No JSON-RPC request.
*
* With the calculated signature, you can:
* - use [`verifyMessage`](https://viem.sh/docs/utilities/verifyMessage) to verify the signature,
* - use [`recoverMessageAddress`](https://viem.sh/docs/utilities/recoverMessageAddress) to recover the signing address from a signature.
*
* @param client - Client to use
* @param parameters - {@link SignMessageParameters}
* @returns The signed message. {@link SignMessageReturnType}
*
* @example
* import { createWalletClient, custom } from 'viem'
* import { mainnet } from 'viem/chains'
* import { signMessage } from 'viem/wallet'
*
* const client = createWalletClient({
*   chain: mainnet,
*   transport: custom(window.ethereum),
* })
* const signature = await signMessage(client, {
*   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
*   message: 'hello world',
* })
*
* @example
* // Account Hoisting
* import { createWalletClient, custom } from 'viem'
* import { privateKeyToAccount } from 'viem/accounts'
* import { mainnet } from 'viem/chains'
* import { signMessage } from 'viem/wallet'
*
* const client = createWalletClient({
*   account: privateKeyToAccount('0x…'),
*   chain: mainnet,
*   transport: custom(window.ethereum),
* })
* const signature = await signMessage(client, {
*   message: 'hello world',
* })
*/
async function signMessage(client, { account: account_ = client.account, message }) {
	if (!account_) throw new AccountNotFoundError({ docsPath: "/docs/actions/wallet/signMessage" });
	const account = parseAccount(account_);
	if (account.signMessage) return account.signMessage({ message });
	const message_ = (() => {
		if (typeof message === "string") return stringToHex(message);
		if (message.raw instanceof Uint8Array) return toHex(message.raw);
		return message.raw;
	})();
	return client.request({
		method: "personal_sign",
		params: [message_, account.address]
	}, { retryCount: 0 });
}
//#endregion
//#region node_modules/viem/_esm/actions/wallet/signTransaction.js
/**
* Signs a transaction.
*
* - Docs: https://viem.sh/docs/actions/wallet/signTransaction
* - JSON-RPC Methods:
*   - JSON-RPC Accounts: [`eth_signTransaction`](https://ethereum.github.io/execution-apis/api-documentation/)
*   - Local Accounts: Signs locally. No JSON-RPC request.
*
* @param args - {@link SignTransactionParameters}
* @returns The signed serialized transaction. {@link SignTransactionReturnType}
*
* @example
* import { createWalletClient, custom } from 'viem'
* import { mainnet } from 'viem/chains'
* import { signTransaction } from 'viem/actions'
*
* const client = createWalletClient({
*   chain: mainnet,
*   transport: custom(window.ethereum),
* })
* const signature = await signTransaction(client, {
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
* import { signTransaction } from 'viem/actions'
*
* const client = createWalletClient({
*   account: privateKeyToAccount('0x…'),
*   chain: mainnet,
*   transport: custom(window.ethereum),
* })
* const signature = await signTransaction(client, {
*   to: '0x0000000000000000000000000000000000000000',
*   value: 1n,
* })
*/
async function signTransaction(client, parameters) {
	const { account: account_ = client.account, chain = client.chain, ...transaction } = parameters;
	if (!account_) throw new AccountNotFoundError({ docsPath: "/docs/actions/wallet/signTransaction" });
	const account = parseAccount(account_);
	assertRequest({
		account,
		...parameters
	});
	const chainId = await getAction(client, getChainId, "getChainId")({});
	if (chain !== null) assertCurrentChain({
		currentChainId: chainId,
		chain
	});
	const format = (chain?.formatters || client.chain?.formatters)?.transactionRequest?.format || formatTransactionRequest;
	if (account.signTransaction) return account.signTransaction({
		...transaction,
		account,
		chainId
	}, { serializer: client.chain?.serializers?.transaction });
	return await client.request({
		method: "eth_signTransaction",
		params: [{
			...format({
				...transaction,
				account
			}, "signTransaction"),
			chainId: numberToHex(chainId),
			from: account.address
		}]
	}, { retryCount: 0 });
}
//#endregion
//#region node_modules/viem/_esm/actions/wallet/signTypedData.js
/**
* Signs typed data and calculates an Ethereum-specific signature in [https://eips.ethereum.org/EIPS/eip-712](https://eips.ethereum.org/EIPS/eip-712): `sign(keccak256("\x19\x01" ‖ domainSeparator ‖ hashStruct(message)))`
*
* - Docs: https://viem.sh/docs/actions/wallet/signTypedData
* - JSON-RPC Methods:
*   - JSON-RPC Accounts: [`eth_signTypedData_v4`](https://docs.metamask.io/guide/signing-data#signtypeddata-v4)
*   - Local Accounts: Signs locally. No JSON-RPC request.
*
* @param client - Client to use
* @param parameters - {@link SignTypedDataParameters}
* @returns The signed data. {@link SignTypedDataReturnType}
*
* @example
* import { createWalletClient, custom } from 'viem'
* import { mainnet } from 'viem/chains'
* import { signTypedData } from 'viem/wallet'
*
* const client = createWalletClient({
*   chain: mainnet,
*   transport: custom(window.ethereum),
* })
* const signature = await signTypedData(client, {
*   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
*   domain: {
*     name: 'Ether Mail',
*     version: '1',
*     chainId: 1,
*     verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
*   },
*   types: {
*     Person: [
*       { name: 'name', type: 'string' },
*       { name: 'wallet', type: 'address' },
*     ],
*     Mail: [
*       { name: 'from', type: 'Person' },
*       { name: 'to', type: 'Person' },
*       { name: 'contents', type: 'string' },
*     ],
*   },
*   primaryType: 'Mail',
*   message: {
*     from: {
*       name: 'Cow',
*       wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
*     },
*     to: {
*       name: 'Bob',
*       wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
*     },
*     contents: 'Hello, Bob!',
*   },
* })
*
* @example
* // Account Hoisting
* import { createWalletClient, http } from 'viem'
* import { privateKeyToAccount } from 'viem/accounts'
* import { mainnet } from 'viem/chains'
* import { signTypedData } from 'viem/wallet'
*
* const client = createWalletClient({
*   account: privateKeyToAccount('0x…'),
*   chain: mainnet,
*   transport: http(),
* })
* const signature = await signTypedData(client, {
*   domain: {
*     name: 'Ether Mail',
*     version: '1',
*     chainId: 1,
*     verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
*   },
*   types: {
*     Person: [
*       { name: 'name', type: 'string' },
*       { name: 'wallet', type: 'address' },
*     ],
*     Mail: [
*       { name: 'from', type: 'Person' },
*       { name: 'to', type: 'Person' },
*       { name: 'contents', type: 'string' },
*     ],
*   },
*   primaryType: 'Mail',
*   message: {
*     from: {
*       name: 'Cow',
*       wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
*     },
*     to: {
*       name: 'Bob',
*       wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
*     },
*     contents: 'Hello, Bob!',
*   },
* })
*/
async function signTypedData(client, parameters) {
	const { account: account_ = client.account, domain, message, primaryType } = parameters;
	if (!account_) throw new AccountNotFoundError({ docsPath: "/docs/actions/wallet/signTypedData" });
	const account = parseAccount(account_);
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
	if (account.signTypedData) return account.signTypedData({
		domain,
		message,
		primaryType,
		types
	});
	const typedData = serializeTypedData({
		domain,
		message,
		primaryType,
		types
	});
	return client.request({
		method: "eth_signTypedData_v4",
		params: [account.address, typedData]
	}, { retryCount: 0 });
}
//#endregion
//#region node_modules/viem/_esm/actions/wallet/switchChain.js
/**
* Switch the target chain in a wallet.
*
* - Docs: https://viem.sh/docs/actions/wallet/switchChain
* - JSON-RPC Methods: [`wallet_switchEthereumChain`](https://eips.ethereum.org/EIPS/eip-3326)
*
* @param client - Client to use
* @param parameters - {@link SwitchChainParameters}
*
* @example
* import { createWalletClient, custom } from 'viem'
* import { mainnet, optimism } from 'viem/chains'
* import { switchChain } from 'viem/wallet'
*
* const client = createWalletClient({
*   chain: mainnet,
*   transport: custom(window.ethereum),
* })
* await switchChain(client, { id: optimism.id })
*/
async function switchChain(client, { id }) {
	await client.request({
		method: "wallet_switchEthereumChain",
		params: [{ chainId: numberToHex(id) }]
	}, { retryCount: 0 });
}
//#endregion
//#region node_modules/viem/_esm/actions/wallet/watchAsset.js
/**
* Adds an EVM chain to the wallet.
*
* - Docs: https://viem.sh/docs/actions/wallet/watchAsset
* - JSON-RPC Methods: [`eth_switchEthereumChain`](https://eips.ethereum.org/EIPS/eip-747)
*
* @param client - Client to use
* @param parameters - {@link WatchAssetParameters}
* @returns Boolean indicating if the token was successfully added. {@link WatchAssetReturnType}
*
* @example
* import { createWalletClient, custom } from 'viem'
* import { mainnet } from 'viem/chains'
* import { watchAsset } from 'viem/wallet'
*
* const client = createWalletClient({
*   chain: mainnet,
*   transport: custom(window.ethereum),
* })
* const success = await watchAsset(client, {
*   type: 'ERC20',
*   options: {
*     address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
*     decimals: 18,
*     symbol: 'WETH',
*   },
* })
*/
async function watchAsset(client, params) {
	return await client.request({
		method: "wallet_watchAsset",
		params
	}, { retryCount: 0 });
}
//#endregion
//#region node_modules/viem/_esm/clients/decorators/wallet.js
function walletActions(client) {
	return {
		addChain: (args) => addChain(client, args),
		deployContract: (args) => deployContract(client, args),
		fillTransaction: (args) => fillTransaction(client, args),
		getAddresses: () => getAddresses(client),
		getCallsStatus: (args) => getCallsStatus(client, args),
		getCapabilities: (args) => getCapabilities(client, args),
		getChainId: () => getChainId(client),
		getPermissions: () => getPermissions(client),
		prepareAuthorization: (args) => prepareAuthorization(client, args),
		prepareTransactionRequest: (args) => prepareTransactionRequest(client, args),
		requestAddresses: () => requestAddresses(client),
		requestPermissions: (args) => requestPermissions(client, args),
		sendCalls: (args) => sendCalls(client, args),
		sendCallsSync: (args) => sendCallsSync(client, args),
		sendRawTransaction: (args) => sendRawTransaction(client, args),
		sendRawTransactionSync: (args) => sendRawTransactionSync(client, args),
		sendTransaction: (args) => sendTransaction(client, args),
		sendTransactionSync: (args) => sendTransactionSync(client, args),
		showCallsStatus: (args) => showCallsStatus(client, args),
		signAuthorization: (args) => signAuthorization(client, args),
		signMessage: (args) => signMessage(client, args),
		signTransaction: (args) => signTransaction(client, args),
		signTypedData: (args) => signTypedData(client, args),
		switchChain: (args) => switchChain(client, args),
		waitForCallsStatus: (args) => waitForCallsStatus(client, args),
		watchAsset: (args) => watchAsset(client, args),
		writeContract: (args) => writeContract(client, args),
		writeContractSync: (args) => writeContractSync(client, args),
		token: {
			approve: bindActionDecorators(client, approve),
			approveSync: bindActionDecorators(client, approveSync),
			transfer: bindActionDecorators(client, transfer),
			transferSync: bindActionDecorators(client, transferSync)
		}
	};
}
//#endregion
//#region node_modules/viem/_esm/clients/createWalletClient.js
function createWalletClient(parameters) {
	const { key = "wallet", name = "Wallet Client", transport } = parameters;
	return createClient({
		...parameters,
		key,
		name,
		transport,
		type: "walletClient"
	}).extend(walletActions);
}
//#endregion
//#region node_modules/viem/_esm/clients/transports/createTransport.js
/**
* @description Creates an transport intended to be used with a client.
*/
function createTransport({ key, methods, name, request, retryCount = 3, retryDelay = 150, timeout, type }, value) {
	const uid$1 = uid();
	return {
		config: {
			key,
			methods,
			name,
			request,
			retryCount,
			retryDelay,
			timeout,
			type
		},
		request: buildRequest(request, {
			methods,
			retryCount,
			retryDelay,
			uid: uid$1
		}),
		value
	};
}
//#endregion
//#region node_modules/viem/_esm/clients/transports/custom.js
/**
* @description Creates a custom transport given an EIP-1193 compliant `request` attribute.
*/
function custom(provider, config = {}) {
	const { key = "custom", methods, name = "Custom Provider", retryDelay } = config;
	return ({ retryCount: defaultRetryCount }) => createTransport({
		key,
		methods,
		name,
		request: provider.request.bind(provider),
		retryCount: config.retryCount ?? defaultRetryCount,
		retryDelay,
		type: "custom"
	});
}
//#endregion
//#region node_modules/viem/_esm/errors/transport.js
var UrlRequiredError = class extends BaseError {
	constructor() {
		super("No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.", {
			docsPath: "/docs/clients/intro",
			name: "UrlRequiredError"
		});
	}
};
//#endregion
//#region node_modules/viem/_esm/clients/transports/http.js
var signalId = 0;
var signalIds = /* @__PURE__ */ new WeakMap();
function getSignalId(signal) {
	if (!signal) return "default";
	const id = signalIds.get(signal);
	if (id !== void 0) return id;
	const nextId = signalId++;
	signalIds.set(signal, nextId);
	return nextId;
}
/**
* @description Creates a HTTP transport that connects to a JSON-RPC API.
*/
function http(url, config = {}) {
	const { batch, fetchFn, fetchOptions, key = "http", maxResponseBodySize, methods, name = "HTTP JSON-RPC", onFetchRequest, onFetchResponse, retryDelay, raw } = config;
	const batchId = uid();
	return ({ chain, retryCount: retryCount_, timeout: timeout_ }) => {
		const { batchSize = 1e3, wait = 0 } = typeof batch === "object" ? batch : {};
		const retryCount = config.retryCount ?? retryCount_;
		const timeout = timeout_ ?? config.timeout ?? 1e4;
		const url_ = url || chain?.rpcUrls.default.http[0];
		if (!url_) throw new UrlRequiredError();
		const rpcClient = getHttpRpcClient(url_, {
			fetchFn,
			fetchOptions,
			maxResponseBodySize,
			onRequest: onFetchRequest,
			onResponse: onFetchResponse,
			timeout
		});
		return createTransport({
			key,
			methods,
			name,
			async request({ method, params }, options) {
				const body = {
					method,
					params
				};
				const fetchOptions = options?.signal ? { signal: options.signal } : void 0;
				const { schedule } = createBatchScheduler({
					id: `${batchId}.${url_}.${getSignalId(options?.signal)}`,
					wait,
					shouldSplitBatch: (size) => size > batchSize,
					fn: async (requests) => {
						const body = requests.map((request) => ({
							...request,
							id: idCache.take()
						}));
						const replies = await rpcClient.request({
							body,
							fetchOptions
						});
						const byId = new Map(body.map(({ id }) => [String(id), void 0]));
						const unattributed = [];
						for (const reply of replies) {
							const id = String(reply.id);
							if (byId.has(id)) byId.set(id, reply);
							else unattributed.push(reply);
						}
						return body.map(({ id }) => byId.get(String(id)) ?? unattributed.shift() ?? {
							jsonrpc: "2.0",
							id,
							error: {
								code: -32603,
								message: "Missing response for request."
							}
						});
					}
				});
				const fn = async (body) => batch ? schedule(body) : [await rpcClient.request({
					body,
					fetchOptions
				})];
				const [{ error, result }] = await fn(body).catch((err) => {
					if (raw && err instanceof RpcRequestError) return [{
						error: err.cause,
						result: void 0
					}];
					throw err;
				});
				if (raw) return {
					error,
					result
				};
				if (error) throw new RpcRequestError({
					body,
					error,
					url: url_
				});
				return result;
			},
			retryCount,
			retryDelay,
			timeout,
			type: "http"
		}, {
			fetchOptions,
			url: url_
		});
	};
}
//#endregion
export { ccip_exports as a, defineChain as i, custom as n, createWalletClient as r, http as t };
