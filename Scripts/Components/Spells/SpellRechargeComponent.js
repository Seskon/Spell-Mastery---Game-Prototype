class SpellRechargeComponent extends Component
{
  ID = 'SPELLRECHARGE'
  
  rechargeDelay = 3 * _gameManager.fps
  rechargeTime = 4 * _gameManager.fps
  rechargeValue = 2
  
  setupComplete()
  {
    this.gameObject.eventManager.subscribe(
      (event) => {
        if(this.isOnDamageTakenEvent(event))
          this.onDamageTaken()
      }
    )
  }
  
  isOnDamageTakenEvent(event)
  {
    return (event.type == ExecutionTypes.onTrigger && event.triggerType == SpellTriggerTypes.onDamageTaken)
  }
  
  onDamageTaken()
  {
    this.timer = this.rechargeDelay
    this.isRecharging = false
  }
  
  enabledRun()
  {
    this.runTimer()
  }
  
  runTimer()
  {
    if(this.timer > 0)
      this.timer--
      
    if(this.timer == 0 && !this.isRecharging)
      this.onTimerEnd()
    
    if(this.timer != 0 && this.isRecharging)
      this.recharge()
  }
  
  recharge()
  {
    let effectiveness = this.gameObject.attributeSheet.getAttribute('spell_effectiveness').getModifiedValue()
      
    this.gameObject.life.heal(this.rechargeValue * effectiveness)
  }
  
  onTimerEnd()
  {
    this.isRecharging = true
    this.timer = this.rechargeTime
  }
}

console.log(SpellRechargeComponent.name+' loaded...')