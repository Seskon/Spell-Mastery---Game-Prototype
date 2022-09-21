class AttributeModifierTypes 
{
  static additive = '+'
  static increase = '%'
  static multiply = '*'
  static divide = '/'

  static types = [AttributeModifierTypes.additive, AttributeModifierTypes.increase, AttributeModifierTypes.multiply, AttributeModifierTypes.divide]

  static getRandom()
  {
    //add weighed randomness
    let rand = Math.round(Math.random()*(AttributeModifierTypes.types.length-1))
    
    return AttributeModifierTypes.types[rand]
  }
  
  static getRandomRange(type)
  {
    switch(type)
    {
      case AttributeModifierTypes.additive:
        return Math.random()//(Math.random()*2)-1
        break;
      case AttributeModifierTypes.increase:
        return Math.random()*5
        break;
      case AttributeModifierTypes.multiply:
        return Math.random()+1
        break;
      case AttributeModifierTypes.divide:
        return Math.random()+1
        break;
      default : console.log('type: ' + type)
    }
  }
}

console.log('AttributeModifierTypes loaded...')