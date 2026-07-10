/* ==========================================SETTING========================================== */
const PASSWORD = "11062569";
const loveMessage = `
เธอคนพิเศษของเค้า ❤️
ขอบคุณที่เข้ามาเป็นความสุข
และเป็นรอยยิ้มในทุก ๆ วัน
ขอบคุณสำหรับทุกช่วงเวลา
ทุกความทรงจำที่สร้างด้วยกัน
ไม่ว่าจะเจอเรื่องดีหรือเรื่องร้าย
เราจะอยู่ข้างๆเธอเสมอ
ขอโทษที่ทำเรื่องให้ไม่สบายใจ
ไม่มั่นใจในตัวเค้า
รักเธอมากนะ ❤️
`;
/* ==========================================ELEMENT========================================== */
const loginPage = document.getElementById("loginPage");
const letterPage = document.getElementById("letterPage");
const messagePage = document.getElementById("messagePage");
const passwordInput = document.getElementById("password");
const unlockBtn = document.getElementById("unlockBtn");
const hint = document.getElementById("hint");
const envelope = document.querySelector(".envelope");
const typewriter = document.getElementById("typewriter");
/* ==========================================LOADING========================================== */
window.addEventListener("load", () => {
    const loading = document.getElementById("loading");
    if (loading) {
        loading.style.opacity = "0";
        setTimeout(() => {
            loading.style.display = "none";
        }, 1000);
    }
});
/* ==========================================LOGIN========================================== */
if (unlockBtn) {

    unlockBtn.addEventListener("click", () => {

        playClickSound(); // 🔊 เสียงกดปุ่ม

        if (passwordInput.value.trim() === PASSWORD) {

            loginPage.classList.add("hidden");
            letterPage.classList.remove("hidden");
            hint.innerHTML = "";

        } else {

            hint.innerHTML =
            "❌ ยังไม่ถูกนะค้าบ ❤️<br><br>💡 คำใบ้ : วันที่ขอเป็นแฟน";

            passwordInput.animate([
                { transform:"translateX(-10px)" },
                { transform:"translateX(10px)" },
                { transform:"translateX(-10px)" },
                { transform:"translateX(10px)" },
                { transform:"translateX(0px)" }
            ],{
                duration:500
            });

        }

    });

}
/* ==========================================ENTER LOGIN========================================== */
passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(() => {});
        }
        unlockBtn.click();
    }
});
/* ==========================================OPEN ENVELOPE========================================== */
const openLetter = document.getElementById("openLetter");

if (openLetter && envelope) {
    openLetter.addEventListener("click", () => {
        envelope.classList.add("open");
        const openSound = document.getElementById("openSound");
        const paperSound = document.getElementById("paperSound");
        if (openSound) {
            openSound.currentTime = 0;
            openSound.play().catch(() => {});
        }
        // เล่นเสียงกระดาษหลังจากเปิดซองนิดหน่อย
        if (paperSound) {
            setTimeout(() => {
                paperSound.currentTime = 0;
                paperSound.play().catch(() => {});
            }, 400);
        }
        setTimeout(() => {
            letterPage.classList.add("hidden");
            messagePage.classList.remove("hidden");
            startTyping();
        }, 1500);

    });
}
const clickSound = document.getElementById("clickSound");

function playClickSound(){
    if(clickSound){
        clickSound.currentTime = 0;
        clickSound.play().catch(()=>{});
    }
}
/* ==========================================TYPEWRITER========================================== */
let textIndex = 0;
function startTyping(){
    if(!typewriter) return;
    typewriter.innerHTML="";
    textIndex=0;
    const cursor=document.createElement("span");
    cursor.className="typingCursor";
    cursor.innerHTML="|";
    typewriter.appendChild(cursor);
    function typing(){
        if(textIndex<loveMessage.length){
            cursor.before(loveMessage[textIndex]);
            textIndex++;
            setTimeout(typing,60);
        }else{
            cursor.remove();
        }
    }
    typing();
}

/* ==========================================NEXT PAGE========================================== */
const memoryPage = document.getElementById("memoryPage");
const nextButton = document.getElementById("memoryButton");
if(nextButton && memoryPage){
    nextButton.addEventListener("click",()=>{

        playClickSound(); // 🔊 เสียงกดปุ่ม

        messagePage.classList.add("hidden");
        memoryPage.classList.remove("hidden");

    });
}
/* ==========================================FINAL PAGE========================================== */
const finalButton = document.getElementById("finalButton");
const finalPage = document.getElementById("finalPage");

if (finalButton && memoryPage && finalPage) {
    finalButton.addEventListener("click", () => {
        playClickSound(); // 🔊 เสียงกด
        memoryPage.classList.add("hidden");
        finalPage.classList.remove("hidden");
    });

}

/* ==========================================REPLAY========================================== */
const replay =
document.querySelector(".replay");
if(replay){
    replay.addEventListener("click",()=>{
        playClickSound(); // 🔊 เสียงกด
        setTimeout(()=>{
            window.location.reload();
        },300);
    });

}
/* ==========================================FLOATING HEART========================================== */
function createHeart(){

    const heart =
    document.createElement("div");

    heart.className="floatingHeart";

    heart.innerHTML="❤";

    heart.style.left =
    Math.random()*100+"vw";
    heart.style.animationDuration =
    4 + Math.random()*5 +"s";
    document.body.appendChild(heart);
    setTimeout(()=>{
        heart.remove();
    },9000);
}
setInterval(
    createHeart,
    3000
);
/* ==========================================CANVAS HEART========================================== */
const heartCanvas = document.getElementById("heartCanvas");
if (heartCanvas) {
    const heartCtx = heartCanvas.getContext("2d");
    let hearts = [];
    function resizeHeartCanvas() {
        heartCanvas.width = window.innerWidth;
        heartCanvas.height = window.innerHeight;
    }
    resizeHeartCanvas();
    window.addEventListener("resize", resizeHeartCanvas);
    class HeartParticle {
        constructor() {
            this.x = Math.random() * heartCanvas.width;
            this.y = heartCanvas.height + 20;
            this.size = Math.random() * 8 + 4;
            this.speed = Math.random() * 1.5 + 0.5;
            this.alpha = Math.random() * 0.8 + 0.2;
            this.swing = Math.random() * 2;
        }
        update() {
            this.y -= this.speed;
            this.x += Math.sin(this.y * 0.02) * this.swing;

            if (this.y < -20) {
                this.y = heartCanvas.height + 20;
                this.x = Math.random() * heartCanvas.width;
            }
        }
        draw() {
            heartCtx.save();
            heartCtx.globalAlpha = this.alpha;
            heartCtx.fillStyle = "#ff79b8";
            heartCtx.font = `${this.size * 3}px Arial`;
            heartCtx.fillText("❤", this.x, this.y);
            heartCtx.restore();
        }
    }
    for (let i = 0; i < 35; i++) {
        hearts.push(new HeartParticle());
    }
    function animateHeart() {
        heartCtx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);

        hearts.forEach(heart => {
            heart.update();
            heart.draw();
        });
        requestAnimationFrame(animateHeart);
    }
    animateHeart();
}
/* ==========================================STAR SYSTEM========================================== */
const starCanvas = document.getElementById("stars");

if (starCanvas) {
    const starCtx = starCanvas.getContext("2d");
    let stars = [];

    function resizeStarCanvas() {
        starCanvas.width = window.innerWidth;
        starCanvas.height = window.innerHeight;
    }
    resizeStarCanvas();
    window.addEventListener("resize", resizeStarCanvas);

    function createStars() {
        stars = [];
        for (let i = 0; i < 180; i++) {
            stars.push({
                x: Math.random() * starCanvas.width,
                y: Math.random() * starCanvas.height,
                size: Math.random() * 2 + 1,
                opacity: Math.random()
            });
        }
    }
    createStars();
    function drawStars() {
        starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);

        stars.forEach(star => {
            star.opacity += (Math.random() - 0.5) * 0.05;
            star.opacity = Math.max(0, Math.min(1, star.opacity));
            starCtx.beginPath();
            starCtx.fillStyle = `rgba(255,255,255,${star.opacity})`;
            starCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            starCtx.fill();
        });
        requestAnimationFrame(drawStars);
    }
    drawStars();
}
/* ==========================================CURSOR EFFECT========================================== */
const cursorGlow =
document.getElementById("cursorGlow");
document.addEventListener(
"mousemove",
(e)=>{
    if(cursorGlow){
        cursorGlow.style.left =
        e.clientX+"px";
        cursorGlow.style.top =
        e.clientY+"px";
    }
    if(Math.random()>0.7){
    createTrail(
        e.clientX,
        e.clientY
    );

}
});
function createTrail(x,y){
    const trail =
    document.createElement("div");
    trail.className =
    "mouseTrail";
    trail.style.left =
    x+"px";
    trail.style.top =
    y+"px";
    document.body.appendChild(
        trail
    );
    setTimeout(()=>{
        trail.remove();
    },800);
}
/* ==========================================SPARKLE CLICK========================================== */
document.addEventListener(
"click",
(e)=>{
    const sparkle =
    document.createElement("div");
    sparkle.className =
    "sparkle";
    sparkle.style.left =
    e.clientX+"px";
    sparkle.style.top =
    e.clientY+"px";
    document.body.appendChild(
        sparkle
    );
    setTimeout(()=>{
        sparkle.remove();
    },1000);
});
/* ==========================================MUSIC SYSTEM========================================== */
const musicButton =
document.querySelector(".musicButton");
const bgMusic =
document.getElementById("music");
let musicPlay = false;
if(musicButton && bgMusic){
    musicButton.addEventListener("click",()=>{
        if(musicPlay){
            bgMusic.pause();
            musicButton.classList.remove(
                "playing"
            );
            musicButton.innerHTML="🎵";
        }else{
            bgMusic.play().catch(()=>{});
            musicButton.classList.add(
                "playing"
            );
            musicButton.innerHTML="🔊";
        }
        musicPlay=!musicPlay;
    });
}
/* ==========================================LOVE COUNTER FULL========================================== */
const loveStartDate =
new Date("2026-06-11T00:00:00");
function updateFullCounter(){
    const now =
    new Date();
    let diff =
    now - loveStartDate;
    const seconds =
    Math.floor(
        diff / 1000
    );
    const days =
    Math.floor(
        seconds / 86400
    );
    const hours =
    Math.floor(
        (seconds % 86400) / 3600
    );
    const minutes =
    Math.floor(
        (seconds % 3600) / 60
    );
    const secs =
    seconds % 60;
    const year =
    Math.floor(
        days / 365
    );
    const month =
    Math.floor(
        (days % 365) / 30
    );
    const day =
    days % 30;
    const yearBox =
    document.getElementById("loveYear");
    const monthBox =
    document.getElementById("loveMonth");
    const dayBox =
    document.getElementById("loveDay");
    const hourBox =
    document.getElementById("loveHour");
    const minuteBox =
    document.getElementById("loveMinute");
    const secondBox =
    document.getElementById("loveSecond");
    if(yearBox)
    yearBox.innerHTML=year;
    if(monthBox)
    monthBox.innerHTML=month;
    if(dayBox)
    dayBox.innerHTML=day;
    if(hourBox)
    hourBox.innerHTML=hours;
    if(minuteBox)
    minuteBox.innerHTML=minutes;
    if(secondBox)
    secondBox.innerHTML=secs;
}
setInterval(
    updateFullCounter,
    1000
);
updateFullCounter();
/* ==========================================PHOTO SLIDER========================================== */
const photos = [
    "assets/images/photo1.jpg",
    "assets/images/photo2.jpg",
    "assets/images/photo3.jpg",
    "assets/images/photo4.jpg",
    "assets/images/photo5.jpg"
];
let photoIndex=0;
const galleryImage =
document.querySelector(".gallery img");
if(galleryImage){
    galleryImage.onerror=()=>{
        galleryImage.src="assets/images/photo1.jpg";
    };
}
function changePhoto(){
    if(!galleryImage)
    return;
    galleryImage.style.opacity="0";
    setTimeout(()=>{
        photoIndex++;
        if(photoIndex >= photos.length){
            photoIndex=0;
        }
        galleryImage.src =
        photos[photoIndex];
        galleryImage.style.opacity="1";
    },700);
}
setInterval(
    changePhoto,
    5000
);
/* ==========================================SECRET MESSAGE========================================== */
const secretButton =
document.querySelector(".secretButton");
const secretMessage =
document.querySelector(".secretMessage");
if(secretButton && secretMessage){
    secretButton.addEventListener("click",()=>{
        secretMessage.classList.toggle(
            "active"
        );
    });
}
/* ==========================================CLOSE SECRET========================================== */
document.addEventListener(
"click",
(e)=>{
    if(
        secretMessage &&
        secretButton &&
        !secretMessage.contains(e.target) &&
        !secretButton.contains(e.target)
    ){
        secretMessage.classList.remove(
            "active"
        );
    }
});
/* ==========================================RANDOM HEART BURST========================================== */
function heartBurst(x,y){
    for(let i=0;i<15;i++){
        const heart =
        document.createElement("div");
        heart.innerHTML="❤";
        heart.style.position="fixed";
        heart.style.left =
        x+"px";
        heart.style.top =
        y+"px";
        heart.style.color =
        "#ff7eb7";
        heart.style.fontSize =
        Math.random()*20+10+"px";
        heart.style.pointerEvents =
        "none";
        heart.style.zIndex="999";
        document.body.appendChild(
            heart
        );
        const moveX =
        (Math.random()-0.5)*200;
        const moveY =
        (Math.random()-0.5)*200;
        heart.animate([
            {
                transform:
                "translate(0,0)",
                opacity:1
            },
            {
                transform:
                `translate(${moveX}px,${moveY}px)`,
                opacity:0
            }
        ],{
            duration:1000,
            easing:"ease-out"
        });
        setTimeout(()=>{
            heart.remove();
        },1000);
    }
}
/* ==========================================HEART CLICK EFFECT========================================== */
document.addEventListener(
"dblclick",
(e)=>{
    heartBurst(
        e.clientX,
        e.clientY
    );
});
/* ==========================================SMOOTH PAGE TRANSITION========================================== */
function pageFade(page){
    page.style.animation =
    "fadeIn .8s ease";
}
/* ==========================================WELCOME EFFECT========================================== */
setTimeout(()=>{
    const welcome =
    document.querySelector(".centerBox h1");
    if(welcome){
        welcome.animate([
            {
                transform:"translateY(-20px)",
                opacity:0
            },
            {
                transform:"translateY(0)",
                opacity:1
            }
        ],{
            duration:1000
        });
    }
},2000);
/* ==========================================3D PARALLAX========================================== */
const parallaxItems =
document.querySelectorAll(".glass,.card,.finalCard,.memoryBox");
document.addEventListener(
"mousemove",
(e)=>{
    const x =
    (window.innerWidth/2 - e.clientX) / 50;
    const y =
    (window.innerHeight/2 - e.clientY) / 50;
    parallaxItems.forEach(item=>{
        item.style.transform =
        `translate(${x}px,${y}px)`;
    });
});
/* ==========================================MOUSE TILT CARD========================================== */
const tiltCards =
document.querySelectorAll(".card,.finalCard,.memoryContent");
tiltCards.forEach(card=>{
    card.addEventListener(
    "mousemove",
    (e)=>{
        const rect =
        card.getBoundingClientRect();
        const x =
        e.clientX - rect.left;
        const y =
        e.clientY - rect.top;
        const rotateX =
        ((y-rect.height/2) /
        rect.height) * -10;
        const rotateY =
        ((x-rect.width/2) /
        rect.width) * 10;
        card.style.transform =
        `perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)`;
    });
    card.addEventListener(
    "mouseleave",
    ()=>{
        card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0)";
    });
});
/* ==========================================FIREWORK LOVE EFFECT========================================== */
function createFirework(x,y){
    for(let i=0;i<30;i++){
        const particle =
        document.createElement("div");
        particle.style.position =
        "fixed";
        particle.style.width =
        "6px";
        particle.style.height =
        "6px";
        particle.style.borderRadius =
        "50%";
        particle.style.background =
        "#ff8fc4";
        particle.style.left =
        x+"px";
        particle.style.top =
        y+"px";
        particle.style.pointerEvents =
        "none";
        particle.style.zIndex =
        "9999";
        document.body.appendChild(
            particle
        );
        const angle =
        Math.random()*Math.PI*2;
        const distance =
        Math.random()*150+50;
        const moveX =
        Math.cos(angle)*distance;
        const moveY =
        Math.sin(angle)*distance;
        particle.animate([
            {
                transform:"translate(0,0)",
                opacity:1
            },
            {
                transform:
                `translate(${moveX}px,${moveY}px)`,
                opacity:0
            }
        ],{
            duration:1200,
            easing:"ease-out"
        });
        setTimeout(()=>{
            particle.remove();
        },1200);
    }
}

/* ==========================================FINAL LOVE FIREWORK========================================== */
if (finalPage) {
    let fireworkInterval;
    const observer = new MutationObserver(() => {
        if (
            !finalPage.classList.contains("hidden") &&
            !fireworkInterval
        ) {
            fireworkInterval = setInterval(() => {
                createFirework(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight
                );
            }, 1500);
        }
    });
    observer.observe(finalPage, {
        attributes: true,
        attributeFilter: ["class"]
    });
}
/* ==========================================ENDING CONFETTI========================================== */
function createConfetti(){
    const confetti =
    document.createElement("div");
    confetti.style.position =
    "fixed";
    confetti.style.top =
    "-20px";
    confetti.style.left =
    Math.random()*100+"vw";
    confetti.style.width =
    "10px";
    confetti.style.height =
    "18px";
    confetti.style.background =
    "#ff8fc4";
    confetti.style.transform =
    `rotate(${Math.random()*360}deg)`;
    confetti.style.zIndex =
    "999";
    confetti.style.pointerEvents =
    "none";
    document.body.appendChild(
        confetti
    );
    confetti.animate([
        {
            transform:
            "translateY(0) rotate(0deg)"
        },
        {
            transform:
            `translateY(110vh)
            rotate(720deg)`
        }
    ],{
        duration:
        3000+Math.random()*3000,
        easing:"linear"
    });
    setTimeout(()=>{
        confetti.remove();
    },6000);
}
if(finalPage){
    setInterval(()=>{
        if(
        !finalPage.classList.contains("hidden")
        ){
            createConfetti();
        }
    },300);
}
/* ==========================================ANTI BUG SYSTEM========================================== */
window.addEventListener(
"error",
(e)=>{
    console.error(
        "Love Website Error:",
        e.message
    );
});
/* ==========================================AUTO SAVE PROGRESS========================================== */
window.addEventListener(
"beforeunload",
()=>{
    localStorage.setItem(
        "loveVisit",
        new Date()
    );
});
/* ==========================================WELCOME FINAL EFFECT========================================== */
setTimeout(()=>{
    const welcome =
    document.querySelector(".centerBox h1");
    if(welcome){
        welcome.animate([
            {
                transform:"translateY(-20px)",
                opacity:0
            },
            {
                transform:"translateY(0)",
                opacity:1
            }
        ],{
            duration:1000
        });
    }
},2000);
/* ==========================================END WEBSITE========================================== */
console.log(
"❤️ Anniversary Website Loaded Successfully ❤️"
);
