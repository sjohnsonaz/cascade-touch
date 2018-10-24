import { Vector } from '@cascade/vector';

export default class Centroid extends Vector {
    time: number;
    orientation: Vector = null;

    update(touchList: TouchList) {
        this.time = performance.now();

        if (!touchList.length) {
            this.x = null;
            this.y = null;
            this.orientation = null;
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

            if (touchList.length === 2) {
                let first = touchList[0];
                let second = touchList[1];
                this.orientation = new Vector(
                    second.pageX - first.pageX,
                    second.pageY - first.pageY
                );
            } else {
                this.orientation = null;
            }
        }
    }
}