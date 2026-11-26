const KEY = "elevi";
const TONES = ["#3555ff", "#ff7a45", "#14a37f", "#a85cf9", "#e5484d", "#d99a00"];

const form     = document.getElementById("studentForm");
const cardsEl  = document.getElementById("cards");
const countEl  = document.getElementById("count");
const errorEl  = document.getElementById("formError");
const searchEl = document.getElementById("search");
const clearBtn = document.getElementById("clearAll");

const fields = {
  name:  document.getElementById("name"),
  age:   document.getElementById("age"),
  group: document.getElementById("group"),
  email: document.getElementById("email")
};

// SARCINA 6: încărcarea datelor din Local Storage la deschiderea paginii
function loadStudents() {
  const saved = localStorage.getItem(KEY);
  if (!saved) return [];
  try {
    const data = JSON.parse(saved);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

let students = loadStudents();

// SARCINA 5: salvarea datelor în Local Storage
function saveStudents() {
  localStorage.setItem(KEY, JSON.stringify(students));
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

function initials(name) {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0].toUpperCase()).join("");
}

function cardHTML(s) {
  const tone = TONES[Math.floor(s.id) % TONES.length];
  return `
    <div class="col">
      <article class="card student h-100" style="--tone:${tone}">
        <div class="stripe"></div>
        <div class="avatar">${escapeHTML(initials(s.name))}</div>
        <div class="card-body text-center">
          <h3 class="card-title h5">${escapeHTML(s.name)}</h3>
          <span class="badge rounded-pill mb-2">${escapeHTML(s.group)}</span>
          <p class="mb-1 text-secondary">${s.age} ani</p>
          <p class="mail mb-0">${escapeHTML(s.email)}</p>
        </div>
        <div class="card-footer bg-white border-0 pb-3 pt-0">
          <button class="btn btn-outline-danger btn-sm w-100" data-id="${s.id}">Șterge</button>
        </div>
      </article>
    </div>`;
}

// SARCINA 4: afișarea elevilor în carduri
function renderStudents() {
  countEl.textContent = students.length;

  const query = searchEl.value.trim().toLowerCase();
  const list = students.filter(s => s.name.toLowerCase().includes(query));

  if (students.length === 0) {
    cardsEl.innerHTML = `
      <div class="col-12 empty">
        <strong>Nu există elevi înregistrați</strong>
        Completează formularul pentru a adăuga primul elev.
      </div>`;
    return;
  }

  if (list.length === 0) {
    cardsEl.innerHTML = `
      <div class="col-12 empty">
        <strong>Niciun elev găsit</strong>
        Încearcă alt nume.
      </div>`;
    return;
  }

  cardsEl.innerHTML = list.map(cardHTML).join("");
}

// SARCINA 8: validarea formularului
function showError(msg, badFields = []) {
  Object.values(fields).forEach(f => f.classList.remove("is-invalid"));
  badFields.forEach(f => f.classList.add("is-invalid"));
  errorEl.textContent = msg;
  errorEl.classList.toggle("d-none", !msg);
}

function validate() {
  const empty = Object.values(fields).filter(f => !f.value.trim());
  if (empty.length) {
    showError("Completează toate câmpurile.", empty);
    return false;
  }

  const age = Number(fields.age.value);
  if (!Number.isFinite(age) || age <= 0) {
    showError("Vârsta trebuie să fie un număr pozitiv.", [fields.age]);
    return false;
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.value.trim());
  if (!emailOk) {
    showError("Introdu o adresă de e-mail validă (ex. nume@exemplu.md).", [fields.email]);
    return false;
  }

  showError("");
  return true;
}

// SARCINA 3: crearea obiectului elev la trimiterea formularului
form.addEventListener("submit", e => {
  e.preventDefault();
  if (!validate()) return;

  const student = {
    id: Date.now(),
    name: fields.name.value.trim(),
    age: Number(fields.age.value),
    group: fields.group.value.trim(),
    email: fields.email.value.trim()
  };

  students.push(student);
  saveStudents();
  renderStudents();
  form.reset();
  fields.name.focus();
});

// SARCINA 7: ștergerea unui elev
cardsEl.addEventListener("click", e => {
  const btn = e.target.closest("button[data-id]");
  if (!btn) return;

  const id = Number(btn.dataset.id);
  students = students.filter(s => s.id !== id);
  saveStudents();
  renderStudents();
});

// SARCINA SUPLIMENTARĂ: căutare după nume
searchEl.addEventListener("input", renderStudents);

// SARCINA SUPLIMENTARĂ: șterge toți elevii (cu confirmare)
clearBtn.addEventListener("click", () => {
  if (students.length === 0) return;
  if (!confirm("Sigur vrei să ștergi toți elevii?")) return;

  students = [];
  saveStudents();
  renderStudents();
});

renderStudents();
