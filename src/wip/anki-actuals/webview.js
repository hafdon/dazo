'use strict';
document.addEventListener('keydown', function (e) {
    if (e.keyCode !== 8) return;
    let n = 0;
    const o = e.target,
        t = o.nodeName;
    (t === 'INPUT' || t === 'TEXTAREA' || (t === 'DIV' && o.contentEditable)) &&
        (n = 1),
        n || e.preventDefault();
});
