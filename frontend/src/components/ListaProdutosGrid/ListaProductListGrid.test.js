import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ProductListGrid from '.'; // Atualize o caminho se necessário
import { IProduto } from '../../services/produto.service';

// Simule as props para teste
const mockProducts = [
    { id: 1, nome: 'Produto 1', preco: 10, estoque: 5 },
    { id: 2, nome: 'Produto 2', preco: 20, estoque: 0 },
];

const mockOnProductClicked = jest.fn();

const mockProps = {
    data: mockProducts,
    onProductClicked: mockOnProductClicked,
};

describe('ProductListGrid', () => {
    it('renderiza os cartões de produto corretamente', async () => {
        render(<ProductListGrid {...mockProps} />);

        // Verifica se os cartões de produto são renderizados
        const productCards = screen.getAllByRole('img');
        expect(productCards).toHaveLength(mockProducts.length);

        // Verifica se os nomes dos produtos são exibidos
        mockProducts.forEach((product) => {
            expect(screen.getByText(product.nome)).toBeInTheDocument();
        });

        // Verifica se os botões são renderizados e clicáveis
        const addButton = screen.getAllByLabelText('Adicionar ao carrinho')[0]; // Supondo que há apenas um botão de adição por cartão de produto
        const disabledButton = screen.getAllByText('Indisponível')[0]; // Supondo que há apenas um botão desativado por cartão de produto

        userEvent.click(disabledButton);

        // Verifica se a função onClick é chamada
        // expect(mockOnProductClicked).toHaveBeenCalledTimes(1);
        await act(async () => {
            userEvent.click(addButton);
            await waitFor(() => {
                expect(mockOnProductClicked).toHaveBeenCalledTimes(1);
                expect(mockOnProductClicked).toHaveBeenCalledWith(mockProducts[0]);
            });
        });
    });
});
