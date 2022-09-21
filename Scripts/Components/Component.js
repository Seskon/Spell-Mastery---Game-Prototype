class Component{
  
  ID = '***'
  
  constructor()
  {
    this.enabled = true
    this.active = true
  }
  
  setGameObject(gameObject)
  {
    this.gameObject = gameObject
    this.active = gameObject.active
    this.setupComplete()
  }
  
  setupComplete(){ }
  
  run()
  {
    if(this.enabled && this.active)
      this.enabledRun()
  }
  
  enabledRun(){}
  onDestroy(){}
}

console.log(Component.name+' loaded...')