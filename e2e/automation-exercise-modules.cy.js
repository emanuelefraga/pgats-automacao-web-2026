/// <reference types="cypress" />

import cadastro from '../cypress/modules/cadastro/index-class'
import login from '../cypress/modules/login/index-class'
import menu from '../cypress/modules/menu/index-class'
import produtos from '../cypress/modules/produtos/index-class'
import inscricao from '../cypress/modules/inscricao/index-class'
import carrinho from '../cypress/modules/carrinho/index-class'
import { getRandomEmail } from '../cypress/support/helper'

describe('Automation Exercise', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('CT-01: Cadastrar um novo usuário com sucesso', () => {

        menu.navegarParaLogin()

        cadastro.iniciarCadastro('PGATS ALUN', getRandomEmail())
        cadastro.preencherCadastro()
        cadastro.verificarSeCadastroFoiEfetuadoComSucesso()
        cadastro.continuar()

        menu.verificarSeUsuarioEstaLogado('PGATS ALUN')
        menu.deletarConta()
        cadastro.continuar() 
    
    });

    it('CT-02: Efetuar Login de Usuário com email e senha correto', () => {

        menu.navegarParaLogin()
        login.preencherLogin('aluno-pgats-2026@testando.com', '12345')
        menu.verificarSeUsuarioEstaLogado('Aluno Pgats')

    });

    it('CT-03: Efetuar Login de Usuário email e senha INCORRETOS', () => {

        menu.navegarParaLogin()
        login.preencherLogin('aluno-pgats-2026@testando.com', '54321')

        login.verificarSeMensagemDeErroFoiExibidaNoLogin()

    });

    it('CT-04: Efetuar Logout', () => {

        menu.navegarParaLogin()
        login.preencherLogin('aluno-pgats-2026@testando.com', '12345')

        menu.efetuarLogout()
        login.verificarSeOUsuarioFoiDeslogado()

    });

    it('CT-05: Tentar cadastrar um usuário com email já cadastrado', () => {

        menu.navegarParaLogin()

        cadastro.iniciarCadastro('PGATS ALUN', 'aluno-pgats-2026@testando.com')
        cadastro.verificarSeMensagemDeCadastroExistenteFoiExibida()    
    
    });

    it('CT-08: Acessar lista de produtos e verificar detalhes do primeiro produto exibido', () => {

        menu.navegarParaProdutos()

        produtos.verificarSeListaDeProdutosEstaVisivel()
        produtos.abrirDetalhesDoPrimeiroProduto()
        produtos.verificarSeDetalhesDoProdutoEstaoVisiveis()   
    
    });

    it('CT-09: Buscar um produto específico na barra de pesquisa', () => {

        menu.navegarParaProdutos()

        produtos.verificarSeListaDeProdutosEstaVisivel()
        produtos.buscarProduto('white')
        produtos.verificarSeResultadoDaBuscaEstaVisivel('white')

    });

    it('CT-10: Realizar inscrição de email para receber atualizações da página', () => {

        inscricao.rolarAteORodape()
        inscricao.inscreverEmail(getRandomEmail())
        inscricao.verificarSeInscricaoFoiEfetuadaComSucesso()

    });

    it('CT-15: Realizar cadastro e fazer compra', () => {

        menu.navegarParaLogin()

        cadastro.iniciarCadastro('PGATS ALUN', getRandomEmail())
        cadastro.preencherCadastro()
        cadastro.verificarSeCadastroFoiEfetuadoComSucesso()
        cadastro.continuar()
        menu.verificarSeUsuarioEstaLogado('PGATS ALUN')

        menu.navegarParaProdutos()
        produtos.adicionarProdutoAoCarrinho(1)
        produtos.adicionarProdutoAoCarrinho(2)
        menu.navegarParaCarrinho()
        carrinho.verificarSeCarrinhoEstaVisivel()
        carrinho.prosseguirParaCheckout()

        carrinho.verificarEnderecoERevisaoDoPedido()
        carrinho.comentarEFinalizarPedido('Executando o cenário de teste 15.')

        carrinho.preencherDadosDoPagamento()
        carrinho.confirmarPagamento()
        carrinho.verificarSePedidoFoiRealizado()

        menu.deletarConta()
        cadastro.continuar()

    });

    it('CT-16: Realizar login antes de fazer a compra', () => {

        const email = getRandomEmail()

        menu.navegarParaLogin()

        cadastro.criarNovoUsuario('PGATS ALUN', email)
        menu.efetuarLogout()

        login.preencherLogin(email, '12345')
        menu.verificarSeUsuarioEstaLogado('PGATS ALUN')

        menu.navegarParaProdutos()
        produtos.adicionarProdutoAoCarrinho(1)
        produtos.adicionarProdutoAoCarrinho(2)
        menu.navegarParaCarrinho()
        carrinho.verificarSeCarrinhoEstaVisivel()
        carrinho.prosseguirParaCheckout()

        carrinho.verificarEnderecoERevisaoDoPedido()
        carrinho.comentarEFinalizarPedido('Executando o cenário de teste 16.')

        carrinho.preencherDadosDoPagamento()
        carrinho.confirmarPagamento()
        carrinho.verificarSePedidoFoiRealizado()

        menu.deletarConta()
        cadastro.continuar()

    });

});


