class ElementalTypes
{
  static fire = 'Fire'
  static water = 'Water'
  static earth = 'Earth'
  static lightning = 'Lightning'
  static chaos = 'Chaos'
  static collection = [ElementalTypes.fire, ElementalTypes.water, ElementalTypes.earth, ElementalTypes.lightning, ElementalTypes.chaos]

  static getRandomType()
  {
    let random = Math.round(Math.random() * (ElementalTypes.collection.length-1))
    
    return ElementalTypes.collection[random]
  }
}

console.log(ElementalTypes.name+' loaded...')