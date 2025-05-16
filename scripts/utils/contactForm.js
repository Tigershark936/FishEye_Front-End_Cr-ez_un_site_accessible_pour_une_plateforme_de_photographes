const main = document.getElementById("main");

export function displayModal() {
  const modal = document.getElementById("contact_modal");
  const firstInput = modal.querySelector("input");
  modal.style.display = "block";
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-labelledby", "contact_modal_title");

  // Rendre le fond inaccessible pour le Tab quand le form est en block
  main.setAttribute("inert", "");

  // Mise au focus du premier champ du formulaire
  if (firstInput) {
    firstInput.focus();
  }

  // Écoute de la touche Échap pour fermer le formulary de contact
  document.addEventListener("keydown", handleEscape);
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");

  // Rendre le fond à nouveau accessible
  main.removeAttribute("inert");
}

// Gestion touche Échap
function handleEscape(e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal();
  }
}

// Gestion du submit du formulaire
const form = document.querySelector("#contact_modal");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstname = document.getElementById("firstname").value;
    const surname = document.getElementById("surname").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("contact_message").value;

    console.log("Formulaire soumis :", {
      firstname,
      surname,
      email,
      message,
    });

    closeModal();
  });
}

//AJOUT : fermeture via le bouton croix
const closeBtn = document.querySelector(".modal-close-button");
if (closeBtn) {
  closeBtn.addEventListener("click", closeModal);
}