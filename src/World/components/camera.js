import { PerspectiveCamera } from '../../../node_modules/three/build/three.module.js';

function createCamera(){
    const camera = new PerspectiveCamera(35, 1, 0.1, 1000);
    camera.position.set(0, 10, 50);
    //camera.maxPolar
    //camera.rotation.set(0, .0, 0);
    return camera;
}
export{createCamera};