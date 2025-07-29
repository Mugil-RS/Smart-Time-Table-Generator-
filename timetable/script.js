function parseSubjects(inputId) {
  const raw = document.getElementById(inputId).value;
  return raw.split(",").map(item => {
    const [subject, teacher] = item.split(":").map(x => x.trim());
    return subject && teacher ? `${subject} (${teacher})` : null;
  }).filter(Boolean);
}

function generateTimetable() {
  const subjectsByClass = {
    "Class A": parseSubjects("classAInput"),
    "Class B": parseSubjects("classBInput"),
    "Class C": parseSubjects("classCInput"),
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const periodsWithBreaks = [
    { type: "period", time: "9:00 - 9:45" },
    { type: "period", time: "9:45 - 10:30" },
    { type: "break",  label: "Short Break", time: "10:30 - 10:45" },
    { type: "period", time: "10:45 - 11:30" },
    { type: "period", time: "11:30 - 12:15" },
    { type: "break",  label: "Lunch Break", time: "12:15 - 1:00" },
    { type: "period", time: "1:00 - 1:45" },
    { type: "period", time: "1:45 - 2:30" },
    { type: "break",  label: "Short Break", time: "2:30 - 2:45" },
    { type: "period", time: "2:45 - 3:30" },
    { type: "period", time: "3:30 - 4:15" },
  ];

  let output = "";

  for (const className in subjectsByClass) {
    const subjectList = subjectsByClass[className];

    if (subjectList.length === 0) {
      alert(`Please enter valid subjects for ${className}`);
      return;
    }

    output += `<div class="table-container"><h2>${className}</h2><table>`;
    output += `<tr><th>Day</th>`;

    periodsWithBreaks.forEach((entry, i) => {
      if (entry.type === "period") {
        output += `<th>P${i + 1}<br><small>${entry.time}</small></th>`;
      } else {
        output += `<th style="color: #999;">${entry.label}<br><small>${entry.time}</small></th>`;
      }
    });
    output += `</tr>`;

    days.forEach(day => {
      output += `<tr><td>${day}</td>`;
      periodsWithBreaks.forEach(entry => {
        if (entry.type === "period") {
          const subject = subjectList[Math.floor(Math.random() * subjectList.length)];
          output += `<td>${subject}</td>`;
        } else {
          output += `<td style="color:#888; font-style: italic;">${entry.label}</td>`;
        }
      });
      output += `</tr>`;
    });

    output += `</table></div>`;
  }

  document.getElementById("tables").innerHTML = output;
}
