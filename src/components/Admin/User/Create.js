import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    PasswordInput,
    SelectInput,
} from 'react-admin';

const CreateUser = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="firstname" label="Prénom" />
            <TextInput source="lastname" label="Nom" />
            <TextInput source="username" label="Username" />
            <PasswordInput source="password" label="Mot de passe" />
            <SelectInput source="role" choices={[
                { id: '1', name: 'admin' },
                { id: '2', name: 'user' },
            ]} optionText="name" optionValue="name" />
        </SimpleForm>
    </Create>
);

export default CreateUser;