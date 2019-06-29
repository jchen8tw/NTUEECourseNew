function getSemesterYear() {
  let now = new Date();
  let minGuo = now.getFullYear() - 1911;
  return now.getMonth() > 6 ? minGuo - 1 : minGuo;
}

export function getSemester() {
  let now = new Date();
  let minGuo = now.getFullYear() - 1911;
  return now.getMonth() > 6 ? `${minGuo - 1}-2` : `${minGuo}-1`;
}

export function getStudentID(token) {
  return JSON.parse(atob(token.split('.')[1])).id;
}

export function getGrade(studentID) {
  return (getSemesterYear() % 100) - parseInt(studentID.substring(1, 3)) + 1;
}
