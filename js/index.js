//GET http://localhost:3000/monsters/?_limit=50&_page=1

//dom elements
const monsterContainer = document.querySelector("#monster-container")
const newMonsterForm = document.querySelector("#new-monster-form")
const back = document.querySelector("#back")
const forward = document.querySelector("#forward")
let currentPage = 1

//event listeners
forward.addEventListener("click", () => {
    currentPage++
    getAllMonsters(currentPage)
})
back.addEventListener("click", () => {
    currentPage--
    getAllMonsters(currentPage)
})

newMonsterForm.addEventListener("submit", e =>{
    e.preventDefault()
    //get info from form
    const newMonster = {
        name:e.target.name.value  ,
        age:parseInt(e.target.age.value)  ,
        description:e.target.description.value
    }
    
    //make post
    fetch ("http://localhost:3000/monsters/", {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body:JSON.stringify(newMonster)
    })
    .then (r => r.json())
    .then(actualNewMonster => renderMonster(actualNewMonster))
    //render to page
})

//render helpers
function renderMonster(monster){


const h1 = document.createElement("h1")
h1.textContent = monster.name

const h4 = document.createElement("h4")
h4.textContent = monster.age

const p = document.createElement("p")
p.textContent = monster.description

monsterContainer.append(h1, h4, p)
}

function renderAllMonsters(monsters){
    monsterContainer.innerHTML = ""
    monsters.forEach(renderMonster)
}

//initial fetch and render
function getAllMonsters(page){ 
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then (r => r.json())
    .then(r => renderAllMonsters(r))
}

getAllMonsters(currentPage)