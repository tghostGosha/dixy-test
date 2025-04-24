import interact from 'interactjs'

interact('.resizable')
  .resizable({
    edges: {top: false, left: false, bottom: true, right: false},
    modifiers: [
      interact.modifiers.restrictSize({
        min: {height: 40},
        max: {height: 150}
      })
    ],
    listeners: {
      move: function (event) {
        let {x, y} = event.target.dataset

        x = (parseFloat(x) || 0) + event.deltaRect.left
        y = (parseFloat(y) || 0) + event.deltaRect.top

        Object.assign(event.target.style, {
          // width: `${event.rect.width}px`,
          height: `${event.rect.height}px`,
          transform: `translate(${x}px, ${y}px)`,
          zIndex: 1
        })

        Object.assign(event.target.dataset, {x, y})
      }
    }
  })