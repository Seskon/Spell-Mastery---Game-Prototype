class AttributeModifierCollector
{
  collection = {}
  tagDictionary = {}
  
  addTag(tag)
  {
    this.tagDictionary[tag] = true
  }
  
  removeTag(tag)
  {
    delete this.tagDictionary[tag]
  }
  
  addAttributeModifier(mod)
  {
    if(this.isMatchingModifierRequirement(mod.requiredTags))
      this.addToCollection(mod)
  }
  
  addToCollection(mod)
  {
    if(this.collection[mod.attributeId] == null)
      this.collection[mod.attributeId] = new List()
      
    this.collection[mod.attributeId].add(mod)
  }
  
  addModifierList(modList)
  {
    for(let mod of modList.items)
      this.addAttributeModifier(mod)
  }
  
  isMatchingModifierRequirement(requiredTags)
  {
    if(requiredTags == null || requiredTags.length == 0)
      return true
    
    for(let rtag of requiredTags)
      if(this.tagDictionary[rtag] == null || !this.tagDictionary[rtag])
        return false
    
    return true
  }
  
  removeAttributeModifier(mod)
  {
    this.collection[mod.attributeId].remove(mod)
  }
  
  merge(collector)
  {
    let keys = Object.keys(collector)
    for(let key of keys)
      this.addModifierList(collector[key])
  }
  
  getModifierList()
  {
    let keys = Object.keys(this.collection)
    let mods = new List()
    
    for(let key of keys)
      mods = List.merge(mods,this.collection[key])
      
    return mods
  }
  
  getModifierWithID(id)
  {
    return this.collection[id]
  }
  
  getCombinedModifierDescription()
  {
    let descriptions = []
    
    let keys = Object.keys(this.collection)

    for(let key of keys)
    {
      let value = 0
      for(let mod of this.collection[key].items)
        value += mod.value
        
      descriptions.push('+ '+value+' '+key.replace('spell_','').replace('_',' '))
    }
    
    return descriptions
  }
  
  clear()
  {
    this.collection = {}
  }
}

console.log(AttributeModifierCollector.name+' loaded...')