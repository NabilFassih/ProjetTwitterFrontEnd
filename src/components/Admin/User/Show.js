import React from "react";
import { Show, SimpleShowLayout, TextField } from 'react-admin';

const ShowUser = (props) => {
    return(
        <Show {...props}>
            <SimpleShowLayout>
                <TextField source="_id" />
                <TextField source="firstname" />
                <TextField source="lastname" />
                <TextField source="username" />
                <TextField source="role" />
            </SimpleShowLayout>
        </Show>
    )
};

export default ShowUser;