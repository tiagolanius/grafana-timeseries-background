# Time Series Background

Painel personalizado para Grafana 8.x, desenvolvido pela DFSolutions.

Permite exibir gráficos de séries temporais com uma imagem PNG configurável como plano de fundo.

## Recursos

- Imagem PNG como fundo do painel.
- Controle de transparência.
- Ajuste de posicionamento e dimensionamento.
- Suporte a variáveis de dashboard.
- Suporte a painéis repetidos (Repeat Panels).
- Configuração independente em cada painel.

## Configuração

Nas opções do painel, configure a URL da imagem, transparência, posicionamento e dimensionamento.

### Exemplo com variável

```text
https://arquivos.dfsolutions.com.br/imagens/$redes.png
```

Se a variável `redes` estiver definida como `FACEBOOK`, será utilizada a imagem:

```text
https://arquivos.dfsolutions.com.br/imagens/FACEBOOK.png
```

O plugin utiliza a interpolação de variáveis do próprio painel, respeitando também os valores específicos dos painéis repetidos.

## Requisitos

- Grafana 8.1.2 ou compatível.
- Permissão para carregar plugins não assinados.

## Instalação

Consulte [MANUAL-INSTALACAO.md](MANUAL-INSTALACAO.md).

## Desenvolvimento

```bash
npm install
npm run build
```

## Identificação

- Nome: Time Series Background
- ID: dfsolutions-timeseries-bg
- Autor: DFSolutions
- Versão: 1.0.1
- Licença: MIT

## Repositório

https://github.com/tiagolanius/grafana-timeseries-background
