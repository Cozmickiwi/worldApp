import { BoxGeometry, Mesh, MeshBasicMaterial } from '../../../node_modules/three/build/three.module.js';

function createCube(first){
    const geometry = new BoxGeometry(2, 2, 2);
    const material = new MeshBasicMaterial();
    const cube = new Mesh(geometry, material);
    const cube2 = new Mesh(geometry, material);
    cube2.position.set(2.5, 1.7);
    if(first == true){
        return (cube);
    }
    else{
        return (cube2);
    }
}
export{createCube};