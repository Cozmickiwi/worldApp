import { Clock } from "../../../node_modules/three/build/three.module.js";

const list = [];
let cube;
let cube2;
let cameraMod;
let listCont = false;
let cameraRev = false;
let cameraZStatus = 10;
let shape1XRot;
let shape1YRot;
let shape1ZRot;
let shape2ZRot;
let cameraZMax;
let cameraZMin;
let cameraZMov;
let cameraZRevMov;
let cameraZRot;
const clock = new Clock();

function rad(num){
    return((Math.PI)/(360/num));
}
function settings(){
    (function shape1Settings(){
        shape1XRot = rad(1.15);
        shape1YRot = rad(0.86);
        shape1ZRot = rad(0.6); 
    })();
    (function shape2Settings(){
        shape2ZRot = rad(0.4);
    })();
    (function cameraAnimSettings(){
        cameraZMax = 25;
        cameraZMin = 7;
        cameraZMov = 0.15;
        cameraZRevMov = 0.065;
        cameraZRot = rad(0.6);
    })();
}
function init(scene, camera){
    cube = scene.getObjectByName('cube1');
    cube2 = scene.getObjectByName('cube2');
    cameraMod = camera;
    settings();
}
function shape1(timeScale){
    cube.rotation.x += (shape1XRot * timeScale);
    cube.rotation.y += (shape1YRot * timeScale);
    cube.rotation.z += (shape1ZRot * timeScale);
}
function shape2(timeScale){
    cube2.rotation.z += (shape2ZRot * timeScale);
}
function cameraAnim(timeScale){
    cameraMod.rotation.z += (cameraZRot * timeScale);
    if(cameraRev == false && (cameraZStatus)<cameraZMax){
        cameraMod.position.z += (cameraZMov * timeScale);
        cameraZStatus += (cameraZMov * timeScale);
    }
    else{
        cameraRev = true;
        cameraMod.position.z -= (cameraZRevMov * timeScale);
        cameraZStatus -= (cameraZRevMov * timeScale);
        if((cameraZStatus)<cameraZMin){
            cameraRev = false;
        }
    }
}
export function animateMod(scene, camera){
    const delta = clock.getDelta();
    init(scene, camera);
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