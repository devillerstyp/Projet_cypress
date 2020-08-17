describe('File upload and download tests', () => {

    beforeEach(() => {
        cy.visit('https://filebin.net/')
    })

    it('Upload file and download it in Zip format', () => {
        cy.get('#fileField').attachFile('procedure.png')
        cy.contains('This bin contains 1 file',).should('be.visible')
        cy.get('.fa-cloud-download').click()
        cy.contains('Zip').invoke('attr', 'href').then(downloadLink => {
            cy.log(downloadLink)
            cy.downloadFile(downloadLink, 'mydownloads/zipFiles', 'downloadedFromCypress.zip')
            cy.readFile('mydownloads/zipFiles/downloadedFromCypress.zip')
        })
    })

    it('Upload file and download it in Tar format', () => {
        cy.get('#fileField').attachFile('procedure.png')
        cy.contains('This bin contains 1 file',).should('be.visible')
        cy.get('.fa-cloud-download').click()
        cy.contains('Tar').invoke('attr', 'href').then(downloadLink => {
            cy.log(downloadLink)
            cy.downloadFile(downloadLink, 'mydownloads/tarFiles', 'downloadedFromCypress.tar')
            cy.readFile('mydownloads/tarFiles/downloadedFromCypress.tar')
        })
    })

})