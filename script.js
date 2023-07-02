function gsapscroll(){
    gsap.registerPlugin(ScrollTrigger);
  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);
  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
  gsapscroll();

function loader(){
    var tl = gsap.timeline();
    tl.to ("#logo",{
        opacity:1
    })
    .to("#loader",{
      opacity:1,
       height:"98%",
       duration:2,
       onUpdate: function () {
        document.querySelector("#logo").style.color = "#ebe4da";
      },
    })
   tl.to("#wloader",{
    opacity:1,
    height: '86%',
    duration:2,
    onUpdate: function () {
      document.querySelector("#logo").style.display = "none";
    },
    onComplete: function () {
  document.querySelector("#nav").style.opacity = 1;
    document.querySelector(".load").style.display = "none";
    document.querySelector("#main").style.opacity = 1;
    var tl=gsap.timeline();
    tl.to(".overlay>h1", {
      // scrollTrigger: {
      //   trigger: ".overlay>h1",
      //   scroller: "#main",
      //   // markers:true
      // },
      ease: Expo.easeInOut,
      x:'80',
      duration:1.5,
      opacity:1
    
    })
    
    .to('.overlay>h2',{
      ease: Expo.easeInOut,
      x:'15',
      duration:1,
      opacity:1
    })
    .to('.overlay>h5',{
      ease: Expo.easeInOut,
      y:'15',
      duration:1,
      opacity:1
    });

},
})
}
  loader() 
 