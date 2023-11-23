import { OrthographicCamera } from '../../../node_modules/three/build/three.module.js';
function createOrtho(){
    const orthoCamera = new OrthographicCamera(-innerWidth/2, innerWidth/2, -innerHeight/2, innerHeight/2, -10000, 1000);
    orthoCamera.position.set(1,1,10)
    return orthoCamera;
}
export{createOrtho};