import 'cypress-file-upload'
require('cypress-downloadfile/lib/downloadFileCommand')

Cypress.Commands.add("chooseProjectCredit", (landingStep) => {
   
   cy.get('#projectSelect').select(landingStep.projectSelect).should('have.value', landingStep.projectSelect)
   cy.get('#amount').select(landingStep.amount).should('have.value', landingStep.amount)
   cy.get('#creditMaturity').select(landingStep.creditMaturity).should('have.value', landingStep.creditMaturity)

})
Cypress.Commands.add('buttonClick', (label) => {
    cy.contains(label).click()
    
})

Cypress.Commands.add('urlWebSite', (urlLog )=>{
    cy.url().should('include', urlLog )
})

Cypress.Commands.add('pageTitle', (pageTitle )=>{
    cy.get('title')
            .should('contain',pageTitle)
})

Cypress.Commands.add('emailUser', (identityStep) => {

    if (identityStep.email != undefined) {
        cy.get('#email-input')
            .type(identityStep.email)
            .should('have.value', identityStep.email)
            .should('have.class', 'ng-valid')
    }

   

    cy.get('[data-test=navigator-compact-forward]').click()
})
Cypress.Commands.add("familySituation", (identityStep) => {
        
    if ((identityStep.maritalStatus, identityStep.childNumber)!= undefined) {
            cy.get('#maritalStatus-input').select(identityStep.maritalStatus).should('have.value', identityStep.maritalStatus)
            cy.get('#childNumberPropal-input').select(identityStep.childNumber).should('have.value', identityStep.childNumber)
            cy.get('[data-test=navigator-compact-forward]').click()
    }
        
    
    
})
Cypress.Commands.add("housingStatusUser", (houseStep) => {
    cy.get('#housingStatus-input').select(houseStep.housingStatus).should('have.value', houseStep.housingStatus)
    cy.get('#housingStatusFrom-input-month').type(houseStep.housingStatusMouth)
    cy.get('#housingStatusFrom-input-year').type(houseStep.housingStatusYear) 
    cy.get('[data-test=navigator-compact-forward]').click()   
})
Cypress.Commands.add("profesionalActivity", (activityStep, activityStatus) => {
    cy.get('#activitySector-input').select(activityStep.activitySector).should('have.value', activityStep.activitySector) 
    cy.get('#profession-input').select(activityStep.profession).should('have.value', activityStep.profession)
   
    if(activityStatus.isIndependent){
        cy.get('#businessActivityStartDate-input-month').type(activityStep.businessActivityStartDateMouth)
        cy.get('#businessActivityStartDate-input-year').type(activityStep.businessActivityStartDateYear) 
    }
    
    if(activityStatus.isSalarie){
        cy.get('#contractType-input').select(activityStep.contractType).should('have.class', 'ng-valid')
        cy.get('#employedFrom-input-month').type(activityStep.employedFromMonth)
        cy.get('#employedFrom-input-year').type(activityStep.employedFromYear).should('have.class', 'ng-valid')
    }
    if(activityStatus.isRetired){
        cy.get('#pensionFrom-input-month').type(activityStep.pensionFromMonth).should('have.class', 'ng-valid')
        cy.get('#pensionFrom-input-year').type(activityStep.pensionFromYear).should('have.class', 'ng-valid')
    }
    
    cy.get('[data-test=navigator-compact-forward]').click()
    //cy.contains('Suite').click
    
    
})

Cypress.Commands.add("profesionalPartenerActivity", (parteneractivityStep, activityStatus) => {
    
    
    cy.get('#partnerActivitySector-input').select(parteneractivityStep.partnerActivitySector).should('have.value', parteneractivityStep.partnerActivitySector) 
    cy.get('#partnerProfession-input').select(parteneractivityStep.partnerProfession).should('have.value', parteneractivityStep.partnerProfession)
   
    if(activityStatus.isIndependent){
        cy.get('#businessActivityStartDate-input-month').type(parteneractivityStep.businessActivityStartDateMouth)
        cy.get('#businessActivityStartDate-input-year').type(parteneractivityStep.businessActivityStartDateYear) 
    }
    
    if(activityStatus.isSalarie){
        cy.get('#partnerContractType-input').select(parteneractivityStep.partnerContractType).should('have.value', parteneractivityStep.partnerContractType)
        cy.get('#partnerEmployedFrom-input-month').type(parteneractivityStep.partnerEmployedFromMouth).should('have.class', 'ng-valid')
        cy.get('#partnerEmployedFrom-input-year').type(parteneractivityStep.partnerEmployedFromYear).should('have.class', 'ng-valid')
    }
    if(activityStatus.isRetired){
       
        cy.get('#partnerPensionFrom-input-month').type(parteneractivityStep.pensionFromMouth).should('have.class', 'ng-valid')
        cy.get('#partnerPensionFrom-input-year').type(parteneractivityStep.pensionFromYear).should('have.class', 'ng-valid')
    }
    
    cy.get('[data-test=navigator-compact-forward]').click()
   
})
Cypress.Commands.add("partnerActivityCoupleUser", (partneractivityStep) =>{
    cy.get('#partnerActivitySector-input').select(partneractivityStep.partnerActivitySector)
    cy.get('option').should('contain','Salarié(e) du secteur privé')
    cy.get('#partnerProfession-input').select(partneractivityStep.partnerProfession)
    cy.get('option').should('contain','Retraité')
    cy.get('#partnerPensionFrom-input-month').type(partneractivityStep.partnerPensionFromMonth)
    cy.get('#partnerPensionFrom-input-year').type(partneractivityStep.partnerPensionFromYear)
    
})

Cypress.Commands.add("incomeUser", (houseStep, mariedStatus) => {
   
    
        cy.get('#mainIncome-input').type(houseStep.mainIncome)
        cy.get('#housingAssistance-input').type(houseStep.housingAssistance)
        cy.get('#additionalIncome-input').type(houseStep.additionalIncome)
        cy.get('#housingAssistance-input').type('0')
        cy.get('#additionalIncome-input').type('0')
        if(mariedStatus.isMariedOrPaced){
            cy.get('#coIncome-input').type(houseStep.coIncome).should('have.class', 'ng-valid')
            
    
        }
     
})

Cypress.Commands.add('outcomeUser', (houseStep, mariedStatus, houseStatus) => {
  
   if(mariedStatus.isSingle){
    cy.get('#rentAmount-input').type(houseStep.rentAmount)               
    cy.get('#loanCount-input').select(houseStep.loanCount).should('have.value', houseStep.loanCount)
    cy.get('#type-input').select(houseStep.typeCredit).should('have.value', houseStep.typeCredit)
    cy.get('#loanAmount-input').type(houseStep.loanAmount)
    }
    if(mariedStatus.isMariedOrPaced){
        if(houseStatus.isTenant){
            cy.get('#rentAmount-input').type(houseStep.rentAmount).should('have.class', 'ng-valid')
        }
        if(houseStatus.isOwnerWithCredit){
            cy.get('#mortgageAmount-input').type(houseStep.mortgageAmount).should('have.class', 'ng-valid')
        }
        cy.get('#loanCount-input').select(houseStep.childSupportPaymentsAmount)
        cy.get('#childSupportPaymentsAmount-input').type(houseStep.childCareExpensesAmount)
        cy.get('#childCareExpensesAmount-input').type(houseStep.loanCount)
        

    }
   
    cy.get('[data-test=navigator-compact-forward]').click()
    cy.url().should('contain', '/bank') 
    
})

Cypress.Commands.add('bankUser', (bankStep) => {
    
    cy.get('#bankCode-input').select(bankStep.bankCode)
    cy.get('#bankFrom-input-year').type(bankStep.bankFromYear)
    cy.get('[data-test=navigator-compact-forward]').click()
})
Cypress.Commands.add('identityUser', (identityStep ) => {
    cy.get('#firstName-input').type(identityStep.lastName).should('have.class', 'ng-valid')
    cy.get('#lastName-input').type(identityStep.firstName).should('have.class', 'ng-valid')
    cy.get('#dateOfBirth-input-day').type(identityStep.dateOfBirthDay)
    cy.get('#dateOfBirth-input-month').type(identityStep.dateOfBirthMouth)
    cy.get('#dateOfBirth-input-year').type(identityStep.dateOfBirthYear).should('have.class', 'ng-valid')
    cy.get('#postalCode-input').type(identityStep.postalCode).should('have.class', 'ng-valid')
    cy.get('#city-input').select(identityStep.city).should('have.class', 'ng-valid')
   
    
})
Cypress.Commands.add('identityPartnerUser', (partnerIdentityStep, partnerStatus) => {
    if(partnerStatus.isPartner){
        cy.get(partnerIdentityStep.partnerGender).check({ force: true }).should('be.checked')
        cy.get('#lastName-input').type(partnerIdentityStep.partnerLastName).should('have.class', 'ng-valid')
        if(partnerStatus.isMaried){
            cy.get('#maidenName-input').type(partnerIdentityStep.partnerMaidenName).should('have.class', 'ng-valid')
        }
        cy.get('#firstName-input').type(partnerIdentityStep.partnerFirstName).should('have.class', 'ng-valid')
        cy.get('#dateOfBirth-input-day').type(partnerIdentityStep.partnerDateOfBirthDay)
        cy.get('#dateOfBirth-input-month').type(partnerIdentityStep.partnerDateOfBirthMouth)
        cy.get('#dateOfBirth-input-year').type(partnerIdentityStep.partnerDateOfBirthYear).should('have.class', 'ng-valid')
        cy.get('#postalCode-input').type(partnerIdentityStep.partnerPostalCode).should('have.class', 'ng-valid')
        cy.get('#city-input').select(partnerIdentityStep.partnerCity).should('have.class', 'ng-valid')
       
    }
})
Cypress.Commands.add('contactUser', (identityStep) => {

    cy.get('#cellPhoneNumber-input').type(identityStep.cellPhoneNumber)
        cy.get('#phoneNumber-input').type(identityStep.phoneNumber)
        cy.get('#address-input').type(identityStep.address)
        cy.get('#postalCode-input').type(identityStep.postalCode).should('have.class', 'ng-valid')
        cy.get('#city-input').select(identityStep.city).should('have.class', 'ng-valid')
        cy.get('#countryZone-input').select(identityStep.countryZone).should('have.class', 'ng-valid')
      
})
Cypress.Commands.add("chooseProjectCreditMaried", (projectSelect,amount,creditMaturity) => {
   
    cy.get('#projectSelect').select(projectSelect).should('have.value', projectSelect)
    cy.get('option').should('contain','Déménagement')
    cy.get('#amount').select(amount).should('have.value', amount)
    cy.get('option').should('contain','5000 €')
    cy.get('#creditMaturity').select(creditMaturity).should('have.value', creditMaturity)
    cy.get('option').should('contain','6 mois')
    cy.wait(1000)
    cy.buttonClick('CONTINUER')
    cy.url().should('contain', '/email')
   
    cy.get("h2").should('contain', 'Découvrez votre offre de prêt de')
    cy.emailUser('styp@yopmail.com')
    cy.get('[data-test=navigator-compact-forward]').click()
 
 })
 Cypress.Commands.add("familySituationM", (maritalStatus, childNumber) => {
        
    if ((maritalStatus, childNumber)!= undefined) {
            cy.url().should('contain','familysituation')
            cy.get("h2").should('contain', 'Votre situation familiale')
            cy.get('#maritalStatus-input').select(maritalStatus).should('have.value', maritalStatus)
            cy.get('option').should('contain', 'Marié(e)')
            cy.get('#childNumberPropal-input').select(childNumber).should('have.value', childNumber)
            cy.get('option').should('contain','3')
            cy.get('[type="checkbox"]').check({ force: true }).should('be.checked') 
            cy.get('[data-test=navigator-compact-forward]').click()
    }
    
    
    
})

/*
"cy:run": "rimraf mochawesome-report cypress/results mochawesome.json && cypress run",
    "cy:run:report": "npm run cy:run && npm run generateReport",
    "reporter": "nyan"
*/