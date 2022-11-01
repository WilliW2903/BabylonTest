function createPlayer (scene) {
    var player = BABYLON.MeshBuilder.CreateSphere("sphere1", {diameter: 2, segments: 32}, scene);
    var PlayerMaterial = new BABYLON.StandardMaterial("player", scene);
    var PlayerTexture = new BABYLON.Texture("../Texturen/holz.jpg", scene);
    PlayerMaterial.diffuseTexture = PlayerTexture;
    player.position.y = 10;
    player.physicsImpostor = new BABYLON.PhysicsImpostor(player, BABYLON.PhysicsImpostor.SphereImpostor, {mass:1,restitution:0,friction:5}, scene);
    player.material = PlayerMaterial;
    return player;
}
function createArea (scene) {
    var GroundMaterial = new BABYLON.StandardMaterial("ground", scene);
    var GroundTexture = new BABYLON.Texture("../Texturen/stein.jpg", scene);
    GroundMaterial.diffuseTexture = GroundTexture;
    GroundMaterial.diffuseTexture.uScale = 24.0;
    GroundMaterial.diffuseTexture.vScale = 24.0;
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 24, height: 24, scene});
    ground.material = GroundMaterial;
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.GroundImpostor, {mass:0}, scene);
    return ground;
}
function createObstacle (x,z,scene){
    var obsctacle = BABYLON.Mesh.CreateSphere("sphere2",20 , 2 , scene);
    obsctacle.position = new BABYLON.Vector3(x,1,z)
    obsctacle.physicsImpostor = new BABYLON.PhysicsImpostor(obsctacle, BABYLON.PhysicsImpostor.SphereImpostor, {mass:1}, scene);
    var ObsctacleMaterial = new BABYLON.StandardMaterial("obstacle", scene);
    var ObsctacleTexture = new BABYLON.Texture("../Texturen/Mauer.png", scene);
    ObsctacleMaterial.diffuseTexture = ObsctacleTexture;
    obsctacle.material = ObsctacleMaterial;
    return obsctacle;
}
function movePlayer (player) {
    window.addEventListener("keydown", function(event){
        var left = -11; var right = 11;
        var back = -10; var front = 10;
        var down = -6;  var up = 6;
        var diff = 0.2;
        var key = event.keyCode;
        if (key == 37) 
            if (player.position.x > left)
                impulse.x = -diff; 
        if (key == 38) 
            if (sphere.position.z < front)
                impulse.z = diff; 
        if (key == 39) 
            if (sphere.position.x < right)
                impulse.x = diff; 
        if (key == 40)
            if (sphere.position.z > back) 
                impulse.z = -diff; 
        if (key == 50)
            if (sphere.position.y < up) 
                sphere.position.y+= diff;
        if (key == 49) 
            if (sphere.position.y > down)
                sphere.position.y-= diff;
        if (key == 13) {
            sphere.position = new BABYLON.Vector3(0,0,1);
        }
    });
}
function setLimits (scene) {
    var northWall = BABYLON.Mesh.CreatePlane("plane1", 20, scene);
    northWall.position.z = 12;
    northWall.physicsImpostor = new BABYLON.PhysicsImpostor (northWall, BABYLON.PhysicsImpostor.PlaneImpostor,{mass:0}, scene);
    northWall.scaling.y = 0.5
    northWall.isVisible = false;
    var southWall = BABYLON.Mesh.CreatePlane("plane1", 20, scene);
    southWall.position.z = -12;
    southWall.physicsImpostor = new BABYLON.PhysicsImpostor (southWall, BABYLON.PhysicsImpostor.PlaneImpostor,{mass:0}, scene);
    southWall.scaling.y = 0.5
    southWall.isVisible = false;
    var eastWall = BABYLON.Mesh.CreatePlane("plane1", 20, scene);
    eastWall.rotation.y = Math.PI/2;
    eastWall.position.x = 12;
    eastWall.physicsImpostor = new BABYLON.PhysicsImpostor (eastWall, BABYLON.PhysicsImpostor.PlaneImpostor,{mass:0}, scene);
    eastWall.scaling.y = 0.5
    eastWall.isVisible = false;
    var westWall = BABYLON.Mesh.CreatePlane("plane1", 20, scene);
    westWall.rotation.y = Math.PI/2;
    westWall.position.x = -12;
    westWall.physicsImpostor = new BABYLON.PhysicsImpostor (westWall, BABYLON.PhysicsImpostor.PlaneImpostor,{mass:0}, scene);
    westWall.scaling.y = 0.5
    westWall.isVisible = false;
}
