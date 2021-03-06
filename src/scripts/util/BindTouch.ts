import { Vector } from '@cascade/vector';

import CentroidBuffer from '../touch/CentroidBuffer';

export default class BindTouch {
    static bind(element: HTMLElement) {
        let centroidBuffer = new CentroidBuffer();

        element.addEventListener('touchstart', (event) => {
            centroidBuffer.start(event.touches, event.changedTouches);
            element.classList.add('dragging');
            //console.log('touch start', centroidBuffer);
        });
        element.addEventListener('touchmove', (event) => {
            centroidBuffer.move(event.touches);
            let delta = centroidBuffer.delta;
            if (delta) {
                let left = parseInt(element.style.getPropertyValue('--touch-left') || '0');
                let top = parseInt(element.style.getPropertyValue('--touch-top') || '0');
                let angle = parseInt(element.style.getPropertyValue('--touch-angle') || '0');
                element.style.setProperty('--touch-left', left + delta.x + 'px');
                element.style.setProperty('--touch-top', top + delta.y + 'px');
                element.style.setProperty('--touch-angle', angle + centroidBuffer.rotation + 'rad');
            }
            console.log('touch move', centroidBuffer);
        });
        element.addEventListener('touchend', (event) => {
            centroidBuffer.end(event.touches, event.changedTouches);
            element.style.setProperty('--touch-left', '0px');
            element.style.setProperty('--touch-top', '0px');
            element.style.setProperty('--touch-angle', '0rad');
            element.classList.remove('dragging');
            //console.log('touch end', centroidBuffer);
        });
        element.addEventListener('touchcancel', (event) => {
            centroidBuffer.cancel(event.touches, event.changedTouches);
            element.classList.remove('dragging');
            //console.log('touch cancel', centroidBuffer);
        });

        return centroidBuffer;
    }

    static bindDrag(element: HTMLElement) {
        element.draggable = true;
        let vector: Vector;

        let hideElement = document.createElement('span');
        hideElement.style.cssText = 'position: absolute; display: block; top: 0; left: 0; width: 0; height: 0;';
        document.body.appendChild(hideElement);

        element.addEventListener('dragstart', (event) => {
            vector = new Vector(event.clientX, event.clientY);
            element.style.zIndex = '100';
            element.classList.add('dragging');
            event.dataTransfer.setDragImage(hideElement, 0, 0);
        });
        element.addEventListener('drag', (event) => {
            if (vector) {
                let left = parseInt(element.style.left || '0');
                let top = parseInt(element.style.top || '0');
                element.style.left = left + event.clientX - vector.x + 'px';
                element.style.top = top + event.clientY - vector.y + 'px';
                vector.x = event.clientX;
                vector.y = event.clientY;
            }
        });
        element.addEventListener('dragend', (event) => {
            vector = undefined;
            element.style.left = '0px';
            element.style.top = '0px';
            element.style.zIndex = '';
            element.classList.remove('dragging');
        });
    }
}