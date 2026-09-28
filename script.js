const projects = {
  soc: {
    type: "BLUE TEAM / SOC",
    title: "Home SOC Lab",
    intro: "A practical virtualized security environment built to practise security monitoring, telemetry analysis and investigation workflows.",
    items: [
      ["What was it?", "A home SOC lab using approximately 4–5 virtual machines to create a controlled environment for security monitoring and investigation."],
      ["Why did I build it?", "To move beyond theory and practise how security events are generated, collected, analysed and investigated."],
      ["Objective", "Build a repeatable environment for collecting telemetry, analysing logs, correlating events and investigating suspicious activity."],
      ["Tools / technologies", "VirtualBox / VMware, Sysmon and Splunk."],
      ["What did I do?", "Worked with a multi-VM environment, used Sysmon for endpoint telemetry, used Splunk for security-data analysis, and practised log analysis and event correlation."],
      ["Skills developed", "Security monitoring, log analysis, event correlation, threat detection and investigation thinking."],
      ["Outcome", "Built a repeatable environment for hands-on SOC monitoring and incident-investigation practice."],
      ["Real-world relevance", "The workflow reflects core SOC activities: telemetry collection, event analysis, correlation and investigation."]
    ]
  },
  network: {
    type: "NETWORK SECURITY",
    title: "Network Traffic Analysis & Monitoring",
    intro: "A packet-level investigation project using Wireshark to understand network communication and identify suspicious or anomalous patterns.",
    items: [
      ["What was it?", "A practical network investigation project focused on packet captures and communication behaviour."],
      ["Why did I do it?", "To develop the ability to investigate network behaviour directly from packet-level evidence."],
      ["Objective", "Inspect traffic, understand protocol behaviour, identify unusual patterns and support findings with network evidence."],
      ["Tools / technologies", "Wireshark; TCP/IP, DNS, HTTP, TCP, UDP and ICMP."],
      ["What did I do?", "Inspected packet captures, examined protocol behaviour and investigated network anomalies and potential indicators of compromise."],
      ["Skills developed", "Packet analysis, protocol interpretation, anomaly identification and network investigation."],
      ["Outcome", "Strengthened the ability to interpret network communications and use packet evidence in security investigations."],
      ["Real-world relevance", "Network traffic analysis supports investigations into suspicious connections, unusual protocol behaviour and other network indicators."]
    ]
  }
};

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalType = document.getElementById("modalType");
const modalIntro = document.getElementById("modalIntro");
const caseGrid = document.getElementById("caseGrid");

function openProject(key){
  const p = projects[key];
  modalType.textContent = p.type;
  modalTitle.textContent = p.title;
  modalIntro.textContent = p.intro;
  caseGrid.innerHTML = p.items.map(([h,t]) => `<div><h4>${h}</h4><p>${t}</p></div>`).join("");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.querySelector(".modal-close").focus();
}
function closeProject(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
}
document.querySelectorAll(".project-card").forEach(card=>{
  card.addEventListener("click",()=>openProject(card.dataset.project));
});
document.querySelectorAll("[data-close]").forEach(el=>el.addEventListener("click",closeProject));
document.addEventListener("keydown",e=>{if(e.key==="Escape") closeProject()});

const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menu.addEventListener("click",()=>{
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded",open);
});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}})
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const counters = document.querySelectorAll(".counter");
const countObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    const el=entry.target, target=+el.dataset.target, duration=1000, start=performance.now();
    function tick(now){
      const p=Math.min((now-start)/duration,1);
      el.textContent=Math.floor((1-Math.pow(1-p,3))*target).toLocaleString();
      if(p<1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick); countObserver.unobserve(el);
  });
},{threshold:.7});
counters.forEach(c=>countObserver.observe(c));

const glow=document.querySelector(".cursor-glow");
window.addEventListener("pointermove",e=>{
  glow.style.left=e.clientX+"px"; glow.style.top=e.clientY+"px";
},{passive:true});

const sections=[...document.querySelectorAll("main section[id]")];
const links=[...document.querySelectorAll(".nav a")];
const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      links.forEach(l=>l.classList.toggle("active",l.getAttribute("href")==="#"+entry.target.id));
    }
  });
},{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s=>sectionObserver.observe(s));
