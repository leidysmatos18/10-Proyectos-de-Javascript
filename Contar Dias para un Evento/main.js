let events = [];
let arr = []; //Cargar informacion

const eventName = document.getElementById("eventName");
const eventDate = document.getElementById("eventDate");
const buttonAdd = document.getElementById("bAdd");
const eventsContainer = document.getElementById("eventsContainer");

const json = load()

try {
  arr = JSON.parse(json);
} catch (error) {
  arr = [];
}

events = arr ? [...arr] : [];

renderEvents();

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
});

buttonAdd.addEventListener("click", (e)=> {
 addEvent();
});

function addEvent() {
  if(eventName.value === "" || eventDate.value === "") {
    return
  };

  if(dateDiff(eventDate.value) < 0) {
    
    return;
  }

  const newEvent = {
    id: (Math.random() * 100).toString(36).slice(2),
    name: eventName.value,
    date: eventDate.value,
  }

  events.unshift(newEvent);

  save(JSON.stringify(events))
  eventName.value = "";

  renderEvents();
};

function dateDiff(d) {
  const targetDate = new Date(d)
  const today = new Date()
  const difference = targetDate.getTime() - today.getTime()
  const days = Math.ceil(difference / (1000 * 3600 * 24))
  return days
 
};

function renderEvents() {
  const eventsHTML = events.map(event => {
    return `
      <div class="event">
        <div class="days">
          <span class="days-number">${dateDiff(event.date)}</span>
          <span class="days-text">días</span>
        </div>

        <div class="event-name">${event.name}</div>
        <div class="event-date">${event.date}</div>
        <div class="actions"  >
          <button class="bDelete" data-id="${event.id}">Eliminar</button>
        </div>
      </div>
    `
  });
  eventsContainer.innerHTML = eventsHTML.join("");

  document.querySelectorAll(".bDelete").forEach(button => {
    button.addEventListener("click", e => {
      const id = button.getAttribute("data-id");
      events = events.filter(event => event.id !== id);

      save(JSON.stringify(events))

      renderEvents()
    })
  })
};

function save(data){
  localStorage.setItem("items", data)
}

function load(){
  return localStorage.getItem("items")
}

