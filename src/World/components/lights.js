import { DirectionalLight } from '../../../node_modules/three/build/three.module.js';

function createLights(){
    const light = new DirectionalLight('white', 2);
    light.position.set(10, 10, 10);
    return light;
}
export{createLights};