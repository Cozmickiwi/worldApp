import { PerspectiveCamera } from '../../../node_modules/three/build/three.module.js';

function createCamera(){
    const camera = new PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(-20, 5, 240);
    //camera.maxPolar
    camera.rotation.y = (-Math.PI/2);
    return camera;
}
export{createCamera};