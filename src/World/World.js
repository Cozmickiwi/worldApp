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
} from '../../node_modules/three/build/three.module.js';

const gltfLoader = new GLTFLoader();
let camera;
let renderer;
let scene;
let controls;
let ortho;
let orthoScene;
let locked = false;
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
        let xP = document.getElementById('x');
        let yP = document.getElementById('y');
        let zP = document.getElementById('z');
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
        window.addEventListener('mousemove', () => {
            //console.log(get)
            xP.textContent = (`x:${camera.position._x}`);
            yP.textContent = (`y:${camera.position._y}`);
            zP.textContent = (`z:${camera.position._z}`);
        })
        window.addEventListener('keydown', () => {
            //controls.moveForward(1);
        })
        const cube = createCube(true);
        const cube2 = createCube(false);
        const floor = createCube('floor');
        cube.name = 'cube1';
        cube2.name = 'cube2';
        //cube.translateZ(-80);
        const light = createLights(false);
        const light2 = createLights(true);
        scene.add(cube, cube2, floor, light);
        gltfLoader.load(
            '/src/World/components/assets/ultrakillgun/silahful2.glb',
            function(gltf){
                //gltf.scene.name = 'gun';
                let gun1 = gltf.scene;
                
                //let gun2 = new Mesh (gun1, MeshBasicMaterial);
                //orthoScene.add(gun2);
                gun1.scale.set(12,12,38);
                gun1.position.set(350,700,1)
                gun1.name = 'gun';
                const textureLoader = new TextureLoader();
                const texture = textureLoader.load(
                    '/src/World/components/assets/ultrakillgun/textures/gltf_embedded_0.png',
                );
                
                
                //texture.flipY = false;
                
                //gun1.rotation.z = (1)
                //gun1.rotation.X = (1.5)
                gun1.rotation.set(-Math.PI/2,-.1,0)
                gun1.rotation.x = (3.1)
                
                //renderer.render(orthoScene, ortho);
                orthoScene.add(gltf.scene, light2);
            }
        )
        
        const resizer = new Resizer(container, camera, renderer);
    }
    render(){
        function animate(){
            window.requestAnimationFrame(animate);
            animateMod(scene, camera, controls);
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