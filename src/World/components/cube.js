import {
    IcosahedronGeometry, 
    TorusGeometry, 
    PlaneGeometry,
    Mesh, 
    MeshStandardMaterial, 
    MeshToonMaterial,
    TextureLoader,
    DoubleSide,
    RepeatWrapping,
} from '../../../node_modules/three/build/three.module.js';



function createCube(first){
    const geometry = new IcosahedronGeometry(2.5);
    const geometry2 = new TorusGeometry(6.5, .7);
    const geometry3 = new PlaneGeometry(600, 600, 100, 100);
    const geometry4 = new PlaneGeometry(600, 100);
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load(
        '/src/World/components/assets/space-cruiser-panels2-unity/space-cruiser-panels2_albedo.png',
    );
    const wallTexture = textureLoader.load(
        '/src/World/components/assets/white-grey-tile-wall.avif',
    )
    const floorTexture = textureLoader.load(
        '/src/World/components/assets/pngtree-brick.jpg'
    )
    wallTexture.wrapS = RepeatWrapping;
    wallTexture.wrapT = RepeatWrapping;
    wallTexture.repeat.set(12,2)
    floorTexture.wrapS = RepeatWrapping;
    floorTexture.wrapT = RepeatWrapping;
    floorTexture.repeat.set(20,20)
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
        color: 'grey',
        //wireframe: true,
        //roughness: 1,
        map: floorTexture,
    });
    const material4 = new MeshStandardMaterial({
        color: 'LightSteelBlue',
        //wireframe: true,
        //roughness: 0.1,
        map: wallTexture,
    });
    const toon = new MeshToonMaterial({
        color: 'blue',
        
    })
    const cube = new Mesh(geometry, material);
    const cube2 = new Mesh(geometry2, material2);
    const plane = new Mesh(geometry3, material3);
    const wall1 = new Mesh(geometry4, material4);
    cube.position.set(0,10,0);
    cube2.position.set(0, 10, 0);
    //cube2.rotation.y = 2.4;
    plane.rotation.x = ((Math.PI*2)/(360/90));
    //plane.position.set(0, -10, 0)
    plane.material.side = DoubleSide;
    wall1.material.side = DoubleSide;
    if(first == true){
        return (cube);
    }
    else if(first == false){
        return (cube2);
    }
    else if(first == 'floor'){
        return (plane)
    }
    else if(first == 'wall1'){
        return(wall1)
    }
}
export{createCube};