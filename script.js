const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navLinks.classList.toggle("is-open", !isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      navLinks.classList.remove("is-open");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks.classList.contains("is-open")) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      navLinks.classList.remove("is-open");
      menuToggle.focus();
    }
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// Replace this placeholder with the business email before publishing.
const contactLink = document.querySelector("#contact-link");
if (contactLink) {
  contactLink.href = "mailto:Aegarcia1012925@gmail.com";
}

// Respect reduced-motion preferences while revealing content on scroll.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); currentObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else { revealItems.forEach((item) => item.classList.add("is-visible")); }

// The inquiry form opens a prefilled email; it does not store or send data itself.
const inquiryForm = document.querySelector("#inquiry-form");
if (inquiryForm) inquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!inquiryForm.reportValidity()) return;
  const data = new FormData(inquiryForm);
  const subject = encodeURIComponent("Kuji Digital project inquiry");
  const body = encodeURIComponent("Name: " + (data.get("name") || "") + "\nBusiness: " + (data.get("business") || "") + "\nReply email: " + (data.get("email") || "") + "\nService: " + (data.get("service") || "") + "\n\nProject details:\n" + (data.get("details") || ""));
  const status = document.querySelector("#form-status");
  if (status) status.textContent = "Opening your email app. Review the message and send it when you're ready.";
  window.location.href = "mailto:Aegarcia1012925@gmail.com?subject=" + subject + "&body=" + body;
});

// Scripted sample replies for the portfolio demo; this is not a live AI service.
const demoMessages = document.querySelector("#demo-messages");
if (demoMessages) document.querySelectorAll(".prompt-chip").forEach((button) => button.addEventListener("click", () => {
  const userBubble = document.createElement("div");
  userBubble.className = "chat-bubble user";
  userBubble.textContent = button.textContent.trim();
  const answerBubble = document.createElement("div");
  answerBubble.className = "chat-bubble assistant";
  answerBubble.textContent = button.dataset.answer;
  demoMessages.append(userBubble, answerBubble);
  demoMessages.scrollTop = demoMessages.scrollHeight;
}));

/* Quick-reply Kuji customer assistant. Local FAQ responses avoid external API delays. */
(() => {
 const launcher=document.querySelector("#chat-launcher"), panel=document.querySelector("#kuji-chat-panel"), close=document.querySelector("#chat-close"), transcript=document.querySelector("#chat-transcript"), form=document.querySelector("#chat-form"), input=document.querySelector("#chat-input"), send=document.querySelector("#chat-send"), suggestions=document.querySelector("#chat-suggestions");
 if(!launcher||!panel||!transcript||!form||!input)return;
 let pending=false;
 const replies=[
 [/\b(hi|hello|hey|good morning|good afternoon)\b/i,"Hey! Thanks for stopping by Kuji Digital. Are you looking for a website, business automation, or just exploring options?"],
 [/\b(service|services|offer|do you do|what can you)\b/i,"We focus on three areas: modern website design and redesigns, practical AI and workflow automation, and content plus foundational online visibility. Tell me what your business needs and I can point you in the right direction."],
 [/\b(website|web site|redesign|web design|landing page)\b/i,"Absolutely. We can help plan a new, mobile-friendly website or refresh an existing one. We start by understanding your business, audience, and goals, then put together a project scope and quote."],
 [/\b(automation|automate|workflow|ai|chatbot|bot)\b/i,"We can explore practical automations for repetitive tasks, customer inquiries, and everyday workflows. The right setup depends on the tools you already use and what you'd like to make easier."],
 [/\b(price|pricing|cost|how much|quote|budget|charge)\b/i,"Pricing is customized to each project because the scope can vary. Tell us what you want to build and we'll discuss the requirements before providing a quote. No surprise fixed packages."],
 [/\b(start|get started|begin|process|steps|work with)\b/i,"Getting started is simple: share a little about your business and goals through the project inquiry form. We'll review the details, discuss the scope and timeline, and agree on a quote before work begins."],
 [/\b(time|timeline|long|how soon|turnaround|deadline)\b/i,"The timeline depends on the size of the project, the content and features needed, and how quickly feedback is available. Once we understand the scope, we can suggest a realistic timeline."],
 [/\b(portfolio|examples|projects|work samples|case studies)\b/i,"You can explore the Projects page for concept demonstrations. We're building our portfolio, so examples are clearly labeled as concepts rather than completed client projects."],
 [/\b(contact|email|talk|person|human|someone|owner)\b/i,"Of course. You can email us directly at Aegarcia1012925@gmail.com or use the project inquiry form on this website. We'll be glad to hear what you're working on."],
 [/\b(location|located|where are you|address|in person)\b/i,"Kuji Digital works with businesses on digital projects. For availability and project fit, send us a message by email and we'll take it from there."]
 ];
 function addMessage(message,type){
  const wrap=document.createElement("div");wrap.className="chat-message "+(type==="user"?"user-message":"assistant-message");
  const p=document.createElement("p");p.textContent=message;
  const time=document.createElement("time");time.textContent=new Intl.DateTimeFormat([],{hour:"numeric",minute:"2-digit"}).format(new Date());
  wrap.append(p,time);transcript.append(wrap);transcript.scrollTop=transcript.scrollHeight;
 }
 function getReply(message){const match=replies.find(([pattern])=>pattern.test(message));return match?match[1]:"Thanks for sharing that. I don't want to guess and give you the wrong information. Email Aegarcia1012925@gmail.com or send a project inquiry, and we can follow up with a specific answer.";}
 function setOpen(open){panel.hidden=!open;launcher.setAttribute("aria-expanded",String(open));launcher.setAttribute("aria-label",open?"Close chat with Kuji Digital":"Open chat with Kuji Digital");if(open)input.focus();else launcher.focus();}
 launcher.addEventListener("click",()=>setOpen(panel.hidden));close.addEventListener("click",()=>setOpen(false));
 document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!panel.hidden)setOpen(false);});
 function submitMessage(message){
  const clean=message.trim();if(!clean||pending)return;addMessage(clean,"user");input.value="";if(suggestions)suggestions.hidden=true;
  pending=true;input.disabled=true;send.disabled=true;
  const typing=document.createElement("div");typing.className="chat-message assistant-message chat-typing";typing.setAttribute("aria-label","Kuji Assistant is typing");
  for(let i=0;i<3;i++){typing.append(document.createElement("span"));}
  transcript.append(typing);transcript.scrollTop=transcript.scrollHeight;
  window.setTimeout(()=>{typing.remove();addMessage(getReply(clean),"assistant");pending=false;input.disabled=false;send.disabled=false;input.focus();},550);
 }
 form.addEventListener("submit",event=>{event.preventDefault();submitMessage(input.value);});
 if(suggestions)suggestions.querySelectorAll("button").forEach(button=>button.addEventListener("click",()=>submitMessage(button.textContent)));
})();
