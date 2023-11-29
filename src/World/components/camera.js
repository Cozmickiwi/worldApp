import { PerspectiveCamera } from '../../../node_modules/three/build/three.module.js';

function createCamera(){
    const camera = new PerspectiveCamera(55, 1, 0.1, 1000);
    camera.position.set(50, 10, 0);
    //camera.maxPolar
    //camera.rotation.y = (Math.PI);
    return camera;
}
export{createCamera};