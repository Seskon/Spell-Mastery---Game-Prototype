class SpellStackComponent extends Component
{
  ID = 'SPELLSTACK'
  
  targets = {}
  
  addTarget(target, stackModule)
  {
    let id = target.ID
    if(this.targets[id] == null)
    {
      this.targets[id] = [target, stackModule]
      target.eventManager.subscribe((event) => {this.onKill(event, id)})
    }
  }
  
  onKill(event, id)
  {
    if(event.triggerType == SpellTriggerTypes.onDeath)
      delete this.targets[id]
  }
  
  /*onDestroy()
  {
    let keys = Object.keys(this.targets)
    
    for(let key of keys)
      this.removeFromModule(this.targets[key])
  }
  
  removeFromModule(entry)
  {
    if(entry != null)
      entry[1].deleteStackOfTarget(entry[0].ID)
  }*/
  
  enabledRun()
  {
    this.drawStackIndicator()
  }
  
  drawStackIndicator()
  {
    let keys = Object.keys(this.targets)
    
    for(let key of keys)
      this.drawConnection(this.targets[key])
  }
  
  drawConnection(entry)
  {
    let from = this.gameObject.centerPos.copy()
    _gameManager.sceneManager.worldToScreenPos(from)
    
    let to = entry[0].centerPos.copy()
    _gameManager.sceneManager.worldToScreenPos(to)
    
    let count = entry[1].getCounter(entry[0].ID)
    Paint.line(from, to, 'orange', count)
  }
}

console.log(SpellStackComponent.name+' loaded...')