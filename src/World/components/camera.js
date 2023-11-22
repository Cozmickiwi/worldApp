import { PerspectiveCamera } from '../../../node_modules/three/build/three.module.js';

function createCamera(){
    const camera = new PerspectiveCamera(35, 1, 0.1, 300);
    camera.position.set(0, 0, 50);
    //camera.rotation.set(0, .0, 0);
    return camera;
}
export{createCamera};