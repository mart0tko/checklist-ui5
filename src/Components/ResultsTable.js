import { Button, Label, Table, TableCell, TableColumn, TableGrowingMode, TableRow } from '@ui5/webcomponents-react';
import { aCheckboxTableColumns } from '../constants';


function ResultsTable({ data, handleDelete, handleUpdate }) {
    const getDateFromTimestamp = (nTimestamp) => {
        return nTimestamp && new Date(nTimestamp).toLocaleDateString();
    }
    return (
        <Table
            busy={!data}
            growing={TableGrowingMode.Scroll}
            columns={
                <>
                    {aCheckboxTableColumns.map(column =>
                        <TableColumn key={column}>
                            <Label>{column}</Label>
                        </TableColumn>)}
                </>
            }>
            {data && data.map((i) =>
            (
                <TableRow key={i.timestamp}>
                    <TableCell>{getDateFromTimestamp(i.timestamp)}</TableCell>
                    <TableCell>{i.eat ? 'Checked' : null}</TableCell>
                    <TableCell>{i.work ? 'Checked' : null}</TableCell>
                    <TableCell>{i.sleep ? 'Checked' : null}</TableCell>
                    <TableCell>
                        <Button onClick={() => handleDelete(i.id)}>Delete</Button>
                        <Button onClick={() => handleUpdate(i.id)}>Update</Button>
                    </TableCell>
                </TableRow>
            ))}
        </Table>
    );
}

export default ResultsTable;