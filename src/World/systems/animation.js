import { 
    Clock,
    Euler,
Vector3 } from "../../../node_modules/three/build/three.module.js";

import{
    createControls,
} from './controls.js'

import{
    createRenderer,
} from './renderer.js'

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
let shape2XRot;
let shape2ZRot;
let cameraZMax;
let cameraZMin;
let cameraZMov;
let cameraZRevMov;
let cameraZRot;
let cameraXRot;
let keyPressed = false;
let controlupd;
let vector = new Vector3();
let cameraPosX = false;
let cameraPosXRev = false;
let cameraFoward = false;
let cameraBack = false;
let currentCamPos = 0;
let rightSensitivity;
let leftSensitivity;
let fowardSpeed;
let backSpeed;
let xP = document.getElementById('x');
let yP = document.getElementById('y');
let zP = document.getElementById('z');
let mouseMovementX = 0;
let mouseMovementY = 0;
let mouseYPos = 0;
let doomControls = true;
let depth = -360;
let zPos = 360;
let xPos = 0;
let playerBox;
let cameraBob = 0;
let cameraBobDown = false;
let cameraBobAmount;
let control1;
let camYRot = 0;
const clock = new Clock();
let controls;
let playerBB;
let boxBB;
let worldPosX;
let worldPosZ;
let prevWorldPosX;
let prevWorldPosZ;
let selectedWorldPos;
let worldPosXRev;
let worldPosZRev;
let cameraSkipSide = false;
let cameraFowardInt = false;
let cameraBackInt = false;
let cameraLeftInt = false;
let cameraRightInt = false;
const renderer = new createRenderer;
function rad(num){
    return((Math.PI)/(360/num));
}

function deg(num){
    return(num * (180/Math.PI));
}

let doomButton = document.getElementById('doomControl');
doomButton.addEventListener('click', () => {
    if(doomControls == false){
        doomControls = true;
        cameraMod.rotation.set(0,0,0);
        currentCamPos = 0;
    }
    else{
        doomControls = false;
    }
})

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
        cameraBack = false;
    }
    else if(event.key == 's'){
        cameraBack = true;
        cameraFoward = false;
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
    else if(event.key == 's'){
        cameraBack = false;
    }
})
/*
window.addEventListener('mousemove', (event) => {
    mouseMovementX = event.movementX;
    mouseMovementY = event.movementY;
})
*/
function settings(){
    (function shape1Settings(){
        shape1XRot = rad(1.15);
        shape1YRot = rad(0.86);
        shape1ZRot = rad(0.6); 
    })();
    (function shape2Settings(){
        shape2XRot = rad(1.15);
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
        backSpeed = 0.4;
    })();
    (function bobSettings(){
        cameraBobAmount = 0.024;
    })();
}
function init(scene, camera, pBB, bBB){
    cube = scene.getObjectByName('cube1');
    cube2 = scene.getObjectByName('cube2');
    playerBox = scene.getObjectByName('playerBox');
    cameraMod = camera;
    playerBB = pBB;
    boxBB = bBB;
    settings();
}
function shape1(timeScale){
    cube.rotation.x += (shape1XRot * timeScale);
    cube.rotation.y += (shape1YRot * timeScale);
    cube.rotation.z += (shape1ZRot * timeScale);
}
function shape2(timeScale){
    cube2.rotation.x += (shape2XRot * timeScale);
    cube2.rotation.y += (shape2XRot * timeScale);
    cube2.rotation.z += (shape2ZRot * timeScale);
}

function gunAnimation(){

}

function cameraAnim(timeScale){
    function cameraBobFun(end){
        if(cameraBob<=.8 && cameraBobDown == false && end == false){
            cameraMod.position.y += (cameraBobAmount*timeScale);
            cameraBob += (cameraBobAmount*timeScale);
        }
        else{
            cameraBobDown = true;
            if(cameraBob - (cameraBobAmount*timeScale) <= cameraBobAmount){
                cameraBobDown = false;
                cameraBob = 0;
                cameraMod.position.y = 10;
            }
            cameraMod.position.y -= (cameraBobAmount*timeScale);
            cameraBob -= (cameraBobAmount*timeScale);
        }
    }
    if(doomControls == true){
        if(cameraPosX == true){
        cameraMod.rotateY(-(rad(rightSensitivity) * timeScale));
        }
        if(cameraPosXRev == true){
            cameraMod.rotateY((rad(rightSensitivity) * timeScale));
        }
    }
    else if(doomControls == false){
        if(cameraPosX == true && !(playerBB.intersectsBox(boxBB))){
            control1.moveRight(.25);
            cameraPosXRev = false;
            cameraBobFun(false);
        }
        else if(cameraPosXRev == true && !(playerBB.intersectsBox(boxBB))){
            control1.moveRight(-.25);
            cameraPosX = false;
            cameraBobFun(false);
        }
    }
        if(cameraFoward == true && !(playerBB.intersectsBox(boxBB))){
        if(doomControls == false){
            control1.moveForward(.5)
            cameraBobFun(false);
        }
        else{
        cameraMod.translateZ(-.5);
        cameraBobFun(false);
    }
}
    else if(cameraBack == true && !(playerBB.intersectsBox(boxBB))){
        if(doomControls == false){
            control1.moveForward(-.5)
            cameraBobFun(false);
        }
        else{
        cameraMod.translateZ(.5);
        cameraBobFun(false);
    }
    }
    if(playerBB.intersectsBox(boxBB)){
        if(cameraFoward == true){
                worldPosX = cameraMod.getWorldDirection(vector).x;
                worldPosZ = cameraMod.getWorldDirection(vector).z;
                if(cameraMod.position.x < cameraMod.position.z){
                    if(cameraMod.position.x < 95){
                        if(deg(cameraMod.rotation.y)>0){
                            cameraSkipSide = true;
                        }
                        else{
                            if(worldPosX<worldPosZ){
                                selectedWorldPos = worldPosX;
                                }
                            else{
                                selectedWorldPos = worldPosZ
                            }
                        }
                    }
                    else{
                        if(cameraMod.rotation.x > 1.6 ||cameraMod.rotation.x < -1.6 ){
                            cameraSkipSide = true;
                        }
                        else{
                            selectedWorldPos = worldPosX;
                        }
                    }
                }
                else{
                    if(cameraMod.position.x > 105){
                        if(deg(cameraMod.rotation.y)<0){
                            cameraSkipSide = true;
                        }
                        else{
                            selectedWorldPos = (worldPosZ * -1);
                        }
                    }
                    else{
                        if(deg(cameraMod.rotation.z)<30 && deg(cameraMod.rotation.z)>-30){
                            cameraSkipSide = true;
                        }
                        else{
                            selectedWorldPos = (worldPosX * -1);
                        }
                    }
                }
                if(cameraSkipSide==false){
                    cameraMod.translateX(.25*selectedWorldPos);
                    cameraMod.translateZ(-.25*(selectedWorldPos*selectedWorldPos));
                }
                else{
                    cameraMod.translateZ(-.25);
                    cameraSkipSide = false;
                }
                worldPosXRev = false;
                worldPosZRev = false;
        }
        else if(cameraBack == true){
            cameraBackInt = true;
        }
        else if(cameraPosX == true){
            cameraRightInt = true;
        }
        else if(cameraPosXRev == true){
            cameraLeftInt = true;
        }
    }
    if(cameraBob > 0 && (cameraFoward == false && cameraBack == false && cameraPosX == false && cameraPosXRev == false ||
    doomControls == true && cameraFoward == false && cameraBack == false)){
        cameraBobFun(true);
    }
    /*
    xP.textContent = (`x:${cameraMod.position.x}`);
    yP.textContent = (`y:${cameraMod.position.y}`);
    zP.textContent = (`z:${cameraMod.position.z}`);
    */
    xP.textContent = (`x:${cameraMod.rotation.x}`);
    //yP.textContent = (`y:${cameraMod.rotation.y}`);
    //zP.textContent = (`z:${cameraMod.rotation.z}`);
    //yP.textContent = (`${(cameraMod.rotation.y)+((Math.PI*2)*camYRot)}`);
    /*
    if(Number(yP.textContent) <= (-(Math.PI*2))){
        camYRot++;
    }
    else if(Number(yP.textContent) >= ((Math.PI*2))){
        camYRot--;
    }
    
    if(0>currentCamPos){
        yP.textContent = (`${360+currentCamPos}`);
    }
    else{
        yP.textContent = (`${currentCamPos}`);
    }*/
    //console.log(cameraMod.getWorldDirection(vector))
    zP.textContent = (`Position: X=${cameraMod.position.x} Y=${cameraMod.position.y} Z=${cameraMod.position.z}`);
    //console.log(sce);
    //console.log(cameraMod.position.x)
    yP.textContent = (`y:${deg(cameraMod.rotation.y)} z:${deg(cameraMod.rotation.z)}`);
    playerBox.position.set(cameraMod.position.x, 5, cameraMod.position.z);
    playerBB.copy(playerBox.geometry.boundingBox).applyMatrix4(playerBox.matrixWorld);
    //console.log(playerBB);

}
export function animateMod(scene, camera, controls, pBB, bBB){
    control1 = controls;
    const delta = clock.getDelta();
    init(scene, camera, pBB, bBB);
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
    if(cameraFoward == true || cameraBack == true){
        return('walk');
    }
    else{
        return('still');
    }
}