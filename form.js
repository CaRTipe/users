document.getElementById("clientForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form from refreshing the page

  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const gender = document.getElementById("gender").value;
  const age = parseInt(document.getElementById("age").value);
  const car = document.getElementById("car").value;

  addClients(fname, lname, email, gender, age, car); // Call your function
});
