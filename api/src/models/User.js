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
			maxLength: [50, 'O nome não pode ter mais de 50 caracteres'],
        },
        email: {
            type: String,
            required: [true, 'O email é obrigatório'],
            lowercase: true,
            unique: true,
            trim: false,
			maxLength: [40, 'O email não pode ter mais de 40 caracteres'],
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
			maxLength: [20, 'A senha não pode ter mais de 20 caracteres'],
            validate: {
                validator: function (value) {
                    if (
                        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                            value
                        )
                    ) {
                        throw new Error(
                            'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@$!%*?&).'
                        );
                    }

                    if (value.toLowerCase().includes('senha')) {
                        throw Error(
                            'A senha não deve conter a palavra "senha"'
                        );
                    }
                },
            },
        },
    },
    { timestamps: true }
);

export default mongoose.model('User', UserSchema);
