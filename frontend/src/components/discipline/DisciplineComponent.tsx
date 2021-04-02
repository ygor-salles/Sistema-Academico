import { useEffect, useState } from 'react';
import { Discipline } from '../../models/discipline.model';
import { fetchDisciplines } from '../../services/discipline.service';

function DisciplineComponent() {
    const [disciplines, setDisciplines] = useState<Discipline[]>([]);
    console.log(disciplines)

    useEffect(() => {
        fetchDisciplines()
            .then(response => setDisciplines(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <>
            Componente DisciplineComponent
        </>
    );
}

export default DisciplineComponent;