var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };

var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0,30,0), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    light.specular = new BABYLON.Color3(0,0,0);
    //scene.enablePhysics (new BABYLON.Vector3(0,-10,0),new BABYLON.OimoJSPlugin());
    
    console.log("Aufruf createArea");
    var ground = createArea(scene);
    
    console.log("Aufruf createArea 2");
    /* for (Nr = 0; Nr <  5; Nr++)
        createObstacle(Math.random()*22-12, Math.random()*22-12,scene);*/
    var player = createPlayer(0,0,0,3,"Insekt1.png", scene);
    movePlayer(player,scene);
    moveLoop()
    //camera.lockedTarget = player;
    return scene;
};


window.initFunction = async function() {
    
    
    var asyncEngineCreation = async function() {
        try {
        return createDefaultEngine();
        } catch(e) {
        console.log("the available createEngine function failed. Creating the default engine instead");
        return createDefaultEngine();
        }
    }

    window.engine = await asyncEngineCreation();
    if (!engine) throw 'engine should not be null.';
    startRenderLoop(engine, canvas);
    window.scene = createScene();
};
initFunction().then(() => {sceneToRender = scene                    
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});