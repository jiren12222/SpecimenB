// wallet.js - Phantom Wallet Integration for SpecimenB

const PHANTOM_URL = 'https://phantom.app/';
let wallet = null;
let walletAddress = null;

// Check if Phantom is installed
function isPhantomInstalled() {
    return window.solana && window.solana.isPhantom;
}

// Connect wallet
async function connectPhantom() {
    if (!isPhantomInstalled()) {
        alert('Phantom wallet not found!\n\nInstall from ' + PHANTOM_URL);
        window.open(PHANTOM_URL, '_blank');
        return null;
    }
    
    try {
        const resp = await window.solana.connect();
        walletAddress = resp.publicKey.toString();
        wallet = window.solana;
        
        // Save to UI
        updateWalletUI(walletAddress, true);
        
        // Auto-fetch tokens
        await fetchTokens(walletAddress);
        
        console.log('[OK] Wallet:', walletAddress);
        return walletAddress;
        
    } catch (err) {
        console.error('[ERR] Connect failed:', err);
        updateWalletUI(null, false);
        return null;
    }
}

// Disconnect wallet
async function disconnectPhantom() {
    if (wallet) {
        await wallet.disconnect();
    }
    wallet = null;
    walletAddress = null;
    updateWalletUI(null, false);
}

// Update wallet display in UI
function updateWalletUI(address, connected) {
    const statusEl = document.getElementById('walletStatusText');
    const addrEl = document.getElementById('walletAddr');
    const btn = document.getElementById('walletActionBtn');
    const sbBtn = document.getElementById('sbWalletBtn');
    
    if (connected && address) {
        statusEl.textContent = 'Connected';
        statusEl.style.color = 'var(--green)';
        addrEl.textContent = address;
        btn.textContent = 'Disconnect';
        btn.onclick = disconnectPhantom;
        sbBtn.textContent = address.slice(0, 4) + '...' + address.slice(-4);
        document.getElementById('walletIcon').textContent = '👛';
        document.getElementById('walletTokens').style.display = 'block';
        document.getElementById('walletTokensEmpty').style.display = 'none';
    } else {
        statusEl.textContent = 'Not Connected';
        statusEl.style.color = '';
        addrEl.textContent = '-';
        btn.textContent = 'Connect Wallet';
        btn.onclick = connectPhantom;
        sbBtn.textContent = 'Connect Wallet';
        document.getElementById('walletIcon').textContent = '🔌';
        document.getElementById('walletTokens').style.display = 'none';
        document.getElementById('walletTokensEmpty').style.display = 'block';
    }
}

// Fetch SPL tokens using Solana Web3
async function fetchTokens(ownerAddress) {
    // This uses the Solana JSON-RPC directly
    const RPC_URL = 'https://api.mainnet-beta.solana.com';
    
    try {
        const response = await fetch(RPC_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getTokenAccountsByOwner',
                params: [
                    ownerAddress,
                    { programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' },
                    { encoding: 'jsonParsed' }
                ]
            })
        });
        
        const data = await response.json();
        const accounts = data.result?.value || [];
        
        // Parse tokens
        const tokens = accounts.map(acc => {
            const info = acc.account.data.parsed.info;
            return {
                mint: info.mint,
                amount: info.tokenAmount.uiAmount,
                decimals: info.tokenAmount.decimals,
                ata: acc.pubkey
            };
        }).filter(t => t.amount > 0);
        
        console.log('[OK] Found', tokens.length, 'tokens');
        updateTokenList(tokens);
        return tokens;
        
    } catch (err) {
        console.error('[ERR] Token fetch:', err);
        // Fallback: show known tokens
        return showDemoTokens();
    }
}

// Show demo tokens if RPC fails
function showDemoTokens() {
    const demoTokens = [
        { mint: 'So11111111111111111111111111111111111111112', symbol: 'SOL', name: 'Wrapped SOL', amount: 145.82, decimals: 9 },
        { mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', symbol: 'USDC', name: 'USD Coin', amount: 50000, decimals: 6 },
        { mint: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU', symbol: 'SPEC', name: 'Specimen Token', amount: 1000000, decimals: 6 },
        { mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', symbol: 'BONK', name: 'Bonk', amount: 2450000000, decimals: 5 }
    ];
    updateTokenList(demoTokens);
    return demoTokens;
}

// Update token dropdown in UI
function updateTokenList(tokens) {
    const menu = document.getElementById('tkMenu');
    if (!menu) return;
    
    // Clear and rebuild
    menu.innerHTML = tokens.map(t => `
        <div class="token-opt" onclick="selToken('${t.symbol}','${t.name}','${t.amount.toLocaleString()}','${t.mint}',${t.decimals})">
            <div class="tkn">${t.symbol.slice(0,2)}</div>
            <div style="flex:1">
                <div style="font-size:12px;color:var(--text)">${t.symbol}</div>
                <div style="font-size:10px;color:var(--text2)">${t.name}</div>
            </div>
            <div style="color:var(--green);font-size:12px">${t.amount.toLocaleString()}</div>
        </div>
    `).join('');
    
    // Auto-select first
    if (tokens.length > 0) {
        const t = tokens[0];
        selToken(t.symbol, t.name, t.amount.toLocaleString(), t.mint, t.decimals);
    }
}

// Get SOL balance
async function getSOLBalance(address) {
    try {
        const response = await fetch('https://api.mainnet-beta.solana.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'getBalance',
                params: [address]
            })
        });
        const data = await response.json();
        return (data.result?.value || 0) / 1e9;
    } catch {
        return 0;
    }
}

// Export for use in other modules
window.SpecimenBWallet = {
    connect: connectPhantom,
    disconnect: disconnectPhantom,
    getAddress: () => walletAddress,
    isConnected: () => !!walletAddress,
    fetchTokens,
    getSOLBalance
};
