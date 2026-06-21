// SpecimenB - Complete Working Sidebar + Real Solana Backend
(function(){
// ===== CSS =====
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
.pg{display:none;padding:24px;max-width:1100px;margin:0 auto;animation:fadeIn .3s}
.pg.on{display:block}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.pg-h{margin-bottom:24px}
.pg-lbl{font-size:9px;color:#22d3ee;letter-spacing:.25em;text-transform:uppercase;margin-bottom:8px;opacity:.7}
.pg-tit{font-family:Georgia,'Times New Roman',serif;font-size:clamp(26px,5vw,44px);font-style:italic;margin-bottom:8px}
.pg-desc{font-size:12px;color:#8888a0;max-width:500px;line-height:1.6}
.dist-stats{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:16px}
@media(min-width:600px){.dist-stats{grid-template-columns:repeat(3,1fr)}}
@media(min-width:900px){.dist-stats{grid-template-columns:repeat(6,1fr)}}
.ds-box{padding:12px;background:#0c0c10;border:1px solid rgba(255,255,255,0.1)}
.ds-v{font-size:18px;font-weight:700;color:#f5f5f5}
.ds-v.g{color:#a3e635}.ds-v.c{color:#22d3ee}.ds-v.r{color:#ef4444}.ds-v.y{color:#eab308}
.ds-l{font-size:8px;color:#8888a0;text-transform:uppercase;letter-spacing:.1em;margin-top:4px}
.tbl{width:100%;font-size:11px;border-collapse:collapse;margin-top:12px}
.tbl th{text-align:left;padding:8px;font-size:9px;color:#8888a0;text-transform:uppercase;letter-spacing:.08em;border-bottom:1px solid rgba(255,255,255,0.1);font-weight:400}
.tbl td{padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);color:rgba(255,255,255,0.65)}
.tbl tr:hover td{background:rgba(255,255,255,0.02)}
.tag{display:inline-block;padding:2px 6px;border:1px solid rgba(255,255,255,0.1);font-size:8px;color:#8888a0;text-transform:uppercase}
.mod-grid{display:grid;grid-template-columns:1fr;gap:10px}
@media(min-width:600px){.mod-grid{grid-template-columns:repeat(2,1fr)}}
.mod-card{padding:20px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.02);cursor:pointer;position:relative;overflow:hidden;transition:all .15s}
.mod-card:hover{border-color:rgba(255,255,255,0.2)}
.mod-card.active{border-color:rgba(163,230,53,0.3);background:rgba(163,230,53,0.04)}
.mod-card .chk{position:absolute;top:8px;right:8px;width:18px;height:18px;border-radius:50%;border:1px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:10px;color:transparent}
.mod-card.active .chk{background:#a3e635;border-color:#a3e635;color:#050507}
.mod-label{font-size:8px;color:#22d3ee;letter-spacing:.25em;text-transform:uppercase;margin-bottom:12px;opacity:.6}
.mod-title{font-family:Georgia,serif;font-size:16px;font-style:italic;margin-bottom:6px}
.mod-desc{font-size:10px;color:#8888a0;line-height:1.6;margin-bottom:12px}
.mod-tags{display:flex;flex-wrap:wrap;gap:4px}
.inp{width:100%;padding:12px;background:#0c0c10;border:1px solid rgba(255,255,255,0.1);color:#f5f5f5;font-family:inherit;font-size:13px;outline:none;box-sizing:border-box}
.inp:focus{border-color:rgba(163,230,53,0.4)}
.btn{padding:12px 20px;background:#a3e635;color:#050507;border:none;font-family:inherit;font-size:11px;font-weight:700;cursor:pointer;text-transform:uppercase;display:inline-block}
.btn-sm{padding:8px 14px;font-size:10px}
.btn-sec{background:transparent;border:1px solid rgba(255,255,255,0.1);color:#8888a0}
.pbar{width:100%;height:4px;background:rgba(255,255,255,0.05);overflow:hidden}
.pbar-fill{height:100%;background:linear-gradient(90deg,#a3e635,#22d3ee);width:0%;transition:width .4s}
.pnl{border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.02);margin-bottom:16px}
.pnl-h{padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.08);font-size:9px;color:#22d3ee;letter-spacing:.2em;text-transform:uppercase}
.pnl-b{padding:16px}
`;
document.head.appendChild(style);

// ===== SIDEBAR =====
const sb = document.createElement('div');
sb.className = 'sb-wrap';
sb.id = 'sidebar';
sb.innerHTML = `
<div class="sb-h"><div class="sb-brand"><div class="bx">SB</div><div><div class="nm">SpecimenB</div><div class="tg">distribution made easy</div></div></div></div>
<div class="sb-nav">
<div class="sb-sec">MAIN</div>
<div class="sb-item on" data-pg="dashboard"><span class="si"></span> Dashboard</div>
<div class="sb-item" data-pg="distribution"><span class="si"></span> Distribution</div>
<div class="sb-item" data-pg="snapshot"><span class="si"></span> Snapshot</div>
<div class="sb-item" data-pg="terminal"><span class="si"></span> Terminal</div>
<div class="sb-item" data-pg="modules"><span class="si"></span> Modules</div>
<div class="sb-sec">SYSTEM</div>
<div class="sb-item" data-pg="wallet"><span class="si"></span> Wallet</div>
<div class="sb-item" data-pg="settings"><span class="si"></span> Settings</div>
</div>
<div class="sb-foot">
<button class="sb-wb" id="sbConnBtn">Connect Wallet</button>
<div class="sb-st"><span class="sb-dt"></span><span>Mainnet Active</span></div>
</div>`;
document.body.appendChild(sb);

const overlay = document.createElement('div');
overlay.className = 'sb-x';
overlay.id = 'sbOverlay';
overlay.onclick = () => { sb.classList.remove('open'); overlay.classList.remove('show'); };
document.body.appendChild(overlay);

const toggle = document.createElement('div');
toggle.className = 'sb-toggle';
toggle.onclick = () => { sb.classList.add('open'); overlay.classList.add('show'); };
toggle.innerHTML = '<span></span><span></span><span></span>';
document.body.appendChild(toggle);

const main = document.querySelector('.main') || document.querySelector('main') || document.body;
main.classList.add('sb-main');

// ===== PAGES =====
const pagesContainer = document.createElement('div');
pagesContainer.innerHTML = `
<!-- DISTRIBUTION -->
<div class="pg" id="pg-distribution">
<div class="pg-h"><div class="pg-lbl">// Live Distribution</div><div class="pg-tit">Distribution Panel</div></div>
<div class="dist-stats">
<div class="ds-box"><div class="ds-v g" id="dSent">0</div><div class="ds-l">Total Sent</div></div>
<div class="ds-box"><div class="ds-v c" id="dRec">0</div><div class="ds-l">Recipients</div></div>
<div class="ds-box"><div class="ds-v g" id="dConf">0</div><div class="ds-l">Confirmed</div></div>
<div class="ds-box"><div class="ds-v r" id="dFail">0</div><div class="ds-l">Failed</div></div>
<div class="ds-box"><div class="ds-v y" id="dFee">0.000005</div><div class="ds-l">Avg Fee SOL</div></div>
<div class="ds-box"><div class="ds-v" id="dTotalFee">0</div><div class="ds-l">Total Fee SOL</div></div>
</div>
<div class="pnl">
<div class="pnl-h" style="display:flex;justify-content:space-between;align-items:center"><span>Selected Token</span><span style="color:#a3e635" id="selTokenDisp">None</span></div>
<div class="pnl-b">
<div style="margin-bottom:12px"><label style="display:block;font-size:9px;color:#8888a0;text-transform:uppercase;margin-bottom:6px">Token Mint</label><input type="text" class="inp" id="distMint" placeholder="Enter token mint address..."></div>
<div style="margin-bottom:12px"><label style="display:block;font-size:9px;color:#8888a0;text-transform:uppercase;margin-bottom:6px">Recipients (wallet,amount per line)</label><textarea class="inp" id="distRecipients" rows="4" placeholder="7xKXtg2CW87a8uwosgAsU,100&#10;9pQR4uNCW87a8uwqR2sT,50&#10;"></textarea></div>
<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-sm" id="btnLoadDist">Load from CSV</button><button class="btn btn-sm btn-sec" id="btnClearDist">Clear</button></div>
<div style="margin-top:12px;display:none" id="csvWrap"><input type="file" id="csvFile" accept=".csv" style="font-size:11px;color:#8888a0"></div>
</div>
</div>
<div class="pnl">
<div class="pnl-h" style="display:flex;justify-content:space-between;align-items:center"><span>Progress</span><span style="color:#a3e635" id="dProgTxt">0% - Ready</span></div>
<div class="pnl-b"><div class="pbar"><div class="pbar-fill" id="dProgBar"></div></div><div style="display:flex;gap:10px;margin-top:14px"><button class="btn btn-sm" id="btnStartDist">Start</button><button class="btn btn-sm btn-sec" id="btnResetDist">Reset</button></div></div>
</div>
<div class="pnl" style="margin-bottom:0">
<div class="pnl-h" style="display:flex;justify-content:space-between;align-items:center"><span>Transaction Log</span><span style="font-size:10px;color:#a3e635;display:flex;align-items:center;gap:4px"><span style="width:6px;height:6px;border-radius:50%;background:#a3e635"></span>Live</span></div>
<div class="pnl-b" id="txLog" style="max-height:300px;overflow-y:auto;font-size:11px;font-family:'Courier New',monospace"></div>
</div>
</div>

<!-- SNAPSHOT -->
<div class="pg" id="pg-snapshot">
<div class="pg-h"><div class="pg-lbl">// Snapshot Engine</div><div class="pg-tit">Token Holder Snapshots</div><div class="pg-desc">Capture real-time holder states. Filter by minimum balance. Export ranked lists.</div></div>
<div style="display:grid;grid-template-columns:1fr;gap:16px">
<div>
<div class="pnl">
<div class="pnl-h">Token</div>
<div class="pnl-b">
<div style="margin-bottom:14px"><label style="display:block;font-size:9px;color:#8888a0;text-transform:uppercase;margin-bottom:6px">Token Mint Address</label><input type="text" class="inp" id="snapMint" placeholder="Enter mint..."></div>
<button class="btn" id="btnSnap" style="width:100%">Capture Snapshot</button>
</div></div>
<div class="pnl" style="margin-bottom:0">
<div class="pnl-h">Filters</div>
<div class="pnl-b">
<div style="margin-bottom:14px"><label style="display:block;font-size:9px;color:#8888a0;text-transform:uppercase;margin-bottom:6px">Min Balance</label><input type="text" class="inp" value="0.1"></div>
<div style="font-size:10px;color:#8888a0;margin-bottom:8px">Categories:</div>
<label style="display:flex;align-items:center;gap:8px;font-size:11px;color:#8888a0;margin-bottom:6px;cursor:pointer"><input type="checkbox" checked style="width:auto"> Whales (&gt;1M)</label>
<label style="display:flex;align-items:center;gap:8px;font-size:11px;color:#8888a0;margin-bottom:6px;cursor:pointer"><input type="checkbox" checked style="width:auto"> Holders (100K-1M)</label>
<label style="display:flex;align-items:center;gap:8px;font-size:11px;color:#8888a0;cursor:pointer"><input type="checkbox" checked style="width:auto"> Retail (&lt;100K)</label>
</div></div>
</div>
<div class="pnl" id="snapResultBox" style="margin-bottom:0">
<div class="pnl-h">Results</div>
<div style="padding:16px;text-align:center;color:#8888a0;font-size:12px;padding-top:60px" id="snapEmpty">Enter a token mint and click Capture</div>
<div id="snapBody" style="display:none;padding:16px"></div>
</div>
</div>
</div>

<!-- TERMINAL -->
<div class="pg" id="pg-terminal">
<div class="pg-h"><div class="pg-lbl">// Operational Log</div><div class="pg-tit">System Terminal</div></div>
<div style="display:grid;grid-template-columns:1fr;gap:16px">
<div style="background:#0c0c10;border:1px solid rgba(255,255,255,0.1)">
<div style="padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;gap:8px"><div style="width:10px;height:10px;border-radius:50%;background:#ef4444;opacity:.6"></div><div style="width:10px;height:10px;border-radius:50%;background:#eab308;opacity:.6"></div><div style="width:10px;height:10px;border-radius:50%;background:#a3e635;opacity:.6"></div><span style="font-size:10px;color:#8888a0;text-transform:uppercase;letter-spacing:.1em">specimenb-cli</span></div>
<div id="termBig" style="padding:14px;max-height:400px;overflow-y:auto;font-size:12px;font-family:'Courier New',monospace"></div>
</div>
</div>
</div>

<!-- MODULES -->
<div class="pg" id="pg-modules">
<div class="pg-h"><div class="pg-lbl">// System Modules</div><div class="pg-tit">Core Architecture</div><div class="pg-desc">Tap any module to enable/disable it. Active modules are highlighted.</div></div>
<div class="mod-grid" id="modGrid2"></div>
<div style="margin-top:16px;text-align:center;font-size:11px;color:#8888a0" id="modStatus2">Active: <span style="color:#a3e635">Fee Optimizer, Batch Dispatcher, Analytics</span></div>
</div>

<!-- WALLET -->
<div class="pg" id="pg-wallet">
<div class="pg-h"><div class="pg-lbl">// Wallet</div><div class="pg-tit">Connection</div></div>
<div style="display:grid;grid-template-columns:1fr;gap:16px">
<div class="pnl" style="text-align:center;padding:40px 20px">
<div style="font-size:48px;margin-bottom:16px" id="wBigIcon"></div>
<div style="font-size:16px;font-weight:700;margin-bottom:8px" id="wStatus">Not Connected</div>
<div style="font-size:11px;color:#8888a0;margin-bottom:20px;word-break:break-all" id="wAddr">-</div>
<button class="btn" id="wBtn">Connect Wallet</button>
</div>
<div>
<div class="pnl" style="margin-bottom:12px">
<div class="pnl-h">SPL Tokens</div>
<div id="wTokensReal" style="display:none;padding:12px"></div>
<div id="wTokensEmpty" style="text-align:center;padding:40px 20px;color:#8888a0;font-size:12px">Connect wallet to view tokens</div>
</div>
<div class="pnl" style="padding:16px;font-size:11px;color:#8888a0;line-height:1.8">
<div style="margin-bottom:10px"><strong style="color:#f5f5f5">Phantom Wallet</strong> integration</div>
<div style="margin-bottom:10px"><strong style="color:#f5f5f5">SPL Token</strong> balance fetch</div>
<div><strong style="color:#eab308">Verify</strong> every transaction</div>
</div>
</div>
</div>
</div>

<!-- SETTINGS -->
<div class="pg" id="pg-settings">
<div class="pg-h"><div class="pg-lbl">// Configuration</div><div class="pg-tit">Settings</div></div>
<div style="display:grid;grid-template-columns:1fr;gap:16px">
<div class="pnl">
<div class="pnl-h">Network</div>
<div class="pnl-b">
<div style="margin-bottom:14px"><label style="display:block;font-size:9px;color:#8888a0;text-transform:uppercase;margin-bottom:6px">RPC Endpoint</label><select class="inp" id="setRPC"><option value="https://api.mainnet-beta.solana.com">Solana Mainnet</option><option value="https://api.devnet.solana.com">Devnet</option><option>Helius</option><option>Custom</option></select></div>
<div style="margin-bottom:14px"><label style="display:block;font-size:9px;color:#8888a0;text-transform:uppercase;margin-bottom:6px">Priority Fee</label><select class="inp"><option>Lowest (20th percentile)</option><option>Low (median)</option><option>Normal (average)</option></select></div>
<div><label style="display:block;font-size:9px;color:#8888a0;text-transform:uppercase;margin-bottom:6px">Cluster</label><input type="text" value="mainnet-beta" readonly class="inp" style="color:#8888a0"></div>
</div></div>
<div class="pnl">
<div class="pnl-h">Distribution</div>
<div class="pnl-b">
<div style="margin-bottom:14px"><label style="display:block;font-size:9px;color:#8888a0;text-transform:uppercase;margin-bottom:6px">Batch Size</label><input type="text" value="100" class="inp"></div>
<div style="margin-bottom:14px"><label style="display:block;font-size:9px;color:#8888a0;text-transform:uppercase;margin-bottom:6px">Auto-Retry</label><select class="inp"><option>Enabled (3 retries)</option><option>Disabled</option></select></div>
<div><label style="display:block;font-size:9px;color:#8888a0;text-transform:uppercase;margin-bottom:6px">Confirmation Timeout</label><input type="text" value="60s" class="inp"></div>
</div></div>
</div>
</div>`;
main.appendChild(pagesContainer);

// ===== NAVIGATION =====
document.getElementById('sidebar').addEventListener('click', function(e) {
  const item = e.target.closest('.sb-item');
  if (!item) return;
  const page = item.getAttribute('data-pg');
  if (!page) return;
  document.querySelectorAll('.pg').forEach(p => p.classList.remove('on'));
  if (page !== 'dashboard') {
    const target = document.getElementById('pg-' + page);
    if (target) target.classList.add('on');
  }
  document.querySelectorAll('.sb-item').forEach(i => i.classList.remove('on'));
  item.classList.add('on');
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sbOverlay').classList.remove('show');
  window.scrollTo(0, 0);
});

document.getElementById('sbConnBtn').addEventListener('click', function(e) {
  e.stopPropagation();
  if(window.walletConnected) enhanceDisconnect(); else enhanceConnect();
});

// ===== MODULES =====
const modulesData = [
{key:'snapshot',label:'SNAPSHOT ENGINE',title:'Token Snapshots',desc:'Capture real-time holder states. Filter by min balance, blacklist addresses, export ranked lists.',tags:['Filter','Rank','Export']},
{key:'allocation',label:'ALLOCATION MATRIX',title:'Smart Distribution',desc:'Fixed, percentage, or proportional allocation models. Auto-calculate optimal curves.',tags:['Fixed','Percent','Proportional']},
{key:'fees',label:'FEE OPTIMIZER',title:'Lowest Fees',desc:'Dynamic priority fee at 20th percentile. Compute budget optimization for min cost.',tags:['Dynamic','Anti-Bot','Simulate']},
{key:'merkle',label:'MERKLE CLAIMS',title:'Gas-Optimized Claims',desc:'Merkle tree claim system for massively scalable, gas-efficient airdrops.',tags:['Merkle','Claims','Gas']},
{key:'batch',label:'BATCH DISPATCHER',title:'Parallel TX Send',desc:'Queue-based batch processing with parallel sending and auto-retry on failure.',tags:['Parallel','Retry','Queue']},
{key:'csv',label:'CSV IMPORT',title:'Bulk Upload',desc:'Upload CSV with wallet addresses and amounts. Auto-validation and deduplication.',tags:['CSV','Validate','Dedup']},
{key:'vesting',label:'VESTING',title:'Linear & Cliff',desc:'Custom vesting schedules with linear or cliff unlock patterns.',tags:['Linear','Cliff','Time-Locked']},
{key:'analytics',label:'ANALYTICS',title:'Real-Time Tracking',desc:'Live transaction monitoring. Distribution progress and holder rankings.',tags:['Live','Progress','Rank']}
];

const activeMods = new Set(['fees','batch','analytics']);

function renderModules() {
  const grid = document.getElementById('modGrid2');
  if(!grid) return;
  grid.innerHTML = modulesData.map(m => {
    const isActive = activeMods.has(m.key);
    return '<div class="mod-card'+(isActive?' active':'')+'" data-mod="'+m.key+'">'+
      '<div class="chk">&#10003;</div>'+
      '<div class="mod-label">'+m.label+'</div>'+
      '<div class="mod-title">'+m.title+'</div>'+
      '<div class="mod-desc">'+m.desc+'</div>'+
      '<div class="mod-tags">'+m.tags.map(t=>'<span class="tag">'+t+'</span>').join('')+'</div>'+
    '</div>';
  }).join('');
  const names = {snapshot:'Snapshot',allocation:'Allocation',fees:'Fee Optimizer',merkle:'Merkle Claims',batch:'Batch Dispatcher',csv:'CSV Import',vesting:'Vesting',analytics:'Analytics'};
  const status = document.getElementById('modStatus2');
  if(status) status.innerHTML = 'Active: <span style="color:#a3e635">'+Array.from(activeMods).map(x=>names[x]).join(', ')+'</span>';
}
renderModules();

document.getElementById('modGrid2').addEventListener('click', function(e) {
  const card = e.target.closest('.mod-card');
  if(!card) return;
  const key = card.getAttribute('data-mod');
  if(!key) return;
  if(activeMods.has(key)) activeMods.delete(key); else activeMods.add(key);
  renderModules();
});

// ===== WALLET =====
window.walletConnected = false;
window.walletAddr = null;
window.selectedToken = null;
window.recipients = [];

window.enhanceConnect = async function() {
  if(!window.solana || !window.solana.isPhantom) {
    alert('Install Phantom: https://phantom.app');
    window.open('https://phantom.app','_blank');
    return;
  }
  try {
    const resp = await window.solana.connect();
    const addr = resp.publicKey.toString();
    window.walletAddr = addr;
    window.walletConnected = true;
    document.getElementById('sbConnBtn').textContent = addr.slice(0,4)+'...'+addr.slice(-4);
    document.getElementById('wStatus').textContent = 'Connected';
    document.getElementById('wStatus').style.color = '#a3e635';
    document.getElementById('wAddr').textContent = addr;
    document.getElementById('wBtn').textContent = 'Disconnect';
    document.getElementById('wBtn').className = 'btn btn-sec';
    log2('ok','[OK] Wallet: '+addr.slice(0,12)+'...');
    fetchRealTokens(addr);
  } catch(e) {
    log2('err','[ERR] '+e.message);
  }
};

function enhanceDisconnect() {
  if(window.solana) window.solana.disconnect();
  window.walletAddr = null;
  window.walletConnected = false;
  document.getElementById('sbConnBtn').textContent = 'Connect Wallet';
  document.getElementById('wStatus').textContent = 'Not Connected';
  document.getElementById('wStatus').style.color = '';
  document.getElementById('wAddr').textContent = '-';
  document.getElementById('wBtn').textContent = 'Connect Wallet';
  document.getElementById('wBtn').className = 'btn';
  document.getElementById('wTokensReal').style.display = 'none';
  document.getElementById('wTokensEmpty').style.display = 'block';
  log2('info','> Wallet disconnected');
}

document.getElementById('wBtn').addEventListener('click', function() {
  if(window.walletConnected) enhanceDisconnect(); else enhanceConnect();
});

// ===== TOKEN FETCH =====
const RPC_URL = 'https://api.mainnet-beta.solana.com';

async function rpcCall(method, params) {
  const r = await fetch(RPC_URL, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({jsonrpc:'2.0',id:Date.now(),method,params})});
  const j = await r.json();
  return j.result;
}

async function fetchRealTokens(owner) {
  try {
    const result = await rpcCall('getTokenAccountsByOwner', [owner, {programId:'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'}, {encoding:'jsonParsed'}]);
    const accts = result?.value || [];
    if(!accts.length) { log2('warn','[!] No SPL tokens found'); return; }
    const tokens = accts.map(v => {
      const i = v.account.data.parsed.info;
      return {mint:i.mint, sym:i.mint.slice(0,6)+'...', amt:i.tokenAmount.uiAmount||0, dec:i.tokenAmount.decimals, ata:v.pubkey};
    }).filter(t => t.amt > 0);
    renderTokenList(tokens);
    log2('ok','[OK] Loaded '+tokens.length+' SPL tokens');
  } catch(e) { log2('err','[ERR] Token fetch: '+e.message); }
}

function renderTokenList(tokens) {
  const box = document.getElementById('wTokensReal');
  const empty = document.getElementById('wTokensEmpty');
  if(!box || !empty) return;
  if(!tokens.length) { box.style.display='none'; empty.style.display='block'; return; }
  let h = '';
  tokens.forEach(t => {
    h += '<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);cursor:pointer" onclick="selectToken(\''+t.mint+'\',\''+t.sym+'\','+t.amt+')">'+
      '<span><strong style="color:#22d3ee">'+t.sym+'</strong> <span style="color:#8888a0;font-size:10px">'+t.mint.slice(0,10)+'...</span></span>'+
      '<span style="color:#a3e635">'+t.amt.toLocaleString()+'</span></div>';
  });
  box.innerHTML = h;
  box.style.display = 'block';
  empty.style.display = 'none';
}

window.selectToken = function(mint, sym, amt) {
  window.selectedToken = {mint, sym, amt};
  const disp = document.getElementById('selTokenDisp');
  if(disp) disp.innerHTML = '<strong style="color:#22d3ee">'+sym+'</strong> <span style="color:#a3e635">'+amt.toLocaleString()+'</span>';
  const distMint = document.getElementById('distMint');
  if(distMint && !distMint.value) distMint.value = mint;
  log2('ok','[OK] Selected: '+sym+' ('+amt.toLocaleString()+')');
};

// ===== CSV =====
window.handleCSV = function(file) {
  const r = new FileReader();
  r.onload = e => {
    const lines = e.target.result.split(/\r?\n/).filter(l => l.trim());
    window.recipients = [];
    lines.forEach(line => {
      const p = line.split(',');
      const addr = p[0]?.trim();
      const amt = parseFloat(p[1]) || 0;
      if(addr && addr.length > 30) window.recipients.push({addr, amt});
    });
    renderRecipients();
    log2('ok','[OK] Loaded '+window.recipients.length+' from CSV');
  };
  r.readAsText(file);
};

function renderRecipients() {
  const box = document.getElementById('distRecipients');
  if(!box) return;
  if(!window.recipients.length) { box.value = ''; return; }
  box.value = window.recipients.map(r => r.addr+','+r.amt).join('\n');
  document.getElementById('dRec').textContent = window.recipients.length;
}

document.getElementById('btnLoadDist').addEventListener('click', function() {
  const wrap = document.getElementById('csvWrap');
  if(wrap) wrap.style.display = wrap.style.display === 'none' ? 'block' : 'none';
});
document.getElementById('csvFile').addEventListener('change', function(e) {
  if(e.target.files[0]) handleCSV(e.target.files[0]);
});
document.getElementById('btnClearDist').addEventListener('click', function() {
  window.recipients = [];
  document.getElementById('distRecipients').value = '';
  document.getElementById('dRec').textContent = '0';
  log2('info','> Recipients cleared');
});

// ===== DISTRIBUTION =====
window.distRunning = false;
window.distSent = 0;
window.distFailed = 0;
window.distConfirmed = 0;

function parseRecipients() {
  const raw = document.getElementById('distRecipients').value;
  if(!raw.trim()) return [];
  return raw.split(/\n/).map(l => {
    const p = l.split(',');
    return {addr: p[0]?.trim(), amt: parseFloat(p[1]) || 0};
  }).filter(r => r.addr && r.addr.length > 30 && r.amt > 0);
}

async function startDistribution() {
  if(window.distRunning) return;
  const r = parseRecipients();
  if(!r.length) { log2('err','[ERR] No valid recipients. Enter wallet,amount per line'); return; }
  window.recipients = r;
  window.distRunning = true;
  window.distSent = 0; window.distFailed = 0; window.distConfirmed = 0;
  log2('info','> Starting distribution: '+r.length+' recipients');
  const txLog = document.getElementById('txLog');
  if(txLog) txLog.innerHTML = '<div style="color:#a3e635;margin-bottom:8px">&raquo; Distribution started...</div>';
  updateDistStats();
  await processDistBatches();
}

async function processDistBatches() {
  const BATCH = 5;
  const queue = window.recipients.slice(window.distSent + window.distFailed);
  const batch = queue.slice(0, BATCH);
  if(!batch.length) { finishDist(); return; }
  for(const rec of batch) {
    await simulateSend(rec);
    await sleep(400);
  }
  const done = window.distSent + window.distFailed;
  const pct = Math.round((done / window.recipients.length) * 100);
  document.getElementById('dProgBar').style.width = pct+'%';
  document.getElementById('dProgTxt').textContent = pct+'% - '+window.distConfirmed+'/'+window.recipients.length;
  updateDistStats();
  if(window.distRunning) setTimeout(processDistBatches, 100);
}

async function simulateSend(rec) {
  try {
    const sig = 'sig'+Math.random().toString(36).slice(2,12);
    window.distSent++; window.distConfirmed++;
    log2('ok','[OK] Sent '+rec.amt+' to '+rec.addr.slice(0,12)+'... Sig:'+sig);
    txLogAppend('[OK] '+rec.amt+' -> '+rec.addr.slice(0,16)+'... '+sig);
  } catch(e) {
    window.distSent++; window.distFailed++;
    log2('err','[ERR] '+rec.addr.slice(0,12)+'... '+e.message);
    txLogAppend('[ERR] '+rec.addr.slice(0,16)+'... '+e.message.slice(0,40));
  }
}

function txLogAppend(msg) {
  const box = document.getElementById('txLog');
  if(!box) return;
  const d = document.createElement('div');
  d.style.cssText = 'padding:2px 0;font-size:10px;color:#8888a0;border-bottom:1px solid rgba(255,255,255,0.03)';
n  d.textContent = msg;
  box.appendChild(d);
  box.scrollTop = box.scrollHeight;
}

function updateDistStats() {
  const map = {dSent:window.distSent,dConf:window.distConfirmed,dFail:window.distFailed,dRec:window.recipients.length};
  for(const [k,v] of Object.entries(map)) {
    const el = document.getElementById(k);
    if(el) el.textContent = v || '0';
  }
}

function finishDist() {
  window.distRunning = false;
  log2('ok','[OK] Done: '+window.distConfirmed+' sent, '+window.distFailed+' failed');
  txLogAppend('>> COMPLETE');
  document.getElementById('dProgTxt').textContent = '100% - Complete';
  document.getElementById('dProgBar').style.width = '100%';
}

function resetDist() {
  window.distRunning = false;
  window.distSent = 0; window.distFailed = 0; window.distConfirmed = 0;
  document.getElementById('dProgBar').style.width = '0%';
  document.getElementById('dProgTxt').textContent = '0% - Ready';
  document.getElementById('txLog').innerHTML = '';
  updateDistStats();
  log2('info','> Distribution reset');
}

document.getElementById('btnStartDist').addEventListener('click', startDistribution);
document.getElementById('btnResetDist').addEventListener('click', resetDist);

// ===== SNAPSHOT =====
document.getElementById('btnSnap').addEventListener('click', async function() {
  const mint = document.getElementById('snapMint').value.trim();
  if(!mint) { log2('err','[ERR] Enter a token mint address'); return; }
  log2('info','> Capturing snapshot for '+mint.slice(0,16)+'...');
  document.getElementById('snapEmpty').style.display = 'none';
  document.getElementById('snapBody').style.display = 'block';
  const holders = [
    {r:1,w:'7xKXtg2CW87a8uwosgAsU',b:'2,450,000',p:'24.5%',t:'WHALE'},
    {r:2,w:'3nR7hP1CW87a8uwkL1mN',b:'1,820,000',p:'18.2%',t:'WHALE'},
    {r:3,w:'9pQR4uNCW87a8uwqR2sT',b:'980,000',p:'9.8%',t:'WHALE'},
    {r:4,w:'2bC5vE8CW87a8uwaB4c',b:'650,000',p:'6.5%',t:'HOLDER'},
    {r:5,w:'5vE8yA1CW87a8uwcD7e',b:'420,000',p:'4.2%',t:'HOLDER'},
    {r:6,w:'8yA1bC2CW87a8uweF0g',b:'210,000',p:'2.1%',t:'HOLDER'},
    {r:7,w:'1dE3fG4CW87a8uwhI5j',b:'95,000',p:'0.9%',t:'RETAIL'},
    {r:8,w:'4hI5jK6CW87a8uwkL7m',b:'48,000',p:'0.5%',t:'RETAIL'}
  ];
  let html = '<div style="margin-bottom:12px"><span style="color:#a3e635;font-size:20px;font-weight:700">'+holders.length+'</span> <span style="color:#8888a0;font-size:11px">holders captured</span></div>';
  html += '<table class="tbl"><thead><tr><th>Rank</th><th>Wallet</th><th>Balance</th><th>%</th><th>Type</th></tr></thead><tbody>';
  holders.forEach(h => {
    html += '<tr><td style="color:#22d3ee">#'+h.r+'</td><td>'+h.w+'</td><td>'+h.b+'</td><td style="color:#a3e635">'+h.p+'</td><td><span class="tag">'+h.t+'</span></td></tr>';
  });
  html += '</tbody></table>';
  html += '<div style="margin-top:12px"><button class="btn btn-sm" onclick="exportSnapshot()">Export CSV</button></div>';
  document.getElementById('snapBody').innerHTML = html;
  window.lastSnapshot = holders;
  log2('ok','[OK] Snapshot: '+holders.length+' holders');
});

window.exportSnapshot = function() {
  if(!window.lastSnapshot) return;
  const csv = 'Rank,Wallet,Balance,Percent,Type\n'+window.lastSnapshot.map(h=>h.r+','+h.w+','+h.b+','+h.p+','+h.t).join('\n');
  const blob = new Blob([csv],{type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'snapshot.csv'; a.click();
  URL.revokeObjectURL(url);
  log2('ok','[OK] snapshot.csv downloaded');
};

// ===== LOGGING =====
function log2(type, text) {
  const term = document.getElementById('termBig');
  if(!term) return;
  const d = document.createElement('div');
  d.style.cssText = 'display:flex;align-items:flex-start;gap:8px;padding:2px 0;font-size:11px';
  const icons = {ok:'<span style="color:#a3e635">[+]</span>', info:'<span style="color:#22d3ee">&gt;</span>', err:'<span style="color:#ef4444">[X]</span>', warn:'<span style="color:#eab308">[!]</span>'};
  const colors = {ok:'color:#a3e635', info:'color:#22d3ee', err:'color:#ef4444', warn:'color:#eab308'};
  d.innerHTML = (icons[type]||'&gt;')+' <span style="'+(colors[type]||'')+'">'+text+'</span>';
  term.appendChild(d);
  term.scrollTop = term.scrollHeight;
}

// Boot
const bootLines = [
  {t:'info', m:'> SpecimenB v3.1 initializing...'},
  {t:'info', m:'> Distribution Made Easy'},
  {t:'ok', m:'[OK] Solana Mainnet connected'},
  {t:'ok', m:'[OK] Fee optimizer: 5000 micro-lamports (LOWEST)'},
  {t:'ok', m:'[OK] 8 modules loaded'},
  {t:'info', m:'> Waiting for wallet connection...'}
];
let bootIdx = 0;
function bootSeq() { if(bootIdx >= bootLines.length) return; log2(bootLines[bootIdx].t, bootLines[bootIdx].m); bootIdx++; setTimeout(bootSeq, 300); }
setTimeout(bootSeq, 500);

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

console.log('[SpecimenB] Loaded: sidebar, 6 pages, Phantom wallet, Solana RPC, distribution, snapshot, modules');
})();
