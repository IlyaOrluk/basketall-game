import { Engine, World, Body, Bodies, Constraint, Render, Mouse, MouseConstraint, Composites, Composite, Query, Events } from 'matter-js'
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


const groundOptions = {
    render: {
        fillStyle: '#692e65',
        strokeStyle: '#131137',
        lineWidth: 10
    },
    isStatic: true
}
let groundB = Bodies.rectangle(650, 640, 1310, 60, groundOptions),
    groundT = Bodies.rectangle(400, 0, 1110, 60, groundOptions),
    groundR = Bodies.rectangle(1280, 0, 60, 1210, groundOptions),
    groundL = Bodies.rectangle(0, 0, 60, 1210, groundOptions)

class Ball {
    constructor(x, y, radius){
        this.x = x,
        this.y = y,
        this.radius = radius
        this.options = {
            render: {
                sprite: {
                    texture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Basketball_Clipart.svg/1035px-Basketball_Clipart.svg.png',
                    xScale: .037,
                    yScale: .037,
                }
            },
            frictionAir: 0.005,
            restitution: .9,
            density: 0.006
        },
        this.body = Bodies.circle(this.x, this.y, this.radius, this.options)    
    }
    show() {
        World.add(world, [this.body]);
    } 
}

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
            balls.push(new Ball(300, 400, 20))
            balls[balls.length-1].show()
            Body.setVelocity( balls[balls.length-1].body, {x: -((mouse.position.x-300)/5), y: -((mouse.position.y-400)/5)})
            //Body.setAngularVelocity( balls[balls.length-1].body, -Math.PI/6)
        } else if (e.keyCode === 82){
            console.log(balls)
            balls.forEach(item => {
                Composite.remove(world, item.body)
            })
            
            balls = []
            console.log(balls)
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
        console.log(mouse.position.x-300, mouse.position.y-400)
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

const rPosX = 1040, rPosY = 80
let group = Body.nextGroup(true),
    particleOptions = { friction: 0.00001, density: 0.0006, collisionFilter: { group: group }, render: { visible: false }},
    constraintOptions = { stiffness: 0.3 },
    cloth = Composites.softBody(10+rPosX, 190+rPosY, 8, 6, 1, 1, false, 4, particleOptions, constraintOptions)

World.add(world, [
    cloth,
    Constraint.create({ 
        bodyA: cloth.bodies[0], 
        pointB: {x: 9+rPosX, y: 145+rPosY},
        stiffness: 1,
        length: 0
    }),
    Constraint.create({ 
        bodyA: cloth.bodies[1], 
        pointB: {x: 20+rPosX, y: 147+rPosY},
        stiffness: 1,
        length: 8
    }),
    Constraint.create({ 
        bodyA: cloth.bodies[2], 
        pointB: {x: 30+rPosX, y: 147+rPosY},
        stiffness: 1,
        length: 14
    }),
    Constraint.create({ 
        bodyA: cloth.bodies[3], 
        pointB: {x: 41+rPosX, y: 147+rPosY},
        stiffness: 1,
        length: 16
    }),
    Constraint.create({ 
        bodyA: cloth.bodies[4], 
        pointB: {x: 55+rPosX, y: 147+rPosY},
        stiffness: 1,
        length: 16
    }),
    Constraint.create({ 
        bodyA: cloth.bodies[5], 
        pointB: {x: 70+rPosX, y: 147+rPosY},
        stiffness: 1,
        length: 14
    }),
    Constraint.create({ 
        bodyA: cloth.bodies[6], 
        pointB: {x: 80+rPosX, y: 147+rPosY},
        stiffness: 1,
        length: 8
    }),
    Constraint.create({ 
        bodyA: cloth.bodies[7], 
        pointB: {x: 89+rPosX, y: 145+rPosY},
        stiffness: 1,
        length: 0
    }),
]);

let wall = Bodies.rectangle(140+rPosX, 95+rPosY, 15, 150, {
    render: {
        fillStyle: '#ffffff',
    },
    isStatic: true,
}),
    ring = Bodies.rectangle(49+rPosX, 147+rPosY, 92, 10, {
        render: {
            fillStyle: 'red',
            strokeStyle: 'white',
            lineWidth: 2
        },
        isStatic: true,
        isSensor: true,
        chamfer: 0.1,

    }),
    subRing = Bodies.rectangle(120+rPosX, 147+rPosY, 50, 4, {
        render: {
            fillStyle: 'red',
            strokeStyle: 'white',
            lineWidth: 2
        },
        isStatic: true,
    }),
    support = Bodies.rectangle(201+rPosX, 147+rPosY, 150, 15, {
        render: {
            strokeStyle: 'white',
            lineWidth: 3
        },
        isStatic: true,
        angle: 98
    }),
    restriction1 = Bodies.circle(89+rPosX, 145+rPosY, 2, {
        isStatic: true
    }),
    restriction2 = Bodies.circle(9+rPosX, 145+rPosY, 2, {
        isStatic: true
    })

World.add(world, [ restriction1, restriction2, support, ring, subRing, wall ]);

// keep the mouse in sync with rendering
render.mouse = mouse;

// add all of the bodies to the world
World.add(engine.world, [groundB, groundT, groundL, groundR])
// buble1, buble2,
// run the engine
Engine.run(engine)

// run the renderer
Render.run(render)


