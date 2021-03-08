import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    PasswordInput,
    SelectInput,
} from 'react-admin';

const EditUser = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="firstname" label="Prénom" />
            <TextInput source="lastname" label="Nom" />
            <TextInput source="username" label="Username" />
            <PasswordInput source="password" label="Mot de passe" />
            <SelectInput source="role" choices={[
                { id: '1', name: 'admin' },
                { id: '2', name: 'user' }
            ]} optionText="name" optionValue="name" />
        </SimpleForm>
    </Edit>
);

export default EditUser;