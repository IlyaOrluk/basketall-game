import { Engine, World, Body, Bodies, Constraint, Render, Mouse, MouseConstraint } from 'matter-js'

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
            background: '#0f0f12',
            // showBroadphase: true,
            // showAxes: true,
            // showCollisions: true,
            // showConvexHulls: true,
            showVelocity: true,
            wireframes: false // <-- important
        }
})

// create two boxes and a ground
let boxA = Bodies.rectangle(400, 120, 100, 100, {
    isSleeping: true,
    frictionAir: 0.0005,
    density: 0.05
}),
    boxX = Bodies.rectangle(660, 120, 40, 40),
    boxB = Bodies.rectangle(170, 500, 200, 50, {
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

let buble1 = Bodies.circle(400, 100, 25, {
    render: {
         fillStyle: 'red',
         strokeStyle: 'blue',
         lineWidth: 3
    },
    frictionAir: 0.0006,
    restitution: 0.3
})
const ballConfig = {
    render: {
        strokeStyle: 'red',
        sprite: {
            texture: 'https://avatars.mds.yandex.net/get-pdb/25978/29291878-25be-4840-bc5b-6547a99970bf/s375',
            xScale: .12,
            yScale: .12,
        }
    },
    frictionAir: 0.005,
    restitution: 1,
    density: 0.003
}
let ball1 = Bodies.circle(80, 400, 20, ballConfig),
    ball2 = Bodies.circle(120, 400, 20, ballConfig),
    ball3 = Bodies.circle(120, 360, 20, ballConfig),
    ball4 = Bodies.circle(160, 320, 20, ballConfig),
    ball5 = Bodies.circle(180, 320, 20, ballConfig),
    ball6 = Bodies.circle(140, 320, 20, ballConfig)

    World.add(world, [ball1, ball2, ball3, ball4, ball5, ball6]);






    // var body = Bodies.polygon(150, 200, 5, 30);

    // var constraint = Constraint.create({
    //     pointA: { x: 150, y: 100 },
    //     bodyB: body,
    //     pointB: { x: -10, y: -10 }
    // });

    // World.add(world, [body, constraint]);

    // add soft global constraint
    // var body = Bodies.polygon(280, 100, 3, 30);

    // var constraint = Constraint.create({
    //     pointA: { x: 280, y: 120 },
    //     bodyB: body,
    //     pointB: { x: -10, y: -7 },
    //     stiffness: 0.001
    // });

    // World.add(world, [body, constraint]);

    // add damped soft global constraint
    // var body = Bodies.polygon(400, 100, 4, 30);

    // var constraint = Constraint.create({
    //     pointA: { x: 400, y: 120 },
    //     bodyB: body,
    //     pointB: { x: -10, y: -10 },
    //     stiffness: 0.001,
    //     damping: 0
    // });

    // World.add(world, [body, constraint]);




    let catapult = Bodies.rectangle(240, 400, 400, 20, {
        angle: 9
    })
    var constraint = Constraint.create({
        pointA: { x: 240, y: 400 },
        bodyB: catapult,
        length: 0,
    });

    World.add(world, [catapult, constraint]);

    const wallOpt = {
        render: {
            fillStyle: 'yellow',
            lineWidth: 4
       },
       density: 0.0003
    }
    let wall1 = Bodies.rectangle(860, 500, 40, 200, wallOpt),
        wall2 = Bodies.rectangle(760, 500, 40, 200, wallOpt),
        wall3 = Bodies.rectangle(810, 300, 160, 30, wallOpt),
        wall4 = Bodies.rectangle(810, 100, 30, 150, wallOpt)

    World.add(world, [wall1, wall2, wall3, wall4]);
    
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

World.add(engine.world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// add all of the bodies to the world
World.add(engine.world, [groundB, groundT, groundL, groundR, boxA, boxB])
// buble1, buble2,
// run the engine
Engine.run(engine)

// run the renderer
Render.run(render)


