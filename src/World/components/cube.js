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
    Box3Helper,
} from '../../../node_modules/three/build/three.module.js';

import {
    GLTFLoader,
} from '../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

function ignorePositions(object){
    let positions = [];
    if(object.direction == 'wide'){
        let lowPos = (object.position.x-(object.geometry.parameters.width/2));
        let highPos = (object.position.x+(object.geometry.parameters.width/2));
        if(lowPos<0){
            positions[0] = (lowPos+(object.geometry.parameters.depth)+0)//+.25;
        }
        else{
            positions[0] = (lowPos-(object.geometry.parameters.depth)-0)//-.25;
        }
        if(highPos<0){
            positions[1] = (highPos+(object.geometry.parameters.depth)+0)//+.25;
        }
        else{
            positions[1] = (highPos-(object.geometry.parameters.depth)-0)//-.25;
        }
    }
    else if(object.direction == 'long'){
        let lowPos = (object.position.z-(object.geometry.parameters.depth/2));
        let highPos = (object.position.z+(object.geometry.parameters.depth/2));
        if(lowPos<0){
            positions[0] = (lowPos+(object.geometry.parameters.width)+0);
        }
        else{
            positions[0] = (lowPos-(object.geometry.parameters.width)-0);
        }
        if(highPos<0){
            positions[1] = (highPos+(object.geometry.parameters.width)+0);
        }
        else{
            positions[1] = (highPos-(object.geometry.parameters.width)-0);
        }
    }
    return(positions);
}


function createCube(first){
    const geometry = new IcosahedronGeometry(2.5);
    const geometry2 = new TorusGeometry(6.5, .7);
    const geometry3 = new PlaneGeometry(600, 600);
    const geometry4 = new BoxGeometry(600, 100, 3);
    const geometry2a = new BoxGeometry(3, 100, 600);
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
    const wall2 = new Mesh(geometry2a, material4);
    const wall3 = new Mesh(geometry4, material4);
    const wall4 = new Mesh(geometry2a, material4);
    const crossHair = new Mesh(geometry5, material5);
    const fire = new Mesh(geometry5, material6);
    const pBox = new Mesh(playerBox, material7);
    const box = new Mesh(geometry6, material);
    let boxBB = new Box3(new Vector3(), new Vector3());
    let playerBB = new Box3(new Vector3(), new Vector3());
    let wall1BB = new Box3(new Vector3(), new Vector3());
    let wall2BB = new Box3(new Vector3(), new Vector3());
    let wall3BB = new Box3(new Vector3(), new Vector3());
    let wall4BB = new Box3(new Vector3(), new Vector3());
    cube.position.set(0,10,0);
    cube2.position.set(0, 10, 0);
    box.position.set(100,10,100);
    wall1.position.set(0,0,-300);
    wall3.position.set(0,0,300);
    wall2.position.set(300,0,0);
    //wall2.rotation.set(0,(Math.PI)/(360/180),0);
    wall4.position.set(-300,0,0);
    //wall4.rotation.set(0,-(Math.PI)/(360/180),0);
    boxBB.setFromObject(box);
    playerBB.setFromObject(pBox);
    wall1BB.setFromObject(wall1);
    wall2BB.setFromObject(wall2);
    wall3BB.setFromObject(wall3);
    wall4BB.setFromObject(wall4);
    box.ignoreSides = false;
    wall1.ignoreSides = ['east', 'west'];
    wall3.ignoreSides = ['east', 'west'];
    wall2.ignoreSides = ['north', 'south'];
    wall4.ignoreSides = ['north', 'south'];
    wall1BB.direction = 'wide';
    wall2BB.direction = 'long';
    wall3BB.direction = 'wide';
    wall4BB.direction = 'long';
    wall1.direction = 'wide';
    wall2.direction = 'long';
    wall3.direction = 'wide';
    wall4.direction = 'long';
    wall1BB.ignorePositions = ignorePositions(wall1);
    wall2BB.ignorePositions = ignorePositions(wall2);
    wall3BB.ignorePositions = ignorePositions(wall3);
    wall4BB.ignorePositions = ignorePositions(wall4);
    wall1BB.position = wall1.position;
    wall2BB.position = wall2.position;
    wall3BB.position = wall3.position;
    wall4BB.position = wall4.position;
    let wall1and2CornerBB = new Box3(new Vector3(), new Vector3());
    wall1and2CornerBB.setFromCenterAndSize(new Vector3(300, 0, -300), new Vector3(3, 30, 3));
    let wall2and3CornerBB = new Box3(new Vector3(), new Vector3());
    wall2and3CornerBB.setFromCenterAndSize(new Vector3(300, 0, 300), new Vector3(3, 30, 3));
    let wall3and4CornerBB = new Box3(new Vector3(), new Vector3());
    wall3and4CornerBB.setFromCenterAndSize(new Vector3(-300, 0, 300), new Vector3(3, 30, 3));
    let wall4and1CornerBB = new Box3(new Vector3(), new Vector3());
    wall4and1CornerBB.setFromCenterAndSize(new Vector3(-300, 0, -300), new Vector3(3, 30, 3));
    wall1and2CornerBB.placement = ['north', 'east'];
    wall2and3CornerBB.placement = ['east', 'south'];
    wall3and4CornerBB.placement = ['south', 'west'];
    wall4and1CornerBB.placement = ['west', 'north'];
    //let wall1and2CornerBBHelper = new Box3Helper(wall1and2CornerBB);
    //cornerBBCreator(wall1, wall2, wall1and2CornerBB);
    console.log(wall2);
    //wall1BB.translate(0,0,-300);
    //console.log(boxBB);
    console.log(wall3BB);
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
    else if(first == 'wall2'){
        return(wall2)
    }
    else if(first == 'wall3'){
        return(wall3)
    }
    else if(first == 'wall4'){
        return(wall4)
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
    else if(first == 'wbb'){
        return([wall1BB, wall2BB, wall3BB, wall4BB])
    }
    else if(first == 'cbb'){
        return([wall1and2CornerBB, wall2and3CornerBB, wall3and4CornerBB, wall4and1CornerBB]);
    }
}
export{createCube};