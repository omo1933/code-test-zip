/// <reference types="cypress" />

const address = {
  postCode: '76010',
  country: 'United States',
  countryAbbr: 'US',
  placeName: 'Arlington',
  longitude: '-97.0826',
  state: 'Texas',
  stateAbbr: 'TX',
  latitude: '32.7204'
}

context('zipCode Finder', () => {
  const allocate = (zipCode) => {
    fetch(`http://api.zippopotam.us/us/` + zipCode)
      .then(function (response) {
        // The API call was successful!
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject(response)
        }
      })
      .then(function (data) {
        // This is the JSON from our response
        console.log(data)
      })
      .catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err)
      })
  }
  it('allocate a zipCode and return response', () => {
    cy.intercept(`http://api.zippopotam.us/us/${address.postCode}`).as(
      'getValue'
    )
    allocate(address.postCode)
    cy.wait('@getValue').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      expect(interception.response.body['post code']).to.eq(address.postCode)
      expect(interception.response.body['country']).to.eq(address.country)
      expect(interception.response.body['country abbreviation']).to.eq(
        address.countryAbbr
      )
      expect(interception.response.body['places'][0]['place name']).to.eq(
        address.placeName
      )
      expect(interception.response.body['places'][0]['longitude']).to.eq(
        address.longitude
      )
      expect(interception.response.body['places'][0]['state']).to.eq(
        address.state
      )
      expect(
        interception.response.body['places'][0]['state abbreviation']
      ).to.eq(address.stateAbbr)
      expect(interception.response.body['places'][0]['latitude']).to.eq(
        address.latitude
      )
    })
  })
})
