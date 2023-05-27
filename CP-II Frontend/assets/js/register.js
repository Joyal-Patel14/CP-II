function validateForm() {
    // Get the values of the form inputs
    var fullname = document.getElementById("fullname").value.trim();
    var email = document.getElementById("email").value.trim();
    var mobile = document.getElementById("mobile").value.trim();
    var username = document.getElementById("username").value.trim();
    var password = document.getElementById("password").value.trim();
  
    // Validate full name (should contain at least two words)
    var nameArray = fullname.split(" ");
    if (nameArray.length < 2) {
      alert("Please enter your full name (at least two words)");
      return false;
    }
  
    // Validate email ID
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email ID");
      return false;
    }
  
    // Validate mobile number (should be 10 digits)
    var mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number");
      return false;
    }
  
    // Validate username (should contain only letters, numbers, and underscores)
    var usernameRegex = /^\w+$/;
    if (!usernameRegex.test(username)) {
      alert("Username can only contain letters, numbers, and underscores");
      return false;
    }
  
    // Validate password (should be at least 8 characters long)
    if (password.length < 8) {
      alert("Password should be at least 8 characters long");
      return false;
    }
  
    // If all validations pass, submit the form
    return true;
  }
  