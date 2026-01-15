var arr = [
   {
    team : 'CSK',
    primary: 'yellow',
    secondary: 'blue',
    fullName : 'Chennai Super Kings',
    trophies : 4,
    captain : 'MS Dhoni'
   },
    {
    team : 'RCB',
    primary: 'red',
    secondary: 'black',
    fullName: 'Royal Challengers Bangalore',
    trophies : 1,
    captain : 'KING KOHLI'
   },
   {
    team : 'MI',
    primary: 'blue',
    secondary: 'green',
    fullName : 'Mumbai Indians',
    trophies : 5,
    captain : 'Rohit Sharma'
   },
   {
    team : 'KKR',
    primary: 'purple',
    secondary: 'gold',
    fullName : 'Kolkata Knight Riders',
    trophies : 2,
    captain : 'Shubman Gill'
   },
   {
    team : 'PBKS',
    primary: 'crimson',
    secondary: 'black',
    fullName : 'Punjab Kings',
    trophies : 0,
    captain : 'Shikhar Dhawan'
   },{
    team : 'SRH',
    primary: 'orange',
    secondary: 'grey',
    fullName : 'Sunrisers Hyderabad',
    trophies : 1,
    captain : 'Aiden Markram'
   }
]
var btn = document.querySelector('button') 
var h1 = document.querySelector('h1')
var main = document.querySelector ('main')

btn.addEventListener( 'click' , function () {  
    var num  = Math.floor (Math.random()*arr.length)
    

    h1.innerHTML = arr[num].team
    h1.style.backgroundColor = arr[num].primary
    main.style.backgroundColor = arr[num].secondary
    
})