import React from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField,
    ReferenceField,
    FunctionField
} from 'react-admin';

const ShowUserSearch = (props) => {
    return (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField source="_id" />
                <ReferenceField label="Prénom Nom" source="idUser"  reference="users">
                    <FunctionField render={(record) => record.firstname + ' ' + record.lastname } />
                </ReferenceField>
                <TextField source="nameSearch" />
                <TextField source="total" />
                <TextField source="created_at" />
            </SimpleShowLayout>
        </Show>
    );
};

export default ShowUserSearch;
