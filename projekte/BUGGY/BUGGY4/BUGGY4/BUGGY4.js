var Killed =false;
var Start = false;
console.log("BUGGY4.js geladen");
function createPlayer(x,angle,z,size, txt, scene) {
    var spriteManager = new BABYLON.SpriteManager("manager", "../../../../Texturen/"+txt,2 , 256, scene);
    var player = new BABYLON.Sprite("player",spriteManager);
    player.position = new BABYLON.Vector3(x,0.1,z);
    player.angle = angle;
    player.size = size;
    spriteManager.isPickable = true;
    player.isPickable = true; 
    return player;
}
function createArea (scene) {
    var GroundMaterial = new BABYLON.StandardMaterial("ground", scene);
    var GroundTexture = new BABYLON.Texture("../../../../Texturen/wiese.png", scene);
    GroundMaterial.diffuseTexture = GroundTexture;
    GroundMaterial.diffuseTexture.uScale = 2.0;
    GroundMaterial.diffuseTexture.vScale = 2.0;
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 20, height: 24, scene});
    ground.material = GroundMaterial;
    //ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.GroundImpostor, {mass:0}, scene);
    return ground;
}
function createObstacle (x,z,scene){
    var obsctacle = BABYLON.Mesh.CreateSphere("sphere2",20 , 2 , scene);
    obsctacle.position = new BABYLON.Vector3(x,1,z)
    obsctacle.physicsImpostor = new BABYLON.PhysicsImpostor(obsctacle, BABYLON.PhysicsImpostor.SphereImpostor, {mass:1}, scene);
    var ObsctacleMaterial = new BABYLON.StandardMaterial("obstacle", scene);
    var ObsctacleTexture = new BABYLON.Texture("../../../Texturen/Mauer.png", scene);
    ObsctacleMaterial.diffuseTexture = ObsctacleTexture;
    obsctacle.material = ObsctacleMaterial;
    return obsctacle;
}
function movePlayer (player,scene) {
    window.addEventListener("click", function(event){
        Start = !Start;
        var pickResult = scene.pickSprite(event.clientX, event.clientY);
        if (pickResult.pickedSprite == player){
            player.cellIndex = 1;
            Killed = true;
        }
        if (!Killed){
            var x = Math.round(Math.random());
            if (x == 0) x = -1;
            var z = Math.round(Math.random());
            if (z == 0) z = -1;
            moveLoop(x,z,150,player);
        }
    });
}
function moveLoop (x, z, time, player) {
    var left = -9; var right = 9;
    var back = -11;  var front = 11;
    var timer = setInterval(function(){
        if  (!Start) {
            clearInterval(timer);
            return;
        }
        if (player.position.x < left || player.position.x > right) x = -x;
        if (player.position.z < back || player.position.z > front) z = -z;
        player.position.x += x;
        player.position.z += z;       
        player.angle = Math.atan2(z,x) + Math.PI/2; 
    }, time);
}