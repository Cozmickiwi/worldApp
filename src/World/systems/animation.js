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
let cameraXRot;
let keyPressed = false;
let controlupd;
let cameraPosX = false;
let cameraPosXRev = false;
let cameraFoward = false;
let currentCamPos = 0;
let rightSensitivity;
let leftSensitivity;
let fowardSpeed;
let backSpeed;
const clock = new Clock();

function rad(num){
    return((Math.PI)/(360/num));
}

window.addEventListener('keydown', (event) => {
    if(event.key == 'a'){
        cameraPosXRev = true;
        cameraPosX = false;
    }
    else if(event.key == 'd'){
        cameraPosX = true;
        cameraPosXRev = false;
    }
    else if(event.key == 'w'){
        cameraFoward = true;
    }
})
window.addEventListener('keyup', (event) => {
    if(event.key == 'a'){
        cameraPosXRev = false;
    }
    else if(event.key == 'd'){
        cameraPosX = false;
    }
    else if(event.key == 'w'){
        cameraFoward = false;
    }
})


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
    (function controlSettings(){
        rightSensitivity = 1;
        leftSensitivity = 1;
        fowardSpeed = 0.6;
        backSpeed = 0.2;
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
    /*
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
    */
    if(cameraPosX == true){
        cameraMod.rotation.y -= (rad(rightSensitivity) * timeScale);
        currentCamPos -= (rightSensitivity * timeScale)/2;
        if(currentCamPos<=-360){
            currentCamPos += 360;
        }
    }
    if(cameraPosXRev == true){
        cameraMod.rotation.y += (rad(leftSensitivity) * timeScale);
        currentCamPos += (leftSensitivity * timeScale)/2;
        if(currentCamPos>=360){
            currentCamPos -= 360;
        }
    }
    if(cameraFoward == true){
        console.log(currentCamPos)
        if(currentCamPos == 0){
            cameraMod.position.z -= (0.2 * timeScale);
        }
        else if(currentCamPos<0 && currentCamPos>-90){
            let direction = (90+currentCamPos)*.01;
            cameraMod.position.z -= ((fowardSpeed*direction) * timeScale);
            cameraMod.position.x += ((fowardSpeed-(fowardSpeed*direction)) * timeScale);
            //console.log((0.2*direction) * timeScale);
            //console.log((0.2-(0.2*direction)) * timeScale);
        }
        else if(currentCamPos>0 && currentCamPos<90){
            let direction = (90-currentCamPos)*.01;
            cameraMod.position.z -= ((fowardSpeed*direction) * timeScale);
            cameraMod.position.x -= ((fowardSpeed-(fowardSpeed*direction)) * timeScale);
            //console.log((0.2*direction) * timeScale);
            //console.log((0.2-(0.2*direction)) * timeScale);
        }
        else if(currentCamPos>90 && currentCamPos<180){
            let direction = (90-currentCamPos)*.01;
            cameraMod.position.z -= ((fowardSpeed*direction) * timeScale);
            cameraMod.position.x -= ((fowardSpeed+(fowardSpeed*direction)) * timeScale);
            //console.log((0.2*direction) * timeScale);
            //console.log((0.2+(0.2*direction)) * timeScale);
        }
        else if(currentCamPos<-90 && currentCamPos>-180){
            let direction = (90+currentCamPos)*.01;
            cameraMod.position.z -= ((fowardSpeed*direction) * timeScale);
            cameraMod.position.x += ((fowardSpeed+(fowardSpeed*direction)) * timeScale);
            //console.log((0.2*direction) * timeScale);
            //console.log((0.2+(0.2*direction)) * timeScale);
        }
        if(currentCamPos <= -180){
            currentCamPos = (180-((currentCamPos*(-1))-180));
        }
        else if(currentCamPos >= 180){
            currentCamPos = (-1*(180+(180-currentCamPos)));
        }
    }
}
export function animateMod(scene, camera, ){
    const delta = clock.getDelta();
    init(scene, camera);
    //controls.update();
    //controlupd = controls;
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