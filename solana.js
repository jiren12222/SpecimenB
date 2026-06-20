const RPC = 'https://api.mainnet-beta.solana.com';
const TOKEN_PROGRAM = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';

async function rpcCall(method, params) {
    const r = await fetch(RPC, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({jsonrpc:'2.0',id:1,method,params})
    });
    const j = await r.json();
    if(j.error) throw new Error(j.error.message);
    return j.result;
}

async function fetchTokens(owner) {
    try {
        const r = await rpcCall('getTokenAccountsByOwner', [
            owner,
            {programId: TOKEN_PROGRAM},
            {encoding: 'jsonParsed'}
        ]);
        const tokens = r.value.map(v => {
            const i = v.account.data.parsed.info;
            return {
                mint: i.mint,
                symbol: knownSymbol(i.mint),
                name: knownName(i.mint),
                amount: i.tokenAmount.uiAmount || 0,
                decimals: i.tokenAmount.decimals,
                ata: v.pubkey
            };
        }).filter(t => t.amount > 0);
        updateTokenDropdown(tokens);
        log('ok','[OK] Found '+tokens.length+' tokens');
        return tokens;
    } catch(e) {
        log('warn','[!] Using demo tokens');
        updateTokenDropdown(demoTokens());
        return demoTokens();
    }
}

async function getSOLBalance(pubkey) {
    try {
        const r = await rpcCall('getBalance', [pubkey]);
        return r.value / 1e9;
    } catch(e) { return 0; }
}

function knownSymbol(mint) {
    const map = {
        'So11111111111111111111111111111111111111112': 'SOL',
        'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': 'USDC',
        'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263': 'BONK',
        'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB': 'USDT',
        '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU': 'SPEC'
    };
    return map[mint] || mint.slice(0,6)+'...';
}

function knownName(mint) {
    const map = {
        'So11111111111111111111111111111111111111112': 'Wrapped SOL',
        'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': 'USD Coin',
        'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263': 'Bonk',
        'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB': 'Tether',
        '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU': 'Specimen Token'
    };
    return map[mint] || 'Unknown Token';
}

function demoTokens() {
    return [
        {mint:'So11111111111111111111111111111111111111112',symbol:'SOL',name:'Wrapped SOL',amount:145.82,decimals:9},
        {mint:'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',symbol:'USDC',name:'USD Coin',amount:50000,decimals:6},
        {mint:'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',symbol:'BONK',name:'Bonk',amount:2450000000,decimals:5},
        {mint:'7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',symbol:'SPEC',name:'Specimen Token',amount:1000000,decimals:6}
    ];
}

function updateTokenDropdown(tokens) {
    const menu = document.getElementById('tkMenu');
    if(!menu) return;
    menu.innerHTML = tokens.map(t => 
        '<div class="token-opt" onclick="selToken(\''+t.symbol+'\',\''+t.name+'\',\''+t.amount.toLocaleString()+'\',\''+t.mint+'\','+t.decimals+')">'+
        '<div class="tkn">'+t.symbol.slice(0,2)+'</div>'+
        '<div style="flex:1"><div style="font-size:12px;color:var(--text)">'+t.symbol+'</div><div style="font-size:10px;color:var(--text2)">'+t.name+'</div></div>'+
        '<div style="color:var(--green);font-size:12px">'+t.amount.toLocaleString()+'</div></div>'
    ).join('');
}
