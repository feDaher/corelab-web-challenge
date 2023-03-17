## Desafio Corelab:

"Você tem a tarefa de criar um aplicativo da Web que permita aos usuários criar e gerenciar suas listas de tarefas. O aplicativo deve consistir em uma página da Web responsiva construída em React e uma API construída em Node.js para armazenar e gerenciar as listas de tarefas."

## Projeto Finalizado:

Utilizei para desevolver o codigo o ReactJS, NodeJS, NextJS e o banco de dados MongoDB, e várias bibliotecas modernas para a otimização do código, e utlizei também o Styled Components como pré processador de CSS.
Executei todas as funcionalidades propostas da aplicação, de maneira fiel ao mockup e responsiva, tratando para todos os dispositvos mobile:

* Os usuarios tem a capacidade de criar, ler, atualizar e excluir os itens de tarefas de forma dinâmica;
* Favorita-los;
* E esses favoritos serão exibidos primariamente, no topo da aplicação;
* Poderá definir as cores para cada item;
* Pesquisar e filtrar os itens de tarefa;

A API para o back-end foi feita em Node.js, utilizando o banco de dados MongoDB, fiz a aplicação do schema, models, services e middlewares, em Next.js e moongose. Back-end bem estruturado e otimizado.

Todo o front-end foi feito a base das ferramentas e bibliotecas modernas para melhor otimização do código, qualidade, formato e desempenho.

* Design fiel ao mockup apresentado para base do projeto, sendo TODO responsivo para qualquer tela e aparelho mobile, tendo um nav com um input onde todas as pesquisas, filtros funcionais, alinhados e responsivos.
* Container onde o usuario pode escrever o título da tarefa e abaixo criar seu item de tarefa submetendo um form, ao apertar enter, sem mesmo ter que utilizar um 'button', salvando diretamente no banco de dados e sendo atualizado na tela de forma dinâmica e automática, pelo swr.
* Os 'Notes' serão exibidos todos alinhados e bem distruibuidos harmonicamente na tela, sendo fiel ao projeto, nele o usuário pode favorita-lo, onde o item favorito irá para o top da tela em ordem primária, colorindo o item 'star' e tudo dinâmico, nele também contém icones para fazer a edição do conteudo, das cores e a exclusão da tarefa caso queira.
* Ao clicar no item editar a nota, o mesmo irá sinalizar marcando com uma cor do icone, dando a possibilidade de edição indiviual do item de tarefa, ou seja, podendo editar somente o título ou a descrição da tarefa ou também ambos, atualizando de forma dinâmica ao aperter enter sem a necessidade de um botão e atualizando no banco de dados e na tela do usuário instantaneamente.
* Clicando no icone 'paint', edição de cores, abrirá um menu de cores pré-definadas no projeto, que foi reproduzida fielamente, onde o usário clica e o item de tarefa recebe a cor dinamicamente, trocando a propriedade color no back-end também, para ficar salvo de acordo com o desejo do usuário, o container do MenuColor está responsivo e adaptado para todos os dispositvos, conforme o projeto.
* No icone de excluir, o usuario tem a possibilidade da exclusão do item de tarefa, ao clicar o mesmo, será excluído instantaneamente, tanto no back-end como no front.
* Item Star, de favoritos: Favorita o item de tarefa, movendo o mesmo para o topo, na posição primário da aplicação, colorindo também o icone de dourado, separando favoritos de nao favorites, e com codigo de facil leitura.

Trabalhei com tipagens e interfaces corretas, utilizei as regras eslint e configurações do prettier, todos os componentes e containers feitos de maneira otimizadas, com codigo organizado de fácil leitura. A aplicação está com a prática CI/CD de integração e entrega contínua.

Deploy feito na vercel: https://corelab-challenge-corenotes-git-main-fedaher.vercel.app/

## Obrigado!