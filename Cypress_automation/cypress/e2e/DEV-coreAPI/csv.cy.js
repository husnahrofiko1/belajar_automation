describe('learn CSV', () =>{
  context('belajar data csv', () =>{
      it('read and write csv', ()=>{
          cy.task('getCustomerByMobilePhone').then(res =>{
              console.log(res);
              console.log(res[0]["caseID"]);
          })
      })

  })
})