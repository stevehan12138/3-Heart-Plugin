const sys = server.registerSystem(0, 0);

sys.initialize = function (){
    server.log("3 heart mod by Fjun loaded"); 

    sys.listenForEvent<IBlockDestructionStartedEventData>("minecraft:block_destruction_started", eventData =>{
        let player = eventData.data.player;
        let playerName = sys.getComponent<INameableComponent>(player, MinecraftComponent.Nameable).data.name;
        setHeart(player, playerName, 0, 4, 6);
        setHeart(player, playerName, 5, 9, 8);
        setHeart(player, playerName, 10, 14, 10);
        setHeart(player, playerName, 15, 19, 12);
        setHeart(player, playerName, 20, 24, 14);
        setHeart(player, playerName, 25, 29, 16);
        setHeart(player, playerName, 30, 34, 18);
        setHeart(player, playerName, 35, 39, 20);
        setHeart(player, playerName, 40, 44, 22);
        setHeart(player, playerName, 45, 49, 24);
        setHeart(player, playerName, 50, 54, 26);
        setHeart(player, playerName, 55, 59, 28);
        setHeart(player, playerName, 60, 64, 30);
        setHeart(player, playerName, 65, 69, 32);
        setHeart(player, playerName, 70, 74, 34);
        setHeart(player, playerName, 75, 79, 36);
        setHeart(player, playerName, 80, 84, 38);
        setHeart(player, playerName, 85, 89, 40);
        setHeart(player, playerName, 90, 94, 42);
        setHeart(player, playerName, 95, 99, 44);
        setHeart(player, playerName, 100, 104, 46);
        setHeart(player, playerName, 105, 109, 48);
        setHeart(player, playerName, 110, 114, 50);
        setHeart(player, playerName, 115, 119, 52);
        setHeart(player, playerName, 120, 124, 54);
        setHeart(player, playerName, 125, 129, 56);
        setHeart(player, playerName, 130, 134, 58);
        setHeart(player, playerName, 135, 23333, 60);
    });
}

function setHeart(player: IEntity, playerName: string, min: number, max: number, maxhp: number){
    sys.executeCommand("testfor @a[name=" + playerName + ",lm=" + min + ",l=" + max + "]", data =>{
        let jsonData: ITestFor = JSON.parse(JSON.stringify(data));
        //当有玩家时statusCode为0
        if(jsonData.statusCode == 0){
            if(jsonData.victim[0] == playerName){
                let health = sys.getComponent<IHealthComponent>(player, MinecraftComponent.Health);
                health.data.max = maxhp;
                if(health.data.value > maxhp){health.data.value = maxhp}
                sys.applyComponentChanges(player, health);
            }
        }
    })
}

interface ITestFor{
    statusCode: number;
    statusMessage : string;
    victim : any;
}