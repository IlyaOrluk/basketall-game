import { 
     World,
      Bodies,
             } from 'matter-js'
             
export default class Ball {
    constructor(x, y, radius, world){
        this.x = x,
        this.y = y,
        this.radius = radius,
        this.world = world
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
        World.add(this.world, [this.body]);
    } 
}