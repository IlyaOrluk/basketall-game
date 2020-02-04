import { 
    Engine,
     World,
      Body, 
      Bodies,
       Constraint, 
       Render,
        Mouse,
         MouseConstraint,
          Composites,
           Composite,
            Query,
             Events
             } from 'matter-js'

import BasketballHoop from './basketball-hoop'
import Ball from './ball'

document.body.style.margin = 0
document.body.style.padding = 0
// create an engine
let engine = Engine.create(),
    world = engine.world,
// create a renderer
    render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 1300,
            height: 650,
            background: 'https://i.ytimg.com/vi/dZLR5MuBeuk/maxresdefault.jpg',
            // showBroadphase: true,
            // showAxes: true,
            // showCollisions: true,
            // showConvexHulls: true,
            showVelocity: true,
            wireframes: false // <-- important
        }
})

// create two boxes and a ground
let boxB = Bodies.rectangle(170, 500, 200, 50, {
    isStatic: true,
    chamfer: 10,
    slop: 1,
    friction: 1,
    frictionStatic: Infinity
})

Body.setAngle(boxB, 50)

 // add walls
const groundOptions = {
    render: {
        fillStyle: '#692e65',
        strokeStyle: '#131137',
        lineWidth: 10
    },
    isStatic: true
}
let groundB = Bodies.rectangle(650, 640, 1310, 60, groundOptions),
    groundT = Bodies.rectangle(300, 0, 710, 60, groundOptions),
    groundR = Bodies.rectangle(1280, 0, 60, 1210, groundOptions),
    groundL = Bodies.rectangle(0, 0, 60, 1210, groundOptions),
    obstructions = [
        Bodies.rectangle(500, 0, 60, 700, groundOptions),
        Bodies.rectangle(800, 700, 60, 700, groundOptions)
    ]

World.add(engine.world, [groundB, groundT, groundL, groundR, ...obstructions])



//array basketball balls
let balls = []

let mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });
    let mouseX, mouseY
    window.addEventListener('mousemove', () => {
        mouseX = mouse.position.x
        mouseY = mouse.position.y

    })
    window.addEventListener('keydown', e => {
        console.log(e.keyCode, mouseX, mouseY)
        if(e.keyCode === 32){
            balls.push(new Ball(300, 400, 20, world))
            balls[balls.length-1].show()
            Body.setVelocity( balls[balls.length-1].body, {x: -((mouse.position.x-300)/5), y: -((mouse.position.y-400)/5)})
            //Body.setAngularVelocity( balls[balls.length-1].body, -Math.PI/6)
        } else if (e.keyCode === 82){
            balls.forEach(item => {
                Composite.remove(world, item.body)
            })
            balls = []
        }
    })

    Events.on(render, 'afterRender', function() {
        var mouse = mouseConstraint.mouse,
            context = render.context,
            bodies = Composite.allBodies(engine.world),
            startPoint = { x: 300, y: 400 },
            endPoint = mouse.position;
        let distance = Math.sqrt(Math.pow((mouse.position.x - startPoint.x),2)+Math.pow((mouse.position.y - startPoint.y),2))
        var collisions = Query.ray(bodies, startPoint, endPoint);
        Render.startViewTransform(render);

        context.beginPath();
        context.moveTo(startPoint.x, startPoint.y);
        context.lineTo(endPoint.x, endPoint.y);

        context.fillText(Math.floor(distance), endPoint.x, endPoint.y)
        if (collisions.length > 0) {
            context.strokeStyle = '#FF0000';
        } else {
            context.strokeStyle = '#00FF00';
        }
        context.lineWidth = 2;
        context.stroke();

        for (var i = 0; i < collisions.length; i++) {
            var collision = collisions[i];
            context.rect(collision.bodyA.position.x - 4.5, collision.bodyA.position.y - 4.5, 8, 8);
        }

        context.fillStyle = 'rgba(255,165,0,0.7)';
        context.fill();

        Render.endViewTransform(render);
    }); 

World.add(world, mouseConstraint);
let bH1 = new BasketballHoop(1040, 80, world)
bH1.show()

// keep the mouse in sync with rendering
render.mouse = mouse;


// buble1, buble2,
// run the engine
Engine.run(engine)

// run the renderer
Render.run(render)


