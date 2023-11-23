import { 
    Clock,
    Euler, } from "../../../node_modules/three/build/three.module.js";

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
let cameraPosX = false;
let cameraPosXRev = false;
let cameraFoward = false;
let cameraBack = false;
let currentCamPos = 0;
let rightSensitivity;
let leftSensitivity;
let fowardSpeed;
let backSpeed;
let mouseMovementX = 0;
let mouseMovementY = 0;
let mouseYPos = 0;
let doomControls = true;
let depth = -360;
let zPos = 360;
let xPos = 0;
let cameraBob = 0;
let cameraBobDown = false;
let cameraBobAmount;
let control1;
const clock = new Clock();
let controls;
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
        cameraBobAmount = 0.025;
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
    cube2.rotation.x += (shape2XRot * timeScale);
    cube2.rotation.y += (shape2XRot * timeScale);
    cube2.rotation.z += (shape2ZRot * timeScale);
}
function cameraAnim(timeScale){
    function cameraBobFun(end){
        if(cameraBob<=1 && cameraBobDown == false && end == false){
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
    if(doomControls == true){
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
    }
    else if(doomControls == false){
        if(cameraPosX == true){
            control1.moveRight(.25);
            cameraPosXRev = false;
            cameraBobFun(false);
        }
        else if(cameraPosXRev == true){
            control1.moveRight(-.25);
            cameraPosX = false;
            cameraBobFun(false);
        }
        //console.log(deg(cameraMod.rotation._y))
        //currentCamPos = deg(cameraMod.rotation._y);
        /*
        controls = createControls(cameraMod, renderer.domElement);
        //controls.current.connect();
        //controls.current.lock();
        document.addEventListener('click', () => {
            controls.lock();
        })
        
        controls.addEventListener('change', () =>{
            console.log(controls);
        })
        
        if(mouseMovementX < 0){
            cameraMod.rotation.y += (rad((leftSensitivity*(-1*(mouseMovementX)))) * timeScale);
            currentCamPos += (((leftSensitivity*(-1*(mouseMovementX)))))/2;
            console.log(xPos);
            console.log(zPos);
            /*
            if(xPos<=zPos &&(zPos>=0 && xPos>=0)){
                xPos += (((leftSensitivity*(-1*(mouseMovementX)))))/2;
            }
            else if(xPos>zPos&&(zPos>=0 && xPos>=0)){
                zPos -= (((leftSensitivity*(-1*(mouseMovementX)))))/2;
            }
            else if(xPos>zPos &&(zPos<0 && xPos>=0)){
                xPos -= (((leftSensitivity*(-1*(mouseMovementX)))))/2;
            }
            else{
                zPos += (((leftSensitivity*(-1*(mouseMovementX)))))/2;
                if(zPos >= 100 && xPos<=0){
                    xPos = 0;
                    zPos = 360;
                }
            }
            //depth += (((leftSensitivity*(-1*(mouseMovementX)))))/2;
            cameraMod.lookAt(xPos,mouseYPos/2,zPos);
            
            if(currentCamPos>=720){
                currentCamPos -= 720;
            }
            mouseMovementX = 0;
        }
        else if(mouseMovementX > 0){
            cameraMod.rotation.y += (rad((leftSensitivity*(-1*(mouseMovementX)))) * timeScale);
            currentCamPos += (((leftSensitivity*(-1*(mouseMovementX)))))/2;
            depth -= (((leftSensitivity*(-1*(mouseMovementX)))))/2;
            //cameraMod.lookAt(-(currentCamPos),mouseYPos/2,-currentCamPos);
            console.log(currentCamPos)
            if(currentCamPos<=-360000){
                currentCamPos += 3600;
            }
            mouseMovementX = 0;
        }
        if((mouseMovementY>0 || mouseMovementY<0)){// && mouseYPos <= 90 && mouseYPos >= -90){
            //cameraMod.rotation.z = 0;
            cameraMod.rotation.x += (rad((leftSensitivity*(-1*(mouseMovementY)))) * timeScale);
            //cameraMod.rotation.z += (rad((leftSensitivity*(-1*(mouseMovementY)))) * timeScale);
            //cameraMod.up.set(0,0,10)
            mouseYPos += (((leftSensitivity*(-1*(mouseMovementY)))) * timeScale)/2;
            //depth += (((leftSensitivity*(-1*(mouseMovementY)))) * timeScale)/2;
            console.log(currentCamPos);
            //cameraMod.lookAt((-(currentCamPos)), mouseYPos/2, 1);
            //cameraMod.lookAt(xPos,mouseYPos/2,zPos)
            mouseMovementY = 0;
        }
        */
    }
    if(cameraFoward == true){
        if(doomControls == false){
            control1.moveForward(.5)
            cameraBobFun(false);
        }
        else{
        console.log(currentCamPos)
        if(currentCamPos == 0){
            cameraMod.position.z -= (fowardSpeed * timeScale);
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
        cameraBobFun(false);
    }
}
    else if(cameraBack == true){
        if(doomControls == false){
            control1.moveForward(-.5)
            cameraBobFun(false);
        }
        else{
        console.log(currentCamPos)
        if(currentCamPos == 0){
            cameraMod.position.z += (backSpeed * timeScale);
        }
        else if(currentCamPos<0 && currentCamPos>-90){
            let direction = (90+currentCamPos)*.01;
            cameraMod.position.z += ((backSpeed*direction) * timeScale);
            cameraMod.position.x -= ((backSpeed-(backSpeed*direction)) * timeScale);
            //console.log((0.2*direction) * timeScale);
            //console.log((0.2-(0.2*direction)) * timeScale);
        }
        else if(currentCamPos>0 && currentCamPos<90){
            let direction = (90-currentCamPos)*.01;
            cameraMod.position.z += ((backSpeed*direction) * timeScale);
            cameraMod.position.x += ((backSpeed-(backSpeed*direction)) * timeScale);
            //console.log((0.2*direction) * timeScale);
            //console.log((0.2-(0.2*direction)) * timeScale);
        }
        else if(currentCamPos>90 && currentCamPos<180){
            let direction = (90-currentCamPos)*.01;
            cameraMod.position.z += ((backSpeed*direction) * timeScale);
            cameraMod.position.x += ((backSpeed+(backSpeed*direction)) * timeScale);
            //console.log((0.2*direction) * timeScale);
            //console.log((0.2+(0.2*direction)) * timeScale);
        }
        else if(currentCamPos<-90 && currentCamPos>-180){
            let direction = (90+currentCamPos)*.01;
            cameraMod.position.z += ((backSpeed*direction) * timeScale);
            cameraMod.position.x -= ((backSpeed+(backSpeed*direction)) * timeScale);
            //console.log((0.2*direction) * timeScale);
            //console.log((0.2+(0.2*direction)) * timeScale);
        }
        if(currentCamPos <= -180){
            currentCamPos = (180-((currentCamPos*(-1))-180));
        }
        else if(currentCamPos >= 180){
            currentCamPos = (-1*(180+(180-currentCamPos)));
        }
        cameraBobFun(false);
    }
    
    }
    if(cameraBob > 0 && (cameraFoward == false && cameraBack == false && cameraPosX == false && cameraPosXRev == false ||
        doomControls == true && cameraFoward == false && cameraBack == false)){
            cameraBobFun(true);
        }
}
export function animateMod(scene, camera, controls){
    control1 = controls;
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