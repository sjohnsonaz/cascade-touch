import BindTouch from '../../../scripts/modules/Touch';

window.onload = function () {
    console.log('test started...');
    BindTouch.bind(document.getElementById('touch-element-0'));
    BindTouch.bind(document.getElementById('touch-element-1'));
};
