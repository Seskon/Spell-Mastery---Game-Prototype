class GameObject {

  static counter = {}
  layer = 1
  enabled = true
  runned = false

  screenPos = new Vector2()
  isGUIElement = false
  
  components = new List()
  children = new List()
  parent = null

  constructor(x, y)
  {
    this.pos = new Vector2(x,y)
    this.calculateScreenPosition()
    this.constructID()
    this.setActive(true)
    
    return this
  }
  
  constructID()
  {
    GameObject.increaseIDCounter(this.constructor.name)
    let className = this.constructor.name
    this.ID = className + GameObject.counter[className]
  }
  
  static increaseIDCounter(className)
  {
    if(GameObject.counter[className] == null)
      GameObject.counter[className] = 0
      
    GameObject.counter[className] += 1
  }
  
  setActive(state)
  {
    this.active = state
    
    for (let index in this.children.items)
      this.children.items[index].setActive(state)
      
    for (let index in this.components.items)
      this.components.items[index].active = state
  }

  addComponent(component, once)
  {
    if(component == null || !(component instanceof Component))
      return false
    
    if (once && this.getComponent(component.ID) != null)
      return false

    this.components.add(component)
    component.setGameObject(this)
    return true
  }
  
  removeComponent(component)
  {
    this.components.remove(component)
  }

  addChild(child)
  {
    if(child instanceof GameObject)
    {
      if (child.parent != this)
      {
        this.children.add(child)
        child.setActive(this.active)

        if (child.parent == null && child.scene != null)
          child.scene.removeGameObject(child)

        child.parent = this
        child.setScene(this.scene)
      }
    }
  }
  
  removeChild(child)
  {
    if(child == null)
      return

    child.parent = null
    this.children.remove(child)
  }

  run()
  {
    if (!this.enabled || this.runned || !this.active)
      return

    this.runned = true

    this.calculateScreenPosition()
    this.runAllComponents()
    this.runAllChildren()
  }

  runAllChildren()
  {
    for (let child of this.children.items)
    {
      child.run()
      child.runned = false
    }
  }

  runAllComponents()
  {
    for (let comp of this.components.items)
      if(comp != null)
        comp.run()
  }

  calculateScreenPosition()
  {
    this.screenPos.copyValues(this.pos)
    
    if(!this.isGUIElement)
      _gameManager.sceneManager.worldToScreenPos(this.screenPos)
  }

  getComponent(ID)
  {
    for (let comp of this.components.items) 
      if (comp.ID == ID)
        return comp

    return null
  }

  destroy()
  {
    this.removeComponents()
    this.setActive(false)
    
    if(this.parent != null)
      this.parent.removeChild(this)
    else
      this.removeFromScene()
  }
  
  removeFromScene()
  {
    if(this.scene == null)
      return
    
    if(this.isGUIElement)
      this.scene.removeGUIObject(this)
    else
      this.scene.removeGameObject(this)
  }
  
  removeComponents()
  {
    for(let comp of this.components.items)
        comp.onDestroy()
    
    this.components.clear()
  }

  moveTo(pos)
  {
    if(pos == null)
      return
    
    this.pos.copyValues(pos)

    if(this.parent == null && this.scene != null)
      this.scene.updateGameObject(this)
  }
  
  setScene(scene)
  {
    this.scene = scene

    for(let child of this.children.items)
      child.setScene(scene)
  }
  
  getDimension()
  {
    var comp = this.getComponent('DIMENSION')
    return comp == null ? new Vector2() : comp.dimension
  }
}

console.log(GameObject.name+' loaded...')