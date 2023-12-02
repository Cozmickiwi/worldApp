import { 
    Clock,
    Euler,
Vector3, } from "../../../node_modules/three/build/three.module.js";

import{
    createControls,
} from './controls.js'

import{
    createRenderer,
} from './renderer.js'

import{
    collisionDetect,
} from './collision.js'

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
let wallArr;
let wall1BB;
let wall2BB;
let wall3BB;
let wall4BB;
let wallInt = false;
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
let quadrant;
let closestFace;
let cbbarr;
let boxInt;
let openDoors = [];
let doorQueue = [];
let currentlyClosing = [];
let doorBBArr;
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
        cameraBobAmount = 0.012;
    })();
}
function init(scene, camera, pBB, bBB, wbbArr, cbb, doorBB){
    cube = scene.getObjectByName('cube1');
    cube2 = scene.getObjectByName('cube2');
    playerBox = scene.getObjectByName('playerBox');
    cameraMod = camera;
    playerBB = pBB;
    boxBB = bBB;
    wallArr = wbbArr;
    cbbarr = cbb;
    doorBBArr = doorBB;
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
        if(cameraBob<=.5 && cameraBobDown == false && end == false){
            cameraMod.position.y += (cameraBobAmount*timeScale);
            cameraBob += (cameraBobAmount*timeScale);
        }
        else{
            cameraBobDown = true;
            if(cameraBob - (cameraBobAmount*timeScale) <= cameraBobAmount){
                cameraBobDown = false;
                cameraBob = 0;
                cameraMod.position.y = 5;
            }
            cameraMod.position.y -= (cameraBobAmount*timeScale);
            cameraBob -= (cameraBobAmount*timeScale);
        }
    }
    let wallArr2 = [];
    let addEast = false;
    for(let i=0; i<wallArr.length; i++){
        if(playerBB.intersectsBox(wallArr[i]) && !(openDoors.includes(wallArr[i]))){
            wallInt = true;
            boxInt = wallArr[i];
            let vector1 = new Vector3(playerBB.max.x, 0, playerBox.position.z)
            let vector1a = new Vector3(playerBB.max.x, 0, playerBox.position.z-3)
            let vector1b = new Vector3(playerBB.max.x, 0, playerBox.position.z+3)
            let vector2 = new Vector3(playerBB.min.x, 0, playerBox.position.z)
            let vector2a = new Vector3(playerBB.min.x, 0, playerBox.position.z-3)
            let vector2b = new Vector3(playerBB.min.x, 0, playerBox.position.z+3)
            let vector3 = new Vector3(playerBox.position.x, 0, playerBB.max.z)
            let vector3a = new Vector3(playerBox.position.x-3, 0, playerBB.max.z)
            let vector3b = new Vector3(playerBox.position.x+3, 0, playerBB.max.z)
            let vector4 = new Vector3(playerBox.position.x, 0, playerBB.min.z)
            let vector4a = new Vector3(playerBox.position.x-3, 0, playerBB.min.z)
            let vector4b = new Vector3(playerBox.position.x+3, 0, playerBB.min.z)
            if(wallArr[i].containsPoint(vector1) && !(wallArr[i].containsPoint(vector2))){
                wallArr2.push('east');
            }
            else if(wallArr[i].containsPoint(vector2) && !(wallArr[i].containsPoint(vector1))){
                wallArr2.push('west')
            }
            else if(wallArr[i].containsPoint(vector3) && !(wallArr[i].containsPoint(vector4))){
                wallArr2.push('south')
            }
            else if(wallArr[i].containsPoint(vector4) && !(wallArr[i].containsPoint(vector3))){
                wallArr2.push('north')
            }
            else{
                if((wallArr[i].containsPoint(vector1a) && !(wallArr[i].containsPoint(vector1b))) && !(wallArr[i].containsPoint(vector2))){
                    addEast = true;
                }
                else if((wallArr[i].containsPoint(vector2a) || wallArr[i].containsPoint(vector2b)) && !(wallArr[i].containsPoint(vector1))){
                    addEast = true;
                }
                else if((wallArr[i].containsPoint(vector3a) || wallArr[i].containsPoint(vector3b)) && !(wallArr[i].containsPoint(vector4))){
                    addEast = true;
                }
                else if((wallArr[i].containsPoint(vector4a) || wallArr[i].containsPoint(vector4b)) && !(wallArr[i].containsPoint(vector3))){
                    addEast = true;
                }
            }
        }
    }
    if(wallArr2.length<1 && addEast == true){
        wallArr2.push(closestFace)
    }
    if(wallArr2.length>1){
        if((wallArr2[0] == 'north' && wallArr2[1] == 'west') || (wallArr2[0] == 'east' && wallArr2[1] == 'north')
        || (wallArr2[0] == 'south' && wallArr2[1] == 'east') || (wallArr2[0] == 'west' && wallArr2[1] == 'south')){
            wallArr2.reverse();
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
        if(cameraPosX == true && !(playerBB.intersectsBox(boxBB)) && wallInt == false){
            control1.moveRight(.25);
            cameraPosXRev = false;
            cameraBobFun(false);
        }
        else if(cameraPosXRev == true && !(playerBB.intersectsBox(boxBB)) && wallInt == false){
            control1.moveRight(-.25);
            cameraPosX = false;
            cameraBobFun(false);
        }
    }
        if(cameraFoward == true && !(playerBB.intersectsBox(boxBB)) && wallInt == false){
        if(doomControls == false){
            control1.moveForward(.5)
            cameraBobFun(false);
        }
        else{
        cameraMod.translateZ(-.5);
        cameraBobFun(false);
    }
}
    else if(cameraBack == true && !(playerBB.intersectsBox(boxBB)) && wallInt == false){
        if(doomControls == false){
            control1.moveForward(-.5)
            cameraBobFun(false);
        }
        else{
        cameraMod.translateZ(.5);
        cameraBobFun(false);
    }
    }
    let moving = true;
    if((cameraFoward == false && cameraBack == false && cameraPosX == false && cameraPosXRev == false ||
    doomControls == true && cameraFoward == false && cameraBack == false)){
        moving = false;
    }
    if(playerBB.intersectsBox(boxBB)){
        collisionDetect(cameraFoward, cameraBack, cameraPosX, cameraPosXRev, cameraMod, cameraBobAmount, closestFace, cameraMod.position.y, false);
        cameraBobFun(false);
    }
    else if(wallInt == true){
        collisionDetect(cameraFoward, cameraBack, cameraPosX, cameraPosXRev, cameraMod, cameraBobAmount, wallArr2[0], cameraMod.position.y, true, boxInt, cbbarr, wallArr2);
        boxInt = undefined;
        if(moving == true || cameraBob>0){
            cameraBobFun(false);
        }
    }
    if(moving == false){
        cameraBobFun(true);
    }
    if(cameraMod.position.y<5){
        cameraMod.position.y = 5;
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
    zP.textContent = (`Position: X=${cameraMod.position.x} Y=${cameraMod.position.y} Z=${cameraMod.position.z}`);
    yP.textContent = (`y:${deg(cameraMod.rotation.y)} z:${deg(cameraMod.rotation.z)}`);
    playerBox.position.set(cameraMod.position.x, 5, cameraMod.position.z);
    playerBB.copy(playerBox.geometry.boundingBox).applyMatrix4(playerBox.matrixWorld);
    if(wallInt == true){
        wallInt = false;
    }
    //console.log(playerBB);

}

let doorTick1 = 0;
let openingDoors = [];
let standByDoors = [];
let closingDoors = [];

window.addEventListener('keypress', event =>{
    if(event.key=='e'){
        let zVector1 = new Vector3(cameraMod.position.x+9, 2, cameraMod.position.z)
        let zVector2 = new Vector3(cameraMod.position.x-9, 2, cameraMod.position.z)
        let xVector1 = new Vector3(cameraMod.position.x, 2, cameraMod.position.z+9)
        let xVector2 = new Vector3(cameraMod.position.x, 2, cameraMod.position.z-9)
        for(let i=0; i<doorBBArr.length; i++){
            //if(playerBB.intersectsBox(doorBBArr[i]) && doorBBArr[i].status == 'null'){
                if(doorBBArr[i].status == 'null' && ((doorBBArr[i].orientation == 'z' && (doorBBArr[i].containsPoint(zVector1)
                || doorBBArr[i].containsPoint(zVector2)))
                || (doorBBArr[i].orientation == 'x' && (doorBBArr[i].containsPoint(xVector1)
                || doorBBArr[i].containsPoint(xVector2))))){
                let skip = false;
                if(openingDoors.length>0){
                    for(let k=0; k<openingDoors.length; k++){
                        if(doorBBArr[i].objectName == openingDoors[k].objectName){
                            skip = true;
                            break;
                        }
                    }
                }
                if(skip==false){
                    let curDoor = doorBBArr[i]
                    curDoor.status = 'opening';
                    curDoor.value = doorTick1;
                    curDoor.frameNum = 100;
                    openingDoors.push(curDoor);
                    doorTick1++;
                }
                
            }
        }
    }
})

function doorOpen(selDoor){
    if(selDoor.orientation == 'z'){
        selDoor.object.position.z -=.1;
    }
    else if(selDoor.orientation == 'x'){
        selDoor.object.position.x +=.1;
    }
    selDoor.frameNum--;
    if(selDoor.frameNum<=0){
        //openingDoors.splice(selDoor.value, 1);
        openDoors.push(selDoor);
        selDoor.status = 'standby';
        selDoor.frameNum = 900;
        standByDoors.push(selDoor);
        if(openingDoors.length>0){
            for(let r=0; r<openingDoors.length; r++){
                if(openingDoors[r].value == selDoor.value){
                    openingDoors.splice(r, 1);
                    break;
                }
                //openingDoors[r].value--;
            }
        }
    }
}

function doorStandBy(selDoor){
    selDoor.frameNum--;
    if(selDoor.frameNum<=0){
        if(!(playerBB.intersectsBox(selDoor))){
            for(let q=0; q<standByDoors.length; q++){
            if(standByDoors[q].value == selDoor.value){
                standByDoors.splice(q, 1)
                break;
            }
            }
            for(let t=0; t<openDoors.length; t++){
                if(openDoors[t].value == selDoor.value){
                    openDoors.splice(t, 1);
                    break;
                }
            }
            selDoor.status = 'closing';
            selDoor.frameNum = 100;
            closingDoors.push(selDoor);
        }
        else{
            selDoor.frameNum = 500;
        }
    }
}

function doorClose(selDoor){
    if(selDoor.orientation == 'z'){
        selDoor.object.position.z +=.1;
    }
    else if(selDoor.orientation == 'x'){
        selDoor.object.position.x -=.1;
    }
    selDoor.frameNum--;
    if(selDoor.frameNum<=0){
        if(selDoor.orientation == 'z'){
            selDoor.object.position.z = selDoor.max.z-5;
        }
        else{
            selDoor.object.position.x = selDoor.max.x-5;
        }
        for(let f=0; f<closingDoors.length; f++){
            if(closingDoors[f].value == selDoor.value){
                closingDoors.splice(f, 1);
                break;
            }
        }
        
        selDoor.status = 'null';
    }
}

export function animateMod(scene, camera, controls, pBB, bBB, wbbArr, quad, face, cbb, doorAnim, doorTex, curDoorArr, doorBBArr){
    if(openingDoors.length>0){
        for(let v=0; v<openingDoors.length; v++){
            doorOpen(openingDoors[v]);
        }
    }
    if(standByDoors.length>0){
        for(let d=0; d<standByDoors.length; d++){
            doorStandBy(standByDoors[d]);
        }
    }
    if(closingDoors.length>0){
        for(let p=0; p<closingDoors.length; p++){
            doorClose(closingDoors[p]);
        }
    }
    //for(let b=0; b<curDoorArr.length; b++){
        //if(curDoorArr[b] != false){
        //let innerDoor = doorTex.door.objectName;
        /*
        for(let o=1; o<curDoorArr.length; o++){
            if(curDoorArr[o] != false){
                let innerDoor = scene.getObjectByName((curDoorArr[o])[1].door.objectName);
            if(doorTex.currentStatus == 'opening'){
                if((curDoorArr[o])[1].door.orientation == 'z'){
                    innerDoor.position.z -= .1;
                }
                else{
                    innerDoor.position.x += .1;
                }
                
            }
            else if((curDoorArr[o])[1].currentStatus == 'standby' && !(openDoors.includes((curDoorArr[o])[1].door))){
                openDoors.push((curDoorArr[o])[1].door);
            }
            else if((curDoorArr[o])[1].currentStatus == 'closing'){
                if(!(doorQueue.includes((curDoorArr[o])[1].door))){
                    doorQueue.push((curDoorArr[o])[1].door);
                }
            }
            }
            
        }
        
        //innerDoor.visible = false;
    //}
    if(doorQueue.length>0){
        for(let f=0; f<doorQueue.length; f++){
            if(!(playerBB.intersectsBox(doorQueue[f])) && !(currentlyClosing.includes(doorQueue[f]))){
                currentlyClosing.push(doorQueue[f]);
                openDoors = [];
                setTimeout(() => {
                    currentlyClosing.splice(f, 1);
                    doorQueue.splice(f, 1);
                }, 750);
                }
        }
        
    }
    if(currentlyClosing.length>0){
        for(let k=0; k<currentlyClosing.length; k++){
            if((currentlyClosing[k].orientation == 'z' && scene.getObjectByName(currentlyClosing[k].objectName).position.z+5 < currentlyClosing[k].max.z)
            ||(currentlyClosing[k].orientation == 'x' && scene.getObjectByName(currentlyClosing[k].objectName).position.x+5 > currentlyClosing[k].max.x)){
                if(currentlyClosing[k].orientation == 'z'){
                    scene.getObjectByName(currentlyClosing[k].objectName).position.z += .1;
                }
                else{
                    scene.getObjectByName(currentlyClosing[k].objectName).position.x -= .1;
                }
                
            }
            else{
                if(currentlyClosing[0].orientation == 'z'){
                    scene.getObjectByName(currentlyClosing[k].objectName).position.z = currentlyClosing[k].max.z-5;
                }
                else{
                    scene.getObjectByName(currentlyClosing[k].objectName).position.x = currentlyClosing[k].max.x-5;
                }
                
            }
            
        }
    }
    //}
    */
    control1 = controls;
    const delta = clock.getDelta();
    quadrant = quad;
    closestFace = face;
    if(listCont == false){
        init(scene, camera, pBB, bBB, wbbArr, cbb, doorBBArr);
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