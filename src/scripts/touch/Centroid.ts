import Vector from './Vector';

export default class Centroid extends Vector {
    time: number;

    update(touchList: TouchList) {
        this.time = performance.now();

        if (!touchList.length) {
            this.x = null;
            this.y = null;
        } else {
            let x = 0;
            let y = 0;
            let length = touchList.length;
            for (let index = 0; index < length; index++) {
                let touch = touchList[index];
                x += touch.pageX;
                y += touch.pageY;
            }
            this.x = x / length;
            this.y = y / length;
        }
    }
}