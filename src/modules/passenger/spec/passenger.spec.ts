/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable import/no-extraneous-dependencies */

import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as jwt from 'jsonwebtoken';
import * as request from 'supertest';

import { App } from 'supertest/types';
import { ApplicationModule } from '../../app.module';

/**
 * Passenger API end-to-end tests
 *
 * This test suite performs end-to-end tests on the passenger API endpoints,
 * allowing us to test the behavior of the API and making sure that it fits
 * the requirements.
 */
describe('Passenger API', () => {

    let app: INestApplication;

    beforeAll(async () => {

        const module = await Test.createTestingModule({
            imports: [ApplicationModule],
        })
        .compile();

        app = module.createNestApplication();
        await app.init();
    });

    afterAll(async () =>
        app.close()
    );

    it('Should return empty passenger list', async () =>{
        const token = jwt.sign({ role: 'restricted' }, `${process.env.JWT_SECRET}`, {
            algorithm: 'HS256',
            issuer: `${process.env.JWT_ISSUER}`
        });
        request(app.getHttpServer() as App)
        .get('/passengers')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK)
        .then(response => {
            expect(response.body.data).toBeInstanceOf(Array);
            expect(response.body.data.length).toEqual(0);
        })
    }
    
    );

    it('Should insert new passenger in the API', async () => {

        const token = jwt.sign({ role: 'restricted' }, `${process.env.JWT_SECRET}`, {
            algorithm: 'HS256',
            issuer: `${process.env.JWT_ISSUER}`
        });

        return request(app.getHttpServer() as App)
            .post('/passengers')
            .set('Authorization', `Bearer ${token}`)
            .send({
                firstName: 'John',
                lastName: 'Doe',
                email:"test@dev.com",
                password:"password"
            })
            .expect(HttpStatus.CREATED)
            .then(response => {
                expect(response.body.data.firstName).toEqual('John');
                expect(response.body.data.lastName).toEqual('Doe');
            });
    });

});
