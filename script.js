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


/* Kuji Digital AI assistant: calls the same-origin server endpoint so API keys stay private. */
(() => {
 const launcher=document.querySelector("#chat-launcher"),panel=document.querySelector("#kuji-chat-panel"),close=document.querySelector("#chat-close"),transcript=document.querySelector("#chat-transcript"),form=document.querySelector("#chat-form"),input=document.querySelector("#chat-input"),send=document.querySelector("#chat-send"),suggestions=document.querySelector("#chat-suggestions"),leadForm=document.querySelector("#chat-lead-form"),leadStatus=document.querySelector("#chat-lead-status");
 if(!launcher||!panel||!transcript||!form||!input)return;
 let pending=false;const history=[];
 function addMessage(message,type){const wrap=document.createElement("div");wrap.className="chat-message "+(type==="user"?"user-message":"assistant-message");const p=document.createElement("p");p.textContent=message;const time=document.createElement("time");time.textContent=new Intl.DateTimeFormat([],{hour:"numeric",minute:"2-digit"}).format(new Date());wrap.append(p,time);transcript.append(wrap);transcript.scrollTop=transcript.scrollHeight;}
 function setOpen(open){panel.hidden=!open;launcher.setAttribute("aria-expanded",String(open));launcher.setAttribute("aria-label",open?"Close chat with Kuji Digital":"Open chat with Kuji Digital");if(open)input.focus();else launcher.focus();}
 launcher.addEventListener("click",()=>setOpen(panel.hidden));close.addEventListener("click",()=>setOpen(false));document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!panel.hidden)setOpen(false);});
 async function submitMessage(message){const clean=message.trim();if(!clean||pending)return;addMessage(clean,"user");history.push({role:"user",content:clean});input.value="";if(suggestions)suggestions.hidden=true;pending=true;input.disabled=true;send.disabled=true;const typing=document.createElement("div");typing.className="chat-message assistant-message chat-typing";typing.setAttribute("aria-label","Kuji Assistant is typing");for(let i=0;i<3;i++)typing.append(document.createElement("span"));transcript.append(typing);transcript.scrollTop=transcript.scrollHeight;
  try{const response=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:history.slice(-12)})});const data=await response.json().catch(()=>({}));if(!response.ok)throw new Error(data.error||"Assistant unavailable");const answer=String(data.reply||"Sorry, I couldn't prepare a reply. Please email Aegarcia1012925@gmail.com.").slice(0,3000);history.push({role:"assistant",content:answer});addMessage(answer,"assistant");}
  catch(error){addMessage("I'm having trouble connecting right now. You can reach Kuji Digital at Aegarcia1012925@gmail.com, or try again in a moment.","assistant");}
  finally{typing.remove();pending=false;input.disabled=false;send.disabled=false;input.focus();}
 }
 form.addEventListener("submit",event=>{event.preventDefault();submitMessage(input.value);});if(suggestions)suggestions.querySelectorAll("button").forEach(button=>button.addEventListener("click",()=>submitMessage(button.textContent)));
 if(leadForm)leadForm.addEventListener("submit",async event=>{event.preventDefault();if(!leadForm.reportValidity())return;const submit=leadForm.querySelector('button[type="submit"]');const data=Object.fromEntries(new FormData(leadForm).entries());submit.disabled=true;submit.textContent="Sending…";if(leadStatus)leadStatus.textContent="Sending your inquiry securely…";
  try{const response=await fetch("/api/lead",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});const result=await response.json().catch(()=>({}));if(!response.ok)throw new Error(result.error||"Could not send inquiry");leadStatus.textContent="Thanks! Your inquiry has been sent to Kuji Digital.";leadForm.reset();}
  catch(error){leadStatus.textContent="We couldn't send that just now. Please email Aegarcia1012925@gmail.com instead.";}
  finally{submit.disabled=false;submit.textContent="Send project inquiry";}
 });
})();
