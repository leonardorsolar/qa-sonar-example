/**
 * EXEMPLOS PRÁTICOS PARA AULA DE QUALIDADE DE CÓDIGO
 * 
 * Este arquivo contém exemplos de:
 * 1. CODE SMELLS (Mau cheiro no código)
 * 2. BUGS (Erros de lógica)
 * 3. VULNERABILIDADES (Problemas de segurança)
 */

// ============================================================================
// SEÇÃO 1: CODE SMELLS (Mau cheiro no código)
// ============================================================================

console.log("=== CODE SMELLS ===\n");

// CODE SMELL 1: Função muito longa (Long Method)
// Problema: Função faz muitas coisas, difícil de entender e testar
function processarPedido(pedido) {
    // Validação
    if (!pedido.cliente) return false;
    if (!pedido.itens || pedido.itens.length === 0) return false;
    if (!pedido.endereco) return false;
    
    // Cálculo do total
    let total = 0;
    for (let item of pedido.itens) {
        total += item.preco * item.quantidade;
    }
    
    // Aplicar desconto
    if (pedido.cupom === "DESC10") {
        total = total * 0.9;
    } else if (pedido.cupom === "DESC20") {
        total = total * 0.8;
    }
    
    // Calcular frete
    let frete = 0;
    if (pedido.endereco.estado === "SP") {
        frete = 15;
    } else if (pedido.endereco.estado === "RJ") {
        frete = 20;
    } else {
        frete = 30;
    }
    
    // Enviar email
    console.log(`Enviando email para ${pedido.cliente.email}`);
    
    // Salvar no banco
    console.log("Salvando pedido no banco de dados...");
    
    return total + frete;
}

// CODE SMELL 2: Código duplicado (Duplicated Code)
// Problema: Mesmo código repetido em vários lugares
function calcularDescontoCliente1(valor) {
    if (valor > 1000) {
        return valor * 0.9;
    } else if (valor > 500) {
        return valor * 0.95;
    }
    return valor;
}

function calcularDescontoCliente2(valor) {
    if (valor > 1000) {
        return valor * 0.9;
    } else if (valor > 500) {
        return valor * 0.95;
    }
    return valor;
}

// CODE SMELL 3: Números mágicos (Magic Numbers)
// Problema: Números no código sem explicação do significado
function calcularTaxaEntrega(distancia) {
    if (distancia < 5) {
        return 10;
    } else if (distancia < 15) {
        return 25;
    } else {
        return 50;
    }
}

// CODE SMELL 4: Nomes ruins de variáveis
// Problema: Nomes não descrevem o propósito
function calcular(x, y, z) {
    let a = x * y;
    let b = a * z;
    let c = b + 50;
    return c;
}

function calcular(x, y, z) {
    let a = x * y;
    let b = a * z;
    let c = b + 50;
    return c;
}

// CODE SMELL 5: Classe Deus (God Class)
// Problema: Classe faz muitas coisas não relacionadas
class SistemaCompleto {
    validarUsuario() { }
    salvarUsuario() { }
    enviarEmail() { }
    calcularFrete() { }
    processarPagamento() { }
    gerarRelatorio() { }
    enviarSMS() { }
    calcularImposto() { }
}



// CODE SMELL 6: Comentários excessivos compensando código ruim
// Problema: Código precisa de muitos comentários para ser entendido
function proc(d) {
    // Pega o primeiro elemento
    let x = d[0];
    // Multiplica por 2
    x = x * 2;
    // Subtrai 10
    x = x - 10;
    // Retorna o resultado
    return x;
}

// CODE SMELL 7: Cadeia de chamadas longas (Train Wreck)
// Problema: Difícil de debugar e viola Lei de Demeter
function obterNomeCidadeUsuario(usuario) {
    return usuario.getEndereco().getCidade().getNome().toUpperCase();
}

// ============================================================================
// SEÇÃO 2: BUGS (Erros de lógica)
// ============================================================================

console.log("\n=== BUGS ===\n");

// BUG 1: Comparação com tipo errado
// Problema: Usa == ao invés de ===, causando coerção de tipo inesperada
function verificarIdade(idade) {
    if (idade == "18") {  // BUG: "18" (string) == 18 (number) retorna true
        console.log("Você tem exatamente 18 anos");
        return true;
    }
    return false;
}

// BUG 2: Loop infinito
// Problema: Condição nunca é satisfeita
function contarAte10() {
    let i = 0;
    while (i < 10) {
        console.log(i);
        // BUG: Esqueceu de incrementar i, loop infinito!
    }
}

// BUG 3: Mutação de array durante iteração
// Problema: Modificar array enquanto itera causa comportamento inesperado
function removerNegativos(numeros) {
    for (let i = 0; i < numeros.length; i++) {
        if (numeros[i] < 0) {
            numeros.splice(i, 1);  // BUG: Altera índices durante iteração
        }
    }
    return numeros;
}

// BUG 4: Off-by-one error
// Problema: Erro de limite em loops
function somarPrimeirosN(array, n) {
    let soma = 0;
    for (let i = 0; i <= n; i++) {  // BUG: Deveria ser i < n
        soma += array[i];  // Pode acessar índice inexistente
    }
    return soma;
}

// BUG 5: Referência vs Cópia
// Problema: Modifica objeto original sem intenção
function atualizarPreco(produto, novoPreco) {
    let produtoAtualizado = produto;  // BUG: Não é uma cópia!
    produtoAtualizado.preco = novoPreco;
    return produtoAtualizado;  // Modificou o original também
}

// BUG 6: Async/Await mal utilizado
// Problema: Não espera promessa ser resolvida
async function buscarDados() {
    let resultado;
    fetch('https://api.example.com/dados')
        .then(response => response.json())
        .then(data => {
            resultado = data;
        });
    return resultado;  // BUG: Retorna undefined, não esperou a promise
}

// BUG 7: Closure em loop
// Problema: Todas as funções referenciam a mesma variável
function criarContadores() {
    let funcoes = [];
    for (var i = 0; i < 3; i++) {  // BUG: Usar 'var' causa problema de escopo
        funcoes.push(function() {
            console.log(i);  // Todas imprimem 3
        });
    }
    return funcoes;
}

// BUG 8: Divisão por zero não tratada
// Problema: Não verifica divisor antes de dividir
function calcularMedia(total, quantidade) {
    return total / quantidade;  // BUG: Se quantidade = 0, retorna Infinity
}

// BUG 9: Null/Undefined não tratado
// Problema: Tenta acessar propriedade de valor nulo
function obterNomeCompleto(pessoa) {
    return pessoa.nome + " " + pessoa.sobrenome;  // BUG: Se pessoa é null, erro!
}

// ============================================================================
// SEÇÃO 3: VULNERABILIDADES (Problemas de segurança)
// ============================================================================

console.log("\n=== VULNERABILIDADES ===\n");

// VULNERABILIDADE 1: SQL Injection
// Problema: Concatena entrada do usuário diretamente na query
function buscarUsuarioPorNome(nome) {
    const query = "SELECT * FROM usuarios WHERE nome = '" + nome + "'";
    // VULNERÁVEL: Se nome = "'; DROP TABLE usuarios; --" = DESASTRE!
    // executeQuery(query);
    console.log("Query vulnerável:", query);
}

// VULNERABILIDADE 2: XSS (Cross-Site Scripting)
// Problema: Insere conteúdo não sanitizado no HTML
function exibirComentario(comentario) {
    document.getElementById('comentarios').innerHTML = comentario;
    // VULNERÁVEL: Se comentario = "<script>alert('XSS')</script>", executa JS malicioso!
}

// VULNERABILIDADE 3: Senha em texto puro
// Problema: Armazena senha sem criptografia
const usuarios = [
    { username: "admin", password: "admin123" },  // VULNERÁVEL: Senha visível!
    { username: "joao", password: "senha123" }
];

function fazerLogin(username, password) {
    const usuario = usuarios.find(u => u.username === username && u.password === password);
    return usuario !== undefined;
}

// VULNERABILIDADE 4: Dados sensíveis no código
// Problema: Credenciais hardcoded no código fonte
const API_KEY = "sk-1234567890abcdef";  // VULNERÁVEL: Chave exposta!
const DB_PASSWORD = "minhasenha123";     // VULNERÁVEL: Senha no código!

// VULNERABILIDADE 5: Validação apenas no cliente
// Problema: Confia na validação do frontend
function processarPagamento(valor) {
    // VULNERÁVEL: Usuário pode modificar valor no DevTools!
    if (valor > 0) {
        console.log(`Processando pagamento de R$ ${valor}`);
    }
}

// VULNERABILIDADE 6: CORS mal configurado
// Problema: Permite qualquer origem acessar recursos
function configurarCORS(response) {
    response.setHeader('Access-Control-Allow-Origin', '*');  // VULNERÁVEL: Muito permissivo!
    response.setHeader('Access-Control-Allow-Credentials', 'true');
}

// VULNERABILIDADE 7: Uso de eval()
// Problema: Executa código arbitrário
function calcularExpressao(expressao) {
    return eval(expressao);  // VULNERÁVEL: Pode executar qualquer código JS!
}

// VULNERABILIDADE 8: Path Traversal
// Problema: Permite acesso a arquivos fora do diretório permitido
function lerArquivo(nomeArquivo) {
    const caminho = "./uploads/" + nomeArquivo;
    // VULNERÁVEL: Se nomeArquivo = "../../etc/passwd", acessa arquivos do sistema!
    // fs.readFile(caminho);
    console.log("Lendo arquivo:", caminho);
}

// VULNERABILIDADE 9: Geração de token fraca
// Problema: Token previsível
function gerarToken() {
    return Math.random().toString();  // VULNERÁVEL: Não é criptograficamente seguro!
}

// VULNERABILIDADE 10: Informação sensível em logs
// Problema: Expõe dados sensíveis em logs
function processarCartao(numeroCartao, cvv) {
    console.log(`Processando cartão: ${numeroCartao}, CVV: ${cvv}`);  // VULNERÁVEL!
    // Logs podem ser acessados por administradores ou atacantes
}

// ============================================================================
// EXEMPLOS DE CÓDIGO MELHORADO (para discussão em aula)
// ============================================================================

console.log("\n=== CÓDIGO MELHORADO ===\n");

// MELHORADO: Função longa refatorada
class ProcessadorPedido {
    validar(pedido) {
        return pedido.cliente && pedido.itens?.length > 0 && pedido.endereco;
    }
    
    calcularTotal(itens) {
        return itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    }
    
    aplicarDesconto(total, cupom) {
        const descontos = { "DESC10": 0.9, "DESC20": 0.8 };
        return total * (descontos[cupom] || 1);
    }
    
    calcularFrete(estado) {
        const fretes = { "SP": 15, "RJ": 20 };
        return fretes[estado] || 30;
    }
}

// MELHORADO: Sem duplicação de código
const DESCONTOS_POR_FAIXA = [
    { minimo: 1000, percentual: 0.9 },
    { minimo: 500, percentual: 0.95 },
    { minimo: 0, percentual: 1 }
];

function calcularDescontoUnificado(valor) {
    const desconto = DESCONTOS_POR_FAIXA.find(d => valor >= d.minimo);
    return valor * desconto.percentual;
}

// MELHORADO: Constantes nomeadas
const TAXA_ENTREGA = {
    CURTA: { distanciaMaxima: 5, valor: 10 },
    MEDIA: { distanciaMaxima: 15, valor: 25 },
    LONGA: { distanciaMaxima: Infinity, valor: 50 }
};

function calcularTaxaEntregaClara(distancia) {
    const faixa = Object.values(TAXA_ENTREGA).find(f => distancia < f.distanciaMaxima);
    return faixa.valor;
}

// MELHORADO: Bug de comparação corrigido
function verificarIdadeCorrigida(idade) {
    if (idade === 18) {  // Usa === para comparação estrita
        console.log("Você tem exatamente 18 anos");
        return true;
    }
    return false;
}

// MELHORADO: Segurança - Query parametrizada (conceito)
function buscarUsuarioSeguro(nome) {
    // Use prepared statements ou ORMs
    const query = "SELECT * FROM usuarios WHERE nome = ?";
    const params = [nome];  // Parâmetros são sanitizados automaticamente
    console.log("Query segura com parâmetros:", { query, params });
}

// MELHORADO: XSS prevenido
function exibirComentarioSeguro(comentario) {
    const elemento = document.getElementById('comentarios');
    elemento.textContent = comentario;  // textContent escapa HTML automaticamente
}

console.log("\n=== FIM DOS EXEMPLOS ===");
console.log("\nAtividade prática:");
console.log("1. Identifique todos os code smells e sugira melhorias");
console.log("2. Encontre os bugs e explique por que causam problemas");
console.log("3. Liste as vulnerabilidades e proponha correções");
