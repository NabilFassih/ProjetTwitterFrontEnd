import React from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    ReferenceInput,
    SelectInput
} from 'react-admin';

const FullNameField = ({ record }) => <span>{record.firstname} {record.lastname}</span>;

const EditUserSearch = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <ReferenceInput source="idUser" reference="users" >
                <SelectInput optionText={<FullNameField />} />
            </ReferenceInput >
            <TextInput source="nameSearch" label="Keyword" />
            <TextInput source="total" label="Total" />
        </SimpleForm>
    </Edit>
);

export default EditUserSearch;