/**
 * A* pathfinding algorithm
 * https://github.com/myst729/a-star-pathfinding
 */

function aStarSearch(from, to, worldMap) {
  var height = worldMap.length
  var width = worldMap[0].length
  var openList = []
  var closeList = []

  function getChildren(parent) {
    var children = []
    var child

    if(parent.x > 0 && parent.y > 0) { // top left
      child = worldMap[parent.y - 1][parent.x - 1]
      if(child.walkable && closeList.indexOf(child) === -1 && child.cost > parent.cost + 14) {
        child.parent = parent
        child.cost = parent.cost + 14
        child.heuristic = 10 * (Math.abs(child.x - to.x) + Math.abs(child.y - to.y))
        child.estimated = child.cost + child.heuristic
        children.push(child)
      }
    }
    if(parent.y > 0) { // top
      child = worldMap[parent.y - 1][parent.x]
      if(child.walkable && closeList.indexOf(child) === -1 && child.cost > parent.cost + 10) {
        child.parent = parent
        child.cost = parent.cost + 10
        child.heuristic = 10 * (Math.abs(child.x - to.x) + Math.abs(child.y - to.y))
        child.estimated = child.cost + child.heuristic
        children.push(child)
      }
    }
    if(parent.x < width - 1 && parent.y > 0) { // top right
      child = worldMap[parent.y - 1][parent.x + 1]
      if(child.walkable && closeList.indexOf(child) === -1 && child.cost > parent.cost + 14) {
        child.parent = parent
        child.cost = parent.cost + 14
        child.heuristic = 10 * (Math.abs(child.x - to.x) + Math.abs(child.y - to.y))
        child.estimated = child.cost + child.heuristic
        children.push(child)
      }
    }
    if(parent.x > 0) { // left
      child = worldMap[parent.y][parent.x - 1]
      if(child.walkable && closeList.indexOf(child) === -1 && child.cost > parent.cost + 10) {
        child.parent = parent
        child.cost = parent.cost + 10
        child.heuristic = 10 * (Math.abs(child.x - to.x) + Math.abs(child.y - to.y))
        child.estimated = child.cost + child.heuristic
        children.push(child)
      }
    }
    if(parent.x < width - 1) { // right
      child = worldMap[parent.y][parent.x + 1]
      if(child.walkable && closeList.indexOf(child) === -1 && child.cost > parent.cost + 10) {
        child.parent = parent
        child.cost = parent.cost + 10
        child.heuristic = 10 * (Math.abs(child.x - to.x) + Math.abs(child.y - to.y))
        child.estimated = child.cost + child.heuristic
        children.push(child)
      }
    }
    if(parent.x > 0 && parent.y < height - 1) { // bottom left
      child = worldMap[parent.y + 1][parent.x - 1]
      if(child.walkable && closeList.indexOf(child) === -1 && child.cost > parent.cost + 14) {
        child.parent = parent
        child.cost = parent.cost + 14
        child.heuristic = 10 * (Math.abs(child.x - to.x) + Math.abs(child.y - to.y))
        child.estimated = child.cost + child.heuristic
        children.push(child)
      }
    }
    if(parent.y < height - 1) { // bottom
      child = worldMap[parent.y + 1][parent.x]
      if(child.walkable && closeList.indexOf(child) === -1 && child.cost > parent.cost + 10) {
        child.parent = parent
        child.cost = parent.cost + 10
        child.heuristic = 10 * (Math.abs(child.x - to.x) + Math.abs(child.y - to.y))
        child.estimated = child.cost + child.heuristic
        children.push(child)
      }
    }
    if(parent.x < width - 1 && parent.y < height - 1) { // bottom right
      child = worldMap[parent.y + 1][parent.x + 1]
      if(child.walkable && closeList.indexOf(child) === -1 && child.cost > parent.cost + 14) {
        child.parent = parent
        child.cost = parent.cost + 14
        child.heuristic = 10 * (Math.abs(child.x - to.x) + Math.abs(child.y - to.y))
        child.estimated = child.cost + child.heuristic
        children.push(child)
      }
    }

    return children
  }

  for(var h = 0; h < height; h++) {
    for(var w = 0; w < width; w++) {
      worldMap[h][w].cost = Infinity
    }
  }
  from.cost = 0
  openList.push(from)

  while(openList.length) {
    var current = openList.sort(function(a, b) { return b.estimated - a.estimated }).pop()
    var children = getChildren(current)

    closeList.push(current)

    for(var i = 0, l = children.length; i < l; i++) {
      if(children[i].heuristic === 0) { // found!
        var point = children[i].parent
        var path = []
        while(point.cost !== 0) {
          path.unshift(point)
          point = point.parent
        }
        return path
      }

      if(openList.indexOf(children[i]) === -1) {
        openList.push(children[i])
      }
    }        
  }
  return null
}