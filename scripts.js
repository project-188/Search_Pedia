const imageUrls = [
    "https://images.unsplash.com/photo-1529169303170-f1a6b0dad838?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yc3R8ZW58MHx8MHx8fDA%3D",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Pine-Forest_in_the_Spandauer_Forst_6.jpg/1200px-Pine-Forest_in_the_Spandauer_Forst_6.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW2zZQlVYxakwBzXBsmSYwXoEo9-Zo-m0nsA&s",
    "https://store-images.s-microsoft.com/image/apps.608.13850085746326678.a9b1e0db-29d0-40f3-a86c-2155353d053c.bc981608-3fa4-4929-82ff-b162b8788784?mode=scale&q=90&h=1080&w=1920",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1RtdvmM87PiHmXWKsF0r6xUTL0MOEOyM60Q&s",
    "https://www.bproperty.com/blog/wp-content/uploads/Rajshahi-Feature-Image-1.jpg",
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500&auto=format&fit=crop&q=60&ixlib=rb",
];

let currentIndex = 0;

function changeBackgroundImage() {
    document.body.style.backgroundImage = `url(${imageUrls[currentIndex]})`;
    currentIndex = (currentIndex + 1) % imageUrls.length;
}

setInterval(changeBackgroundImage, 10000);

changeBackgroundImage();

function playSearchSound() {
    const searchSound = document.getElementById("searchSound");
    searchSound.play();
}

function playNoResultSound() {
    const noResultSound = document.getElementById("noResultSound");
    noResultSound.play();
}

async function searchDuckDuckGo() {
    const query = document.getElementById("searchInput").value.trim();
    if (!query) {
        return;
    }

    if (query.toLowerCase() === "favourite song") {
        window.location.href = "https://youtu.be/A3FmHn-G_68?si=mfnS9M_U-4Gutn2r";
        return;
    }

    try {
        const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1`);
        if (!response.ok) {
            throw new Error('Network response was not good');
        }
        const data = await response.json();
        const bestAnswer = data.AbstractText || (data.RelatedTopics.length > 0 ? data.RelatedTopics[0].Text : "");

        if (bestAnswer) {
            document.getElementById("answer").innerText = bestAnswer;
            playSearchSound();
        } else {
            document.getElementById("answer").innerText = "No answer found Bruh";
            playNoResultSound();
        }

        if (query.toLowerCase().includes("searchpedia")) {
            document.getElementById("customAnswer").innerText = "SearchPedia is a search engine made by Junied Abrar & Fahim Hossain on May 30, 2024";
            document.getElementById("customAnswer").classList.remove("hide");
            setTimeout(() => {
                document.getElementById("customAnswer").classList.add("hide");
            }, 3000);
        } else if (query.toLowerCase().includes("junied") || query.toLowerCase().includes("fahim")) {
            document.getElementById("customAnswer").innerText = "Developer";
            document.getElementById("customAnswer").classList.remove("hide");
            setTimeout(() => {
                document.getElementById("customAnswer").classList.add("hide");
            }, 2000);
        }
    } catch (error) {
        document.getElementById("answer").innerText = "Error fetching data: " + error.message;
        console.error("Error fetching data:", error);
    }
}

function searchGoogle() {
    const query = document.getElementById("searchInput").value.trim();
    if (!query) {
        return;
    }

    playSearchSound();

    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(googleUrl, "_blank");
}

function openNewTab() {
    const newTabUrl = 'index.html';
    window.open(newTabUrl, '_blank');
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        searchDuckDuckGo();
    }
}
