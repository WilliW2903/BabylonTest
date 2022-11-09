function createPlayer(x,angle,z,size,scene) {
    var spriteManager = new BABYLON.SpriteManager("manager", "../../Texturen/Insekt2.png", 1, 256, scene);
    var player = new BABYLON.Sprite("player",spriteManager);
    player.position = new BABYLON.Vector3(x,0.1,z);
    player.angle = angle;
    player.size = size;
    return player;
}
function createArea (scene) {
    var GroundMaterial = new BABYLON.StandardMaterial("ground", scene);
    var GroundTexture = new BABYLON.Texture("../../../Texturen/wiese.png", scene);
    GroundMaterial.diffuseTexture = GroundTexture;
    GroundMaterial.diffuseTexture.uScale = 2.0;
    GroundMaterial.diffuseTexture.vScale = 2.0;
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 24, height: 24, scene});
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
function movePlayer (player) {
    window.addEventListener("click", function(event){
        var pickResult = scene.pick(event.clientX, event.clientY);
        if (pickResult.hit) {
            var xDiff = pickResult.pickedPoint.x - player.position.x;
            var zDiff = pickResult.pickedPoint.z - player.position.z;
            var distance = Math.sqrt(xDiff * xDiff + zDiff * zDiff);
            var angle = Math.atan2(zDiff, xDiff);
            angle = angle + Math.PI/2
            player.angle = angle;
            var x = xDiff/distance;
            var z = zDiff/distance;
            for (Nr = 0; Nr < distance;Nr++){
                player.position.x += x;
                player.position.z += z;   
            }
        }
    });
}