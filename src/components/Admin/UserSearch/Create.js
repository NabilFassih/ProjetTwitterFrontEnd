import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    ReferenceInput,
    SelectInput
} from 'react-admin';

const FullNameField = ({ record }) => <span>{record.firstname} {record.lastname}</span>;

const CreateUser = (props) => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="idUser" reference="users" >
                <SelectInput optionText={<FullNameField />} />
            </ReferenceInput >
            <TextInput source="nameSearch" label="Keyword" />
            <TextInput source="total" label="Total" />
        </SimpleForm>
    </Create>
);

export default CreateUser;