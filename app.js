// const score = Number(prompt("กรอกคะแนนสอบ: "));

// if(score < 0 || score > 100){
//     console.log("ข้อมูลไม่ถูกต้อง");
// }else if(score >= 50){
//     console.log("สอบผ่าน");
// }else {
//     console.log("สอบไม่ผ่าน");
// }

// ข้อ 2.1
// let scores = [45, 78, 82, 35, 90];
// for(let i = 0; i < scores.length; i++){
//     console.log("Index: ", i, "Score: ", scores[i]);
// }

// scores.push(65, 48);
// scores.pop();
// console.log("Scores : ", scores);

// const check82 = scores.includes(82);
// console.log("เช็คว่ามีคะแนน 82 คะแนนใช่หรือไม่ : ", check82);
// const check95 = scores.includes(95);
// console.log("เช็คว่ามีคะแนน 95 คะแนนใช่หรือไม่ : ", check95);

// scores.sort();
// console.log("Scores(เรียงจากน้อยไปมาก): ", scores);

// ข้อ 2.2
// let students = [
//     { id: 1, name: "Somchai", score: 48 },
//     { id: 2, name: "Somsri", score: 75 },
//     { id: 3, name: "Sompong", score: 32 },
//     { id: 4, name: "Somnak", score: 85 }
// ];

// students.forEach((student) => {
//     console.log("ชื่อนักศึกษา: " , student.name ,"ได้คะแนน: " , student.score);
// });

// const newScores = students.map((student) => {
//     return {
//         ...student,                        
//         score: student.score * 2  
//     };
// });
// console.log("อาจารย์เพิ่มคะแนนให้สองเท่าทุกคน : ", newScores);

// const pass = students.filter((student) => {
//     return student.score > 50;
// });
// console.log("นักศึกษาที่สอบผ่าน(คะแนน > 50): ", pass);

// const somsri = students.find((student) => {
//     return student.name === "Somsri";
// });
// console.log("ข้อมูลของ Somsri: ", somsri);

// ข้อ 3.1
// function calculateGrade(score){
//     if(score >= 80){
//         return "A";
//     }else if(score >= 60) {
//         return "B";
//     } else {
//         return "F";
//     }
// }

// const calculateGrade = (score) => {
//     if (score >= 80) {
//         return "A";
//     } else if (score >= 60) {
//         return "B";
//     } else {
//         return "F";
//     }
// };

// students.forEach((student) => {
//     const grade = calculateGrade(student.score);
//     console.log(student.name, "ได้คะแนน ", student.score, "ได้เกรด: ", grade);
// });

// ข้อ 3.2
const guess = Number(prompt("ต้องการทายลูกเต๋าเป็นเลขอะไร (1 - 6): "));
const result = Math.floor(Math.random() * 6) + 1;

if(guess === result){
    console.log("ยินดีด้วย! คุณทายถูกต้อง เลขที่ออกคือ ", result);
}else{
    console.log("เสียใจด้วย! คุณทายผิด บอททอยลูกเต๋าได้เลข ", result);
}