import { 
     World,
      Body, 
      Bodies,
       Constraint, 
          Composites,
             } from 'matter-js'
             
export default class BasketballHoop {
    constructor(x,y,world, side){
        this.x = x,
        this.y = y,
        this.world = world,
        this.side = side
        
    }

    show() {
    let group = Body.nextGroup(true),
        particleOptions = { 
            friction: 0.00001, 
            density: 0.0006, 
            collisionFilter: { group: group }, 
            render: { visible: false }},
            
        constraintOptions = { stiffness: 0.3 },
        cloth = Composites.softBody(10+this.x, 190+this.y, 8, 6, 1, 1, false, 4, particleOptions, constraintOptions)

World.add(this.world, [
    cloth,
    Constraint.create({ 
        bodyA: cloth.bodies[0], 
        pointB: {x: 9+this.x, y: 145+this.y},
        stiffness: 1,
        length: 0
    }),
    Constraint.create({ 
        bodyA: cloth.bodies[1], 
        pointB: {x: 20+this.x, y: 147+this.y},
        stiffness: 1,
        length: 8
    }),
    Constraint.create({ 
        bodyA: cloth.bodies[2], 
        pointB: {x: 30+this.x, y: 147+this.y},
        stiffness: 1,
        length: 14
    }),
    Constraint.create({ 
        bodyA: cloth.bodies[3], 
        pointB: {x: 41+this.x, y: 147+this.y},
        stiffness: 1,
        length: 16
    }),
    Constraint.create({ 
        bodyA: cloth.bodies[4], 
        pointB: {x: 55+this.x, y: 147+this.y},
        stiffness: 1,
        length: 16
    }),
    Constraint.create({ 
        bodyA: cloth.bodies[5], 
        pointB: {x: 70+this.x, y: 147+this.y},
        stiffness: 1,
        length: 14
    }),
    Constraint.create({ 
        bodyA: cloth.bodies[6], 
        pointB: {x: 80+this.x, y: 147+this.y},
        stiffness: 1,
        length: 8
    }),
    Constraint.create({ 
        bodyA: cloth.bodies[7], 
        pointB: {x: 89+this.x, y: 145+this.y},
        stiffness: 1,
        length: 0
    }),
]);

let wall = Bodies.rectangle(140+this.x, 95+this.y, 15, 150, {
    render: {
        fillStyle: '#ffffff',
    },
    isStatic: true,
}),
    ring = Bodies.rectangle(49+this.x, 147+this.y, 92, 10, {
        render: {
            fillStyle: 'red',
            strokeStyle: 'white',
            lineWidth: 2
        },
        isStatic: true,
        isSensor: true,
        chamfer: 0.1,

    }),
    subRing = Bodies.rectangle(120+this.x, 147+this.y, 50, 4, {
        render: {
            fillStyle: 'red',
            strokeStyle: 'white',
            lineWidth: 2
        },
        isStatic: true,
    }),
    support = Bodies.rectangle(201+this.x, 147+this.y, 150, 15, {
        render: {
            strokeStyle: 'white',
            lineWidth: 3
        },
        isStatic: true,
        angle: 98
    }),
    restriction1 = Bodies.circle(89+this.x, 145+this.y, 2, {
        isStatic: true
    }),
    restriction2 = Bodies.circle(9+this.x, 145+this.y, 2, {
        isStatic: true
    })

World.add(this.world, [ restriction1, restriction2, support, ring, subRing, wall ]);
    }
}