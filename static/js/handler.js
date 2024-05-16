document.getElementById('address').addEventListener('keydown', async (ev) => {
    if (ev.key == 'Enter') {
        try {
            var address = document.getElementById('address').value;
            console.log(`Sending to: ${address}`);
            if (!navigator.serviceWorker) throw new Error();

            await navigator.serviceWorker.register(__uv$config.sw);
            let wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
            await BareMux.SetTransport("EpxMod.EpoxyClient", { wisp: wispUrl });

            address = address.replace('https://', '');
            address = address.replace('http://', '');
            address = ["https://", address].join('');
            var search = '';
            console.log(address);
            try { search = new URL(address).toString(); }
            catch { search = getCookie('search-engine').replace('%s', encodeURIComponent(address)); }
            document.body.childNodes.forEach(element => {
                element.remove();
            });
            const frame = document.getElementById('frame');
            frame.src = __uv$config.prefix + __uv$config.encodeUrl(search);
            frame.style.display = 'block';
        }
        catch {

        }
    }
});