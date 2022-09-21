class ReserveModule extends Module
{
  static displayName = 'Reserve'
  static description = ['The reserve module reduces the life pool of the caster while active. The spell stays active till cast again. The spell is bound to the caster']

  instance = null

  constructor()
  {
    super()
    
    this.pos = new Vector2()
    this.modifier = new AttributeModifier(
      AttributeModifierTypes.additive,
      -25,
      'life_reserved',
      null,null
    )
  }

  onCastRequest(caster, targetPosition, spellCore, castIndex)
  {
    if(this.instance != null)
    {
      this.instance.spellComp.destroy()
      return true
    }

    return false
  }
  
  afterCast(spellEntity)
  {
    this.instance = spellEntity
    this.instance.overTime = true
    this.calculatePosition()
    this.instance.moveTo(this.pos)
    spellEntity.setNewTarget(this.pos)
    spellEntity.caster.attributeSheet.addModifier(this.modifier)
  }
  
  calculatePosition()
  {
    let dim = this.instance.caster.getDimension().copy().divide(2)
    this.pos.copyValues(dim.add(this.instance.caster.pos))
  }
  
  beforeHit(spellEntity)
  {
    if(this.instance == null)
      return

    this.calculatePosition()
    this.instance.moveTo(this.pos)
  }
  
  onTargetReached(spellComponent)
  {
    return true
  }
  
  onDestroy()
  {
    if(this.instance == null)
      return
    
    this.instance.caster.attributeSheet.removeModifier(this.modifier)
    this.instance = null

  }
}

console.log(ReserveModule.name+' loaded...')