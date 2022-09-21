class SpellStunComponent extends SpellDurationComponent
{
  ID = 'STUN'
  stun = true
  
  constructor(spellComponent, duration)
  {
    super(spellComponent, duration, false)
  }
  
  enabledRun()
  {
    super.enabledRun()
    
    this.gameObject.canCast = !this.stun
  }
  
  onDurationOver()
  {
    super.onDurationOver()
    
    this.stun = false
    this.gameObject.removeComponent(this)
  }
}

console.log(SpellStunComponent.name+' loaded...')