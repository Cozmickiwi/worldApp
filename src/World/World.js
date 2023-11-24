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
let box;
let enemyCollision = false;
let shotSound = new Audio('/src/World/components/assets/gunsound2.mp3')
let personPos;
let personDmg = 0;
//let canvas = document.querySelector('canvas');
let gunMaterial = new MeshBasicMaterial({

})
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
        const wall2 = createCube('wall1');
        const wall3 = createCube('wall1');
        const wall4 = createCube('wall1');
        const crossHair = createCube('cross');
        const fire = createCube('fire');
        playerBox = createCube('playerBox');
        box = createCube('box');
        playerBB = createCube('pbb');
        boxBB = createCube('bbb')
        fire.name = 'fireFlash';
        cube.name = 'cube1';
        cube2.name = 'cube2';
        playerBox.name = 'playerBox';
        console.log(playerBB);
        //cube.translateZ(-80);
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
        walls()
        scene.add(cube, cube2, floor, wall1, wall2, wall3, wall4, box, playerBox, light, light3);
        //playerBB = scene.getObjectByName('playerBB')
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
                setInterval(() => {
                    if((person.position.x < (camera.position.x-15) || person.position.x > (camera.position.x+15))
                    ||(person.position.z < (camera.position.z-15)|| person.position.z > (camera.position.z+15))){
                        enemyCollision = false;
                    }
                    else{
                        enemyCollision = true;
                    }
                }, 200);
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
                    shootAction.play();
                    shotSound.load();
                    shotSound.play();
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
            movementStatus = animateMod(scene, camera, controls, playerBB, boxBB);
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