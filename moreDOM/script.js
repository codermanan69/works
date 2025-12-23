var btn = document.querySelector('button')
var main = document.querySelector('main')

btn.addEventListener ('click', function () {
    var div = document.createElement('div')


    div.style.height = "50px"
    div.style.width  = "50px"
    
    div.style.position ='absolute'
    var x = Math.random()*100
    var y = Math.random()*100
    var r = Math.random()*360
    var c1 = Math.floor(Math.random()*256)
    var c2 = Math.floor(Math.random()*256)
    var c3 = Math.floor(Math.random()*256)

    div.style.top =y+'%'
    div.style.left = x+'%' 
    div.style.rotate = r+'deg' 

    div.style.backgroundColor= `rgb(${c1},${c2},${c3})`
    main.appendChild(div)
    
})