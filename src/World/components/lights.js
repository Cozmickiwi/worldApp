import { 
    DirectionalLight,
    AmbientLight,
    SpotLight,
    PointLight
} from '../../../node_modules/three/build/three.module.js';

function createLights(amb){
    const light = new DirectionalLight('white', 2);
    light.position.set(20, 20, 10);
    const light2 = new DirectionalLight('aliceblue', .5);
    light2.position.set(100,-100,-500)
    if(amb == false){
        return light;
    }
    else{
        return light2;
    }
}
export{createLights};