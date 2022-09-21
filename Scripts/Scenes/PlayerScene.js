class PlayerScene extends Scene
{
  load()
  {
    this.name = PlayerScene.name
    this.player = new Player()
    this.addGameObject(this.player)
    _gameManager.sceneManager.cameraTarget = this.player
    _gameManager.player = this.player
    
    this.playerGUI = new GameObject(0,0)
    this.addGUIObject(this.playerGUI)
    this.playerGUI.addComponent(new CastWheelComponent(1,this.player))
    
    this.inventoryButton = new GameObject(0,0)
    this.inventoryButton.addComponent(new InventoryButton())
    this.addGUIObject(this.inventoryButton)
    
    this.playerController = new PlayerController(3,this.player)
    this.addGUIObject(this.playerController)
    
    let core = new SpellCoreItem(0,0, [[3,true]], Rarity.normal,ElementalTypes.getRandomType())

    this.player.inventory.storeItem(core)
    /*this.player.inventory.storeItem(new SpellCoreItem(0,0,null,Rarity.unique,ElementalTypes.getRandomType(),20))
    this.player.inventory.storeItem(new SpellCoreItem(0,0,null,Rarity.unique,ElementalTypes.getRandomType(),20))
    this.player.inventory.storeItem(new SpellCoreItem(0,0,null,Rarity.unique,ElementalTypes.getRandomType(),20))
    this.player.inventory.storeItem(new SpellCoreItem(0,0,null,Rarity.unique,ElementalTypes.getRandomType(),20))
    this.player.inventory.storeItem(new SpellCoreItem(0,0,null,Rarity.unique,ElementalTypes.getRandomType(),20))
    this.player.inventory.storeItem(new SpellCoreItem(0,0,null,Rarity.unique,ElementalTypes.getRandomType(),20))
    this.player.inventory.storeItem(new SpellCoreItem(0,0,null,Rarity.unique,ElementalTypes.getRandomType(),20))*/
    
    
  }
}

console.log(PlayerScene.name+' loaded...')