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

async function loadMembers() {

    memberTable.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "members"));

    members = [];

    querySnapshot.forEach((document) => {

        members.push({
            id: document.id,
            ...document.data()
        });

    });

    displayMembers(members);

}

function displayMembers(data){

    memberTable.innerHTML = "";

    totalMembers.textContent = data.length;

    data.forEach(member=>{

        memberTable.innerHTML += `
        <tr>

        <td>${member.fullName}</td>

        <td>${member.phone}</td>

        <td>${member.department}</td>

        <td>${member.gender}</td>

        <td>

        <button onclick="deleteMember('${member.id}')">

        Delete

        </button>

        </td>

        </tr>
        `;

    });

}

window.deleteMember = async function(id){

    if(confirm("Delete this member?")){

        await deleteDoc(doc(db,"members",id));

        loadMembers();

    }

}

search.addEventListener("input",()=>{

    const value = search.value.toLowerCase();

    const filtered = members.filter(member=>

        member.fullName.toLowerCase().includes(value)

    );

    displayMembers(filtered);

});

loadMembers();