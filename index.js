// Browser-compatible client-side code that communicates with the server API
document.addEventListener('DOMContentLoaded', function() {
  console.log('Document loaded, initializing client data display');
  
  // Load clients from the server
  loadClients();
  
  // Make addClients function available globally
  window.addClients = function(fname, lname, email, gender, age, car) {
    // Create the request body
    const clientData = {
      fname: fname,
      lname: lname,
      email: email,
      gender: gender,
      age: age,
      car: car
    };
    
    console.log('Adding client:', clientData);
    
    // Send POST request to the server API
    fetch('http://localhost:3000/api/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(clientData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      alert('Client added successfully!');
      
      // Reload the clients list to show the new client
      loadClients();
    })
    .catch(error => {
      console.error('Error adding client:', error);
      alert('Error adding client: ' + error.message);
    });
  };
});

// Function to add a client to the table
function addClientToTable(client) {
  const clientsTableBody = document.getElementById('clientsTableBody');
  if (clientsTableBody) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${client.id}</td>
      <td>${client.first_name || ''}</td>
      <td>${client.last_name || ''}</td>
      <td>${client.email || ''}</td>
      <td>${client.gender || ''}</td>
      <td>${client.age || ''}</td>
      <td>${client.owns_a_car ? 'Yes' : 'No'}</td>
    `;
    clientsTableBody.appendChild(tr);
  }
}

// Function to load clients from the server API
function loadClients() {
  // Show loading indicator
  const clientsTableBody = document.getElementById('clientsTableBody');
  if (clientsTableBody) {
    clientsTableBody.innerHTML = '<tr><td colspan="7" class="text-center">Loading clients...</td></tr>';
  }
  
  // Fetch clients from the server API
  fetch('http://localhost:3000/api/clients')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(clients => {
      console.log('Clients loaded:', clients);
      
      // Clear existing rows
      if (clientsTableBody) {
        clientsTableBody.innerHTML = '';
        
        if (clients.length === 0) {
          clientsTableBody.innerHTML = '<tr><td colspan="7" class="text-center">No clients found</td></tr>';
          return;
        }
        
        // Add clients to the table
        clients.forEach(client => {
          addClientToTable(client);
        });
      }
    })
    .catch(error => {
      console.error('Error loading clients:', error);
      if (clientsTableBody) {
        clientsTableBody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Error loading clients: ${error.message}</td></tr>`;
      }
    });
}
