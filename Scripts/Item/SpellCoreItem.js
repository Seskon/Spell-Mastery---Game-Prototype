class SpellCoreItem extends Item
{
  //targetEntityType = self
  attributeModifierCollector_temp = new AttributeModifierCollector()
  attributeModifierCollector_equip = new AttributeModifierCollector()
  
  isInUse = false
  isTriggered = false
  baseCooldownTime = 5
  spellIconSize = 6

  constructor(x = 0, y = 0, modules = null, rarity = Rarity.getRandom(), elementType = ElementalTypes.getRandomType(), level = 1)
  {
    super(x, y, elementType + "_Core", rarity, 'core', null)
    
    this.scene = _gameManager.mainScene
    this.elementType = elementType
    this.setupCooldownComponent()
    
    this.moduleManager = new ModuleManager(this, modules, level)
    
    this.setupBaseTags()
    this.modifierList.clear()
  }
  
  setupBaseTags()
  {
    this.attributeModifierCollector_equip.clear()
    this.attributeModifierCollector_equip.addTag('spell')
    this.attributeModifierCollector_equip.addTag(this.elementType)
  }
  
  setupCooldownComponent()
  {
    this.coolDownComp = new FPSCoolDownComponent(this.baseCooldownTime)
    this.addComponent(this.coolDownComp)
  }
  
  requestCast(caster, targetPosition, castIndex, triggered = false)
  {
    if(castIndex == 0 && !this.isCastable(caster, triggered))
      return false

    this.prepareCast(caster, targetPosition, castIndex)

    if(this.isAnyModuleIntercepting(caster, targetPosition, castIndex))
      return true
  
    if(castIndex != 0 || this.isCastable(caster, triggered))
      this.cast(caster, targetPosition)
      
    return true
  }
  
  prepareCast(caster, targetPosition, castIndex)
  {
    if(castIndex == 0)
      this.setupNewCast()

    this.limitTargetPosition(caster, targetPosition)
  }
  
  isAnyModuleIntercepting(caster, targetPosition, castIndex)
  {
    let modules = this.moduleManager.activeModules.items
    for(let i = castIndex; i < modules.length; i++)
      if(this.isModuleIntercepting(modules[i],caster,targetPosition,i))
        return true

    return false
  }
  
  isModuleIntercepting(module,caster,targetPosition,i)
  {
    return module.onCastRequest(caster, targetPosition, this, i+1)
  }
  
  limitTargetPosition(caster, targetPosition)
  {
    let halfDim = caster.getDimension().copy().divide(2)
    let centerPos = halfDim.add(caster.pos)
    targetPosition.subtract(centerPos)
    
    let range = caster.attributeSheet.getAttribute('range').getModifiedValue()
    
    let mult = targetPosition.length() - range

    if(mult > 0)
      targetPosition.multiply((1 - mult/targetPosition.length()))
    
    targetPosition.add(centerPos)
  }
  
  setupNewCast()
  {
    this.attributeModifierCollector_temp.clear()
    this.attributeModifierCollector_temp.addTag('spell')
    this.attributeModifierCollector_temp.addTag(this.elementType)
    this.distributeEvent({type: ExecutionTypes.beforeCast})
  }
  
  isCastable(caster, triggered)
  {
    if(this.isInUse)
      return false
      
    if(this.isTriggered && !triggered)
      return false

    if(!caster.canCast)
      return false

    if(!this.coolDownComp.isCooled)
      return false

    if(this.owner.deathTimer.died && !triggered)
      return false

    return true
  }

  cast(caster, targetPosition)
  {
    this.coolDownComp.start()
    this.createSpellEntity(caster, targetPosition)
  }
  
  createSpellEntity(caster, targetPosition)
  {
    let pos = this.calculateSpellSpawnPosition(caster, targetPosition)
    
    let spellEntity = new SpellEntity(pos, this, caster, targetPosition)
    this.scene.addGameObject(spellEntity)
    
    this.distributeEvent({
      type: ExecutionTypes.afterCast,
      spellEntity: spellEntity,
    })
  }
  
  //FIX: using fixed iconsize is problematic with physical spells
  calculateSpellSpawnPosition(caster, targetPosition)
  {
    let dimensions = caster.getDimension().copy()
    dimensions.add(new Vector2(this.spellIconSize*2))
    
    let rectPos = caster.pos.copy()
    rectPos.subtract(new Vector2(this.spellIconSize))
    
    if(Utility.isPositionInsideArea(rectPos,dimensions,targetPosition))
      return rectPos.add(dimensions.divide(2))
      
    return Utility.pointOnRectangle(targetPosition,rectPos,dimensions)
  }
  
  onEquip()
  {
    this.owner.eventManager.subscribe(
      (event) => {this.distributeEvent(event)})
      
    this.refreshModifier()
    
    this.addCooldownModifierList(
      this.attributeModifierCollector_equip.getModifierWithID('spell_cooldown_time'))
  }
  
  refreshModifier()
  {
    this.setupBaseTags()
    this.attributeModifierCollector_equip.addModifierList(this.owner.modifierCollector_spell)
  }
  
  setOwner(owner)
  {
    if(owner == null || this.owner == owner)
      return

    super.setOwner(owner)
    owner.eventManager.subscribe((event) => {this.onOwnerChange(event)})
  }
  
  onOwnerChange(event)
  {
    if(event.type == 'modification')
      this.refreshModifier()
  }
  
  addCooldownModifierList(list)
  {
    if(list == null)
      return
    
    for(let mod of list.items)
      this.coolDownComp.addModifier(mod)
  }
  
  beforeHit(spellEntity)
  {
    this.distributeEvent({
      type: ExecutionTypes.beforeHit,
      spellEntity: spellEntity
    })
  }
  
  applyToEntity(entity, spellEntity)
  {
    this.distributeEvent({
      type: ExecutionTypes.onHit,
      hitEntity: entity,
      spellEntity: spellEntity
    })
    
    this.distributeEvent({
      type: ExecutionTypes.afterHit,
      hitEntity: entity,
      spellEntity: spellEntity
    })
    
    spellEntity.caster.eventManager.call({
      type: ExecutionTypes.onTrigger,
      triggerType: SpellTriggerTypes.onHit,
      targetPos: entity.centerPos,
      caster: spellEntity.caster
    })
  }
  
  hitComplete(spellEntity)
  {
    this.distributeEvent({
      type: ExecutionTypes.onHitComplete,
      spellEntity: spellEntity
    })
  }
  
  distributeEvent(event)
  {
    if(event.type == 'modification')
      this.distributeModificationEvent(event)
    else
    {
      event.spellCore = this
      this.moduleManager.distributeEvent(event)
    }
  }
  
  distributeModificationEvent(event)
  {
    if(event.modifier == null)
      return
    
    if(event.modifier.attributeId == 'spell_cooldown_time')
      this.coolDownComp.addModifier(event.modifier)
    else
      this.attributeModifierCollector_equip.addAttributeModifier(event.modifier)
  }
  
  display()
  {
    let scene = _gameManager.sceneManager.openScene(SpellCoreDisplayScene, true)
    scene.displayModules(this.moduleManager)
  }
}

console.log(SpellCoreItem.name+' loaded...')