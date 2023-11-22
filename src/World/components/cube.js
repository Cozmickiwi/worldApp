import { TorusKnotGeometry, TorusGeometry, Mesh, MeshStandardMaterial, MeshToonMaterial} from '../../../node_modules/three/build/three.module.js';

function createCube(first){
    const geometry = new TorusKnotGeometry(6.5, 1);
    const geometry2 = new TorusGeometry(6.5, .7);
    const material = new MeshStandardMaterial({
        color: 'blue',
        wireframe: true,
        wireframeLinewidth: .5,
        wireframeLinecap: 'round',
    });
    const material2 = new MeshStandardMaterial({
        color: 'Indigo',
        wireframe: true,
        opacity: .1,
        wireframeLinewidth: 1,
        wireframeLinecap: 'round',
        roughness: .8,
    });
    const toon = new MeshToonMaterial({
        color: 'blue',
    })
    const cube = new Mesh(geometry, material);
    const cube2 = new Mesh(geometry2, material2);
    cube2.position.set(-.5, 0, -20);
    cube2.rotation.y = 2.4;
    if(first == true){
        return (cube);
    }
    else{
        return (cube2);
    }
}
export{createCube};