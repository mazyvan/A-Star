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
    var walkables = {}
    var child

    // left
    if(parent.x > 0) {
      child = worldMap[parent.y][parent.x - 1]
      if(child.walkable && closeList.indexOf(child) === -1 && child.cost > parent.cost + 10) {
        child.parent = parent
        child.cost = parent.cost + 10
        child.manhattan = 10 * (Math.abs(child.x - to.x) + Math.abs(child.y - to.y))
        child.estimated = child.cost + child.manhattan
        children.push(child)
      }
      walkables.left = child.walkable
    }
    // right
    if(parent.x < width - 1) {
      child = worldMap[parent.y][parent.x + 1]
      if(child.walkable && closeList.indexOf(child) === -1 && child.cost > parent.cost + 10) {
        child.parent = parent
        child.cost = parent.cost + 10
        child.manhattan = 10 * (Math.abs(child.x - to.x) + Math.abs(child.y - to.y))
        child.estimated = child.cost + child.manhattan
        children.push(child)
      }
      walkables.right = child.walkable
    }
    // up
    if(parent.y > 0) {
      child = worldMap[parent.y - 1][parent.x]
      if(child.walkable && closeList.indexOf(child) === -1 && child.cost > parent.cost + 10) {
        child.parent = parent
        child.cost = parent.cost + 10
        child.manhattan = 10 * (Math.abs(child.x - to.x) + Math.abs(child.y - to.y))
        child.estimated = child.cost + child.manhattan
        children.push(child)
      }
      walkables.up = child.walkable
    }
    // down
    if(parent.y < height - 1) {
      child = worldMap[parent.y + 1][parent.x]
      if(child.walkable && closeList.indexOf(child) === -1 && child.cost > parent.cost + 10) {
        child.parent = parent
        child.cost = parent.cost + 10
        child.manhattan = 10 * (Math.abs(child.x - to.x) + Math.abs(child.y - to.y))
        child.estimated = child.cost + child.manhattan
        children.push(child)
      }
      walkables.down = child.walkable
    }
    // upleft
    if((walkables.up || walkables.left) && (parent.x > 0 && parent.y > 0)) {
      child = worldMap[parent.y - 1][parent.x - 1]
      if(child.walkable && closeList.indexOf(child) === -1 && child.cost > parent.cost + 14) {
        child.parent = parent
        child.cost = parent.cost + 14
        child.manhattan = 10 * (Math.abs(child.x - to.x) + Math.abs(child.y - to.y))
        child.estimated = child.cost + child.manhattan
        children.push(child)
      }
    }
    // upright
    if((walkables.up || walkables.right) && (parent.x < width - 1 && parent.y > 0)) {
      child = worldMap[parent.y - 1][parent.x + 1]
      if(child.walkable && closeList.indexOf(child) === -1 && child.cost > parent.cost + 14) {
        child.parent = parent
        child.cost = parent.cost + 14
        child.manhattan = 10 * (Math.abs(child.x - to.x) + Math.abs(child.y - to.y))
        child.estimated = child.cost + child.manhattan
        children.push(child)
      }
    }
    // downleft
    if((walkables.down || walkables.left) && (parent.x > 0 && parent.y < height - 1)) {
      child = worldMap[parent.y + 1][parent.x - 1]
      if(child.walkable && closeList.indexOf(child) === -1 && child.cost > parent.cost + 14) {
        child.parent = parent
        child.cost = parent.cost + 14
        child.manhattan = 10 * (Math.abs(child.x - to.x) + Math.abs(child.y - to.y))
        child.estimated = child.cost + child.manhattan
        children.push(child)
      }
    }
    // downright
    if((walkables.down || walkables.right) && (parent.x < width - 1 && parent.y < height - 1)) {
      child = worldMap[parent.y + 1][parent.x + 1]
      if(child.walkable && closeList.indexOf(child) === -1 && child.cost > parent.cost + 14) {
        child.parent = parent
        child.cost = parent.cost + 14
        child.manhattan = 10 * (Math.abs(child.x - to.x) + Math.abs(child.y - to.y))
        child.estimated = child.cost + child.manhattan
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
    var current = openList.sort(function(a, b) { return b.estimated - a.estimated }).pop() // pick the one with minimal estimated value from open list
    var children = getChildren(current)

    closeList.push(current)

    for(var i = 0, l = children.length; i < l; i++) {
      if(children[i].manhattan === 0) { // destination found!
        var step = children[i].parent
        var path = []
        while(step.cost !== 0) { // haven't got back to starting point
          path.push(step)
          step = step.parent
        }
        return path.reverse()
      }

      if(openList.indexOf(children[i]) === -1) {
        openList.push(children[i])
      }
    }        
  }
  return null
}
