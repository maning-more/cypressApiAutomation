describe('API Testing with Cypress', () => {
  beforeEach(() => {
    // Set up the base URL for the JSON server
    cy.visit('/');
    
  });

  it('should retrieve a list of users', () => {
    cy.request('GET', '/users').then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.not.be.null;
      expect(response.body).to.have.length.above(0);
      expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8');
      expect(response.duration).to.be.lessThan(5000); // Maximum response time of 5 seconds
      cy.wait(2000)
    });
  });

  it('should create a new user', () => {
    const newUser = {
      username: 'testuser',
      phoneNumber: '1234567890',
      email: 'testuser@example.com',
      nickname: 'Test'
    };
  
    cy.request('POST', '/users', newUser).then((response) => {
      console.log('Response:', response);
      console.log('Response body:', response.body);
  
      expect(response.status).to.equal(201);
      expect(response.body.username).to.equal(newUser.username);
  
      // Additional validations
      expect(response.duration).to.be.lessThan(5000); // Response time less than 5 seconds
      expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8'); // Validate Content-Type header
      // expect(response.headers['set-cookie']).to.exist; // Check if cookies are set
      cy.wait(2000)
    });
  });
  

  it('should update an existing user', () => {
    const updatedUser = {
      username: 'updateduser',
      phoneNumber: '9876543210',
      email: 'updateduser@example.com',
      nickname: 'Updated'
    };

    cy.request('PUT', '/users/2', updatedUser).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.username).to.equal(updatedUser.username);

      // Additional validations
      expect(response.duration).to.be.lessThan(5000); // Response time less than 5 seconds
      expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8'); // Validate Content-Type header
    });
  });

  it('should delete an existing user', () => {
    cy.request('DELETE', '/users/39').then((response) => {
      expect(response.status).to.equal(200);

      // Additional validations
      expect(response.duration).to.be.lessThan(5000); // Response time less than 5 seconds
      expect(response.headers).to.have.property('content-type','application/json; charset=utf-8'); // Validate Content-Type header
      cy.wait(2000)
    });
  });
});
