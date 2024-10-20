import * as Joi from 'joi';

import { JoiValidationPipe } from '../../common';
import {UserInputData, UserInput } from '../model';

export class UserPipe extends JoiValidationPipe {

    public buildSchema(): Joi.Schema {

        return Joi.object<UserInput>({
            // @todo When building input validation, also include regex
            // and other techniques for optimal security
            firstName: Joi.string().required().max(UserInputData.NAME_LENGTH),
            lastName: Joi.string().required().max(UserInputData.NAME_LENGTH),
            email: Joi.string().required().max(UserInputData.NAME_LENGTH),
            password: Joi.string().required().max(UserInputData.NAME_LENGTH)
        });

    }
}
