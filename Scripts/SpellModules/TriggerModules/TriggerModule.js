class TriggerModule extends Module
{
  constructor(triggerType)
  {
    super()
    this.triggerType = triggerType
  }
  
  onEquip(spellCore)
  {
    spellCore.isTriggered = true
  }
  
  onRemove(moduleManager){
    moduleManager.spellCore.isTriggered = false
  }
  
  //applys to caster when equipped
  onEvent(event)
  {
    if(event.triggerType != this.triggerType)
      return

    event.spellCore.requestCast(event.caster, event.targetPos, 0, true)
  }
}