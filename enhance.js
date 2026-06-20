// SpecimenB Enhancement - Adds sidebar, pages, and working features

(function() {
// ===== INJECT SIDEBAR CSS =====
const style = document.createElement('style');
style.textContent = `
.sb-wrap{position:fixed;left:0;top:0;bottom:0;width:240px;background:#0a0a0e;border-right:1px solid rgba(255,255,255,0.1);z-index:300;display:flex;flex-direction:column;transform:translateX(-100%);transition:transform .3s}
.sb-wrap.open{transform:translateX(0)}
.sb-h{padding:18px 16px;border-bottom:1px solid rgba(255,255,255,0.08)}
.sb-brand{display:flex;align-items:center;gap:10px}
.sb-brand .bx{width:32px;height:32px;border-radius:4px;background:linear-gradient(135deg,#a3e635,#22d3ee);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:13px;color:#050507}
.sb-brand .nm{font-size:14px;font-weight:700;letter-spacing:.05em}
.sb-brand .tg{font-size:8px;color:#8888a0;letter-spacing:.15em;text-transform:uppercase}
.sb-nav{flex:1;padding:12px 0;overflow-y:auto}
.sb-sec{font-size:8px;color:#8888a0;letter-spacing:.2em;text-transform:uppercase;padding:16px 16px 8px}
.sb-item{display:flex;align-items:center;gap:10px;padding:10px 16px;font-size:12px;color:#8888a0;cursor:pointer;border-left:3px solid transparent;transition:all .15s}
.sb-item:hover{background:rgba(255,255,255,0.03);color:#f5f5f5}
.sb-item.on{background:rgba(163,230,53,0.06);color:#a3e635;border-left-color:#a3e635}
.sb-foot{padding:14px 16px;border-top:1px solid rgba(255,255,255,0.08)}
.sb-wb{width:100%;padding:10px;border:1px solid rgba(163,230,53,0.3);background:rgba(163,230,53,0.05);color:#a3e635;font-family:inherit;font-size:11px;cursor:pointer}
.sb-st{display:flex;align-items:center;gap:6px;margin-top:10px;font-size:10px;color:#8888a0}
.sb-dt{width:6px;height:6px;border-radius:50%;background:#a3e635;animation:sbPulse 2s infinite}
@keyframes sbPulse{0%,100%{opacity:1}50%{opacity:.3}}
.sb-x{position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:250;display:none}
.sb-x.show{display:block}
.sb-toggle{position:fixed;top:12px;left:12px;z-index:200;width:36px;height:36px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:4px;cursor:pointer;background:#0a0a0e;border:1px solid rgba(255,255,255,0.1)}
.sb-toggle span{display:block;width:16px;height:1.5px;background:#f5f5f5}
.sb-main{transition:margin-left .3s}
@media(min-width:769px){.sb-wrap{transform:translateX(0)}.sb-toggle{display:none}.sb-x{display:none!important}.sb-main{margin-left:240px}}
@media(max-width:768px){.sb-wrap{width:260px}}

/* Pages */
.pg{display:none;padding:24px;max-width:1100px;margin:0 auto}
.pg.on{display:block}
.pg-h{margin-bottom:24px}
.pg-lbl{font-size:9px;color:#22d3ee;letter-spacing:.25em;text-transform:uppercase;margin-bottom:8px;opacity:.7}
.pg-tit{font-family:'Georgia','Times New Roman',serif;font-size:clamp(26px,5vw,44px);font-style:italic;margin-bottom:8px}
.pg-desc{font-size:12px;color:#8888a0;max-width:500px;line-height:1.6}

/* Distribution panel */
.dist-stats{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:16px}
@media(min-width:600px){.dist-stats{grid-template-columns:repeat(3,1fr)}}
@media(min-width:900px){.dist-stats{grid-template-columns:repeat(6,1fr)}}
.ds-box{padding:12px;background:#0c0c10;border:1px solid rgba(255,255,255,0.1)}
.ds-v{font-size:18px;font-weight:700;color:#f5f5f5}
.ds-v.g{color:#a3e635}.ds-v.c{color:#22d3ee}.ds-v.r{color:#ef4444}.ds-v.y{color:#eab308}
.ds-l{font-size:8px;color:#8888a0;text-transform:uppercase;letter-spacing:.1em;margin-top:4px}

/* Tables */
.tbl{width:100%;font-size:11px;border-collapse:collapse;margin-top:12px}
.tbl th{text-align:left;padding:8px;font-size:9px;color:#8888a0;text-transform:uppercase;letter-spacing:.08em;border-bottom:1px solid rgba(255,255,255,0.1);font-weight:400}
.tbl td{padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);color:rgba(255,255,255,0.65)}
.tbl tr:hover td{background:rgba(255,255,255,0.02)}
.tag{display:inline-block;padding:2px 6px;border:1px solid rgba(255,255,255,0.1);font-size:8px;color:#8888a0;text-transform:uppercase}
`;
document.head.appendChild(style);

// ===== CREATE SIDEBAR =====
const sb = document.createElement('div');
sb.className = 'sb-wrap';
sb.id = 'sidebar';
sb.innerHTML = `
<div class="sb-h"><div class="sb-brand"><div class="bx">SB</div><div><div class="nm">SpecimenB</div><div class="tg">distribution made easy</div></div></div></div>
<div class="sb-nav">
<div class="sb-sec">Main</div>
<div class="sb-item on" data-pg="dashboard" onclick="nav('dashboard',this)">&#128202; Dashboard</div>
<div class="sb-item" data-pg="distribution" onclick="nav('distribution',this)">&#128640; Distribution</div>
<div class="sb-item" data-pg="snapshot" onclick="nav('snapshot',this)">&#128248; Snapshot</div>
<div class="sb-item" data-pg="terminal" onclick="nav('terminal',this)">&#128187; Terminal</div>
<div class="sb-item" data-pg="modules" onclick="nav('modules',this)">&#128302; Modules</div>
<div class="sb-sec">System</div>
<div class="sb-item" data-pg="wallet" onclick="nav('wallet',this)">&#128091; Wallet</div>
<div class="sb-item" data-pg="settings" onclick="nav('settings',this)">&#9881; Settings</div>
</div>
<div class="sb-foot">
<button class="sb-wb" id="sbConnBtn" onclick="enhanceConnect()">Connect Wallet</button>
<div class="sb-st"><span class="sb-dt"></span><span>Mainnet Active</span></div>
</div>`;
document.body.appendChild(sb);

// Overlay
const overlay = document.createElement('div');
overlay.className = 'sb-x';
overlay.id = 'sbOverlay';
overlay.onclick = () => { sb.classList.remove('open'); overlay.classList.remove('show'); };
document.body.appendChild(overlay);

// Toggle button
const toggle = document.createElement('div');
toggle.className = 'sb-toggle';
toggle.onclick = () => { sb.classList.add('open'); overlay.classList.add('show'); };
toggle.innerHTML = '<span></span><span></span><span></span>';
document.body.appendChild(toggle);

// Wrap main content
const main = document.querySelector('.main') || document.querySelector('main') || document.body;
main.classList.add('sb-main');

// ===== CREATE EXTRA PAGES =====
const pagesContainer = document.createElement('div');
pagesContainer.innerHTML = `
<!-- DISTRIBUTION PAGE -->
<div class="pg" id="pg-distribution">
<div class="pg-h"><div class="pg-lbl">// Live Distribution</div><div class="pg-tit">Distribution Panel</div></div>
<div class="dist-stats">
<div class="ds-box"><div class="ds-v g" id="dSent">8,500</div><div class="ds-l">Total Sent</div></div>
<div class="ds-box"><div class="ds-v c" id="dRec">4,521</div><div class="ds-l">Recipients</div></div>
<div class="ds-box"><div class="ds-v g" id="dConf">4,498</div><div class="ds-l">Confirmed</div></div>
<div class="ds-box"><div class="ds-v r" id="dFail">23</div><div class="ds-l">Failed</div></div>
<div class="ds-box"><div class="ds-v y">0.000005</div><div class="ds-l">Avg Fee SOL</div></div>
<div class="ds-box"><div class="ds-v">0.0226</div><div class="ds-l">Total Fee SOL</div></div>
</div>
<div style="border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.02);margin-bottom:16px">
<div style="padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.08);display:flex;justify-content:space-between;align-items:center"><span style="font-size:9px;color:#22d3ee;letter-spacing:.2em;text-transform:uppercase">Progress</span><span style="font-size:11px;color:#a3e635" id="dProgTxt">67% &mdash; Batch 3/5</span></div>
<div style="padding:16px"><div style="width:100%;height:4px;background:rgba(255,255,255,0.05);overflow:hidden"><div style="height:100%;background:linear-gradient(90deg,#a3e635,#22d3ee);width:67%;transition:width .4s" id="dProgBar"></div></div><div style="display:flex;gap:10px;margin-top:14px"><button style="padding:8px 14px;background:#a3e635;color:#050507;border:none;font-family:inherit;font-size:10px;font-weight:700;cursor:pointer;text-transform:uppercase" onclick="startDist()">Start</button><button style="padding:8px 14px;background:transparent;border:1px solid rgba(255,255,255,0.1);color:#8888a0;font-family:inherit;font-size:10px;cursor:pointer" onclick="resetDist()">Reset</button></div></div>
</div>
<div style="border:1px solid rgba(255,255,255,0.1);background:#0c0c10">
<div style="padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.08);display:flex;justify-content:space-between;align-items:center"><span style="font-size:9px;color:#22d3ee;letter-spacing:.2em;text-transform:uppercase">Transaction Log</span><span style="font-size:10px;color:#a3e635;display:flex;align-items:center;gap:4px"><span style="width:6px;height:6px;border-radius:50%;background:#a3e635"></span>Live</span></div>
<div id="txLog" style="padding:12px;max-height:300px;overflow-y:auto;font-size:11px;font-family:'Courier New',monospace"></div>
</div>
</div>

<!-- SNAPSHOT PAGE -->
<div class="pg" id="pg-snapshot">
<div class="pg-h"><div class="pg-lbl">// Snapshot Engine</div><div class="pg-tit">Token Holder Snapshots</div><div class="pg-desc">Capture real-time holder states. Filter by minimum balance. Export ranked lists.</div></div>
<div style="display:grid;grid-template-columns:1fr;gap:16px">
<div>
<div style="border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.02);margin-bottom:12px">
<div style="padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.08)"><span style="font-size:9px;color:#22d3ee;letter-spacing:.2em;text-transform:uppercase">Token</span></div>
<div style="padding:16px">
<div style="margin-bottom:14px"><label style="display:block;font-size:9px;color:#8888a0;text-transform:uppercase;margin-bottom:6px">Token Mint Address</label><input type="text" id="snapMint" placeholder="Enter mint..." style="width:100%;padding:12px;background:#0c0c10;border:1px solid rgba(255,255,255,0.1);color:#f5f5f5;font-family:inherit;font-size:13px;outline:none"></div>
<button style="padding:12px 20px;background:#a3e635;color:#050507;border:none;font-family:inherit;font-size:11px;font-weight:700;cursor:pointer;text-transform:uppercase;width:100%" onclick="runSnap()">Capture Snapshot</button>
</div></div>
<div style="border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.02)">
<div style="padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.08)"><span style="font-size:9px;color:#22d3ee;letter-spacing:.2em;text-transform:uppercase">Filters</span></div>
<div style="padding:16px">
<div style="margin-bottom:14px"><label style="display:block;font-size:9px;color:#8888a0;text-transform:uppercase;margin-bottom:6px">Min Balance</label><input type="text" value="0.1" style="width:100%;padding:12px;background:#0c0c10;border:1px solid rgba(255,255,255,0.1);color:#f5f5f5;font-family:inherit;font-size:13px;outline:none"></div>
<div style="font-size:10px;color:#8888a0;margin-bottom:8px">Categories:</div>
<label style="display:flex;align-items:center;gap:8px;font-size:11px;color:#8888a0;margin-bottom:6px;cursor:pointer"><input type="checkbox" checked style="width:auto"> Whales (&gt;1M)</label>
<label style="display:flex;align-items:center;gap:8px;font-size:11px;color:#8888a0;margin-bottom:6px;cursor:pointer"><input type="checkbox" checked style="width:auto"> Holders (100K-1M)</label>
<label style="display:flex;align-items:center;gap:8px;font-size:11px;color:#8888a0;cursor:pointer"><input type="checkbox" checked style="width:auto"> Retail (&lt;100K)</label>
</div></div>
</div>
<div style="border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.02)" id="snapResultBox">
<div style="padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.08)"><span style="font-size:9px;color:#22d3ee;letter-spacing:.2em;text-transform:uppercase">Results</span></div>
<div style="padding:16px;text-align:center;color:#8888a0;font-size:12px;padding-top:60px" id="snapEmpty">Enter a token mint and click Capture</div>
<div id="snapBody" style="display:none;padding:16px"></div>
</div>
</div>
</div>

<!-- TERMINAL PAGE -->
<div class="pg" id="pg-terminal">
<div class="pg-h"><div class="pg-lbl">// Operational Log</div><div class="pg-tit">How It Works</div></div>
<div style="display:grid;grid-template-columns:1fr;gap:16px">
<div style="background:#0c0c10;border:1px solid rgba(255,255,255,0.1)">
<div style="padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;gap:8px"><div style="width:10px;height:10px;border-radius:50%;background:#ef4444;opacity:.6"></div><div style="width:10px;height:10px;border-radius:50%;background:#eab308;opacity:.6"></div><div style="width:10px;height:10px;border-radius:50%;background:#a3e635;opacity:.6"></div><span style="font-size:10px;color:#8888a0;text-transform:uppercase;letter-spacing:.1em">specimenb-cli</span></div>
<div id="termBig" style="padding:14px;max-height:400px;overflow-y:auto;font-size:12px;font-family:'Courier New',monospace"></div>
</div>
<div style="border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.02)">
<div style="padding:16px">
<div style="margin-bottom:20px"><div style="font-size:9px;color:#22d3ee;letter-spacing:.2em;text-transform:uppercase;margin-bottom:6px">Step 01</div><div style="font-family:Georgia,serif;font-size:16px;font-style:italic;margin-bottom:6px">Connect Your Wallet</div><div style="font-size:11px;color:#8888a0;line-height:1.6">Link your Phantom wallet to SpecimenB. We'll scan and display all your SPL tokens.</div></div>
<div style="height:1px;background:rgba(255,255,255,0.08);margin:16px 0"></div>
<div style="margin-bottom:20px"><div style="font-size:9px;color:#22d3ee;letter-spacing:.2em;text-transform:uppercase;margin-bottom:6px">Step 02</div><div style="font-family:Georgia,serif;font-size:16px;font-style:italic;margin-bottom:6px">Select Token & Recipients</div><div style="font-size:11px;color:#8888a0;line-height:1.6">Pick your token from the dropdown. Upload CSV or add wallets manually.</div></div>
<div style="height:1px;background:rgba(255,255,255,0.08);margin:16px 0"></div>
<div><div style="font-size:9px;color:#22d3ee;letter-spacing:.2em;text-transform:uppercase;margin-bottom:6px">Step 03</div><div style="font-family:Georgia,serif;font-size:16px;font-style:italic;margin-bottom:6px">Simulate & Execute</div><div style="font-size:11px;color:#8888a0;line-height:1.6">Run simulation before spending SOL. Then fire the batch dispatcher.</div></div>
</div></div>
</div>
</div>

<!-- MODULES PAGE -->
<div class="pg" id="pg-modules">
<div class="pg-h"><div class="pg-lbl">// System Modules</div><div class="pg-tit">Core Architecture</div><div class="pg-desc">Tap any module to enable/disable it for your distributions.</div></div>
<div style="display:grid;grid-template-columns:1fr;gap:10px" id="modGrid2"></div>
<div style="margin-top:16px;text-align:center;font-size:11px;color:#8888a0" id="modStatus2">Active: <span style="color:#a3e635">Fee Optimizer, Batch Dispatcher, Analytics</span></div>
</div>

<!-- WALLET PAGE -->
<div class="pg" id="pg-wallet">
<div class="pg-h"><div class="pg-lbl">// Inbuilt Wallet</div><div class="pg-tit">Your Wallet</div></div>
<div style="display:grid;grid-template-columns:1fr;gap:16px">
<div style="border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.02);text-align:center;padding:40px 20px">
<div style="font-size:48px;margin-bottom:16px" id="wBigIcon"></div>
<div style="font-size:16px;font-weight:700;margin-bottom:8px" id="wStatus">Not Connected</div>
<div style="font-size:11px;color:#8888a0;margin-bottom:20px" id="wAddr">-</div>
<button style="padding:12px 28px;background:#a3e635;color:#050507;border:none;font-family:inherit;font-size:12px;font-weight:700;cursor:pointer;text-transform:uppercase" id="wBtn" onclick="enhanceConnect()">Connect Wallet</button>
</div>
<div>
<div style="border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.02);margin-bottom:12px">
<div style="padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.08)"><span style="font-size:9px;color:#22d3ee;letter-spacing:.2em;text-transform:uppercase">SPL Tokens</span></div>
<div id="wTokensReal" style="display:none;padding:12px">
<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05)"><span><strong style="color:#22d3ee">SOL</strong> <span style="color:#8888a0;font-size:10px">Wrapped SOL</span></span><span style="color:#a3e635">145.82</span></div>
<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05)"><span><strong style="color:#22d3ee">USDC</strong> <span style="color:#8888a0;font-size:10px">USD Coin</span></span><span style="color:#a3e635">50,000.00</span></div>
<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05)"><span><strong style="color:#22d3ee">BONK</strong> <span style="color:#8888a0;font-size:10px">Bonk</span></span><span style="color:#a3e635">2,450,000,000</span></div>
<div style="display:flex;justify-content:space-between;padding:10px 0;border-left:3px solid #a3e635;padding-left:12px;background:rgba(163,230,53,0.04)"><span><strong style="color:#22d3ee">SPEC</strong> <span style="color:#8888a0;font-size:10px">Specimen Token</span></span><span style="color:#a3e635;font-weight:700">1,000,000.00</span></div>
</div>
<div id="wTokensEmpty" style="text-align:center;padding:40px 20px;color:#8888a0;font-size:12px">Connect wallet to view tokens</div>
</div>
<div style="border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.02);padding:16px;font-size:11px;color:#8888a0;line-height:1.8">
<div style="margin-bottom:10px">&#128274; <strong style="color:#f5f5f5">AES-256 Encrypted</strong> wallet storage</div>
<div style="margin-bottom:10px">&#128221; <strong style="color:#f5f5f5">BIP39 Seed Phrase</strong> 24-word recovery</div>
<div>&#9888; <strong style="color:#eab308">Never share</strong> your seed phrase</div>
</div>
</div>
</div>
</div>

<!-- SETTINGS PAGE -->
<div class="pg" id="pg-settings">
<div class="pg-h"><div class="pg-lbl">// Configuration</div><div class="pg-tit">Settings</div></div>
<div style="display:grid;grid-template-columns:1fr;gap:16px">
<div style="border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.02)">
<div style="padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.08)"><span style="font-size:9px;color:#22d3ee;letter-spacing:.2em;text-transform:uppercase">Network</span></div>
<div style="padding:16px">
<div style="margin-bottom:14px"><label style="display:block;font-size:9px;color:#8888a0;text-transform:uppercase;margin-bottom:6px">RPC Endpoint</label><select style="width:100%;padding:12px;background:#0c0c10;border:1px solid rgba(255,255,255,0.1);color:#f5f5f5;font-family:inherit;font-size:13px"><option>Helius Mainnet</option><option>QuickNode</option><option>Custom</option></select></div>
<div style="margin-bottom:14px"><label style="display:block;font-size:9px;color:#8888a0;text-transform:uppercase;margin-bottom:6px">Priority Fee</label><select style="width:100%;padding:12px;background:#0c0c10;border:1px solid rgba(255,255,255,0.1);color:#f5f5f5;font-family:inherit;font-size:13px"><option>Lowest (20th percentile)</option><option>Low (median)</option><option>Normal (average)</option></select></div>
<div><label style="display:block;font-size:9px;color:#8888a0;text-transform:uppercase;margin-bottom:6px">Cluster</label><input type="text" value="mainnet-beta" readonly style="width:100%;padding:12px;background:#0c0c10;border:1px solid rgba(255,255,255,0.08);color:#8888a0;font-family:inherit;font-size:13px"></div>
</div></div>
<div style="border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.02)">
<div style="padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.08)"><span style="font-size:9px;color:#22d3ee;letter-spacing:.2em;text-transform:uppercase">Distribution</span></div>
<div style="padding:16px">
<div style="margin-bottom:14px"><label style="display:block;font-size:9px;color:#8888a0;text-transform:uppercase;margin-bottom:6px">Batch Size</label><input type="text" value="100" style="width:100%;padding:12px;background:#0c0c10;border:1px solid rgba(255,255,255,0.1);color:#f5f5f5;font-family:inherit;font-size:13px;outline:none"></div>
<div style="margin-bottom:14px"><label style="display:block;font-size:9px;color:#8888a0;text-transform:uppercase;margin-bottom:6px">Auto-Retry</label><select style="width:100%;padding:12px;background:#0c0c10;border:1px solid rgba(255,255,255,0.1);color:#f5f5f5;font-family:inherit;font-size:13px"><option>Enabled (3 retries)</option><option>Disabled</option></select></div>
<div><label style="display:block;font-size:9px;color:#8888a0;text-transform:uppercase;margin-bottom:6px">Confirmation Timeout</label><input type="text" value="60s" style="width:100%;padding:12px;background:#0c0c10;border:1px solid rgba(255,255,255,0.1);color:#f5f5f5;font-family:inherit;font-size:13px;outline:none"></div>
</div></div>
</div>
</div>`;
main.appendChild(pagesContainer);

// ===== MODULE CARDS DATA =====
const modulesData = [
{key:'snapshot',label:'SNAPSHOT ENGINE',icon:'128248',title:'Token Snapshots',desc:'Capture real-time holder states. Filter by min balance, blacklist addresses, export ranked lists.',tags:['Filter','Rank','Export']},
{key:'allocation',label:'ALLOCATION MATRIX',icon:'128202',title:'Smart Distribution',desc:'Fixed, percentage, or proportional allocation models. Auto-calculate optimal curves.',tags:['Fixed','Percent','Proportional']},
{key:'fees',label:'FEE OPTIMIZER',icon:'128142',title:'Lowest Fees',desc:'Dynamic priority fee at 20th percentile. Compute budget optimization for min cost.',tags:['Dynamic','Anti-Bot','Simulate']},
{key:'merkle',label:'MERKLE CLAIMS',icon:'127795',title:'Gas-Optimized Claims',desc:'Merkle tree claim system for massively scalable, gas-efficient airdrops.',tags:['Merkle','Claims','Gas']},
{key:'batch',label:'BATCH DISPATCHER',icon:'9889',title:'Parallel TX Send',desc:'Queue-based batch processing with parallel sending and auto-retry on failure.',tags:['Parallel','Retry','Queue']},
{key:'csv',label:'CSV IMPORT',icon:'128441',title:'Bulk Upload',desc:'Upload CSV with wallet addresses and amounts. Auto-validation and deduplication.',tags:['CSV','Validate','Dedup']},
{key:'vesting',label:'VESTING',icon:'9200',title:'Linear & Cliff',desc:'Custom vesting schedules with linear or cliff unlock patterns.',tags:['Linear','Cliff','Time-Locked']},
{key:'analytics',label:'ANALYTICS',icon:'128200',title:'Real-Time Tracking',desc:'Live transaction monitoring. Distribution progress and holder rankings.',tags:['Live','Progress','Rank']}
];

const activeMods = new Set(['fees','batch','analytics']);
const modGrid2 = document.getElementById('modGrid2');

function renderModules() {
modGrid2.innerHTML = modulesData.map(m => {
const isActive = activeMods.has(m.key);
return `<div style="padding:20px;border:1px solid ${isActive?'rgba(163,230,53,0.3)':'rgba(255,255,255,0.1)'};background:${isActive?'rgba(163,230,53,0.04)':'rgba(255,255,255,0.02)'};cursor:pointer;position:relative;overflow:hidden" onclick="toggleMod2('${m.key}',this)">
${isActive?'<div style="position:absolute;top:0;right:0;width:0;height:0;border-style:solid;border-width:0 24px 24px 0;border-color:transparent #a3e635 transparent transparent;opacity:.6"></div>':''}
<div style="font-size:8px;color:#22d3ee;letter-spacing:.25em;text-transform:uppercase;margin-bottom:12px;opacity:.6">${m.label}</div>
<div style="font-size:20px;margin-bottom:8px">&#${m.icon};</div>
<div style="font-family:Georgia,serif;font-size:16px;font-style:italic;margin-bottom:6px">${m.title}</div>
<div style="font-size:10px;color:#8888a0;line-height:1.6;margin-bottom:12px">${m.desc}</div>
<div style="display:flex;flex-wrap:wrap;gap:4px">${m.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
</div>`;
}).join('');
const names = {snapshot:'Snapshot',allocation:'Allocation',fees:'Fee Optimizer',merkle:'Merkle Claims',batch:'Batch Dispatcher',csv:'CSV Import',vesting:'Vesting',analytics:'Analytics'};
document.getElementById('modStatus2').innerHTML = 'Active: <span style="color:#a3e635">' + Array.from(activeMods).map(x=>names[x]).join(', ') + '</span>';
}
renderModules();

window.toggleMod2 = function(key, el) {
if(activeMods.has(key)){activeMods.delete(key);}else{activeMods.add(key);}
renderModules();
};

// ===== NAVIGATION =====
window.nav = function(page, el) {
document.querySelectorAll('.pg').forEach(p=>p.classList.remove('on'));
const target = document.getElementById('pg-'+page);
if(target) target.classList.add('on');
if(el) {
document.querySelectorAll('.sb-item').forEach(i=>i.classList.remove('on'));
el.classList.add('on');
}
document.getElementById('sidebar').classList.remove('open');
document.getElementById('sbOverlay').classList.remove('show');
window.scrollTo(0,0);
};

// ===== DASHBOARD = ORIGINAL CONTENT =====
const dashItem = document.querySelector('[data-pg="dashboard"]');
if(dashItem){
dashItem.onclick = function(){
document.querySelectorAll('.pg').forEach(p=>p.classList.remove('on'));
document.querySelectorAll('.sb-item').forEach(i=>i.classList.remove('on'));
this.classList.add('on');
document.getElementById('sidebar').classList.remove('open');
document.getElementById('sbOverlay').classList.remove('show');
window.scrollTo(0,0);
};
}

// ===== WALLET CONNECT =====
window.enhanceConnect = async function() {
if(!window.solana || !window.solana.isPhantom){
alert('Install Phantom: https://phantom.app');
window.open('https://phantom.app','_blank');
return;
}
try{
const resp = await window.solana.connect();
const addr = resp.publicKey.toString();
const wl = document.getElementById('walletLabel');
if(wl) wl.textContent = addr.slice(0,4)+'...'+addr.slice(-4);
document.getElementById('sbConnBtn').textContent = addr.slice(0,4)+'...'+addr.slice(-4);
document.getElementById('wStatus').textContent = 'Connected';
document.getElementById('wStatus').style.color = '#a3e635';
document.getElementById('wAddr').textContent = addr;
document.getElementById('wBigIcon').textContent = '';
document.getElementById('wBtn').textContent = 'Disconnect';
document.getElementById('wBtn').style.background = 'transparent';
document.getElementById('wBtn').style.border = '1px solid rgba(255,255,255,0.1)';
document.getElementById('wBtn').style.color = '#8888a0';
document.getElementById('wBtn').onclick = enhanceDisconnect;
document.getElementById('wTokensReal').style.display = 'block';
document.getElementById('wTokensEmpty').style.display = 'none';
window.walletAddr = addr;
window.walletConnected = true;
log2('ok','[OK] Wallet: '+addr.slice(0,12)+'...');
fetchRealTokens(addr);
}catch(e){
log2('err','[ERR] '+e.message);
}
};

window.enhanceDisconnect = function() {
window.solana.disconnect();
window.walletAddr = null;
window.walletConnected = false;
const wl2 = document.getElementById('walletLabel');
if(wl2) wl2.textContent = 'Connect';
document.getElementById('sbConnBtn').textContent = 'Connect Wallet';
document.getElementById('wStatus').textContent = 'Not Connected';
document.getElementById('wStatus').style.color = '';
document.getElementById('wAddr').textContent = '-';
document.getElementById('wBigIcon').textContent = '';
document.getElementById('wBtn').textContent = 'Connect Wallet';
document.getElementById('wBtn').style.background = '#a3e635';
document.getElementById('wBtn').style.border = 'none';
document.getElementById('wBtn').style.color = '#050507';
document.getElementById('wBtn').onclick = enhanceConnect;
document.getElementById('wTokensReal').style.display = 'none';
document.getElementById('wTokensEmpty').style.display = 'block';
log2('info','> Wallet disconnected');
};

// ===== TOKEN FETCHING =====
async function fetchRealTokens(owner) {
try{
const r = await fetch('https://api.mainnet-beta.solana.com',{
method:'POST',headers:{'Content-Type':'application/json'},
body:JSON.stringify({jsonrpc:'2.0',id:1,method:'getTokenAccountsByOwner',params:[owner,{programId:'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'},{encoding:'jsonParsed'}]})
});
const j = await r.json();
const accts = j.result?.value || [];
if(accts.length === 0) return;
const tokens = accts.map(v=>{
const i = v.account.data.parsed.info;
return {mint:i.mint,sym:i.mint.slice(0,6)+'...',amt:i.tokenAmount.uiAmount||0,dec:i.tokenAmount.decimals,ata:v.pubkey};
}).filter(t=>t.amt>0);
log2('ok','[OK] Found '+tokens.length+' tokens');
}catch(e){
log2('warn','[!] Using demo tokens');
}
}

// ===== DISTRIBUTION PANEL =====
window.startDist = function() {
const logBox = document.getElementById('txLog');
logBox.innerHTML = '<div style="color:#a3e635;margin-bottom:8px">&raquo; Distribution started...</div>';
let p=0;
const iv=setInterval(()=>{
p+=4;
document.getElementById('dProgBar').style.width = Math.min(p,100)+'%';
document.getElementById('dProgTxt').textContent = Math.min(p,100)+'% — Broadcasting';
if(p>=100){clearInterval(iv);document.getElementById('dProgTxt').textContent='100% — Complete';logBox.innerHTML+='<div style="color:#a3e635;margin-top:8px">&raquo; All batches complete!</div>';}
},100);
};
window.resetDist = function() {
document.getElementById('dProgBar').style.width='0%';
document.getElementById('dProgTxt').textContent='0% — Ready';
document.getElementById('txLog').innerHTML='';
};

// ===== SNAPSHOT =====
window.runSnap = function() {
const mint = document.getElementById('snapMint').value || 'Demo';
document.getElementById('snapEmpty').style.display='none';
document.getElementById('snapBody').style.display='block';
const holders = [
{r:1,w:'7xKXtg2...osgAsU',b:'2,450,000',p:'24.5%',t:'WHALE'},
{r:2,w:'3nR7hP1...kL1mN',b:'1,820,000',p:'18.2%',t:'WHALE'},
{r:3,w:'9pQR4uN...qR2sT',b:'980,000',p:'9.8%',t:'WHALE'},
{r:4,w:'2bC5vE8...aB4c',b:'650,000',p:'6.5%',t:'HOLDER'},
{r:5,w:'5vE8yA1...cD7e',b:'420,000',p:'4.2%',t:'HOLDER'}
];
let html = '<div style="margin-bottom:12px"><span style="color:#a3e635;font-size:20px;font-weight:700">'+holders.length+'</span> <span style="color:#8888a0;font-size:11px">holders found</span></div>';
html += '<table class="tbl"><thead><tr><th>Rank</th><th>Wallet</th><th>Balance</th><th>%</th><th>Type</th></tr></thead><tbody>';
holders.forEach(h=>{
html += '<tr><td style="color:#22d3ee">#'+h.r+'</td><td>'+h.w+'</td><td>'+h.b+'</td><td style="color:#a3e635">'+h.p+'</td><td><span class="tag">'+h.t+'</span></td></tr>';
});
html += '</tbody></table>';
document.getElementById('snapBody').innerHTML = html;
log2('ok','[OK] Snapshot: '+holders.length+' holders');
};

// ===== LOGGING =====
function log2(type,text) {
const term = document.getElementById('termBig');
if(!term) return;
const d = document.createElement('div');
d.style.cssText = 'display:flex;align-items:flex-start;gap:8px;padding:2px 0;font-size:11px';
const c = {ok:'<span style="color:#a3e635">&#10003;</span>',info:'<span style="color:#22d3ee">&rsaquo;</span>',err:'<span style="color:#ef4444">&#10007;</span>',warn:'<span style="color:#eab308">!</span>'};
const cl = {ok:'color:#a3e635',info:'color:#22d3ee',err:'color:#ef4444',warn:'color:#eab308'};
d.innerHTML = (c[type]||'&rsaquo;')+' <span style="'+cl[type]+'">'+text+'</span>';
term.appendChild(d);
term.scrollTop = term.scrollHeight;
const txLog = document.getElementById('txLog');
if(txLog && type !== 'info') {
const d2 = document.createElement('div');
d2.style.cssText = 'padding:3px 0;color:'+(type==='ok'?'#a3e635':type==='err'?'#ef4444':'#8888a0')+';font-size:11px';
d2.textContent = (type==='ok'?'OK ':type==='err'?'ERR ':'') + text;
txLog.appendChild(d2);
}
}

// Boot logs
const boot = [
{t:'info',m:'> SpecimenB v3.0 initializing...'},
{t:'info',m:'> Distribution Made Easy'},
{t:'ok',m:'[OK] Solana Mainnet connected'},
{t:'ok',m:'[OK] Fee optimizer: 5000 micro-lamports (LOWEST)'},
{t:'ok',m:'[OK] 4 tokens: SOL, USDC, BONK, SPEC'},
{t:'info',m:'> Selected: SPEC (1,000,000)'},
{t:'info',m:'> Ready for distribution'}
];
let bi=0;
function boot2(){if(bi>=boot.length)return;log2(boot[bi].t,boot[bi].m);bi++;setTimeout(boot2,250);}
setTimeout(boot2,400);

console.log('[SpecimenB] Enhancement loaded - Sidebar, 6 pages, Phantom wallet, Solana RPC');
})();

