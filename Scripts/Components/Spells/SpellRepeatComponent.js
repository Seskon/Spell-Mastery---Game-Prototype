class SpellRepeatComponent extends Component
{
  ID = 'SPELLREPEAT'

  numRepeats = 5
  repeatDelay = 2 * _gameManager.fps
  timer = 0
  castCount = 1
  
  constructor(spellCore, targetPosition, castIndex)
  {
    super()
    
    this.spellCore = spellCore
    this.targetPosition = targetPosition
    this.castIndex = castIndex
  }
  
  setupComplete()
  {
    this.createMarker()
  }
  
  createMarker()
  {
    this.marker = new GameObject(this.targetPosition.x, this.targetPosition.y)
    this.gameObject.scene.addGameObject(this.marker)
  }
  
  enabledRun()
  {
    this.drawIndicator()
    this.runTimer()
  }
  
  runTimer()
  {
    if(this.timer == 0)
      this.repeat()
    
    this.timer--
  }
  
  drawIndicator()
  {
    let pos = this.gameObject.centerPos.copy()
    _gameManager.sceneManager.worldToScreenPos(pos)
    Paint.line(pos, this.marker.screenPos, 'orange', 1)
  }
  
  repeat()
  {
    this.spellCore.requestCast(this.gameObject, this.targetPosition, this.castIndex)
      
    this.timer = this.repeatDelay
    this.increaseCastCount()
  }
  
  increaseCastCount()
  {
    this.castCount++
    if(this.castCount == this.numRepeats)
      this.remove()
  }
  
  remove()
  {
    this.marker.destroy()
    this.gameObject.removeComponent(this)
  }
}

console.log(SpellRepeatComponent.name+' loaded...')