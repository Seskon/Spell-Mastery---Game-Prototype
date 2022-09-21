class Player extends Entity
{
  size = new Vector2(6,10)
  
  constructor()
  {
    super(0, 0, 'player_mob', 100, 'Wizard')
    
    this.passiveTree.addStartingNode()
    this.lifeProgress.showOnFull = true
  }
  
  onDeath(source)
  {
    window.location.reload(true)
  }
  
  spawnCores()
  {
    _gameManager.player.inventory.storeItem(new SpellCoreItem(0, 0, null, Rarity.unique, ElementalTypes.getRandomType(), 20))
    _gameManager.player.inventory.storeItem(new SpellCoreItem(0, 0, null, Rarity.unique, ElementalTypes.getRandomType(), 20))
    _gameManager.player.inventory.storeItem(new SpellCoreItem(0, 0, null, Rarity.unique, ElementalTypes.getRandomType(), 20))
    _gameManager.player.inventory.storeItem(new SpellCoreItem(0, 0, null, Rarity.unique, ElementalTypes.getRandomType(), 20))
    _gameManager.player.inventory.storeItem(new SpellCoreItem(0, 0, null, Rarity.unique, ElementalTypes.getRandomType(), 20))
    _gameManager.player.inventory.storeItem(new SpellCoreItem(0, 0, null, Rarity.unique, ElementalTypes.getRandomType(), 20))
    _gameManager.player.inventory.storeItem(new SpellCoreItem(0, 0, null, Rarity.unique, ElementalTypes.getRandomType(), 20))
    _gameManager.player.inventory.storeItem(new SpellCoreItem(0, 0, null, Rarity.unique, ElementalTypes.getRandomType(), 20))
    _gameManager.player.inventory.storeItem(new SpellCoreItem(0, 0, null, Rarity.unique, ElementalTypes.getRandomType(), 20))
    _gameManager.player.inventory.storeItem(new SpellCoreItem(0, 0, null, Rarity.unique, ElementalTypes.getRandomType(), 20))
  }
}

console.log(Player.name+' loaded...')