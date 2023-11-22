import { Clock } from "../../../node_modules/three/build/three.module.js";

const list = [];
let cube;
let cube2;
let cameraMod;
let listCont = false;
const clock = new Clock();

function objectNames(scene, camera){
    cube = scene.getObjectByName('cube1');
    cube2 = scene.getObjectByName('cube2');
    cameraMod = camera;
}
function shape1(timeScale){
    cube.rotation.x += (0.02 * timeScale);
    cube.rotation.y += (0.015 * timeScale);
    cube.rotation.z += (0.01 * timeScale);
}
function shape2(timeScale){
    cube2.rotation.z += (0.007 * timeScale);
}
function cameraAnim(timeScale){
    cameraMod.rotation.z += (0.01 * timeScale);
}
export function animateMod(scene, camera){
    const delta = clock.getDelta();
    objectNames(scene, camera);
    if(listCont == false){
        list.push(shape1);
        list.push(shape2);
        list.push(cameraAnim);
        listCont = true;
    }
    for(let i=0; i<list.length; i++){
        (list[i])((delta-(1/144))+1);
    }
}