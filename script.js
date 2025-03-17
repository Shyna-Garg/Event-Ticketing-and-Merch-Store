function init() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });
    
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}
init();
             
function circleMouse() {
  var miniCircle = document.querySelector("#minicircle");

    window.addEventListener("mousemove", function (dets) {
        gsap.to(miniCircle, {
            x: dets.clientX,
            y: dets.clientY,
            duration: 0.2,
            ease: "power2.out"
        });
    });
}

circleMouse();

 function textAnim(){
    var tl2=gsap.timeline();
       tl2.to(".boundingelem",{
      y:0,
        ease:Expo.easeInOut,
        duration:2,
        stagger:.2
        })
        .to(".boundingvid",{
            y:0,
            ease:Expo.easeInOut,
            duration:2,
        })
    }
     textAnim()   
 
var tl1 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        start: "top 40",
        end: "top 20",
        scrub: 3
    }
});

tl1.to(".page1 h1", { x: "-100", color: "#1E90FF" }, "anim");
tl1.to(".page1 h2", { x: "100", color: "#1E90FF" }, "anim");
tl1.to(".page1 video", { scale: 1.8, ease: "power2.inOut" }, "anim");


let tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        start: "top -2%", 
        end: "top -150%", 
        scrub: 3
    }
});

tl.to(".page1", { backgroundColor: "#fff"})
.to(".page2", { backgroundColor: "#fff"}, "<"); // Dono transitions ek sath honge

var miniCircle = document.querySelector("#minicircle"); // Define miniCircle
var boxes=document.querySelectorAll(".box")
    boxes.forEach(function(elem){
    elem.addEventListener("mouseenter",function(){
        var att=elem.getAttribute("data-image")
        console.log('att')
        miniCircle.style.width="450px"
        miniCircle.style.height="380px"
        miniCircle.style.borderRadius="0"
        miniCircle.style.backgroundImage=`url(${att})`
        miniCircle.style.backgroundSize = "cover";  
        miniCircle.style.backgroundPosition = "center";
        miniCircle.style.boxShadow = "0px 0px 30px rgba(255, 255, 255, 0.4)"; // Glow effect
    });

    elem.addEventListener("mouseleave",function(){
        miniCircle.style.width="20px"
        miniCircle.style.height="20px"
        miniCircle.style.borderRadius="50%"
        miniCircle.style.backgroundImage=`none`
        miniCircle.style.boxShadow = "0px 0px 10px rgba(255, 255, 255, 0.2)";

    })

    })
    let tl4 = gsap.timeline({
        scrollTrigger: {
            trigger: ".page2",
            scroller: ".main",
            start: "top -40%", 
            end: "top -150%", 
            scrub: 2
        }
    });
    
    tl4.to(".page2", { backgroundColor: "#181818"})
    .to(".page3", { backgroundColor: "#181818"}, "<");

    document.getElementById("startScan").addEventListener("click", function () {
        let video = document.getElementById("qr-video");
        let canvasElement = document.createElement("canvas");
        let canvas = canvasElement.getContext("2d");
    
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
            .then(function (stream) {
                video.srcObject = stream;
                video.setAttribute("playsinline", true);
                video.play();
    
                setInterval(() => {
                    canvasElement.width = video.videoWidth;
                    canvasElement.height = video.videoHeight;
                    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
                    let imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
                    let code = jsQR(imageData.data, imageData.width, imageData.height, {
                        inversionAttempts: "dontInvert",
                    });
    
                    if (code) {
                        let details = JSON.parse(code.data);
                        document.getElementById("name").value = details.name;
                        document.getElementById("roll").value = details.roll;
                        document.getElementById("email").value = details.email;
                        document.getElementById("phone").value = details.phone;
                        stream.getTracks().forEach(track => track.stop()); // Stop camera after scanning
                    }
                }, 1000);
            })
            .catch(function (err) {
                console.error("Error accessing camera:", err);
            });
    });
    


    