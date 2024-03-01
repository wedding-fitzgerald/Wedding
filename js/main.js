// Load JS after the DOM content is load
document.addEventListener('DOMContentLoaded', () => {

  // NAVBAR BURGER MENU

  const navbarBurgers = Array.from(document.querySelectorAll('.navbar-burger'));

  navbarBurgers.forEach(el => {
    el.addEventListener('click', () => {
      const target = el.dataset.target;
      const targetElement = document.getElementById(target);

      el.classList.toggle('is-active');
      targetElement.classList.toggle('is-active');
    });
  });

  // FAQ ACCORDION CODE

  let faq = document.getElementsByClassName("faq-button");
  let i;

  for (i = 0; i < faq.length; i++) {
    faq[i].addEventListener("click", function () {
      this.classList.toggle("active-button");
      let faqContent = this.nextElementSibling;
      let icon = this.querySelector('.fa-angle-down, .fa-angle-up');
      if (faqContent.style.display === "block") {
        faqContent.style.display = "none";
        icon.classList.remove('fa-angle-up');
        icon.classList.add('fa-angle-down');
      } else {
        faqContent.style.display = "block";
        icon.classList.remove('fa-angle-down');
        icon.classList.add('fa-angle-up');
      }
    });
  }
});

// RSVP CODE

// FORM RETURN

function rsvpResponse() {
  return false;
}

// DISPLAY FORMAND TABLE

document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.querySelector('.rsvp-search');
  const searchButton = document.querySelector('.rsvp-search-button');
  const rsvpTableSection = document.getElementById('rsvp-table');

  function searchGuest() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm === 'guest1') {
      rsvpTableSection.style.display = 'block';
    } else {
      rsvpTableSection.style.display = 'none';
    }
  }

  searchButton.addEventListener('click', searchGuest);

  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      searchGuest();
    }
  });
});

let isConfirmationModalOpen = false;

// RETRIEVE FORM INFORMATION

function getRsvpResponses() {
  const radioButtons = document.querySelectorAll('input[type="radio"]:checked');
  const email = document.getElementById('email').value;
  const responses = [];

  radioButtons.forEach(button => {
    responses.push({
      name: button.name,
      response: button.value
    });
  });

  const modalContent = `
            <div class="box">
              <p class="has-text-centered has-text-white py-2">Please confirm all information is correct</p>
              <hr class="modal-line">
                <ul>
                    ${responses.map(response => `<li class="has-text-white p-2">${response.name}: ${response.response}</li>`).join('')}
                </ul>
                <p class="no-indent has-text-white pt-4">Email: ${email}</p>
                <hr>
                <div class="control modal-buttons">
                  <button class="button cancel" type="button" onclick="closeConfirmationModal(document.getElementById('modal'))">Cancel</button>
                  <button class="button form-submit" type="submit" onclick="confirmRsvp('${email}')">Confirm</button>
                </div>
            </div>
        `;

  showModal(modalContent);
}

function confirmRsvp(email) {
  const modalContent = `
            <div class="box">
              <h3>Thanks for Confirming!!!</h3>
              <p class="has-text-white py-2">
                We look foward to seeing you on <strong class="has-text-white">DATE</strong> at the The Lodge at Traverse Mountian at 5:45!
              </p>
              <p class="has-text-white py-2">
                Please check your email (${email}) as you will soon recieve an email with more information about the event.
              </p>
              <hr>
              <div class="control modal-buttons">
                <button class="button form-submit" type="button" onclick="closeAllModals()">Close</button>
              </div>
            </div>
        `;

  showModal(modalContent);
}

function showModal(content) {
  const modal = document.getElementById('modal');
  const modalContent = modal.querySelector('.modal-content');
  modalContent.innerHTML = content;
  modal.classList.add('is-active');
}

function closeConfirmationModal($el) {
  $el.classList.remove('is-active');
  isConfirmationModalOpen = false;
}

function closeModal($el) {
  $el.classList.remove('is-active');
  if (!isConfirmationModalOpen) {
    document.getElementById("rsvp-table").style.display = "none";
    document.getElementById("rsvp-search").style.display = "none";
    document.getElementById("rsvp-complete").style.display = "block";
  }
}

function closeAllModals() {
  (document.querySelectorAll('.modal') || []).forEach(($modal) => {
    closeModal($modal);
  });
}

(document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
  const modal = $trigger.dataset.target;
  const $target = document.getElementById(modal);

  $trigger.addEventListener('click', () => {
    openModal($target);
  });
});

(document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
  const $target = $close.closest('.modal');

  $close.addEventListener('click', () => {
    closeModal($target);
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === "Escape") {
    closeAllModals();
  }
});
