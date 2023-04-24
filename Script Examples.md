


// Adding two paramaters

\
(a:Float, b:Float)
:Float->
a+b


Color gradient

colorgradient([ 
{ pos=0, color=rgba(0.0, 1.0, 1.0, 1.0), type=1 }, 
{ pos=1, color=rgba(1.0, 1.0, 1.0, 1.0), type=1 }, 
{ pos=2, color=rgba(1.0, 0.0, 1.0, 1.0), type=1 } 
])

Polygon creation

let a = [vec2(0,0), vec2(0,1), vec2(1,1), vec2(1,0)] in 
polygon(a)


Multiple outputs

\(a:Float, b:Float):{ sum:Float, diff:Float } -> { sum=a+b, diff = a-b }


Loop

letrec loop_n = \(n:Int, a:Int, f:(Int, Int):Int):Int -> if n == 0 then f(n, a) else loop_n(n - 1, f(n, a), f)
in loop_n(10, 0, \(i:Int, a:Int):Int -> a+i)

Loop inside loop

letrec loop_n = \(n:Int, a:Int, f:(Int, Int):Int):Int -> if n == 0 then f(n, a) else loop_n(n - 1, f(n, a), f)
  in loop_n(10, 0, \(i:Int, a:Int):Int -> loop_n(10, a, \(j:Int, a:Int):Int -> a + i + j))



Recursive  Color gradient

\(keys:[{c:Color,k:Float,m:Int}], input: Float ):Color->
let mixcolor = \(c1:Color, c2:Color, f:Float, f1:Float, m:Int):Color ->
    let f = if m>0 then step(f, input) else smoothstep(f1, f, input)
         in rgba(c1.r*(1-f)+c2.r*f, c1.g*(1-f)+c2.g*f , c1.b*(1-f)+c2.b*f, 1) 
    in
       letrec
           gradient = \(colors:[{c:Color,k:Float,m:Int}], f2: Float):Color -> 
	
           if length(colors) ==0 then rgba(0,0,0,1) else 
	mixcolor(head(colors).c, gradient(tail(colors), head(colors).k) , head(colors).k, f2, head(colors).m)
     in 

gradient(keys, 1)


Simple hash function

let hash1 = \( n:Float ): Float -> fract(sin(n)*43758.5453) in 

Simple hash 2D function

let hash2 = ( p: Vector2D ): Vector2D ->
  let  p = vec2( dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)) in 
    fract(sin(p)*43758.5453)
in 1



// Remap

\(input: Float, ranges:[{r1:Float, r2:Float, v:Float}]): Float ->

 letrec
           remap = \(ranges:[{r1:Float, r2:Float, v:Float}]):Float -> 
	
           if length(ranges) == 0 then 0 else 
	            if (head(ranges).r1 < input && head(ranges).r2 > input) then head(ranges).v else remap(tail(ranges))
            in 
remap(ranges)




Recursive sum

letrec 
  sum = \(x:[Float]):Float 
-> if length(x) == 0 then 0 else head(x) + sum(tail(x)) 

in sum([0.1,0.2,0.3])



Replace element in array

letrec 
  replace = \(x:[Float], p:Float):[Float] 
-> 
if length(x) == 0 then [] else append([if head(x)==p then 0 else head(x)], replace(tail(x),p)) 

in replace([0.1,0.2,0.3], 0.2)



Useful expressions


Diagonal lines

max(smoothstep(0.7,1,sin(x*10+y*10)),smoothstep(0.7,1,sin(-x*10+y*10)))


Circle

sqrt((x*x + y*y))


Rays

abs(mod(atan(y,x)+2.03, 1.255/4) - 1.255/8)



Triangular Wave

abs(mod(y, 1) - 0.5)



Arc

atan(y,x) >-1?0:1



Waves

cos(atan(y,x)*10.)*.2

