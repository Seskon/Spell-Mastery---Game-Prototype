class AttributeModifier
{
  constructor(modifierType, value, attributeId, condition, requiredTags)
  {
    this.modifierType = modifierType //additive, increase, multi
    this.value = value
    this.attributeId = attributeId //id of the targeted attribute
    this.condition = condition //condition when the mod applies (not imp.)
    this.requiredTags = requiredTags //of spell

    this.setDescription()
  }
  
  isRequieringTag(tag)
  {
    if(tag == null || this.requiredTags == null || this.requiredTags.length == 0)
      return false
    
    for(let rtag of this.requiredTags)
      if(rtag == tag)
        return true

    return false
  }
  
  setDescription()
  {
    this.description = this.modifierType
    this.description += this.value + ' ' 
    this.description += this.attributeId.replace('spell_','').replace('_',' ')
    
    let isRequiringTags = (this.requiredTags != null && this.requiredTags.length != 0)
    this.description += (isRequiringTags ? (' -> ' + this.requiredTags):'')
  }
  
  static getRandom()
  {
    let type = AttributeModifierTypes.additive //AttributeModifierTypes.getRandom()
    let value = Math.round(Math.random()*2)+1//AttributeModifierTypes.getRandomRange(type)
    
    let id = Attribute.getRandomID()
    let condition = null //not impl.
    let isSpellId = id.includes('spell')
    let tags = this.createSpellTags(isSpellId)
    
    return new AttributeModifier(type, value, id, condition, tags)
  }
  
  static createSpellTags(isSpellId)
  {
    let tags = []
    
    if(isSpellId)
    {
      tags.push('spell')
      tags.push(ElementalTypes.getRandomType())
    }
    
    return tags
  }
}

console.log(AttributeModifier.name+' loaded...')