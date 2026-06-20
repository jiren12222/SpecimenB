// wallet.js - Phantom Wallet Integration

let walletPubkey = null;
let walletConnected = false;

function isPhantomInstalled() {
    return typeof window.solana !== 'undefined' && window.solana.isPhantom;
}

async function connectPhantom() {
    if (!isPhantomInstalled()) {
        window.open('https://phantom.app/', '_blank');
        alert('Install Phantom wallet first');
        return;
    }
    try {
        const resp = await window.solana.connect();
        walletPubkey = resp.publicKey.toString();
        walletConnected = true;
        
        document.getElementById('walletLabel').textContent = walletPubkey.slice(0,4)+'...'+walletPubkey.slice(-4);
        document.getElementById('sbWalletBtn').textContent = walletPubkey.slice(0,4)+'...'+walletPubkey.slice(-4);
        document.getElementById('walletStatusText').textContent = 'Connected';
        document.getElementById('walletAddr').textContent = walletPubkey;
        document.getElementById('walletIcon').textContent = '';
        document.getElementById('walletTokens').style.display = 'block';
        document.getElementById('walletTokensEmpty').style.display = 'none';
        
        await fetchTokens(walletPubkey);
        log('ok','[OK] Wallet: '+walletPubkey.slice(0,12)+'...');
    } catch(e) {
        log('err','[ERR] '+e.message);
    }
}

function disconnectWallet() {
    window.solana.disconnect();
    walletPubkey = null;
    walletConnected = false;
    document.getElementById('walletLabel').textContent = 'Connect';
    document.getElementById('sbWalletBtn').textContent = 'Connect Wallet';
    document.getElementById('walletStatusText').textContent = 'Not Connected';
    document.getElementById('walletAddr').textContent = '-';
    document.getElementById('walletIcon').textContent = '';
    document.getElementById('walletTokens').style.display = 'none';
    document.getElementById('walletTokensEmpty').style.display = 'block';
    log('info','> Wallet disconnected');
}
