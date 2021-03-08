import React, { cloneElement } from 'react';
import {
    List,
    Datagrid,
    TextField,
    TopToolbar,
    CreateButton,
    sanitizeListRestProps,
    ShowButton,
    EditButton,
    DeleteButton,
    ReferenceField,
    FunctionField
} from 'react-admin';

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
        {filters &&
            cloneElement(filters, {
                resource,
                showFilter,
                displayedFilters,
                filterValues,
                context: 'button'
            })}
        <CreateButton basePath={basePath} />
    </TopToolbar>
);

ListActions.defaultProps = {
    selectedIds: [],
    onUnselectItems: () => null
};

const ListUserSearch = (props) => {
    return (
        <List {...props} actions={<ListActions />}>
            <Datagrid>
                <TextField source="_id" label="Id" />
                <ReferenceField label="Prénom Nom" source="idUser" reference="users">
                    <FunctionField render={record => record.firstname + " " + record.lastname} />
                </ReferenceField>
                <TextField source="nameSearch" label="KeyWord" />
                <TextField source="total" label="Total" />
                <TextField source="created_at" label="Date de création" />
                <ShowButton />
                <EditButton />
                <DeleteButton />
            </Datagrid>
        </List>
    );
};

export default ListUserSearch;
