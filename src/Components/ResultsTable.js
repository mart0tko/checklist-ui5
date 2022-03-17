function ResultsTable({ data }) {
    const getDateFromTimestamp = (nTimestamp) => {
        return nTimestamp && new Date(nTimestamp).toLocaleDateString();
    }
    return (<>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Eat</th>
                    <th>Work</th>
                    <th>Sleep</th>
                </tr>
            </thead>
            <tbody>
                {data && data.map((i) =>
                (
                    <>
                        <tr key={i.timestamp}>
                            <td>{getDateFromTimestamp(i.timestamp)}</td>
                            <td>{i.eat ? 'Checked' : null}</td>
                            <td>{i.work ? 'Checked' : null}</td>
                            <td>{i.sleep ? 'Checked' : null}</td>
                        </tr>
                    </>
                ))}
            </tbody>
        </table>
    </>);
}

export default ResultsTable;