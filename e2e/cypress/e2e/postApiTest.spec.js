describe('API Testing with Cypress', () => {
  beforeEach(() => {
    // Set up the base URL for the JSON server
    cy.visit('/');
    
  });

  it('should retrieve a list of posts', () => {
    cy.request('GET', '/posts').then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.not.be.null;
      expect(response.body).to.have.length.above(0);
      expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8');
      expect(response.duration).to.be.lessThan(5000); // Maximum response time of 5 seconds
      cy.wait(2000)
    });
  });

  it('should create a new post', () => {
    const newpost = {
      userId: 25,
      bookName: "Mahabharat",
      about: "KumarVyas"
    };
  
    cy.request('POST', '/posts', newpost).then((response) => {
      console.log('Response:', response);
      console.log('Response body:', response.body);
  
      expect(response.status).to.equal(201);
      expect(response.body.bookName).to.equal(newpost.bookName);
  
      // Additional validations
      expect(response.duration).to.be.lessThan(5000); // Response time less than 5 seconds
      expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8'); // Validate Content-Type header
      // expect(response.headers['set-cookie']).to.exist; // Check if cookies are set
      cy.wait(2000)
    });
  });
  

  it('should update an existing posts', () => {
    const updatedpost = {
      bookName: "updated Name ",
      about: "updated "
    };

    cy.request('PUT', '/posts/3', updatedpost).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.bookName).to.equal(updatedpost.bookName);

      // Additional validations
      expect(response.duration).to.be.lessThan(5000); // Response time less than 5 seconds
      expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8'); // Validate Content-Type header
    });
  });

  it('should delete an existing post', () => {
    cy.request('DELETE', '/posts/4').then((response) => {
      expect(response.status).to.equal(200);

      // Additional validations
      expect(response.duration).to.be.lessThan(5000); // Response time less than 5 seconds
      expect(response.headers).to.have.property('content-type','application/json; charset=utf-8'); // Validate Content-Type header
      cy.wait(2000)
    });
  });
});
