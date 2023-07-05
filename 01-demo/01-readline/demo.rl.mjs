

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

// programmation asynchrone en JS

// 1. Callback
// 2. Promesse
// 3. async/await (Promesse)


// version await
const saisie = await rl.question('Hello ?')
console.log('saisie', saisie)
const saisie2 = await rl.question('2nd question ?')
console.log('saisie 2', saisie2)
rl.close()

// version .then
// const reponse = rl.question('Hello ?')
//
// reponse.then(saisie => {
//     console.log('saisie', saisie)
//     const reponse2 = rl.question('2nd question ?')
//
//     reponse2.then(saisie2 => {
//         console.log('saisie 2', saisie2)
//
//         rl.close()
//     })
//
// })


