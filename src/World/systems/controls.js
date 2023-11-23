import{PointerLockControls} from '../../../node_modules/three/examples/jsm/controls/PointerLockControls.js';

function createControls(camera, canvas){
    const controls = new PointerLockControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor= 0.075;
    //controls.listenToKeyEvents(window);
    return controls;
}

export{createControls};