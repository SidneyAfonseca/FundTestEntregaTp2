import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfirmationModal from '.';

describe('ConfirmationModal', () => {
    const mockOnConfirm = jest.fn();
    const mockOnCancel = jest.fn();

    const mockProps = {
        isShow: true,
        title: 'Confirmar Modal',
        message: 'Vc tem certeza?',
        onConfirm: mockOnConfirm,
        onCancel: mockOnCancel,
    };

    it('renders correctly and handles actions', () => {
        render(<ConfirmationModal {...mockProps} />);

        // Check if modal content is rendered
        expect(screen.getByText('Confirmar Modal')).toBeInTheDocument();
        expect(screen.getByText('Vc tem certeza?')).toBeInTheDocument();

        // Check if buttons are rendered
        const cancelButton = screen.getByText('Cancelar');
        const confirmButton = screen.getByText('Confirmar');

        // Simulate button clicks
        fireEvent.click(cancelButton);
        fireEvent.click(confirmButton);

        // Check if the onClick functions are called
        expect(mockOnCancel).toHaveBeenCalledTimes(1);
        expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });

    it('hides modal when isShow is false', () => {
        render(<ConfirmationModal {...mockProps} isShow={false} />);

        // Check if the modal is not rendered when isShow is false
        expect(screen.queryByText('Confirmar Modal')).not.toBeInTheDocument();
        expect(screen.queryByText('Vc tem certeza?')).not.toBeInTheDocument();
    });
});
