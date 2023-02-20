import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { firebaseConfig } from "./config.mjs";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const submit = document.getElementById('submit_form');

function getVoterID(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

submit.addEventListener("click", writeData);

function writeData() {
  const db = getDatabase();
  const voterID = getVoterID(8);
  let answer = document.getElementById("answer").value;
  console.log(answer);
  set(ref(db, 'votes/' + voterID + '/'), {
    voter: voterID,
    selectedPupper: answer
  });
}

