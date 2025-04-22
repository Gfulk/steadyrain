import { GetStudents,GetSchools,DeleteStudent, AddStudent, UpdateStudent, AddSchool } from './data.js';

const mainView = document.getElementById('mainView');
const adminView = document.getElementById('adminView');

const schoolSelector = document.getElementById('schoolSelector');
const studentsSearch = document.getElementById('studentsGridSearchInput');
const studentsTableBody = document.getElementById('studentsTableBody');
const studentsTable = document.getElementById('studentsTable');

const studentsModal = document.getElementById('addStudentsModal');
const addStuentsForm = document.getElementById('addStudentsForm');
const schoolSelectorModal = document.getElementById('schoolSelectorModal');
const firstNameInput = document.getElementById('firstNameInput');
const lastNameInput = document.getElementById('lastNameInput');
const majorInput = document.getElementById('majorInput');
const isActiveCheckbox = document.getElementById('isActiveCheckbox');
const studentIdValueSpan = document.getElementById('studentIdValueSpan');

const addSchoolForm = document.getElementById('addSchoolForm');
const schoolNameInput = document.getElementById('schoolNameInput');
const schoolAdd1Input = document.getElementById('schoolAddress1Input');
const schoolAdd2Input = document.getElementById('schoolAddress2Input');
const schoolCityInput = document.getElementById('schoolCityInput');
const schoolZipInput = document.getElementById('schoolZipInput');


studentsSearch.addEventListener('change', (event) => {
    let rows = Array.from(studentsTableBody.children);
    var td, i, txtValue, filtered;
    for (i = 0; i < rows.length; i++) {
        filtered = false;

        td = rows[i].getElementsByTagName("td")[1];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.includes(studentsSearch.value)) {
            rows[i].style.display = "";
            filtered = true;
          } else {
            rows[i].style.display = "none";
          }
        }

        td = rows[i].getElementsByTagName("td")[2];
        if (td && !filtered) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.includes(studentsSearch.value)) {
            rows[i].style.display = "";
            filtered = true;
          } else {
            rows[i].style.display = "none";
          }
        }

        td = rows[i].getElementsByTagName("td")[3];
        if (td && !filtered) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.includes(studentsSearch.value)) {
            rows[i].style.display = "";
            filtered = true;
          } else {
            rows[i].style.display = "none";
          }
        }

      }
});


schoolSelector.addEventListener('change', (event) => {
    let selectedOption = schoolSelector.selectedOptions[0];
    populateStudentsGrid();
    if(selectedOption.value != "")
    {
        filterStudentsGridBySchool(selectedOption.value);
    }
});

document.getElementById('mainNavigation').addEventListener('click', (event) => {
    mainView.style.display = "block";
    adminView.style.display = "none";
});

document.getElementById('adminNavigation').addEventListener('click', (event) => {
    adminView.style.display = "block";
    mainView.style.display = "none";
});

document.getElementById('addStudentBtn').addEventListener('click', (event) => {
    studentsModal.style.display = "block";
    clearAddStudentModal();
    populateSchoolSelectorModal();
});

document.getElementById('addEditStudentsBtn').addEventListener('click', (event) => {
    let student = {
        firstname: firstNameInput.value,
        lastname: lastNameInput.value,
        schoolid: schoolSelectorModal.value,
        schoolname: schoolSelectorModal.textContent,
        major: majorInput.value,
        id: studentIdValueSpan.value
    }

    if (student.id === undefined) {
        AddStudent(student).then(result => {
            if (result) {
                alert("Successfully added/updated student record");
                clearAddStudentModal();
                populateStudentsGrid();
            }
            else {
                alert("Add/Update failed");
            }
        });
    }else{
        UpdateStudent(student).then(result => {
            if (result) {
                alert("Successfully added/updated school record");
                clearAddStudentModal();
                populateStudentsGrid();
            }
            else {
                alert("Add/Update failed");
            }
        })
    }

});


document.getElementById('addSchoolBtn').addEventListener('click', (event) => {
    event.preventDefault();
    let school = {
        name : schoolNameInput.value,
        address1 : schoolAdd1Input.value,
        address2 : schoolAdd2Input.value,
        city : schoolCityInput.value,
        zipcode : schoolZipInput.value
    }

    AddSchool(school).then(result => {
        if(result)
        {
            alert('sucessfully added school');
            schoolNameInput.value = "";
            schoolAdd1Input.value = "";
            schoolAdd2Input.value = "";
            schoolCityInput.value = "";
            schoolZipInput.value = "";
        }
        else{
            alert('failed to add school');
        }

    })
});

document.getElementById('deleteStudentBtn').addEventListener('click', (event) => {
    Array.from(studentsTableBody.children).forEach(row => {
        let cells = row.children;
        if(cells[0].children[0].value == "on")
            {
                DeleteStudent(cells[6].value).then(result => {
                    if(result)
                    {
                        studentsTableBody.removeChild(row);
                    }
                    else{
                        alert("failed to delete student");
                    }
                }); 
            }
    });
});

window.onclick = function(event) {
    if (event.target == studentsModal) {
        studentsModal.style.display = "none";
    }
  }

function populateSchoolSelectorMain()
{
    schoolSelector.appendChild(document.createElement('option'));
    GetSchools()
        .then(schools => {
            if (schools) {
                schools.forEach(school => {
                    let opt = document.createElement('option');
                    opt.value = school.id;
                    opt.text = school.name;
                    schoolSelector.appendChild(opt);
                });
            }
        });
}

function populateSchoolSelectorModal()
{
    schoolSelectorModal.replaceChildren();

        GetSchools()
        .then(schools => {
           if(schools)
            {
                schools.forEach(school => {
                    let opt = document.createElement('option');
                    opt.value = school.id;
                    opt.text = school.name;
                    schoolSelectorModal.appendChild(opt);
                });
            } 
        });
}

function populateStudentsGrid()
{
    studentsTableBody.replaceChildren();
    GetStudents().then(students => {
        students.forEach(student => {
            if(students)
            {
                populateStudentData(student);
            }
        });
    });
}

function populateStudentData(student)
{
    const row = document.createElement('tr');
    const selectCell = document.createElement('td');
    const nameCell = document.createElement('td');
    const schoolCell = document.createElement('td');
    const majorCell = document.createElement('td');
    const dateCell = document.createElement('td');
    const activeCell = document.createElement('td');
    const idCell = document.createElement('td');
    const schoolIdCell = document.createElement('td');

    nameCell.value = student.fullName;
    nameCell.textContent = student.fullName;

    schoolCell.value = student.schoolId;
    schoolCell.textContent = student.schoolName;

    majorCell.value = student.major;
    majorCell.textContent = student.major;

    dateCell.value = student.dateModified;
    dateCell.textContent = student.dateModified;

    activeCell.value = student.active;
    activeCell.textContent = student.active;

    schoolIdCell.value = student.schoolId;

    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    selectCell.innerHTML = '';
    selectCell.appendChild(checkBox);

    idCell.value = student.id;
    idCell.display= "none";

    selectCell.addEventListener('click', (item) => {
        let parentRow = selectCell.parentElement;
        Array.from(studentsTableBody.children).forEach(row => {
            if(row.rowIndex != parentRow.rowIndex)
            {
                const cells = row.getElementsByTagName('td');
                cells[0].children[0].checked = false;
            }
        })
    });

    nameCell.addEventListener('click', (event) => {
       let row = nameCell.parentElement;
       const cells = row.getElementsByTagName('td');
       let name = cells[1].value;
       let data = {firstname: name.split(',')[1], lastname:name.split(',')[0], school:cells[2].value, major:cells[3].value, active:cells[5].value, studentid:cells[7].value};
       openStudentsModal(data);
    });

    row.appendChild(selectCell);
    row.appendChild(nameCell);
    row.appendChild(schoolCell);
    row.appendChild(majorCell);
    row.appendChild(dateCell);
    row.appendChild(activeCell);
    row.appendChild(idCell);
    row.appendChild(schoolIdCell);

    studentsTableBody.appendChild(row);
}

function filterStudentsGridBySchool(schoolid)
{
   let rows = Array.from(studentsTableBody.children);
   rows.forEach(row => {
        let cells = row.children;
        if(cells[7].value != schoolid)
        {
            studentsTableBody.removeChild(row);
        }
   });
}

function openStudentsModal(data)
{
    studentsModal.style.display = "block";
    populateSchoolSelectorModal();

    firstNameInput.text = data.firstname;
    firstNameInput.value = data.firstname;
    firstNameInput.textContent = data.firstname;

    lastNameInput.text = data.lastname;
    lastNameInput.value = data.lastname;
    lastNameInput.textContent = data.lastname;

    majorInput.text = data.major;
    majorInput.value = data.major;
    majorInput.textContent = data.major;

    isActiveCheckbox.checked = data.active;

    schoolSelectorModal.value = data.school;
    document.getElementById('studentIdValue').value = data.studentid;
}

function clearAddStudentModal()
{
    firstNameInput.textContent = "";
    firstNameInput.text = "";
    firstNameInput.value = "";

    lastNameInput.textContent = "";
    lastNameInput.text = "";
    lastNameInput.value = ""

    majorInput.textContent = "";
    majorInput.text = "";
    majorInput.value = "";

    studentIdValueSpan.value = undefined;
}

populateSchoolSelectorMain();
populateStudentsGrid();