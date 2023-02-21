document.addEventListener("DOMContentLoaded", () => {
    function getFiftyMonsters(x) {
        fetch("http://localhost:3000/monsters")
        .then(resp => resp.json())
        .then(data => {
            data.forEach((elem) => {
                
                renderMonster(elem, x);
            })
        })
    }
    let starting =0;
    
    
    function initialize() {
        
        getFiftyMonsters(starting+1);
        
        
        
    }
    initialize()

    function renderMonster(data, starting) {
        
        if (data.id <= starting + 49 && data.id >=starting){
            let card = document.createElement("div");
            card.className = "monster-card";
            card.innerHTML = `
            <h2>${data.name}</h2>
            <p>Age: ${data.age}</p>
            <p>Description: ${data.description}</p>
            `
            card.style.padding = "20px";
            document.querySelector("#monster-container").appendChild(card);
            
        }
        
         
        
    }
    //Make form
    let form = document.createElement("form");
    form.id = "form";
    let nameLabel = document.createElement("label");
    let nameInput = document.createElement("input");
    let ageLabel = document.createElement("label");
    let ageInput = document.createElement("input");
    let descriptionLabel = document.createElement("label");
    let descriptionBox = document.createElement("textarea");
    let createMonster = document.createElement("input");

    nameLabel.for = "name-input";
    nameLabel.innerText = "Name: ";
    nameInput.id = "name-input";
    nameInput.type = "text";

    ageLabel.for = "age-input";
    ageLabel.innerText = "Age: ";
    ageInput.id = "age-input";
    ageInput.type = "text";

    descriptionLabel.for = "description-input";
    descriptionLabel.innerText = "Description: ";
    descriptionBox.id = "description-input";
    descriptionBox.rows = "5";
    descriptionBox.cols = "50";

    createMonster.id = "submit";
    createMonster.type = "submit";
    createMonster.value = "Create Monster";

    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(ageLabel);
    form.appendChild(ageInput);
    form.appendChild(descriptionLabel);
    form.appendChild(descriptionBox);
    form.appendChild(createMonster);

    form.addEventListener("submit", handleSubmit);

    document.querySelector("#create-monster").appendChild(form);

    function handleSubmit(event) {
        event.preventDefault();
        let inputName = document.querySelector("#name-input");
        let inputAge = document.querySelector("#age-input");
        let inputDescription = document.querySelector("#description-input");
        let monsterObj = {
            name: inputName.value,
            age: inputAge.value,
            description: inputDescription.value,
        };
        function postNewMonster(obj) {
            fetch(`http://localhost:3000/monsters`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(monsterObj)
            })
            .then(resp => resp.json())
            .then(data => console.log(data))
        }
        function renderNewMonster(data) {
            let card = document.createElement("div");
            card.className= "monster-card";
            card.innerHTML = `
            <h2>${data.name}</h2>
            <p>Age: ${data.age}</p>
            <p>Description: ${data.description}</p>
            `
            card.style.padding = "20px";
            document.querySelector("#monster-container").appendChild(card);
        }
        renderNewMonster(monsterObj);
        postNewMonster(monsterObj);

    }
    

    document.querySelector("#back").addEventListener("click", ()=>{
        if (starting !== 0) {
            let currentCards = document.querySelectorAll(".monster-card");
            currentCards.forEach(elem => elem.remove());
            starting -=50;
            initialize();
        }
    });
    
    document.querySelector("#forward").addEventListener("click", () => {
        let previousCards = document.querySelectorAll(".monster-card");
        previousCards.forEach(elem => elem.remove())
        starting+=50;
        
        initialize();
        
        
    });
    

    









})