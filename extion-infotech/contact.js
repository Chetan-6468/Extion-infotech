const firebaseConfig = {
    //   copy your firebase config informations
    apiKey: "AIzaSyCEsaKjnPn_Gh_Mwln1l2Ae6kGRYalUSbg",
    authDomain: "contactform-a7d37.firebaseapp.com",
    databaseURL: "https://contactform-a7d37-default-rtdb.firebaseio.com",
    projectId: "contactform-a7d37",
    storageBucket: "contactform-a7d37.appspot.com",
    messagingSenderId: "996473001349",
    appId: "1:996473001349:web:f40e1d1adf68e82e8b20ec"
  };
  firebase.initializeApp(firebaseConfig);
  
  const contactFormDB = firebase.database().ref("contactForm");
  
  document.getElementById("contactForm").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
  
    const name = getElementVal("name");
    const email = getElementVal("email");
    const phone = getElementVal("phone");
    const message = getElementVal("message");
  
    if (!validateName(name)) {
      document.querySelector("#name + .error-text").style.display = "block";
      return;
    }

    if (!validateEmail(email)) {
      document.querySelector("#email + .error-text").style.display = "block";
      return;
    }

    if (!validatePhone(phone)) {
      document.querySelector("#phone + .error-text").style.display = "block";
      return;
    }

    if (!validateMessage(message)) {
      document.querySelector("#message + .error-text").style.display = "block";
      return;
    }
  
    saveMessages(name, email, phone, message);
  
    // Enable alert
    document.querySelector(".alert").style.display = "block";
  
    // Remove the alert after 3 seconds
    setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
    }, 3000);
  
    // Reset the form
    document.getElementById("contactForm").reset();
  }
  
  const saveMessages = (name, email, phone, message) => {
    const newContactForm = contactFormDB.push();
  
    newContactForm.set({
      name: name,
      email: email,
      phone: phone,
      message: message,
    });
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };

  function validateName(name) {
    return /^[a-zA-Z\s]+$/.test(name.trim());
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function validatePhone(phone) {
    return /^\d{10}$/.test(phone.trim());
    
  }

  function validateMessage(message) {
    return message.trim().length > 12;
  }
  