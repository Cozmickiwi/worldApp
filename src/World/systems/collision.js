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

function collisionDetect(cameraFoward, cameraBack, cameraPosX, cameraPosXRev, cameraMod, cameraBobAmount, face, yPos, connectorWall, obj, cbbarr){
    //let objCenter = new Vector3(obj.getCenter)
    //let cameraDir = cameraMod.getWorldDirection(vector)
    let n = cbbarr.length-1;
    let playerBB = cbbarr[n];
    let cornerCol;
    let cornerInt = false;
    for(let i=0; i<n; i++){
        if(playerBB.intersectsBox(cbbarr[i])){
            cornerCol = cbbarr[i];
            cornerInt = true;
        }
    }
    
    if(cameraFoward == true){
        
        if(connectorWall == true){
            /*
            if(!(obj.direction == 'wide' && cameraMod.position.x > (obj.ignorePositions[0]) && cameraMod.position.x < (obj.ignorePositions[1])
            || obj.direction == 'long' && cameraMod.position.z > (obj.ignorePositions[0]) && cameraMod.position.z < (obj.ignorePositions[1]))){
                cornerInt = true;
            }
            
            if(!(obj.direction == 'wide' && cameraMod.position.x > (obj.ignorePositions[0]) && cameraMod.position.x < (obj.ignorePositions[1]))){
                cornerInt = true;
            }
            if(!(obj.direction == 'long' && cameraMod.position.z > (obj.ignorePositions[0]) && cameraMod.position.z < (obj.ignorePositions[1]))){
                cornerInt = true;
            }
            if(obj.direction == 'wide'){
                if(!(cameraMod.position.x > (obj.ignorePositions[0]) && cameraMod.position.x < (obj.ignorePositions[1]))){
                    cornerInt = true;
                }
            }
            else if(obj.direction == 'long'){
                if(!(cameraMod.position.z > (obj.ignorePositions[0]) && cameraMod.position.z < (obj.ignorePositions[1]))){
                    cornerInt = true;
                }
            }*/
        }
        worldPosX = cameraMod.getWorldDirection(vector).x;
        worldPosZ = cameraMod.getWorldDirection(vector).z;
        if(cornerInt == true){
            /*
            if((deg(cameraMod.rotation.y)<0 && worldPosZ<1)){
                if(deg(cameraMod.rotation.y)<-45){
                    cameraMod.position.z -= .25;
                }
                return;
            }
            else if(deg(cameraMod.rotation.y)<0 && worldPosX<1){
                cameraMod.position.z += .25;
                return;
            }
            else if((deg(cameraMod.rotation.z) < -90 || deg(cameraMod.rotation.z) > 90) && worldPosX>1){
                cameraMod.position.x -= .25;
                return;
            }
            else if(deg(cameraMod.rotation.y)>0 && worldPosX<1){
                cameraMod.position.x += .25;
                return;
            }
            */
            if(cornerCol.placement[0] == 'north' && cornerCol.placement[1] == 'east'){
                //console.log('int!');
                if((deg(cameraMod.rotation.y)<0) && worldPosZ>0){
                        cameraMod.position.z += .5;
                }
                else if((deg(cameraMod.rotation.y)>0)){
                    cameraMod.position.x -= .5;
                }
                return;
            }
            else if(cornerCol.placement[0] == 'east' && cornerCol.placement[1] == 'south'){
                if(worldPosZ>0 && worldPosX<0){
                    cameraMod.position.x -= .5;
                }
                else if(worldPosZ<0){
                    cameraMod.position.z -= .5;
                }
                return
            }
            else if(cornerCol.placement[0] == 'south' && cornerCol.placement[1] == 'west'){
                if(worldPosZ<0 && worldPosX<0){
                    cameraMod.position.z -= .5;
                }
                else if(worldPosX<0){
                    cameraMod.position.x += .5;
                }
                return
            }
            else if(cornerCol.placement[0] == 'west' && cornerCol.placement[1] == 'north'){
                if(worldPosZ<0 && worldPosX>0){
                    cameraMod.position.x += .5;
                }
                else if(worldPosZ>0){
                    cameraMod.position.z += .5;
                }
                return
            }
        }
        let multiplyAmount;
        if(face == 'east'){
            multiplyAmount = 1;
            if(deg(cameraMod.rotation.y)>0){
                if(cornerInt == 999){
                    //console.log('hi')
                    //if(cameraMod.position.z > (obj.position.z)){
                    if(cameraMod.position.z >= (obj.ignorePositions[1])){
                        //console.log('right')
                        //console.log(obj)
                        cameraMod.position.x -= .5;
                        cameraMod.position.z = obj.ignorePositions[1];
                    }
                    else{
                        //console.log(obj)
                        //console.log('left')
                        cameraMod.position.x -= .5;
                        cameraMod.position.z = obj.ignorePositions[0];
                    
                    }
                    return;
                }
                else{
                    cameraSkipSide = true;
                }
            }
            else{
                if((cameraMod.rotation.x > 1.6 || cameraMod.rotation.x < -1.6) && cornerInt == true){
                    cameraMod.position.z -= 1;
                }
                selectedWorldPos = worldPosZ
            }
        }
        else if(face == 'north'){
            multiplyAmount = 1;
            if((cameraMod.rotation.x > 1.6 || cameraMod.rotation.x < -1.6)){
                if(cornerInt == 999 ){
                    //if(cameraMod.position.x > (obj.position.x)){
                        if(cameraMod.position.x >= (obj.ignorePositions[1])-5){
                        //console.log('right')
                        //cameraMod.position.z = -293;
                        cameraMod.position.z += 3.5;
                        cameraMod.position.x = obj.ignorePositions[1]-1;
                    }
                    else{
                        //console.log('left')
                        cameraMod.position.z += 3.5;
                        cameraMod.position.x = obj.ignorePositions[0]+1;
                    }
                    return;
                }
                else{
                    cameraSkipSide = true;
                }
            }
            else{
                if(cornerInt == 999){
                    if(deg(cameraMod.rotation.y)>0 && cameraMod.position.x > (obj.position.x) 
                    ||deg(cameraMod.rotation.y)<0 && cameraMod.position.x < (obj.position.x)){
                        cameraMod.position.x -= (.5*(cameraMod.rotation.y/100));
                        return
                    }
                }
                selectedWorldPos = worldPosX;
                //cornerInt = false;
            }
        }
        else if(face == 'west'){
            if(cornerInt == false){
                multiplyAmount = -1;
                if(deg(cameraMod.rotation.y)<0){
                    cameraSkipSide = true;
                }
                else{
                    selectedWorldPos = (worldPosZ * -1);
                }
            }
            
        }
        else{
            if(cornerInt == false){
                multiplyAmount = -1;
                if(deg(cameraMod.rotation.z)<30 && deg(cameraMod.rotation.z)>-30){
                    cameraSkipSide = true;
                }
                else{
                    selectedWorldPos = (worldPosX * -1);
                }
            }
            
        }
        if(cameraSkipSide==false){
            if(face == 'south' || face == 'north'){
                if(connectorWall == true){
                    if(cornerInt == false){
                        cameraMod.position.x += ((.25*(selectedWorldPos*1.5))*multiplyAmount);
                    }
                    else{
                        //cameraMod.position.x += ((.25*(selectedWorldPos*1.5))*multiplyAmount);
                    }
                }
                else{
                    cameraMod.position.x += ((.25*(selectedWorldPos*1.5))*multiplyAmount);
                }
                
            }
            else{
                if(connectorWall == true){
                    if(cornerInt == false){
                        cameraMod.position.z += ((.25*(selectedWorldPos*1.5))*multiplyAmount);
                    }
                    else{
                        //cameraMod.position.x += ((.25*(selectedWorldPos*1.5))*multiplyAmount);
                    }
                }
                else{
                    cameraMod.position.z += ((.25*(selectedWorldPos*1.5))*multiplyAmount);
                }
                //cameraMod.translateX(.25*selectedWorldPos);
                //cameraMod.translateZ(-.25*(selectedWorldPos*selectedWorldPos));
                //cameraMod.position.z += ((.25*(selectedWorldPos*1.5))*multiplyAmount);
            }
            
        }
        else{
            cameraMod.translateZ(-.25);
            cameraSkipSide = false;
        }
        //cameraMod.position.y = yPos;
        //cameraMod.position.y = cameraBobAmount+10;
    }
    else if(cameraBack == true){
        worldPosX = cameraMod.getWorldDirection(vector).x;
        worldPosZ = cameraMod.getWorldDirection(vector).z;
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
            if((cameraMod.rotation.x > 1.6 ||cameraMod.rotation.x < -1.6 )){
                selectedWorldPos = worldPosX;
            }
            else{
                cameraSkipSide = true;
            }
        }
        else if(face == 'west'){
            multiplyAmount = 1;
            if(deg(cameraMod.rotation.y)<0){
                selectedWorldPos = (worldPosZ*-1);
            }
            else{
                cameraSkipSide = true;
            }
        }
        else{
            multiplyAmount = 1;
            if(deg(cameraMod.rotation.z)<30 && deg(cameraMod.rotation.z)>-30){
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
                //cameraMod.translateX(.25*selectedWorldPos);
                //cameraMod.translateZ(-.25*(selectedWorldPos*selectedWorldPos));
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