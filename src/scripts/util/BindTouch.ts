import CentroidBuffer from '../touch/CentroidBuffer';

export default class BindTouch {
    static bind(element: HTMLElement) {
        let centroidBuffer = new CentroidBuffer();

        element.addEventListener('touchstart', (event) => {
            centroidBuffer.start(event.touches, event.changedTouches);
            element.style.zIndex = '100';
            element.classList.add('dragging');
            console.log('touch start', centroidBuffer);
        });
        element.addEventListener('touchmove', (event) => {
            centroidBuffer.move(event.touches);
            let delta = centroidBuffer.delta;
            if (delta) {
                let left = parseInt(element.style.left || '0');
                let top = parseInt(element.style.top || '0');
                element.style.left = left + delta.x + 'px';
                element.style.top = top + delta.y + 'px';
            }
            console.log('touch move', centroidBuffer, centroidBuffer.velocity);
        });
        element.addEventListener('touchend', (event) => {
            centroidBuffer.end(event.touches, event.changedTouches);
            element.style.left = '0px';
            element.style.top = '0px';
            element.style.zIndex = '';
            element.classList.remove('dragging');
            console.log('touch end', centroidBuffer);
        });
        element.addEventListener('touchcancel', (event) => {
            centroidBuffer.cancel(event.touches, event.changedTouches);
            element.style.zIndex = '';
            element.classList.remove('dragging');
            console.log('touch cancel', centroidBuffer);
        });

        return centroidBuffer;
    }
}