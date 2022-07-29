const comments = [];

const inputContainer = document.createElement("div");
const input = document.createElement("input");
const commentsContainer = document.querySelector("#comments-container");

input.classList.add("input");

input.addEventListener("keydown", e => {
  handleEnter(e, null)
});

commentsContainer.appendChild(inputContainer)
inputContainer.appendChild(input);

function handleEnter(e, current) {  //current es el comentario actual
  if (e.key === "Enter" && e.target.value !== "") {
    const newComment = {
      text: e.target.value,
      likes: 0,
      responses: []
    }
    if (current === null) {
      comments.unshift(newComment)
    } else {
      current.responses.unshift(newComment)
    };

    e.target.value = "";
    commentsContainer.innerHTML = "";
    commentsContainer.appendChild(inputContainer);

    renderComments(comments, commentsContainer)
  }
}

function renderComments(arr, parent) {
  arr.forEach(element => {
    const commentContainer = document.createElement("div")
    commentContainer.classList.add("comment-container");

    const responsesContainer = document.createElement("div")
    responsesContainer.classList.add("responses-container");

    const replyButton = document.createElement("button")
    const likeButton = document.createElement("button");

    const textContainer = document.createElement("div")
    textContainer.textContent = element.text;

    const accionsContainer = document.createElement("div")

    replyButton.textContent = "Reply"
    likeButton.textContent = `${element.likes > 0 ? `${element.likes} Likes` : "Like"}`;

    replyButton.addEventListener("click", e => {
       //debo clonar el input creado arriba  y cuando le coloque el atributo cloneNode se coloca true si se quiere clonar con todo y sus hijos

       const newInput = inputContainer.cloneNode(true);
       newInput.value = "";  //se le coloca un valor vacio por si cuando se clone el input de arriba venia con un comentario
       newInput.focus();
       newInput.addEventListener("keydown", e => {
        handleEnter(e, element)
       })
       //para insertar el nuevo input , y se coloca el input que se quiere add y el nombre del elemento se quiere add  antes de el
       commentContainer.insertBefore(newInput, responsesContainer)
    })

    likeButton.addEventListener("click", e => {
      element.likes++;
      likeButton.textContent = `${element.likes > 0 ? `${element.likes} Likes` : "Like"}`
    })

    //append

    commentContainer.appendChild(textContainer)
    commentContainer.appendChild(accionsContainer)
    accionsContainer.appendChild(replyButton)
    accionsContainer.appendChild(likeButton)

    commentContainer.appendChild(responsesContainer)

    if(element.responses.length > 0){
      renderComments(element.responses, responsesContainer)
    }
    parent.appendChild(commentContainer)
  });

  console.log(comments)
}