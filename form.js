document.getElementById("clientForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form from refreshing the page

  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const gender = document.getElementById("gender").value;
  const age = parseInt(document.getElementById("age").value);
  const car = document.getElementById("car").value;

  // Call the addClients function from the window object
  if (typeof window.addClients === 'function') {
    window.addClients(fname, lname, email, gender, age, car);
    
    // Reset the form after submission
    document.getElementById("clientForm").reset();
  } else {
    console.error("addClients function is not available");
    alert("Error: Could not add client. The system is not properly initialized.");
  }
});
