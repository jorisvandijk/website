(function () {
    var fx = [
        'logo-fx-rainbow', 'logo-fx-barber-pole', 'logo-fx-vertical-blinds',
        'logo-fx-soft-candy', 'logo-fx-ltr', 'logo-fx-rtl', 'logo-fx-oil-slick',
        'logo-fx-thermal', 'logo-fx-sunrise', 'logo-fx-deep-sea',
        'logo-fx-radioactive', 'logo-fx-northern-lights', 'logo-fx-sunset',
        'logo-fx-flood-smooth'
    ];
    document.documentElement.classList.add(fx[Math.floor(Math.random() * fx.length)]);

    var asterismFx = ['spin', 'mirror', 'scrollBounce', 'glitch', 'rainbow'];
    var forcedFx = new URLSearchParams(window.location.search).get('fx');
    document.documentElement.dataset.asterismFx = forcedFx || asterismFx[Math.floor(Math.random() * asterismFx.length)];
})();
