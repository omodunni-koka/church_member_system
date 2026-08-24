// ================================
// TEMMS - ADMIN.JS
// Church Member Admin Dashboard
// ================================

import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const memberTable = document.getElementById("memberTable");

const totalMembers = document.getElementById("totalMembers");

const search = document.getElementById("search");


let members = [];


// ================================
// LOAD MEMBERS
// ================================

async function loadMembers() {

    memberTable.innerHTML = "";

    try {

        const querySnapshot =
            await getDocs(
                collection(db, "members")
            );


        members = [];


        querySnapshot.forEach((document) => {

            members.push({

                id: document.id,

                ...document.data()

            });

        });


        displayMembers(members);

    }

    catch (error) {

        console.error(
            "Error loading members:",
            error
        );

        memberTable.innerHTML = `
            <tr>
                <td colspan="10">
                    Unable to load members.
                </td>
            </tr>
        `;

    }

}


// ================================
// DISPLAY MEMBERS
// ================================

function displayMembers(data) {

    memberTable.innerHTML = "";

    totalMembers.textContent =
        data.length;


    data.forEach(member => {


        const department =
            Array.isArray(member.department)

                ? member.department.join(", ")

                : (member.department || "Member");


        const photo =
            member.photoUrl

                ? `
                    <img
                        src="${member.photoUrl}"
                        alt="Passport"
                        style="
                            width:60px;
                            height:60px;
                            object-fit:cover;
                            border-radius:50%;
                        "
                    >
                  `

                : "No Photo";


        memberTable.innerHTML += `

            <tr>

                <td>
                    ${photo}
                </td>


                <td>
                    ${member.fullName || ""}
                </td>


                <td>
                    ${member.phone || ""}
                </td>


                <td>
                    ${member.email || ""}
                </td>


                <td>
                    ${member.dateOfBirth || ""}
                </td>


                <td>
                    ${member.gender || ""}
                </td>


                <td>
                    ${member.address || ""}
                </td>


                <td>
                    ${department}
                </td>


                <td>

                    <button
                        onclick="deleteMember('${member.id}')"
                    >
                        Delete
                    </button>

                </td>

            </tr>

        `;

    });

}


// ================================
// DELETE MEMBER
// ================================

window.deleteMember = async function(id) {

    if (!confirm("Delete this member?")) {

        return;

    }


    try {

        await deleteDoc(
            doc(db, "members", id)
        );


        await loadMembers();

    }

    catch (error) {

        console.error(
            "Delete error:",
            error
        );

        alert(
            "Unable to delete this member."
        );

    }

};


// ================================
// SEARCH
// ================================

search.addEventListener(
    "input",
    () => {

        const value =
            search.value
                .toLowerCase()
                .trim();


        const filtered =
            members.filter(member => {

                const name =
                    (
                        member.fullName || ""
                    ).toLowerCase();


                const phone =
                    (
                        member.phone || ""
                    ).toLowerCase();


                const email =
                    (
                        member.email || ""
                    ).toLowerCase();


                return (
                    name.includes(value) ||
                    phone.includes(value) ||
                    email.includes(value)
                );

            });


        displayMembers(filtered);

    }
);


// ================================
// START
// ================================

loadMembers();