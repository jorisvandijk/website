function getAsterismCenter(el) {
    var rect = el.getBoundingClientRect();
    return {
        cx: rect.left + rect.width / 2 + window.scrollX,
        cy: rect.top + rect.height / 2 + window.scrollY
    };
}

function setBodyTransformOrigin(cx, cy) {
    document.body.style.transformOrigin = cx + 'px ' + cy + 'px';
}

function clearBodyTransform() {
    document.body.style.transition = '';
    document.body.style.transform = '';
    document.body.style.transformOrigin = '';
}

function fxGlitch() {
    document.body.classList.add('glitch');
    setTimeout(function () { document.body.classList.remove('glitch'); }, 800);
}

function fxRainbow() {
    document.body.classList.add('rainbow-text');
    setTimeout(function () { document.body.classList.remove('rainbow-text'); }, 4000);
}

function fxScrollBounce() {
    var start = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var duration = 600;
    var start1 = performance.now();
    function easeInOut(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
    function scrollDown(now) {
        var t = Math.min((now - start1) / duration, 1);
        window.scrollTo(0, start + (docHeight - start) * easeInOut(t));
        if (t < 1) requestAnimationFrame(scrollDown);
        else {
            var start2 = performance.now();
            requestAnimationFrame(function scrollUp(now2) {
                var t2 = Math.min((now2 - start2) / duration, 1);
                window.scrollTo(0, docHeight + (start - docHeight) * easeInOut(t2));
                if (t2 < 1) requestAnimationFrame(scrollUp);
            });
        }
    }
    requestAnimationFrame(scrollDown);
}

function fxMirror() {
    document.body.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    document.body.style.transform = 'scaleX(-1)';
    setTimeout(function () {
        document.body.style.transform = '';
    }, 1600);
}

function fxSpin(asterism) {
    var center = getAsterismCenter(asterism);
    setBodyTransformOrigin(center.cx, center.cy);
    document.body.style.transition = 'transform 2s cubic-bezier(0.4, 0, 0.2, 1)';
    document.body.style.transform = 'rotate(360deg)';
    setTimeout(clearBodyTransform, 2050);
}

var FX_MAP = {
    glitch: fxGlitch,
    rainbow: fxRainbow,
    scrollBounce: fxScrollBounce,
    mirror: fxMirror,
    spin: fxSpin
};

function runAsterismFx(asterism) {
    var handler = FX_MAP[document.documentElement.dataset.asterismFx];
    if (!handler) return;
    handler(asterism);
}

function setupThemeToggle() {
    var toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function () {
        document.body.classList.add('theme-switching');
        setTimeout(function () { document.body.classList.remove('theme-switching'); }, 400);
    });
}

function setupAsterism() {
    var asterism = document.querySelector('.separator-asterism');
    if (!asterism) return;
    asterism.addEventListener('click', function () { runAsterismFx(asterism); });
}

document.addEventListener('DOMContentLoaded', function () {
    setupThemeToggle();
    setupAsterism();
});
