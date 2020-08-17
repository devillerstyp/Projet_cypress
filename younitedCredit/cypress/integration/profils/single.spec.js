describe('Choose the options to get credit with single profil', () => {
    let profile = require('../../fixtures/singleJdd')
    it('connexion à la page',() =>{
        // Se connecter à la page
        cy.visit(profile.url)
        cy.pageTitle('Le Crédit')
        
        //Choix du projet 
        cy.chooseProjectCredit(profile.landingStep)
        cy.wait(1000)
        cy.buttonClick('CONTINUER')
        cy.url().should('contain', '/email')

        // enregistrement mail
        // should fail when email is empty
        /*cy.emailUser(null)                          
        cy.get('.error-msg > .text')                       
        cy.contains('Merci de renseigner cette information pour poursuivre votre demande').should('be.visible') 
         //  should fail when email is wrong  
        cy.emailUser('stypyopmail.com')
        cy.get('.error-msg > .text')                       
        cy.contains('L’adresse email saisie semble incorrecte. Merci de vérifier votre choix.').should('be.visible')
        cy.get('#email-input').type('{del}{selectall}{backspace}')
        */
        
        
        //personalized offer is successfull create
        cy.get("h2").should('contain', 'Découvrez votre offre de prêt')
        cy.emailUser(profile.identityStep)
        cy.wait(5000)
        cy.url().should('contain', '/familysituation')   
        
    })
        
    it('fill the family situation', () => {
 
       //  personalized offer is successfull create
        cy.get("h2").should('contain', 'Votre situation familiale')
        cy.familySituation(profile.identityStep)
        cy.get('[type="checkbox"]').uncheck({force:true})            
        cy.get('[data-test=navigator-compact-forward]').click()
        cy.wait(5000)
        cy.url().should('contain', '/housing')
        
              
    } )  

    it('fill the housing field', () => {
              
         //  Registration housing is successfull          
         cy.get("h2").should('contain', 'Votre logement')
         cy.housingStatusUser(profile.houseStep)     
         cy.url().should('contain', '/professionalsituation')        

    } )  
    
    it('fill professional situation', () => {
         
        //  Registration is successful when all fields are full 
        cy.get("h2").should('contain', 'Votre situation professionnelle')
        cy.profesionalActivity(profile.activityStep, profile.activityStatus) 
        cy.get('[type="radio"]').check({force:true}) 
        cy.get('[data-test=navigator-compact-forward]').click()   
            
     } )  

     it('fill monthly incomes', () => {                   
                           
        //  Registration is successful when all fields are full
        cy.url().should('contain', '/incomes')
        cy.get("h2").should('contain', 'Vos revenus mensuels')   
        cy.incomeUser(profile.houseStep, profile.mariedStatus)
        cy.get('[data-test=navigator-compact-forward]').click()
        cy.url().should('contain', '/outcomes')
            
     } )  
     
     it('fill monthly outcomes', () => {
                    
        //  Registration is successful when all fields are full 
        cy.get("h2").should('contain', 'Vos charges mensuelles')
        cy.get('#content-outcomes-step > div.card-header').should('contain', 'Vos charges mensuelles') 
        cy.get('#rentAmount-input').type('{del}{selectall}{backspace}') 
        cy.outcomeUser(profile.houseStep, profile.mariedStatus)     
        
        
     } )  

     it('Fill information about his bank', ()=>{
       
        // Successfull registraction
        cy.get("h2").should('contain','Votre banque')
        cy.bankUser(profile.bankStep)
        
      })       
      it('Fill information about indenty', ()=>{
                
        // Successfull registraction
        cy.get("h2").should('contain','Vos informations')
        cy.get('[data-di-id="di-id-bf89a9dc-e017ffb1"] > label')
        cy.get('[type="radio"]').check({force:true})
        cy.identityUser(profile.identityStep)
        cy.get('[data-test=navigator-compact-forward]').click()
        
      }) 
      it('Fill information about contct', ()=>{
                
        // Successfull registraction
        cy.get("h2").should('contain','Vos coordonnées')
        cy.contactUser(profile.identityStep)
        cy.get('[data-test=navigator-compact-forward]').click()
     
      })  
       
})
