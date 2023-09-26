let design = document.querySelector('.design-services');
let development = document.querySelector('.development-services');
let dm = document.querySelector('.digital-marketing-services');

function menuOnClick() {
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("nav").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
  }

function design_services(){
    design.classList.toggle('active');
    document.querySelector('.services-para').innerHTML = "We as creative visionaries, conjure magic with pixels and imagination. More than artisans, we're the architects of captivating visual stories. Merging aesthetics and function seamlessly, our designers craft stunning, strategically aligned  designs that inspire and captivate.";
    document.querySelector('.services').classList.toggle('design-height');
}
function development_services(){
    development.classList.toggle('active');
    document.querySelector('.services-para').innerHTML = "Our brilliant team of developers can transform ideas into remarkable digital realities. With an unrelenting commitment to innovation and a mastery of our craft, we craft codes that bring dreams to life.";
    document.querySelector('.services').classList.toggle('development-height');
}
function dm_services(){
    dm.classList.toggle('active');
    document.querySelector('.services-para').innerHTML = "Our exceptional team of marketers wields strategy like a superpower. We are more than marketers; we are architects of success, crafting campaigns that transcend boundaries and deliver exceptional results.";
    document.querySelector('.services').classList.toggle('dm-height');
}

document.onclick = function (event) {
    if (design.classList.contains("active") && !event.target.matches(".design-service_button") && !event.target.matches(".services-service-wrapper") && !event.target.matches(".services-service") && !event.target.matches(".arrow")) {
        design.classList.remove("active");
        document.querySelector('.services').classList.remove("design-height");
        
    }
    if (development.classList.contains("active") && !event.target.matches(".development-service_button") && !event.target.matches(".services-service-wrapper") && !event.target.matches(".services-service") && !event.target.matches(".arrow")) {
        development.classList.remove("active");
        document.querySelector('.services').classList.remove("development-height");
    }
    if (dm.classList.contains("active") && !event.target.matches(".digital-marketing-service_button") && !event.target.matches(".services-service-wrapper") && !event.target.matches(".services-service") && !event.target.matches(".arrow")) {
        dm.classList.remove("active");
        document.querySelector('.services').classList.remove("dm-height");
    }
}

document.querySelector("a.social-button").addEventListener("click", function(event){
    document.getElementById("sideNavigation").style.width = "100%";
    document.getElementById("main").style.marginRight = "250px";
  });

  document.querySelector("a.lets-talk-bt").addEventListener("click", function(event){
    document.getElementById("sideNavigation").style.width = "100%";
    document.getElementById("main").style.marginRight = "250px";
  });
  
  document.querySelector("a.close-btn").addEventListener("click", function(event){
    document.getElementById("sideNavigation").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
  });

function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
        length = items.length,
        startX = items[0].offsetLeft,
        times = [],
        widths = [],
        xPercents = [],
        curIndex = 0,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
        totalWidth, curX, distanceToStart, distanceToLoop, item, i;
    gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
        xPercent: (i, el) => {
            let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
            xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
            return xPercents[i];
        }
    });
    gsap.set(items, {x: 0});
    totalWidth = items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0);
    for (i = 0; i < length; i++) {
        item = items[i];
        curX = xPercents[i] / 100 * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
        tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
          .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
          .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
    }
    function toIndex(index, vars) {
        vars = vars || {};
        (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
        let newIndex = gsap.utils.wrap(0, length, index),
            time = times[newIndex];
        if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
            vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
            time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
    }
    tl.next = vars => toIndex(curIndex+1, vars);
    tl.previous = vars => toIndex(curIndex-1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    return tl;
}

const logos = gsap.utils.toArray(".clients_logo"),
loop = horizontalLoop(logos, {paused: true, repeat: -1, speed:0.08, reversed: true});

const ribbon = gsap.utils.toArray(".ribbon-1"),
rib_loop = horizontalLoop(ribbon, {paused: false, repeat: -1, speed:0.8});

gsap.from('.clients', {
    y:100,
    opacity:0,
    scrollTrigger:{
        trigger: '.clients',
        scroller: 'body',
        start: 'top 110%',
    }
})

gsap.from('.plane-svg', {
    x: '155%',
    y: '10%',
    scrollTrigger:{
        trigger: ".plane-svg",
        scroller: "body",
        start: "top 60%",
        end: "top -10%",
        scrub: 2
    }
})

gsap.from('.wave_svg', {
    y: '100%',
    duration: 1,
    scrollTrigger:{
        trigger: '.wave_svg',
        scroller: 'body',
        start: 'top 115%',
    }
})