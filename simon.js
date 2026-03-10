/** * STEP 1: Global Variables (Game ki State)
 * In variables mein game ka saara data save rehta hai.
 */
let gameseq = []; // Computer jo sequence generate karega
let userseq = []; // User jo buttons press karega

let started = false; // Game shuru hua ya nahi
let level = 0; // Current level track karne ke liye

let h3 = document.querySelector("h3"); // Level aur hints dikhane ke liye
let btns = ["btn-yellow", "btn-red", "btn-purple", "btn-green"]; // Colors ki list
let allbtns = document.querySelectorAll('.btn'); // Saare button elements select kiye

/** * STEP 2: Game Initiation (Shuruat)
 * Jab user koi key dabata hai, tabhi game shuru hota hai.
 */
document.addEventListener('keypress', function() {
    if (started == false) {
        started = true; // Flag true kar diya taaki baar baar restart na ho
        levelup(); // Pehla level shuru karo
    }    
});

/** * STEP 3: TUI & Visual Feedback (Flash Functions)
 * User ko dikhane ke liye ki kaunsa button active hai.
 */
function btnflash(btn) {
    // Computer wala flash (White/Bright)
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 150);
}

function userflash(btn) {
    // User wala flash (Greenish color)
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 150);
}

/** * STEP 4: Level Logic (Level Up)
 * Har naye level pe ek naya random color add hota hai.
 */
function levelup() {
    userseq = []; // Har level mein user ko shuru se match karna padta hai
    level++; // Level badhao
    h3.innerText = `Level : ${level}`; // UI update karo

    // Random Index select karo (0 to 3)
    // Pehle aapka code *3 tha, jisse 4th color nahi aata tha. Ab *4 hai.
    let rndIdx = Math.floor(Math.random() * 4); 
    let randclr = btns[rndIdx]; // Random color name
    let randbtn = document.querySelector(`.${randclr}`); // Uss color ka HTML element
    
    gameseq.push(randclr); // Computer ki sequence mein save karo
    btnflash(randbtn); // User ko dikhao kaunsa button press hua
}

/** * STEP 5: Validation Logic (Checking the Sequence)
 * User ne jo dabaya wo sahi hai ya nahi?
 */
function checkbtn() {
    let idx = userseq.length - 1; // Current index jo user ne abhi dabaya

    if (userseq[idx] === gameseq[idx]) {
        // Agar abhi tak ka match sahi hai
        if (userseq.length === gameseq.length) {
            // Agar user ne puri sequence sahi match kar di
            setTimeout(levelup, 1000); // Agle level pe jao
        }
    } else {
        // Galat button dabane par Game Over
        h3.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to restart.`;
        
        // TUI feedback: Screen ko red flash karna
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        reset(); // Data clear karo
    }
}

/** * STEP 6: User Interaction
 * Jab user physical button pe click karta hai.
 */
function btnpress() {
    let btn = this; // 'this' matlab wo button jo click hua
    userflash(btn); // Visual feedback

    let usercolor = btn.getAttribute("id"); // Button ki ID lo (e.g., "btn-red")
    userseq.push(usercolor); // User sequence mein add karo

    checkbtn(); // Match check karne ke liye function call karo
}

// Saare buttons pe 'click' listener lagana
for (let btn of allbtns) {
    btn.addEventListener('click', btnpress);
}

/** * STEP 7: Reset Logic
 * Game over hone ke baad variables ko purani state mein lana.
 */
function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}