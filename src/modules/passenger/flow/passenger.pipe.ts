import * as Joi from 'joi';

import { JoiValidationPipe } from '../../common';
import { PassengerInputData, PassengerInput } from '../model';

export class PassengerPipe extends JoiValidationPipe {

    public buildSchema(): Joi.Schema {

        return Joi.object<PassengerInput>({
            // @todo When building input validation, also include regex
            // and other techniques for optimal security
            firstName: Joi.string().required().max(PassengerInputData.NAME_LENGTH),
            lastName: Joi.string().required().max(PassengerInputData.NAME_LENGTH),
            email: Joi.string().required().max(PassengerInputData.NAME_LENGTH),
            password: Joi.string().required().max(PassengerInputData.NAME_LENGTH)
        });

    }
}
