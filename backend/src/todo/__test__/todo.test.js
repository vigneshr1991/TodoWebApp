const chai = require('chai');
const request = require('supertest');

const { expect } = chai;

const app = require('../../api');

describe('GET TODOS /', () => {
    before(() => {
        console.log("Before run")
    })

    after(() => {
        console.log("Before run")
    })

    it('List all pending todos', (done) => {
        request(app).get('/')
            .expect(200)
            .then((res) => {
                const { body } = res;
                console.log("body :", body);
                expect(body).to.be.a('array')
                done();
            }).catch(err => {
                done(err);
            })
    })
})



// describe('GET /users/{id}', () => {
//     before(() => {
//         console.log("Before run")
//     })

//     after(() => {
//         console.log("Before run")
//     })

//     it('List user with id 1', (done) => {
//         const id = 1;
//         request(app).get(`/users/${id}`)
//             .expect(200)
//             .then((res) => {
//                 const { body } = res;
//                 expect(body).to.be.a('object')
//                 expect(body.id).equal(id)
//                 expect(body.name).equal('sachin')
//                 expect(body.email).equal('sachin@cricket.com')
//                 done();
//             }).catch(err => {
//                 done(err);
//             })
//     })
// })

// describe('POST /users', () => {
//     before(() => {
//         console.log("Before run")
//     })

//     after(() => {
//         console.log("Before run")
//     })

//     it('Create new user', (done) => {
//         const payload = {
//             name: 'kohli',
//             email: 'kohli@example.com'
//         }
//         request(app).post('/users')
//             .send(payload)
//             .expect(201)
//             .then((res) => {
//                 const { body } = res;
//                 expect(body).to.be.a('object')
//                 expect(body.name).equal(payload.name)
//                 expect(body.email).equal(payload.email)
//                 done();
//             }).catch(err => {
//                 done(err);
//             })
//     })
// })