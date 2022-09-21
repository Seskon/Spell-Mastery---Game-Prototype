class Attribute
{
  static ids = {}
  
  modifierDictionary = {
    '+': new List(),
    '%': new List(),
    '*': new List(),
    '/': new List()
  }
  
  constructor(id, onSpell = false, baseValue = 0)
  {
    this.baseValue = baseValue
    this.constructID(onSpell, id)
  }
  
  constructID(onSpell, id)
  {
    if(onSpell)
      this.setID('spell_'+id)
    else
      this.setID(id)
  }
  
  setID(id)
  {
    this.id = id
    Attribute.ids[this.id] = true
  }
  
  getModifiedValue()
  {
    let add = this.combineModifierValues(
      this.modifierDictionary['+'],0)
    let inc = this.combineModifierValues(
      this.modifierDictionary['%'],0)
    let mult = Math.abs(this.combineModifierValues(
      this.modifierDictionary['*'], 0))
    let divide = Math.abs(this.combineModifierValues(
      this.modifierDictionary['/'], 0))
    
    let value = this.baseValue + add
    value += value / 100 * inc
    value = value * (mult==0?1:mult)
    value = value / (divide==0?1:divide)

    return value
  }
  
  combineModifierValues(modList, value)
  {
    //need to check if modifier condition is met, not in use
    for(let i in modList.items)
      value += modList.items[i].value
    
    return value
  }
  
  addModifier(mod)
  {
    this.modifierDictionary[mod.modifierType].add(mod)
    this.notifySubscriber()
  }
  
  removeModifier(mod)
  {
    this.modifierDictionary[mod.modifierType].remove(mod)
    this.notifySubscriber()
  }
  
  notifySubscriber()
  {
    if(this.eventManager != null)
      this.eventManager.call()
  }
  
  getEventManager()
  {
    if(this.eventManager == null)
      this.eventManager = new EventManager()
    
    return this.eventManager
  }
  
  static getRandomID()
  {
    let keys = Object.keys(Attribute.ids)
    let rand = Math.round(Math.random()*(keys.length-1))
    return keys[rand]
  }
}

console.log(Attribute.name+' loaded...')