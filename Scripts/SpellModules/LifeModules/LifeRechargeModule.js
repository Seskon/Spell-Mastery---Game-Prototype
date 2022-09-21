class LifeRechargeModule extends Module
{
  static tag = 'recharge'
  static displayName = 'Recharge'

  static description = ['The recharge module heals the spell if it did not get hit recently']

  afterCast(spellEntity)
  {
    spellEntity.addComponent(new SpellRechargeComponent())
  }
}

console.log(LifeRechargeModule.name+' loaded...')