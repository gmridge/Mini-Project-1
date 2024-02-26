let readingGoal = 0;
let readingCount = 0;

// Function to set the reading goal
function setReadingGoal() {
    readingGoal = parseInt(document.getElementById("readingGoal").value);
    alert(`Reading goal set to ${readingGoal} books.`);
}

// Function to get books from the API
function getBooks() {
    document.getElementById("output").innerHTML = "";
    fetch("https://openlibrary.org/search.json?q=" + document.getElementById("input").value)
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < 2; i++) {
                const title = data.docs[i].title;
                const author = data.docs[i].author_name ? data.docs[i].author_name[0] : "Unknown";
                const isbn = data.docs[i].isbn ? data.docs[i].isbn[0] : "";
                const coverUrl = isbn ? `http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg` : "";
                
                // Display book details with an "Add to List" button
                document.getElementById("output").innerHTML += `
                    <div>
                        <h2>${title}</h2>
                        <p>${author}</p>
                        <img src="${coverUrl}" alt="Book cover"><br>
                        <button onclick="addToSavedList('${title}', '${author}', '${coverUrl}')">Add to List</button>
                    </div>
                    <hr>
                `;
            }
        });
}

// Function to add a book to the saved list
function addToSavedList(title, author, coverUrl) {
    const listItem = document.createElement("li");
    listItem.textContent = `${title} - ${author}`;

    // Create a card element for the book cover
    const card = document.createElement("div");
    card.classList.add("card");

    // Create an image element for the book cover
    const coverImg = document.createElement("img");
    coverImg.src = coverUrl;
    coverImg.alt = "Book Cover";

    // Append the cover image to the card
    card.appendChild(coverImg);

    // Append the card to the saved list item
    listItem.appendChild(card);

    // Append the saved list item to the "Saved Book List" container
    document.getElementById("savedBookList").appendChild(listItem);

    // Update the reading count
    readingCount++;
    document.getElementById("footerReadingCount").textContent = `Books Read: ${readingCount}`;

    // Check if the reading goal has been reached
    if (readingCount >= readingGoal) {
        celebrateGoal();
    }
}

// Function to celebrate when the reading goal is achieved
function celebrateGoal() {
    console.log("Reading goal achieved!");
    // Display fireworks and goal achieved message
    document.getElementById("fireworks-container").innerHTML = `
        <div class="firework"></div>
        <div class="firework"></div>
        <div class="firework"></div>
        <div class="firework"></div>
        <div class="firework"></div>
        <div class="goal-message">READING GOAL ACHIEVED!</div>
    `;
}

// Function to sort the saved list
function sortSavedList() {
    const sortBy = document.getElementById("sortBy").value;
    const savedBookList = document.getElementById("savedBookList");
    const books = [...savedBookList.children];

    switch (sortBy) {
        case "alphabetical":
            books.sort((a, b) => a.textContent.localeCompare(b.textContent));
            break;
        case "year":
            // Implement sorting by year released
            break;
        case "genre":
            // Implement sorting by genre
            break;
        default:
            break;
    }

    savedBookList.innerHTML = "";
    books.forEach(book => savedBookList.appendChild(book));
}
