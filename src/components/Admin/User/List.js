import React, { cloneElement } from "react";
import { List, Datagrid, TextField, TopToolbar, CreateButton, sanitizeListRestProps, ShowButton, EditButton, DeleteButton } from 'react-admin';

const ListActions = ({
                         currentSort,
                         className,
                         resource,
                         filters,
                         displayedFilters,
                         exporter,
                         filterValues,
                         permanentFilter,
                         hasCreate,
                         basePath,
                         selectedIds,
                         onUnselectItems,
                         showFilter,
                         maxResults,
                         total,
                         ...rest
                     }) => (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
        {filters && cloneElement(filters, {
            resource,
            showFilter,
            displayedFilters,
            filterValues,
            context: 'button',
        })}
        <CreateButton basePath={basePath} />
    </TopToolbar>
);

ListActions.defaultProps = {
    selectedIds: [],
    onUnselectItems: () => null,
};

const ListUser = (props) => {
    return(
        <List {...props} actions={<ListActions />}>
            <Datagrid>
                <TextField source="_id" label="Id"/>
                <TextField source="firstname" label="Prénom"/>
                <TextField source="lastname" label="Nom"/>
                <TextField source="username" label="Username"/>
                <TextField source="role" label="Role"/>
                <ShowButton />
                <EditButton />
                <DeleteButton />
            </Datagrid>
        </List>
    )
};

export default ListUser;