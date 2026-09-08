import localtunnel from 'localtunnel';

async function startTunnels() {
  console.log('\n=============================================================');
  console.log('  🌐 CREATING PUBLIC WORLDWIDE ACCESS TUNNELS (ANY NETWORK)');
  console.log('=============================================================');
  console.log('  Connecting your local laptop services to the global internet...\n');

  try {
    // 1. Backend API Tunnel (Port 5000)
    const backendTunnel = await localtunnel({ port: 5000 });
    console.log(`  🔌 Public Backend API:   ${backendTunnel.url}`);

    // 2. Storefront Tunnel (Port 3000)
    const storeTunnel = await localtunnel({ port: 3000 });
    console.log(`  🛍️  Public SmartHome Store: ${storeTunnel.url}`);

    // 3. Admin Console Tunnel (Port 3001)
    const adminTunnel = await localtunnel({ port: 3001 });
    console.log(`  ⚙️  Public Admin Console:    ${adminTunnel.url}`);

    console.log('\n-------------------------------------------------------------');
    console.log('  ✨ SUCCESS! Anyone on ANY Wi-Fi, 4G, 5G, or Mobile Data can');
    console.log('  now access these links directly from anywhere in the world!');
    console.log('-------------------------------------------------------------');
    console.log('  💡 Note: On the first visit to a localtunnel link, click');
    console.log('  "Click to Continue" or enter your public IP if prompted.');
    console.log('=============================================================\n');

    backendTunnel.on('close', () => console.log('[Tunnel] Backend tunnel closed'));
    storeTunnel.on('close', () => console.log('[Tunnel] Store tunnel closed'));
    adminTunnel.on('close', () => console.log('[Tunnel] Admin tunnel closed'));

  } catch (err: any) {
    console.error('Error starting public tunnels:', err.message);
  }
}

startTunnels();
