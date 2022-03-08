/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display default data', () => {
    cy.intercept('https://pokeapi.co/api/v2/pokemon/1/').as('defaultPokemon');
    cy.get('[data-test=selectedPokemonCardLoaderContainer]').should('be.visible');
    cy.wait('@defaultPokemon')
    cy.get('[data-test=selectedPokemonCardLoaderContainer]').should('not.exist');
    cy.url().should('include', 'bulbasaur/1');
    cy.get('[data-test=selected_pokemon_container]').should('exist');
    cy.get('[data-test=selected_pokemon_name]').contains('bulbasaur');
    cy.get('[data-test=selected_pokemon_id]').should('contain', '#1');
    cy.get('[data-test=flex2Container]').should('be.visible');
    cy.get('[data-test=type_container]').first().contains('Grass');
    cy.get('[data-test=type_container]').last().contains('Poison');
    cy.get('[data-test=hp_value]').contains('45');
    cy.get('[data-test=attack_value]').contains('49');
    cy.get('[data-test=defense_value]').contains('49');
    cy.get('[data-test=speed_value]').contains('45');
    cy.get('[data-test=specialDefense_value]').contains('65');
    cy.get('[data-test=specialAttack_value]').contains('65');
  });

  it('should display default evolution chain', () => {
    cy.intercept('https://pokeapi.co/api/v2/pokemon/1/').as('defaultPokemon');
    cy.get('[data-test=selectedPokemonCardLoaderContainer]').should('be.visible');
    cy.wait('@defaultPokemon')
    cy.get('[data-test=selectedPokemonCardLoaderContainer]').should('not.exist');
    cy.url().should('include', 'bulbasaur/1');
    cy.get('[data-test=evolution_chain]').should('exist');
    cy.get('[data-test=evolution]').eq(0).last().contains('bulbasaur');
    cy.get('[data-test=evolution]').eq(1).last().contains('ivysaur');
    cy.get('[data-test=evolution]').eq(2).last().contains('venusaur');
  });

  it('should display evolution data when click', () => {
    cy.intercept('https://pokeapi.co/api/v2/pokemon/1/').as('defaultPokemon');
    cy.get('[data-test=selectedPokemonCardLoaderContainer]').should('be.visible');
    cy.wait('@defaultPokemon')
    cy.get('[data-test=selectedPokemonCardLoaderContainer]').should('not.exist');
    cy.url().should('include', 'bulbasaur/1');
    cy.get('[data-test=evolution]').eq(2).click();
    cy.url().should('include', 'venusaur/3');
    cy.get('[data-test=selected_pokemon_name]').contains('venusaur');
    cy.get('[data-test=selected_pokemon_id]').should('contain', '#3');
    cy.get('[data-test=hp_value]').contains('80');
    cy.get('[data-test=attack_value]').contains('82');
    cy.get('[data-test=defense_value]').contains('83');
    cy.get('[data-test=speed_value]').contains('80');
    cy.get('[data-test=specialDefense_value]').contains('100');
    cy.get('[data-test=specialAttack_value]').contains('100');
  });

it('should use next page buttons on allPokemons container', () => {
  cy.get('[data-test=allPokemonsContainer]').should('exist');
  cy.get('[data-test=allPokemonsContainer]').scrollTo('bottom', { ensureScrollable: false });
  cy.get('[data-test=nextPage]').click();
  cy.get('ul').eq(0).contains('electrode');
  cy.get('[data-test=allPokemonsContainer]').scrollTo('bottom', { ensureScrollable: false });
  cy.get('[data-test=prevPage]').click();
  cy.get('ul').eq(0).contains('bulbasaur');
});


it('should use select pokemon by allPokemons container, show correct data', () => {
  cy.get('[data-test=allPokemonsContainer]').should('exist');
  cy.get('ul').eq(3).click();
  cy.intercept('https://pokeapi.co/api/v2/pokemon/4/').as('selectedPokemon');
  cy.get('[data-test=selectedPokemonCardLoaderContainer]').should('be.visible');
  cy.url().should('include', 'charmander/4');
  cy.wait('@selectedPokemon')
  cy.get('[data-test=selectedPokemonCardLoaderContainer]').should('not.exist');
  cy.get('[data-test=selected_pokemon_container]').should('exist');
  cy.get('[data-test=selected_pokemon_name]').contains('charmander');
  cy.get('[data-test=selected_pokemon_id]').should('contain', '#4');
  cy.get('[data-test=flex2Container]').should('be.visible');
  cy.get('[data-test=type_container]').first().contains('Fire');
  cy.get('[data-test=hp_value]').contains('39');
  cy.get('[data-test=attack_value]').contains('52');
  cy.get('[data-test=defense_value]').contains('43');
  cy.get('[data-test=speed_value]').contains('65');
  cy.get('[data-test=specialDefense_value]').contains('50');
  cy.get('[data-test=specialAttack_value]').contains('60');
  cy.get('[data-test=evolution_chain]').should('exist');
  cy.get('[data-test=evolution]').eq(0).last().contains('charmander');
  cy.get('[data-test=evolution]').eq(1).last().contains('charmeleon');
  cy.get('[data-test=evolution]').eq(2).last().contains('charizard');
});
})
