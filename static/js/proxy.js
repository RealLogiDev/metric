async function _main() {
    try {
       document.getElementById('p').innerText = 'run';
        if (!navigator.serviceWorker) throw new Error();
        document.getElementById('p').innerText = 'run 2';
        //await navigator.serviceWorker.register(__uv$config.sw);
        document.getElementById('frame').src = __uv$config.prefix + location.href.split('=')[1]; 
    }
    catch (err) {
        document.getElementById('p').innerText = err;
    }
}
_main();