import {
    IcosahedronGeometry, 
    TorusGeometry, 
    PlaneGeometry,
    BoxGeometry,
    Mesh, 
    MeshStandardMaterial, 
    MeshToonMaterial,
    TextureLoader,
    DoubleSide,
    RepeatWrapping,
    MeshBasicMaterial,
    Box3,
    Vector3,
} from '../../../node_modules/three/build/three.module.js';

import {
    GLTFLoader,
} from '../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

function createCube(first){
    const geometry = new IcosahedronGeometry(2.5);
    const geometry2 = new TorusGeometry(6.5, .7);
    const geometry3 = new PlaneGeometry(600, 600, 100, 100);
    const geometry4 = new PlaneGeometry(600, 100);
    const geometry5 = new PlaneGeometry(120,120);
    const geometry6 = new BoxGeometry(6, 20, 6);
    const playerBox = new BoxGeometry(6, 10, 6);
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
    const crossTexture = textureLoader.load(
        '/src/World/components/assets/crosshair.png'
    )
    const fireTexture = textureLoader.load(
        '/src/World/components/assets/fire1.png'
    )
    wallTexture.wrapS = RepeatWrapping;
    wallTexture.wrapT = RepeatWrapping;
    wallTexture.repeat.set(12,2)
    floorTexture.wrapS = RepeatWrapping;
    floorTexture.wrapT = RepeatWrapping;
    floorTexture.repeat.set(20,20)
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(1,4)
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
    const material5 = new MeshStandardMaterial({
        map: crossTexture,
        //color:'white',
    })
    const material6 = new MeshBasicMaterial({
        map: fireTexture,
        
    })
    const material7 = new MeshStandardMaterial();
    const toon = new MeshToonMaterial({
        color: 'blue',
        
    })
    const cube = new Mesh(geometry, material);
    const cube2 = new Mesh(geometry2, material2);
    const plane = new Mesh(geometry3, material3);
    const wall1 = new Mesh(geometry4, material4);
    const crossHair = new Mesh(geometry5, material5);
    const fire = new Mesh(geometry5, material6);
    const pBox = new Mesh(playerBox, material7);
    const box = new Mesh(geometry6, material);
    let boxBB = new Box3(new Vector3(), new Vector3());
    let playerBB = new Box3(new Vector3(), new Vector3());
    cube.position.set(0,10,0);
    
    cube2.position.set(0, 10, 0);
    box.position.set(100,10,100);
    boxBB.setFromObject(box);
    playerBB.setFromObject(pBox);
    //console.log(boxBB);
    console.log(playerBB);
    //cube2.rotation.y = 2.4;
    plane.rotation.x = ((Math.PI*2)/(360/90));
    //plane.position.set(0, -10, 0)
    plane.material.side = DoubleSide;
    wall1.material.side = DoubleSide;
    crossHair.material.side = DoubleSide;
    crossHair.material.transparent = true;
    fire.material.side = DoubleSide;
    fire.material.transparent = true;
    fire.material.opacity = 0.5;
    //pBox.material.side = DoubleSide;
    pBox.material.visible = false;
    playerBB.name = 'playerBB'
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
    else if(first == 'cross'){
        return(crossHair)
    }
    else if(first == 'fire'){
        return(fire)
    }
    else if(first == 'box'){
        return(box)
    }
    else if(first == 'playerBox'){
        return(pBox)
    }
    else if(first == 'bbb'){
        return(boxBB)
    }
    else if(first == 'pbb'){
        return(playerBB)
    }
}
export{createCube};