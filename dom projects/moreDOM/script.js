

var btn = document.querySelector('button')
var main = document.querySelector('main')

var arr = ['hey!! i am Manan ', 'sheryians is best' , 'Anshul bhaiya is great ', 'stranger things is love' , 'seedhe maut bajra hai subhe se ' , 'i am the best ', ' js is love ']

btn.addEventListener ('click', function (){
    
    var h1 = document.createElement('h1') 

    var a = Math.floor(Math.random()*arr.length)
    var x = Math.random()*100
    var y = Math.random()*100
    var r = Math.random()*360
    var scl  = Math.random()*3
    var c1 = Math.floor(Math.random()*256)
    var c2 = Math.floor(Math.random()*256)
    var c3 = Math.floor(Math.random()*256)
    

    h1.innerHTML = arr[a] 
    h1.style.color = 'white'
    h1.style.fontSize = '20px'
    h1.style.position = 'absolute'
    h1.style.top = x+'%'
    h1.style.left = y+'%'
    h1.style.color = `rgb(${c1}, ${c2}, ${c3})`
    h1.style.whiteSpace = 'nowrap'
    h1.style.rotate = r+'deg'
    h1.style.scale = scl


    main.appendChild(h1)
    
    
    


})