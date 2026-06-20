async function captureSnapshot(tokenMint, minBalance) {
    log('info','> Capturing snapshot: '+tokenMint.slice(0,12)+'...');
    log('info','> Min balance: '+minBalance);
    
    try {
        const r = await rpcCall('getProgramAccounts', [
            'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
            {
                encoding: 'jsonParsed',
                filters: [
                    {dataSize: 165},
                    {memcmp: {offset: 0, bytes: tokenMint}}
                ]
            }
        ]);
        
        let holders = [];
        for (const acc of r) {
            try {
                const info = acc.account.data.parsed.info;
                const bal = parseFloat(info.tokenAmount.uiAmount || 0);
                if (bal >= minBalance) {
                    holders.push({wallet: info.owner, balance: bal});
                }
            } catch(e) {}
        }
        
        holders.sort((a,b) => b.balance - a.balance);
        const total = holders.reduce((s,h) => s + h.balance, 0);
        
        log('ok','[OK] Found '+holders.length+' holders');
        log('ok','[OK] Total supply: '+total.toLocaleString());
        
        return {holders, total, count: holders.length};
        
    } catch(e) {
        log('err','[ERR] Snapshot failed: '+e.message);
        return demoSnapshot();
    }
}

function demoSnapshot() {
    const holders = [
        {wallet:'7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',balance:2450000},
        {wallet:'3nR7hP1mQw4kL9vB2sT5jC8xZ0aE6dF4gH7iJ3kL1mN',balance:1820000},
        {wallet:'9pQR4uN7xW2bC5vE8yA1dF4gH7iJ0kL3mN6oP9qR2sT',balance:980000},
        {wallet:'2bC5vE8yA1dF4gH7iJ0kL3mN6oP9qR2sT5vW8xZ1aB4c',balance:650000},
        {wallet:'5vE8yA1dF4gH7iJ0kL3mN6oP9qR2sT5vW8xZ1aB4cD7e',balance:420000}
    ];
    log('ok','[OK] Demo snapshot: 5 holders');
    return {holders, total: 6320000, count: 5};
}
