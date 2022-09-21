class AttributeSheet
{
  attributes = {}
  static attributeCollection = {}
  
  addAttribute(attribute)
  {
    if(this.attributes[attribute.id] == null)
      this.attributes[attribute.id] = attribute
  }
  
  removeAttribute()
  {
    if(this.attributes[attribute.id] != null)
      delete this.attributes[attribute]
  }
  
  getAttribute(id)
  {
    return this.attributes[id]
  }
  
  addModifier(mod)
  {
    if(this.attributes[mod.attributeId] != null)
      this.attributes[mod.attributeId].addModifier(mod)
  }
  
  removeModifier(mod)
  {
    if(this.attributes[mod.attributeId] != null)
      this.attributes[mod.attributeId].removeModifier(mod)
  }
}

console.log(AttributeSheet.name+' loaded...')