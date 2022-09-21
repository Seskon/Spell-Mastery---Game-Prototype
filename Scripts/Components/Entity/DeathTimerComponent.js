class DeathTimerComponent extends Component
{
  ID = 'DEATH'
  deathDelay = 5*_gameManager.fps
  ressurectDelay = 1*60*_gameManager.fps
  healTimer = 0
  deathTimer = 0
  
  setupComplete()
  {
    let offset = this.gameObject.lifeProgress.offset
    let dimension = this.gameObject.lifeProgress.dimension
    
    this.healTimerProgress = new ProgressBarComponent(offset, dimension, 'black', 'white', false)
    this.healTimerProgress.enabled = false
    
    this.healTimerProgress.setMaxValue(this.deathDelay)
    this.gameObject.addComponent(this.healTimerProgress)
  }
  
  enabledRun()
  {
    this.runTimer()
    
    let life = this.gameObject.life
    let lifeValue = life.getCurrentValue()
    
    if(lifeValue > 0)
    {
      this.gameObject.lifeProgress.enabled = true
      this.died = false
      this.source = null
      this.healTimerProgress.enabled = false
    }
    
    if(this.healTimer <= 0 && this.died)
      return this.gameObject.onDeath(this.source)
  }
  
  onDeath(source)
  {
    if(this.died)
      return 
    
    if(this.deathTimer > 0)
      return this.gameObject.onDeath(source)
    
    this.deathTimer = this.ressurectDelay
    this.healTimer = this.deathDelay

    this.died = true
    this.gameObject.lifeProgress.enabled = false
    this.healTimerProgress.enabled = true
      
    this.gameObject.onDeathTriggerEvent()
      
    if(this.source == null)
      this.source = source
  }
  
  runTimer()
  {
    if(this.healTimer > 0)
      this.healTimer--
    
    this.healTimerProgress.setCurrentValue(this.healTimer)

    if(this.deathTimer > 0)
      this.deathTimer--
  }
}