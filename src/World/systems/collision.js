import { 
    Clock,
    Euler,
Vector3 } from "../../../node_modules/three/build/three.module.js";

let worldPosX;
let worldPosZ;
let selectedWorldPos;
let cameraSkipSide = false;
let vector = new Vector3();

function deg(num){
    return(num * (180/Math.PI));
}

function collisionDetect(cameraFoward, cameraBack, cameraPosX, cameraPosXRev, cameraMod, cameraBobAmount){
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
    }
    else if(cameraBack == true){
            worldPosX = cameraMod.getWorldDirection(vector).x;
            worldPosZ = cameraMod.getWorldDirection(vector).z;
            if(cameraMod.position.x < cameraMod.position.z){
                if(cameraMod.position.x < 95){
                    if(deg(cameraMod.rotation.y)>0){
                        selectedWorldPos = worldPosZ;
                    }
                    else{
                        cameraSkipSide = true;
                    }
                }
                else{
                    if((cameraMod.rotation.x > 1.6 ||cameraMod.rotation.x < -1.6 )){
                        selectedWorldPos = worldPosX;
                    }
                    else{
                        cameraSkipSide = true;
                    }
                }
            }
            else{
                if(cameraMod.position.x > 104){
                    if(deg(cameraMod.rotation.y)<0){
                        selectedWorldPos = (worldPosZ*-1);
                    }
                    else{
                        cameraSkipSide = true;
                    }
                }
                else{
                    if(deg(cameraMod.rotation.z)<30 && deg(cameraMod.rotation.z)>-30){
                        selectedWorldPos = (worldPosX * -1);
                    }
                    else{
                        cameraSkipSide = true;
                    }
                }
            }
            if(cameraSkipSide==false){
                cameraMod.translateX(.25*selectedWorldPos);
            }
            else{
                cameraMod.translateZ(.25);
                cameraSkipSide = false;
            }
    }
    else if(cameraPosX == true){
        worldPosX = cameraMod.getWorldDirection(vector).x;
            worldPosZ = cameraMod.getWorldDirection(vector).z;
            if(cameraMod.position.x < cameraMod.position.z){
                if(cameraMod.position.x < 95){
                    if(cameraMod.rotation.x > 1.6 ||cameraMod.rotation.x < -1.6 ){
                        cameraSkipSide = true;
                    }
                    else{
                        selectedWorldPos = worldPosX;
                    }
                }
                else{
                    if(deg(cameraMod.rotation.y)>0){
                        selectedWorldPos = (worldPosZ * -1);
                    }
                    else{
                        cameraSkipSide = true;
                    }
                }
            }
            else{
                if(cameraMod.position.x > 105){
                        if(deg(cameraMod.rotation.z)<30 && deg(cameraMod.rotation.z)>-30){
                        cameraSkipSide = true;
                    }
                    else{
                        selectedWorldPos = (worldPosX * -1);
                    }
                }
                else{
                    if(deg(cameraMod.rotation.y)<0){
                        selectedWorldPos = worldPosZ;
                    }
                    else{
                        cameraSkipSide = true;
                    }
                }
            }
            if(cameraSkipSide==false){
                cameraMod.translateZ(.25*selectedWorldPos);
                cameraMod.translateX(.25*(selectedWorldPos*selectedWorldPos));
            }
            else{
                cameraMod.translateX(.25);
                cameraSkipSide = false;
            }
            cameraMod.position.y = cameraBobAmount+10;
    }
    else if(cameraPosXRev == true){
        worldPosX = cameraMod.getWorldDirection(vector).x;
            worldPosZ = cameraMod.getWorldDirection(vector).z;
            if(cameraMod.position.x < cameraMod.position.z){
                if(cameraMod.position.x < 95){
                    //if(deg(cameraMod.rotation.y)>0){
                    if(cameraMod.rotation.x > 1.6 ||cameraMod.rotation.x < -1.6 ){
                            selectedWorldPos = (worldPosX * -1);
                    }
                    else{
                        cameraSkipSide = true;
                    }
                }
                else{
                    if(deg(cameraMod.rotation.y)<0){
                        selectedWorldPos = worldPosZ;
                    }
                    else{
                        cameraSkipSide = true;
                    }
                }
            }
            else{
                if(cameraMod.position.x > 105){
                        if(deg(cameraMod.rotation.z)<30 && deg(cameraMod.rotation.z)>-30){
                        selectedWorldPos = worldPosX;
                    }
                    else{
                        cameraSkipSide = true;
                    }
                }
                else{
                    if(deg(cameraMod.rotation.y)<0){
                        cameraSkipSide = true;
                    }
                    else{
                        selectedWorldPos = (worldPosZ * -1);
                    }
                }
            }
            if(cameraSkipSide==false){
                cameraMod.translateZ(-.25*selectedWorldPos);
                cameraMod.translateX(-.25*(selectedWorldPos*selectedWorldPos));
            }
            else{
                cameraMod.translateX(-.25);
                cameraSkipSide = false;
            }
            cameraMod.position.y = cameraBobAmount+10;
    }
}
export{collisionDetect};