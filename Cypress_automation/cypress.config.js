const { defineConfig } = require("cypress");
const csv = require('@fast-csv/parse');

// module.exports = defineConfig({
  
//     reporter: 'mochawesome',
//     reporterOptions: {
//       reportDir: 'cypress/results',
//       overwrite: false,
//       html: false,
//       json: true,
//     },

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  
  e2e: {
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    //   require('cypress-mochawesome-reporter/plugin')(on);
    // },

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // implement node event listeners here
      on("task", {
        getCustomerByMobilePhone(){
          return new Promise(resolve =>
          {
            let dataArray = [];
            csv.parseFile("./dataKreditmu/Kreditmu-getCustomerByMobilePhone.csv", {headers: true})
            .on('data', (data) =>
            {
              dataArray.push(data);
            })
            .on('end', () =>
            {
              resolve(dataArray)
            })
          })
        },
        sheet2(){
          return new Promise(resolve =>
          {
            let dataArray = [];
            csv.parseFile("./dataKreditmu/Sheet 2-Table 1.csv", {headers: true})
            .on('data', (data) =>
            {
              dataArray.push(data);
            })
            .on('end', () =>
            {
              resolve(dataArray)
            })
          })
        }
      })

      // on("sheet", {
      //   sheet2(){
      //     return new Promise(resolve =>
      //     {
      //       let dataArray = [];
      //       csv2.parseFile("./dataKreditmu/Kreditmu-getCustomerByMobilePhone.csv", {headers: true})
      //       .on('data', (data) =>
      //       {
      //         dataArray.push(data);
      //       })
      //       .on('end', () =>
      //       {
      //         resolve(dataArray)
      //       })
      //     })
      //   }
      // })
    }
  },
});
