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

let wbbArr = [];

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

function building(){
    let arr = [];
    const wallMaterial = new MeshStandardMaterial({
        color: 'LightSteelBlue',
        //wireframe: true,
        //roughness: 0.1,
        //map: wallTexture,
    });
    function entranceHall(){
        const southWall = new BoxGeometry(7, 50, 3);
        const sideWall = new BoxGeometry(3, 50, 60);
        const entSouthWall1 = new Mesh(southWall, wallMaterial);
        entSouthWall1.position.set(-8, 0, -30);
        const entSouthWall2 = new Mesh(southWall, wallMaterial);
        entSouthWall2.position.set(8, 0, -30);
        const entSideWall1 = new Mesh(sideWall, wallMaterial);
        entSideWall1.position.set(-10, 0, -61.5);
        const entSideWall2 = new Mesh(sideWall, wallMaterial);
        entSideWall2.position.set(10, 0, -61.5);
        entSouthWall1.ignoreSides = ['east'];
        entSouthWall2.ignoreSides = ['west'];
        entSideWall1.ignoreSides = ['north', 'south'];
        entSideWall2.ignoreSides = ['north', 'south'];
        arr.push(entSouthWall1, entSouthWall2, entSideWall1, entSideWall2);
    }
    entranceHall();
    function room1(){
        const southWall = new BoxGeometry(50, 50, 3);
        const northWall = new BoxGeometry(120, 50, 3)
        const sideWall = new BoxGeometry(3, 50, 35);
        const rm1SouthWall1 = new Mesh(southWall, wallMaterial);
        const rm1SouthWall2 = new Mesh(southWall, wallMaterial);
        rm1SouthWall1.position.set(-35, 0, -90);
        rm1SouthWall2.position.set(35, 0, -90);
        rm1SouthWall1.ignoreSides = ['east'];
        rm1SouthWall2.ignoreSides = ['west'];
        const rm1SideWall1 = new Mesh(sideWall, wallMaterial);
        const rm1SideWall2 = new Mesh(sideWall, wallMaterial);
        const rm1SideWall3 = new Mesh(sideWall, wallMaterial);
        const rm1SideWall4 = new Mesh(sideWall, wallMaterial);
        rm1SideWall1.position.set(-60, 0, -107.5);
        rm1SideWall2.position.set(-60, 0, -152.5);
        rm1SideWall3.position.set(60, 0, -107.5);
        rm1SideWall4.position.set(60, 0, -152.5);
        rm1SideWall1.ignoreSides = ['south'];
        rm1SideWall2.ignoreSides = ['north'];
        rm1SideWall3.ignoreSides = ['south'];
        rm1SideWall4.ignoreSides = ['north'];
        const rm1NorthWall = new Mesh(northWall, wallMaterial);
        rm1NorthWall.position.set(0, 0, -170);
        rm1NorthWall.ignoreSides = ['east', 'west'];
        arr.push(rm1SouthWall1, rm1SouthWall2, rm1SideWall1, rm1SideWall2, rm1SideWall3, rm1SideWall4, rm1NorthWall);
    }
    room1();
    function westernHall(){
        const eastWall = new BoxGeometry(3, 50, 60);
        const northWall = new BoxGeometry(60, 50, 3);
        const southWall = new BoxGeometry(80, 50, 3);
        const westWall = new BoxGeometry(3, 50, 100);
        const wHSouthWall1 = new Mesh(southWall, wallMaterial);
        const wHSouthWall2 = new Mesh(northWall, wallMaterial);
        wHSouthWall1.position.set(-100, 0, -120);
        wHSouthWall2.position.set(-90, 0, -200);
        wHSouthWall1.ignoreSides = ['east', 'west'];
        wHSouthWall2.ignoreSides = ['east', 'west'];
        const wHEastWall = new Mesh(eastWall, wallMaterial);
        wHEastWall.position.set(-120, 0, -170);
        wHEastWall.ignoreSides = ['north', 'south'];
        const wHNorthWall = new Mesh(northWall, wallMaterial);
        wHNorthWall.position.set(-90, 0, -140);
        wHNorthWall.ignoreSides = ['east', 'west'];
        const wHWestWall = new Mesh(westWall, wallMaterial);
        wHWestWall.position.set(-140, 0, -170);
        wHWestWall.ignoreSides = ['north', 'south'];
        arr.push(wHNorthWall, wHEastWall, wHSouthWall1, wHSouthWall2, wHWestWall);
    }
    westernHall();
    function nWRoom(){
        const westWall = new BoxGeometry(3, 50, 60);
        const southWall1 = new BoxGeometry(85, 50, 3);
        const southWall2 = new BoxGeometry(25, 50, 3);
        const nWRWestWall = new Mesh(westWall, wallMaterial);
        nWRWestWall.position.set(-180, 0, -250);
        nWRWestWall.ignoreSides = ['north', 'south'];
        const nWRSouthWall1 = new Mesh(southWall1, wallMaterial);
        const nWRSouthWall2 = new Mesh(southWall2, wallMaterial);
        nWRSouthWall1.ignoreSides = ['west'];
        nWRSouthWall2.ignoreSides = ['east'];
        nWRSouthWall1.position.set(-137.5, 0, -220);
        nWRSouthWall2.position.set(-72.5, 0, -220);
        arr.push(nWRSouthWall1, nWRSouthWall2, nWRWestWall);
    }
    nWRoom();
    function nRoom(){
        const westWall1 = new BoxGeometry(3, 50, 20);
        const westWall2 = new BoxGeometry(3, 50, 35);
        const westWall3 = new BoxGeometry(3, 50, 25);
        const northWall = new BoxGeometry(430, 50, 3);
        const eastWall1 = new BoxGeometry(3, 50, 15);
        const eastWall2 = new BoxGeometry(3, 50, 85);
        const nRWestWall1 = new Mesh(westWall1, wallMaterial);
        const nRWestWall2 = new Mesh(westWall2, wallMaterial);
        const nRWestWall3 = new Mesh(westWall3, wallMaterial);
        nRWestWall1.position.set(-60, 0, -270);
        nRWestWall2.position.set(-60, 0, -232.5);
        nRWestWall3.position.set(-60 , 0, -192.5);
        nRWestWall1.ignoreSides = ['north'];
        nRWestWall2.ignoreSides = false;
        nRWestWall3.ignoreSides = false;
        const nRNorthWall = new Mesh(northWall, wallMaterial);
        nRNorthWall.position.set(35, 0, -280);
        nRNorthWall.ignoreSides = ['east', 'west'];
        const nREastWall1 = new Mesh(eastWall1, wallMaterial);
        const nREastWall2 = new Mesh(eastWall2, wallMaterial);
        nREastWall1.position.set(60 , 0, -272.5);
        nREastWall2.position.set(60 , 0, -212.5);
        nREastWall1.ignoreSides = ['north'];
        nREastWall2.ignoreSides = ['south'];
        arr.push(nREastWall1, nREastWall2, nRNorthWall, nRWestWall1, nRWestWall2, nRWestWall3);
    }
    nRoom();
    function nERoom(){
        const eastWall = new BoxGeometry(3, 50, 60);
        const southWall1 = new BoxGeometry(70, 50, 3);
        const southWall2 = new BoxGeometry(110, 50, 3);
        const nEEastWall = new Mesh(eastWall, wallMaterial);
        nEEastWall.position.set(250, 0, -250);
        nEEastWall.ignoreSides = ['north', 'south'];
        const nESouthWall1 = new Mesh(southWall1, wallMaterial);
        const nESouthWall2 = new Mesh(southWall2, wallMaterial);
        nESouthWall1.position.set(95, 0, -220);
        nESouthWall2.position.set(195, 0, -220);
        nESouthWall1.ignoreSides = ['west'];
        nESouthWall2.ignoreSides = ['east'];
        arr.push(nEEastWall, nESouthWall1, nESouthWall2);
    }
    nERoom();
    function eRoom(){
        const westWall = new BoxGeometry(3, 50, 40);
        const southWall = new BoxGeometry(150, 50, 3);
        const eastWall = new BoxGeometry(3, 50, 170);
        const eWestWall = new Mesh(westWall, wallMaterial);
        eWestWall.position.set(60, 0, -70);
        eWestWall.ignoreSides = ['south'];
        const eSouthWall = new Mesh(southWall, wallMaterial);
        eSouthWall.position.set(135, 0, -50);
        eSouthWall.ignoreSides = ['east', 'west'];
        const eEastWall = new Mesh(eastWall, wallMaterial);
        eEastWall.position.set(210, 0, -135);
        eEastWall.ignoreSides = ['north', 'south'];
        arr.push(eEastWall, eSouthWall, eWestWall);
    }
    eRoom();
    for(let i=0; i<arr.length; i++){
        let wbb = new Box3(new Vector3(), new Vector3());
        wbb.setFromObject(arr[i]);
        if(arr[i].geometry.parameters.width>=arr[i].geometry.parameters.depth){
            wbb.direction = 'wide';
        }
        else{
            wbb.direction = 'long';
        }
        wbb.ignorePositions = ignorePositions(arr[i]);
        wbb.position = arr[i].position;
        wbbArr.push(wbb);
    }
    return(arr);
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
        wbbArr.push(wall1BB, wall2BB, wall3BB, wall4BB)
        return(wbbArr);
    }
    else if(first == 'cbb'){
        return([wall1and2CornerBB, wall2and3CornerBB, wall3and4CornerBB, wall4and1CornerBB]);
    }
    else if(first == 'building'){
        return(building());
    }
}
export{createCube};