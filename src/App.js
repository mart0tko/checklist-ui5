import {
  ShellBar,
  ThemeProvider
} from '@ui5/webcomponents-react';
import React, { useEffect, useState } from 'react';
import './App.css';
import { getAllDocs, addSingleDoc, deleteSingleDoc, updateSingleDoc } from './firebase';
import CheckboxListDialog from './Components/CheckboxListDialog';
import ResultsTable from './Components/ResultsTable';

const isTodayChecked = (checklist) => {
  if (!checklist || checklist && !checklist.length) {
    return true;
  }

  const oLastRecord = checklist[checklist.length - 1];
  const lastDate = new Date(oLastRecord.timestamp)
  const currentDate = new Date();

  // if today is filled
  if (currentDate.getDate() === lastDate.getDate() && currentDate.getMonth() === lastDate.getMonth() && currentDate.getYear() === lastDate.getYear()) {
    return false;
  }

  return true;
}

const defaultMode = { isUpdate: false, sId: undefined };

function App() {
  const [checklist, setChecklist] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState({ ...defaultMode });

  const handleCheckboxDialogSubmit = async (oTodaysCheck) => {
    !mode.isUpdate ? await addSingleDoc('checklist', oTodaysCheck) : await updateSingleDoc('checklist', oTodaysCheck, mode.sId);
    const newChecklist = await getAllDocs('checklist');
    setChecklist([...newChecklist]);
    setMode({ ...defaultMode });
    setIsOpen(false);
  }

  const handleDelete = async (id) => {
    await deleteSingleDoc('checklist', id);
    const newChecklist = await getAllDocs('checklist');
    setChecklist([...newChecklist]);
    setIsOpen(isTodayChecked(newChecklist));
  }

  const handleUpdate = (id) => {
    debugger
    setIsOpen(true);
    setMode({ isUpdate: true, sId: id });
  }

  useEffect(async () => {
    const newChecklist = await getAllDocs('checklist');
    setChecklist(newChecklist);
    setIsOpen(isTodayChecked(newChecklist));
  }, []);

  return (
    <ThemeProvider>
      <ShellBar primaryTitle="Checklist" />
      {isOpen && <CheckboxListDialog handleCheckboxDialogSubmit={handleCheckboxDialogSubmit} isOpen={isOpen} onDecline={() => setIsOpen(false)} />}
      <ResultsTable data={checklist} handleDelete={handleDelete} handleUpdate={handleUpdate} />
    </ThemeProvider>
  );
}

export default App;
