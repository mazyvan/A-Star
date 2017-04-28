/**
 * A* Algoritmo MIT License
 * @version 0.0.1
 * @description Clacula el camino más corto entre dos puntos
 * @author Iván Sánchez, Melissa Cueto, Cesar Huerta
 */

function aStarSearch(from, to, worldMap) {
  let ORTHOGONAL = 10
  let DIAGONAL = 14
  let height = worldMap.length
  let width = worldMap[0].length
  let openList = []

  function getChildren(parent) {
    let children = []
    let walkables = {}
    let neighbor

    // Izquierda
    if(parent.x > 0) {
      neighbor = worldMap[parent.y][parent.x - 1]
      // Si el vecino es no es un bloqueo, no esta cerrado y tiene bajo costo, 
      // se convertirá en el nuevo nodo.
      if(neighbor.walkable && !neighbor.closed && neighbor.cost > parent.cost + ORTHOGONAL) {
        neighbor.parent = parent
        neighbor.cost = parent.cost + ORTHOGONAL
        neighbor.manhattan = ORTHOGONAL * (Math.abs(neighbor.x - to.x) + Math.abs(neighbor.y - to.y))
        neighbor.estimated = neighbor.cost + neighbor.manhattan
        children.push(neighbor)
      }
      walkables.left = neighbor.walkable
    }

    // Derecha
    if(parent.x < width - 1) {
      neighbor = worldMap[parent.y][parent.x + 1]
      if(neighbor.walkable && !neighbor.closed && neighbor.cost > parent.cost + ORTHOGONAL) {
        neighbor.parent = parent
        neighbor.cost = parent.cost + ORTHOGONAL
        neighbor.manhattan = ORTHOGONAL * (Math.abs(neighbor.x - to.x) + Math.abs(neighbor.y - to.y))
        neighbor.estimated = neighbor.cost + neighbor.manhattan
        children.push(neighbor)
      }
      walkables.right = neighbor.walkable
    }

    // Arriba
    if(parent.y > 0) {
      neighbor = worldMap[parent.y - 1][parent.x]
      if(neighbor.walkable && !neighbor.closed && neighbor.cost > parent.cost + ORTHOGONAL) {
        neighbor.parent = parent
        neighbor.cost = parent.cost + ORTHOGONAL
        neighbor.manhattan = ORTHOGONAL * (Math.abs(neighbor.x - to.x) + Math.abs(neighbor.y - to.y))
        neighbor.estimated = neighbor.cost + neighbor.manhattan
        children.push(neighbor)
      }
      walkables.up = neighbor.walkable
    }

    // Abajo
    if(parent.y < height - 1) {
      neighbor = worldMap[parent.y + 1][parent.x]
      if(neighbor.walkable && !neighbor.closed && neighbor.cost > parent.cost + ORTHOGONAL) {
        neighbor.parent = parent
        neighbor.cost = parent.cost + ORTHOGONAL
        neighbor.manhattan = ORTHOGONAL * (Math.abs(neighbor.x - to.x) + Math.abs(neighbor.y - to.y))
        neighbor.estimated = neighbor.cost + neighbor.manhattan
        children.push(neighbor)
      }
      walkables.down = neighbor.walkable
    }

    // Arriba-Izquierda
    if((walkables.up || walkables.left) && (parent.x > 0 && parent.y > 0)) {
      neighbor = worldMap[parent.y - 1][parent.x - 1]
      if(neighbor.walkable && !neighbor.closed && neighbor.cost > parent.cost + DIAGONAL) {
        neighbor.parent = parent
        neighbor.cost = parent.cost + DIAGONAL
        neighbor.manhattan = ORTHOGONAL * (Math.abs(neighbor.x - to.x) + Math.abs(neighbor.y - to.y))
        neighbor.estimated = neighbor.cost + neighbor.manhattan
        children.push(neighbor)
      }
    }

    // Arriba-Derecha
    if((walkables.up || walkables.right) && (parent.x < width - 1 && parent.y > 0)) {
      neighbor = worldMap[parent.y - 1][parent.x + 1]
      if(neighbor.walkable && !neighbor.closed && neighbor.cost > parent.cost + DIAGONAL) {
        neighbor.parent = parent
        neighbor.cost = parent.cost + DIAGONAL
        neighbor.manhattan = ORTHOGONAL * (Math.abs(neighbor.x - to.x) + Math.abs(neighbor.y - to.y))
        neighbor.estimated = neighbor.cost + neighbor.manhattan
        children.push(neighbor)
      }
    }

    // Abajo-Izquierda
    if((walkables.down || walkables.left) && (parent.x > 0 && parent.y < height - 1)) {
      neighbor = worldMap[parent.y + 1][parent.x - 1]
      if(neighbor.walkable && !neighbor.closed && neighbor.cost > parent.cost + DIAGONAL) {
        neighbor.parent = parent
        neighbor.cost = parent.cost + DIAGONAL
        neighbor.manhattan = ORTHOGONAL * (Math.abs(neighbor.x - to.x) + Math.abs(neighbor.y - to.y))
        neighbor.estimated = neighbor.cost + neighbor.manhattan
        children.push(neighbor)
      }
    }

    // Abajo-Derecha
    if((walkables.down || walkables.right) && (parent.x < width - 1 && parent.y < height - 1)) {
      neighbor = worldMap[parent.y + 1][parent.x + 1]
      if(neighbor.walkable && !neighbor.closed && neighbor.cost > parent.cost + DIAGONAL) {
        neighbor.parent = parent
        neighbor.cost = parent.cost + DIAGONAL
        neighbor.manhattan = ORTHOGONAL * (Math.abs(neighbor.x - to.x) + Math.abs(neighbor.y - to.y))
        neighbor.estimated = neighbor.cost + neighbor.manhattan
        children.push(neighbor)
      }
    }

    return children
  }

  // Reinicializar
  for(let h = 0; h < height; h++) {
    for(let w = 0; w < width; w++) {
      worldMap[h][w].cost = Infinity
      worldMap[h][w].open = false
      worldMap[h][w].closed = false
      worldMap[h][w].parent = null
    }
  }
  from.cost = 0
  from.open = true
  openList.push(from)

  
  while(openList.length) {
    // Toma el valor con el costo estimado más bajo.
    let current = openList.sort(function(a, b) { return b.estimated - a.estimated }).pop()
    let children = getChildren(current)

    current.closed = true

    for(let i = 0, l = children.length; i < l; i++) {
      // Ha llegado a su destino
      if(children[i].manhattan === 0) {
        let step = children[i].parent
        let path = []

        while(step.cost !== 0) {
          path.push(step)
          step = step.parent
        }

        return path.reverse()
      }

      if(!children[i].open) {
        children[i].open = true
        openList.push(children[i])
      }
    }
  }

  // No se encontró camino
  return null
}
