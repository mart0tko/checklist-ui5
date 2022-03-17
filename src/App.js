import {
  ShellBar,
  ThemeProvider
} from '@ui5/webcomponents-react';
import React, { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import CheckboxListDialog from './Components/CheckboxListDialog';
import ResultsTable from './Components/ResultsTable';

const isOpen = (checklist) => {
  if (!checklist || checklist && !checklist.length) {
    return true;
  }

  const oLastRecord = checklist[0];
  const lastDate = new Date(oLastRecord.timestamp)
  const currentDate = new Date();

  // if today is filled
  if (currentDate.getDate() === lastDate.getDate() && currentDate.getMonth() === lastDate.getMonth() && currentDate.getYear() === lastDate.getYear()) {
    return false;
  }

  return true;
}

function App() {
  const [checklist, setChecklist] = useState(undefined);

  const handleCheckboxDialogSubmit = (oTodaysCheck) => {
    checklist.push(oTodaysCheck);
    setChecklist([...checklist]);
    addDoc(collection(db, 'checklist'), { timestamp: Date.now(), ...oTodaysCheck });
  }

  useEffect(() => {
    onSnapshot(collection(db, 'checklist'), (snapshot) => {
      setChecklist(snapshot.docs.map(doc => doc.data()));
    });
  }, []);

  return (
    <ThemeProvider>
      <ShellBar primaryTitle="Checklist" />
      {isOpen(checklist) && <CheckboxListDialog handleCheckboxDialogSubmit={handleCheckboxDialogSubmit} isOpen={isOpen(checklist)} />}
      <ResultsTable data={checklist} />
    </ThemeProvider>
  );
}

export default App;
