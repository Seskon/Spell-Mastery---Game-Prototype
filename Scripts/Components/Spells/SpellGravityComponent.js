class SpellGravityComponent extends Component
{
  strength = 0.2
  
  constructor(spellComponent)
  {
    super()
    this.spellComponent = spellComponent
  }
  
  enabledRun()
  {
    let activeEntities = Object.values(_gameManager.runManager.activeEntities)
    
    for(let entity of activeEntities)
      if(this.spellComponent.entityMeetsRequirements(entity))
        this.pullEntity(entity)
  }
  
  pullEntity(entity)
  {
    let direction = entity.centerPos.normalizedDirection(this.gameObject.pos)
    direction.multiply(this.strength)
    
    entity.moveTo(direction.add(entity.pos))
  }
}

console.log(SpellGravityComponent.name+' loaded...')