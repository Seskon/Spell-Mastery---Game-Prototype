class NodeTypes
{
  static cross = new NodeInfo(
    Rarity.normal, [0,1,2,3], [0,1,0,1,1,1,0,1,0])
  static tUp = new NodeInfo(
    Rarity.normal, [0,1,3], [0,1,0,1,1,1,0,0,0])
  static tRight = new NodeInfo(
    Rarity.normal, [0,1,2], [0,1,0,0,1,1,0,1,0])
  static tDown = new NodeInfo(
    Rarity.normal, [1,2,3], [0,0,0,1,1,1,0,1,0])
  static tLeft = new NodeInfo(
    Rarity.normal, [3,0,2], [0,1,0,1,1,0,0,1,0])
  static horizontal = new NodeInfo(
    Rarity.magic, [1,3], [0,0,0,1,1,1,0,0,0])
  static vertical = new NodeInfo(
    Rarity.magic, [0,2], [0,1,0,0,1,0,0,1,0])
  static upRight = new NodeInfo(
    Rarity.magic, [0,1], [0,1,0,0,1,1,0,0,0])
  static rightDown = new NodeInfo(
    Rarity.magic, [1,2], [0,0,0,0,1,1,0,1,0])
  static downLeft = new NodeInfo(
    Rarity.magic, [2,3], [0,0,0,1,1,0,0,1,0])
  static leftUp = new NodeInfo(
    Rarity.magic, [3,0], [0,1,0,1,1,0,0,0,0])
  static leftEnd = new NodeInfo(
    Rarity.rare, [3], [0,0,0,1,1,0,0,0,0])
  static rightEnd = new NodeInfo(
    Rarity.rare, [1], [0,0,0,0,1,1,0,0,0])
  static upEnd = new NodeInfo(
    Rarity.rare, [0], [0,1,0,0,1,0,0,0,0])
  static downEnd = new NodeInfo(
    Rarity.rare, [2], [0,0,0,0,1,0,0,1,0])
}

console.log(NodeTypes.name+' loaded...')