import { Engine, World, Body, Bodies, Constraint, Render, Mouse, MouseConstraint, Composites, Composite, Query, Events } from 'matter-js'

// create an engine
let engine = Engine.create(),
    world = engine.world,
// create a renderer
    render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 1000,
            height: 600,
            background: 'https://cdn.dribbble.com/users/168664/screenshots/3500505/game-background-sprite.jpg',
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



let groundB = Bodies.rectangle(400, 610, 1110, 60, { isStatic: true }),
    groundT = Bodies.rectangle(400, 0, 1110, 60, { isStatic: true }),
    groundL = Bodies.rectangle(980, 0, 60, 1210, { isStatic: true }),
    groundR = Bodies.rectangle(0, 0, 60, 1210, { isStatic: true })

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
            density: 0.003
        },
        this.body = Bodies.circle(this.x, this.y, this.radius, this.options)    
    }
    show() {
        World.add(world, [this.body]);
    } 
}

let balls = []


    let wall = Bodies.rectangle(840, 145, 15, 150, {
        fillStyle: '#ffffff',
        isStatic: true,
    }),
        ring = Bodies.rectangle(749, 197, 92, 10, {
            isStatic: true,
            isSensor: true,
            chamfer: 5,
        }),
        subRing = Bodies.rectangle(820, 197, 50, 5, {
            isStatic: true,
        }),
        support = Bodies.rectangle(899, 197, 150, 15, {
            isStatic: true,
            angle: 98
        }),
        restriction1 = Bodies.circle(789, 195, 2, {
            isStatic: true
        }),
        restriction2 = Bodies.circle(709, 195, 2, {
            isStatic: true
        })

    World.add(world, [wall, ring, subRing, support, restriction1, restriction2]);
    
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
            Body.setVelocity( balls[balls.length-1].body, {x: -((mouse.position.x-300)/10), y: -((mouse.position.y-400)/10)})
            Body.setAngularVelocity( balls[balls.length-1].body, -Math.PI/6)
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


let group = Body.nextGroup(true),
    particleOptions = { friction: 0.00001, density: 0.0003, collisionFilter: { group: group }, render: { visible: false }},
    constraintOptions = { stiffness: 0.3 },
    cloth = Composites.softBody(710, 190, 8, 6, 1, 1, false, 4, particleOptions, constraintOptions)

World.add(world, [
    cloth,
    Constraint.create({ 
        bodyA: cloth.bodies[0], 
        pointB: {x: 709, y: 195},
        stiffness: 1,
        length: 0
    }),
    Constraint.create({ 
        bodyA: cloth.bodies[1], 
        pointB: {x: 720, y: 195},
        stiffness: 1,
        length: 8
    }),
    Constraint.create({ 
        bodyA: cloth.bodies[2], 
        pointB: {x: 730, y: 195},
        stiffness: 1,
        length: 14
    }),
    Constraint.create({ 
        bodyA: cloth.bodies[3], 
        pointB: {x: 741, y: 195},
        stiffness: 1,
        length: 16
    }),
    Constraint.create({ 
        bodyA: cloth.bodies[4], 
        pointB: {x: 755, y: 195},
        stiffness: 1,
        length: 16
    }),
    Constraint.create({ 
        bodyA: cloth.bodies[5], 
        pointB: {x: 770, y: 195},
        stiffness: 1,
        length: 14
    }),
    Constraint.create({ 
        bodyA: cloth.bodies[6], 
        pointB: {x: 780, y: 195},
        stiffness: 1,
        length: 8
    }),
    Constraint.create({ 
        bodyA: cloth.bodies[7], 
        pointB: {x: 789, y: 195},
        stiffness: 1,
        length: 0
    }),
]);

// keep the mouse in sync with rendering
render.mouse = mouse;

// add all of the bodies to the world
World.add(engine.world, [groundB, groundT, groundL, groundR])
// buble1, buble2,
// run the engine
Engine.run(engine)

// run the renderer
Render.run(render)


