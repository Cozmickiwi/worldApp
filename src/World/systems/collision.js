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

function collisionDetect(cameraFoward, cameraBack, cameraPosX, cameraPosXRev, cameraMod, cameraBobAmount, face, yPos, connectorWall, obj, cbbarr, wArr2){
    let cornerInt = false;
    let cornerCol;
    let playerBB;
    let n;
    if(connectorWall == true){
        if(wArr2.length>1){
            cornerCol = wArr2;
            cornerInt = true;
        }
    }
    
    /*
    if(connectorWall == true){
        n = cbbarr.length-1;
        playerBB = cbbarr[n];
        for(let i=0; i<n; i++){
            if(playerBB.intersectsBox(cbbarr[i])){
                cornerCol = cbbarr[i];
                cornerInt = true;
            }
        }
    }*/
    if(cameraMod.position.y < 10){
        cameraMod.position.y = 10;
    }
    else if(cameraMod.position.y > 10.5){
        cameraMod.position.y = 10.5;
    }
    if(cameraFoward == true){
        worldPosX = cameraMod.getWorldDirection(vector).x;
        worldPosZ = cameraMod.getWorldDirection(vector).z;
        if(cornerInt == true){
            //console.log(cornerCol)
            if(cornerCol[0] == 'north' && cornerCol[1] == 'east'){
                if(worldPosX>0 && worldPosZ>0){
                    cameraMod.position.z += .25*worldPosZ;
                }
                else if(worldPosX<0){
                    cameraMod.position.x -= .25*(worldPosX * -1);
                }
                return;
            }
            else if(cornerCol[0] == 'east' && cornerCol[1] == 'south'){
                if(worldPosZ>0 && worldPosX<0){
                    cameraMod.position.x -= .25*(worldPosX * -1);
                }
                else if(worldPosZ<0){
                    cameraMod.position.z -= .25*(worldPosZ * -1);
                }
                return;
            }
            else if(cornerCol[0] == 'south' && cornerCol[1] == 'west'){
                if(worldPosZ<0 && worldPosX<0){
                    cameraMod.position.z -= .25*(worldPosZ * -1);
                }
                else if(worldPosX>0){
                    cameraMod.position.x += .25*worldPosX;
                }
                return;
            }
            else if(cornerCol[0] == 'west' && cornerCol[1] == 'north'){
                if(worldPosZ<0 && worldPosX>0){
                    cameraMod.position.x += .25*worldPosX;
                }
                else if(worldPosZ>0){
                    cameraMod.position.z += .25*worldPosZ;
                }
                return;
            }
        }
        let multiplyAmount;
        if(face == 'east'){
            multiplyAmount = 1;
            if(deg(cameraMod.rotation.y)>0){
                cameraSkipSide = true;
            }
            else{
                selectedWorldPos = worldPosZ
            }
        }
        else if(face == 'north'){
            multiplyAmount = 1;
            if((cameraMod.rotation.x > 1.6 || cameraMod.rotation.x < -1.6)){
                    cameraSkipSide = true;
            }
            else{
                selectedWorldPos = worldPosX;
            }
        }
        else if(face == 'west'){
            multiplyAmount = -1;
            if(deg(cameraMod.rotation.y)<0){
                cameraSkipSide = true;
            }
            else{
                selectedWorldPos = (worldPosZ * -1);
            }
        }
        else{
            multiplyAmount = -1;
            if(deg(cameraMod.rotation.z)<30 && deg(cameraMod.rotation.z)>-30){
                cameraSkipSide = true;
            }
            else{
                selectedWorldPos = (worldPosX * -1);
            }
        }
        if(cameraSkipSide==false){
            if(face == 'south' || face == 'north'){
                cameraMod.position.x += ((.5*(selectedWorldPos*1))*multiplyAmount);
            }
            else{
                cameraMod.position.z += ((.5*(selectedWorldPos*1))*multiplyAmount);
            }
        }
        else{
            cameraMod.translateZ(-.5);
            cameraSkipSide = false;
        }
    }
    else if(cameraBack == true){
        worldPosX = cameraMod.getWorldDirection(vector).x;
        worldPosZ = cameraMod.getWorldDirection(vector).z;
        if(cornerInt == true){
            if(cornerCol[0] == 'north' && cornerCol[1] == 'east'){
                if(worldPosX>0 && worldPosZ<0){
                    cameraMod.translateZ(.25)
                }
                else if(worldPosX<0 && worldPosZ<0){
                    cameraMod.position.z -= .25*worldPosZ;
                }
                else if(worldPosX>0){
                    cameraMod.position.x -= .25*worldPosX;
                }
                return;
            }
            else if(cornerCol[0] == 'east' && cornerCol[1] == 'south'){
                if(worldPosZ>0 && worldPosX>0){
                    cameraMod.translateZ(.25)
                }
                else if(worldPosZ>0 && worldPosX<0){
                    cameraMod.position.z -= .25*worldPosZ;
                }
                else if(worldPosX>0){
                    cameraMod.position.x -= .25*worldPosX;
                }
                return;
            }
            else if(cornerCol[0] == 'south' && cornerCol[1] == 'west'){
                if(worldPosX<0 && worldPosZ>0){
                    cameraMod.translateZ(.25)
                }
                else if(worldPosZ>0 && worldPosX>0){
                    cameraMod.position.z -= .25*worldPosZ;
                }
                else if(worldPosX<0){
                    cameraMod.position.x += .25*(worldPosX * -1);
                }
                console.log(obj)
                return;
            }
            else if(cornerCol[0] == 'west' && cornerCol[1] == 'north'){
                if(worldPosX<0 && worldPosZ>0){
                    cameraMod.position.x += .25*worldPosZ;
                }
                else if(worldPosX>0){
                    cameraMod.position.z += .25*worldPosX;
                }
                return;
            }
        }
        let multiplyAmount;
        if(face == 'east'){
            multiplyAmount = -1;
            if(deg(cameraMod.rotation.y)>0){
                selectedWorldPos = worldPosZ;
            }
            else{
                cameraSkipSide = true;
            }
        }
        else if(face == 'north'){
            multiplyAmount = -1;
            if((cameraMod.rotation.x > 1.6 || cameraMod.rotation.x < -1.6 )){
                selectedWorldPos = worldPosX;
            }
            else{
                cameraSkipSide = true;
            }
        }
        else if(face == 'west'){
            multiplyAmount = 1;
            if(deg(cameraMod.rotation.y)<3){
                selectedWorldPos = (worldPosZ*-1);
            }
            else{
                cameraSkipSide = true;
            }
        }
        else{
            multiplyAmount = 1;
            if(worldPosZ<0.05){
                selectedWorldPos = (worldPosX * -1);
            }
            else{
                cameraSkipSide = true;
            }
        }
        if(cameraSkipSide==false){
            if(face == 'south' || face == 'north'){
                cameraMod.position.x += ((.25*(selectedWorldPos*1.5))*multiplyAmount);
            }
            else{
                cameraMod.position.z += ((.25*(selectedWorldPos*1.5))*multiplyAmount);
            }
        }
        else{
            cameraMod.translateZ(.25);
            cameraSkipSide = false;
        }
        //cameraMod.position.y = cameraBobAmount+10;
    }
    else if(cameraPosX == true){
        worldPosX = cameraMod.getWorldDirection(vector).x;
        worldPosZ = cameraMod.getWorldDirection(vector).z;
        if(cornerInt == true){
            if(cornerCol[0] == 'north' && cornerCol[1] == 'east'){
                if(worldPosX>0 && worldPosZ<0){
                    cameraMod.position.z += .25*worldPosX;
                }
                else if(worldPosZ>0){
                    cameraMod.position.x -= .25*worldPosZ;
                }
                return;
            }
            else if(cornerCol[0] == 'east' && cornerCol[1] == 'south'){
                if(worldPosZ>0 && worldPosX>0){
                    cameraMod.position.x -= .25*worldPosZ;
                }
                else if(worldPosX<0){
                    cameraMod.position.z -= .25*(worldPosX * -1);
                }
                return;
            }
            else if(cornerCol[0] == 'south' && cornerCol[1] == 'west'){
                if(worldPosZ>0 && worldPosX<0){
                    cameraMod.position.z -= .25*(worldPosX * -1);
                }
                else if(worldPosZ<0){
                    cameraMod.position.x += .25*(worldPosZ * -1);
                }
                return;
            }
            else if(cornerCol[0] == 'west' && cornerCol[1] == 'north'){
                if(worldPosZ<0 && worldPosX<0){
                    cameraMod.position.x += .25*(worldPosX * -1);
                }
                else if(worldPosX>0){
                    cameraMod.position.z += .25*worldPosX;
                }
                return;
            }
        }
        let multiplyAmount;
        if(face == 'east'){
            multiplyAmount = 1;
            if(cameraMod.rotation.x > 1.6 ||cameraMod.rotation.x < -1.6 ){
                cameraSkipSide = true;
            }
            else{
                selectedWorldPos = worldPosX;
            }
        }
        else if (face == 'north'){
            multiplyAmount = 1;
            if(deg(cameraMod.rotation.y)>0){
                selectedWorldPos = (worldPosZ * -1);
            }
            else{
                cameraSkipSide = true;
            }
        }
        else if(face == 'west'){
            multiplyAmount = -1;
                if(deg(cameraMod.rotation.z)<30 && deg(cameraMod.rotation.z)>-30){
                cameraSkipSide = true;
            }
            else{
                selectedWorldPos = (worldPosX * -1);
            }
        }
        else{
            multiplyAmount = -1;
            if(deg(cameraMod.rotation.y)<0){
                selectedWorldPos = worldPosZ;
            }
            else{
                cameraSkipSide = true;
            }
        }
        if(cameraSkipSide==false){
            if(face == 'south' || face == 'north'){
                cameraMod.position.x += ((.25*(selectedWorldPos*1.5))*multiplyAmount);
            }
            else{
                //cameraMod.translateX(.25*selectedWorldPos);
                //cameraMod.translateZ(-.25*(selectedWorldPos*selectedWorldPos));
                cameraMod.position.z += ((.25*(selectedWorldPos*1.5))*multiplyAmount);
            }
        }
        else{
            cameraMod.translateX(.25);
            cameraSkipSide = false;
        }
        //cameraMod.position.y = cameraBobAmount+10;
    }
    else if(cameraPosXRev == true){
        worldPosX = cameraMod.getWorldDirection(vector).x;
        worldPosZ = cameraMod.getWorldDirection(vector).z;
        if(cornerInt == true){
            if(cornerCol[0] == 'north' && cornerCol[1] == 'east'){
                if(worldPosX<0 && worldPosZ>0){
                    cameraMod.position.z += .25*(worldPosX * -1);
                }
                else if(worldPosZ<0){
                    cameraMod.position.x -= .25*(worldPosZ * -1);
                }
                return;
            }
            else if(cornerCol[0] == 'east' && cornerCol[1] == 'south'){
                if(worldPosZ<0 && worldPosX<0){
                    cameraMod.position.x -= .25*(worldPosZ * -1);
                }
                else if(worldPosX>0){
                    cameraMod.position.z -= .25*worldPosX;
                }
                return;
            }
            else if(cornerCol[0] == 'south' && cornerCol[1] == 'west'){
                if(worldPosZ<0 && worldPosX>0){
                    cameraMod.position.z -= .25*worldPosX;
                }
                else if(worldPosZ>0){
                    cameraMod.position.x += .25*worldPosZ;
                }
                return;
            }
            else if(cornerCol[0] == 'west' && cornerCol[1] == 'north'){
                if(worldPosZ>0 && worldPosX>0){
                    cameraMod.position.x += .25*worldPosZ;
                }
                else if(worldPosX<0){
                    cameraMod.position.z += .25*(worldPosX * -1);
                }
                return;
            }
        }
        let multiplyAmount;
        if(face == 'east'){
            multiplyAmount = 1;
            if(cameraMod.rotation.x > 1.6 ||cameraMod.rotation.x < -1.6 ){
                    selectedWorldPos = (worldPosX * -1);
            }
            else{
                cameraSkipSide = true;
            }
        }
        else if(face == 'north'){
            multiplyAmount = 1;
            if(deg(cameraMod.rotation.y)<0){
                selectedWorldPos = worldPosZ;
            }
            else{
                cameraSkipSide = true;
            }
        }
        else if(face == 'west'){
            multiplyAmount = -1;
                if(deg(cameraMod.rotation.z)<30 && deg(cameraMod.rotation.z)>-30){
                selectedWorldPos = worldPosX;
            }
            else{
                cameraSkipSide = true;
            }
        }
        else{
            multiplyAmount = -1;
            if(deg(cameraMod.rotation.y)<0){
                cameraSkipSide = true;
            }
            else{
                selectedWorldPos = (worldPosZ * -1);
            }
        }
    if(cameraSkipSide==false){
        if(face == 'south' || face == 'north'){
            cameraMod.position.x += ((.25*(selectedWorldPos*1.5))*multiplyAmount);
        }
        else{
            //cameraMod.translateX(.25*selectedWorldPos);
            //cameraMod.translateZ(-.25*(selectedWorldPos*selectedWorldPos));
            cameraMod.position.z += ((.25*(selectedWorldPos*1.5))*multiplyAmount);
        }
    }
    else{
        cameraMod.translateX(-.25);
        cameraSkipSide = false;
    }
    //cameraMod.position.y = cameraBobAmount+10;
    }
}
export{collisionDetect};