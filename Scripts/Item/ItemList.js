class ItemList
{
  numberOfItems = 0

  normal = new List()
  magic = new List()
  rare = new List()
  unique = new List()

  rarity = {
    'normal': this.normal,
    'magic': this.magic,
    'rare': this.rare,
    'unique': this.unique
  }

  addItem(item)
  {
    this.rarity[item.rarity[1]].add(item)
    this.numberOfItems++
  }

  removeItem(item)
  {
    if(this.rarity[item.rarity[1]].remove(item))
    {
      this.numberOfItems--
      return true
    }
    
    return false
  }
  
  getAllItemsAsArray()
  {
    return [... this.unique.items, ...this.rare.items, ...this.magic.items, ...this.normal.items]
  }
}

console.log(ItemList.name+' loaded...')