async function _main() {
    if (!navigator.serviceWorker) throw new Error('service workers arent supported');
    await navigator.serviceWorker.register('/uv/sw.js');
    const frame = document.getElementById('frame')
    frame.src = ('/uv/service/') + location.href.split('=')[1]; 
    frame.appendChild((document.createElement('script').innerText = 'const window = parent.window;'));
    window.history.pushState('proxy.html', 'something', '/proxy.html');
}
_main();