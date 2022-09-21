class SpellComponent extends Component
{
  ID = 'SPELL'
  constructor(caster, spellCore, marker)
  {
    super()
    this.caster = caster
    this.spellCore = spellCore
    this.marker = marker
    this.indicatorPos = this.marker.screenPos
    this.targetReached = false
  }
  
  setupComplete()
  {
    this.startPos = this.gameObject.pos.copy()
    this.area = this.gameObject.attributeSheet.getAttribute('spell_area')
    this.effectiveness = this.gameObject.attributeSheet.getAttribute('spell_effectiveness')
  }
  
  onTargetReached()
  {
    //this.gameObject.moveTo
    this.targetReached = true
    this.setPhysical()
    this.checkIfDestructionIsDelayed()
  }
  
  setPhysical()
  {
    this.spellCore.distributeEvent({
      type: ExecutionTypes.onTurningPhysical,
      spellEntity: this.gameObject}
    )
    
    this.indicatorPos = this.gameObject.screenPos
    this.isPhysical = true
  }
  
  checkIfDestructionIsDelayed()
  {
    let delayDestruction = false
    
    let modules = this.spellCore.moduleManager.activeModules
    for(let mod of modules.items)
      if(mod.onTargetReached(this))
        delayDestruction = true

    if(delayDestruction)
      this.addDurationComponent()
    else
    {
      this.applyToEntitiesInArea()
      this.destroy()
    }
  }
  
  addDurationComponent()
  {
    let spellEntity = this.gameObject
    let duration = spellEntity.attributeSheet.getAttribute('spell_duration').getModifiedValue()
    
    if(duration > 0)
      spellEntity.addComponent(new SpellDurationComponent(this,duration), true)
  }
  
  destroy()
  {
    this.marker.destroy()
    this.gameObject.destroy()
  }
  
  onDestroy()
  {
    this.spellCore.distributeEvent({
      type: ExecutionTypes.onDestroy,
      spellEntity: this.gameObject
    })
  }
  
  enabledRun()
  {
    this.drawIndicator()
    
    if(this.isPhysical)
      this.applyToEntitiesInArea()
  }
  
  drawIndicator()
  {
    if(this.indicatorPos.x == 0)
      return
    
    let distance = this.marker.pos.copy().subtract(this.gameObject.pos).length()
    
    let progress = this.marker.pos.copy().subtract(this.startPos).length()
    progress = distance/progress
    progress = Math.max(progress,0)
    let area = this.area.getModifiedValue()* this.effectiveness.getModifiedValue()/100
    
    this.drawTravelPath()
    this.drawAreaIndicator(area, progress)
  }
  
  drawTravelPath()
  {
    Paint.line(this.gameObject.screenPos, this.marker.screenPos, 'rgb(255,255,255)', 1, [3,5])
  }
  
  drawAreaIndicator(area, progress)
  {
    Paint.circelOutline(this.indicatorPos, area, 0, Math.PI*2, 'rgb('+255*(1-progress)+',0,'+255*progress+')')
  }
  
  applyToEntitiesInArea()
  {
    this.spellCore.beforeHit(this.gameObject)
    
    let activeEntities = Object.values(_gameManager.runManager.activeEntities)
    
    for(let entity of activeEntities)
      if(this.entityMeetsRequirements(entity))
        this.spellCore.applyToEntity(entity, this.gameObject, this.gameObject.castIndex)
        
    this.spellCore.hitComplete(this.gameObject)
  }
  
  entityMeetsRequirements(entity)
  {
    return (entity != this.gameObject && this.isEntityInArea(entity))
  }
  
  isEntityInArea(entity)
  {
    let pos = entity.pos.copy()
   
    let offsetPos = pos.copy().add(entity.getDimension())
    let center = this.gameObject.pos
    
    let closestX = Math.max(pos.x, Math.min(offsetPos.x, center.x));
    let closestY = Math.max(pos.y, Math.min(offsetPos.y, center.y));
    
    let distX = center.x - closestX;
    let distY = center.y - closestY;
    
    let area = this.area.getModifiedValue()*this.effectiveness.getModifiedValue()/100
    
    return (distX ** 2) + (distY ** 2) <= area ** 2;
  }
}

console.log(SpellComponent.name+' loaded...')