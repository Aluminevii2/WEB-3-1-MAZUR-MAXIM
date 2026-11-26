// ===== SARCINA 1: tabloul de obiecte (studenții) =====
const students = [
  { id: 1, name: "Maria Rusu",      group: "TI-231", age: 19, specialty: "Informatică",   color: "#3555ff" },
  { id: 2, name: "Andrei Munteanu", group: "TI-231", age: 20, specialty: "Informatică",   color: "#ff7a45" },
  { id: 3, name: "Elena Ciobanu",   group: "DW-222", age: 18, specialty: "Design web",    color: "#14a37f" },
  { id: 4, name: "Victor Lungu",    group: "SI-221", age: 21, specialty: "Securitate IT", color: "#a85cf9" },
  { id: 5, name: "Irina Botnaru",   group: "DW-222", age: 19, specialty: "Design web",    color: "#e5484d" }
];

let nextId = Math.max(...students.map(s => s.id)) + 1;

const cardsEl  = document.getElementById("cards");
const countEl  = document.getElementById("count");
const form     = document.getElementById("studentForm");
const errorEl  = document.getElementById("formError");
const cssView  = document.getElementById("cssView");
const gapInput = document.getElementById("gap");
const gapOut   = document.getElementById("gapOut");

const fields = {
  name:      document.getElementById("name"),
  group:     document.getElementById("group"),
  age:       document.getElementById("age"),
  specialty: document.getElementById("specialty")
};

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

function initials(name) {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0].toUpperCase()).join("");
}

function cardHTML(s) {
  return `
    <article class="card" style="--tone:${escapeHTML(s.color)}">
      <div class="card-head"></div>
      <div class="ph">${escapeHTML(initials(s.name))}</div>
      <div class="card-body">
        <h3>${escapeHTML(s.name)}</h3>
        <span class="badge">${escapeHTML(s.group)}</span>
        <ul class="facts">
          <li>Vârsta <b>${s.age} ani</b></li>
          <li>Specialitatea <b>${escapeHTML(s.specialty)}</b></li>
          <li>ID <b>#${s.id}</b></li>
        </ul>
      </div>
      <button class="btn-del" data-id="${s.id}">Șterge</button>
    </article>`;
}

// SARCINA 1 + 3: afișarea listei (și mesajul când lista e goală)
function renderStudents() {
  countEl.textContent = students.length;

  if (students.length === 0) {
    cardsEl.innerHTML = `
      <div class="empty">
        <strong>Lista este goală</strong>
        Nu există niciun student. Adaugă unul din formularul din stânga.
      </div>`;
    return;
  }

  cardsEl.innerHTML = students.map(cardHTML).join("");
}

// ===== SARCINA 2: adăugarea unui student prin formular =====
function showError(msg, badFields = []) {
  Object.values(fields).forEach(f => f.classList.remove("invalid"));
  badFields.forEach(f => f.classList.add("invalid"));
  errorEl.textContent = msg;
  errorEl.hidden = !msg;
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const name      = fields.name.value.trim();
  const group     = fields.group.value.trim();
  const specialty = fields.specialty.value.trim();
  const ageRaw    = fields.age.value.trim();
  const color     = form.elements.color.value;

  const empty = [];
  if (!name)      empty.push(fields.name);
  if (!group)     empty.push(fields.group);
  if (!ageRaw)    empty.push(fields.age);
  if (!specialty) empty.push(fields.specialty);
  if (empty.length) {
    showError("Completează toate câmpurile.", empty);
    return;
  }

  const age = Number(ageRaw);
  if (!Number.isInteger(age) || age < 14 || age > 100) {
    showError("Vârsta trebuie să fie un număr întreg între 14 și 100.", [fields.age]);
    return;
  }

  students.push({ id: nextId++, name, group, age, specialty, color });

  form.reset();
  showError("");
  renderStudents();
  fields.name.focus();
});

// ===== SARCINA 3: ștergerea unui student după ID =====
cardsEl.addEventListener("click", e => {
  const btn = e.target.closest(".btn-del");
  if (!btn) return;

  const id = Number(btn.dataset.id);
  const index = students.findIndex(s => s.id === id);
  if (index !== -1) students.splice(index, 1);

  renderStudents();
});

// ===== SARCINA 4: Flexbox =====
const flexState = {
  justifyContent: "flex-start",
  alignItems: "stretch",
  flexWrap: "wrap",
  gap: 20
};

function applyFlex() {
  cardsEl.style.justifyContent = flexState.justifyContent;
  cardsEl.style.alignItems     = flexState.alignItems;
  cardsEl.style.flexWrap       = flexState.flexWrap;
  cardsEl.style.gap            = flexState.gap + "px";

  cssView.textContent =
`.cards {
  display: flex;
  justify-content: ${flexState.justifyContent};
  align-items: ${flexState.alignItems};
  flex-wrap: ${flexState.flexWrap};
  gap: ${flexState.gap}px;
}`;
}

function bindGroup(groupId, stateKey) {
  const group = document.getElementById(groupId);
  const buttons = group.querySelectorAll("button");

  const mark = () => buttons.forEach(b =>
    b.classList.toggle("active", b.dataset.value === flexState[stateKey]));

  group.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;
    flexState[stateKey] = btn.dataset.value;
    mark();
    applyFlex();
  });
  mark();
}

bindGroup("justifyBtns", "justifyContent");
bindGroup("alignBtns",   "alignItems");
bindGroup("wrapBtns",    "flexWrap");

gapInput.addEventListener("input", () => {
  flexState.gap = Number(gapInput.value);
  gapOut.textContent = flexState.gap + "px";
  applyFlex();
});

renderStudents();
applyFlex();
