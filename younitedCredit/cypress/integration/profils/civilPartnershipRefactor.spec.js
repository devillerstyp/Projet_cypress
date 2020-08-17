context('Choose the options to get credit with Pacs profil', () => {
  let profile = require('../../fixtures/civilPartenershipJdd.json')
  before(() => {
    cy.visit(profile.url)
    cy.wait(2000)
    cy.title().should('include','Le Crédit')
  })
  it('Choice of project',() => {
    cy.chooseProjectCredit(profile.landingStep)
    cy.wait(1000)
    cy.buttonClick('CONTINUER')
    cy.url().should('contain', '/email')
    cy.get("h2").should('contain', 'Découvrez votre offre de prêt')
    cy.emailUser(profile.identityStep)
    cy.wait(5000)
    cy.url().should('contain', '/familysituation') 

    
})
it('fill the family situation (marital statut)',() => {
  cy.familySituation(profile.identityStep)
 
  
})
it('fill the housing field', () => {
            
  //  Registration housing is successfull          
  cy.get("h2").should('contain', 'Votre logement')
  cy.housingStatusUser(profile.houseStep)     
  cy.url().should('contain', '/professionalsituation')        

} ) 

it('fill professional situation',()=>{
  cy.profesionalActivity(profile.activityStep, profile.activityStatus)
  
})
it("Fill partner's professional situation",()=>{
  cy.url().should('include', '/partnerprofession')
  cy.get("h2").should('contain', 'Profession de votre conjoint')
  cy.partnerActivityCoupleUser(profile.partneractivityStep)
  cy.get('[data-test=navigator-compact-forward]').click()
  
})   
it('fill monthly incomes',()=>{
  cy.url().should('include', '/incomes')
  cy.get("h2").should('contain', 'Vos revenus mensuels')
  cy.incomeUser(profile.houseStep, profile.mariedStatus)
  cy.get('[data-test=navigator-compact-forward]').click()
  cy.url().should('contain', '/outcomes') 
 
})  
it('fill monthly outcomes',()=>{
  cy.url().should('include', '/outcomes')
  cy.get("h2").should('contain', 'Vos charges mensuelles')
  cy.outcomeUser(profile.houseStep, profile.mariedStatus, profile.houseStatus)
   
}) 

it('Fill information about his bank', ()=>{
     
  // Successfull registraction
  cy.get("h2").should('contain','Votre banque')
  cy.bankUser(profile.bankStep)
  
})       

it('Fill information about you', ()=>{
  //Fail registraction
  
  // Successfull registraction
  cy.url().should('include', '/identity')
  cy.get("h2").should('contain','Vos informations')
  cy.get('[data-di-id="di-id-bf89a9dc-e017ffb1"] > label')
  cy.get('[type="radio"]').check({force:true})
  cy.identityUser(profile.identityStep)
  cy.get('[data-test=navigator-compact-forward]').click()
  

})
it('Fill information about your partener', ()=>{
  //Fail registraction
  
  // Successfull registraction
  cy.url().should('include', '/partneridentity')
  cy.get("h2").should('contain','Les informations de votre conjoint')
  cy.get('[data-di-id="di-id-66b6d813-523699cf"] > label')
  cy.get('[type="radio"]').check({force:true})
  cy.identityPartnerUser(profile.partnerIdentityStep, profile.partnerStatus)
  cy.get('[data-test=navigator-compact-forward]').click() 
 

})
it('Fill information about contct', ()=>{
  //Fail registraction
  
  // Successfull registraction
  cy.url().should('include', '/contact')
  cy.get("h2").should('contain','Vos coordonnées')
  cy.contactUser(profile.identityStep)
  cy.get('[data-test=navigator-compact-forward]').click()
  
  
}) 

})
//"cy:run:record": "cypress run --record --key 7e18633d-07cc-4a6c-b001-613cee5623ed --spec cypress/integration/profils/single.spec.js",
/*
"cy:run:report": "cypress run --record --key $RECORDID --browser chrome --headless --reporter mochawesome"
*/