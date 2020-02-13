import { 
    World,
     Bodies,
            } from 'matter-js'
            
export default class Box {
   constructor(x, y, width, height, world){
       this.x = x,
       this.y = y,
       this.width = width,
       this.height = height,
       this.world = world
       this.options = {
           render: {
                fillStyle: '#692e65',
                strokeStyle: 'black',
                lineWidth: 10,
               sprite: {
                   texture: 'https://opengameart.org/sites/default/files/RTS_Crate.png',
                   xScale: .2,
                   yScale: .2,
               }
           },
           frictionAir: 0.0005,
           friction: 1,
           slope: 1,
           restitution: .2,
           density: 0.05
       },
       this.body = Bodies.rectangle(this.x, this.y, this.width, this.height, this.options)
   }
   show() {
       World.add(this.world, [this.body]);
   } 
}