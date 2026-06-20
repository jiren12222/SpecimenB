async function sendSPLToken(mint, recipient, amount, decimals, senderATA, recipientATA) {
    log('info','> Building tx: '+recipient.slice(0,8)+'... -> '+amount);
    
    try {
        const { Transaction, SystemProgram, PublicKey } = solanaWeb3;
        const { getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, createTransferInstruction } = splToken;
        
        const mintPK = new PublicKey(mint);
        const senderPK = new PublicKey(window.solana.publicKey);
        const recipientPK = new PublicKey(recipient);
        
        const fromATA = senderATA ? new PublicKey(senderATA) : await getAssociatedTokenAddress(mintPK, senderPK);
        const toATA = recipientATA ? new PublicKey(recipientATA) : await getAssociatedTokenAddress(mintPK, recipientPK);
        
        const tx = new Transaction();
        
        // Check if recipient ATA exists
        const accountInfo = await connection.getAccountInfo(toATA);
        if (!accountInfo) {
            tx.add(createAssociatedTokenAccountInstruction(senderPK, toATA, recipientPK, mintPK));
        }
        
        tx.add(createTransferInstruction(
            fromATA,
            toATA,
            senderPK,
            BigInt(Math.floor(amount * Math.pow(10, decimals)))
        ));
        
        const { blockhash } = await connection.getLatestBlockhash();
        tx.recentBlockhash = blockhash;
        tx.feePayer = senderPK;
        
        const signed = await window.solana.signTransaction(tx);
        const sig = await connection.sendRawTransaction(signed.serialize());
        
        log('ok','[OK] Signature: '+sig.slice(0,16)+'...');
        return sig;
        
    } catch(e) {
        log('err','[ERR] '+e.message);
        return null;
    }
}
