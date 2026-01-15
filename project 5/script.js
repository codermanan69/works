var arr =  [

    {
        dp: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        story:
        "https://plus.unsplash.com/premium_photo-1669704098750-7cd22c35422b?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    {
        dp: "https://images.unsplash.com/photo-1618375531912-867984bdfd87?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        story:
        "https://plus.unsplash.com/premium_photo-1673758905770-a62f4309c43c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    {
        dp: "https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        story:
        "https://images.unsplash.com/photo-1616536864877-49b0f53884ed?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },

    {
        dp: "https://images.unsplash.com/photo-1567777301743-3b7ef158aadf?q=80&w=712&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        story:
        "https://images.unsplash.com/photo-1567777301743-3b7ef158aadf?q=80&w=712&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
]

var storiyan = document.querySelector("#storiyan")
var clutter = ""
arr.forEach(function (elem,idx) {
  clutter += `<div class="story">
                <img  id="${idx}" src="${elem.dp}" alt="">
        </div>`

})
storiyan.innerHTML = clutter

storiyan.addEventListener("click", function (dets) {
     document.querySelector("#full-screen").style.display = "block"
     document.querySelector("#full-screen").style.backgroundImage = `url(${arr[dets.target.id].story})`

     setTimeout(function () {
document.querySelector("#full-screen").style.display = "none"
     },3000)
});