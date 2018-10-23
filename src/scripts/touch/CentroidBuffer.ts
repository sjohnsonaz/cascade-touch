import Vector from './Vector';
import Centroid from './Centroid';

export default class CentroidBuffer {
    touches: { [index: number]: Touch } = {};
    centroids: Centroid[] = [];
    size: number;

    get delta() {
        if (this.centroids.length === this.size) {
            let first = this.centroids[0];
            let last = this.centroids[this.centroids.length - 1];
            let dx = last.x - first.x;
            let dy = last.y - first.y;
            return new Vector(dx, dy);
        } else {
            return new Vector(0, 0);
        }
    }

    get velocity() {
        if (this.centroids.length === this.size) {
            let first = this.centroids[0];
            let last = this.centroids[this.centroids.length - 1];
            let dx = last.x - first.x;
            let dy = last.y - first.y;
            let dt = last.time - first.time;
            return new Vector(dx / dt, dy / dt);
        } else {
            return null;
        }
    }

    constructor(size: number = 2) {
        this.size = size;
    }

    reset() {
        this.centroids.length = 0;
    }

    start(touchList: TouchList, changedTouches: TouchList) {
        this.update(touchList);
        for (let index = 0, length = changedTouches.length; index < length; index++) {
            let touch = changedTouches[index];
            this.touches[touch.identifier] = touch;
        }
        this.reset();
    }

    end(touchList: TouchList, changedTouches: TouchList) {
        this.update(touchList);
        for (let index = 0, length = changedTouches.length; index < length; index++) {
            let touch = changedTouches[index];
            delete this.touches[touch.identifier];
        }
        this.reset();
    }

    cancel(touchList: TouchList, changedTouches: TouchList) {
        this.update(touchList);
        for (let index = 0, length = changedTouches.length; index < length; index++) {
            let touch = changedTouches[index];
            delete this.touches[touch.identifier];
        }
        this.reset();
    }

    move(touchList: TouchList) {
        this.update(touchList);
        for (let index = 0, length = touchList.length; index < length; index++) {
            let touch = touchList[index];
            this.touches[touch.identifier] = touch;
        }
    }

    update(touchList: TouchList) {
        let centroid = new Centroid();
        centroid.update(touchList);
        this.add(centroid);
    }

    add(centroid: Centroid) {
        this.centroids.push(centroid);
        if (this.centroids.length > this.size) {
            this.centroids.shift();
        }
    }
}