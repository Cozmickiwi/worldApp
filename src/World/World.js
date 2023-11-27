// Import components
import{createCamera} from './components/camera.js';
import{createCube} from './components/cube.js';
import{createScene} from './components/scene.js';
import{createLights} from './components/lights.js';
import{createOrtho} from './components/cameraOrtho.js'
// Import systems
import{createRenderer} from './systems/renderer.js';
import{Resizer} from './systems/Resizer.js';
import{animateMod} from './systems/animation.js';
import{createControls} from './systems/controls.js';

import {
    GLTFLoader,
} from '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

import{
    Mesh,
    MeshBasicMaterial,
    TextureLoader,
    AnimationMixer,
    Clock,
    LoopOnce,
    LoopRepeat,
    Matrix4,
    Vector3,
    ArrowHelper,
} from '../../node_modules/three/build/three.module.js';

const gltfLoader = new GLTFLoader();
let camera;
let renderer;
let scene;
let controls;
let ortho;
let orthoScene;
let locked = false;
let gunModelLoaded = false;
let mixer;
let mixer2;
let personAction;
let action;
let shootAction;
let walkAction;
let vector = new Vector3;
let runAction;
let fireImg;
let walking = false;
let clock = new Clock();
let clock2 = new Clock();
let shoot = false;
let movementStatus;
let pos;
let person;
let boxPos;
let cube;
let playerBox;
let playerBB;
let boxBB;
let wall1BB;
let wall2BB;
let wall3BB;
let wall4BB;
let cbbarr;
let box;
let enemyCollision = true;
let shotSound = new Audio('/src/World/components/assets/gunsound2.mp3')
let personPos;
let personDmg = 0;
let wbbArr;
let quad = 'xz';
let boxInfo;
let wall1Info;
let wall2Info;
let wall3Info;
let wall4Info;
let objArr = [];
let closestObj;
let arrowLoaded = false;
let dir;
let arrowHelper;
let closestFace;
let wall1_2BB;
//let canvas = document.querySelector('canvas');
let gunMaterial = new MeshBasicMaterial({

})
function objInfo(posX, posZ, xLen, zLen, obj){
    /*
    let xStart = pos-(xLen/2);
    let xEnd = pos+(xLen/2);
    let Zstart = pos-(zLen/2);
    let zEnd = pos+(zLen/2);
    let info = {
        x: [xStart, xEnd],
        z: [Zstart, zEnd],
    };
    */
    let info = {};
    if(obj.ignoreSides == false || (!(obj.ignoreSides).includes('west'))){
        let westStart = [(posX+(xLen/2)), (posZ-(zLen/2))]
        let westEnd = [(posX+(xLen/2)), (posZ+(zLen/2))]
        info.west = [westStart, westEnd]
    }
    if(obj.ignoreSides == false || !(obj.ignoreSides).includes('north')){
        let northStart = [(posX-(xLen/2)), (posZ+(zLen/2))]
        let northEnd = [(posX+(xLen/2)), (posZ+(zLen/2))]
        info.north = [northStart, northEnd]
    }
    if(obj.ignoreSides == false || !(obj.ignoreSides).includes('east')){
        let eastStart = [(posX-(xLen/2)), (posZ-(zLen/2))]
        let eastEnd = [(posX-(xLen/2)), (posZ+(zLen/2))]
        info.east = [eastStart, eastEnd]
    }
    if(obj.ignoreSides == false || !(obj.ignoreSides).includes('south')){
        let southStart = [(posX-(xLen/2)), (posZ-(zLen/2))]
        let soundEnd = [(posX+(xLen/2)), (posZ-(zLen/2))]
        info.south = [southStart, soundEnd]
    }
    /*
    let info = {
        west: [westStart, westEnd],
        north: [northStart, northEnd],
        east: [eastStart, eastEnd],
        south: [southStart, soundEnd],
    }
    */
    return(info);
}
//let orthoCamera;
class World{
    constructor(container){
        camera = createCamera();
        scene = createScene(false);
        orthoScene = createScene(true);
        renderer = createRenderer();
        ortho = createOrtho();
        container.append(renderer.domElement);
        controls = createControls(camera, renderer.domElement);
        let doomButton = document.getElementById('doomControl');
        //controls.current.connect();
        //controls.current.lock();
        doomButton.addEventListener('click', () => {
            if(locked == false){
                controls.lock();
                locked = true;
            }
            else{
                controls.unlock();
                locked = false;
            }
        })
        cube = createCube(true);
        const cube2 = createCube(false);
        const floor = createCube('floor');
        const wall1 = createCube('wall1');
        const wall2 = createCube('wall2');
        const wall3 = createCube('wall3');
        const wall4 = createCube('wall4');
        wall1.name = 'wall1'
        wall2.name = 'wall2'
        wall3.name = 'wall3'
        wall4.name = 'wall4'
        const crossHair = createCube('cross');
        const fire = createCube('fire');
        playerBox = createCube('playerBox');
        box = createCube('box');
        box.name = 'box';
        playerBB = createCube('pbb');
        boxBB = createCube('bbb')
        fire.name = 'fireFlash';
        cube.name = 'cube1';
        cube2.name = 'cube2';
        playerBox.name = 'playerBox';
        console.log(playerBB);
        wbbArr = createCube('wbb');
        cbbarr = createCube('cbb')
        objArr.push(box, wall1, wall2, wall3, wall4);
        /*
        wall1BB = wbbArr[0]
        wall2BB = wbbArr[1]
        wall3BB = wbbArr[2]
        wall4BB = wbbArr[3]
        */
        //wall1_2BB = wbbArr[4];
        //cube.translateZ(-80);
        const buildingArr = createCube('building');
        const light = createLights(false);
        const light2 = createLights(true);
        const light3 = createLights('amb');
        function walls(){
            wall1.position.set(0,0,-300);
            wall2.position.set(0,0,300);
            wall3.position.set(300,0,0);
            wall3.rotation.set(0,(Math.PI)/(360/180),0);
            wall4.position.set(-300,0,0);
            wall4.rotation.set(0,-(Math.PI)/(360/180),0);
            
        }
        //walls()
        //boxInfo = objInfo(box.position.x, box.position.z, 6, 6);
        //wall1Info = objInfo(wall1.position.x, wall1.position.z, 600, 3);
        console.log(wall1Info);
        //console.log(wall1.position.)
        //console.log(boxInfo);
        scene.add(cube, cube2, floor, wall1, wall2, wall3, wall4, box, playerBox, light, light3);
        for(let i=0; i<buildingArr.length; i++){
            scene.add(buildingArr[i]);
            objArr.push(buildingArr[i]);
        }
        cbbarr.push(playerBB);
        //console.log(box.position);
        /*
            wall1BB.copy(wall1.geometry.boundingBox).applyMatrix4(wall1.matrixWorld);
            wall2BB.copy(wall2.geometry.boundingBox).applyMatrix4(wall2.matrixWorld);
            wall3BB.copy(wall3.geometry.boundingBox).applyMatrix4(wall3.matrixWorld);
            wall4BB.copy(wall4.geometry.boundingBox).applyMatrix4(wall4.matrixWorld);
            console.log(wall1.geometry.boundingBox);
            //wall1BB.position.set(0,0,-300)
            console.log(wall1BB);
            */
        //playerBB = scene.getObjectByName('playerBB')
        setInterval(() => {
            /*
            if(camera.position.x >=0 && camera.position.z >=0){
                quad = 'xz';
            }
            else if(camera.position.x <0 && camera.position.z >=0){
                quad = '-xz';
            }
            else if(camera.position.x <0 && camera.position.z <0){
                quad = '-x-z';
            }
            else if(camera.position.x >=0 && camera.position.z <0){
                quad = 'x-z';
            }
            */
            //let origin = new Vector3(camera.position);
            let prevDistance;
            let prevDistance1;
            let arrObj;
            let arrObj1;
            let chosenObj;
            let cam = new Vector3(camera.position.x, camera.position.y, camera.position.z);
            for(let a=0; a<wbbArr.length; a++){
                if(playerBB.intersectsBox(wbbArr[a])){
                    chosenObj = wbbArr[a].object;
                }
            }
            if(chosenObj == undefined){
                for(let i=0; i<objArr.length; i++){
                //let dir = new Vector3(objArr[1].position);
                let objX = objArr[i].position.x;
                let objZ = objArr[i].position.z;
                if(camera.position.z<(objZ+(objArr[i].geometry.parameters.depth/2)) && camera.position.z>(objZ-(objArr[i].geometry.parameters.depth/2))){
                    objZ = camera.position.z;
                }
                if(camera.position.x<(objX+(objArr[i].geometry.parameters.width/2)) && camera.position.x>(objX-(objArr[i].geometry.parameters.width/2))){
                    objX = camera.position.x;
                }
                let obj = new Vector3(objX, objArr[i].position.y, objZ);
                //dir.normalize();
                let distance = cam.distanceTo(obj);
                if(prevDistance == undefined || distance<prevDistance){
                    prevDistance = distance;
                    arrObj = i;
                    chosenObj = objArr[arrObj];
                }
            }
            }
            
            let closestObjSides = objInfo((chosenObj.position.x), (chosenObj.position.z), (chosenObj.geometry.parameters.width), (chosenObj.geometry.parameters.depth), chosenObj);
            for(const directions in closestObjSides){
                let zVal;
                let xVal;
                if(camera.position.z > (((closestObjSides[directions])[0])[1]-1.5) && camera.position.z < (((closestObjSides[directions])[1])[1]+1.5)){
                    zVal = camera.position.z;
                }
                else{
                    zVal = (((((closestObjSides[directions])[0])[1])+(((closestObjSides[directions])[1])[1]))/2);
                }
                if(camera.position.x > (((closestObjSides[directions])[0])[0]-1.5) && camera.position.x < (((closestObjSides[directions])[1])[0]+1.5)){
                    xVal = camera.position.x;
                }
                else{
                    xVal = (((((closestObjSides[directions])[0])[0])+(((closestObjSides[directions])[1])[0]))/2);
                }
                let obj = new Vector3(xVal, 0, zVal);
                //dir.normalize();
                let distance = cam.distanceTo(obj);
                if(prevDistance1 == undefined || distance<prevDistance1){
                    prevDistance1 = distance;
                    arrObj1 = directions;
                }
            }
            closestObj = [chosenObj.name, chosenObj, prevDistance, arrObj1];
            closestFace = arrObj1;
        }, 10);
        /*
            setInterval(() => {
                if(closestObj != undefined){
                    if(arrowLoaded == false){
                        dir = new Vector3(closestObj[1].position.x, closestObj[1].position.y, closestObj[1].position.z);
                        dir.normalize();
                        let origin = new Vector3(camera.position.x, camera.position.y, camera.position.z);
                        arrowHelper = new ArrowHelper(dir, origin, 2);
                        scene.add(arrowHelper);
                        arrowLoaded = true;
                    }
                    else{
                        dir = new Vector3(closestObj[1].position.x, closestObj[1].position.y, closestObj[1].position.z);
                        //dir = new Vector3( 0, 0, -(Math.sqrt(((camera.position.z-(closestObj[1].position.z))**2)+((camera.position.x-(closestObj[1].position.x))**2))) ).applyQuaternion( camera.quaternion ).add( camera.position );
                        dir.normalize();
                        arrowHelper.setDirection(dir);
                    }
                }
            }, 50);*/
        gltfLoader.load(
            //'/src/World/components/assets/ultrakillgun/silahful2.glb',
            '/src/World/components/assets/gunAnim/source/untitled.glb',
            function(gltf){
                //gltf.scene.name = 'gun';
                let gun1 = gltf.scene;
                //console.log(gun1)
                //let gun2 = new Mesh (gun1, MeshBasicMaterial);
                //orthoScene.add(gun2);
                //gun1.scale.set(12,12,38);
                //gun1.position.set(350,700,1)
                gun1.scale.set(-2000,2000,2000);
                gun1.position.set(150,3020,1)
                gun1.name = 'gun';
                const textureLoader = new TextureLoader();
                
                
                //texture.flipY = false;
                
                //gun1.rotation.z = (1)
                //gun1.rotation.X = (1.5)
                gun1.rotation.set(-Math.PI/2,-.1,-0.15)
                gun1.rotation.x = (3.1)
                //gun1.applyMatrix()
                //renderer.render(orthoScene, ortho);
                
                console.log(gltf.animations)
                mixer = new AnimationMixer(gltf.scene);
                const clips = gltf.animations;
                let animationNum = 3;
                action = mixer.clipAction(gltf.animations[3]);
                shootAction = mixer.clipAction(gltf.animations[1]);
                walkAction = mixer.clipAction(gltf.animations[10]);
                //action.play();
                
                document.addEventListener('mousedown', (event) => {
                        if(event.target != document.getElementById('doomControl')){
                            shoot = true;
                        }
                        
                        //shootAction.setLoop(LoopRepeat);
                    
                })
                document.addEventListener('keydown', (event) => {
                    if(event.key == 'Control'){
                        shoot = true;
                    }
                })
                gunModelLoaded = true;
                /*
                function update () {
                    mixer.update( deltaSeconds );
                }
                clips.forEach( function ( clip ) {
                    mixer.clipAction( clip ).play();
                } );
                */
                crossHair.position.set(0,0,-500);
                fire.position.set(480,270,-850);
                fire.scale.set(1.5,1.5,1.5)
                fireImg = fire;
                fire.visible = false;
                
                //fire.scale.set(-100000,-100000,-100000)
                orthoScene.add(gltf.scene, crossHair, fire, light2);

            }
        )
        gltfLoader.load(
            //'/src/World/components/assets/ultrakillgun/silahful2.glb',
            '/src/World/components/assets/gunAnim/source/untitled2222.glb',
            function(gltf){
                
                person = gltf.scene;
                person.scale.set(7,7,7)
                person.position.set(-50,0,-50)
                mixer2 = new AnimationMixer(gltf.scene);
                personAction = mixer2.clipAction(gltf.animations[0]);
                console.log(gltf.animations)
                personAction.timeScale = 1.25;
                scene.add(person);
                /*
                setInterval(() => {
                    if((person.position.x < (camera.position.x-15) || person.position.x > (camera.position.x+15))
                    ||(person.position.z < (camera.position.z-15)|| person.position.z > (camera.position.z+15))){
                        enemyCollision = false;
                    }
                    else{
                        enemyCollision = true;
                    }
                }, 200);*/
            }
        )
        const resizer = new Resizer(container, camera, renderer);
    }
    render(){
        function animate(){
            window.requestAnimationFrame(animate);
            if(gunModelLoaded == true){
                //walkAction.setLoop(LoopRepeat);
                if(shoot == true){
                    pos = new Vector3( 0, 0, -(Math.sqrt((camera.position.z**2)+(camera.position.x**2))) ).applyQuaternion( camera.quaternion ).add( camera.position );
                    boxPos = new Vector3( 0, 0, -(Math.sqrt(((camera.position.z-100)**2)+((camera.position.x-100)**2))) ).applyQuaternion( camera.quaternion ).add( camera.position );
                    //console.log(scene);
                    console.log(boxPos)
                    if((pos.z<(2) && pos.z>(-2))&&(pos.x<(2) && pos.x>(-2))&&(pos.y<12.5&&pos.y>7.5)){
                        cube.visible = false;
                        setTimeout(() => {
                            cube.visible = true;
                        }, 1000);
                    }
                    if((boxPos.z<(103) && boxPos.z>(97))&&(boxPos.x<(103) && boxPos.x>(97)) && (boxPos.y>0 && boxPos.y<=20)){
                        box.visible = false;
                        setTimeout(() => {
                            box.visible = true;
                        }, 1000);
                    }
                    if((personPos.z<(person.position.z+2) && personPos.z>(person.position.z-2))&&(personPos.x<(person.position.x+2) && personPos.x>(person.position.x-2)) && (personPos.y>0 && personPos.y<=20)){
                        //person.visible = false;
                        //console.log(personPos);
                        if(personPos.y > 10.3 && personPos.y < 11.8 && personPos.z<(person.position.z+1) && personPos.z>(person.position.z-1)&&(personPos.x<(person.position.x+1) && personPos.x>(person.position.x-1))){
                            personDmg += 3;
                        }
                        else{
                            personDmg +=1;
                        }
                        if(personDmg >= 3){
                            personDmg = 0;
                            person.position.set((Math.floor(Math.random()*600))-300, 0, (Math.floor(Math.random()*600))-300);
                        }
                        
                    }
                    //console.log(camera.getWorldDirection( ))
                    console.log(playerBB);
                    console.log(closestObj);
                    console.log(closestObj[1].geometry.parameters);
                    shootAction.play();
                    shotSound.load();
                    shotSound.play();
                    console.log(cbbarr)
                    console.log(playerBox)
                    console.log(camera.getWorldDirection(vector))
                    fireImg.visible = true;
                    setTimeout(() => {
                        fireImg.visible = false;
                    }, 50);
                    //console.log(camera)
                    shootAction.setLoop(LoopOnce);
                    shootAction.reset();
                    shoot = false;
                    fireImg.rotation.z = (Math.random()*(Math.PI));
                    console.log(person.position);
                    
                }
                else if(movementStatus == 'walk'){
                    walkAction.play();
                    walkAction.setLoop(LoopRepeat);
                    //walkAction.reset();
                }
                else if(walking == true && movementStatus == 'still'){
                    
                    walkAction.play();
                    walkAction.setLoop(LoopOnce);
                    walkAction.stop();
                    walking = false;
                }
                else{
                    walkAction.play();
                    walkAction.setLoop(LoopOnce);
                    walkAction.stop();
                    walking = false;
                    action.play();
                }
                personAction.play();
                person.lookAt(camera.position.x, camera.position.y, camera.position.z);
                personPos = new Vector3( 0, 0, -(Math.sqrt(((camera.position.z-(person.position.z))**2)+((camera.position.x-(person.position.x))**2))) ).applyQuaternion( camera.quaternion ).add( camera.position );
                //if(person.position.x > camera.position.x+15 || person.position.x < camera.position.x-15 || person.position.z > camera.position.z+15 || person.position.z < camera.position.z-15){
                //    person.translateZ(.3);
                //    person.position.y = 0.1;
                //}
                if(enemyCollision == false){
                    person.translateZ(.3);
                    person.position.y = 0.1;
                }
                //console.log(person.position);
                //action = baseAction;
            }
            movementStatus = animateMod(scene, camera, controls, playerBB, boxBB, wbbArr, quad, closestFace, cbbarr);
            if(gunModelLoaded == true){
                mixer.update(clock.getDelta());
                mixer2.update(clock2.getDelta());
            }
            
            renderer.clear();
            renderer.render(scene, camera);
            renderer.clearDepth();
            renderer.render(orthoScene, ortho);
        }
        renderer.clear();
        renderer.render(scene, camera);
        renderer.clearDepth();
        renderer.render(orthoScene, ortho);
        animate();
    }
}
export{World};