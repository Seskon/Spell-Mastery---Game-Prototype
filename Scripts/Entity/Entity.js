class Entity extends GameObject
{
  attributeSheet = new AttributeSheet()
  passiveTree = new PassiveTree(this)
  modifierCollector_spell = new List()
  
  typeTag = 'mob'
  eventManager = new EventManager()
  canCast = true
  
  constructor(x, y, typeTag, life, src)
  {
    super(x,y)
    
    this.centerPos = this.calculateCenterPos(x,y)
    this.src = src
    this.typeTag = typeTag
    this.setupAttributes()
    this.setupComponents()
    this.setupPools(life)

    this.layer = 1
  }
  
  calculateCenterPos(x,y)
  {
    let dim = this.getDimension().copy().divide(2)
    return new Vector2(x + dim.x, y + dim.y)
  }
  
  moveTo(pos)
  {
    super.moveTo(pos)
    this.centerPos.copyValues(this.calculateCenterPos(pos.x, pos.y))
  }
  
  distributeModifierList(modifierList)
  {
    for(let mod of modifierList.items)
      this.distributeModifier(mod)
  }
  
  distributeModifier(mod)
  {
    if(mod.isRequieringTag('spell'))
      this.distributeSpellModifier(mod)
    else
      this.attributeSheet.addModifier(mod)
  }
  
  distributeSpellModifier(mod)
  {
    this.modifierCollector_spell.add(mod)
        
    this.eventManager.call({
      type:'modification',
      modifier:mod
    })
  }
  
  setupComponents()
  {
    this.sprite = new SpriteComponent(this.src)
    this.addComponent(this.sprite)
    
    this.inventory = new InventoryComponent(this)
    this.addComponent(this.inventory)
    
    this.equipment = new EquipmentComponent(this)
    this.addComponent(this.equipment)
    
    this.rangeIndicator = new RangeIndicatorComponent()
    this.addComponent(this.rangeIndicator)
    
    this.lifeProgress = new ProgressBarComponent(new Vector2(0,-5), new Vector2(20, 3), 'gray', 'red', false)
    this.addComponent(this.lifeProgress)
    
    this.deathTimer = new DeathTimerComponent()
    this.addComponent(this.deathTimer)
  }
  
  setupAttributes()
  {
    this.attributeSheet.addAttribute(
      new Attribute('fire_resistance', 0))
      
    this.attributeSheet.addAttribute(
      new Attribute('water_resistance', 0))
      
    this.attributeSheet.addAttribute(
      new Attribute('earth_resistance', 0))
      
    this.attributeSheet.addAttribute(
      new Attribute('air_resistance', 0))
      
    this.attributeSheet.addAttribute(
      new Attribute('move_speed', false, 30))
      
    this.attributeSheet.addAttribute(
      new Attribute('range', false, 60))
  }
  
  onDeathTriggerEvent()
  {
    this.eventManager.call(
    {
      type: ExecutionTypes.onTrigger,
      triggerType: SpellTriggerTypes.onDeath,
      targetPos: this.centerPos,
      caster: this
    })
  }
  
  onDeath(source)
  {
    this.destroy()
  }
  
  setupPools(life)
  {
    this.life = new AttributePool("life",life,this.attributeSheet, 
      this.lifeProgress, (source) => {this.deathTimer.onDeath(source)}
    )
    
    /*this.mana = new AttributePool("mana",mana,this.attributeSheet,
      this.manaProgress, ()=>{}
    )*/
  }
}

console.log(Entity.name+' loaded...')