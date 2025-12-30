// EmailJS Contact Form
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const msg = document.getElementById("formMsg");
  emailjs.send(
    "service_qlplumg",
    "template_o0oeg8w",
    {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value,
    }
  ).then(() => {
    msg.style.color = "#4ade80";
    msg.textContent = "Message sent successfully!";
    document.getElementById("contactForm").reset();
  }).catch((error) => {
    msg.style.color = "red";
    msg.textContent = "Failed to send message.";
    console.error(error);
  });
});

// Chatbot
const openChat = document.getElementById("openChat");
const closeChat = document.getElementById("closeChat");
const chatbot = document.querySelector(".chatbot-container");
const sendBtn = document.getElementById("sendMsg");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");

openChat.addEventListener("click", () => { chatbot.style.display = "flex"; });
closeChat.addEventListener("click", () => { chatbot.style.display = "none"; });
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function(e) { if(e.key==="Enter") sendMessage(); });

function sendMessage() {
  const text = userInput.value.trim();
  if(!text) return;
  addMessage(text, "user");
  userInput.value = "";
  setTimeout(() => { addMessage(getBotReply(text), "bot"); }, 700);
}

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = type==="user"?"user-msg":"bot-msg";
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotReply(msg){
  msg = msg.toLowerCase();
  if(msg.includes("course")) return "We offer IPMAT, CUET, and CLAT preparation.";
  if(msg.includes("fee") || msg.includes("price")) return "Our fees are affordable. Book a demo to know more.";
  if(msg.includes("demo")) return "You can book a free demo using the contact form below.";
  if(msg.includes("result") || msg.includes("selection")) return "500+ students secured top admissions.";
  if(msg.includes("contact") || msg.includes("call")) return "Leave your details in the contact form.";
  return "Please contact us for detailed guidance.";
}
