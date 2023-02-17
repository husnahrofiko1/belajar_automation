  let auth;
  let mobilePhone;
  let expectedResponseCode;
  let expectedMessage;
  let countData;
    
describe('given API get mobile phone', () =>{
    context('auth kreditmu', () =>
    {
        it('get auth kreditmu', () =>
        {
            cy.api
            ({
                method: 'POST',
                url: 'https://dev-platform-auth.kreditplus.com/v1/auth/login',
                failOnStatusCode: true,
                body:{
                    "secret_key": "lXiSUfQkDF1T3vlhNAQn3jrjWEN/J8iX7ZGP76GkJIkewmSRY24iBwjVs8s9t9hg",
                    "source_application": "KREDITMU"
                }
            }).then (response =>
                {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('messages','OK')
                    cy.log(JSON.stringify(response.body))
                    auth = response.body.data.access_token
                    cy.log(auth)
                })
        })
    });

    // context('get data csv', () =>
    // {
    //     it(`count data excel`, ()=>
    //         {
    //             cy.task('getCustomerByMobilePhone').then(response =>
    //             {
    //                 countData = response.length;
    //                 console.log('countData= '+ countData);
    //             })
    //         })
    // });

    context('running all skenario', () =>{
       
        
        for (let i = 1; i <=3; i++) 
        {
           
            it(`data skenario ke-${i}`, ()=>
            {
                cy.task('getCustomerByMobilePhone').then(res =>
                {
                    mobilePhone = res[i-1]["Data"];
                    expectedResponseCode = res[i-1]["expectedResponseCode"];
                    expectedMessage = res[i-1]["expectedMessage"];
                    console.log(res);
                    console.log("mobilePhone = "+ res[i-1]["Data"]);
                    console.log("expectedResponseCode = "+ res[i-1]["expectedResponseCode"]);
                    console.log("expectedMessage ="+ res[i-1]["expectedMessage"]);
                })
            })

            it(`validasi response ke-${i}`, () => 
            {
                cy.log("expectedResponseCode= "+expectedResponseCode)
                cy.log("mobilePhone= "+mobilePhone)
                if(expectedResponseCode==200){
                    cy.log("masuk response 200")
                    cy.api(
                        {
                            method: 'GET',
                            url: 'https://dev-core-customer.kreditplus.com/api/v3/customer/check/'+mobilePhone,
                            failOnStatusCode: true,
                            headers: {
                                        Authorization: auth
                                    }       
                        }).then (response =>
                            {
                                expect(response.status).to.eq(parseInt(expectedResponseCode))
                                expect(response.body).to.have.property('message', expectedMessage)
                                cy.log(JSON.stringify(response.body))
                            })
                }else if(expectedResponseCode==400){
                 cy.log("masuk response 400")
                 cy.api(
                    {
                        method: 'GET',
                        url: 'https://dev-core-customer.kreditplus.com/api/v3/customer/check/'+mobilePhone,
                        failOnStatusCode: false,
                        headers: {
                                    Authorization: auth
                                 }
                       
                        
                    }).then (response =>
                                {
                                    expect(response.status).to.eq(parseInt(expectedResponseCode))
                                    expect(response.body).to.have.property('message', expectedMessage)
                                    cy.log(JSON.stringify(response.body))
                                })
                }
        
            })
            
        };

    });
   
    

})

    // });

    
        
        
    