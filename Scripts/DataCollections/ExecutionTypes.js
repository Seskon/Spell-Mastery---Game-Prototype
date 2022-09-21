class ExecutionTypes
{
  static onTrigger = 'onTrigger'
  static beforeCast = 'beforeCast'
  static onCast = 'onCast'
  static afterCast = 'afterCast'
  static beforeHit = 'beforeHit'
  static onHit = 'onHit'
  static afterHit = 'afterHit'
  static onHitComplete = 'onHitComplete'
  static onCastRequest = 'onCastRequest'
  static onDestroy = 'onDestroy'
  static onTurningPhysical = 'onTurningPhysical'
}

console.log(ExecutionTypes.name+' loaded...')