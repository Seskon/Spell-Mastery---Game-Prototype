class FPSCoolDownComponent extends Component
{
  ID = 'COOLDOWN'
  value = 0
  isCooled = true
  
  constructor(baseCoolDownTime)
  {
    super()
    
    this.baseCoolDownTime = baseCoolDownTime
    this.coolDownTime = new Attribute('cooldown_time', true, 0)
  }
  
  enabledRun()
  {
    this.coolDown()
  }
  
  coolDown()
  {
    if(this.isCooled)
      return
    
     this.value--
    
    if(this.value <= 0)
      this.isCooled = true
  }
  
  calculateCooldownTime()
  {
    return this.baseCoolDownTime * (1-this.coolDownTime.getModifiedValue()/100) * _gameManager.fps
  }
  
  start()
  {
    this.value = this.calculateCooldownTime()
    
    this.isCooled = false
  }
  
  addModifier(mod)
  {
    if(mod != null)
      this.coolDownTime.addModifier(mod)
  }
  
  removeModifier(mod)
  {
    this.coolDownTime.removeModifier(mod)
  }
}