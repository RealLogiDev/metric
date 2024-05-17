async function _main() {
    if (!navigator.serviceWorker) throw new Error('service workers arent supported');
    await navigator.serviceWorker.register('/uv/sw.js');
    document.getElementById('frame').src = ('/uv/service/') + location.href.split('=')[1]; 
    window.history.pushState('proxy.html', 'cluh', '/proxy.html');
}
_main();