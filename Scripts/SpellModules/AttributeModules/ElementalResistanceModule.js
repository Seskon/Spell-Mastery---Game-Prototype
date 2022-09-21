class ElementalResistanceModule extends TemporaryAttributeModule
{
  static tag = "resistance"
  static displayName = 'Resistance'
  static description = ['The resistance module increases the resistance of the spell and also of the targets that get hit while the spell is active']

  constructor()
  {
    super(30, '_resistance')
  }
 
  afterCast(spellEntity)
  {
    this.attributeId = spellEntity.spellCore.elementType+'_resistance'
    super.afterCast(spellEntity)
  }
  
  onHit(spellEntity, hitEntity)
  {
    this.attributeId = spellEntity.spellCore.elementType+'_resistance'
    super.onHit(spellEntity, hitEntity)
  }
}

console.log(ElementalResistanceModule.name+' loaded...')