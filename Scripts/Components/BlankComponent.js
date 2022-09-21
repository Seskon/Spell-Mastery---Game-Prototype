class BlankComponent extends Component
{
  ID = 'BLANK'
  
  constructor(execute)
  {
    super()
    this.execute = execute
  }
  
  enabledRun()
  {
    this.execute()
  }
}

console.log(BlankComponent.name+' loaded...')