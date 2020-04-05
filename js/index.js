document.addEventListener('DOMContentLoaded', function(e) {
    console.log("DOM Loaded...")
    let pageNum = 1;
    //Render Monster Form
    createMonsterForm()
        //Create Monster Form Event Listener
    const monsterForm = document.querySelector("#monster-form")
    monsterForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const newMonster = {
            name: e.target.name.value,
            age: e.target.age.value,
            description: e.target.description.value
        }
        fetch('http://localhost:3000/monsters', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newMonster)
            })
            .then(response => response.json())
            .then(FinalizedMonster => {
                console.log(FinalizedMonster)
            })
        monsterForm.reset()
    })
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNum}`)
        .then(response => response.json())
        .then(monsters => {
            monsters.forEach(monster => {
                renderMonster(monster)
            })
        })
        //Functionality for Back Button
    let backBtn = document.querySelector('#back')
    backBtn.addEventListener("click", function(e) {
        if (pageNum > 1) {
            let count = 0
            let currentMonsters = document.querySelector("#monster-container")
            while (count < 50) {
                currentMonsters.firstElementChild.remove()
                count++
            }
            fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNum -= 1}`)
                .then(response => response.json())
                .then(monsters => {
                    monsters.forEach(monster => {
                        renderMonster(monster)
                    })
                })
        } else {
            alert("No More Monsters This Way!!!")
        }
    })

    //Functionality for Forward Button
    let forwardBtn = document.querySelector('#forward')
    forwardBtn.addEventListener("click", function(e) {
        console.log("Forward was clicked")
        let count = 0
        let currentMonsters = document.querySelector("#monster-container")
        while (count < 50) {
            currentMonsters.firstElementChild.remove()
            console.log(count)
            count++
        }

        fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNum += 1}`)
            .then(response => response.json())
            .then(monsters => {
                monsters.forEach(monster => {
                    renderMonster(monster)
                })
            })

    })
})


//Create Monster Form
function createMonsterForm() {
    const monsterForm = document.createElement('form')
    monsterForm.id = "monster-form"
    monsterForm.innerHTML = "<input type='text' name='name' value='name...'><input type='text' name='age' value='age...'><input type='text' name='description' value='description...'><input type='submit' value='Create Monster'>";
    let formParent = document.querySelector('#create-monster')
    formParent.appendChild(monsterForm)
}
//Create Render for Single Monster
function renderMonster(monster) {
    let monsterHeader = document.createElement("h2")
    let monsterAge = document.createElement("h4")
    let monsterBio = document.createElement("p")
    monsterHeader.innerText = monster.name
    monsterAge.innerText = `Age: ${monster.age}`
    monsterBio.innerText = monster.description
    let wholeMonster = document.createElement("div")
    wholeMonster.className = "monsters"
    wholeMonster.append(monsterHeader, monsterAge, monsterBio)
    let monsterParent = document.querySelector("#monster-container")
    monsterParent.appendChild(wholeMonster)
}