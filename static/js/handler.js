document.getElementById('address').addEventListener('keydown', async (ev) => {
    if (ev.key == 'Enter') {
        try {
            /**
             * @type String
             */
            var address = document.getElementById('address').value;
            console.log(`Sending to: ${address}`);
            if (!navigator.serviceWorker) throw new Error();

            await navigator.serviceWorker.register(__uv$config.sw);
            let wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
            await BareMux.SetTransport("EpxMod.EpoxyClient", { wisp: wispUrl });

            address = processURL(address)
            console.log(address);
            location.href = '/proxy.html?url=' + __uv$config.encodeUrl(address);
        }
        catch {

        }
    }
});