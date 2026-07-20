// ================================
// TEMMS - SCRIPT.JS
// RCCG Trinity Excellence Registration
// ================================

import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ================================
// PAGES
// ================================

const welcomePage = document.getElementById("welcomePage");
const formPage = document.getElementById("formPage");
const successPage = document.getElementById("successPage");


// ================================
// BUTTONS
// ================================

const startBtn = document.getElementById("startBtn");
const registerAgain = document.getElementById("registerAgain");
const submitBtn = document.getElementById("submitBtn");


// ================================
// FORM
// ================================

const memberForm = document.getElementById("memberForm");


// ================================
// DEPARTMENT
// ================================

const deptYes = document.getElementById("deptYes");
const deptNo = document.getElementById("deptNo");
const departmentSection = document.getElementById("departmentSection");


// ================================
// CONFIRMATION
// ================================

const confirmInfo = document.getElementById("confirmInfo");


// ================================
// IMAGE PREVIEW
// ================================

const picture = document.getElementById("picture");
const previewImage = document.getElementById("previewImage");


// ================================
// START REGISTRATION
// ================================

startBtn.addEventListener("click", () => {

    welcomePage.classList.remove("active");
    formPage.classList.add("active");

});


// ================================
// SHOW/HIDE DEPARTMENTS
// ================================

deptYes.addEventListener("change", () => {

    departmentSection.style.display = "block";

});

deptNo.addEventListener("change", () => {

    departmentSection.style.display = "none";

    document.querySelectorAll('input[name="department"]').forEach(box => {

        box.checked = false;

    });

});


// ================================
// ENABLE SUBMIT
// ================================

confirmInfo.addEventListener("change", () => {

    submitBtn.disabled = !confirmInfo.checked;

});


// ================================
// IMAGE PREVIEW
// ================================

picture.addEventListener("change", () => {

    const file = picture.files[0];

    if(file){

        previewImage.src = URL.createObjectURL(file);
        previewImage.style.display = "block";

    }

});
// ================================
// FORM SUBMISSION
// ================================

memberForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    // Department validation
    let departmentValue = "";

    if (deptNo.checked) {

        departmentValue = "Member";

    } else if (deptYes.checked) {

        const selectedDepartments = [];

        document
            .querySelectorAll('input[name="department"]:checked')
            .forEach(dept => {

                selectedDepartments.push(dept.value);

            });

        if (selectedDepartments.length === 0) {

            alert("Please select at least one department.");
            return;

        }

        departmentValue = selectedDepartments;

    } else {

        alert("Please indicate whether you belong to a department.");
        return;

    }

    // Disable button while saving
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    try {

        await addDoc(collection(db, "members"), {

            fullName: document.getElementById("fullname").value.trim(),

            phone: document.getElementById("phone").value.trim(),

            email: document.getElementById("email").value.trim(),

            dateOfBirth: document.getElementById("dob").value,

            gender: document.getElementById("gender").value,

            address: document.getElementById("address").value.trim(),

            department: departmentValue,

            registeredAt: serverTimestamp()

        });

        // Show success page
        formPage.classList.remove("active");
        successPage.classList.add("active");

    } catch (error) {

        console.error(error);

        alert("Registration failed. Please check your internet connection and try again.");

        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";

    }

});


// ================================
// REGISTER ANOTHER MEMBER
// ================================

registerAgain.addEventListener("click", () => {

    memberForm.reset();

    previewImage.src = "";
    previewImage.style.display = "none";

    departmentSection.style.display = "none";

    submitBtn.textContent = "Submit";
    submitBtn.disabled = true;

    successPage.classList.remove("active");
    welcomePage.classList.add("active");

});