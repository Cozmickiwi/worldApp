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
let action;
let shootAction;
let walkAction;
let runAction;
let walking = false;
let clock = new Clock();
let shoot = false;
let movementStatus;
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
        const cube = createCube(true);
        const cube2 = createCube(false);
        const floor = createCube('floor');
        const wall1 = createCube('wall1');
        const wall2 = createCube('wall1');
        const wall3 = createCube('wall1');
        const wall4 = createCube('wall1');
        const crossHair = createCube('cross');
        cube.name = 'cube1';
        cube2.name = 'cube2';
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
        scene.add(cube, cube2, floor, wall1, wall2, wall3, wall4, light, light3);
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
                const texture = textureLoader.load(
                    '/src/World/components/assets/ultrakillgun/textures/gltf_embedded_0.png',
                );
                
                
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
                crossHair.position.set(0,0,-500)
                orthoScene.add(gltf.scene, crossHair, light2);

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
                    shootAction.play();
                    shootAction.setLoop(LoopOnce);
                    shootAction.reset();
                    shoot = false;
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
                
                mixer.update(clock.getDelta());
                //action = baseAction;
            }
            movementStatus = animateMod(scene, camera, controls);
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