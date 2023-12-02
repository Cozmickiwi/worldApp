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
    ShapeGeometry,
    Group,
    Vector2,
    CubeTextureLoader,
    LinearMipMapLinearFilter,
    NearestFilter,
    LinearMipMapNearestFilter,
    MeshLambertMaterial,
    NearestMipMapLinearFilter,

} from '../../../node_modules/three/build/three.module.js';


import {
    SVGLoader
} from '../../../node_modules/three/examples/jsm/loaders/SVGLoader.js'

import {
    GLTFLoader,
} from '../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

import{createScene} from '../components/scene.js'

import{
    objArr,
    cornerPositons
} from '../systems/pixelArtConvert.js'



let scene = new createScene(false);
let wbbArr = [];
let cbbArr = [];
let iteration = 0;
let pixelMeshes = [];
let wbbArr2 = [];
let pixelMeshArr = [];
let doorBBArr = [];

const ceilingTexture1 = new TextureLoader().load(
        'src/World/components/assets/43419803ee9ecad5c8ce7c0ae409796dafec3bb1.png'
)
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

function setTextureRepeat(x, y){
    let doomTexture1 = new TextureLoader().load('/src/World/components/assets/0mclwsft47f8.png');
    let repeatX = x;
    let repeatY = y;
    doomTexture1.wrapS = RepeatWrapping;
    doomTexture1.wrapT = RepeatWrapping;
    doomTexture1.repeat.set(repeatX, repeatY);
    return(new MeshStandardMaterial({map: doomTexture1,}));
}

function building(){
    let arr = [];
    //let doomTexture1 = new TextureLoader().load('/src/World/components/assets/0mclwsft47f8.png')
    const wallMaterial = new MeshStandardMaterial({
        //color: 'LightSteelBlue',
        //wireframe: true,
        //roughness: 0.1,
        //map: wallTexture,
        //map: doomTexture1,
    });
    function entranceHall(){
        const southWall = new BoxGeometry(7, 50, 3);
        const sideWall = new BoxGeometry(3, 50, 60);
        const entSouthWall1 = new Mesh(southWall, setTextureRepeat(.7, 5));
        entSouthWall1.position.set(-8, 0, -30);
        const entSouthWall2 = new Mesh(southWall, setTextureRepeat(.7, 5));
        entSouthWall2.position.set(8, 0, -30);
        const entSideWall1 = new Mesh(sideWall, setTextureRepeat(6, 5));
        entSideWall1.position.set(-10, 0, -61.5);
        const entSideWall2 = new Mesh(sideWall, setTextureRepeat(6, 5));
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
        const rm1SouthWall1 = new Mesh(southWall, setTextureRepeat(5, 5));
        const rm1SouthWall2 = new Mesh(southWall, setTextureRepeat(5, 5));
        rm1SouthWall1.position.set(-35, 0, -90);
        rm1SouthWall2.position.set(35, 0, -90);
        rm1SouthWall1.ignoreSides = ['east', 'west'];
        rm1SouthWall2.ignoreSides = ['east', 'west'];
        const rm1SideWall1 = new Mesh(sideWall, setTextureRepeat(3.5, 5));
        const rm1SideWall2 = new Mesh(sideWall, setTextureRepeat(3.5, 5));
        const rm1SideWall3 = new Mesh(sideWall, setTextureRepeat(3.5, 5));
        const rm1SideWall4 = new Mesh(sideWall, setTextureRepeat(3.5, 5));
        rm1SideWall1.position.set(-60, 0, -107.5);
        rm1SideWall2.position.set(-60, 0, -152.5);
        rm1SideWall3.position.set(60, 0, -107.5);
        rm1SideWall4.position.set(60, 0, -152.5);
        rm1SideWall1.ignoreSides = ['north'];
        rm1SideWall2.ignoreSides = ['south'];
        rm1SideWall3.ignoreSides = ['north'];
        rm1SideWall4.ignoreSides = ['south'];
        const rm1NorthWall = new Mesh(northWall, setTextureRepeat(12, 5));
        rm1NorthWall.position.set(0, 0, -170);
        rm1NorthWall.ignoreSides = ['east', 'west'];
        let room1NEBB = new Box3(new Vector3(), new Vector3());
        room1NEBB.setFromCenterAndSize(new Vector3(59, 0, -169), new Vector3(1, 30, 1));
        room1NEBB.placement = ['north', 'east'];
        let room1ESBB = new Box3(new Vector3(), new Vector3());
        room1ESBB.setFromCenterAndSize(new Vector3(59, 0, -91), new Vector3(1, 30, 1));
        room1ESBB.placement = ['east', 'south'];
        let room1SWBB = new Box3(new Vector3(), new Vector3());
        room1SWBB.setFromCenterAndSize(new Vector3(-59, 0, -91), new Vector3(1, 30, 1));
        room1SWBB.placement = ['south', 'west'];
        let room1WNBB = new Box3(new Vector3(), new Vector3());
        room1WNBB.setFromCenterAndSize(new Vector3(-59, 0, -169), new Vector3(1, 30, 1));
        room1WNBB.placement = ['west', 'north'];
        cbbArr.push(room1NEBB, room1ESBB, room1SWBB, room1WNBB);
        arr.push(rm1SouthWall1, rm1SouthWall2, rm1SideWall1, rm1SideWall2, rm1SideWall3, rm1SideWall4, rm1NorthWall);
    }
    room1();
    function westernHall(){
        const eastWall = new BoxGeometry(3, 50, 60);
        const northWall = new BoxGeometry(60, 50, 3);
        const southWall = new BoxGeometry(80, 50, 3);
        const westWall = new BoxGeometry(3, 50, 100);
        const wHSouthWall1 = new Mesh(southWall, setTextureRepeat(8, 5));
        const wHSouthWall2 = new Mesh(northWall, setTextureRepeat(6, 5));
        wHSouthWall1.position.set(-100, 0, -120);
        wHSouthWall2.position.set(-90, 0, -200);
        wHSouthWall1.ignoreSides = ['east', 'west'];
        wHSouthWall2.ignoreSides = ['east', 'west'];
        const wHEastWall = new Mesh(eastWall, setTextureRepeat(6, 5));
        wHEastWall.position.set(-120, 0, -170);
        wHEastWall.ignoreSides = ['north', 'south'];
        const wHNorthWall = new Mesh(northWall, setTextureRepeat(6, 5));
        wHNorthWall.position.set(-90, 0, -140);
        wHNorthWall.ignoreSides = ['east', 'west'];
        const wHWestWall = new Mesh(westWall, setTextureRepeat(10, 5));
        wHWestWall.position.set(-140, 0, -170);
        wHWestWall.ignoreSides = ['north', 'south'];
        let wHNEBB1 = new Box3(new Vector3(), new Vector3());
        wHNEBB1.setFromCenterAndSize(new Vector3(-61.5, 0, -139), new Vector3(3, 30, 4.75));
        wHNEBB1.placement = ['north', 'east'];
        let wHNEBB2 = new Box3(new Vector3(), new Vector3());
        wHNEBB2.setFromCenterAndSize(new Vector3(-61.5, 0, -219), new Vector3(3, 30, 4.75));
        wHNEBB2.placement = ['north', 'east'];
        let wHESBB1 = new Box3(new Vector3(), new Vector3());
        wHESBB1.setFromCenterAndSize(new Vector3(-61.5, 0, -121), new Vector3(3, 30, 4.75));
        wHESBB1.placement = ['east', 'south'];
        let wHESBB2 = new Box3(new Vector3(), new Vector3());
        wHESBB2.setFromCenterAndSize(new Vector3(-61.5, 0, -201), new Vector3(3, 30, 4.75));
        wHESBB2.placement = ['east', 'south'];
        let wHWNBB = new Box3(new Vector3(), new Vector3());
        wHWNBB.setFromCenterAndSize(new Vector3(-139, 0, -219), new Vector3(1, 30, 1));
        wHWNBB.placement = ['west', 'north'];
        let wHSWBB = new Box3(new Vector3(), new Vector3());
        wHSWBB.setFromCenterAndSize(new Vector3(-139, 0, -121), new Vector3(1, 30, 1));
        wHSWBB.placement = ['south', 'west'];
        cbbArr.push(wHESBB1, wHESBB2, wHNEBB1, wHNEBB2, wHSWBB, wHWNBB)
        arr.push(wHNorthWall, wHEastWall, wHSouthWall1, wHSouthWall2, wHWestWall);
    }
    westernHall();
    function nWRoom(){
        const westWall = new BoxGeometry(3, 50, 60);
        const southWall1 = new BoxGeometry(85, 50, 3);
        const southWall2 = new BoxGeometry(25, 50, 3);
        const nWRWestWall = new Mesh(westWall, setTextureRepeat(6, 5));
        nWRWestWall.position.set(-180, 0, -250);
        nWRWestWall.ignoreSides = ['north', 'south'];
        const nWRSouthWall1 = new Mesh(southWall1, setTextureRepeat(8.5, 5));
        const nWRSouthWall2 = new Mesh(southWall2, setTextureRepeat(2.5, 5));
        nWRSouthWall1.ignoreSides = ['east'];
        nWRSouthWall2.ignoreSides = ['west'];
        nWRSouthWall1.position.set(-137.5, 0, -220);
        nWRSouthWall2.position.set(-72.5, 0, -220);
        let nWRNEBB = new Box3(new Vector3(), new Vector3());
        nWRNEBB.setFromCenterAndSize(new Vector3(-61, 0, -279), new Vector3(1, 30, 1));
        nWRNEBB.placement = ['north', 'east'];
        let nWRESBB = new Box3(new Vector3(), new Vector3());
        nWRESBB.setFromCenterAndSize(new Vector3(-61, 0, -221), new Vector3(1, 30, 1));
        nWRESBB.placement = ['east', 'south'];
        let nWRSWBB = new Box3(new Vector3(), new Vector3());
        nWRSWBB.setFromCenterAndSize(new Vector3(-179, 0, -221), new Vector3(1, 30, 1));
        nWRSWBB.placement = ['south', 'west'];
        let nWRWNBB = new Box3(new Vector3(), new Vector3());
        nWRWNBB.setFromCenterAndSize(new Vector3(-179, 0, -279), new Vector3(1, 30, 1));
        nWRWNBB.placement = ['west', 'north'];
        cbbArr.push(nWRESBB, nWRNEBB, nWRSWBB, nWRWNBB)
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
        const nRWestWall1 = new Mesh(westWall1, setTextureRepeat(2, 5));
        const nRWestWall2 = new Mesh(westWall2, setTextureRepeat(3.5, 5));
        const nRWestWall3 = new Mesh(westWall3, setTextureRepeat(2.5, 5));
        nRWestWall1.position.set(-60, 0, -270);
        nRWestWall2.position.set(-60, 0, -232.5);
        nRWestWall3.position.set(-60 , 0, -192.5);
        nRWestWall1.ignoreSides = ['south'];
        nRWestWall2.ignoreSides = [false];
        nRWestWall3.ignoreSides = false;
        const nRNorthWall = new Mesh(northWall, setTextureRepeat(43, 5));
        nRNorthWall.position.set(35, 0, -280);
        nRNorthWall.ignoreSides = ['east', 'west'];
        const nREastWall1 = new Mesh(eastWall1, setTextureRepeat(1.5, 5));
        const nREastWall2 = new Mesh(eastWall2, setTextureRepeat(8.5, 5));
        nREastWall1.position.set(60 , 0, -272.5);
        nREastWall2.position.set(60 , 0, -212.5);
        nREastWall1.ignoreSides = ['south'];
        nREastWall2.ignoreSides = ['north'];
        let nRNEBB = new Box3(new Vector3(), new Vector3());
        nRNEBB.setFromCenterAndSize(new Vector3(59, 0, -279), new Vector3(1, 30, 1));
        nRNEBB.placement = ['north', 'east'];
        let nRESBB = new Box3(new Vector3(), new Vector3());
        nRESBB.setFromCenterAndSize(new Vector3(59, 0, -171), new Vector3(1, 30, 1));
        nRESBB.placement = ['east', 'south'];
        let nRWNBB = new Box3(new Vector3(), new Vector3());
        nRWNBB.setFromCenterAndSize(new Vector3(-59, 0, -279), new Vector3(1, 30, 1));
        nRWNBB.placement = ['west', 'north'];
        let nWRNEBB1 = new Box3(new Vector3(), new Vector3());
        nWRNEBB1.setFromCenterAndSize(new Vector3(-61, 0, -199), new Vector3(1, 30, 1));
        nWRNEBB1.placement = ['north', 'east'];
        let nWRESBB1 = new Box3(new Vector3(), new Vector3());
        nWRESBB1.setFromCenterAndSize(new Vector3(-61, 0, -141), new Vector3(1, 30, 1));
        nWRESBB1.placement = ['east', 'south'];
        let nWRSWBB1 = new Box3(new Vector3(), new Vector3());
        nWRSWBB1.setFromCenterAndSize(new Vector3(-119, 0, -141), new Vector3(1, 30, 1));
        nWRSWBB1.placement = ['south', 'west'];
        let nWRWNBB1 = new Box3(new Vector3(), new Vector3());
        nWRWNBB1.setFromCenterAndSize(new Vector3(-119, 0, -199), new Vector3(1, 30, 1));
        nWRWNBB1.placement = ['west', 'north'];
        cbbArr.push(nRESBB, nRNEBB, nRWNBB, nWRESBB1, nWRNEBB1, nWRSWBB1, nWRWNBB1);
        arr.push(nREastWall1, nREastWall2, nRNorthWall, nRWestWall1, nRWestWall2, nRWestWall3);
    }
    nRoom();
    function nERoom(){
        const eastWall = new BoxGeometry(3, 50, 60);
        const southWall1 = new BoxGeometry(70, 50, 3);
        const southWall2 = new BoxGeometry(110, 50, 3);
        const nEEastWall = new Mesh(eastWall, setTextureRepeat(6, 5));
        nEEastWall.position.set(250, 0, -250);
        nEEastWall.ignoreSides = ['north', 'south'];
        const nESouthWall1 = new Mesh(southWall1, setTextureRepeat(7, 5));
        const nESouthWall2 = new Mesh(southWall2, setTextureRepeat(11, 5));
        nESouthWall1.position.set(95, 0, -220);
        nESouthWall2.position.set(195, 0, -220);
        nESouthWall1.ignoreSides = ['east'];
        nESouthWall2.ignoreSides = ['west'];
        let neRNEBB = new Box3(new Vector3(), new Vector3());
        neRNEBB.setFromCenterAndSize(new Vector3(249, 0, -279), new Vector3(1, 30, 1));
        neRNEBB.placement = ['north', 'east'];
        let neRESBB = new Box3(new Vector3(), new Vector3());
        neRESBB.setFromCenterAndSize(new Vector3(249, 0, -221), new Vector3(1, 30, 1));
        neRESBB.placement = ['east', 'south'];
        let neRSWBB = new Box3(new Vector3(), new Vector3());
        neRSWBB.setFromCenterAndSize(new Vector3(61, 0, -221), new Vector3(1, 30, 1));
        neRSWBB.placement = ['south', 'west'];
        let neRWNBB = new Box3(new Vector3(), new Vector3());
        neRWNBB.setFromCenterAndSize(new Vector3(61, 0, -279), new Vector3(1, 30, 1));
        neRWNBB.placement = ['west', 'north'];
        cbbArr.push(neRESBB, neRNEBB, neRSWBB, neRWNBB);
        arr.push(nEEastWall, nESouthWall1, nESouthWall2);
    }
    nERoom();
    function eRoom(){
        const westWall = new BoxGeometry(3, 50, 40);
        const southWall = new BoxGeometry(150, 50, 3);
        const eastWall = new BoxGeometry(3, 50, 170);
        const eWestWall = new Mesh(westWall, setTextureRepeat(4, 5));
        eWestWall.position.set(60, 0, -70);
        eWestWall.ignoreSides = ['north', 'south'];
        const eSouthWall = new Mesh(southWall, setTextureRepeat(15, 5));
        eSouthWall.position.set(135, 0, -50);
        eSouthWall.ignoreSides = ['east', 'west'];
        const eEastWall = new Mesh(eastWall, setTextureRepeat(17, 5));
        eEastWall.position.set(210, 0, -135);
        eEastWall.ignoreSides = ['north', 'south'];
        let eRNEBB = new Box3(new Vector3(), new Vector3());
        eRNEBB.setFromCenterAndSize(new Vector3(209, 0, -219), new Vector3(1, 30, 1));
        eRNEBB.placement = ['north', 'east'];
        let eRESBB = new Box3(new Vector3(), new Vector3());
        eRESBB.setFromCenterAndSize(new Vector3(209, 0, -51), new Vector3(1, 30, 1));
        eRESBB.placement = ['east', 'south'];
        let eRSWBB = new Box3(new Vector3(), new Vector3());
        eRSWBB.setFromCenterAndSize(new Vector3(61, 0, -51), new Vector3(1, 30, 1));
        eRSWBB.placement = ['south', 'west'];
        let eRWNBB = new Box3(new Vector3(), new Vector3());
        eRWNBB.setFromCenterAndSize(new Vector3(61, 0, -219), new Vector3(1, 30, 1));
        eRWNBB.placement = ['west', 'north'];
        cbbArr.push(eRESBB, eRNEBB, eRSWBB, eRWNBB);
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
        wbb.object = arr[i];
        wbbArr.push(wbb);
        //setTextureRepeat(arr[i].geometry.parameters, doomTexture1);
    }
    return(arr);
}

function pixelCorners(){
    for(let i=0; i<cornerPositons.length; i++){
        let xLoc;
        let yLoc;
        let location = cornerPositons[i].direction;
        if(location[0] == 'west' && location[1] == 'north'){
            xLoc = (cornerPositons[i].location)[0]-4.5;
            yLoc = (cornerPositons[i].location)[1]-4.5;
        }
        else if(location[0] == 'north' && location[1] == 'east'){
            xLoc = (cornerPositons[i].location)[0]+4.5;
            yLoc = (cornerPositons[i].location)[1]-4.5;
        }
        else if(location[0] == 'east' && location[1] == 'south'){
            xLoc = (cornerPositons[i].location)[0]+4.5;
            yLoc = (cornerPositons[i].location)[1]+4.5;
        }
        else if(location[0] == 'south' && location[1] == 'west'){
            xLoc = (cornerPositons[i].location)[0]-4.5;
            yLoc = (cornerPositons[i].location)[1]+4.5;
        }
        let cBB = new Box3(new Vector3(), new Vector3());
        cBB.setFromCenterAndSize(new Vector3(xLoc, 0, yLoc), new Vector3(3, 30, 3));
        cBB.placement = location;
        cbbArr.push(cBB);
    }
}

let count = 1;

function createCube(first){
    const geometry = new IcosahedronGeometry(2.5);
    const geometry2 = new TorusGeometry(6.5, .7);
    const geometry3 = new PlaneGeometry(1000, 1000);
    const geometry4 = new BoxGeometry(600, 100, 3);
    const geometry2a = new BoxGeometry(3, 100, 600);
    const geometry5 = new PlaneGeometry(120,120);
    const geometry6 = new BoxGeometry(6, 20, 6);
    const playerBox = new BoxGeometry(6, 10, 6);
    const ceiling = new PlaneGeometry(1000, 1000);
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
    
    ceilingTexture1.wrapS = RepeatWrapping;
    ceilingTexture1.wrapT = RepeatWrapping;
    ceilingTexture1.repeat.set(43,43)
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
    const material3 = new MeshBasicMaterial({
        //color: 'grey',
        //wireframe: true,
        //roughness: 1,
        //map: floorTexture,
        color: '#a6a6a6'
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
    const pixelMaterial2 = new MeshStandardMaterial({
        color: 'red',
        
    })
    const ceilingTexture = new MeshBasicMaterial({
        //map: ceilingTexture1,
        color: '#7c7c7c'
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
    const buildingCeiling = new Mesh(ceiling, ceilingTexture);
    let boxBB = new Box3(new Vector3(), new Vector3());
    let playerBB = new Box3(new Vector3(), new Vector3());
    let wall1BB = new Box3(new Vector3(), new Vector3());
    let wall2BB = new Box3(new Vector3(), new Vector3());
    let wall3BB = new Box3(new Vector3(), new Vector3());
    let wall4BB = new Box3(new Vector3(), new Vector3());
    buildingCeiling.position.set(35, 20, -65);
    buildingCeiling.rotation.x = (Math.PI/2)
    //buildingCeiling.visible = false;
    cube.position.set(0,10,0);
    cube2.position.set(0, 10, 0);
    cube.visible = false;
    cube2.visible = false;
    box.position.set(100,10,100);
    wall1.position.set(0,0,-500);
    wall3.position.set(0,0,500);
    wall2.position.set(500,0,0);
    console.log(objArr)
    //wall2.rotation.set(0,(Math.PI)/(360/180),0);
    wall4.position.set(-500,0,0);
    //wall4.rotation.set(0,-(Math.PI)/(360/180),0);
    boxBB.setFromObject(box);
    boxBB.object = box
    playerBB.setFromObject(pBox);
    playerBB.object = pBox
    wall1BB.setFromObject(wall1);
    wall1BB.object = wall1
    wall2BB.setFromObject(wall2);
    wall2BB.object = wall2
    wall3BB.setFromObject(wall3);
    wall3BB.object = wall3
    wall4BB.setFromObject(wall4);
    wall4.object = wall4
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
    wall1.visible = false;
    wall2.visible = false;
    wall3.visible = false;
    wall4.visible = false;
    wall1BB.ignorePositions = ignorePositions(wall1);
    wall2BB.ignorePositions = ignorePositions(wall2);
    wall3BB.ignorePositions = ignorePositions(wall3);
    wall4BB.ignorePositions = ignorePositions(wall4);
    wall1BB.position = wall1.position;
    wall2BB.position = wall2.position;
    wall3BB.position = wall3.position;
    wall4BB.position = wall4.position;
    let wall1and2CornerBB = new Box3(new Vector3(), new Vector3());
    wall1and2CornerBB.setFromCenterAndSize(new Vector3(500, 0, -500), new Vector3(3, 30, 3));
    let wall2and3CornerBB = new Box3(new Vector3(), new Vector3());
    wall2and3CornerBB.setFromCenterAndSize(new Vector3(500, 0, 500), new Vector3(3, 30, 3));
    let wall3and4CornerBB = new Box3(new Vector3(), new Vector3());
    wall3and4CornerBB.setFromCenterAndSize(new Vector3(-500, 0, 500), new Vector3(3, 30, 3));
    let wall4and1CornerBB = new Box3(new Vector3(), new Vector3());
    wall4and1CornerBB.setFromCenterAndSize(new Vector3(-500, 0, -500), new Vector3(3, 30, 3));
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
    //let pixelMeshArr = [];
    pixelMeshArr = []
    let doorPositions = [[10, 240, 'z'], [120, 0, 'z'], [50, 240, 'z'], [50, 190, 'z'], [10, 190, 'z'], [30, 170, 'x'], [30, 50, 'x'], [30, -50, 'x']];
    function addPixelMeshes(){
    wbbArr = [];
    wbbArr2 = [];
    
    
    for(let a=0; a<doorPositions.length; a++){
        let doorGeometry = new BoxGeometry(10, 10, 10);
        let doorTextureGeometry = new PlaneGeometry(10, 10);
        let doorMaterial = new MeshBasicMaterial({
            //color: 'grey',
            //side: DoubleSide,
        })
        let doorTexture = textureLoader.load('/src/World/components/assets/door1.png');
        let doorTextureMaterial = new MeshBasicMaterial({
            side: DoubleSide,
            map: doorTexture,
            color: '#e0e0e0'
        })
        doorTexture.magFilter = NearestFilter;
        doorTexture.minFilter = NearestMipMapLinearFilter;
        let door = new Mesh(doorGeometry, doorMaterial);
        door.visible = false;
        door.position.set((doorPositions[a])[0], 5, (doorPositions[a])[1]);
        let doorInnerTexture = new Mesh(doorTextureGeometry, doorTextureMaterial);
        doorInnerTexture.position.set((doorPositions[a])[0], 4.84, (doorPositions[a])[1]);
        if(a==2){
            //doorInnerTexture.name = 'dooooor';
        }
        if((doorPositions[a])[2] == 'z'){
            doorInnerTexture.rotation.y = Math.PI/2;
        }
        door.ignoreSides = false;
        doorInnerTexture.ignoreSides = false;
        doorInnerTexture.name = `innerDoor${count}`;
        
        let doorBB = new Box3(new Vector3(), new Vector3());
        doorBB.setFromObject(door);
        doorBB.ignorePositions = false;
        doorBB.position = door.position;
        doorBB.object = doorInnerTexture;
        doorBB.objectName = `innerDoor${count}`;
        doorBB.status = 'null';
        console.log(count);
        count++
        if((doorPositions[a])[2] == 'z'){
            doorBB.ignoreSides = ['north', 'south'];
            doorBB.orientation = 'z';
        }
        else{
            doorBB.ignoreSides = ['east', 'west'];
            doorBB.orientation = 'x';
        }
        
        if(pixelMeshArr.length<doorPositions.length*2){
            pixelMeshArr.push(door, doorInnerTexture);
            doorBBArr.push(doorBB);
            wbbArr.push(doorBB);
        }
    }
    for(let i=0; i<objArr.length; i++){
        let doorSideTexture = textureLoader.load('/src/World/components/assets/door1Side.png');
        doorSideTexture.magFilter = NearestFilter;
        doorSideTexture.minFilter = NearestMipMapLinearFilter;
        let width;
        let depth;
        if(objArr[i].direction == 'long'){
            width = 10;
            depth = objArr[i].size;
        }
        else if(objArr[i].direction == 'wide'){
            width = objArr[i].size;
            depth = 10;
        }
        let objGeometry = new BoxGeometry(width, 20, depth);
        let obj;
        let texture = textureLoader.load('/src/World/components/assets/walls1.png');
        texture.magFilter = NearestFilter;
        texture.anisotropy = 1;
        texture.minFilter = NearestMipMapLinearFilter;
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.repeat.set((width/10), 1)
        let texture2 = textureLoader.load('/src/World/components/assets/walls1.png');
        texture2.magFilter = NearestFilter;
        texture2.minFilter = NearestMipMapLinearFilter;
        texture2.wrapS = RepeatWrapping;
        texture2.wrapT = RepeatWrapping;
        texture2.repeat.set((depth/10), 1)
        let color;
        if(objArr[i].direction == 'wide'){
            color = 'blue';
        }
        else{
            color = 'red';
        }
        const pixelMaterial = new MeshBasicMaterial({
            //color: color,
            //map: texture,
            //siz
        })
        
        const pixelMaterial1 = new MeshLambertMaterial({
            //color: color,
            map: texture,
            //siz
        })
        const pixelMaterial2 = new MeshLambertMaterial({
            //color: color,
            map: texture2,
            color: '#e0e0e0'
        })
        const pixelMaterial3 = new MeshBasicMaterial({
            //color: color,
            map: doorSideTexture,
            //siz
        })
        obj = new Mesh(objGeometry, pixelMaterial);
        obj.position.set(objArr[i].objPosition[0], 0, objArr[i].objPosition[1]);
        obj.visible = false;
        obj.ignorePositions = false;
        obj.ignoreSides = false;
        //obj.matrixAutoUpdate = false;
        pixelMeshArr.push(obj);
        let wbb = new Box3(new Vector3(), new Vector3());
        wbb.setFromObject(obj);
        wbb.ignorePositions = false;
        wbb.ignoreSides = false;
        wbb.position = obj.position;
        wbb.object = obj;
        if(objArr[i].direction == 'wide'){
            wbb.orientation = 'wide';
        }
        else{
            wbb.orientation = 'long';
        }
        //wbbArr2.splice(0);
        let wall1_3 = new PlaneGeometry(width, 10);
        let wall2_4 = new PlaneGeometry(depth, 10);
        let wall1Door = false;
        let wall2Door = false;
        let wall3Door = false;
        let wall4Door = false;
        for(let g=0; g<doorPositions.length; g++){
            if((doorPositions[g])[0] == obj.position.x && (doorPositions[g])[1]-5 == wbb.max.z){
                wall1Door = true;
            }
            else if((doorPositions[g])[0] == obj.position.x && (doorPositions[g])[1]+5 == wbb.min.z){
                wall3Door = true;
            }
            else if((doorPositions[g])[1] == obj.position.z && (doorPositions[g])[0]-5 == wbb.max.x){
                wall2Door = true;
            }
            else if((doorPositions[g])[1] == obj.position.z && (doorPositions[g])[0]+5 == wbb.min.x){
                wall4Door = true;
            }
        }
        let wall1;
        let wall3;
        let wall2;
        let wall4;
        if(wall1Door == true){
            wall1 = new Mesh(wall1_3, pixelMaterial3);
        }
        else{
            wall1 = new Mesh(wall1_3, pixelMaterial1);
        }
        if(wall3Door == true){
            wall3 = new Mesh(wall1_3, pixelMaterial3);
        }
        else{
            wall3 = new Mesh(wall1_3, pixelMaterial1);
        }
        if(wall2Door == true){
            wall2 = new Mesh(wall2_4, pixelMaterial3);
        }
        else{
            wall2 = new Mesh(wall2_4, pixelMaterial2);
        }
        if(wall4Door == true){
            wall4 = new Mesh(wall2_4, pixelMaterial3);
        }
        else{
            wall4 = new Mesh(wall2_4, pixelMaterial2);
        }
        wall1.position.set(obj.position.x, 4.85, wbb.max.z);
        wall3.position.set(obj.position.x, 4.85, wbb.min.z);
        wall3.rotation.set(0, Math.PI, 0);
        wall2.rotation.set(0, Math.PI/2, 0);
        wall2.position.set(wbb.max.x, 4.85, obj.position.z);
        wall4.position.set(wbb.min.x, 4.85, obj.position.z);
        wall4.rotation.set(0, Math.PI+(Math.PI/2), 0);
        wbbArr.push(wbb);
        pixelMeshes.push(wbb);
        pixelMeshArr.push(wall1, wall2, wall3, wall4);
    }
    console.log(wbbArr)
}
    console.log(pixelMeshArr);
    console.log(wbbArr)
    console.log(iteration)
    if(first == 'allObjs'){
        pixelMeshArr = []
        wbbArr = []
        addPixelMeshes();
        wbbArr.push(wall1BB, wall2BB, wall3BB, wall4BB) 
        let returnObj = {
            cube: cube,
            cube2: cube2,
            floor: plane,
            wall1: wall1,
            wall2: wall2,
            wall3: wall3,
            wall4: wall4,
            cross: crossHair,
            fire: fire,
            box: box,
            playerBox: pBox,
            bbb: boxBB,
            pbb: playerBB,
            pixel: pixelMeshArr,
            wbb: wbbArr,
            ceiling: buildingCeiling,
            door: doorBBArr,
        }
        return(returnObj);
    }
}
export{createCube};

/*
let pointArr = [];
for(let i=0; i<10000; i++){
    pointArr[i] = 0;
}
let x=0;
let y=1
let arr2 = []
function cornerFinder(){
    for(let a=0; a<pixelMeshes.length; a++){
        for(let b=0; b<pointArr.length; b++){
            x++;
            if(x>100){
                y++;
                x=1;
            }
            let vector = new Vector3((x*10)-320, 0, (y*10)-350);
            if(pixelMeshes[a].containsPoint(vector)){
                arr2.push([x,y]);
                pointArr[b] = 1;
            }
        }
        x=0;
        y=1;
    }
    console.log(arr2);
    console.log(pointArr)
}
//cornerFinder();*/