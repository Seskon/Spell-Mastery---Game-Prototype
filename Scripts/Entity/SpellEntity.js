class SpellEntity extends Entity
{
  overTime = false
  
  constructor(pos, spellCore, caster, targetPosition)
  {
    super(pos.x, pos.y, 'spell', 1, spellCore.elementType+'_Core')
    
    this.sprite.centered = true
    
    this.layer = 1
    this.spellCore = spellCore
    this.caster = caster
    
    this.setupAttributes()
    this.createTargetMarker(targetPosition)
    
    this.addRequiredComponents()
  }
  
  addRequiredComponents()
  {
    this.addSpellComponent()
    this.addTravelComponent()
    this.removeComponent(this.rangeIndicator)
    this.deathTimer.onDeath = (source) => {super.onDeath(source)}
  }
  
  addTravelComponent()
  {
    this.travelComp = new TravelComponent(
      this.marker,
      () => {this.spellComp.onTargetReached()}, 
      this.attributeSheet.getAttribute('spell_move_speed')
    )
      
    this.addComponent(this.travelComp)
  }
  
  setNewTarget(pos)
  {
    this.marker.pos = pos
    this.travelComp.enabled = true
    this.spellComp.targetReached = false
  }
  
  addSpellComponent()
  {
    this.spellComp = new SpellComponent(this.caster, this.spellCore, this.marker)
    this.addComponent(this.spellComp)
  }
  
  createTargetMarker(pos)
  {
    this.marker = new GameObject(pos.x, pos.y)
    this.marker.pos = pos
    //this.marker.addComponent(new CircleRenderComponent(2,'red'))
    this.addChild(this.marker)
  }
  
  setupAttributes()
  {
    super.setupAttributes()
    
    this.attributeSheet.addAttribute(
      new Attribute('effectiveness', true, 100))
      
    this.attributeSheet.addAttribute(
      new Attribute('damage', true, 10))
    
    this.attributeSheet.addAttribute(
      new Attribute('area', true, 5))
      
    this.attributeSheet.addAttribute(
      new Attribute('critical_chance', true, 0))
      
    this.attributeSheet.addAttribute(
      new Attribute('duration', true, 0))
      
    this.attributeSheet.addAttribute(
      new Attribute('heal', true, 10))
      
    this.attributeSheet.addAttribute(
      new Attribute('chance_to_blind', true, 10))
      
    this.attributeSheet.addAttribute(
      new Attribute('chance_to_stun', true, 10))
      
    this.attributeSheet.addAttribute(
      new Attribute('move_speed', true, 30))
      
    this.getModifierFromSpellCore()
  }
  
  getModifierFromSpellCore()
  {
    if(this.spellCore == null)
      return

    let modifier = List.merge(
      this.spellCore.attributeModifierCollector_temp.getModifierList(),
      this.spellCore.attributeModifierCollector_equip.getModifierList())
  
    for(let i in modifier.items)
      this.attributeSheet.addModifier(modifier.items[i])
  }
  
  destroy()
  {
    this.onDeathTriggerEvent()
    super.destroy()
  }
}

console.log(SpellEntity.name+' loaded...')