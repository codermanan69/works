const users = [
  {
    fullName: "Sofia Ramirez",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    profession: "Product Designer",
    description: "Designs clean, user-friendly interfaces for SaaS products. Obsessed with usability and tiny details.",
    tags: ["UI", "UX", "Figma", "Design Systems"]
  },
 ,
  {
    fullName: "Aisha Khan",
    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c",
    profession: "Digital Marketer",
    description: "Runs growth campaigns, analyzes funnels, and actually understands what the data is saying.",
    tags: ["SEO", "Analytics", "Content", "Growth"]
  },
  {
    fullName: "Daniel Kovacs",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a",
    profession: "Mobile App Developer",
    description: "Specializes in high-performance mobile apps and hates bloated codebases.",
    tags: ["Flutter", "iOS", "Android", "Performance"]
  },
  {
    fullName: "Emily Turner",
    image: "https://images.unsplash.com/photo-1548142813-c348350df52b",
    profession: "Startup Copywriter",
    description: "Writes landing pages that convert and deletes 80% of what clients think they need to say.",
    tags: ["Copywriting", "Branding", "Landing Pages", "Conversion"]
  }
];
 var sum = ''
users.forEach(function(elem){
   sum = sum + `<div class="card">
            <img src="${elem.image} " alt="">
            <h3>${elem.fullName}</h3>
            <h4>${elem.profession}</h4>
            <p>${elem.description}</p>
       
        </div>`;
    
})

 var main = document.querySelector('main')

 main.innerHTML = sum 

