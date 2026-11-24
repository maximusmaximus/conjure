// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title Conjure
/// @notice ERC-721-shaped collection for saved brews on Robinhood Chain.
///         Royalty is a fixed 5% (ERC-2981). tokenURI is immutable after mint.
///         MINTER_ROLE is the only minter. Per-account cap. Owner can pause.
contract Conjure {
    string public name = "Conjure";
    string public symbol = "CONJURE";
    uint256 public constant ROYALTY_BPS = 500;
    uint256 public constant BPS = 10_000;

    address public owner;
    address public royaltyReceiver;
    address public minter;
    bool public paused;
    uint256 public nextId = 1;
    uint256 public mintCap;

    mapping(uint256 => address) public ownerOf;
    mapping(address => uint256) public balanceOf;
    mapping(uint256 => address) public getApproved;
    mapping(address => mapping(address => bool)) public isApprovedForAll;
    mapping(uint256 => string) private _tokenURI;
    mapping(address => uint256) public mintedBy;

    event Transfer(address indexed from, address indexed to, uint256 indexed id);
    event Approval(address indexed owner, address indexed spender, uint256 indexed id);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    event Paused(bool paused);

    error NotOwner();
    error PausedMint();
    error NotMinter();
    error Cap();
    error BadReceiver();
    error NotHolder();

    constructor(address royalty, address minter_, uint256 cap) {
        owner = msg.sender;
        royaltyReceiver = royalty;
        minter = minter_;
        mintCap = cap;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    function setPaused(bool next) external onlyOwner {
        paused = next;
        emit Paused(next);
    }

    function setMinter(address next) external onlyOwner {
        minter = next;
    }

    function setRoyaltyReceiver(address next) external onlyOwner {
        if (next == address(0)) revert BadReceiver();
        royaltyReceiver = next;
    }

    function mint(address to, string calldata uri) external returns (uint256 id) {
        if (paused) revert PausedMint();
        if (msg.sender != minter) revert NotMinter();
        if (to == address(0)) revert BadReceiver();
        if (mintedBy[to] >= mintCap) revert Cap();
        id = nextId++;
        mintedBy[to] += 1;
        ownerOf[id] = to;
        balanceOf[to] += 1;
        _tokenURI[id] = uri;
        emit Transfer(address(0), to, id);
    }

    function tokenURI(uint256 id) external view returns (string memory) {
        if (ownerOf[id] == address(0)) revert NotHolder();
        return _tokenURI[id];
    }

    function royaltyInfo(uint256, uint256 salePrice) external view returns (address, uint256) {
        return (royaltyReceiver, (salePrice * ROYALTY_BPS) / BPS);
    }

    function approve(address spender, uint256 id) external {
        address holder = ownerOf[id];
        if (msg.sender != holder && !isApprovedForAll[holder][msg.sender]) revert NotHolder();
        getApproved[id] = spender;
        emit Approval(holder, spender, id);
    }

    function setApprovalForAll(address operator, bool approved) external {
        isApprovedForAll[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function transferFrom(address from, address to, uint256 id) public {
        if (to == address(0)) revert BadReceiver();
        address holder = ownerOf[id];
        if (holder != from) revert NotHolder();
        if (
            msg.sender != holder &&
            getApproved[id] != msg.sender &&
            !isApprovedForAll[holder][msg.sender]
        ) revert NotHolder();
        getApproved[id] = address(0);
        balanceOf[from] -= 1;
        balanceOf[to] += 1;
        ownerOf[id] = to;
        emit Transfer(from, to, id);
    }

    function safeTransferFrom(address from, address to, uint256 id) external {
        transferFrom(from, to, id);
    }

    function supportsInterface(bytes4 interfaceId) external pure returns (bool) {
        return
            interfaceId == 0x80ac58cd || // ERC-721
            interfaceId == 0x5b5e139f || // ERC-721 metadata
            interfaceId == 0x2a55205a || // ERC-2981
            interfaceId == 0x01ffc9a7; // ERC-165
    }
}
