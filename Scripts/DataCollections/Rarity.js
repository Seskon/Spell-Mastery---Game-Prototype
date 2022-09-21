class Rarity
{
  static normal = [0, 'normal', 'black']
  static magic = [1, 'magic', 'blue']
  static rare = [2, 'rare', 'purple']
  static unique = [3, 'unique', 'red']
  
  static getRandom()
  {
    let rand = Math.random()
    if(rand < 0.75)
      return Rarity.normal
    if(rand < 0.90)
      return Rarity.magic
    if(rand < 0.98)
      return Rarity.rare
    else
      return Rarity.unique
  }
}

console.log(Rarity.name+' loaded...')