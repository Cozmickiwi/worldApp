import { DirectionalLight } from '../../../node_modules/three/build/three.module.js';

function createLights(){
    const light = new DirectionalLight('white', 2);
    light.position.set(20, 20, 10);
    return light;
}
export{createLights};