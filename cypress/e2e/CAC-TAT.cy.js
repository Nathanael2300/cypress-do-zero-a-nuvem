describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('/src/index.html')
  })
  it('verificar o titulo da aplicação', () => {

    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

  })


  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock()

    const firstname = ('Nathanael')

    cy.get('#firstName').type(firstname, { delay: 100 })
    cy.get('#lastName').type('Henrique Souza Nunes')
    cy.get('#email').type('nathanaelhenriquesouzanunes@gmail.com')
    cy.get(':nth-child(4) > input').click()
    cy.get('#email-checkbox').click()
    cy.get('#open-text-area').type('Produto muito bom, parabens, produto excelente, superou nossas expectativas')
    cy.get('button, [type="submit"]').click()
      .should('be.visible', 'Mensagem enviada com sucesso')

      cy.tick(3000)

      cy.get('.success').should('not.be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()

    const firstname = ('Nathanael')

    cy.get('#firstName').type(firstname)
    cy.get('#lastName').type('Henrique Souza Nunes')
    cy.get('#email').type('nathanaelhenriquesouzanunes@gmail')
    cy.get(':nth-child(4) > input').click()
    cy.get('#email-checkbox').click()
    cy.get('#open-text-area').type('test')
    cy.get('button, [type="submit"]').click()
      .should('be.visible', 'Valide os campos obrigatórios!')

      cy.tick(3000)

      cy.get('.success').should('not.be.visible')

  })
  it('Visto que o campo de telefone só aceita números, crie um teste para validar que, se um valor não-numérico for digitado, seu valor continuará vazio.', () => {
    const telefone = ('abcde')
    cy.get('#phone')
      .type(telefone)
      .should('have.value', '')
  })


  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()

    const firstname = ('Nathanael')

    cy.get('#firstName').type(firstname)
    cy.get('#lastName').type('Henrique Souza Nunes')
    cy.get('#email').type('nathanaelhenriquesouzanunes@gmail')
    cy.get('#phone-checkbox').check()
    const feedBack = ('Muito bom o produto')
    cy.get('#open-text-area').type(feedBack)
    cy.get('button, [type="submit"]').click()
      .should('be.visible', 'Valide os campos obrigatórios!')

      cy.tick(3000)

      cy.get('.success').should('not.be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    const primeiroNome = ('Nathanael')
    const segundoNome = ('Henrique Souza Nunes')
    const Email = ('nathanaelhenriquesouzanunes@gmail.com')
    const telefone = ('11846276724')

    cy.get('#firstName').type(primeiroNome).should('have.value', primeiroNome).clear().should('have.value', '')
    cy.get('#lastName').type(segundoNome).should('have.value', segundoNome).clear().should('have.value', '')
    cy.get('#email').type(Email).should('have.value', Email).clear().should('have.value', '')
    cy.get('#phone').type(telefone).should('have.value', telefone).clear().should('have.value', '')

  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock()

    cy.get('button, [type="submit"]').click()
      .should('be.visible', 'Valide os campos obrigatórios!')

      cy.tick(3000)

      cy.get('.success').should('not.be.visible')
  })
  it('Deve possuir um titulo escrito "CAC TAT" a cima do formulario', () => {
    cy.contains('#title', 'CAC TAT')
    const firstname = ('Nathanael')
    cy.get('#firstName').type(firstname)
    cy.get('#lastName').type('Henrique Souza Nunes')
    cy.get('#email').type('nathanaelhenriquesouzanunes@gmail.com')
    cy.get(':nth-child(4) > input').click()
    cy.get('#email-checkbox').click()
    cy.get('#open-text-area').type('Produto muito bom, parabens, produto excelente, superou nossas expectativas')
    cy.get('button, [type="submit"]').click()
    .should('be.visible', 'Mensagem enviada com sucesso')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('youtube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
    .select(1)
    .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
    .each(typeOfservice => {
      cy.wrap(typeOfservice)
      .check()  
      .should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
    .selectFile('@sampleFile')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('Política de Privacidade')
    .invoke('removeAttr', 'target')
    .click()


    cy.contains('CAC TAT - Política de Privacidade')
    .should('be.visible')
  })

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .contains('Mensagem enviada com sucesso.')
    .invoke('hide')
    .should('not.be.visible')
    cy.get('.error')
    .invoke('show')
    .should('be.visible')
    .contains('Valide os campos obrigatórios!')
    .invoke('hide')
    .should('not.be.visible')
  })

  it('preenche o campo da área de texto usando o comando invoke', () => {
    cy.get('#firstName').invoke('val', 'Nathanael')
    .should('have.value', 'Nathanael')
    cy.get('#lastName').invoke('val', 'Henrique Souza Nunes')
    .should('have.value', 'Henrique Souza Nunes')
    cy.get('#email').invoke('val', 'nathantester@gmail.com')
    .should('have.value', 'nathantester@gmail.com')
    cy.get('#product').select(2)
    cy.get('input[type="radio"][value="feedback"]').check()
    cy.get('#email-checkbox').check()
    const FeedBack = 'Muito bom o produto de voces'
    cy.get('#open-text-area').type(FeedBack)
    .should('have.value', FeedBack)
    cy.get('.button').click()

  })

  Cypress._.times(2, () => {
    it('Faz um requisição HTTP', () => {
      cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)
      cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK')
      cy.get('@getRequest')
      .its('body')
      .should('include', 'CAC TAT')
    })  
  })  

  it('encontre o gato', () => {
    cy.get('#title')
    .invoke('text', 'CAT TAT')
    cy.get('#subtitle')
    .invoke('text', 'I love cats')
    cy.get('#cat')
    .invoke('show')
    .should('be.visible')
    .invoke('hide')
    .should('not.be.visible')
  })
})