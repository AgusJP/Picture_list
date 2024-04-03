import { randomTexts } from './../../src/app/data/random-texts';

describe('Listado de Imágenes', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200')
  })

  it('Listado de Imágenes is visible', () => {
    cy.contains('Listado de Imágenes')
  })

  it('Verificar la carga inicial de la aplicación', () => {
    // Comprobar que se muestran las primeras 10 imágenes
    cy.get('app-picture').should('have.length', 10)

    // Comprobar que el campo de búsqueda está visible y accesible
    cy.get('input.container__searchInput').should('be.visible')
  })

  it('Pruebas de filtrado por id', () => {
    // Ingresar un id en el campo de búsqueda
    const idToSearch = '10'
    cy.get('input.container__searchInput').type(idToSearch)

    // Verificar que se muestra la imagen con el id buscado
    cy.get('app-picture').contains(`# ${idToSearch}`).should('be.visible')

    // Limpiar el campo de búsqueda
    cy.get('input.container__searchInput').clear()

    // Verificar que se muestran todas las imágenes nuevamente
    cy.get('app-picture').should('have.length.greaterThan', 1)
  })

  it('Pruebas de filtrado por texto', () => {
    // Obtener un texto aleatorio del array randomTexts
    const randomTextIndex = Math.floor(Math.random() * randomTexts.length);
    const textToSearch = randomTexts[randomTextIndex];

    // Ingresar el texto en el campo de búsqueda
    cy.get('input.container__searchInput').type(textToSearch);

    // Verificar que al menos una imagen contiene cualquiera de los textos aleatorios
    cy.get('.picture__text').invoke('text').then((text) => {
      randomTexts.forEach(randomText => {
        if (randomText === text) {
          expect(randomText).to.include(text)
        }
      });
    });

    // Limpiar el campo de búsqueda
    cy.get('input.container__searchInput').clear();

    // Verificar que se muestren todas las imágenes nuevamente
    cy.get('app-picture').should('have.length.greaterThan', 1);
  });

  it('Pruebas de scroll infinito hasta las 200 primeras imágenes', () => {
    // Desplazarse hacia abajo y verificar que se cargan más imágenes (en lotes de 10)
      for (let i = 0; i < 200 / 10; i++) {
        const numberOfImages = (i + 1) * 10;
        cy.scrollTo('bottom');
        cy.wait(500); 
        cy.get('app-picture').should('have.length.greaterThan', numberOfImages);
    }
  })

  it('Muestra el mensaje "No se ha podido encontrar ningún resultado" cuando no hay coincidencias', () => {
    // Ingresar un texto que no coincide con ninguna imagen
    const textNotFound = 'Este texto no coincide con ninguna imagen'
    cy.get('input.container__searchInput').type(textNotFound)
  
    // Verificar que se muestra el mensaje "No se ha podido encontrar ningún resultado"
    cy.get('p.noFilterPictures').should('be.visible').and('contain', 'No se ha podido encontrar ningún resultado')
  
    // Verificar que no se muestra ninguna imagen
    cy.get('app-picture').should('not.exist')
  
    // Limpiar el campo de búsqueda
    cy.get('input.container__searchInput').clear()
  
    // Verificar que se muestran todas las imágenes nuevamente
    cy.get('app-picture').should('have.length.greaterThan', 1)
  })

})