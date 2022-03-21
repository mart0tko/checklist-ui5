import React, { useEffect, useState } from 'react';
import { getAllDocs, addSingleDoc, deleteSingleDoc, updateSingleDoc } from '../firebase';
import { ResultsTable, CheckboxListDialog } from '../Components';
import { isTodayChecked } from '../helpers';
import { oDefaulCheckMode } from '../constants';

function Checklist() {
    const [checklist, setChecklist] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState({ ...oDefaulCheckMode });

    useEffect(async () => {
        const newChecklist = await getAllDocs('checklist');
        setChecklist(newChecklist);
        setIsOpen(isTodayChecked(newChecklist));
    }, []);
    
    const handleCheckboxDialogSubmit = async (oTodaysCheck) => {
        !mode.isUpdate ? await addSingleDoc('checklist', oTodaysCheck) : await updateSingleDoc('checklist', oTodaysCheck, mode.sId);
        const newChecklist = await getAllDocs('checklist');
        setChecklist(newChecklist);
        setMode({ ...oDefaulCheckMode });
        setIsOpen(false);
    }

    const handleDelete = async (id) => {
        await deleteSingleDoc('checklist', id);
        const newChecklist = await getAllDocs('checklist');
        setChecklist(newChecklist);
        setIsOpen(isTodayChecked(newChecklist));
    }

    const handleUpdate = (id) => {
        setIsOpen(true);
        setMode({ isUpdate: true, sId: id });
    }

    return (
        <>
            {isOpen && <CheckboxListDialog handleCheckboxDialogSubmit={handleCheckboxDialogSubmit} isOpen={isOpen} onDecline={() => setIsOpen(false)} />}
            <ResultsTable data={checklist} handleDelete={handleDelete} handleUpdate={handleUpdate} />
        </>
    );
}

export default Checklist;