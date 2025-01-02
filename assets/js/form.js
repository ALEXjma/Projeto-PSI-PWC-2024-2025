// Prevent form submission and show modal instead
function showPopup(event) {
    event.preventDefault();

    const form = document.getElementById("contactForm");
    form.reset();

    const modal = new bootstrap.Modal(document.getElementById("messageSentModal"));
    modal.show();
}
