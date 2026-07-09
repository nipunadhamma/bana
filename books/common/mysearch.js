/* =========================
   BOOK SEARCH ENGINE
========================= */

const searchBox = document.getElementById("searchBox");

if (searchBox) {
  searchBox.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();
    const books = document.querySelectorAll(".book");

    books.forEach((book) => {
      const text = book.innerText.toLowerCase();

      if (text.includes(query)) {
        book.style.display = "block";
      } else {
        book.style.display = "none";
      }
    });
  });
}

/* =========================
   HIGHLIGHT SEARCH (optional UX)
========================= */

function highlightText(element, query) {
  if (!query) return;

  const regex = new RegExp("(" + query + ")", "gi");

  element.innerHTML = element.textContent.replace(regex, `<mark>$1</mark>`);
}
