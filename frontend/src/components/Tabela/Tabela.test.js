import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomTable from '../Tabela';

const mockData = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Doe', age: 25 },
];

const mockColumns = [
    { acessor: 'id', head: 'ID' },
    { acessor: 'name', head: 'Name' },
    { acessor: 'age', head: 'Age' },
    { head: 'Action', isActionButton: true, onActionClick: jest.fn() },
];

const mockProps = {
    data: mockData,
    columns: mockColumns,
};

describe('CustomTable', () => {
    it('renders correctly and handles action click', () => {
        render(<CustomTable {...mockProps} />);

        // Check if table headers are rendered
        expect(screen.getByText('ID')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Age')).toBeInTheDocument();

        // Check if table rows and data are rendered
        mockData.forEach((data) => {
            expect(screen.getByText(data.id.toString())).toBeInTheDocument();
            expect(screen.getByText(data.name)).toBeInTheDocument();
            expect(screen.getByText(data.age.toString())).toBeInTheDocument();
        });

        // Check if action button is rendered and clickable
        const actionButton = screen.getByRole('button', { name: 'Action' });
        fireEvent.click(actionButton);

        // Check if the onActionClick function is called
        expect(mockColumns[3].onActionClick).toHaveBeenCalledTimes(1);
    });
});
