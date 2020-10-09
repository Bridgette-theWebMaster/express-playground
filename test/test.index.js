const {expect} = require('chai')
const supertest = require('supertest')
const app = require('../index')

describe('GET /playstore', () => {
    it('should return an array of games', () => {
        return supertest(app)
            .get('/playstore')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf.at.least(1)
                const games = res.body[0]
                expect(games).to.include.all.keys(
                    "app", "rating", "price"
                )
            })            
    })
    it('should be 400 if sort is incorrect' , () => {
        return supertest(app)
            .get('/playstore')
            .query({sort: 'MISTAKE'})
            .expect(400, 'Sort must be one of rating or app')
    })
    it('should sort by title', () => {
        return supertest(app)
            .get('/playstore')
            .query({sort: 'app'})
            .expect(200)
            .expect('content-type', /json/)
            .then( res => {
                expect(res.body).to.be.an('array')
                let sorted = true

                let i =0

                while (i < res.body.length - 1) {
                    const appAtI = res.body[i]
                    const bookAtIPlus1 = res.body[i + 1]
                    if (appAtIPlus1.app < appAtI.app) {
                        sorted = false
                        break;
                    }
                    i++
                }
                expect(sorted).to.be.true
            })
    })
})