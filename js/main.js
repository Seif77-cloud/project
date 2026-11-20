let students = [];

function showError(msg) {
  let box = document.getElementById("errorBox");
  box.textContent = msg;
  box.classList.remove("d-none");
  setTimeout(() => box.classList.add("d-none"), 3000);
}

document.getElementById("addBtn").addEventListener("click", () => {
  let name = document.getElementById("studentName").value.trim();
  let g1 = Number(document.getElementById("grade1").value);
  let g2 = Number(document.getElementById("grade2").value);
  let g3 = Number(document.getElementById("grade3").value);
  let att = Number(document.getElementById("attendance").value);

  if (!name) return showError("اكتب اسم الطالب الأول");
  if (isNaN(g1) || isNaN(g2) || isNaN(g3) || isNaN(att)) return showError("املأ كل الدرجات والحضور");
  if ([g1,g2,g3,att].some(v => v < 0 || v > 100)) return showError("كل الدرجات من 0 لـ 100 بس");

  let avg = (g1 + g2 + g3) / 3;
  students.push({ name, grades: [g1,g2,g3], attendance: att, avg: avg });
  renderList();
  document.getElementById("studentName").value = "";
});

function renderList() {
  let div = document.getElementById("studentsListDiv");
  if (students.length === 0) { div.innerHTML = "لم يتم إضافة طلاب بعد."; return; }
  let html = "<table class='table'><tr><th>الاسم</th><th>المتوسط</th><th>الحضور</th></tr>";
  students.forEach(s => {
    html += `<tr><td>${s.name}</td><td>${s.avg.toFixed(1)}</td><td>${s.attendance}%</td></tr>`;
  });
  html += "</table>";
  div.innerHTML = html;
}

document.getElementById("raafaBtn").addEventListener("click", () => {
  if (students.length === 0) return showError("ضيف طلاب الأول");
  let report = "";
  students.forEach(s => {
    let originalAvg = s.avg;
    let finalAvg = originalAvg;
    let note = "ناجح بدون رأفة";
    let raafaUsed = 0;

    if (s.attendance < 75) {
      note = "راسب - غياب (حضور أقل من 75%)";
    } else if (originalAvg >= 50) {
      note = "ناجح بدون رأفة";
    } else if (originalAvg >= 45) {
      raafaUsed = 50 - originalAvg;
      finalAvg = 50;
      note = `ناجح بالرأفة (+${raafaUsed.toFixed(1)} درجة)`;
    } else {
      note = "راسب - أقل من 45% لا يستحق رأفة";
    }
    report += `<div class="border p-2 mb-2"><b>${s.name}</b> - متوسط: ${originalAvg.toFixed(1)} - نهائي: ${finalAvg.toFixed(1)} - ${note}</div>`;
  });
  document.getElementById("reportDiv").innerHTML = report;
});