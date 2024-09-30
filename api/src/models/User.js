import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema(
    {
        uuid: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            trim: true,
			required: [true, 'O nome é obrigatório'],
			maxLength: [40, 'O nome não pode ter mais de 40 caracteres'],
        },
        email: {
            type: String,
            required: [true, 'O email é obrigatório'],
            lowercase: true,
            unique: true,
            trim: false,
			maxLength: [50, 'O email não pode ter mais de 50 caracteres'],
            validate: {
                validator: function (value) {
                    if (! validator.isEmail(value)) {
                        throw Error(
                            'O email informado deve ser um email válido'
                        );
                    }
                },
            },
        },
        password: {
            type: String,
			minLength: [8, 'A senha deve ter no mínimo 8 caracteres'],
        },
    },
    { timestamps: true }
);

export default mongoose.model('User', UserSchema);
