function displayModal() {
    const modal = document.getElementById("contact_modal");
    const firstInput = modal.querySelector("input");
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "contact_modal_title");

    if (firstInput) {
        firstInput.focus();
    }
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


// Gestion du submit du formulaire
const form = document.querySelector('#contact_modal');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault()

    const firstname = document.getElementById("firstname").value;
    const surname = document.getElementById("surname").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("contact_message").value;

    console.log("Formulaire soumis :", {
        firstname,
        surname,
        email,
        message
    });

    closeModal();
  });
}