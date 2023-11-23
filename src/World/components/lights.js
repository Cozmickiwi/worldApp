import { 
    DirectionalLight,
    AmbientLight,
    SpotLight,
    PointLight
} from '../../../node_modules/three/build/three.module.js';

function createLights(amb){
    const light = new DirectionalLight('white', 2);
    light.position.set(20, 20, 10);
    const light2 = new DirectionalLight('aliceblue', 3);
    //light2.position.set(100,-100,-500)
    light2.position.set(20, 20, 10);
    const light3 = new AmbientLight('white', .3);
    if(amb == false){
        return light;
    }
    else if(amb == true){
        return light2;
    }
    else if(amb == 'amb'){
        return light3;
    }
}
export{createLights};