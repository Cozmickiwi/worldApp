import {
    IcosahedronGeometry, 
    TorusGeometry, 
    Mesh, 
    MeshStandardMaterial, 
    MeshToonMaterial,
    TextureLoader,
} from '../../../node_modules/three/build/three.module.js';

function createCube(first){
    const geometry = new IcosahedronGeometry(4.5);
    const geometry2 = new TorusGeometry(6.5, .7);
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load(
        '/src/World/components/assets/space-cruiser-panels2-unity/space-cruiser-panels2_albedo.png',
    );
    const material = new MeshStandardMaterial({
        //color: 0x0000ff2f,
        wireframe: false,
        wireframeLinewidth: .5,
        wireframeLinecap: 'round',
        map: texture,
        
    });
    const material2 = new MeshStandardMaterial({
        color: 'MediumOrchid',
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