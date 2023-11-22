import {
    IcosahedronGeometry, 
    TorusGeometry, 
    PlaneGeometry,
    Mesh, 
    MeshStandardMaterial, 
    MeshToonMaterial,
    TextureLoader,
    DoubleSide,
} from '../../../node_modules/three/build/three.module.js';

function createCube(first){
    const geometry = new IcosahedronGeometry(2.5);
    const geometry2 = new TorusGeometry(6.5, .7);
    const geometry3 = new PlaneGeometry(600, 600, 100, 100);
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
    const material3 = new MeshStandardMaterial({
        color: 'CornflowerBlue',
        wireframe: true,
        wireframeLinecap: 'roundSkyBlueDarkTurquoise',
        roughness: 0.1,
    })
    const toon = new MeshToonMaterial({
        color: 'blue',
        
    })
    const cube = new Mesh(geometry, material);
    const cube2 = new Mesh(geometry2, material2);
    const plane = new Mesh(geometry3, material3);
    //cube2.position.set(0, 0, -20);
    //cube2.rotation.y = 2.4;
    plane.rotation.x = ((Math.PI*2)/(360/90));
    plane.position.set(0, -10, 0)
    plane.material.side = DoubleSide;
    if(first == true){
        return (cube);
    }
    else if(first == false){
        return (cube2);
    }
    else{
        return (plane)
    }
}
export{createCube};