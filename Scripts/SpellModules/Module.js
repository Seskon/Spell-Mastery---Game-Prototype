class Module
{
  constructor()
  {
    this.active = false
  }
  
  setActive(state)
  {
    this.active = state
  }
  
  onEvent(event){
    if(!this.active)
      return
    
    switch(event.type)
    {
      case ExecutionTypes.onTrigger:
        this.onTrigger(event)
        break;
      case ExecutionTypes.beforeCast:
        this.beforeCast(event.spellCore)
        break;
      case ExecutionTypes.onCastRequest:
        this.onCastRequest(event.caster, event.targetPosition, event.spellCore, event.castIndex)
        break;
      case ExecutionTypes.onCast:
        this.onCast(event.spellCore)
        break;
      case ExecutionTypes.afterCast:
        this.afterCast(event.spellEntity)
        break
      case ExecutionTypes.beforeHit:
        this.beforeHit(event.spellEntity)
        break;
      case ExecutionTypes.onHit:
        this.onHit(event.spellEntity, event.hitEntity)
        break;
      case ExecutionTypes.afterHit:
        this.afterHit(event.spellEntity, event.hitEntity)
        break;
      case ExecutionTypes.onHitComplete:
        this.onHitComplete(event.spellEntity)
        break;
      case ExecutionTypes.onDestroy:
        this.onDestroy(event.spellEntity)
        break;
      case ExecutionTypes.onTurningPhysical:
        this.onTurningPhysical(event.spellEntity)
        break;
      default:
        console.log('Module: undefined execution type: '+ event.type)
    }
  }
  
  onEquip(spellCore){}
  onRemove(moduleManager){}
  
  onTargetReached(spellComponent){return false}
  beforeCast(spellCore){}
  onCastRequest(caster, targetPosition, spellCore, castIndex){return false}
  onCast(spellCore){return true}
  afterCast(spellEntity, castIndex){}
  beforeHit(spellEntity){}
  onHit(spellEntity, hitEntity, castIndex){}
  afterHit(spellEntity, hitEntity){}
  onHitComplete(spellEntity){}
  onDestroy(spellEntity){}
  onTurningPhysical(spellEntity){}
  
  onTrigger(triggerType, spellCore, castIndex){}
}

console.log(Module.name+' loaded...')